import { adminUpdateProductStatus } from "@/services/product.service";
import {
  adminProductIdParamSchema,
  adminUpdateProductStatusSchema,
} from "@/validators/product.schema";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = adminProductIdParamSchema.parse(await params);
    const body = await req.json();
    const { status } = adminUpdateProductStatusSchema.parse(body);

    const product = await adminUpdateProductStatus(id, status);
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
