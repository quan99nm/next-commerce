import { NextResponse } from "next/server";
import { getProductBySlug } from "@/services/product.service";

/**
 * GET /api/public/products/:slug
 * → product detail page
 */
export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  // ❌ Không tìm thấy product
  if (!product) {
    return NextResponse.json({ error: "PRODUCT_NOT_FOUND" }, { status: 404 });
  }

  // ✅ Thành công
  return NextResponse.json(product);
}
