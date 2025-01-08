import { createProcessor, type ProcessorOptions } from "@mdx-js/mdx";

interface CompilerOptions {
  addDependency: (file: string) => void;
}

export interface MDXOptions extends ProcessorOptions {
  /**
   * Name of collection
   */
  collection?: string;

  /**
   * Specify a file path for source
   */
  filePath?: string;

  frontmatter?: Record<string, unknown>;

  /**
   * Custom Vfile data
   */
  data?: Record<string, unknown>;

  _compiler?: CompilerOptions;
}
