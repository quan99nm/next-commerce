"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useSearch } from "./useSearch";
import Link from "next/link";
import Image from "next/image";
export function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();
  const { loading, results, open, setOpen } = useSearch(keyword);
  const ref = useRef<HTMLDivElement | null>(null);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    router.push(`/products?q=${encodeURIComponent(keyword)}`);
    setKeyword("");
    setOpen(false);
  };
  function highlightMatch(text: string, keyword: string) {
    const regex = new RegExp(`(${keyword})`, "gi");
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <span key={i} className="text-red-600 font-bold">
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  }
  // Click ngoài thì đóng dropdown
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [setOpen]);

  const hasKeyword = keyword.trim().length > 0;

  return (
    <div ref={ref} className="relative w-full max-w-lg">
      <form onSubmit={onSearch} className="flex bg-slate-100 rounded-full p-1">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Bạn tìm gì hôm nay?"
          className="flex-1 px-4 py-1 text-sm bg-transparent outline-none"
        />
        <Button className="rounded-full px-4 text-xs bg-blue-600 hover:bg-blue-700">
          {loading ? "..." : "Tìm kiếm"}
        </Button>
      </form>

      {/* Suggestion Results */}
      {hasKeyword && open && (
        <div className="absolute mt-1 w-full bg-white border shadow-lg rounded-lg p-2 z-50">
          {loading && (
            <div className="p-3 text-sm text-gray-500 flex gap-2 items-center">
              <span className="animate-spin border-2 border-blue-500 border-t-transparent rounded-full w-4 h-4"></span>
              Đang tìm...
            </div>
          )}

          {!loading && results.length === 0 && (
            <div className="p-3 text-sm text-gray-500">
              Không tìm thấy sản phẩm
            </div>
          )}

          {results.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="flex items-center gap-3 px-3 py-2 hover:bg-slate-100 rounded-md cursor-pointer text-sm"
              onClick={() => setOpen(false)}
            >
              {/* Image */}
              {product.thumbnail && (
                <Image
                  src={product.thumbnail}
                  alt={product.name}
                  width={40}
                  height={40}
                  className="object-cover rounded-md"
                />
              )}

              {/* Name + Price */}
              <div className="flex-1">
                <p className="font-medium truncate">
                  {highlightMatch(product.name, keyword)}
                </p>
                <span className="text-blue-600 font-semibold">
                  {(product.salePrice ?? product.basePrice).toLocaleString()}₫
                </span>
              </div>
            </Link>
          ))}

          {results.length > 0 && (
            <button
              type="button"
              onClick={() => {
                router.push(`/products?q=${encodeURIComponent(keyword)}`);
                setOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-blue-600 hover:bg-blue-50
                   text-sm font-medium border-t mt-1"
            >
              Xem tất cả kết quả
            </button>
          )}
        </div>
      )}
    </div>
  );
}
