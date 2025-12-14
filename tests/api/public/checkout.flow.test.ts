import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";

import { cleanupTestProduct, createTestProduct } from "@/tests/helpers/factory";
import { Order } from "@/generated/prisma/client";

const BASE_URL = "http://localhost:3000";

describe("Checkout → Cancel Order Flow", () => {
  let ctx: Awaited<ReturnType<typeof createTestProduct>>;
  let order1: Order;
  let order2: Order;
  beforeAll(async () => {
    ctx = await createTestProduct({ inventoryQuantity: 15 });
  });

  it("should checkout successfully and reserve inventory", async () => {
    const res = await request(BASE_URL)
      .post("/api/public/orders/checkout")
      .send({
        email: "test@example.com",
        phone: "0987654321",
        address: "123 Test Street",
        items: [
          {
            productId: ctx.product.id,
            warehouse: "default",
            quantity: 2,
          },
        ],
      });

    expect(res.status).toBe(201);

    order1 = res.body as Order;

    expect(order1.id).toBeDefined();
    expect(order1.status).toBe("pending");

    /**
     * ✅ Verify inventory side-effect bằng API
     * quantity = 15 → checkout 2 → checkout 13 OK
     */
    const res2 = await request(BASE_URL)
      .post("/api/public/orders/checkout")
      .send({
        email: "verify@test.com",
        phone: "0987654321",
        address: "Verify Reserve",
        items: [
          {
            productId: ctx.product.id,
            warehouse: "default",
            quantity: 13,
          },
        ],
      });

    expect(res2.status).toBe(201);
    order2 = res2.body as Order;
  });

  it("should cancel order and release inventory", async () => {
    const res = await request(BASE_URL).post("/api/public/orders/cancel").send({
      orderId: order2.id,
    });

    expect(res.status).toBe(200);

    const cancelledOrder = res.body as Order;

    expect(cancelledOrder.id).toBe(order2.id);
    expect(cancelledOrder.status).toBe("cancelled");

    /**
     * ✅ Verify inventory released
     * quantity = 15 → cancel 13 → checkout 2 OK
     */
    const res2 = await request(BASE_URL)
      .post("/api/public/orders/checkout")
      .send({
        email: "verify2@test.com",
        phone: "0987654321",
        address: "Verify Release",
        items: [
          {
            productId: ctx.product.id,
            warehouse: "default",
            quantity: 13,
          },
        ],
      });

    expect(res2.status).toBe(201);
  });

  afterAll(async () => {
    await cleanupTestProduct(ctx);
  });
});
