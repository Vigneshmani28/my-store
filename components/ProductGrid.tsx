import { ProductCard } from "./ProductCard";

export default function ProductGrid({ products }: { products: any[] }) {
  return (
    <div>
      {products.length === 0 ? (
        <p className="text-center text-muted-foreground">No products available.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
