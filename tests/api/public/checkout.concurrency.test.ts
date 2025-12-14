import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { cleanupTestProduct, createTestProduct } from "@/tests/helpers/factory";

const BASE_URL = "http://localhost:3000";

describe("Checkout concurrency (oversell protection)", () => {
  let ctx: Awaited<ReturnType<typeof createTestProduct>>;

  beforeAll(async () => {
    ctx = await createTestProduct({
      inventoryQuantity: 5,
    });
  });

  it("should allow only one checkout when concurrent requests exceed stock", async () => {
    const payload = {
      email: "concurrent@test.com",
      phone: "0987654321",
      address: "Concurrency Street",
      items: [
        {
          productId: ctx.product.id,
          warehouse: "default",
          quantity: 4,
        },
      ],
    };

    const [res1, res2] = await Promise.all([
      request(BASE_URL).post("/api/public/orders/checkout").send(payload),
      request(BASE_URL).post("/api/public/orders/checkout").send(payload),
    ]);
    console.log("res1", res1.body);
    console.log("res2", res2.body);
    const successResponses = [res1, res2].filter((r) => r.status === 201);
    const conflictResponses = [res1, res2].filter((r) => r.status === 409);

    expect(successResponses.length).toBe(1);
    expect(conflictResponses.length).toBe(1);
    expect(conflictResponses[0].body.error).toBe("INSUFFICIENT_STOCK");

    /**
     * ✅ Validate side-effect qua API (không query Prisma trực tiếp)
     * - Stock còn 1 → checkout quantity=2 phải fail
     */
    const res3 = await request(BASE_URL)
      .post("/api/public/orders/checkout")
      .send({
        email: "check@test.com",
        phone: "0987654321",
        address: "After Concurrency",
        items: [
          {
            productId: ctx.product.id,
            warehouse: "default",
            quantity: 2,
          },
        ],
      });

    expect(res3.status).toBe(409);
    expect(res3.body.error).toBe("INSUFFICIENT_STOCK");
  });

  afterAll(async () => {
    await cleanupTestProduct(ctx);
  });
});
