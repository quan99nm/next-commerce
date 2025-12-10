"use client";

import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ProductPrice } from "@/components/product/ProductPrice";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const increaseQty = useCartStore((s) => s.increaseQty);
  const decreaseQty = useCartStore((s) => s.decreaseQty);
  console.log("Cart items:", items);
  const subtotal = items.reduce(
    (sum, item) =>
      sum + (item.salePrice ?? item.basePrice ?? 0) * item.quantity,
    0
  );

  if (!items.length)
    return (
      <section className="text-center py-20 space-y-4">
        <h1 className="text-2xl font-bold">Giỏ hàng của bạn</h1>
        <p className="text-slate-600">Hiện đang trống 🛒</p>

        <Link href="/products">
          <Button className="mt-2">Tiếp tục mua sắm</Button>
        </Link>
      </section>
    );

  return (
    <section className="grid gap-8 md:grid-cols-[2fr_1fr] py-8">
      {/* Cart items */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold mb-2">Giỏ hàng</h1>

        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-md"
          >
            {/* Image */}
            <Image
              src={item.thumbnail ?? "/placeholder.png"}
              width={72}
              height={72}
              alt={item.name}
              className="rounded border object-cover"
            />

            {/* Name + Price */}
            <div className="flex-1 text-sm">
              <p className="font-semibold line-clamp-2">{item.name}</p>

              <ProductPrice
                basePrice={item.basePrice}
                salePrice={item.salePrice}
              />
            </div>

            {/* Qty control */}
            <div className="flex items-center gap-2">
              <button
                className="px-2 py-1 border rounded hover:bg-gray-100"
                onClick={() => decreaseQty(item.id)}
              >
                -
              </button>
              <span className="w-8 text-center font-medium">
                {item.quantity}
              </span>
              <button
                className="px-2 py-1 border rounded hover:bg-gray-100"
                onClick={() => increaseQty(item.id)}
              >
                +
              </button>
            </div>

            {/* Remove */}
            <Button
              variant="secondary"
              size="sm"
              onClick={() => removeFromCart(item.id)}
            >
              Xoá
            </Button>
          </div>
        ))}

        <Link href="/products">
          <p className="text-blue-600 text-sm hover:underline mt-2">
            ← Tiếp tục mua sắm
          </p>
        </Link>
      </div>

      {/* Summary */}
      <div className="rounded-lg bg-white p-6 shadow-md h-fit space-y-4">
        <h2 className="text-lg font-bold">Tóm tắt đơn hàng</h2>

        <div className="flex justify-between text-sm">
          <span>Tạm tính:</span>
          <span className="font-semibold">
            {subtotal.toLocaleString("vi-VN")} đ
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Vận chuyển:</span>
          <span className="text-green-600 font-medium">Miễn phí</span>
        </div>

        <hr />

        <div className="flex justify-between font-bold text-lg">
          <span>Tổng:</span>
          <span className="text-blue-600">
            {subtotal.toLocaleString("vi-VN")} đ
          </span>
        </div>

        <Link href="/checkout" className="block">
          <Button className="w-full text-base py-3">
            Tiến hành thanh toán
          </Button>
        </Link>
      </div>
    </section>
  );
}
