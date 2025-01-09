import { I18nConfig } from "@/i18n"
import { UrlFn } from "@/source/types"

export interface LoaderConfig {
  i18n: boolean
}

export interface LoaderOptions {
  baseUrl: string
  url?: UrlFn
  transformers?: Transformer[]
  /**
   * Configure i18n
   */
  i18n?: I18nConfig
}

export interface LoaderOutput {
  /**
   * generate static params for Next.js SSG
   */
  generateParams: <
    TSlug extends string = "slug",
    TLang extends string = "lang",
  >(
    slug?: TSlug,
    lang?: TLang
  ) => (Record<TSlug, string[]> & Record<TLang, string>)[]
}

export function createGetUrl(baseUrl: string, i18n?: I18nConfig): UrlFn {
  return (slugs, locale) => {
    const hideLocale = i18n?.hideLocale ?? "never"
    let urlLocale: string | undefined

    if (hideLocale === "never") {
      urlLocale = locale
    } else if (
      hideLocale === "default-locale" &&
      locale !== i18n?.defaultLanguage
    ) {
      urlLocale = locale
    }

    const paths = urlLocale
      ? [urlLocale, ...baseUrl.split("/"), ...slugs]
      : [...baseUrl.split("/"), ...slugs]

    return `/${paths.filter((v) => v.length > 0).join("/")}`
  }
}

export function loader<Options extends LoaderOptions>(
  options: Options
): LoaderOutput {
  return createOutput(options) as ReturnType<typeof loader<Options>>
}

function createOutput(options: LoaderOptions) {
  if (!options.url && !options.baseUrl) {
    console.warn("`loader()` now requires a `baseUrl` option to be defined.")
  }

  const { source, rootDir = "", slugs: slugsFn = getSlugs } = options
  const getUrl =
    options.url ?? createGetUrl(options.baseUrl ?? "/", options.i18n)

  return {}
}
