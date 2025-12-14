import { ProductStatus } from "@/generated/prisma/enums";
import { z } from "zod";

/**
 * Validate dữ liệu khi tạo product
 * Không dùng any – tất cả typed
 */
export const createProductSchema = z.object({
  name: z.string().min(3),
  slug: z.string().min(3),
  description: z.string(),
  shortDesc: z.string().optional(),

  basePrice: z.number().int().positive(),
  salePrice: z.number().int().positive().optional(),

  categoryId: z.string().uuid(),
  brandId: z.string().uuid(),

  thumbnail: z.string().url(),
  images: z.array(z.string().url()).optional(),

  attributes: z
    .record(z.string(), z.union([z.string(), z.number(), z.boolean()]))
    .optional(),

  tags: z.array(z.string()).optional(),
  inventoryInitial: z
    .object({
      quantity: z.number().int().nonnegative(),
      warehouse: z.string().default("default"),
    })
    .optional(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;

export const adminListProductsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  status: z.nativeEnum(ProductStatus).optional(),
  categoryId: z.string().uuid().optional(),
  brandId: z.string().uuid().optional(),
});

export const adminProductIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const adminUpdateProductStatusSchema = z.object({
  status: z.nativeEnum(ProductStatus),
});
