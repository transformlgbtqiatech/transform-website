import type { AstroIntegration } from "astro";
import { fileURLToPath } from "node:url";
import { createIndex } from 'pagefind'
import path from "node:path";

// /vercel/path0/.vercel/output/
// /vercel/path0/.vercel/output/static/_astro

const VERCEL_OUTPUT_DIR = '.vercel/output/static';
export function astroPagefindIntegration(): AstroIntegration {
  let outDir: string;

  return {
    name: 'astro-pagefind',
    hooks: {
      // https://github.com/shishkin/astro-pagefind/blob/main/packages/astro-pagefind/src/pagefind.ts
      'astro:config:setup': ({ config }) => {
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
          createErrors.forEach((e) => logger.error(e));
          return;
        }

        const { page_count, errors: addErrors } = await index.addDirectory({ path: outDir });

        if (addErrors.length) {
          logger.error("Pagefind failed to index files");
          addErrors.forEach((e) => logger.error(e));
          return;
        } else {
          logger.info(`Pagefind indexed ${page_count} pages`);
        }

        const { outputPath, errors: writeErrors } = await index.writeFiles({
          outputPath: path.join(outDir, "pagefind"),
        });

        if (writeErrors.length) {
          logger.error("Pagefind failed to write index");
          writeErrors.forEach((e) => logger.error(e));
          return;
        } else {
          logger.info(`Pagefind wrote index to ${outputPath}`);
        }
      }
    }
  }
}