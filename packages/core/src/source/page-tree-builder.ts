import { I18nConfig } from "@/i18n"
import type * as PageTree from "@/server/page-tree"
import { type Folder } from "@/source/file-system"
import { resolvePath } from "@/utils/path"

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
}

function buildFolderNode(
  folder: Folder,
  isGlobalRoot: boolean,
  ctx: PageTreeBuilderContext
) {
  const metaPath = resolvePath(folder.file.path, "meta")
}

export interface PageTreeBuilder {
  build: (options: BuildPageTreeOptions) => PageTree.Root
}

function build(ctx: PageTreeBuilderContext) {
  const root = ctx.storage.root()
  const folder = buildFolderNode(root, true, ctx)
}

export function createPageTreeBuilder() {}
