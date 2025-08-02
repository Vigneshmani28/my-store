"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function ShopSearchBar() {
  const router = useRouter();
  const params = useSearchParams();
  const [input, setInput] = useState(params.get("query") || "");

  useEffect(() => {
    const delay = setTimeout(() => {
      const q = input.trim();
      const newParams = new URLSearchParams(params.toString());
      if (q) newParams.set("query", q);
      else newParams.delete("query");

      router.push(`/shop?${newParams.toString()}`);
    }, 500);
    return () => clearTimeout(delay);
  }, [input]);

  return (
    <input
      value={input}
      onChange={(e) => setInput(e.target.value)}
      className="w-full border border-gray-300 px-4 py-2 rounded-md"
      placeholder="Search products..."
    />
  );
}
