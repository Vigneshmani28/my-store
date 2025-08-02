"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setCart } from "@/redux/cartSlice";
import { useAuth } from "@clerk/nextjs";

export default function CartSync() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.items);
  const { isSignedIn } = useAuth();

  const [hasLoadedCart, setHasLoadedCart] = useState(false); // ✅ prevent premature sync

  // 1. Load cart from DB if signed in
  useEffect(() => {
    const loadCart = async () => {
      if (!isSignedIn) return;

      try {
        const res = await fetch("/api/cart");
        if (!res.ok) throw new Error("Failed to load cart");

        const items = await res.json();
        dispatch(setCart(Array.isArray(items) ? items : []));
      } catch (err) {
        console.error("Error loading cart:", err);
        dispatch(setCart([]));
      } finally {
        setHasLoadedCart(true); // ✅ mark cart as loaded
      }
    };

    loadCart();
  }, [dispatch, isSignedIn]);

  // 2. Sync cart to DB, only after loading it first
  useEffect(() => {
    const syncCart = async () => {
      if (!isSignedIn || !hasLoadedCart) return;
      if (!Array.isArray(cart)) return;

      try {
        const res = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cart),
        });

        if (!res.ok) throw new Error("Cart sync failed");
      } catch (err) {
        console.error("Error syncing cart:", err);
      }
    };

    syncCart();
  }, [cart, isSignedIn, hasLoadedCart]); // ✅ wait until cart is loaded

  return null;
}
