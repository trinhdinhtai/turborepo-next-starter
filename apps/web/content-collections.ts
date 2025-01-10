import { defineCollection, defineConfig } from "@content-collections/core"
import {
  createDocSchema,
  createMetaSchema,
  transformMDX,
} from "@tafiui/content-collections/configuration"

const documents = defineCollection({
  name: "docs",
  directory: "content/docs",
  include: "**/*.mdx",
  schema: createDocSchema,
  transform: transformMDX,
})

const metas = defineCollection({
  name: "meta",
  directory: "content/docs",
  include: "**/meta.json",
  parser: "json",
  schema: createMetaSchema,
})

export default defineConfig({
  collections: [documents, metas],
})
