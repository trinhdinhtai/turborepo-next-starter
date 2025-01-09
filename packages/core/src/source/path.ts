export interface FileInfo {
  /**
   * The locale extension of file
   */
  locale?: string

  /**
   * Original path of file
   */
  path: string

  /**
   * File path without extension
   */
  flattenedPath: string

  /**
   * File name without locale and extension
   */
  name: string

  dirname: string
}
