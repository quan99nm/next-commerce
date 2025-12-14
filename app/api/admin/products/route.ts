import { NextResponse } from "next/server";
import { ZodError } from "zod";
import {
  adminListProductsQuerySchema,
  createProductSchema,
} from "@/validators/product.schema";
import { adminListProducts, createProduct } from "@/services/product.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const input = createProductSchema.parse(body);

    const product = await createProduct(input);
    return NextResponse.json(product, { status: 201 });
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { error: "VALIDATION_ERROR", details: err.issues },
        { status: 400 }
      );
    }

    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 409 });
    }

    console.error(err);
    return NextResponse.json(
      { error: "INTERNAL_SERVER_ERROR" },
      { status: 500 }
    );
  }
}
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const query = adminListProductsQuerySchema.parse({
    page: searchParams.get("page") ?? undefined,
    limit: searchParams.get("limit") ?? undefined,
    status: searchParams.get("status") ?? undefined,
    categoryId: searchParams.get("categoryId") ?? undefined,
    brandId: searchParams.get("brandId") ?? undefined,
  });

  const products = await adminListProducts(query);
  return NextResponse.json(products);
}
