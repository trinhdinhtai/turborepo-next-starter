import { defineCollection, defineConfig } from "@content-collections/core";

const documents = defineCollection({
  name: "Doc",
  directory: "content",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    published: z.boolean().default(true),
    date: z.string().optional(),
  }),
  transform: async (document, context) => {
    return {
      ...document,
      slug: `/${document._meta.path}`,
    };
  },
});

export default defineConfig({
  collections: [documents],
});
