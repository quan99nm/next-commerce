"use client";

import { useCartStore } from "@/store/cartStore";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useState } from "react";
import { useCustomerStore } from "@/store/customerStore";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const updateQty = useCartStore((s) => s.updateQuantity);
  const clearCart = useCartStore((s) => s.clearCart);
  const customer = useCustomerStore((s) => s.info);
  const updateCustomer = useCustomerStore((s) => s.updateInfo);

  const [submitted, setSubmitted] = useState(false);

  const subtotal = items.reduce(
    (sum, item) => sum + (item.salePrice ?? item.basePrice) * item.quantity,
    0
  );

  if (!items.length)
    return (
      <div className="text-center py-12 space-y-2">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <p>Giỏ hàng đang trống 🛒</p>
        <Link href="/products" className="text-blue-600 hover:underline">
          Quay lại mua hàng →
        </Link>
      </div>
    );

  // Simple validation
  const isValid =
    customer.fullName && customer.phone && customer.email && customer.address;

  const handleSubmit = () => {
    setSubmitted(true);
    if (!isValid) return;

    setTimeout(() => {
      clearCart();
      window.location.href = "/checkout/success";
    }, 300); // delay nhẹ tạo cảm giác gửi đơn
  };

  return (
    <section className="grid gap-8 md:grid-cols-[2fr_1fr] py-8">
      {/* LEFT */}
      <div className="space-y-8">
        <h1 className="text-2xl font-bold">Thanh toán</h1>

        {/* Order Items */}
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-3">
          <h2 className="font-semibold mb-2">Sản phẩm trong giỏ</h2>
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between text-sm border-b py-2"
            >
              <span>
                {item.name} x {item.quantity}
              </span>
              <span className="font-semibold">
                {(item.salePrice ?? item.basePrice).toLocaleString("vi-VN")} đ
              </span>
            </div>
          ))}
        </div>

        {/* Customer Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <h2 className="text-lg font-semibold">Thông tin khách hàng</h2>

          {[
            { key: "fullName", label: "Họ và tên" },
            { key: "phone", label: "Số điện thoại" },
            { key: "email", label: "Email" },
            { key: "address", label: "Địa chỉ nhận hàng" },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="text-sm font-medium">{label}</label>
              <input
                type="text"
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
                value={customer[key as keyof typeof customer]}
                onChange={(e) => updateCustomer({ [key]: e.target.value })}
              />
              {submitted && !customer[key as keyof typeof customer] && (
                <p className="text-xs text-red-500 mt-1">
                  {label} không được bỏ trống
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT Summary */}
      <div className="rounded-xl bg-white p-6 shadow-sm space-y-4 h-fit">
        <h2 className="text-lg font-semibold">Tổng quan đơn hàng</h2>

        <div className="flex justify-between text-sm">
          <span>Tạm tính</span>
          <span className="font-semibold">
            {subtotal.toLocaleString("vi-VN")} đ
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Vận chuyển</span>
          <span className="text-green-600 font-semibold">Miễn phí</span>
        </div>

        <hr />

        <div className="flex justify-between font-bold text-lg">
          <span>Tổng thanh toán</span>
          <span className="text-blue-600">
            {subtotal.toLocaleString("vi-VN")} đ
          </span>
        </div>

        <Button className="w-full text-base py-3" onClick={handleSubmit}>
          Đặt hàng
        </Button>
      </div>
    </section>
  );
}
