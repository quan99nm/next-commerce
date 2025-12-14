import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import { CheckoutInput } from "@/validators/checkout.schema";
import {
  releaseInventoryTx,
  reserveInventoryTx,
} from "@/services/inventory.service";
import { createOrder } from "@/services/order.service";

export async function checkout(input: CheckoutInput) {
  return prisma.$transaction(async (tx) => {
    let subtotal = 0;

    const orderItems: Prisma.OrderItemCreateWithoutOrderInput[] = [];

    // 1️⃣ Validate product + reserve inventory
    for (const item of input.items) {
      const product = await tx.product.findUnique({
        where: { id: item.productId },
        select: {
          id: true,
          name: true,
          basePrice: true,
          salePrice: true,
        },
      });

      if (!product) {
        throw new Error("PRODUCT_NOT_FOUND");
      }

      const price =
        product.salePrice && product.salePrice > 0
          ? product.salePrice
          : product.basePrice;

      // reserve inventory (atomic)
      await reserveInventoryTx(
        tx,
        product.id,
        item.warehouse ?? "default",
        item.quantity
      );

      const lineTotal = price * item.quantity;
      subtotal += lineTotal;

      orderItems.push({
        productId: product.id,
        variantId: item.variantId,
        warehouse: item.warehouse ?? "default",
        name: product.name,
        price,
        quantity: item.quantity,
        snapshot: {
          productId: product.id,
          name: product.name,
          basePrice: product.basePrice,
          salePrice: product.salePrice,
        },
      });
    }

    // 2️⃣ Pricing rules (tạm thời)
    const shipping = subtotal >= 500_000 ? 0 : 30_000;
    const discount = 0;
    const total = subtotal + shipping - discount;

    // 3️⃣ Create order (status = pending)
    const order = await createOrder(tx, {
      userId: input.userId,
      email: input.email,
      phone: input.phone,
      address: input.address,

      subtotal,
      shipping,
      discount,
      total,

      items: orderItems,
    });

    return order;
  });
}
export async function cancelOrder(orderId: string) {
  return prisma.$transaction(async (tx) => {
    // 1️⃣ Lấy order + items
    const order = await tx.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order) {
      throw new Error("ORDER_NOT_FOUND");
    }

    if (order.status !== "pending") {
      throw new Error("ORDER_CANNOT_BE_CANCELLED");
    }

    // 2️⃣ Release inventory
    for (const item of order.items) {
      await releaseInventoryTx(
        tx,
        item.productId,
        item.warehouse,
        item.quantity
      );
    }

    // 3️⃣ Update order status
    return tx.order.update({
      where: { id: order.id },
      data: {
        status: "cancelled",
      },
    });
  });
}
