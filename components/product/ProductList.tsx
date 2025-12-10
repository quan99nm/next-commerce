import { ProductCard } from "./ProductCard";
import { Product } from "@/types/product";

export function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
