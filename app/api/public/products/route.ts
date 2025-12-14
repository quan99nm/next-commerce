import { NextResponse } from "next/server";
import { getProducts } from "@/services/product.service";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 10);

  const categoryId = searchParams.get("categoryId") ?? undefined;
  const brandId = searchParams.get("brandId") ?? undefined;

  const minPrice = searchParams.get("minPrice")
    ? Number(searchParams.get("minPrice"))
    : undefined;

  const maxPrice = searchParams.get("maxPrice")
    ? Number(searchParams.get("maxPrice"))
    : undefined;

  /**
   * 🎯 Parse attributes filter
   * attr_color=black → { color: "black" }
   */
  const attributes: Record<string, string | number | boolean> = {};

  searchParams.forEach((value, key) => {
    if (key.startsWith("attr_")) {
      const attrKey = key.replace("attr_", "");

      // convert number / boolean nếu có thể
      if (value === "true" || value === "false") {
        attributes[attrKey] = value === "true";
      } else if (!isNaN(Number(value))) {
        attributes[attrKey] = Number(value);
      } else {
        attributes[attrKey] = value;
      }
    }
  });

  const products = await getProducts({
    page,
    limit,
    categoryId,
    brandId,
    minPrice,
    maxPrice,
    attributes,
  });

  return NextResponse.json(products);
}
