import * as path from "node:path";

export function findConfigFile(): string {
  return path.resolve("source.config.ts");
}
