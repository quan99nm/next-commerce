import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";

import { cleanupTestProduct, createTestProduct } from "@/tests/helpers/factory";

const BASE_URL = "http://localhost:3000";

describe("Admin Inventory API", () => {
  let ctx: Awaited<ReturnType<typeof createTestProduct>>;

  beforeAll(async () => {
    ctx = await createTestProduct({ inventoryQuantity: 10 });
  });

  afterAll(async () => {
    await cleanupTestProduct(ctx);
  });

  it("GET /api/admin/inventory?productId should return inventory list", async () => {
    const res = await request(BASE_URL)
      .get("/api/admin/inventory")
      .query({ productId: ctx.product.id });

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    const inventory = res.body[0];

    expect(inventory.productId).toBe(ctx.product.id);
    expect(inventory.quantity).toBe(10);
    expect(inventory.reserved).toBe(0);
  });

  it("POST /api/admin/inventory should upsert inventory", async () => {
    const res = await request(BASE_URL).post("/api/admin/inventory").send({
      productId: ctx.product.id,
      warehouse: "default",
      quantity: 20,
    });

    expect(res.status).toBe(200);
    expect(res.body.productId).toBe(ctx.product.id);
    expect(res.body.quantity).toBe(20);
  });
});
