import { type FileInfo } from "@/source/path"
import { type MetaData, type PageData } from "@/source/types"

export interface MetaFile {
  file: FileInfo
  format: "meta"
  data: MetaData
}

export interface PageFile {
  file: FileInfo
  format: "page"
  data: {
    slugs: string[]
    data: PageData
  }
}

export type File = MetaFile | PageFile

export interface Folder {
  file: FileInfo
  children: (File | Folder)[]
}
