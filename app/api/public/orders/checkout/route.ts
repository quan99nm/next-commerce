import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { checkoutSchema } from "@/validators/checkout.schema";
import { checkout } from "@/services/checkout.service";

/**
 * POST /api/checkout
 * → reserve inventory + tạo order (pending)
 */
export async function POST(req: Request) {
  try {
    // 1️⃣ Parse JSON body
    const body = await req.json();

    // 2️⃣ Validate input (Zod – throw nếu sai)
    const input = checkoutSchema.parse(body);

    // 3️⃣ Business logic
    const order = await checkout(input);

    // 4️⃣ Success response
    return NextResponse.json(order, { status: 201 });
  } catch (err: unknown) {
    // ❌ Zod validation error
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
        case "PRODUCT_NOT_FOUND":
          return NextResponse.json(
            { error: "PRODUCT_NOT_FOUND" },
            { status: 404 }
          );

        case "INVENTORY_NOT_FOUND":
          return NextResponse.json(
            { error: "INVENTORY_NOT_FOUND" },
            { status: 404 }
          );

        case "INSUFFICIENT_STOCK":
          return NextResponse.json(
            { error: "INSUFFICIENT_STOCK" },
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
