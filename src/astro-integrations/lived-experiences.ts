import type { AstroIntegration } from 'astro';
import { fileURLToPath } from 'url';
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from 'google-auth-library'
import path from 'node:path';
import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { copyDirectory } from '../utils/server/copy-dir';
import { findRootDir } from '../utils/server/find-root-dir';
import { LIVED_EXPERIENCE_ID } from '../utils/common/googlesheet';

const VERCEL_OUTPUT_DIR = '.vercel/output/static';

export function astroLiveExperiencesIntegration(): AstroIntegration {
  let outDir: string;
  let adapterName: string | undefined

  return {
    name: 'astro-live-experiences',
    hooks: {
      'astro:config:setup': ({ config }) => {
        adapterName = config.adapter?.name
        if (config.adapter?.name.startsWith('@astrojs/vercel')) {
          const url = new URL(VERCEL_OUTPUT_DIR, config.root)
          outDir = fileURLToPath(url)
        } else if (config.adapter?.name === "@astrojs/node" && config.output === "hybrid") {
          outDir = fileURLToPath(config.build.client!);
        } else {
          outDir = fileURLToPath(config.outDir);
        }
      },
      'astro:build:done': async ({ logger }) => {
        if (!outDir) {
          logger.warn(
            "astro-live-experiences couldn't reliably determine the output directory. Live experiences won't be built.",
          );
          return;
        }

        // init google sheets
        const SHEET_ID = '10EfVMDS9Khhq_tF0q5p_PYcn7EawYVjD4DTEeRYhdbM'

        const SCOPES = [
          'https://www.googleapis.com/auth/spreadsheets',
          'https://www.googleapis.com/auth/drive.file',
        ];

        const jwt = new JWT({
          email: process.env.GOOGLE_SERVICE_AUTH_CLIENT_EMAIL,
          key: process.env.GOOGLE_SERVICE_AUTH_KEY?.replace(/\\n/g, "\n"),
          scopes: SCOPES,
        });

        const transformSheet = new GoogleSpreadsheet(SHEET_ID, jwt);

        await transformSheet.loadInfo();
        const livedExperienceSheet = transformSheet.sheetsById[LIVED_EXPERIENCE_ID];
        await livedExperienceSheet.loadHeaderRow();
        const headerValues = livedExperienceSheet.headerValues;
        const rows = await livedExperienceSheet.getRows();
        const rowData: Record<string, Array<Record<string, string>>> = {}

        for (const row of rows) {
          const rowObj: Record<string, string> = {}
          headerValues.forEach((colName) => {
            rowObj[colName] = row.get(colName)
          })

          const identityGroupValue = rowObj["identityGroup"]
          const violenceSubCategoryValue = rowObj["violenceSubCategory"]

          const fileNameKey = `${identityGroupValue}__${violenceSubCategoryValue}`

          if (rowObj["approved"] === 'TRUE') {
            if (!rowData[fileNameKey]) {
              rowData[fileNameKey] = [rowObj]
            } else {
              rowData[fileNameKey].push(rowObj)
            }
          }
        }

        const livedExperiencesDir = path.join(outDir, 'lived-experiences')
        try {
          await mkdir(livedExperiencesDir, { recursive: true });
        } catch (error) {
          logger.error(`Failed to create directory ${livedExperiencesDir}`)
          return
        }

        for (const key in rowData) {
          const filePath = path.join(livedExperiencesDir, `${key}.json`);
          const data = rowData[key]

          try {
            await writeFile(filePath, JSON.stringify(data, null, 2));
          } catch (error) {
            logger.error(`Error writing file: ${filePath}: ${error}`);
          }
        }

        if (
          existsSync(livedExperiencesDir)
          && adapterName?.startsWith("@astrojs/node")
        ) {
          const rootPath = findRootDir()
          await copyDirectory(livedExperiencesDir, path.join(rootPath, 'public', 'lived-experiences'))
        }

        logger.info(`Live experiences written to ${outDir}`);
      }
    }
  }
}