import { prisma } from "@/lib/prisma";
import { CreateCategoryInput } from "@/validators/category.schema";

export async function createCategory(input: CreateCategoryInput) {
  // 1) đảm bảo slug unique
  const exists = await prisma.category.findUnique({
    where: { slug: input.slug },
    select: { id: true },
  });

  if (exists) {
    throw new Error("CATEGORY_SLUG_EXISTS");
  }

  // 2) tạo category
  const category = await prisma.category.create({
    data: {
      name: input.name,
      slug: input.slug,
      parentId: input.parentId ?? null,
    },
  });

  return category;
}
export async function getAllCategories() {
  return prisma.category.findMany({
    where: {
      parentId: null,
    },
    include: {
      children: true,
    },
    orderBy: {
      name: "asc",
    },
  });
}
