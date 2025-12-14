import { describe, it, expect, afterAll } from "vitest";
import request from "supertest";

import { cleanupTestProduct, createTestProduct } from "../../helpers/factory";

const BASE_URL = "http://localhost:3000";

describe("Public Product Detail", () => {
  let ctx: Awaited<ReturnType<typeof createTestProduct>>;

  it("get product by slug with availableStock", async () => {
    ctx = await createTestProduct({ inventoryQuantity: 15 });

    const res = await request(BASE_URL).get(
      `/api/public/products/${ctx.product.slug}`
    );

    expect(res.status).toBe(200);
    expect(res.body.availableStock).toBe(15);
    expect(res.body.isOutOfStock).toBe(false);
  });

  afterAll(async () => {
    await cleanupTestProduct(ctx);
  });
});
