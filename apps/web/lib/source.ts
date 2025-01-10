import { createMDXSource } from "@tafiui/content-collections"
import { loader } from "@tafiui/core/source"
import { allDocs, allMetas } from "content-collections"

export const source = loader({
  baseUrl: "/docs",
  source: createMDXSource(allDocs, allMetas),
})
