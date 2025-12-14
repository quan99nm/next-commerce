import { z } from "zod";
import { OrderStatus } from "@/generated/prisma/client";

export const orderIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const updateOrderStatusSchema = z.object({
  status: z.nativeEnum(OrderStatus),
});
export const adminListOrdersQuerySchema = z.object({
  status: z.nativeEnum(OrderStatus).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type AdminListOrdersQuery = z.infer<typeof adminListOrdersQuerySchema>;
