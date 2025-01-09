import { type MetaData, type PageData } from "@/source/types"

import { Storage } from "./file-system"
import { normalizePath, parseFilePath, type FileInfo } from "./path"

export interface VirtualFile {
  /**
   * Relative path
   *
   * @example `docs/page.mdx`
   */
  path: string
  type: "page" | "meta"

  /**
   * Specified Slugs for page
   */
  slugs?: string[]
  data: unknown
}

export interface LoadOptions {
  transformers?: Transformer[]
  rootDir?: string
  getSlugs: (info: FileInfo) => string[]
}

export type Transformer = (context: {
  storage: Storage
  options: LoadOptions
}) => void

// Virtual files -> Virtual Storage -> Transformers -> Result
export function loadFiles(files: VirtualFile[], options: LoadOptions): Storage {
  const { transformers = [] } = options
  const storage = new Storage()
  const rootDir = normalizePath(options.rootDir ?? "")

  for (const file of files) {
    const normalizedPath = normalizePath(file.path)
    if (!normalizedPath.startsWith(rootDir)) continue

    const relativePath = normalizedPath.slice(rootDir.length)

    if (file.type === "page") {
      const slugs = file.slugs ?? options.getSlugs(parseFilePath(relativePath))

      storage.write(relativePath, file.type, {
        slugs,
        data: file.data as PageData,
      })
    }

    if (file.type === "meta") {
      storage.write(relativePath, file.type, file.data as MetaData)
    }
  }

  for (const transformer of transformers) {
    transformer({
      storage,
      options,
    })
  }

  return storage
}
