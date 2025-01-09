import { type ReactElement } from "react"
import { I18nConfig } from "@/i18n"
import type * as PageTree from "@/server/page-tree"
import {
  type File,
  type Folder,
  type MetaFile,
  type PageFile,
} from "@/source/file-system"
import { type UrlFn } from "@/source/types"
import { resolvePath } from "@/utils/path"
import { removeUndefined } from "@/utils/remove-undefined"

interface PageTreeBuilderContext {
  lang?: string

  storage: Storage
  builder: PageTreeBuilder
  options: BuildPageTreeOptions

  i18n?: I18nConfig
}

export interface BuildPageTreeOptions {
  /**
   * Remove references to the file path of original nodes (`$ref`)
   *
   * @defaultValue false
   */
  noRef?: boolean

  attachFile?: (node: PageTree.Item, file?: PageFile) => PageTree.Item
  attachFolder?: (
    node: PageTree.Folder,
    folder: Folder,
    meta?: MetaFile
  ) => PageTree.Folder

  getUrl: UrlFn
  resolveIcon?: (icon: string | undefined) => ReactElement | undefined
}

function findLocalizedFile<F extends File["format"]>(
  path: string,
  format: F,
  ctx: PageTreeBuilderContext
): Extract<File, { format: F }> | undefined {
  if (!ctx.lang) return

  return ctx.storage.read(`${path}.${ctx.lang}`, format)
}

function buildFileNode(
  file: PageFile,
  ctx: PageTreeBuilderContext
): PageTree.Item {
  const localized =
    findLocalizedFile(file.file.flattenedPath, "page", ctx) ?? file

  const item: PageTree.Item = {
    type: "page",
    name: localized.data.data.title,
    icon: ctx.options.resolveIcon?.(localized.data.data.icon),
    url: ctx.options.getUrl(localized.data.slugs, ctx.lang),
    $ref: !ctx.options.noRef
      ? {
          file: localized.file.path,
        }
      : undefined,
  }

  return removeUndefined(ctx.options.attachFile?.(item, file) ?? item)
}

function buildFolderNode(
  folder: Folder,
  isGlobalRoot: boolean,
  ctx: PageTreeBuilderContext
) {
  const metaPath = resolvePath(folder.file.path, "meta")
  let meta = ctx.storage.read(metaPath, "meta")
  meta = findLocalizedFile(metaPath, "meta", ctx) ?? meta

  const indexFile = ctx.storage.read(
    resolvePath(folder.file.flattenedPath, "index"),
    "page"
  )

  const metadata = meta?.data
  const index = indexFile ? buildFileNode(indexFile, ctx) : undefined

  let children: PageTree.Node[]

  //   const node: PageTree.Folder = {
  //     type: "folder",
  //     name: metadata?.title ?? index?.name ?? pathToName(folder.file.name, true),
  //     root: metadata?.root,
  //     defaultOpen: metadata?.defaultOpen,
  //     description: metadata?.description,
  //     index,
  //     children,
  //     $ref: !ctx.options.noRef
  //       ? {
  //           metaFile: meta?.file.path,
  //         }
  //       : undefined,
  //   }

  //   return removeUndefined(ctx.options.attachFolder?.(node, folder, meta) ?? node)
}

export interface PageTreeBuilder {
  build: (options: BuildPageTreeOptions) => PageTree.Root
}

function build(ctx: PageTreeBuilderContext) {
  const root = ctx.storage.root()
  const folder = buildFolderNode(root, true, ctx)
}

export function createPageTreeBuilder() {}
