import { I18nConfig } from "@/i18n"
import type * as PageTree from "@/server/page-tree"
import { type Folder, type MetaFile } from "@/source/file-system"
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

  attachFolder?: (
    node: PageTree.Folder,
    folder: Folder,
    meta?: MetaFile
  ) => PageTree.Folder
}

function buildFolderNode(
  folder: Folder,
  isGlobalRoot: boolean,
  ctx: PageTreeBuilderContext
) {
  const metaPath = resolvePath(folder.file.path, "meta")

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
