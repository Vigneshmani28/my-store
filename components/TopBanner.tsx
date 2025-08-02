"use client";

import { useEffect, useState } from "react";
import { Megaphone, X } from "lucide-react";

const messages = [
  "🌿 Get 20% off on your first order with code FIRST20!",
  "🚚 Free shipping on orders over ₹499!",
  "🔥 Limited-time deal: Buy 2 Get 1 Free on all soaps!",
  "🧴 New arrivals: Organic face serums now in stock!",
];

export default function TopBanner() {
  const [visible, setVisible] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 4000); // change message every 4 seconds

    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div className="bg-green-600 text-white py-2 px-4 text-sm flex items-center justify-between h-15">
      <div className="w-full flex items-center justify-center gap-2 text-center">
        <Megaphone className="w-4 h-4" />
        <span className="whitespace-nowrap">{messages[index]}</span>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 text-white hover:text-gray-200 text-xs"
      >
        <X className="cursor-pointer"/>
      </button>
    </div>
  );
}
