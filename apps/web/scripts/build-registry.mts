/* eslint-disable no-console */
// @sts-nocheck
import path from "path";
import type { z } from "zod";
import type { registryItemTypeSchema } from "../registry/schema";
import { Project, ScriptKind, SyntaxKind } from "ts-morph";
import { existsSync, promises as fs, readFileSync } from "fs";
import { tmpdir } from "os";

const REGISTRY_PATH = path.join(process.cwd(), "public/r");

const REGISTRY_INDEX_WHITELIST: z.infer<typeof registryItemTypeSchema>[] = [
  "registry:ui",
  "registry:lib",
  "registry:hook",
  "registry:theme",
  "registry:block",
  "registry:example",
];

const project = new Project({
  compilerOptions: {},
});

async function createTempSourceFile(filename: string) {
  const dir = await fs.mkdtemp(path.join(tmpdir(), "shadcn-"));
  return path.join(dir, filename);
}

// ----------------------------------------------------------------------------
// Build __registry__/index.tsx.
// ----------------------------------------------------------------------------
