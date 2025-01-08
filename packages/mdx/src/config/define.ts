import { type ZodTypeAny, type z } from "zod";
import { type ProcessorOptions } from "@mdx-js/mdx";
import {
  type BaseCollectionEntry,
  type FileInfo,
  type GlobalConfig,
  type MarkdownProps,
} from "@/config/types";
import { type MDXOptions } from "@/utils/build-mdx";

export interface TransformContext {
  path: string;
  source: string;

  /**
   * Compile MDX to JavaScript
   */
  buildMDX: (source: string, options?: ProcessorOptions) => Promise<string>;
}

export interface BaseCollection<Schema> {
  /**
   * Directories to scan
   */
  dir: string | string[];

  /**
   * what files to include/exclude (glob patterns)
   *
   * Include all files if not specified
   */
  files?: string[];

  schema?: Schema | ((ctx: TransformContext) => Schema);
}

export interface MetaCollection<
  Schema extends ZodTypeAny = ZodTypeAny,
  TransformOutput = unknown,
> extends BaseCollection<Schema> {
  type: "meta";

  /**
   * Do transformation in runtime.
   *
   * This cannot be optimized by bundlers/loaders, avoid expensive calculations here.
   */
  transform?: (
    entry: {
      data: z.output<Schema>;
      file: FileInfo;
    },
    globalConfig?: GlobalConfig
  ) => TransformOutput | Promise<TransformOutput>;
}

export interface DocCollection<
  Schema extends ZodTypeAny = ZodTypeAny,
  Async extends boolean = boolean,
  TransformOutput = unknown,
> extends BaseCollection<Schema> {
  type: "doc";

  /**
   * Do transformation in runtime.
   *
   * This cannot be optimized by bundlers/loaders, avoid expensive calculations here.
   */
  transform?: (
    entry: {
      data: z.output<Schema>;
      file: FileInfo;
      mdx: Async extends true ? MarkdownProps : never;
    },
    globalConfig?: GlobalConfig
  ) => TransformOutput | Promise<TransformOutput>;

  mdxOptions?: MDXOptions;

  /**
   * Load files with async
   */
  async?: Async;
}
