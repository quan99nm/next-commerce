import { z } from "zod";

export const checkoutItemSchema = z.object({
  productId: z.string().uuid(),
  variantId: z.string().uuid().optional(),
  warehouse: z.string().min(1), // ví dụ: "main", "hn", "hcm"
  quantity: z.number().int().positive().max(100), // anti abuse
});

export const checkoutSchema = z.object({
  userId: z.string().uuid().optional(),

  email: z.string().email(),
  phone: z.string().regex(/^[0-9]{8,15}$/, "INVALID_PHONE"),
  address: z.string().min(10),

  items: z.array(checkoutItemSchema).min(1),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;

export const cancelOrderSchema = z.object({
  orderId: z.string().uuid(),
});

export type CancelOrderInput = z.infer<typeof cancelOrderSchema>;
