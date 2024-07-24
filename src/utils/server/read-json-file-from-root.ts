import { findRootDir } from "@root/src/utils/server/find-root-dir";
import { getDirName } from "@root/src/utils/server/get-dir-name";
import fs from "node:fs/promises";
import { resolve } from "node:path";

export async function readJsonFile(filePathStartingSrc: string) {
  const __dirname = getDirName();
  const rootDir = findRootDir(__dirname);
  const sidebarJSONFile = resolve(rootDir, filePathStartingSrc);
  const fileContents = await fs.readFile(sidebarJSONFile, "utf8");
  return JSON.parse(fileContents);
}
