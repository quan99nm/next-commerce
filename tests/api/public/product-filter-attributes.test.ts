import { describe, it, expect, afterAll } from "vitest";
import request from "supertest";
import { cleanupTestProduct, createTestProduct } from "../../helpers/factory";

const BASE_URL = "http://localhost:3000";

describe("Public Product Filter", () => {
  let ctx: Awaited<ReturnType<typeof createTestProduct>>;

  it("filter by price range", async () => {
    ctx = await createTestProduct({ inventoryQuantity: 5 });

    const res = await request(BASE_URL).get(
      "/api/public/products?minPrice=500&maxPrice=1500"
    );

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);

    // (optional) assert giá nằm trong range
    expect(
      res.body.every(
        (p: { basePrice: number }) => p.basePrice >= 500 && p.basePrice <= 1500
      )
    ).toBe(true);
  });

  afterAll(async () => {
    await cleanupTestProduct(ctx);
  });
});
