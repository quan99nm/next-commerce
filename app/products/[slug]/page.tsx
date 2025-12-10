import Image from "next/image";
import Link from "next/link";
import { getProductBySlug, getAllProducts } from "@/services/products.service";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { Star } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductReviews } from "@/components/product/ProductReviews";
import { RelatedSlider } from "@/components/product/RelatedSlider";
import { ATTRIBUTE_LABELS } from "@/config/filterConfig";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params; // ❌ KHÔNG dùng await ở đây

  const product = await getProductBySlug(slug);
  if (!product) return notFound();
  console.log("Product:", product);
  const related = (await getAllProducts())
    .filter((p) => p.category === product.category && p.slug !== slug)
    .slice(0, 4);

  const price = product.salePrice ?? product.basePrice;
  const rating = product.rating ?? 0;
  const specsData = product.specs
    ? product.specs
    : Object.entries(product.attributes || {}).map(([key, value]) => ({
        label: ATTRIBUTE_LABELS[key] ?? key,
        value: String(value),
      }));
  return (
    <section className="max-w-7xl mx-auto px-4 py-10 space-y-12">
      {/* ⭐ Product Top Section */}
      <div className="grid gap-10 lg:grid-cols-2 bg-white p-6 rounded-xl shadow-sm">
        {/* 📍 IMAGE GALLERY */}
        <div className="space-y-4">
          <div className="h-[420px] bg-slate-100 rounded-xl overflow-hidden relative">
            <Image
              src={product.images?.[0]?.url ?? product.thumbnail}
              alt={product.images?.[0]?.alt ?? product.name}
              fill
              className="object-cover"
            />
          </div>

          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.slice(1).map((img, idx) => (
                <div key={idx} className="h-20 rounded overflow-hidden">
                  <Image
                    src={img.url}
                    alt={img.alt ?? product.name ?? "Product image"}
                    width={100}
                    height={100}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 📍 PRODUCT INFO */}
        <div className="space-y-5">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          {/* ⭐ Rating */}
          <div className="flex items-center gap-2 text-yellow-500 text-sm">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                fill={i < rating ? "#FACC15" : "none"}
                stroke="#FACC15"
              />
            ))}
            <span className="text-xs text-slate-600">
              ({product.reviewsCount ?? 0} đánh giá)
            </span>
          </div>

          {/* 💸 Price */}
          <div>
            <span className="text-3xl font-bold text-blue-600">
              {price.toLocaleString()}₫
            </span>
            {product.salePrice && (
              <span className="ml-2 text-sm line-through text-gray-400">
                {product.basePrice?.toLocaleString()}₫
              </span>
            )}
          </div>

          {/* 🏪 Stock */}
          <p className="text-green-600 text-sm font-medium">
            {product.stock > 0
              ? `✔ Còn hàng (${product.stock} sp)`
              : "❌ Hết hàng"}
          </p>

          {/* 🎨 Variants */}
          {!!product.variants?.length && (
            <div className="space-y-2">
              <b className="text-sm">Phiên bản:</b>
              <div className="flex gap-2">
                {product.variants?.map((v) => (
                  <button
                    key={v.id}
                    className="text-xs px-3 py-1 border rounded-md hover:border-blue-600"
                  >
                    {v.color ?? v.size ?? "Variant"}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 🛒 Buttons */}
          <div className="flex gap-3 pt-4">
            <AddToCartButton product={product} />
            <Link href="/checkout" className="flex-1">
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium w-full py-2 rounded-lg">
                Mua ngay
              </button>
            </Link>
          </div>

          {/* 🏷 Brand + Category */}
          <div className="text-sm text-slate-600 space-y-1">
            <div>
              <b>Thương hiệu:</b> {product.brand}
            </div>
            <div>
              <b>Danh mục:</b> {product.category}
            </div>
          </div>
        </div>
      </div>

      {/* 📝 Description */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-bold">Mô tả</h2>
        <p className="text-sm text-slate-600 mt-2">{product.description}</p>
      </div>

      {/* 🔧 Specs */}
      {specsData.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-3">
          <h2 className="text-lg font-bold">Thông số kỹ thuật</h2>
          <table className="w-full text-sm">
            <tbody>
              {specsData.map((s, i) => (
                <tr key={i} className="border-b">
                  <td className="py-2 font-medium">{s.label}</td>
                  <td className="py-2 text-gray-600">{s.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 🗣 Reviews */}
      <div className="bg-white p-6 rounded-xl shadow-sm space-y-5">
        <h2 className="text-lg font-bold">Đánh giá khách hàng</h2>
        <ProductReviews />
      </div>

      {/* 🔥 Related */}
      {!!related.length && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Sản phẩm liên quan</h2>

          <div className="md:hidden">
            <RelatedSlider products={related} />
          </div>

          <div className="hidden md:grid gap-4 grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
