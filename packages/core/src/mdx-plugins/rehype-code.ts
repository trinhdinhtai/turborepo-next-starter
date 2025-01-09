import { IconOptions } from "@/mdx-plugins/transformer-icon"
import type { RehypeShikiOptions } from "@shikijs/rehype"

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
