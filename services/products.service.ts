import { products } from "@/lib/mock-data";
import { Product } from "@/types/product";

{
  /*export async function getAllProducts() {
  return fetch("/api/products").then(res => res.json());
}*/
}
export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export async function searchProducts(keyword: string) {
  const lower = keyword.toLowerCase();
  return products.filter((p) => p.name.toLowerCase().includes(lower));
}
export async function getProductsByCategory(category: string) {
  const products = await getAllProducts();
  return products.filter(
    (p) => p.category?.toLowerCase() === category.toLowerCase()
  );
}
export function filterProducts(filters: {
  q?: string;
  category?: string;
  brand?: string[];
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  attrs?: { [key: string]: string[] };
}) {
  return products.filter((p) => {
    // Search
    if (filters.q && !p.name.toLowerCase().includes(filters.q.toLowerCase()))
      return false;

    // Category
    if (filters.category && p.category !== filters.category) return false;

    // Brand
    if (filters.brand && !filters.brand.includes(p.brand)) return false;

    // Rating
    if (filters.rating && (p.rating ?? 0) < filters.rating) return false;

    // Price range
    const price = p.salePrice ?? p.basePrice;
    if (filters.priceMin && price < filters.priceMin) return false;
    if (filters.priceMax && price > filters.priceMax) return false;

    // Dynamic attributes filtering
    if (filters.attrs) {
      for (const key in filters.attrs) {
        const values = filters.attrs[key];
        if (
          values.length > 0 &&
          p.attributes?.[key] &&
          !values.includes(String(p.attributes[key]))
        ) {
          return false;
        }
      }
    }

    return true;
  });
}

// Get all attribute keys in category (to build UI filter dynamically)
export function getAttributesByCategory(category: string) {
  const items = products.filter((p) => p.category === category);
  const attrs: { [key: string]: Set<string> } = {};

  items.forEach((p) => {
    if (!p.attributes) return;
    Object.entries(p.attributes).forEach(([k, v]) => {
      if (!attrs[k]) attrs[k] = new Set();
      attrs[k].add(String(v));
    });
  });

  // Convert Set -> array
  return Object.fromEntries(Object.entries(attrs).map(([k, v]) => [k, [...v]]));
}
export function getAllCategories() {
  const categories = new Set<string>();
  products.forEach((p) => {
    if (p.category) categories.add(p.category);
  });
  return Array.from(categories);
}
