import { products } from "@/lib/mock-data";
import { Product } from "@/types/product";

export async function getAllProducts(): Promise<Product[]> {
  return products;
}

export async function getProductBySlug(
  slug: string
): Promise<Product | undefined> {
  return products.find((p) => p.slug === slug);
}

export async function getProductByCategory(
  category: string
): Promise<Product[]> {
  return products.filter((p) => p.category === category);
}
