import { UrlFn } from "@/source/types"

export interface LoaderConfig {
  i18n: boolean
}

export interface LoaderOptions {
  baseUrl: string
  url?: UrlFn
  transformers?: Transformer[]
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

export function loader<Options extends LoaderOptions>(
  options: Options
): LoaderOutput {
  return createOutput(options) as ReturnType<typeof loader<Options>>
}

function createOutput(options: LoaderOptions) {
  if (!options.url && !options.baseUrl) {
    console.warn("`loader()` now requires a `baseUrl` option to be defined.")
  }

  return {}
}
