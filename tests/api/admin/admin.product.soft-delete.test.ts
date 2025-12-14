import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";

import { ProductStatus } from "@/generated/prisma/client";
import { cleanupTestProduct, createTestProduct } from "@/tests/helpers/factory";

const BASE_URL = "http://localhost:3000";

describe("Admin soft delete product", () => {
  let ctx: Awaited<ReturnType<typeof createTestProduct>>;

  beforeAll(async () => {
    ctx = await createTestProduct();
  });

  it("should soft delete product (status = archived)", async () => {
    const res = await request(BASE_URL).post(
      `/api/admin/products/${ctx.product.id}/delete`
    );

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(ctx.product.id);
    expect(res.body.status).toBe(ProductStatus.archived);
  });

  it("should not appear in public product query after soft delete", async () => {
    const res = await request(BASE_URL).get(
      "/api/public/products?page=1&limit=10"
    );

    const found = res.body.find((p: { id: string }) => p.id === ctx.product.id);

    expect(found).toBeUndefined();
  });

  afterAll(async () => {
    await cleanupTestProduct(ctx);
  });
});
