// app/products/page.tsx
import { getAllProducts } from "@/services/products.service";
import { ProductCard } from "@/components/product/ProductCard";

export const dynamic = "force-dynamic"; // tạm cho dễ dev

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">All Products</h1>

      {/* Filter/search box basic */}
      <div className="flex flex-wrap items-center gap-2 rounded-md bg-white p-3 shadow-sm">
        <input
          className="flex-1 rounded-md border px-3 py-2 text-sm"
          placeholder="Search products..."
        />
        <select className="rounded-md border px-3 py-2 text-sm">
          <option>Sort by latest</option>
          <option>Price: low to high</option>
          <option>Price: high to low</option>
        </select>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
