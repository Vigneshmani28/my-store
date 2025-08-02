// app/shop/page.tsx
export const dynamic = "force-dynamic"; // ✅ allows dynamic search param access

import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";
import { ProductCard } from "@/components/ProductCard";
import ShopSearchBar from "@/components/ShopSearchBar";
import ShopSidebar from "@/components/ShopSidebar";
import SortDropdown from "@/components/SortDropdown";
import type { SortOrder } from "mongoose";
import { Metadata } from "next";

type Props = {
  searchParams?: {
    query?: string;
    category?: string;
    sort?: string;
  };
};

export default async function ShopPage(props: Props) {
  await connectDB();

  const searchParams = props.searchParams || {};
  const { query, category, sort } = searchParams;

  const mongoQuery: any = {};
  if (query) mongoQuery.name = { $regex: query, $options: "i" };
  if (category) mongoQuery.category = category;

  const sortOption: { [key: string]: SortOrder } =
    sort === "price-asc"
      ? { offerPrice: "asc" }
      : sort === "price-desc"
      ? { offerPrice: "desc" }
      : {};

  const rawProducts = await Product.find(mongoQuery).sort(sortOption).lean();

  const products = rawProducts.map((p: any) => ({
    _id: p._id.toString(),
    name: p.name,
    slug: p.slug,
    originalPrice: p.originalPrice,
    offerPrice: p.offerPrice,
    images: p.images,
  }));

  return (
    <main className="max-w-7xl mx-auto p-4 md:p-6">
      <ShopSearchBar />
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <ShopSidebar />
        <div className="flex-1">
          <div className="flex justify-end mb-4">
            <SortDropdown />
          </div>
          {products.length === 0 ? (
            <p className="text-center text-muted-foreground">No products found.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
