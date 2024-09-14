import type { AstroIntegration } from "astro";
import { fileURLToPath } from "node:url";
import { createIndex } from "pagefind";
import path from "node:path";
import { existsSync } from "node:fs";
import { findRootDir } from "../utils/server/find-root-dir";
import { copyDirectory } from "../utils/server/copy-dir";

// /vercel/path0/.vercel/output/
// /vercel/path0/.vercel/output/static/_astro

const VERCEL_OUTPUT_DIR = '.vercel/output/static';
export function astroPagefindIntegration(): AstroIntegration {
  let outDir: string;
  let adapterName: string | undefined

  return {
    name: 'astro-pagefind',
    hooks: {
      // https://github.com/shishkin/astro-pagefind/blob/main/packages/astro-pagefind/src/pagefind.ts
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
            "astro-pagefind couldn't reliably determine the output directory. Search index will not be built.",
          );
          return;
        }

        const { index, errors: createErrors } = await createIndex({});

        if (!index) {
          logger.error("Pagefind failed to create index");
          createErrors.forEach((e: string) => logger.error(e));
          return;
        }

        const { page_count, errors: addErrors } = await index.addDirectory({ path: outDir });

        if (addErrors.length) {
          logger.error("Pagefind failed to index files");
          addErrors.forEach((e: string) => logger.error(e));
          return;
        } else {
          logger.info(`Pagefind indexed ${page_count} pages`);
        } adapterName

        const { outputPath, errors: writeErrors } = await index.writeFiles({
          outputPath: path.join(outDir, "pagefind"),
        });

        if (writeErrors.length) {
          logger.error("Pagefind failed to write index");
          writeErrors.forEach((e: string) => logger.error(e));
          return;
        } else {
          logger.info(`Pagefind wrote index to ${outputPath}`);
          const pagefindDirPath = path.join(outDir, "pagefind")
          const rootPath = findRootDir()

          // this should ideally only be done, I think, for running prod build locally
          // but since I haven't tried running this project in a prod remote environment, I don't know.
          if (
            existsSync(pagefindDirPath)
            && adapterName?.startsWith("@astrojs/node")
          ) {
            await copyDirectory(pagefindDirPath, path.join(rootPath, 'public', 'pagefind'))
          }
        }
      }
    }
  }
}
