"use client";

import { useState } from "react";
import { Star } from "lucide-react";

export function ProductReviews() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (!comment) return;
    console.log("Review submitted:", { rating, comment });
    setComment("");
    setRating(0);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Đánh giá sản phẩm</h3>

      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={20}
            className="cursor-pointer"
            fill={(hover || rating) >= i ? "#FACC15" : "none"}
            stroke="#FACC15"
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating(i)}
          />
        ))}
      </div>

      <textarea
        rows={3}
        placeholder="Chia sẻ trải nghiệm của bạn..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full border rounded-md p-2 text-sm"
      />

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        onClick={handleSubmit}
      >
        Gửi đánh giá
      </button>
    </div>
  );
}
