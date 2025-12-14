import request from "supertest";
import { withTestPrefix } from "./testPrefix";
import { prisma } from "@/lib/prisma";

const BASE_URL = "http://localhost:3000";
export type TestCategory = {
  id: string;
  slug: string;
};

export type TestBrand = {
  id: string;
  slug: string;
};

export type TestProduct = {
  id: string;
  slug: string;
};

export type TestInventory = {
  productId: string;
  warehouse: string;
};

export type TestProductContext = {
  category: TestCategory;
  brand: TestBrand;
  product: TestProduct;
};

export async function createTestCategory() {
  const slug = withTestPrefix(`category-${Date.now()}`);

  const res = await request(BASE_URL).post("/api/admin/categories").send({
    name: slug,
    slug,
  });

  return {
    id: res.body.id,
    slug,
  };
}
export async function createTestBrand() {
  const slug = withTestPrefix(`brand-${Date.now()}`);

  const res = await request(BASE_URL).post("/api/admin/brands").send({
    name: slug,
    slug,
  });

  return {
    id: res.body.id,
    slug,
  };
}
export async function createTestProduct(opts?: {
  inventoryQuantity?: number;
}): Promise<TestProductContext> {
  const category = await createTestCategory();
  const brand = await createTestBrand();

  const slug = withTestPrefix(`product-${Date.now()}`);

  const res = await request(BASE_URL)
    .post("/api/admin/products")
    .send({
      name: slug,
      slug,
      description: "test product",
      basePrice: 1000,
      categoryId: category.id,
      brandId: brand.id,
      thumbnail: "https://example.com/a.jpg",
      inventoryInitial: opts?.inventoryQuantity
        ? { quantity: opts.inventoryQuantity }
        : undefined,
    });

  return {
    category,
    brand,
    product: {
      id: res.body.id,
      slug,
    },
  };
}
export async function createTestOrder(opts?: {
  inventoryQuantity?: number;
  orderQuantity?: number;
}) {
  const ctx = await createTestProduct({
    inventoryQuantity: opts?.inventoryQuantity ?? 5,
  });

  const res = await request(BASE_URL)
    .post("/api/public/orders/checkout")
    .send({
      email: "test@example.com",
      phone: "0987654321",
      address: "Test Address",
      items: [
        {
          productId: ctx.product.id,
          warehouse: "default",
          quantity: opts?.orderQuantity ?? 1,
        },
      ],
    });

  return {
    ...ctx,
    order: {
      id: res.body.id,
    },
  };
}

export async function cleanupTestOrder(orderId: string) {
  await prisma.orderItem.deleteMany({
    where: { orderId },
  });

  await prisma.order.delete({
    where: { id: orderId },
  });
}
export async function cleanupTestBrand(brandId: string) {
  await prisma.brand.delete({
    where: { id: brandId },
  });
}
export async function cleanupTestCategory(categoryId: string) {
  await prisma.category.delete({
    where: { id: categoryId },
  });
}
export async function cleanupTestProduct(ctx?: {
  product?: { id?: string };
  brand?: { id?: string };
  category?: { id?: string };
}) {
  if (!ctx) return;

  const productId = ctx.product?.id;
  const brandId = ctx.brand?.id;
  const categoryId = ctx.category?.id;

  // 1️⃣ Inventory
  if (productId) {
    await prisma.inventory.deleteMany({
      where: { productId },
    });
  }

  // 2️⃣ Product
  if (productId) {
    await prisma.product.delete({
      where: { id: productId },
    });
  }

  // 3️⃣ Brand
  if (brandId) {
    await prisma.brand.delete({
      where: { id: brandId },
    });
  }

  // 4️⃣ Category
  if (categoryId) {
    await prisma.category.delete({
      where: { id: categoryId },
    });
  }
}
