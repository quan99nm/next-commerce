import { NextResponse } from "next/server";
import { ZodError } from "zod";
import {
  getInventoryQuerySchema,
  upsertInventorySchema,
} from "@/validators/inventory.schema";
import {
  adminGetInventoryByProduct,
  adminUpsertInventory,
} from "@/services/inventory.service";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const { productId } = getInventoryQuerySchema.parse({
      productId: searchParams.get("productId"),
    });

    const inventory = await adminGetInventoryByProduct(productId);
    return NextResponse.json(inventory);
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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const input = upsertInventorySchema.parse(body);

    const inventory = await adminUpsertInventory(
      input.productId,
      input.warehouse,
      input.quantity
    );

    return NextResponse.json(inventory);
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
