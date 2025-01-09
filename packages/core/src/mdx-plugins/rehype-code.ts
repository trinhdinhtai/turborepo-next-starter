import { IconOptions } from "@/mdx-plugins/transformer-icon"
import type { RehypeShikiOptions } from "@shikijs/rehype"
import type { Root } from "hast"
import type { Processor, Transformer } from "unified"

export type RehypeCodeOptions = RehypeShikiOptions & {
  /**
   * Filter meta string before processing
   */
  filterMetaString?: (metaString: string) => string

  /**
   * Add icon to code blocks
   */
  icon?: IconOptions | false

  /**
   * Wrap code blocks in `<Tab>` component when "tab" meta string presents
   *
   * @defaultValue true
   */
  tab?: false

  /**
   * Enable Shiki's experimental JS engine
   *
   * @defaultValue false
   */
  experimentalJSEngine?: boolean
}

/**
 * Handle codeblocks
 */
export function rehypeCode(
  this: Processor,
  options: Partial<RehypeCodeOptions> = {}
) {}
