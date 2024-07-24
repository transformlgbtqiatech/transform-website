import { dirname, resolve } from "node:path";
import { existsSync } from "node:fs";

export function findRootDir(startPath: string) {
  let currentDir = startPath;

  while (!existsSync(resolve(currentDir, "package.json"))) {
    const parentDir = dirname(currentDir);
    if (parentDir === currentDir) {
      throw new Error("package.json not found in any parent directories");
    }
    currentDir = parentDir;
  }

  return currentDir;
}