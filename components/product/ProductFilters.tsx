"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  getAllCategories,
  getAttributesByCategory,
} from "@/services/products.service";
import { useMemo } from "react";
import {
  ATTRIBUTE_LABELS,
  CATEGORY_FILTER_CONFIG,
  formatValue,
} from "@/config/filterConfig";

type Props = {
  category?: string;
  showCategory?: boolean;
};

export function ProductFilters({ category, showCategory = true }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const categories = getAllCategories();
  const currentCategory = params.get("category") ?? category ?? "";
  const config = CATEGORY_FILTER_CONFIG[currentCategory] ?? {};
  console.log("Filter config for category", currentCategory, ":", config);
  // Dynamic attribute options per selected category
  const attrs = useMemo(() => {
    return currentCategory ? getAttributesByCategory(currentCategory) : {};
  }, [currentCategory]);
  const sortedKeys = Object.keys(attrs).sort(
    (a, b) =>
      (config.order?.indexOf(a) ?? 99) - (config.order?.indexOf(b) ?? 99)
  );
  // Basic single-value filter
  const updateFilter = (key: string, value?: string) => {
    const search = new URLSearchParams(params.toString());

    if (!value || value === "") search.delete(key);
    else search.set(key, value);

    router.replace(`?${search.toString()}`, { scroll: false });
  };

  // Multi-value filter: brand, attributes, etc.
  const updateMultiFilter = (key: string, value: string) => {
    const search = new URLSearchParams(params.toString());
    const selected = search.getAll(key);

    if (selected.includes(value)) {
      const updated = selected.filter((v) => v !== value);
      search.delete(key);
      updated.forEach((v) => search.append(key, v));
    } else {
      search.append(key, value);
    }

    router.replace(`?${search.toString()}`, { scroll: false });
  };

  // Category change logic: reset dynamic attribute filters
  const updateCategory = (value: string) => {
    const search = new URLSearchParams(params.toString());

    // Set category
    if (!value) search.delete("category");
    else search.set("category", value);

    // Clear attributes from previous category
    Object.keys(attrs).forEach((attrKey) => search.delete(attrKey));

    router.replace(`?${search.toString()}`, { scroll: false });
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-sm space-y-4 w-64 sticky top-4">
      {/* Search */}
      <div>
        <input
          className="w-full px-3 py-2 border rounded-md text-sm"
          placeholder="Tìm kiếm"
          value={params.get("q") ?? ""}
          onChange={(e) => updateFilter("q", e.target.value)}
        />
      </div>

      {/* Category selector */}
      {showCategory && (
        <div>
          <p className="font-medium text-sm">Danh mục</p>
          <select
            className="px-3 py-2 rounded-md border text-sm w-full"
            value={currentCategory}
            onChange={(e) => updateCategory(e.target.value)}
          >
            <option value="">Tất cả</option>

            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Brand Filter */}
      <div className="space-y-2">
        <p className="font-medium text-sm">Thương hiệu</p>
        {["Sony", "Xiaomi", "Adidas", "Nike", "LEGO"].map((brand) => (
          <label key={brand} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={params.getAll("brand").includes(brand)}
              onChange={() => updateMultiFilter("brand", brand)}
            />
            {brand}
          </label>
        ))}
      </div>

      {/* Sorting */}
      <div>
        <p className="font-medium text-sm">Sắp xếp</p>
        <select
          className="px-3 py-2 rounded-md border text-sm w-full"
          value={params.get("sort") ?? ""}
          onChange={(e) => updateFilter("sort", e.target.value)}
        >
          <option value="">Mặc định</option>
          <option value="price-asc">Giá: Thấp → Cao</option>
          <option value="price-desc">Giá: Cao → Thấp</option>
        </select>
      </div>

      {/* Dynamic Attributes */}
      {sortedKeys.map((key) => (
        <div key={key}>
          <p className="font-medium text-sm">
            {config.labels?.[key] ?? ATTRIBUTE_LABELS[key] ?? key}
          </p>

          <div className="space-y-1">
            {attrs[key].map((val) => (
              <label key={val} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={params.getAll(key).includes(val)}
                  onChange={() => updateMultiFilter(key, val)}
                />
                {formatValue(val)}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
