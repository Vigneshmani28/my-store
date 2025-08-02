"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setCart, removeFromCart, clearCart, updateQuantity } from "@/redux/cartSlice";
import Link from "next/link";
import {
  CheckCircle,
  LogInIcon,
  ShoppingCart,
  TrashIcon,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "sonner";
import Loader from "@/components/Loader";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type Address = {
  id: string;
  name: string;
  details: string;
  State: string;
  Pin: string;
};

export default function CartPage() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.items);
  const [authError, setAuthError] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [selectedAddress, setSelectedAddress] = useState<{
    id: string;
    state: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    discount: number;
  } | null>(null);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", details: "", State: "", Pin: "" });

  const shippingCost = selectedAddress?.state === "TamilNadu" ? 0 : 100;

  // Sample addresses - replace with your actual address data
  const [addresses, setAddresses] = useState<Address[]>([
      { id: "1", name: "Home", details: "123 Main St, City", State: "TamilNadu", Pin: "600001" },
      { id: "2", name: "Work", details: "456 Office Ave, City", State: "TamilNadu", Pin: "600001" },
    ]);

  // Sample tax rate - replace with your actual tax calculation
  const taxRate = 0.1; // 10%

  const SAMPLE_PROMO_CODES = [
    { code: "FIRST20", discount: 50 },
    { code: "SAVE10", discount: 10 },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
  // Normalize "State" field to exactly "TamilNadu"
  const normalizedState =
    form.State.trim().toLowerCase().replace(/\s+/g, "") === "tamilnadu"
      ? "TamilNadu"
      : form.State; // you can extend this for other states if needed

  const newAddress: Address = {
    id: Date.now().toString(),
    ...form,
    State: normalizedState,
  };

  setAddresses((prev) => [...prev, newAddress]);
  setForm({ name: "", details: "", State: "", Pin: "" });
  setOpen(false);
};



  // Load cart from DB
  useEffect(() => {
    const loadCart = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/cart");
        if (res.status === 401) {
          setAuthError(true);
          dispatch(setCart([]));
          return;
        }
        if (!res.ok) throw new Error("Failed to load cart");
        const items = await res.json();

        if (Array.isArray(items)) {
          dispatch(setCart(items));
        } else {
          dispatch(setCart([])); // fallback to empty
        }
      } catch (err) {
        console.error("Cart load failed:", err);
        setAuthError(true);
        dispatch(setCart([]));
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, [dispatch]);

  const handleRemove = async (productId: string) => {
    await dispatch(removeFromCart(productId));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  let subtotal = Array.isArray(cart)
    ? cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    : 0;

  // Apply promo discount if available
  const discount = appliedPromo ? appliedPromo.discount : 0;
  const discountedSubtotal = Math.max(0, subtotal - discount);
  const tax = discountedSubtotal * taxRate;
  const grandTotal = discountedSubtotal + tax + shippingCost;

  const handlePromoCode = () => {
    if (!promoCode.trim()) {
      toast.error("Please enter a promo code");
      return;
    }

    const validPromo = SAMPLE_PROMO_CODES.find(
      (p) => p.code.toUpperCase() === promoCode.toUpperCase()
    );

    if (validPromo) {
      setAppliedPromo(validPromo);
      setPromoCode("");
      toast.success(`Promo code "${validPromo.code}" applied successfully!`);
    } else {
      toast.error("Invalid promo code");
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    toast.info("Promo code removed");
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <ShoppingCart className="w-6 h-6" />
            Your Shopping Cart
          </h2>
        </div>
        {cart.length > 0 && (
          <div>
            <Button
              onClick={handleClearCart}
              variant="outline"
              className="cursor-pointer text-red-700 border border-red-600 hover:bg-red-600 hover:text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors duration-200"
            >
              <TrashIcon className="w-4 h-4" />
              Clear Cart
            </Button>
          </div>
        )}
      </div>

      {authError ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="mb-4 text-red-700">
            You must be logged in to view your cart.
          </p>
        </div>
      ) : cart.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <ShoppingCart className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Link
            href="/shop"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="divide-y bg-white rounded-lg shadow-sm p-4">
              {cart.map((item) => (
                <div
                  key={item.productId}
                  className="py-4 flex flex-col sm:flex-row gap-4"
                >
                  <div className="flex-shrink-0">
                    <div className="relative w-24 h-24 rounded-md overflow-hidden border">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="100px"
                      />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <h4 className="font-semibold text-lg">{item.name}</h4>
                      <button
                        onClick={() => handleRemove(item.productId)}
                        className="text-gray-500 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <X className="w-5 h-5 cursor-pointer" />
                      </button>
                    </div>
                    <p className="text-gray-600 mt-1">
                      ₹{item.price.toLocaleString()}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
  <Button
    variant="outline"
    size="icon"
    className="cursor-pointer"
    onClick={() =>
      item.quantity > 1 &&
      dispatch(updateQuantity({ productId: item.productId, quantity: item.quantity - 1 }))
    }
  >
    -
  </Button>
  <span className="w-8 text-center">{item.quantity}</span>
  <Button
    variant="outline"
    className="cursor-pointer"
    size="icon"
    onClick={() =>
      dispatch(updateQuantity({ productId: item.productId, quantity: item.quantity + 1 }))
    }
  >
    +
  </Button>
</div>

                  </div>
                  <div className="sm:text-right font-medium">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold mb-4">Shipping Address</h3>
              <div className="space-y-3">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`p-3 border rounded-md cursor-pointer transition-colors ${
                      selectedAddress?.id === address.id
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() =>
                      setSelectedAddress({
                        id: address.id,
                        state: address.State,
                      })
                    }
                  >
                    <div className="font-medium">{address.name}</div>
                    <div className="text-sm text-gray-600">
                      {address.details},{address.State} - {address.Pin}
                    </div>
                    {address.State === "TamilNadu" && (
                      <div className="text-xs text-green-600 mt-1">
                        Free shipping for Tamil Nadu
                      </div>
                    )}
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-2" onClick={() => setOpen(true)}>
                  + Add New Address
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold mb-4">Promo Code</h3>
              {appliedPromo ? (
                <div className="flex justify-between items-center bg-green-50 p-3 rounded-md">
                  <div>
                    <span className="font-medium">
                      Applied: {appliedPromo.code}
                    </span>
                    <span className="text-green-600 ml-2">
                      -₹{appliedPromo.discount}
                    </span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X className="w-4 h-4 cursor-pointer" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    className="flex-grow px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handlePromoCode()}
                  />
                  <Button
                    variant="outline"
                    className="cursor-pointer"
                    onClick={handlePromoCode}
                  >
                    Apply
                  </Button>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>

                {appliedPromo && (
                  <div className="flex justify-between text-green-600">
                    <span>Promo Discount ({appliedPromo.code})</span>
                    <span>-₹{appliedPromo.discount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>₹{shippingCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (10%)</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
                <div className="border-t pt-3 mt-3 flex justify-between font-bold text-lg">
                  <span>Grand Total</span>
                  <span>₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg cursor-pointer flex items-center justify-center gap-2 mt-6">
                <CheckCircle className="w-5 h-5" />
                Proceed to Checkout
              </Button>

              <Link
                href="/shop"
                className="inline-block w-full text-center text-green-700 hover:text-green-800 font-medium py-3 rounded-md transition-colors duration-200 mt-3"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Address</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Label</Label>
              <Input id="name" name="name" value={form.name} onChange={handleChange} className="col-span-3" placeholder="Home / Work" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="details" className="text-right">Details</Label>
              <Input id="details" name="details" value={form.details} onChange={handleChange} className="col-span-3" placeholder="123 Street, City" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="State" className="text-right">State</Label>
              <Input id="State" name="State" value={form.State} onChange={handleChange} className="col-span-3" placeholder="Tamil Nadu" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Pin" className="text-right">PIN</Label>
              <Input id="Pin" name="Pin" value={form.Pin} onChange={handleChange} className="col-span-3" placeholder="600001" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSubmit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
