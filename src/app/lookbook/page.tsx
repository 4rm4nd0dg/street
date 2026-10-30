"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ArrowUpRight, Flame, MapPin } from "lucide-react";

export default function LookbookPage() {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const looks = [
    {
      id: "01",
      title: "LOOK 01 // OVERSIZED ASYMMETRY",
      location: "ABIDJAN, TREICHVILLE",
      category: "hoodies",
      image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=1200&auto=format&fit=crop&q=80",
      featuredItem: "RAW SEAM HOODIE 460 GSM",
      slug: "raw-seam-hoodie-460-gsm",
      price: "49 000 FCFA / 75 €",
    },
    {
      id: "02",
      title: "LOOK 02 // TACTICAL ARCHIVE",
      location: "PARIS, CANAL SAINT-MARTIN",
      category: "cargos",
      image: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=1200&auto=format&fit=crop&q=80",
      featuredItem: "MODULAR 8-POCKET CARGO PANT",
      slug: "modular-8-pocket-cargo-pant",
      price: "45 000 FCFA / 69 €",
    },
    {
      id: "03",
      title: "LOOK 03 // BÉTON MINÉRAL",
      location: "ABIDJAN, COCODY CITÉ DES CADRES",
      category: "t-shirts",
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1200&auto=format&fit=crop&q=80",
      featuredItem: "HEAVYWEIGHT BOX TEE — BÉTON",
      slug: "heavyweight-box-tee-beton",
      price: "24 500 FCFA / 38 €",
    },
    {
      id: "04",
      title: "LOOK 04 // WEATHER SHIELD",
      location: "TOKYO, SHIBUYA DISTRICT",
      category: "vestes",
      image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=1200&auto=format&fit=crop&q=80",
      featuredItem: "WINDBLOCKER BRUTAL ANORAK",
      slug: "windblocker-brutal-anorak",
      price: "59 000 FCFA / 90 €",
    },
    {
      id: "05",
      title: "LOOK 05 // RAW JAPANESE DENIM",
      location: "DAKAR, ANSE BERNARD",
      category: "vestes",
      image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=1200&auto=format&fit=crop&q=80",
      featuredItem: "RAW DENIM OVERSIZED SHIRT",
      slug: "distressed-denim-overshirt",
      price: "52 000 FCFA / 80 €",
    },
    {
      id: "06",
      title: "LOOK 06 // CYBER CADASTRE",
      location: "ABIDJAN, PLATEAU BUSINESS CENTER",
      category: "t-shirts",
      image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1200&auto=format&fit=crop&q=80",
      featuredItem: "CYBER DISTRICT OVERSIZED TEE",
      slug: "cyber-district-oversized-tee",
      price: "26 000 FCFA / 40 €",
    },
  ];

  const filteredLooks =
    selectedFilter === "all"
      ? looks
      : looks.filter((l) => l.category === selectedFilter);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F2EA] text-[#0A0A0A]">
      <Header />

      <main className="flex-1">
        {/* Editorial Top Title */}
        <section className="bg-[#0A0A0A] text-white border-b-3 border-black py-16 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#E6FF00] uppercase tracking-widest">
                <Flame className="w-4 h-4 fill-[#E6FF00]" />
                <span>OFFICIAL CAMPAIGN // SS26 ARCHIVE</span>
              </div>
              <h1 className="font-display text-5xl sm:text-7xl uppercase tracking-tight leading-none">
                LOOKBOOK &quot;NÉON BÉTON&quot;
              </h1>
              <p className="font-body text-xs sm:text-sm text-[#8A8A8A] max-w-xl">
                Photographies argentiques et numériques prises sur le vif entre Abidjan, Paris et Tokyo. Coupes boxy, textures brutes et lumière du couchant.
              </p>
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all", label: "TOUS LES LOOKS" },
                { id: "hoodies", label: "HOODIES" },
                { id: "cargos", label: "CARGOS" },
                { id: "t-shirts", label: "T-SHIRTS" },
                { id: "vestes", label: "VESTES" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFilter(f.id)}
                  className={`px-3 py-1.5 font-mono text-xs font-bold uppercase border-2 transition-all cursor-pointer ${
                    selectedFilter === f.id
                      ? "bg-[#E6FF00] text-black border-black brutal-shadow-sm font-black"
                      : "bg-[#141414] text-white border-white/30 hover:border-white"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Editorial Grid Gallery */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {filteredLooks.map((look) => (
              <div
                key={look.id}
                className="bg-white border-4 border-black brutal-shadow-lg flex flex-col group"
              >
                {/* Image Container (4:5) */}
                <div className="relative aspect-[4/5] w-full bg-neutral-900 border-b-3 border-black overflow-hidden">
                  <Image
                    src={look.image}
                    alt={look.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 600px"
                    className="object-cover group-hover:scale-103 transition-transform duration-500"
                  />

                  {/* Location badge */}
                  <div className="absolute top-4 left-4 bg-black/90 text-white font-mono text-xs font-bold px-3 py-1 border border-white/20 uppercase flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#E6FF00]" />
                    <span>{look.location}</span>
                  </div>

                  {/* Tagged Product Box */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 bg-black/95 backdrop-blur-xs border-2 border-[#E6FF00] text-white flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[10px] text-[#E6FF00] font-bold uppercase block">
                        PIÈCE FEATURED :
                      </span>
                      <h4 className="font-display text-base uppercase text-white leading-tight">
                        {look.featuredItem}
                      </h4>
                      <span className="font-mono text-xs text-[#8A8A8A]">
                        {look.price}
                      </span>
                    </div>

                    <Link
                      href={`/produit/${look.slug}`}
                      className="p-3 bg-[#E6FF00] text-black border border-black hover:bg-white transition-colors cursor-pointer"
                      aria-label={`Acheter ${look.featuredItem}`}
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>

                {/* Footer caption */}
                <div className="p-4 bg-white flex items-center justify-between font-mono text-xs">
                  <span className="font-display text-lg uppercase text-black">
                    {look.title}
                  </span>
                  <span className="font-bold text-[#FF4D00]">
                    TIRAGE ARCHIVE SS26
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/boutique"
              className="brutal-btn brutal-btn-primary py-4 px-10 text-lg uppercase"
            >
              SHOPPER LES PIÈCES DU LOOKBOOK
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
