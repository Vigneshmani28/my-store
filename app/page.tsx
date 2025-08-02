import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";
import { ProductCard } from "@/components/ProductCard";
import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CarouselHero } from "@/components/CarouselHero";
import {
  ArrowRight,
  Clock,
  FlaskConical,
  Leaf,
  MapPin,
  Package,
  PackageCheck,
  TrendingUp,
  Truck,
} from "lucide-react";

export default async function HomePage() {
  await connectDB();

  const rawProducts = await Product.find({ isPopular: true }).limit(4).lean();
  const products = rawProducts.map((p: any) => ({
    _id: p._id.toString(),
    name: p.name,
    slug: p.slug,
    originalPrice: p.originalPrice,
    offerPrice: p.offerPrice,
    images: p.images,
  }));

  const testiMonials = [
    {
      name: "Priya M.",
      role: "Yoga Instructor",
      image: "/users/user1.jpg",
      message:
        "Nature Store products are gentle and effective. I’ve completely switched to their face oil — no more breakouts, just glowing skin!",
    },
    {
      name: "Rahul D.",
      role: "Environmentalist",
      image: "/users/user2.jpg",
      message:
        "What I love most is their eco-friendly packaging and honest ingredient list. Finally, a brand that aligns with my values.",
    },
    {
      name: "Anjali S.",
      role: "Ayurveda Enthusiast",
      image: "/users/user3.jpg",
      message:
        "As someone who believes in natural healing, this store is a gem. Their products are rooted in tradition and feel luxurious.",
    },
  ];

  return (
    <main className="bg-white text-gray-800">
      {/* Hero Carousel Section */}
      <CarouselHero />

      {/* Popular Products */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-10 text-center text-green-700 flex items-center justify-center gap-3">
          <TrendingUp className="w-8 h-8 text-green-600" />
          Popular Products
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}

          {/* Shop More Button */}
          <div className="col-span-1 sm:col-span-2 md:col-span-4 flex justify-end">
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 mt-4 bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition-colors duration-200"
            >
              Shop More
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-green-50 py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-6 text-green-800">
          Why Choose Natural Cosmetics?
        </h2>
        <p className="max-w-3xl mx-auto text-gray-700 text-lg leading-relaxed">
          Our products are made from 100% organic ingredients, cruelty-free, and
          environmentally sustainable. No chemicals, just nature. 🌱
        </p>
      </section>

      {/* Who We Are Section */}
      <section className="bg-gradient-to-r from-green-50 to-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-green-800 mb-12">
            Who We Are
          </h2>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="w-full h-80 relative rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/team.jpg"
                alt="Our Team"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-green-700 mb-4">
                Rooted in Nature & Tradition
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                At <span className="font-semibold">Nature Store</span>, we
                cherish the age-old wisdom of Ayurveda and holistic wellness.
                Our journey started with a simple idea: to bring nature closer
                to your skin.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Blending modern science with ancient herbal knowledge, we craft
                skincare that’s honest, pure, and powerful — with full
                transparency and love.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Prepare & Deliver Your Products Section */}
<section className="bg-green-50 py-20 px-4">
  <div className="max-w-7xl mx-auto text-center">
    <h2 className="text-4xl font-bold text-green-800 mb-4">
      Our Careful Process
    </h2>
    <p className="text-lg text-green-600 mb-12 max-w-3xl mx-auto">
      From sourcing to your doorstep - each step crafted with care
    </p>
    
    {/* Process Flow */}
    <div className="relative">
      {/* Progress line */}
      <div className="hidden md:block absolute h-1 bg-green-200 top-1/2 left-0 right-0 transform -translate-y-1/2"></div>
      
      <div className="grid gap-8 md:grid-cols-5">
        {[
          {
            icon: <Leaf className="w-10 h-10 text-white mb-4" />,
            title: "1. Ethical Sourcing",
            desc: "Handpicked from certified organic farms",
            color: "bg-green-600"
          },
          {
            icon: <FlaskConical className="w-10 h-10 text-white mb-4" />,
            title: "2. Artisan Crafting",
            desc: "Small-batch blending by skilled artisans",
            color: "bg-green-700"
          },
          {
            icon: <PackageCheck className="w-10 h-10 text-white mb-4" />,
            title: "3. Quality Check",
            desc: "Rigorous testing for purity & potency",
            color: "bg-green-800"
          },
          {
            icon: <Package className="w-10 h-10 text-white mb-4" />,
            title: "4. Sustainable Packing",
            desc: "Eco-friendly materials only",
            color: "bg-green-900"
          },
          {
            icon: <Truck className="w-10 h-10 text-white mb-4" />,
            title: "5. Carbon-Neutral Shipping",
            desc: "Delivered with minimal environmental impact",
            color: "bg-green-950"
          }
        ].map((step, index) => (
          <div key={index} className="relative z-10">
            {/* Step indicator (for mobile) */}
            <div className="md:hidden flex justify-center mb-2">
              <div className={`w-3 h-3 rounded-full ${step.color}`}></div>
            </div>
            
            {/* Step card */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300 h-full flex flex-col items-center cursor-pointer">
              <div className={`${step.color} rounded-full p-3 mb-4`}>
                {step.icon}
              </div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Delivery Guarantee */}
    <div className="mt-16 bg-white rounded-2xl shadow-sm p-8 max-w-4xl mx-auto border border-green-100">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:mr-8 mb-6 md:mb-0">
          <div className="bg-green-100 rounded-full p-4">
            <Clock className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="text-left">
          <h3 className="text-xl font-bold text-green-800 mb-2">
            Timely Delivery Promise
          </h3>
          <p className="text-gray-600 mb-4">
            We carefully pack and ship within 24 hours. Most orders arrive within 3-5 business days.
          </p>
          <div className="flex items-center text-sm text-green-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span>Currently shipping to all 50 states</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* FAQ Section with Accordion */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-green-800">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full space-y-2">
          <AccordionItem value="item-1">
            <AccordionTrigger>Are your products 100% natural?</AccordionTrigger>
            <AccordionContent>
              Yes, all our ingredients are plant-based, ethically sourced, and
              completely natural.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Do you offer Cash on Delivery?</AccordionTrigger>
            <AccordionContent>
              Yes, we offer both online payment and Cash on Delivery across
              India.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is your packaging eco-friendly?</AccordionTrigger>
            <AccordionContent>
              Absolutely. We use recyclable materials and avoid single-use
              plastics.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-green-800 mb-12">
            What Our Customers Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testiMonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-green-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 relative rounded-full overflow-hidden border-2 border-green-600">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-green-800">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  "{testimonial.message}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-10 px-6 mt-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-lg font-semibold mb-2">Nature Store</h3>
            <p className="text-sm text-gray-200">
              Crafted with care from nature’s best. Organic. Ethical.
              Sustainable.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/shop" className="hover:underline">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Follow Us</h4>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="text-center text-xs text-gray-300 mt-8">
          &copy; {new Date().getFullYear()} Nature Store. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
