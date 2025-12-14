import { adminSoftDeleteProduct } from "@/services/product.service";
import { adminProductIdParamSchema } from "@/validators/product.schema";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * POST /api/admin/products/:id/delete
 * → soft delete product (status = archived)
 */
export async function POST(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = adminProductIdParamSchema.parse(await params);

    const product = await adminSoftDeleteProduct(id);
    return NextResponse.json(product);
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { error: "VALIDATION_ERROR", details: err.issues },
        { status: 400 }
      );
    }

    if (err instanceof Error && err.message === "PRODUCT_NOT_FOUND") {
      return NextResponse.json({ error: "PRODUCT_NOT_FOUND" }, { status: 404 });
    }

    console.error(err);
    return NextResponse.json(
      { error: "INTERNAL_SERVER_ERROR" },
      { status: 500 }
    );
  }
}
