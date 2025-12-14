import { prisma } from "@/lib/prisma";
import { TEST_PREFIX } from "./testPrefix";

export async function cleanupTestData() {
  // 1️⃣ Inventory (con)

  await prisma.inventory.deleteMany({
    where: {
      product: {
        slug: {
          startsWith: TEST_PREFIX,
        },
      },
    },
  });

  // 2️⃣ Product
  await prisma.product.deleteMany({
    where: {
      slug: {
        startsWith: TEST_PREFIX,
      },
    },
  });

  // 3️⃣ Brand
  await prisma.brand.deleteMany({
    where: {
      slug: {
        startsWith: TEST_PREFIX,
      },
    },
  });

  // 4️⃣ Category
  await prisma.category.deleteMany({
    where: {
      slug: {
        startsWith: TEST_PREFIX,
      },
    },
  });
}
