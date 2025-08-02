"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const heroSlides = [
  {
    img: "/banner1.jpg",
    heading: "Pure & Natural Beauty",
    subheading: "Handcrafted cosmetic products made with love & plants 🌿",
  },
  {
    img: "/banner2.jpg",
    heading: "New Arrivals Are Here",
    subheading: "Try our 100% organic skincare collection today 🌸",
  },
  {
    img: "/banner1.jpg",
    heading: "Sustainable. Ethical. Beautiful.",
    subheading: "Be kind to your skin and the Earth 🌍",
  },
];

export function CarouselHero() {
  return (
    <section className="w-full h-[500px] relative overflow-hidden rounded-b-3xl shadow-md">
      <Carousel
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: 4000, stopOnInteraction: false })]}
      >
        <CarouselContent>
          {heroSlides.map((slide, idx) => (
            <CarouselItem key={idx}>
              <Link href="/shop" className="block relative w-full h-[500px] cursor-pointer">
                <Image
                  src={slide.img}
                  alt={slide.heading}
                  fill
                  className="object-cover opacity-90 rounded-b-3xl"
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
