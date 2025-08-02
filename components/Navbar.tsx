"use client";

import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ShoppingCart, LogInIcon, Menu, X, ShoppingBag } from "lucide-react";
import { useAppSelector } from "@/lib/hooks";
import { useState } from "react";

export default function Navbar() {
  const cart = useAppSelector((state) => state.cart.items);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-semibold tracking-tighter text-gray-900 hover:text-green-600 transition-colors"
        >
          nature<span className="text-green-600">.</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Left nav items */}
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all group-hover:w-full"></span>
            </Link>
          ))}

          {/* Separated Shop Button */}
          <Link href="/shop">
            <Button className="bg-green-600 text-white hover:bg-green-700 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              Shop
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <Link href="/cart" passHref className="relative p-2">
            <ShoppingCart className="w-5 h-5 text-gray-600" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-600"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X size={20} className="cursor-pointer" />
            ) : (
              <Menu size={20} className="cursor-pointer" />
            )}
          </button>
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <Link
            href="/cart"
            passHref
            className="relative p-2 rounded-full hover:bg-gray-50 transition-colors"
          >
            <ShoppingCart className="w-5 h-5 text-gray-600" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          <div className="ml-2">
            <SignedIn>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-8 h-8",
                  },
                }}
              />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all"
                >
                  <LogInIcon className="w-4 h-4" />
                  <span>Sign In</span>
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 mt-3 py-4 px-6">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-base font-medium text-gray-700 hover:text-green-600 py-2 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Separated Shop Button */}
            <Link href="/shop" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-green-600 text-white hover:bg-green-700">
                <ShoppingBag className="w-4 h-4" />
                Shop
              </Button>
            </Link>
          </div>

          {/* Signin/Signout in Mobile */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <SignedIn>
              <div className="flex justify-center">
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-8 h-8",
                    },
                  }}
                />
              </div>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LogInIcon className="w-4 h-4" />
                  <span>Sign In</span>
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      )}
    </nav>
  );
}
