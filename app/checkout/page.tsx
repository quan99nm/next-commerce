"use client";

import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (!items.length)
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <p>Your cart is empty.</p>
        <Link href="/products" className="text-blue-600 underline">
          Continue shopping →
        </Link>
      </div>
    );

  return (
    <section className="grid gap-8 md:grid-cols-[2fr_1fr]">
      {/* Left: Order items */}
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Order Items</h2>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span className="font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Summary */}
      <div className="rounded-lg bg-white p-4 shadow-sm h-fit">
        <h2 className="text-lg font-semibold mb-4">Summary</h2>
        <div className="flex justify-between mb-2">
          <span>Subtotal:</span>
          <span className="font-semibold">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span>Shipping:</span>
          <span className="font-semibold">$0.00</span>
        </div>

        <hr className="my-2" />

        <div className="flex justify-between text-lg font-bold mb-4">
          <span>Total:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <Link href="/checkout/success">
          <Button className="w-full">Place Order</Button>
        </Link>
      </div>
    </section>
  );
}
