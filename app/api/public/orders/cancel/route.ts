import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { cancelOrder } from "@/services/order.service";
import { cancelOrderSchema } from "@/validators/checkout.schema";

/**
 * POST /api/orders/cancel
 * → cancel order (pending only)
 */
export async function POST(req: Request) {
  try {
    // 1️⃣ Parse body
    const body = await req.json();

    // 2️⃣ Validate
    const { orderId } = cancelOrderSchema.parse(body);

    // 3️⃣ Business logic
    const order = await cancelOrder(orderId);

    // 4️⃣ Success
    return NextResponse.json(order);
  } catch (err: unknown) {
    // ❌ Validation error
    if (err instanceof ZodError) {
      return NextResponse.json(
        {
          error: "VALIDATION_ERROR",
          details: err.issues,
        },
        { status: 400 }
      );
    }

    // ❌ Business rule errors
    if (err instanceof Error) {
      switch (err.message) {
        case "ORDER_NOT_FOUND":
          return NextResponse.json(
            { error: "ORDER_NOT_FOUND" },
            { status: 404 }
          );

        case "ORDER_CANNOT_BE_CANCELLED":
          return NextResponse.json(
            { error: "ORDER_CANNOT_BE_CANCELLED" },
            { status: 409 }
          );
      }
    }

    // ❌ Unknown error
    console.error(err);
    return NextResponse.json(
      { error: "INTERNAL_SERVER_ERROR" },
      { status: 500 }
    );
  }
}
