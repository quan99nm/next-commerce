export function getDiscountPercent(basePrice: number, salePrice?: number) {
  if (!salePrice || salePrice >= basePrice) return 0;
  return Math.round(((basePrice - salePrice) / basePrice) * 100);
}
export function ProductPrice({
  basePrice,
  salePrice,
}: {
  basePrice: number;
  salePrice?: number;
}) {
  const percent = getDiscountPercent(basePrice, salePrice);

  return (
    <div className="flex items-center gap-2">
      {/* Sale price */}
      <span className="text-lg font-bold text-red-600">
        {(salePrice ?? basePrice).toLocaleString("vi-VN")} đ
      </span>

      {/* Base price (strike-through) */}
      {salePrice && salePrice < basePrice && (
        <span className="text-sm text-gray-400 line-through">
          {basePrice.toLocaleString("vi-VN")} đ
        </span>
      )}

      {/* Discount badge */}
      {percent > 0 && (
        <span className="bg-red-100 text-red-600 text-xs font-medium px-1.5 py-0.5 rounded">
          -{percent}%
        </span>
      )}
    </div>
  );
}
