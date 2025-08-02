"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function SortDropdown() {
  const router = useRouter();
  const params = useSearchParams();
  const selected = params.get("sort") || "";

  const updateSort = (value: string) => {
    const newParams = new URLSearchParams(params.toString());
    if (value) newParams.set("sort", value);
    else newParams.delete("sort");
    router.push(`/shop?${newParams.toString()}`);
  };

  return (
    <select
      value={selected}
      onChange={(e) => updateSort(e.target.value)}
      className="border px-3 py-2 rounded-md"
    >
      <option value="">Sort by</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
    </select>
  );
}
