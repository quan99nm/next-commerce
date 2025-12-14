import { prisma } from "@/lib/prisma";
import { CreateBrandInput } from "@/validators/brand.schema";

/**
 * Tạo brand mới
 * - Kiểm tra slug đã tồn tại hay chưa
 * - Nếu trùng → throw error để API layer xử lý
 */
export async function createBrand(input: CreateBrandInput) {
  // 1️⃣ Kiểm tra slug đã tồn tại chưa
  const exists = await prisma.brand.findUnique({
    where: { slug: input.slug },
  });

  if (exists) {
    // Không return response ở đây
    // → chỉ throw error, để API layer quyết định HTTP status
    throw new Error("BRAND_SLUG_EXISTS");
  }

  // 2️⃣ Tạo brand mới
  return prisma.brand.create({
    data: {
      name: input.name,
      slug: input.slug,
      logo: input.logo,
    },
  });
}

/**
 * Lấy danh sách brand (chỉ brand active)
 * - dùng cho admin list hoặc filter sản phẩm
 */
export async function getAllBrands() {
  return prisma.brand.findMany({
    where: {
      isActive: true, // soft delete / disable
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
