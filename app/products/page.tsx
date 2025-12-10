import { ProductList } from "@/components/product/ProductList";
import { ProductFilters } from "@/components/product/ProductFilters";
import { filterProducts } from "@/services/products.service";

export default async function ProductsPage(props: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const searchParams = await props.searchParams; // 👈 unwrap

  const buildAttrs = () => {
    const attrs: { [key: string]: string[] } = {};

    if (!searchParams) return attrs;

    Object.entries(searchParams).forEach(([key, value]) => {
      if (
        [
          "q",
          "brand",
          "rating",
          "sort",
          "category",
          "priceMin",
          "priceMax",
        ].includes(key)
      )
        return;

      // Convert value -> string[]
      if (Array.isArray(value)) {
        attrs[key] = value;
      } else if (typeof value === "string") {
        attrs[key] = [value];
      }
    });

    return attrs;
  };

  const filters = {
    q: searchParams?.q as string | undefined,
    category: searchParams?.category as string | undefined,
    brand: searchParams?.brand
      ? Array.isArray(searchParams.brand)
        ? searchParams.brand
        : [searchParams.brand]
      : undefined,
    rating: searchParams?.rating ? Number(searchParams.rating) : undefined,
    priceMin: searchParams?.priceMin
      ? Number(searchParams.priceMin)
      : undefined,
    priceMax: searchParams?.priceMax
      ? Number(searchParams.priceMax)
      : undefined,
    attrs: buildAttrs(),
  };
  const products = filterProducts(filters);
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Sản phẩm</h1>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
        {/* Sidebar Filters */}
        <div className="md:sticky md:top-24 h-fit">
          <ProductFilters category={filters.category} />
        </div>

        {/* Products Content */}
        <div>
          <ProductList products={products} />
        </div>
      </div>
    </section>
  );
}
