"use client";
import { useEffect, useState } from "react";

export function FlashSaleTimer() {
  const [timeLeft, setTimeLeft] = useState(3600); // 1 giờ flash sale

  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <span className="text-blue-600 font-bold text-sm bg-blue-100 px-2 py-1 rounded">
      {hours}h : {minutes}m : {seconds}s
    </span>
  );
}
