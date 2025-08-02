// app/product/[slug]/page.tsx
import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";
import { ProductType } from "@/types/apps";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
    const {slug} = await params;
  await connectDB();

  const product = await Product.findOne({ slug: params.slug }).lean() as ProductType | null;
  if (!product) return notFound();

  const relatedProducts = await Product.find({ slug: { $ne: params.slug } }).limit(4).lean();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Product Detail Section */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-md">
          <Image
            src={product.images?.[0] || "/placeholder.jpg"}
            alt={product.name}
            fill
            sizes="100%"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-2xl text-green-700 mt-2 font-semibold">₹{product.price}</p>
            <p className="mt-6 text-gray-600 leading-relaxed">
              {product.description || "No description available."}
            </p>
          </div>

          <div className="mt-8">
            <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 cursor-pointer">
                Add to Cart
            </Button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">You may also like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((prod, index) => (
            <Link href={`/product/${prod.slug}`} key={index}>
              <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition">
                <div className="relative w-full aspect-square">
                  <Image
                    src={prod.images?.[0] || "/placeholder.jpg"}
                    alt={prod.name}
                    fill
                    sizes="100%"
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900">{prod.name}</h3>
                  <p className="text-sm text-green-700 mt-1">₹{prod.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
