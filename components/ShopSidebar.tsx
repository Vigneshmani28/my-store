"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ShopSidebar() {
  const router = useRouter();
  const params = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const applyFilter = (category: string) => {
    const newParams = new URLSearchParams(params.toString());
    if (category) newParams.set("category", category);
    else newParams.delete("category");
    router.push(`/shop?${newParams.toString()}`);
  };

  const categories = ["skincare", "lipcare", "bodycare", "haircare", "All"];

  return (
    <aside className="w-full md:w-64 bg-white border rounded-md p-4">
      <button
        className="md:hidden mb-2 text-sm text-green-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Hide Filters" : "Show Filters"}
      </button>
      {(isOpen || typeof window === "undefined" || window.innerWidth >= 768) && (
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Category</h2>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => applyFilter(c === "All" ? "" : c)}
              className="block text-left w-full text-sm text-gray-700 hover:underline cursor-pointer"
            >
              {c[0].toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>
      )}
    </aside>
  );
}
