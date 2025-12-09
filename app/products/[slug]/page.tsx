import Image from "next/image";
import Link from "next/link";
import { getProductBySlug, getAllProducts } from "@/services/products.service";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { Star } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductReviews } from "@/components/product/ProductReviews";
import { RelatedSlider } from "@/components/product/RelatedSlider";

type ProductDetailProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductDetailPage({
  params,
}: ProductDetailProps) {
  const { slug } = await params; // FIXED ❗
  const product = await getProductBySlug(slug);

  if (!product) return notFound();

  const related = (await getAllProducts())
    .filter((p) => p.category === product.category && p.slug !== slug)
    .slice(0, 4);

  const rating = product.rating ?? 0;

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 space-y-10">
      {/* MAIN PRODUCT INFO */}
      <div className="grid gap-10 md:grid-cols-2 bg-white p-6 rounded-xl shadow-sm">
        {/* MAIN IMAGE */}
        <div className="space-y-4">
          <div className="h-[400px] rounded-xl bg-slate-200 overflow-hidden flex justify-center">
            <Image
              src={product.thumbnail || "/placeholder.png"}
              alt={product.name}
              width={500}
              height={500}
              className="object-cover w-full h-full"
            />
          </div>

          {/* THUMBNAILS placeholder */}
          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 bg-slate-200 rounded" />
            ))}
          </div>
        </div>

        {/* DETAILS */}
        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>

          {/* RATING */}
          {rating > 0 && (
            <div className="flex items-center gap-2 text-yellow-500 text-sm">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < rating ? "#FACC15" : "none"}
                  stroke="#FACC15"
                />
              ))}
              <span className="text-xs text-slate-500">
                ({product.reviewsCount ?? 0} đánh giá)
              </span>
            </div>
          )}

          {/* PRICE */}
          <div className="space-y-1">
            <span className="text-3xl font-bold text-blue-600">
              {(product.salePrice ?? product.price).toLocaleString()}₫
            </span>
            {product.salePrice && (
              <span className="text-sm line-through text-slate-400">
                {product.price?.toLocaleString()}₫
              </span>
            )}
          </div>

          {/* STOCK */}
          <div className="text-sm text-green-600">
            {product.stock && product.stock > 0 ? "Còn hàng" : "Hết hàng"}
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3 pt-4">
            <AddToCartButton product={product} />
            <Link href="/checkout">
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-lg">
                Mua Ngay
              </button>
            </Link>
          </div>
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-3 flex gap-3 md:hidden">
            <AddToCartButton product={product} />
            <Link href="/checkout" className="flex-1">
              <button className="bg-orange-500 text-white font-medium w-full py-2 rounded-lg">
                Mua ngay
              </button>
            </Link>
          </div>
          {/* SPECS */}
          <div className="text-sm text-slate-700 space-y-1">
            {product.brand && (
              <div>
                <b>Thương hiệu:</b> {product.brand}
              </div>
            )}
            <div>
              <b>Danh mục:</b> {product.category}
            </div>
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-bold mb-2">Thông tin sản phẩm</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* SHIPPING */}
      <div className="bg-white p-6 rounded-xl shadow-sm space-y-2">
        <h2 className="text-lg font-bold">Vận chuyển & Bảo hành</h2>
        <ul className="text-sm text-slate-600 space-y-1">
          <li>🚚 Giao hàng nhanh toàn quốc</li>
          <li>🔁 Đổi trả trong 7 ngày</li>
          <li>🛡 Bảo hành chính hãng 12 tháng</li>
        </ul>
      </div>

      {/* REVIEWS */}
      <div className="bg-white p-6 rounded-xl shadow-sm space-y-5">
        <h2 className="text-lg font-bold">Đánh giá từ khách hàng</h2>
        <ProductReviews />
      </div>

      {/* RELATED PRODUCTS */}
      {related.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Sản phẩm liên quan</h2>

          {/* Mobile: Slider ngang */}
          <div className="md:hidden">
            <RelatedSlider products={related} />
          </div>

          {/* Desktop: Grid chuẩn */}
          <div className="hidden md:grid gap-4 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
