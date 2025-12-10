import { ProductList } from "@/components/product/ProductList";
import { ProductFilters } from "@/components/product/ProductFilters";
import { filterProducts } from "@/services/products.service";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}) {
  const { category } = await params; // Giữ nguyên theo yêu cầu
  return {
    title: `${category} | MyStore`,
    description: `Mua sắm ${category} chính hãng giá tốt, giao nhanh toàn quốc.`,
  };
}

export default async function CategoryPage({
  params,
  searchParams: propsSearchParams,
}: {
  params: { category: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { category } = await params; // Giữ nguyên
  console.log("Category param:", category);
  const searchParams = await propsSearchParams; // Giữ nguyên

  const filters = buildFilters(category, searchParams);
  const products = filterProducts(filters);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold capitalize mb-6">{category}</h1>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
        <ProductFilters category={category} showCategory={false} />
        <div>
          <ProductList products={products} />
        </div>
      </div>
    </section>
  );
}

// Helper logic giữ nguyên
function buildFilters(
  category: string,
  searchParams?: { [key: string]: string | string[] | undefined }
) {
  const attrs: Record<string, string[]> = {};

  if (!searchParams) {
    return { category, attrs };
  }

  Object.entries(searchParams).forEach(([key, value]) => {
    if (
      [
        "q",
        "brand",
        "rating",
        "sort",
        "priceMin",
        "priceMax",
        "category",
      ].includes(key)
    )
      return;
    attrs[key] = Array.isArray(value) ? value : [String(value)];
  });

  return {
    category,
    q: searchParams.q as string | undefined,
    brand: searchParams.brand
      ? Array.isArray(searchParams.brand)
        ? searchParams.brand
        : [searchParams.brand]
      : undefined,
    rating: searchParams.rating ? Number(searchParams.rating) : undefined,
    priceMin: searchParams.priceMin ? Number(searchParams.priceMin) : undefined,
    priceMax: searchParams.priceMax ? Number(searchParams.priceMax) : undefined,
    attrs,
  };
}
