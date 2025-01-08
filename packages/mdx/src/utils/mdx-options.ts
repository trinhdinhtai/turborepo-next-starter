import type { ProcessorOptions } from "@mdx-js/mdx";

export type DefaultMDXOptions = Omit<
  NonNullable<ProcessorOptions>,
  "rehypePlugins" | "remarkPlugins" | "_ctx"
> & {
  /**
   * Properties to export from `vfile.data`
   */
  valueToExport?: string[];
};
