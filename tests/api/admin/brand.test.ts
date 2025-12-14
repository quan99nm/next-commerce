import { withTestPrefix } from "@/tests/helpers/testPrefix";
import request from "supertest";
import { describe, it, expect, afterAll, beforeAll } from "vitest";

import { cleanupTestBrand, createTestBrand } from "@/tests/helpers/factory";

const BASE_URL = "http://localhost:3000";

describe("Admin Brand API", () => {
  let brand: Awaited<ReturnType<typeof createTestBrand>>;

  beforeAll(async () => {
    brand = await createTestBrand();
  });

  it("POST /api/admin/brands - create brand", async () => {
    // 👉 đã được tạo trong factory
    expect(brand.id).toBeDefined();
    expect(brand.slug).toContain("brand-");
  });

  it("POST /api/admin/brands - slug conflict", async () => {
    const res = await request(BASE_URL).post("/api/admin/brands").send({
      name: "Apple Duplicate",
      slug: brand.slug,
    });

    expect(res.status).toBe(409);
    expect(res.body.error).toBe("BRAND_SLUG_EXISTS");
  });

  it("GET /api/admin/brands - list brands", async () => {
    const res = await request(BASE_URL).get("/api/admin/brands");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    const found = res.body.find((b: { id: string }) => b.id === brand.id);

    expect(found).toBeDefined();
  });

  afterAll(async () => {
    await cleanupTestBrand(brand.id);
  });
});
