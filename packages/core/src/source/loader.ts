import { I18nConfig } from "@/i18n"
import * as PageTree from "@/server/page-tree"
import {
  loadFiles,
  type LoadOptions,
  type Transformer,
  type VirtualFile,
} from "@/source/load-files"
import {
  BuildPageTreeOptions,
  createPageTreeBuilder,
} from "@/source/page-tree-builder"
import { FileInfo } from "@/source/path"
import type { MetaData, PageData, UrlFn } from "@/source/types"

export interface SourceConfig {
  pageData: PageData
  metaData: MetaData
}

export interface LoaderConfig {
  source: SourceConfig
  i18n: boolean
}

export interface Source<Config extends SourceConfig> {
  /**
   * @internal
   */
  _config?: Config
  files: VirtualFile[] | ((rootDir: string) => VirtualFile[])
}

export interface LoaderOptions {
  /**
   * @deprecated It is now recommended to filter files on `source` level
   * @defaultValue `''`
   */
  rootDir?: string

  baseUrl: string

  slugs?: LoadOptions["getSlugs"]
  url?: UrlFn
  transformers?: Transformer[]

  /**
   * Additional options for page tree builder
   */
  pageTree?: Partial<Omit<BuildPageTreeOptions, "storage" | "getUrl">>

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Inevitable
  source: Source<any>

  /**
   * Configure i18n
   */
  i18n?: I18nConfig
}

export interface LoaderOutput<Config extends LoaderConfig> {
  pageTree: Config["i18n"] extends true
    ? Record<string, PageTree.Root>
    : PageTree.Root
}

type InferSourceConfig<T> = T extends Source<infer Config> ? Config : never

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

export function getSlugs(info: FileInfo): string[] {
  return [...info.dirname.split("/"), info.name].filter(
    // filter empty folder names and file groups like (group_name)
    (v, i, arr) => {
      if (v.length === 0) return false

      return i === arr.length - 1 ? v !== "index" : !/^\(.+\)$/.test(v)
    }
  )
}

export function loader<Options extends LoaderOptions>(
  options: Options
): LoaderOutput<{
  source: InferSourceConfig<Options["source"]>
  i18n: Options["i18n"] extends I18nConfig ? true : false
}> {
  return createOutput(options) as ReturnType<typeof loader<Options>>
}

function createOutput(options: LoaderOptions): LoaderOutput<LoaderConfig> {
  if (!options.url && !options.baseUrl) {
    console.warn("`loader()` now requires a `baseUrl` option to be defined.")
  }

  const {
    rootDir = "",
    baseUrl,
    url,
    i18n,
    source,
    slugs: slugsFn = getSlugs,
    transformers,
    pageTree: pageTreeOptions,
  } = options
  const getUrl = url ?? createGetUrl(baseUrl ?? "/", i18n)

  const storage = loadFiles(
    typeof source.files === "function" ? source.files(rootDir) : source.files,
    {
      transformers,
      rootDir,
      getSlugs: slugsFn,
    }
  )

  const builder = createPageTreeBuilder()
  const pageTree = i18n
    ? builder.buildI18n({
        storage,
        getUrl,
        i18n,
        ...pageTreeOptions,
      })
    : builder.build({
        storage,
        getUrl,
        ...pageTreeOptions,
      })

  return {
    pageTree: pageTree as LoaderOutput<LoaderConfig>["pageTree"],
  }
}
