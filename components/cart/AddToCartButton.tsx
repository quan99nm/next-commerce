"use client";

import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/Button";
import { Product } from "@/types/product";

export function AddToCartButton({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <Button
      className="flex-1"
      onClick={() => {
        console.log("Add to cart from detail:", product);
        addToCart(product);
      }}
    >
      Add to Cart
    </Button>
  );
}
