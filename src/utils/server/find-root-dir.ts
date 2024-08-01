import { dirname, resolve } from "node:path";
import { existsSync } from "node:fs";
import { getDirName } from "./get-dir-name";

export function findRootDir() {
  const __dirname = getDirName()
  let currentDir = __dirname;

  while (!existsSync(resolve(currentDir, "package.json"))) {
    const parentDir = dirname(currentDir);
    if (parentDir === currentDir) {
      throw new Error("package.json not found in any parent directories");
    }
    currentDir = parentDir;
  }

  return currentDir;
}