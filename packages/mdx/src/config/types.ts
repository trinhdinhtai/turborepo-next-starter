import { type AnyZodObject, type z } from "zod";
import type { MDXProps } from "mdx/types";
import { type DefaultMDXOptions } from "@/utils/mdx-options";

export interface GlobalConfig {
  /**
   * Configure global MDX options
   */
  mdxOptions?: DefaultMDXOptions;

  /**
   * Fetch last modified time with specified version control
   * @defaultValue 'none'
   */
  lastModifiedTime?: "git" | "none";

  /**
   * Generate manifest file on build mode
   *
   * @defaultValue false
   * @deprecated No longer needed, use a route handler to export build time info
   */
  generateManifest?: boolean;
}

export type InferSchema<CollectionOut> = CollectionOut extends {
  _type: {
    schema: infer T;
  };
}
  ? T
  : never;

export type InferSchemaType<C> =
  InferSchema<C> extends AnyZodObject ? z.output<InferSchema<C>> : never;

export interface FileInfo {
  path: string;
  absolutePath: string;
}

export interface MarkdownProps {
  body: (props: MDXProps) => React.ReactElement;
  _exports: Record<string, unknown>;

  /**
   * Only available when `lastModifiedTime` is enabled on MDX loader
   */
  lastModified?: Date;
}

export type CollectionEntry<
  CollectionOut extends {
    _type: {
      runtime: unknown;
    };
  },
> = CollectionOut["_type"]["runtime"];

export interface BaseCollectionEntry {
  _file: FileInfo;
}

/**
 * Get output type of collections
 */
export type GetOutput<
  C extends {
    _type: {
      runtime: unknown;
    };
  },
> = CollectionEntry<C>[];
