import { createHash } from "node:crypto";
import * as fs from "node:fs";

/**
 * Generate hash based on the content of config
 */
export async function getConfigHash(configPath: string): Promise<string> {
  const hash = createHash("md5");
  const rs = fs.createReadStream(configPath);

  for await (const chunk of rs) {
    hash.update(chunk as string);
  }

  return hash.digest("hex");
}
