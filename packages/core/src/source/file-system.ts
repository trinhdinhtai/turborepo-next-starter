import { type FileInfo } from "@/source/path"
import { type MetaData } from "@/source/types"

export interface MetaFile {
  file: FileInfo
  format: "meta"
  data: MetaData
}

export interface Folder {
  file: FileInfo
  children: (File | Folder)[]
}
