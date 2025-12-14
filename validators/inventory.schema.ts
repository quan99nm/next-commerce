import { z } from "zod";

/**
 * =========================
 * Common
 * =========================
 */

export const productIdSchema = z.string().uuid();
export const warehouseSchema = z.string().min(1).default("default");
export const quantitySchema = z.number().int().min(0);
export const positiveQuantitySchema = z.number().int().positive();

/**
 * =========================
 * Admin upsert inventory
 * (chỉnh tồn kho thực)
 * =========================
 */
export const upsertInventorySchema = z.object({
  productId: productIdSchema,
  warehouse: warehouseSchema,
  quantity: quantitySchema,
});

export type UpsertInventoryInput = z.infer<typeof upsertInventorySchema>;

/**
 * =========================
 * Reserve / Release inventory
 * (internal – system use)
 * =========================
 */
export const inventoryActionSchema = z.object({
  productId: productIdSchema,
  warehouse: warehouseSchema,
  quantity: positiveQuantitySchema,
});

export type InventoryActionInput = z.infer<typeof inventoryActionSchema>;

/**
 * =========================
 * Get inventory by product
 * =========================
 */
export const getInventoryQuerySchema = z.object({
  productId: productIdSchema,
});

export type GetInventoryInput = z.infer<typeof getInventoryQuerySchema>;
