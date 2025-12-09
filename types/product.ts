// src/types/product.ts

export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  salePrice?: number; // Giá sale nếu có
  rating?: number; // 0–5
  reviewsCount?: number; // tổng số review
  thumbnail?: string; // ảnh chính
  category?: string; // danh mục
  stock?: number; // tồn kho (cho Flash Sale)
  brand?: string; // sau này gắn brand filter
  description?: string; // mô tả detail page
};
