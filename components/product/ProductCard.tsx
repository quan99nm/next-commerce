// components/product/ProductCard.tsx
"use client";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart); // 🔥
  return (
    <div className="flex flex-col rounded-lg bg-white p-4 shadow-sm hover:shadow-md transition">
      {/* Thumbnail demo */}
      <div className="mb-3 h-40 w-full rounded-md bg-slate-200" />

      <h3 className="mb-1 text-sm font-semibold">{product.name}</h3>
      <p className="mb-3 text-sm font-bold text-blue-600">
        ${product.basePrice.toFixed(2)}
      </p>

      <div className="mt-auto flex items-center gap-2">
        <Link href={`/products/${product.slug}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            View
          </Button>
        </Link>
        <Button
          onClick={() => {
            addToCart(product);
          }}
          className="flex-1"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
