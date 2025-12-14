import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
type Tx = Prisma.TransactionClient;
/**
 * Lấy tổng stock còn khả dụng
 */
export async function getAvailableStock(productId: string): Promise<number> {
  const inventories = await prisma.inventory.findMany({
    where: { productId },
    select: {
      quantity: true,
      reserved: true,
    },
  });

  return inventories.reduce<number>(
    (sum, inv) => sum + (inv.quantity - inv.reserved),
    0
  );
}

/**
 * Admin upsert inventory
 */
export async function upsertInventory(
  productId: string,
  warehouse: string,
  quantity: number
) {
  return prisma.inventory.upsert({
    where: {
      productId_warehouse: {
        productId,
        warehouse,
      },
    },
    create: {
      productId,
      warehouse,
      quantity,
    },
    update: {
      quantity,
    },
  });
}

export async function getInventoryByProductId(productId: string) {
  // 1️⃣ check product tồn tại
  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { id: true },
  });

  if (!product) {
    throw new Error("PRODUCT_NOT_FOUND");
  }

  // 2️⃣ lấy inventory
  return prisma.inventory.findMany({
    where: { productId },
    orderBy: { warehouse: "asc" },
  });
}

/**
 * Reserve inventory (giữ hàng)
 */

export async function reserveInventoryTx(
  tx: Tx,
  productId: string,
  warehouse: string,
  quantity: number
) {
  const inventory = await tx.inventory.findUnique({
    where: {
      productId_warehouse: { productId, warehouse },
    },
  });

  if (!inventory) {
    throw new Error("INVENTORY_NOT_FOUND");
  }

  const available = inventory.quantity - inventory.reserved;

  if (available < quantity) {
    throw new Error("INSUFFICIENT_STOCK");
  }

  return tx.inventory.update({
    where: { id: inventory.id },
    data: {
      reserved: { increment: quantity },
    },
  });
}
/**
 * Release inventory (trả hàng)
 */
export async function releaseInventoryTx(
  tx: Tx,
  productId: string,
  warehouse: string,
  quantity: number
) {
  const inventory = await tx.inventory.findUnique({
    where: {
      productId_warehouse: { productId, warehouse },
    },
  });

  if (!inventory || inventory.reserved < quantity) {
    throw new Error("INVALID_RELEASE");
  }

  return tx.inventory.update({
    where: { id: inventory.id },
    data: {
      reserved: { decrement: quantity },
    },
  });
}
export async function commitInventoryTx(
  tx: Tx,
  productId: string,
  warehouse: string,
  quantity: number
) {
  return tx.inventory.update({
    where: {
      productId_warehouse: { productId, warehouse },
    },
    data: {
      quantity: { decrement: quantity },
      reserved: { decrement: quantity },
    },
  });
}
export async function adminGetInventoryByProduct(productId: string) {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { id: true },
  });

  if (!product) {
    throw new Error("PRODUCT_NOT_FOUND");
  }

  return prisma.inventory.findMany({
    where: { productId },
    orderBy: { warehouse: "asc" },
  });
}

export async function adminUpsertInventory(
  productId: string,
  warehouse: string,
  quantity: number
) {
  return prisma.inventory.upsert({
    where: {
      productId_warehouse: {
        productId,
        warehouse,
      },
    },
    create: {
      productId,
      warehouse,
      quantity,
    },
    update: {
      quantity,
    },
  });
}
