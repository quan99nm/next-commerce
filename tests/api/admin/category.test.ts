import {
  cleanupTestCategory,
  createTestCategory,
} from "@/tests/helpers/factory";
import request from "supertest";
import { describe, it, expect, afterAll, beforeAll } from "vitest";

const BASE_URL = "http://localhost:3000";

describe("Admin Category API", () => {
  let category: Awaited<ReturnType<typeof createTestCategory>>;

  beforeAll(async () => {
    category = await createTestCategory();
  });

  it("POST /api/admin/categories - create category", async () => {
    // 👉 đã được tạo trong factory
    expect(category.id).toBeDefined();
    expect(category.slug).toContain("category-");
  });

  it("POST /api/admin/categories - slug conflict", async () => {
    const res = await request(BASE_URL).post("/api/admin/categories").send({
      name: "Electronics 2",
      slug: category.slug,
    });

    expect(res.status).toBe(409);
    expect(res.body.error).toBe("CATEGORY_SLUG_EXISTS");
  });

  it("GET /api/admin/categories - list categories", async () => {
    const res = await request(BASE_URL).get("/api/admin/categories");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    const found = res.body.find((c: { id: string }) => c.id === category.id);

    expect(found).toBeDefined();
  });

  afterAll(async () => {
    await cleanupTestCategory(category.id);
  });
});
