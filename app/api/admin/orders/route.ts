import { adminListOrders } from "@/services/order.service";
import { adminListOrdersQuerySchema } from "@/validators/order.schema";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const query = adminListOrdersQuerySchema.parse({
      status: searchParams.get("status") ?? undefined,
      page: searchParams.get("page") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
    });

    const result = await adminListOrders(query);
    return NextResponse.json(result);
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { error: "VALIDATION_ERROR", details: err.issues },
        { status: 400 }
      );
    }

    console.error(err);
    return NextResponse.json(
      { error: "INTERNAL_SERVER_ERROR" },
      { status: 500 }
    );
  }
}
