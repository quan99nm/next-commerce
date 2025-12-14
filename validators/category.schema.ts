import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1, "name is required"),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, "slug must be lowercase and hyphenated"),
  parentId: z.string().uuid().optional().nullable(),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
