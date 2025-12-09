import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { getAllProducts } from "@/services/products.service";
import { Button } from "@/components/ui/Button";
import {
  Laptop,
  Shirt,
  Home,
  Sparkles,
  Gamepad2,
  Dumbbell,
} from "lucide-react";
import { FlashSaleTimer } from "@/components/home/FlashSaleTimer";
export default async function HomePage() {
  const products = await getAllProducts();
  const featured = products.slice(0, 8);

  const categories = [
    { name: "Electronics", slug: "electronics", icon: <Laptop size={20} /> },
    { name: "Fashion", slug: "fashion", icon: <Shirt size={20} /> },
    { name: "Home Living", slug: "home", icon: <Home size={20} /> },
    { name: "Beauty", slug: "beauty", icon: <Sparkles size={20} /> },
    { name: "Toys", slug: "toys", icon: <Gamepad2 size={20} /> },
    { name: "Sports", slug: "sports", icon: <Dumbbell size={20} /> },
  ];

  return (
    <div className="space-y-20">
      {/* HERO */}
      <section className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Deal Chất Mỗi Ngày ⚡
          </h1>
          <p className="text-white/90 text-sm md:text-base">
            Thương hiệu uy tín — Giá siêu tốt. 100% Hàng chính hãng.
          </p>

          {/* Search */}
          <div className="mt-6">
            <Link href="/products">
              <Button className="rounded-full px-6 bg-white text-blue-600 hover:bg-blue-50 shadow-lg font-semibold">
                Mua ngay
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-lg font-bold mb-4">Danh mục nổi bật</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/categories/${c.slug}`}
              className="bg-white rounded-xl p-4 flex flex-col items-center gap-2 shadow-sm hover:shadow-md transition border border-transparent hover:border-blue-500"
            >
              <span className="text-blue-600">{c.icon}</span>
              <span className="text-xs font-medium text-slate-700">
                {c.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* FLASH SALE */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-white border rounded-xl shadow-sm p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-blue-600 flex items-center gap-1">
                ⚡ Flash Sale
              </h2>
              <FlashSaleTimer />
            </div>
            <Link
              href="/products"
              className="text-sm text-blue-600 hover:underline"
            >
              Xem tất cả →
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {featured.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-lg font-bold mb-4">Gợi ý hôm nay</h2>

        <div className="grid gap-4 md:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Link href="/products">
            <Button
              variant="secondary"
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Xem thêm sản phẩm
            </Button>
          </Link>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 text-slate-600 text-sm text-center py-12">
        <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col items-center">
            <span className="text-2xl">🛡️</span>
            <p>Hàng chính hãng 100%</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl">🚚</span>
            <p>Giao hàng toàn quốc</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl">💳</span>
            <p>Thanh toán an toàn</p>
          </div>
        </div>
      </section>
    </div>
  );
}
