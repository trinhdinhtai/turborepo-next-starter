export interface MetaData {
  icon?: string | undefined
  title?: string | undefined
  root?: boolean | undefined
  pages?: string[] | undefined
  defaultOpen?: boolean | undefined

  description?: string | undefined
}

/**
 * @internal
 */
export type UrlFn = (slugs: string[], locale?: string) => string
