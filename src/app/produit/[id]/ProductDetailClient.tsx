"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Share2,
  Truck,
  RotateCcw,
  ChevronDown,
  Star,
  Plus,
  Minus,
} from "lucide-react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { Badge } from "@/components/common/Badge";
import { SizeSelector } from "@/components/product/SizeSelector";
import { SizeGuideModal } from "@/components/product/SizeGuideModal";
import { BackInStockModal } from "@/components/product/BackInStockModal";
import { ProductCard } from "@/components/product/ProductCard";
import { SearchModal } from "@/components/search/SearchModal";
import { PRODUCTS } from "@/data/products";
import { Product } from "@/types";
import { useCurrency } from "@/context/CurrencyContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { formatPrice } = useCurrency();
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes.find((s) => s.stock > 0)?.size || ""
  );
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isBackInStockOpen, setIsBackInStockOpen] = useState(false);
  const [outOfStockSizeForAlert, setOutOfStockSizeForAlert] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Accordion states
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    composition: true,
    fit: false,
    care: false,
    shipping: false,
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isFavorite = isInWishlist(product.id);
  const isSoldOut = product.sizes.every((s) => s.stock === 0);

  const handleAddToCart = () => {
    if (!selectedSize) {
      showToast("Veuillez sélectionner une taille avant d'ajouter au panier.", "error");
      return;
    }
    const sizeObj = product.sizes.find((s) => s.size === selectedSize);
    if (!sizeObj || sizeObj.stock === 0) {
      showToast("Cette taille est épuisée. Enregistrez une alerte de retour !", "error");
      return;
    }

    addItem(product, selectedSize, selectedColor, quantity);
    showToast(
      `${product.name} (Taille ${selectedSize}) ajouté au panier !`,
      "success"
    );
  };

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast("Lien du produit copié dans le presse-papier !", "success");
    }
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F2EA] text-[#0A0A0A]">
      <Header onOpenSearch={() => setIsSearchOpen(true)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="font-mono text-xs uppercase mb-6 text-[#8A8A8A] flex items-center gap-2">
          <Link href="/" className="hover:text-black">
            ACCUEIL
          </Link>
          <span>/</span>
          <Link href={`/boutique?cat=${product.category}`} className="hover:text-black">
            {product.categoryLabel}
          </Link>
          <span>/</span>
          <span className="text-black font-bold">{product.name}</span>
        </nav>

        {/* Product Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT: Image Gallery (4:5) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Featured Image */}
            <div className="relative aspect-[4/5] w-full bg-white border-4 border-black brutal-shadow-lg overflow-hidden group">
              <Image
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 650px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Badges on image */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10 pointer-events-none">
                {product.badges.map((b, i) => (
                  <Badge key={i} variant={b.includes("LIMITÉ") ? "orange" : "neon"} rotate={i === 0}>
                    {b}
                  </Badge>
                ))}
                {product.dropNumber && (
                  <Badge variant="black">
                    {product.dropNumber}
                  </Badge>
                )}
              </div>

              {/* Floating Share button */}
              <button
                onClick={handleShare}
                className="absolute top-4 right-4 p-2.5 bg-white border-2 border-black brutal-shadow-sm hover:bg-[#E6FF00] transition-colors cursor-pointer"
                title="Partager ce produit"
                aria-label="Partager ce produit"
              >
                <Share2 className="w-5 h-5 text-black" />
              </button>
            </div>

            {/* Thumbnails list */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-[4/5] bg-white border-3 transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? "border-[#FF4D00] brutal-shadow-sm scale-102"
                        : "border-black/60 hover:border-black opacity-75 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} vue ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="120px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Details & Purchase Form */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold uppercase text-[#FF4D00] tracking-widest">
                  // {product.categoryLabel} • {product.details.weight}
                </span>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 font-mono text-xs font-bold">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.round(product.rating)
                            ? "fill-[#E6FF00] stroke-black"
                            : "fill-neutral-200 stroke-neutral-400"
                        }`}
                      />
                    ))}
                  </div>
                  <span>{product.rating.toFixed(1)}</span>
                  <span className="text-[#8A8A8A]">({product.reviewsCount})</span>
                </div>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl uppercase tracking-tight leading-none text-black">
                {product.name}
              </h1>

              {/* Price display */}
              <div className="mt-4 flex items-baseline gap-3 pb-4 border-b-2 border-black/20">
                <span className="font-mono text-3xl font-black text-black">
                  {formatPrice(product.priceXOF, product.priceEUR)}
                </span>
                {product.originalPriceXOF && (
                  <span className="font-mono text-lg text-[#8A8A8A] line-through">
                    {formatPrice(product.originalPriceXOF, product.originalPriceEUR!)}
                  </span>
                )}
                {product.originalPriceXOF && (
                  <span className="font-mono text-xs font-bold bg-[#FF4D00] text-white px-2 py-0.5 border border-black">
                    PROMO DROP
                  </span>
                )}
              </div>
            </div>

            {/* Short description */}
            <p className="font-body text-sm text-[#333] leading-relaxed">
              {product.description}
            </p>

            {/* Color Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono text-xs font-bold uppercase">
                <span>COLORIS :</span>
                <span className="text-black bg-white px-2 py-0.5 border border-black">
                  {selectedColor.name}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`flex items-center gap-2 p-1.5 border-2 transition-all cursor-pointer ${
                      selectedColor.name === c.name
                        ? "border-black bg-white brutal-shadow-sm"
                        : "border-black/30 hover:border-black bg-white"
                    }`}
                  >
                    <span
                      className="w-5 h-5 border border-black inline-block"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="font-mono text-xs font-bold pr-1">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector with out-of-stock alert */}
            <SizeSelector
              sizes={product.sizes}
              selectedSize={selectedSize}
              onSelectSize={(sz) => setSelectedSize(sz)}
              onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
              onOpenBackInStock={(sz) => {
                setOutOfStockSizeForAlert(sz);
                setIsBackInStockOpen(true);
              }}
            />

            {/* Quantity and Add to Cart Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                {/* Quantity */}
                <div className="flex items-center border-3 border-black bg-white brutal-shadow-sm">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="p-3 hover:bg-[#E6FF00] transition-colors disabled:opacity-40 cursor-pointer"
                    aria-label="Diminuer la quantité"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 font-mono font-black text-base">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-3 hover:bg-[#E6FF00] transition-colors cursor-pointer"
                    aria-label="Augmenter la quantité"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart CTA */}
                <button
                  onClick={handleAddToCart}
                  disabled={isSoldOut}
                  className="flex-1 brutal-btn brutal-btn-primary text-base sm:text-lg font-black tracking-wider py-4 justify-center"
                >
                  {isSoldOut ? "SOLD OUT" : "AJOUTER AU PANIER"}
                </button>

                {/* Wishlist Heart button */}
                <button
                  onClick={() => {
                    toggleWishlist(product.id);
                    showToast(
                      isFavorite ? "Retiré des favoris" : "Ajouté aux favoris !",
                      isFavorite ? "info" : "success"
                    );
                  }}
                  className={`p-4 border-3 border-black brutal-shadow-sm transition-colors cursor-pointer ${
                    isFavorite
                      ? "bg-[#FF4D00] text-white"
                      : "bg-white text-black hover:bg-[#E6FF00]"
                  }`}
                  aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                >
                  <Heart className={`w-6 h-6 ${isFavorite ? "fill-current" : ""}`} />
                </button>
              </div>

              {/* Guarantees small bar */}
              <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-mono text-[#666]">
                <div className="flex items-center gap-1.5 p-2 bg-white border border-black/30">
                  <Truck className="w-4 h-4 text-black" />
                  <span>Livraison 48h CI &amp; Europe</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 bg-white border border-black/30">
                  <RotateCcw className="w-4 h-4 text-black" />
                  <span>Échanges sous 14 jours</span>
                </div>
              </div>
            </div>

            {/* Accordions */}
            <div className="divide-y-2 divide-black border-y-3 border-black bg-white mt-6">
              
              {/* Accordion 1: Composition & Matière */}
              <div>
                <button
                  onClick={() => toggleAccordion("composition")}
                  className="w-full py-3.5 px-4 flex items-center justify-between font-mono text-xs font-black uppercase text-left hover:bg-[#E6FF00]/20 cursor-pointer"
                >
                  <span>// MATIÈRE &amp; COMPOSITION</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openAccordions.composition ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordions.composition && (
                  <div className="p-4 pt-0 font-body text-xs text-[#444] space-y-2 border-t border-black/10">
                    <p>
                      <strong>Composition :</strong> {product.details.composition}
                    </p>
                    <p>
                      <strong>Grammage du tissu :</strong> {product.details.weight}
                    </p>
                    <p>
                      <strong>Atelier &amp; Confection :</strong> {product.details.origin}
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 2: Coupe & Fit */}
              <div>
                <button
                  onClick={() => toggleAccordion("fit")}
                  className="w-full py-3.5 px-4 flex items-center justify-between font-mono text-xs font-black uppercase text-left hover:bg-[#E6FF00]/20 cursor-pointer"
                >
                  <span>// COUPE &amp; MENSURATIONS</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openAccordions.fit ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordions.fit && (
                  <div className="p-4 pt-0 font-body text-xs text-[#444] space-y-2 border-t border-black/10">
                    <p>
                      <strong>Silhouette :</strong> {product.details.fit}
                    </p>
                    <p className="text-neutral-600">
                      Le mannequin mesure 1m84, pèse 78 kg et porte une taille <strong>L</strong> pour un effet boxy ample.
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Entretien */}
              <div>
                <button
                  onClick={() => toggleAccordion("care")}
                  className="w-full py-3.5 px-4 flex items-center justify-between font-mono text-xs font-black uppercase text-left hover:bg-[#E6FF00]/20 cursor-pointer"
                >
                  <span>// CONSEILS D&apos;ENTRETIEN</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openAccordions.care ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordions.care && (
                  <div className="p-4 pt-0 font-body text-xs text-[#444] space-y-2 border-t border-black/10">
                    <p>{product.details.care}</p>
                    <p className="text-neutral-500 text-[11px]">
                      Pour préserver la densité de la fibre lourde et la tenue du col, évitez le sèche-linge et préférez un séchage à plat sur cintre large.
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 4: Livraison & Retours */}
              <div>
                <button
                  onClick={() => toggleAccordion("shipping")}
                  className="w-full py-3.5 px-4 flex items-center justify-between font-mono text-xs font-black uppercase text-left hover:bg-[#E6FF00]/20 cursor-pointer"
                >
                  <span>// LIVRAISON EXPRESS &amp; RETOURS</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openAccordions.shipping ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordions.shipping && (
                  <div className="p-4 pt-0 font-body text-xs text-[#444] space-y-2 border-t border-black/10">
                    <p>
                      <strong>Abidjan &amp; Dakar :</strong> Livraison en 24h à 48h ouvrées. Frais : 2 500 FCFA (offert dès 50 000 FCFA d&apos;achat).
                    </p>
                    <p>
                      <strong>France &amp; Union Européenne :</strong> 3 à 5 jours via Colissimo International / DHL. Frais : 4,90 € (offert dès 75 €).
                    </p>
                    <p>
                      <strong>Retours :</strong> 14 jours pour essayer chez vous. Échange de taille gratuit.
                    </p>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>

        {/* REVIEWS SECTION */}
        <section className="mt-16 pt-12 border-t-3 border-black">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="font-mono text-xs font-bold text-[#FF4D00] uppercase tracking-widest block mb-1">
                // AVIS DU CREW SUR CET ARTICLE
              </span>
              <h2 className="font-display text-3xl sm:text-4xl uppercase">
                ÉVALUATIONS CLIENTS ({product.reviewsCount})
              </h2>
            </div>
            <div className="flex items-center gap-3 bg-white p-3 border-2 border-black brutal-shadow-sm font-mono text-xs">
              <span className="font-bold text-2xl text-black">{product.rating.toFixed(1)}/5</span>
              <div className="text-neutral-500">
                <span>Basé sur {product.reviewsCount} avis vérifiés</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-5 bg-white border-2 border-black brutal-shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#0A0A0A] stroke-black" />
                      ))}
                    </div>
                    <span className="font-mono text-xs text-[#8A8A8A]">{rev.date}</span>
                  </div>
                  <p className="font-body text-xs sm:text-sm text-[#222] leading-relaxed">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                  <div className="pt-2 border-t border-black/10 flex items-center justify-between font-mono text-xs">
                    <div>
                      <span className="font-bold text-black">{rev.author}</span>
                      <span className="text-[#8A8A8A] ml-2">({rev.city})</span>
                    </div>
                    <span className="bg-[#E6FF00] px-1.5 py-0.5 border border-black text-[10px] font-bold">
                      {rev.fitFeedback}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 bg-white border-2 border-black font-mono text-xs text-[#666]">
                Premier tirage de cette référence. Laissez votre avis après réception de votre commande !
              </div>
            )}
          </div>
        </section>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 pt-12 border-t-3 border-black">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="font-mono text-xs font-bold text-[#FF4D00] uppercase tracking-widest block mb-1">
                  // COMPLÉTEZ LE LOOK
                </span>
                <h2 className="font-display text-3xl sm:text-4xl uppercase">
                  PIÈCES ASSOCIÉES
                </h2>
              </div>
              <Link
                href="/boutique"
                className="font-mono text-xs font-bold underline uppercase hover:text-[#FF4D00]"
              >
                TOUT LE DROP
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* Sticky Mobile Purchase Bar */}
        <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t-3 border-black p-3 flex items-center justify-between gap-3 brutal-shadow">
          <div>
            <span className="font-mono text-xs font-bold text-black block">
              {formatPrice(product.priceXOF, product.priceEUR)}
            </span>
            <span className="font-mono text-[10px] text-[#8A8A8A] uppercase">
              Taille: {selectedSize || "Choisir"}
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={isSoldOut}
            className="flex-1 brutal-btn brutal-btn-primary py-2.5 text-sm uppercase font-bold"
          >
            {isSoldOut ? "SOLD OUT" : "AJOUTER AU PANIER"}
          </button>
        </div>

        {/* Modals */}
        <SizeGuideModal
          isOpen={isSizeGuideOpen}
          onClose={() => setIsSizeGuideOpen(false)}
          category={product.category}
        />

        <BackInStockModal
          isOpen={isBackInStockOpen}
          onClose={() => setIsBackInStockOpen(false)}
          product={product}
          size={outOfStockSizeForAlert}
        />
      </main>

      <Footer />
    </div>
  );
}
