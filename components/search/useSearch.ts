"use client";

import { useEffect, useState } from "react";
import { searchProducts } from "@/services/products.service";
import { Product } from "@/types/product";

export function useSearch(keyword: string) {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!keyword.trim()) {
      return;
    }

    let cancelled = false;
    const timeout = setTimeout(async () => {
      setLoading(true);
      const res = await searchProducts(keyword);
      console.log("Search results:", res);
      if (cancelled) return;
      setResults(res);
      setOpen(true);
      setLoading(false);
    }, 300); // debounce 300ms

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [keyword]);

  return { loading, results, open, setOpen };
}
