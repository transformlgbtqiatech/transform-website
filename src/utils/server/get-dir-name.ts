import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

export function getDirName() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  return __dirname;
}