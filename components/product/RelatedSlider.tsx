"use client";

import { ProductCard } from "@/components/product/ProductCard";
import { Product } from "@/types/product";

export function RelatedSlider({ products }: { products: Product[] }) {
  return (
    <div className="flex overflow-x-auto gap-4 pb-2 hide-scrollbar">
      {products.map((p) => (
        <div key={p.id} className="min-w-[180px]">
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}
