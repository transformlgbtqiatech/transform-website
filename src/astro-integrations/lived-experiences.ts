import type { AstroIntegration, AstroIntegrationLogger } from "astro";
import { fileURLToPath } from "url";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import path from "node:path";
import { mkdir, writeFile, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { copyDirectory } from "../utils/server/copy-dir";
import { findRootDir } from "../utils/server/find-root-dir";
import { LIVED_EXPERIENCE_ID } from "../utils/common/googlesheet";
import dotenv from '@dotenvx/dotenvx'

const VERCEL_OUTPUT_DIR = ".vercel/output/static";

export function astroLiveExperiencesIntegration(): AstroIntegration {
  let outDir: string;
  let adapterName: string | undefined;

  if (import.meta.env.MODE === 'development') {
    dotenv.config();
  }

  return {
    name: "astro-live-experiences",
    hooks: {
      "astro:config:setup": async ({ config, logger }) => {
        adapterName = config.adapter?.name;
        if (config.adapter?.name.startsWith("@astrojs/vercel")) {
          const url = new URL(VERCEL_OUTPUT_DIR, config.root);
          outDir = fileURLToPath(url);
        } else if (
          config.adapter?.name === "@astrojs/node" &&
          config.output === "static"
        ) {
          outDir = fileURLToPath(config.build.client!);
        } else {
          outDir = fileURLToPath(config.outDir);
        }

        // google sheet work
        await fetchGoogleSheetAndMakeData({
          adapterName,
          outDir,
          logger
        })
      },
    },
  };
}

type TOptions = {
  outDir?: string
  adapterName?: string
  logger: AstroIntegrationLogger
}
async function fetchGoogleSheetAndMakeData(options: TOptions) {
  const { outDir, logger, adapterName } = options;
  {
    if (!outDir) {
      logger.warn(
        "astro-live-experiences couldn't reliably determine the output directory. Live experiences won't be built.",
      );
      return;
    }

    // init google sheets
    const SHEET_ID = "10EfVMDS9Khhq_tF0q5p_PYcn7EawYVjD4DTEeRYhdbM";

    const SCOPES = [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/drive.file",
    ];

    const jwt = new JWT({
      email: process.env.GOOGLE_SERVICE_AUTH_CLIENT_EMAIL,
      key: process.env.GOOGLE_SERVICE_AUTH_KEY?.replace(/\\n/g, "\n"),
      scopes: SCOPES,
    });

    const transformSheet = new GoogleSpreadsheet(SHEET_ID, jwt);

    await transformSheet.loadInfo();
    const livedExperienceSheet =
      transformSheet.sheetsById[LIVED_EXPERIENCE_ID];
    await livedExperienceSheet.loadHeaderRow();
    const headerValues = livedExperienceSheet.headerValues;
    const rows = await livedExperienceSheet.getRows();
    const pairRowData: Record<string, Array<Record<string, string>>> = {};
    // const violenceSubCategoryRowsData: Record<
    //   string,
    //   Array<Record<string, string>>
    // > = {};
    // const identityGroupRowsData: Record<
    //   string,
    //   Array<Record<string, string>>
    // > = {};
    const allLivedExperiencesData: Array<Record<string, string>> = [];

    for (const row of rows) {
      const rowObj: Record<string, string> = {};
      const livedExperienceData = rowObj;

      headerValues.forEach((colName) => {
        livedExperienceData[colName] = row.get(colName);
      });

      const identityGroupValue = rowObj["identityGroup"];
      const violenceSubCategoryValue = rowObj["violenceSubCategory"];

      const fileNameKey = `${identityGroupValue}__${violenceSubCategoryValue}`;

      if (livedExperienceData["approved"] === "TRUE" && livedExperienceData["consentForLivedExperienceUse"] === "TRUE") {
        if (!pairRowData[fileNameKey]) {
          pairRowData[fileNameKey] = [livedExperienceData];
        } else {
          pairRowData[fileNameKey].push(livedExperienceData);
        }

        // if (!violenceSubCategoryRowsData[violenceSubCategoryValue]) {
        //   violenceSubCategoryRowsData[violenceSubCategoryValue] = [livedExperienceData];
        // } else {
        //   violenceSubCategoryRowsData[violenceSubCategoryValue].push(
        //     livedExperienceData,
        //   );
        // }

        // if (!identityGroupRowsData[identityGroupValue]) {
        //   identityGroupRowsData[identityGroupValue] = [livedExperienceData];
        // } else {
        //   identityGroupRowsData[identityGroupValue].push(livedExperienceData);
        // }

        allLivedExperiencesData.push(livedExperienceData);
      }
    }

    const livedExperiencesDir = path.join(outDir, "lived-experiences");

    if (existsSync(livedExperiencesDir)) {
      try {
        await rm(livedExperiencesDir, { recursive: true, force: true });
        await mkdir(livedExperiencesDir, { recursive: true });
        console.info('removed lived experiences directory and made a fresh one at /public/lived-experiences')
      } catch (error) {
        logger.error(
          `Failed to clean directory ${livedExperiencesDir}: ${error}`,
        );
        return;
      }
    } else {
      try {
        await mkdir(livedExperiencesDir, { recursive: true });
      } catch (error) {
        logger.error(`Failed to create directory ${livedExperiencesDir}`);
        return;
      }
    }

    for (const key in pairRowData) {
      const filePath = path.join(livedExperiencesDir, `${key}.json`);
      const data = pairRowData[key];

      try {
        await writeFile(filePath, JSON.stringify(data, null, 2));
      } catch (error) {
        logger.error(`Error writing file: ${filePath}: ${error}`);
      }
    }

    // for (const key in violenceSubCategoryRowsData) {
    //   const filePath = path.join(livedExperiencesDir, `vsc_${key}.json`);
    //   try {
    //     await writeFile(
    //       filePath,
    //       JSON.stringify(violenceSubCategoryRowsData[key], null, 2),
    //     );
    //   } catch (error) {
    //     logger.error(`Error writing file: ${filePath}: ${error}`);
    //   }
    // }

    // for (const key in identityGroupRowsData) {
    //   const filePath = path.join(livedExperiencesDir, `idg_${key}.json`);
    //   try {
    //     await writeFile(
    //       filePath,
    //       JSON.stringify(identityGroupRowsData[key], null, 2),
    //     );
    //   } catch (error) {
    //     logger.error(`Error writing file: ${filePath}: ${error}`);
    //   }
    // }

    const allLivedExperiencesFilePath = path.join(
      livedExperiencesDir,
      `all-lived-experiences.json`,
    );

    try {
      await writeFile(
        allLivedExperiencesFilePath,
        JSON.stringify(allLivedExperiencesData, null, 2),
      );
    } catch (error) {
      logger.error(
        `Error writing file ${allLivedExperiencesFilePath} : ${error}`,
      );
    }

    if (
      existsSync(livedExperiencesDir) &&
      adapterName?.startsWith("@astrojs/node")
    ) {
      const rootPath = findRootDir();
      await copyDirectory(
        livedExperiencesDir,
        path.join(rootPath, "public", "lived-experiences"),
      );
    }

    logger.info(`Live experiences written to ${outDir}`);
  }
}