import { NextResponse } from "next/server";
import { getAvailableStock } from "@/services/inventory.service";
import { getProductIdBySlug } from "@/services/product.service";

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const productId = await getProductIdBySlug(params.slug);

  if (!productId) {
    return NextResponse.json({ error: "PRODUCT_NOT_FOUND" }, { status: 404 });
  }

  const available = await getAvailableStock(productId);

  return NextResponse.json({
    available,
    inStock: available > 0,
  });
}
