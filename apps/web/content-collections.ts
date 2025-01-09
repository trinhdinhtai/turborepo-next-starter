import { defineCollection, defineConfig } from "@content-collections/core"
import {
  createDocSchema,
  transformMDX,
} from "@tafiui/content-collections/configuration"

const documents = defineCollection({
  name: "docs",
  directory: "content/docs",
  include: "**/*.mdx",
  schema: createDocSchema,
  transform: transformMDX,
})

export default defineConfig({
  collections: [documents],
})
