import type { Meta } from "@content-collections/core"
import type { MetaData, PageData } from "@tafiui/core/source"

export interface BaseMetaData extends MetaData {
  _meta: Meta
}

export interface BaseDocsData extends PageData {
  _meta: Meta
}
