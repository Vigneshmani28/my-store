"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ShoppingCart, Check } from "lucide-react";
import { useAppDispatch } from "@/lib/hooks";
import { addToCart } from "@/redux/cartSlice";
import { useState } from "react";
import { toast } from "sonner";

interface Product {
  _id: string;
  name: string;
  slug: string;
  originalPrice: number;
  offerPrice: number;
  images: string[];
}

export function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,
        price: product.offerPrice ? product.offerPrice : product.originalPrice,
        quantity: 1,
        image: product.images[0] || "",
      })
    );
    setAdded(true);
    toast.success(`${product.name} added to cart!`, {
      duration: 2000,
      position: "top-right",
    });
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="relative w-full max-w-xs bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col">
      <div className="relative w-full aspect-square">
        <Image
          src={product.images[0] || "/placeholder.svg"}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          className="object-cover transition-transform duration-300 hover:scale-105"
          priority={false}
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-1 line-clamp-2">{product.name}</h3>
          <div className="flex items-center gap-2">
  <span className="text-base font-semibold text-primary">₹{product.offerPrice}</span>
  <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>

  {product.originalPrice > product.offerPrice && (
    <span className="text-xs text-green-600 font-medium bg-green-100 px-2 py-0.5 rounded-md">
      {Math.round(((product.originalPrice - product.offerPrice) / product.originalPrice) * 100)}% OFF
    </span>
  )}
</div>

        </div>

        <div className="flex items-center gap-2 mt-auto">
          <Button asChild variant="outline" className="flex-grow">
            <Link href={`/shop/${product.slug}`}>
              View Details
            </Link>
          </Button>

          <Button
            size="icon"
            variant={added ? "default" : "outline"}
            className={`shrink-0 ${added ? "bg-green-600 hover:bg-green-700 cursor-pointer" : "cursor-pointer"}`}
            onClick={handleAdd}
            aria-label="Add to cart"
          >
            {added ? <Check size={18} /> : <ShoppingCart size={18} />}
          </Button>
        </div>
      </div>
    </div>
  );
}