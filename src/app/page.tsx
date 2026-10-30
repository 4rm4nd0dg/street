"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowDownRight, Flame, Shield, Sparkles, Layers, Box } from "lucide-react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { Countdown } from "@/components/home/Countdown";
import { LookbookSlider } from "@/components/home/LookbookSlider";
import { CustomerReviews } from "@/components/home/CustomerReviews";
import { SearchModal } from "@/components/search/SearchModal";
import { PRODUCTS, CATEGORIES } from "@/data/products";
import { Badge } from "@/components/common/Badge";

export default function HomePage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  const featuredProducts = PRODUCTS.slice(0, 8);

  const displayedProducts =
    activeCategory === "all"
      ? featuredProducts
      : PRODUCTS.filter((p) => p.category === activeCategory).slice(0, 8);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F2EA] text-[#0A0A0A]">
      <Header onOpenSearch={() => setIsSearchOpen(true)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative border-b-3 border-black overflow-hidden bg-[#ECE8DE]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Giant Headlines & CTAs */}
              <div className="lg:col-span-7 space-y-6 z-10">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="orange" rotate>
                    EDITION LIMITÉE
                  </Badge>
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#555]">
                    ABIDJAN // PARIS // TOKYO
                  </span>
                </div>

                <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tight leading-[0.88] text-black">
                  L&apos;ASPHALTE <br />
                  <span className="bg-[#E6FF00] px-2 py-0.5 border-3 border-black brutal-shadow inline-block">
                    NE MENT
                  </span>{" "}
                  PAS.
                </h1>

                <p className="font-body text-base sm:text-lg text-[#333] max-w-xl leading-relaxed">
                  Streetwear brut conçu pour durer. French Terry ultra lourd <strong>460 GSM</strong>, cotons peignés <strong>300 GSM</strong> et coupes boxy sans compromis. 150 pièces par modèle, aucun réassort.
                </p>

                {/* Dual CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                  <Link
                    href="/boutique"
                    className="brutal-btn brutal-btn-primary text-center flex items-center justify-center gap-2 text-lg py-4 px-8"
                  >
                    <span>DÉCOUVRIR LE DROP #04</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>

                  <Link
                    href="/lookbook"
                    className="brutal-btn brutal-btn-secondary text-center flex items-center justify-center gap-2 text-lg py-4 px-8"
                  >
                    <span>LOOKBOOK SS26</span>
                    <ArrowDownRight className="w-5 h-5" />
                  </Link>
                </div>

                {/* Metrics Badges */}
                <div className="pt-6 grid grid-cols-3 gap-3 border-t-2 border-black/20 max-w-lg font-mono text-xs">
                  <div>
                    <span className="block font-black text-xl text-black">300-480</span>
                    <span className="text-[#666] uppercase">GSM Heavy Cotton</span>
                  </div>
                  <div>
                    <span className="block font-black text-xl text-[#FF4D00]">150 PCS</span>
                    <span className="text-[#666] uppercase">Par référence</span>
                  </div>
                  <div>
                    <span className="block font-black text-xl text-black">48H</span>
                    <span className="text-[#666] uppercase">Expédition express</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Visual Brutal Collage */}
              <div className="lg:col-span-5 relative">
                <div className="relative aspect-[4/5] w-full max-w-md mx-auto bg-white border-4 border-black brutal-shadow-lg overflow-hidden group">
                  <Image
                    src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=1000&auto=format&fit=crop&q=80"
                    alt="Streetwear Lookbook Mannequin KÔRNER"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 500px"
                    className="object-cover group-hover:scale-103 transition-transform duration-500"
                  />

                  {/* Stamp Sticker */}
                  <div className="absolute top-4 right-4 bg-[#FF4D00] text-white p-3 border-2 border-black font-mono text-xs font-black rotate-6 brutal-shadow-sm uppercase text-center leading-tight">
                    DROP #04<br />HOT PICK
                  </div>

                  {/* Bottom Tag */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/90 backdrop-blur-xs text-white border-2 border-[#E6FF00] flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[10px] text-[#E6FF00] font-bold block">
                        PIÈCE FEATURED :
                      </span>
                      <span className="font-display text-sm uppercase">
                        RAW SEAM HOODIE 460 GSM
                      </span>
                    </div>
                    <Link
                      href="/produit/raw-seam-hoodie-460-gsm"
                      className="px-3 py-1 bg-[#E6FF00] text-black font-mono text-xs font-bold hover:bg-white transition-colors"
                    >
                      VOIR
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* DROP COUNTDOWN BANNER */}
        <Countdown />

        {/* CATEGORY BLOCKS BANNER */}
        <section className="py-12 bg-white border-b-3 border-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF4D00]">
                // CATÉGORIES EN GROS BLOCS
              </span>
              <Link
                href="/boutique"
                className="font-mono text-xs font-bold uppercase underline hover:text-[#FF4D00]"
              >
                TOUT LE CATALOGUE (20)
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  id: "t-shirts",
                  title: "T-SHIRTS",
                  subtitle: "300 GSM BOXY FIT",
                  color: "bg-[#F5F2EA] hover:bg-[#E6FF00]",
                  count: "5 PIÈCES",
                },
                {
                  id: "hoodies",
                  title: "HOODIES",
                  subtitle: "460 GSM HEAVYWEIGHT",
                  color: "bg-[#0A0A0A] text-white hover:bg-[#1C1C1C]",
                  count: "4 PIÈCES",
                  isDark: true,
                },
                {
                  id: "cargos",
                  title: "CARGOS",
                  subtitle: "TACTICAL RIPSTOP",
                  color: "bg-[#F5F2EA] hover:bg-[#E6FF00]",
                  count: "3 PIÈCES",
                },
                {
                  id: "vestes",
                  title: "TECHWEAR",
                  subtitle: "ANORAKS & BOMBERS",
                  color: "bg-[#E6FF00] text-black hover:bg-[#FF4D00] hover:text-white",
                  count: "3 PIÈCES",
                },
              ].map((cat) => (
                <Link
                  key={cat.id}
                  href={`/boutique?cat=${cat.id}`}
                  className={`p-5 border-3 border-black brutal-shadow brutal-card-hover flex flex-col justify-between h-36 sm:h-44 transition-colors ${cat.color}`}
                >
                  <div className="flex items-center justify-between font-mono text-[11px] font-bold">
                    <span>{cat.count}</span>
                    <ArrowDownRight className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl uppercase leading-none">
                      {cat.title}
                    </h3>
                    <p className={`font-mono text-[10px] mt-1 font-bold ${cat.isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                      {cat.subtitle}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FRESH DROP // PRODUCT SHOWCASE GRID */}
        <section className="py-16 md:py-20 bg-[#F5F2EA] border-b-3 border-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header + Filter Pills */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#FF4D00] uppercase tracking-widest mb-2">
                  <Flame className="w-4 h-4 fill-[#FF4D00]" />
                  <span>SÉLECTION ACTIVE // DROP #04</span>
                </div>
                <h2 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-black leading-none">
                  NOUVEAUTÉS DU DROP
                </h2>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "all", label: "TOUT" },
                  { id: "t-shirts", label: "T-SHIRTS" },
                  { id: "hoodies", label: "HOODIES" },
                  { id: "cargos", label: "CARGOS" },
                  { id: "vestes", label: "VESTES" },
                ].map((pill) => (
                  <button
                    key={pill.id}
                    onClick={() => setActiveCategory(pill.id)}
                    className={`px-3 py-1.5 font-mono text-xs font-bold uppercase border-2 transition-all cursor-pointer ${
                      activeCategory === pill.id
                        ? "bg-black text-[#E6FF00] border-black brutal-shadow-sm"
                        : "bg-white text-black border-black hover:bg-[#E6FF00]"
                    }`}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid (2 cols mobile, 4 desktop) */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {displayedProducts.map((product, idx) => (
                <ProductCard key={product.id} product={product} priority={idx < 4} />
              ))}
            </div>

            {/* Bottom Button */}
            <div className="mt-12 text-center">
              <Link
                href="/boutique"
                className="brutal-btn brutal-btn-primary inline-flex items-center gap-2 py-4 px-10 text-lg"
              >
                <span>VOIR TOUT LE CATALOGUE (20 PIÈCES)</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

          </div>
        </section>

        {/* LOOKBOOK SLIDER */}
        <LookbookSlider />

        {/* STREETWEAR MANIFESTO BANNER */}
        <section className="py-16 bg-[#0A0A0A] text-white border-b-3 border-black overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="font-mono text-xs font-bold text-[#E6FF00] uppercase tracking-widest block">
                  // LE MANIFESTE DU LAB
                </span>
                <h3 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase leading-tight">
                  REJETER LA FAST FASHION.<br />
                  <span className="text-[#FF4D00]">CONSTRUIRE DES BLOCS ÉTERNELLEMENT.</span>
                </h3>
                <p className="font-body text-sm text-[#8A8A8A] max-w-2xl leading-relaxed">
                  Chaque pièce KÔRNER est soumise à un cahier des charges rigoureux : mailles tricotées en densité maximale, coutures doublées au fil d&apos;escalade et lavages pigmentaires uniques. Quand un drop est écoulé, ses patrons sont archivés pour toujours.
                </p>
                <div className="pt-2">
                  <Link
                    href="/a-propos"
                    className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#E6FF00] hover:underline uppercase"
                  >
                    <span>LIRE L&apos;HISTOIRE DU LABEL</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-4 p-6 bg-[#141414] border-3 border-white/20 brutal-shadow-neon space-y-3 font-mono text-xs">
                <div className="flex items-center gap-2 text-[#E6FF00] font-bold">
                  <Box className="w-5 h-5" />
                  <span>PACKAGING SOUS-VIDE ARCHIVE</span>
                </div>
                <p className="text-[#8A8A8A] leading-relaxed">
                  Toutes les commandes sont expédiées dans un sac d&apos;archive métallisé scellé avec certificat d&apos;authenticité numéroté et planche de stickers néon exclusifs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CUSTOMER REVIEWS */}
        <CustomerReviews />

      </main>

      <Footer />
    </div>
  );
}
