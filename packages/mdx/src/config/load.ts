import { DocCollection, MetaCollection } from "@/config/define";
import { GlobalConfig } from "@/config/types";
import { ProcessorOptions } from "@mdx-js/mdx";
import * as path from "node:path";

export type InternalDocCollection = DocCollection;
export type InternalMetaCollection = MetaCollection;

export interface LoadedConfig {
  collections: Map<string, InternalDocCollection | InternalMetaCollection>;
  defaultMdxOptions: ProcessorOptions;
  global?: GlobalConfig;

  _runtime: {
    /**
     * Absolute file path and their associated collections
     */
    files: Map<string, string>;
  };
}

export function findConfigFile(): string {
  return path.resolve("source.config.ts");
}
