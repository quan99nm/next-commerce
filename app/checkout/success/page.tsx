"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import confetti from "canvas-confetti";
import { useEffect } from "react";

export default function OrderSuccessPage() {
  useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  const orderId = Math.floor(100000 * 900000);

  return (
    <section className="max-w-lg mx-auto bg-white shadow-sm rounded-lg p-8 mt-10 text-center space-y-6">
      <h1 className="text-3xl font-bold text-green-600">Order Success! 🎉</h1>

      <p className="text-slate-700">
        Thank you for your purchase! Your order has been placed successfully.
      </p>

      <div className="bg-slate-100 py-3 rounded-md text-sm font-medium">
        Order No: <span className="font-bold">#{orderId}</span>
      </div>

      <div className="grid gap-3 mt-6">
        <Link href="/products">
          <Button className="w-full">Continue Shopping</Button>
        </Link>
        <Link href="/cart">
          <Button variant="secondary" className="w-full">
            View Cart
          </Button>
        </Link>
      </div>
    </section>
  );
}
