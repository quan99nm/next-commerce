"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";

export function MiniCart() {
  const items = useCartStore((state) => state.items);
  const total = items.reduce(
    (sum, item) => sum + (item.salePrice ?? 0) * item.quantity,
    0
  );

  return (
    <div className="absolute right-0 top-full mt-3 w-80 bg-white shadow-2xl rounded-xl p-4 border z-50">
      {items.length === 0 ? (
        <p className="text-sm text-slate-500">Giỏ hàng trống</p>
      ) : (
        <>
          {/* Item list */}
          <ul className="max-h-72 overflow-y-auto divide-y">
            {items.map((item) => (
              <li key={item.id} className="flex gap-3 py-3">
                <Image
                  src={item.thumbnail ?? "/placeholder.png"}
                  alt={item.name}
                  width={48}
                  height={48}
                  className="rounded object-cover border"
                />
                <div className="flex-1 text-sm">
                  <p className="font-medium truncate">{item.name}</p>
                  <p className="text-slate-500">
                    {item.quantity} x{" "}
                    {(item.salePrice ?? 0).toLocaleString("vi-VN")} đ
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* Footer */}
          <div className="pt-3 border-t space-y-2 text-sm">
            <div className="flex justify-between font-medium">
              <span>Tạm tính</span>
              <span className="text-blue-600 font-bold">
                {total.toLocaleString("vi-VN")} đ
              </span>
            </div>

            <div className="flex gap-2">
              <Link
                href="/cart"
                className="flex-1 text-center py-2 rounded-md border text-sm hover:bg-gray-100"
              >
                Xem giỏ
              </Link>

              <Link
                href="/checkout"
                className="flex-1 text-center py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700"
              >
                Thanh toán
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
