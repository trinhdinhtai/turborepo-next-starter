import { type FileInfo } from "@/source/path"

export interface Folder {
  file: FileInfo
  children: (File | Folder)[]
}
