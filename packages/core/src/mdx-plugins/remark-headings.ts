import type { Heading, Root } from "mdast"

export interface RemarkHeadingOptions {
  slug?: (root: Root, heading: Heading, text: string) => string

  /**
   * Allow custom headings ids
   *
   * @defaultValue true
   */
  customId?: boolean

  /**
   * Attach an array of `TOCItemType` to `file.data.toc`
   *
   * @defaultValue true
   */
  generateToc?: boolean
}
