import { NextResponse } from "next/server";
import { ZodError } from "zod";
import {
  orderIdParamSchema,
  updateOrderStatusSchema,
} from "@/validators/order.schema";
import { adminUpdateOrderStatus } from "@/services/order.service";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = orderIdParamSchema.parse(await params);
    const body = await req.json();
    const { status } = updateOrderStatusSchema.parse(body);

    const order = await adminUpdateOrderStatus(id, status);
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
