/**
 * Default configuration
 *
 * You may copy and modify the code
 */
import { ResolvePlugins } from "@/resolve-plugins"
import type { Context, Meta } from "@content-collections/core"
import {
  compileMDX as baseCompileMDX,
  type Options as MDXOptions,
} from "@content-collections/mdx"
import { type RemarkHeadingOptions } from "@tafiui/core/mdx-plugins"
import type { z as Zod } from "zod"

export interface TransformOptions
  extends Omit<MDXOptions, "remarkPlugins" | "rehypePlugins"> {
  remarkPlugins?: ResolvePlugins
  rehypePlugins?: ResolvePlugins

  /**
   * Generate `structuredData`
   *
   * @defaultValue true
   */
  generateStructuredData?: boolean

  remarkHeadingOptions?: RemarkHeadingOptions | boolean
}

interface BaseDoc {
  _meta: Meta
  content: string
}

export function createDocSchema(z: typeof Zod) {
  return {
    title: z.string(),
    description: z.string(),
    published: z.boolean().default(true),
    date: z.string().optional(),
    links: z
      .object({
        doc: z.string().optional(),
        api: z.string().optional(),
      })
      .optional(),
    toc: z.boolean().optional().default(true),
  }
}
