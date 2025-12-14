import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { createCategorySchema } from "@/validators/category.schema";
import { createCategory, getAllCategories } from "@/services/category.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1) validate input
    const input = createCategorySchema.parse(body);

    // 2) business logic
    const category = await createCategory(input);

    // 3) response
    return NextResponse.json(category, { status: 201 });
  } catch (err: unknown) {
    // 1️⃣ Validation error (Zod)
    if (err instanceof ZodError) {
      return NextResponse.json(
        {
          error: "VALIDATION_ERROR",
          details: err.issues,
        },
        { status: 400 }
      );
    }

    // 2️⃣ Business error (custom)
    if (err instanceof Error && err.message === "CATEGORY_SLUG_EXISTS") {
      return NextResponse.json(
        { error: "CATEGORY_SLUG_EXISTS" },
        { status: 409 }
      );
    }

    // 3️⃣ Unknown error
    console.error(err);
    return NextResponse.json(
      { error: "INTERNAL_SERVER_ERROR" },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    const categories = await getAllCategories();
    return NextResponse.json(categories, { status: 200 });
  } catch (err: unknown) {
    console.error(err);
    return NextResponse.json(
      { error: "INTERNAL_SERVER_ERROR" },
      { status: 500 }
    );
  }
}
