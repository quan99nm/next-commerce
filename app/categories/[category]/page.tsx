import { getAllProducts } from "@/services/products.service";
import { ProductCard } from "@/components/product/ProductCard";

type Props = {
  params: Promise<{ category: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const products = await getAllProducts();

  const filtered = products.filter(
    (p) => p.category?.toLowerCase() === category.toLowerCase()
  );

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold capitalize">{category}</h1>

      {filtered.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
