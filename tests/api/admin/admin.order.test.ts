import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";

import {
  cleanupTestOrder,
  cleanupTestProduct,
  createTestOrder,
} from "@/tests/helpers/factory";

const BASE_URL = "http://localhost:3000";

describe("Admin Order API", () => {
  let ctx: Awaited<ReturnType<typeof createTestOrder>>;

  beforeAll(async () => {
    ctx = await createTestOrder({
      inventoryQuantity: 5,
      orderQuantity: 1,
    });
  });

  afterAll(async () => {
    await cleanupTestOrder(ctx.order.id);
    await cleanupTestProduct(ctx);
  });

  it("GET /api/admin/orders should return order list", async () => {
    const res = await request(BASE_URL).get("/api/admin/orders");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.items)).toBe(true);

    const found = res.body.items.find(
      (o: { id: string }) => o.id === ctx.order.id
    );

    expect(found).toBeDefined();
  });

  it("GET /api/admin/orders/:id should return order detail", async () => {
    const res = await request(BASE_URL).get(
      `/api/admin/orders/${ctx.order.id}`
    );

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(ctx.order.id);
    expect(Array.isArray(res.body.items)).toBe(true);
  });

  it("POST /api/admin/orders/:id/status should update status", async () => {
    const res = await request(BASE_URL)
      .post(`/api/admin/orders/${ctx.order.id}/status`)
      .send({
        status: "shipped",
      });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("shipped");
  });
});
