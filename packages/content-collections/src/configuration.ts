import type { z as Zod } from "zod";

export function createDocSchema(z: typeof Zod) {
  return {
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
  };
}
