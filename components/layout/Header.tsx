"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Menu, User } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/Button";

export function Header() {
  const [open, setOpen] = useState(false);
  const items = useCartStore((state) => state.items);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-2">
        {/* LEFT: Mobile Menu + Logo */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden p-2 hover:bg-slate-100 rounded"
            onClick={() => setOpen(!open)}
          >
            <Menu size={22} />
          </button>

          <Link href="/" className="text-2xl font-extrabold text-blue-600">
            MyStore
          </Link>
        </div>

        {/* CENTER: Search bar (Desktop only) */}
        <div className="hidden md:flex flex-1 justify-center px-8">
          <div className="w-full max-w-lg flex bg-slate-100 rounded-full p-1">
            <input
              type="text"
              placeholder="Bạn tìm gì hôm nay?"
              className="flex-1 px-4 py-1 text-sm bg-transparent outline-none"
            />
            <Button className="rounded-full px-4 text-xs bg-blue-600 hover:bg-blue-700">
              Tìm kiếm
            </Button>
          </div>
        </div>

        {/* RIGHT: User + Cart */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden md:flex items-center gap-1 text-slate-600 hover:text-blue-600"
          >
            <User size={20} />
            <span className="text-xs font-medium">Đăng nhập</span>
          </Link>

          <Link href="/cart" className="relative">
            <ShoppingCart
              size={22}
              className="text-slate-700 hover:text-blue-600"
            />
            {count > 0 && (
              <span className="absolute -top-1 -right-2 bg-blue-600 text-white text-[10px] font-bold px-1.5 rounded-full">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
      {/* DESKTOP CATEGORY NAV */}
      <nav className="hidden md:flex bg-blue-600 text-white text-sm font-medium">
        <div className="max-w-7xl mx-auto flex gap-6 px-4 py-2">
          <Link
            href="/categories/electronics"
            className="hover:text-yellow-300"
          >
            Điện Tử
          </Link>
          <Link href="/categories/fashion" className="hover:text-yellow-300">
            Thời Trang
          </Link>
          <Link href="/categories/home" className="hover:text-yellow-300">
            Nhà Cửa
          </Link>
          <Link href="/categories/beauty" className="hover:text-yellow-300">
            Làm Đẹp
          </Link>
          <Link href="/categories/toys" className="hover:text-yellow-300">
            Đồ Chơi
          </Link>
          <Link href="/categories/sports" className="hover:text-yellow-300">
            Thể Thao
          </Link>
        </div>
      </nav>

      {/* MOBILE NAV EXPAND */}
      {open && (
        <nav className="md:hidden bg-white border-t shadow-sm">
          <div className="px-4 py-3 space-y-3 text-sm font-medium text-slate-700">
            <Link href="/products" onClick={() => setOpen(false)}>
              Tất cả sản phẩm
            </Link>
            <Link href="/categories/electronics" onClick={() => setOpen(false)}>
              Điện tử
            </Link>
            <Link href="/categories/fashion" onClick={() => setOpen(false)}>
              Thời trang
            </Link>
            <Link href="/cart" onClick={() => setOpen(false)}>
              Giỏ hàng ({count})
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
