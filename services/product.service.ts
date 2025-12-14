import { prisma } from "@/lib/prisma";
import { CreateProductInput } from "@/validators/product.schema";
import { getAvailableStock } from "./inventory.service";
import { ProductStatus } from "@/generated/prisma/enums";

/**
 * Tạo product mới
 * - kiểm tra slug trùng
 * - đảm bảo category & brand tồn tại
 */

export async function createProduct(input: CreateProductInput) {
  const exists = await prisma.product.findUnique({
    where: { slug: input.slug },
  });

  if (exists) {
    throw new Error("PRODUCT_SLUG_EXISTS");
  }
  // 3️⃣ Check category tồn tại
  console.log("input.categoryId", input.categoryId);
  const category = await prisma.category.findUnique({
    where: { id: input.categoryId },
    select: { id: true },
  });
  console.log("category", category);
  if (!category) {
    throw new Error("CATEGORY_NOT_FOUND");
  }

  // 4 Check brand tồn tại
  const brand = await prisma.brand.findUnique({
    where: { id: input.brandId },
    select: { id: true },
  });

  if (!brand) {
    throw new Error("BRAND_NOT_FOUND");
  }
  return prisma.$transaction(async (tx) => {
    // 1️⃣ Create product tồn tại
    const product = await tx.product.create({
      data: {
        name: input.name,
        slug: input.slug,
        description: input.description,
        shortDesc: input.shortDesc,
        basePrice: input.basePrice,
        salePrice: input.salePrice,
        categoryId: input.categoryId,
        brandId: input.brandId,
        thumbnail: input.thumbnail,
        images: input.images,
        attributes: input.attributes,
        tags: input.tags,
      },
    });

    // 5 Optional: tạo inventory ban đầu
    if (input.inventoryInitial) {
      await tx.inventory.create({
        data: {
          productId: product.id,
          warehouse: input.inventoryInitial.warehouse,
          quantity: input.inventoryInitial.quantity,
        },
      });
    }

    return product;
  });
}

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findFirst({
    where: {
      slug,
      status: "active",
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
      brand: {
        select: {
          id: true,
          name: true,
          slug: true,
          logo: true,
        },
      },
    },
  });

  if (!product) return null;

  const availableStock = await getAvailableStock(product.id);

  return {
    ...product,
    availableStock,
    isOutOfStock: availableStock <= 0,
  };
}
type ProductFilterParams = {
  page: number;
  limit: number;
  categoryId?: string;
  brandId?: string;
  minPrice?: number;
  maxPrice?: number;
  attributes?: Record<string, string | number | boolean>;
};

export async function getProducts(params: ProductFilterParams) {
  const { page, limit, categoryId, brandId, minPrice, maxPrice, attributes } =
    params;

  /**
   * 🔥 Build JSONB attribute conditions
   */
  const attributeConditions = attributes
    ? Object.entries(attributes).map(([key, value]) => ({
        attributes: {
          path: [key],
          equals: value,
        },
      }))
    : [];

  return prisma.product.findMany({
    where: {
      status: "active",

      ...(categoryId && { categoryId }),
      ...(brandId && { brandId }),

      ...(minPrice !== undefined || maxPrice !== undefined
        ? {
            basePrice: {
              ...(minPrice !== undefined && { gte: minPrice }),
              ...(maxPrice !== undefined && { lte: maxPrice }),
            },
          }
        : {}),

      /**
       * 🎯 JSONB filter (AND tất cả attributes)
       */
      ...(attributeConditions.length > 0
        ? {
            AND: attributeConditions,
          }
        : {}),
    },

    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: "desc" },
  });
}
/**
 * Lấy product ID theo slug
 * Chỉ expose dữ liệu cần thiết
 */
export async function getProductIdBySlug(slug: string): Promise<string | null> {
  const product = await prisma.product.findUnique({
    where: { slug },
    select: { id: true },
  });

  return product?.id ?? null;
}
/** admin product funtion */
export async function adminListProducts(params: {
  page: number;
  limit: number;
  status?: ProductStatus;
  categoryId?: string;
  brandId?: string;
}) {
  const { page, limit, status, categoryId, brandId } = params;

  return prisma.product.findMany({
    where: {
      ...(status && { status }),
      ...(categoryId && { categoryId }),
      ...(brandId && { brandId }),
    },
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: "desc" },
  });
}

export async function adminGetProductById(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    throw new Error("PRODUCT_NOT_FOUND");
  }

  return product;
}

export async function adminUpdateProduct(
  id: string,
  data: Partial<CreateProductInput>
) {
  try {
    return await prisma.product.update({
      where: { id },
      data,
    });
  } catch {
    throw new Error("PRODUCT_NOT_FOUND");
  }
}

export async function adminUpdateProductStatus(
  id: string,
  status: ProductStatus
) {
  try {
    return await prisma.product.update({
      where: { id },
      data: { status },
    });
  } catch {
    throw new Error("PRODUCT_NOT_FOUND");
  }
}
export async function adminSoftDeleteProduct(productId: string) {
  try {
    return await prisma.product.update({
      where: { id: productId },
      data: {
        status: ProductStatus.archived,
      },
    });
  } catch {
    throw new Error("PRODUCT_NOT_FOUND");
  }
}
