export interface RemarkImageOptions {
  /**
   * Directory or base URL to resolve absolute image paths
   */
  publicDir?: string

  /**
   * Preferred placeholder type
   *
   * @defaultValue 'blur'
   */
  placeholder?: "blur" | "none"

  /**
   * Import images in the file, and let bundlers handle it.
   *
   * ```tsx
   * import MyImage from "./public/img.png";
   *
   * <img src={MyImage} />
   * ```
   *
   * When disabled, `placeholder` will be ignored.
   *
   * @defaultValue true
   */
  useImport?: boolean

  /**
   * Fetch image size of external URLs
   *
   * @defaultValue true
   */
  external?: boolean
}
