import { OrderStatus, Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { AdminListOrdersQuery } from "@/validators/order.schema";
import { releaseInventoryTx } from "./inventory.service";

type Tx = Prisma.TransactionClient;

export type CreateOrderInput = {
  userId?: string;
  email: string;
  phone: string;
  address: string;

  subtotal: number;
  shipping: number;
  discount: number;
  total: number;

  items: Prisma.OrderItemCreateWithoutOrderInput[];
};

export async function createOrder(tx: Tx, input: CreateOrderInput) {
  return tx.order.create({
    data: {
      userId: input.userId,
      email: input.email.toLowerCase(),
      phone: input.phone,
      address: input.address,

      subtotal: input.subtotal,
      shipping: input.shipping,
      discount: input.discount,
      total: input.total,

      status: "pending",

      items: {
        create: input.items.map((item) => ({
          productId: item.productId,
          variantId: item.variantId,
          name: item.name,
          price: item.price,
          warehouse: item.warehouse,
          quantity: item.quantity,
          snapshot: item.snapshot,
        })),
      },
    },
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

      await releaseInventoryTx(
        tx,
        product.id,
        item.warehouse ?? "default",
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
export async function adminGetOrders() {
  return prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });
}

export async function adminGetOrderById(orderId: string) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true },
  });

  if (!order) {
    throw new Error("ORDER_NOT_FOUND");
  }

  return order;
}

export async function adminUpdateOrderStatus(
  orderId: string,
  status: OrderStatus
) {
  try {
    return await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  } catch {
    throw new Error("ORDER_NOT_FOUND");
  }
}
export async function adminListOrders(query: AdminListOrdersQuery) {
  const { status, page, limit } = query;

  const where = status ? { status } : {};

  const [items, total] = await Promise.all([
    prisma.order.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        items: true,
      },
    }),
    prisma.order.count({ where }),
  ]);

  return {
    items,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}
