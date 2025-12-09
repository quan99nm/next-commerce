"use client";

import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (!items.length)
    return (
      <section className="space-y-4">
        <h1 className="text-2xl font-bold">Your Cart</h1>
        <p className="text-slate-600">Your cart is empty 🛒</p>

        <Link href="/products">
          <Button>Continue shopping</Button>
        </Link>
      </section>
    );

  return (
    <section className="grid gap-6 md:grid-cols-[2fr_1fr]">
      {/* Cart items */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Your Cart</h1>

        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm"
          >
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-xs text-slate-500">x{item.quantity}</p>
            </div>

            <div className="flex items-center gap-4">
              <span className="font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </span>

              <Button
                variant="secondary"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}

        <Link href="/products">
          <p className="text-blue-600 text-sm hover:underline">
            ← Continue shopping
          </p>
        </Link>
      </div>

      {/* Summary Box */}
      <div className="rounded-lg bg-white p-4 h-fit shadow-sm space-y-4">
        <h2 className="text-lg font-semibold">Order Summary</h2>

        <div className="flex justify-between text-sm">
          <span>Subtotal:</span>
          <span className="font-semibold">${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Shipping:</span>
          <span className="font-semibold">$0.00</span>
        </div>

        <hr />

        <div className="flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        {/* GO TO CHECKOUT */}
        <Link href="/checkout" className="block">
          <Button className="w-full">Proceed to Checkout</Button>
        </Link>
      </div>
    </section>
  );
}
