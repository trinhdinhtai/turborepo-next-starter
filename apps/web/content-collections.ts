import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { codeImport } from "remark-code-import";
import remarkGfm from "remark-gfm";

const documents = defineCollection({
  name: "Doc",
  directory: "content/docs",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    published: z.boolean().default(true),
    date: z.string().optional(),
    links: z
      .object({
        doc: z.string().optional(),
        api: z.string().optional(),
      })
      .optional(),
    toc: z.boolean().optional().default(true),
  }),
  transform: async (document, context) => {
    const body = await compileMDX(context, document, {
      remarkPlugins: [codeImport, remarkGfm],
    });
    return {
      ...document,
      slug: document._meta.path === "index" ? "" : `/${document._meta.path}`,
      body: {
        raw: document.content,
        code: body,
      },
    };
  },
});

export default defineConfig({
  collections: [documents],
});
