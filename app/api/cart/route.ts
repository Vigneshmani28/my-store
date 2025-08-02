import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import { Cart } from "@/models/Cart";

export async function GET(req: NextRequest) {
  await connectDB();
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const cart = await Cart.findOne({ userId: user.id });
  return NextResponse.json(cart?.items || []);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const items = await req.json();

  // ✅ Prevent accidental wipe: if items is empty, skip saving
  if (!Array.isArray(items)) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  if (items.length === 0) {
    // Optionally allow clearing the cart only if user explicitly requested it
    // Example: add a query param ?clear=true to allow this
    const clear = req.nextUrl.searchParams.get("clear");
    if (clear !== "true") {
      return NextResponse.json({ skipped: "Empty cart not saved" }, { status: 200 });
    }
  }

  let cart = await Cart.findOne({ userId: user.id });

  if (!cart) {
    cart = new Cart({ userId: user.id, items });
  } else {
    cart.items = items;
  }

  await cart.save();
  return NextResponse.json({ success: true });
}

