import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { orderIdParamSchema } from "@/validators/order.schema";
import { adminGetOrderById } from "@/services/order.service";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = orderIdParamSchema.parse(await params);
    const order = await adminGetOrderById(id);
    return NextResponse.json(order);
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { error: "VALIDATION_ERROR", details: err.issues },
        { status: 400 }
      );
    }

    if (err instanceof Error && err.message === "ORDER_NOT_FOUND") {
      return NextResponse.json({ error: "ORDER_NOT_FOUND" }, { status: 404 });
    }

    console.error(err);
    return NextResponse.json(
      { error: "INTERNAL_SERVER_ERROR" },
      { status: 500 }
    );
  }
}
