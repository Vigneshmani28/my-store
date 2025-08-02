export interface ProductType {
  _id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  description?: string;
}
