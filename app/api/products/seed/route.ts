import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST() {
  await connectDB();

  await Product.deleteMany();

  const testImage = "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=687&auto=format&fit=crop";

  const products = [
    {
      name: "Herbal Face Wash",
      slug: "herbal-face-wash",
      description: "Gentle cleanser with natural ingredients",
      originalPrice: 249,
      offerPrice: 199,
      stock: 50,
      images: [testImage],
      category: "skincare",
      isPopular: true,
    },
    {
      name: "Organic Lip Balm",
      slug: "organic-lip-balm",
      description: "Nourishing balm for soft lips",
      originalPrice: 129,
      offerPrice: 99,
      stock: 100,
      images: [testImage],
      category: "lipcare",
      isPopular: true,
    },
    {
      name: "Aloe Vera Gel",
      slug: "aloe-vera-gel",
      description: "Soothes skin and hydrates deeply",
      originalPrice: 199,
      offerPrice: 149,
      stock: 80,
      images: [testImage],
      category: "skincare",
      isPopular: true,
    },
    {
      name: "Mint Foot Cream",
      slug: "mint-foot-cream",
      description: "Cooling cream for cracked heels",
      originalPrice: 99,
      offerPrice: 79,
      stock: 100,
      images: [testImage],
      category: "bodycare",
      isPopular: false,
    },
    {
      name: "Coconut Hair Oil",
      slug: "coconut-hair-oil",
      description: "Nourishing oil for strong, shiny hair",
      originalPrice: 299,
      offerPrice: 249,
      stock: 60,
      images: [testImage],
      category: "haircare",
      isPopular: true,
    },
    {
      name: "Rose Water Toner",
      slug: "rose-water-toner",
      description: "Hydrating toner for glowing skin",
      originalPrice: 199,
      offerPrice: 159,
      stock: 70,
      images: [testImage],
      category: "skincare",
      isPopular: false,
    },
    {
      name: "Shea Butter Body Lotion",
      slug: "shea-butter-body-lotion",
      description: "Deeply moisturizing lotion for dry skin",
      originalPrice: 349,
      offerPrice: 299,
      stock: 90,
      images: [testImage],
      category: "bodycare",
      isPopular: false,
    },
    {
      name: "Herbal Shampoo",
      slug: "herbal-shampoo",
      description: "Gentle shampoo for daily hair care",
      originalPrice: 249,
      offerPrice: 199,
      stock: 75,
      images: [testImage],
      category: "haircare",
      isPopular: true,
    },
    {
      name: "Lavender Lip Scrub",
      slug: "lavender-lip-scrub",
      description: "Exfoliating scrub for soft lips",
      originalPrice: 149,
      offerPrice: 119,
      stock: 120,
      images: [testImage],
      category: "lipcare",
      isPopular: false,
    },
    {
      name: "Neem Face Pack",
      slug: "neem-face-pack",
      description: "Purifying face pack for clear skin",
      originalPrice: 199,
      offerPrice: 149,
      stock: 80,
      images: [testImage],
      category: "skincare",
      isPopular: false,
    },
    {
      name: "Amla Hair Mask",
      slug: "amla-hair-mask",
      description: "Strengthens and nourishes hair roots",
      originalPrice: 299,
      offerPrice: 249,
      stock: 60,
      images: [testImage],
      category: "haircare",
      isPopular: false,
    },
    {
      name: "Coffee Body Scrub",
      slug: "coffee-body-scrub",
      description: "Exfoliates and rejuvenates skin",
      originalPrice: 249,
      offerPrice: 199,
      stock: 85,
      images: [testImage],
      category: "bodycare",
      isPopular: true,
    }
  ];

  await Product.insertMany(products);

  return NextResponse.json({ message: "Seeded products with offer price!" });
}
