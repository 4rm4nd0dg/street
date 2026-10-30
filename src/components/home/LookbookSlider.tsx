"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

interface LookbookItem {
  id: string;
  title: string;
  location: string;
  image: string;
  productName: string;
  productSlug: string;
  price: string;
}

export function LookbookSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const lookbookItems: LookbookItem[] = [
    {
      id: "look-1",
      title: "LOOK 01 // BÉTON NOIR",
      location: "ABIDJAN, TREICHVILLE PORT",
      image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=1200&auto=format&fit=crop&q=80",
      productName: "RAW SEAM HOODIE 460 GSM",
      productSlug: "raw-seam-hoodie-460-gsm",
      price: "49 000 FCFA / 75 €",
    },
    {
      id: "look-2",
      title: "LOOK 02 // CARGO TACTICAL",
      location: "PARIS, GARE DE LYON",
      image: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=1200&auto=format&fit=crop&q=80",
      productName: "MODULAR 8-POCKET CARGO",
      productSlug: "modular-8-pocket-cargo-pant",
      price: "45 000 FCFA / 69 €",
    },
    {
      id: "look-3",
      title: "LOOK 03 // NÉON STRIKE",
      location: "TOKYO, SHIBUYA CROSSING",
      image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1200&auto=format&fit=crop&q=80",
      productName: "NÉON STRIKE OVERSIZED HOODIE",
      productSlug: "neon-strike-oversized-hoodie",
      price: "52 000 FCFA / 80 €",
    },
    {
      id: "look-4",
      title: "LOOK 04 // ANORAK STORM",
      location: "ABIDJAN, VALLONS",
      image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=1200&auto=format&fit=crop&q=80",
      productName: "WINDBLOCKER BRUTAL ANORAK",
      productSlug: "windblocker-brutal-anorak",
      price: "59 000 FCFA / 90 €",
    },
    {
      id: "look-5",
      title: "LOOK 05 // RAW SELVEDGE",
      location: "DAKAR, MÉDINA ROOFTOP",
      image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=1200&auto=format&fit=crop&q=80",
      productName: "RAW DENIM OVERSIZED SHIRT",
      productSlug: "distressed-denim-overshirt",
      price: "52 000 FCFA / 80 €",
    },
  ];

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = direction === "left" ? -400 : 400;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="py-16 md:py-20 bg-[#F5F2EA] border-b-3 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold uppercase tracking-widest text-[#FF4D00]">
            <span>// ARCHIVE ÉDITORIALE</span>
            <span>✦</span>
            <span>CAMPAGNE OFFICIELLE SS26</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight leading-none text-black">
            LOOKBOOK &quot;NÉON BÉTON&quot;
          </h2>
        </div>

        {/* Slider Navigation Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scroll("left")}
            className="p-3 bg-white border-3 border-black brutal-shadow-sm hover:bg-[#E6FF00] transition-colors cursor-pointer"
            aria-label="Image précédente"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-3 bg-white border-3 border-black brutal-shadow-sm hover:bg-[#E6FF00] transition-colors cursor-pointer"
            aria-label="Image suivante"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <Link
            href="/lookbook"
            className="ml-2 font-mono text-xs font-bold underline uppercase hover:text-[#FF4D00]"
          >
            VOIR TOUT LE LOOKBOOK
          </Link>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto px-4 sm:px-8 pb-8 scrollbar-none snap-x snap-mandatory"
        style={{ scrollbarWidth: "none" }}
      >
        {lookbookItems.map((item) => (
          <div
            key={item.id}
            className="flex-shrink-0 w-[300px] sm:w-[420px] bg-white border-3 border-black brutal-shadow snap-start group flex flex-col"
          >
            {/* Image (4:5) */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-900 border-b-3 border-black">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 300px, 420px"
                className="object-cover group-hover:scale-103 transition-transform duration-500"
              />
              
              {/* Location Badge */}
              <div className="absolute top-3 left-3 bg-black/90 text-white font-mono text-[10px] font-bold px-2.5 py-1 border border-white/30 uppercase tracking-wider">
                📍 {item.location}
              </div>

              {/* Tagged Product Hotspot */}
              <div className="absolute bottom-3 left-3 right-3 p-3 bg-black/90 backdrop-blur-xs border-2 border-[#E6FF00] text-white flex items-center justify-between">
                <div>
                  <span className="font-mono text-[9px] text-[#E6FF00] uppercase font-bold block">
                    PIÈCE PORTÉE :
                  </span>
                  <span className="font-display text-sm uppercase text-white block">
                    {item.productName}
                  </span>
                  <span className="font-mono text-xs text-[#8A8A8A]">
                    {item.price}
                  </span>
                </div>
                <Link
                  href={`/produit/${item.productSlug}`}
                  className="p-2 bg-[#E6FF00] text-black border border-black hover:bg-white transition-colors cursor-pointer"
                  aria-label={`Voir ${item.productName}`}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Caption */}
            <div className="p-3 bg-white flex items-center justify-between">
              <span className="font-display text-base uppercase text-black">
                {item.title}
              </span>
              <span className="font-mono text-xs text-[#8A8A8A]">
                SS26 DROP
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
