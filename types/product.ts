// types/product.ts

export type ProductVariant = {
  id: string;
  sku?: string;
  color?: string;
  size?: string;
  price?: number;
  image?: string;
  stock: number;
};

export type ProductImage = {
  url: string;
  alt?: string;
};

export type ProductSpec = {
  label: string;
  value: string;
};

// Chuẩn hoá để filter
export type ProductAttributes = Record<string, string | number | boolean>;

export type Product = {
  id: string;
  slug: string;

  name: string;
  shortDescription?: string;
  description: string;

  basePrice: number;
  salePrice?: number;

  category: string;
  subCategory?: string;
  brand: string;

  thumbnail: string;
  images?: ProductImage[];

  rating?: number;
  reviewsCount?: number;

  stock: number;
  variants?: ProductVariant[];

  discountPercent?: number;
  isFlashSale?: boolean;
  flashSaleEnd?: string;

  weightKg?: number;
  dimensions?: { w: number; h: number; l: number };

  sellerId?: string;
  warrantyPeriodMonths?: number;
  returnPolicyDays?: number;

  sku?: string;
  gtin?: string;
  metaTitle?: string;
  metaDescription?: string;

  specs?: ProductSpec[];
  attributes?: ProductAttributes; // filter engine

  tags?: string[];
  createdAt?: string;
  updatedAt?: string;

  status?: "active" | "hidden" | "draft" | "archived";
};
