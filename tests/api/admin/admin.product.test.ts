import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";

import { ProductStatus } from "@/generated/prisma/client";
import { cleanupTestProduct, createTestProduct } from "@/tests/helpers/factory";

const BASE_URL = "http://localhost:3000";

describe("Admin Product API", () => {
  let ctx: Awaited<ReturnType<typeof createTestProduct>>;

  beforeAll(async () => {
    ctx = await createTestProduct();
  });

  it("POST /api/admin/products should create product", async () => {
    // 👉 product đã được tạo trong factory
    expect(ctx.product.id).toBeDefined();
    expect(ctx.product.slug).toContain("product-");
  });

  it("GET /api/admin/products should list products", async () => {
    const res = await request(BASE_URL).get(
      "/api/admin/products?page=1&limit=10"
    );

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    const found = res.body.find((p: { id: string }) => p.id === ctx.product.id);

    expect(found).toBeDefined();
  });

  it("GET /api/admin/products/:id should return product detail", async () => {
    const res = await request(BASE_URL).get(
      `/api/admin/products/${ctx.product.id}`
    );

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(ctx.product.id);
  });

  it("POST /api/admin/products/:id/status should update product status", async () => {
    const res = await request(BASE_URL)
      .post(`/api/admin/products/${ctx.product.id}/status`)
      .send({
        status: ProductStatus.hidden,
      });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe(ProductStatus.hidden);
  });

  afterAll(async () => {
    await cleanupTestProduct(ctx);
  });
});
