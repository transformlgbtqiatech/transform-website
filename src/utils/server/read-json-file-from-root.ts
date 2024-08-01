import { findRootDir } from "@root/src/utils/server/find-root-dir";
import fs from "node:fs/promises";
import { resolve } from "node:path";

export async function readJsonFile(filePathStartingSrc: string) {
  const rootDir = findRootDir();
  const sidebarJSONFile = resolve(rootDir, filePathStartingSrc);
  const fileContents = await fs.readFile(sidebarJSONFile, "utf8");
  return JSON.parse(fileContents);
}
