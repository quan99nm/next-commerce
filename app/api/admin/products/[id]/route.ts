import {
  adminGetProductById,
  adminUpdateProduct,
} from "@/services/product.service";
import { adminProductIdParamSchema } from "@/validators/product.schema";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = adminProductIdParamSchema.parse(await params);
    const product = await adminGetProductById(id);
    return NextResponse.json(product);
  } catch (err) {
    if (err instanceof ZodError)
      return NextResponse.json({ error: "VALIDATION_ERROR" }, { status: 400 });

    if (err instanceof Error && err.message === "PRODUCT_NOT_FOUND")
      return NextResponse.json({ error: err.message }, { status: 404 });

    return NextResponse.json(
      { error: "INTERNAL_SERVER_ERROR" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = adminProductIdParamSchema.parse(await params);
    const body = await req.json();

    const product = await adminUpdateProduct(id, body);
    return NextResponse.json(product);
  } catch (err) {
    if (err instanceof Error && err.message === "PRODUCT_NOT_FOUND")
      return NextResponse.json({ error: err.message }, { status: 404 });

    return NextResponse.json(
      { error: "INTERNAL_SERVER_ERROR" },
      { status: 500 }
    );
  }
}
