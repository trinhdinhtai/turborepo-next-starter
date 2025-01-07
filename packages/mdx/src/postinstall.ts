import * as path from "node:path";
import * as fs from "node:fs";
import { findConfigFile } from "@/config/load";

export async function postInstall(
  configPath = findConfigFile()
): Promise<void> {
  const typeOut = path.resolve(".source/index.d.ts");
  const config = await loadConfig(configPath);

  fs.mkdirSync(path.dirname(typeOut), { recursive: true });
  fs.writeFileSync(typeOut, generateTypes(configPath, config, typeOut));
  console.log("[MDX] types generated");
}
