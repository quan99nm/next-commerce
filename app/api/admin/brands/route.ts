import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { createBrandSchema } from "@/validators/brand.schema";
import { createBrand, getAllBrands } from "@/services/brand.service";

/**
 * POST /api/admin/brands
 * → tạo brand mới
 */
export async function POST(req: Request) {
  try {
    // 1️⃣ Parse JSON body
    const body = await req.json();

    // 2️⃣ Validate input (Zod)
    const input = createBrandSchema.parse(body);

    // 3️⃣ Gọi business logic
    const brand = await createBrand(input);

    // 4️⃣ Trả response thành công
    return NextResponse.json(brand, { status: 201 });
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

    // ❌ Business rule error (slug trùng)
    if (err instanceof Error && err.message === "BRAND_SLUG_EXISTS") {
      return NextResponse.json({ error: "BRAND_SLUG_EXISTS" }, { status: 409 });
    }

    // ❌ Unknown error
    console.error(err);
    return NextResponse.json(
      { error: "INTERNAL_SERVER_ERROR" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/admin/brands
 * → lấy danh sách brand
 */
export async function GET() {
  const brands = await getAllBrands();
  return NextResponse.json(brands);
}
