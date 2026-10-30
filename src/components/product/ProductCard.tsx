"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Plus, Check, Star } from "lucide-react";
import { Product } from "@/types";
import { useCurrency } from "@/context/CurrencyContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { Badge } from "@/components/common/Badge";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { formatPrice } = useCurrency();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addItem } = useCart();
  const { showToast } = useToast();

  const [isHovered, setIsHovered] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const isFavorite = isInWishlist(product.id);
  const isSoldOut = product.sizes.every((s) => s.stock === 0);
  const totalStock = product.sizes.reduce((acc, s) => acc + s.stock, 0);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    showToast(
      isFavorite ? "Retiré des favoris" : "Ajouté à votre liste de favoris !",
      isFavorite ? "info" : "success"
    );
  };

  const handleQuickAdd = (e: React.MouseEvent, size: string) => {
    e.preventDefault();
    e.stopPropagation();
    const sizeObj = product.sizes.find((s) => s.size === size);
    if (!sizeObj || sizeObj.stock === 0) return;

    addItem(product, size, product.colors[0], 1);
    showToast(`${product.name} (Taille ${size}) ajouté au panier !`, "success");
    setShowQuickAdd(false);
  };

  return (
    <div
      className="group relative flex flex-col bg-white border-3 border-black brutal-shadow brutal-card-hover transition-all duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowQuickAdd(false);
      }}
    >
      {/* Image Container with 4:5 Aspect Ratio */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#ECE8DE] border-b-3 border-black">
        {/* Main Product Image */}
        <Link href={`/produit/${product.slug}`} className="block w-full h-full">
          <Image
            src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            priority={priority}
          />
        </Link>

        {/* Sticker Badges (Top Left) */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {isSoldOut ? (
            <Badge variant="black" rotate>
              SOLD OUT
            </Badge>
          ) : (
            <>
              {product.badges?.map((badge, idx) => (
                <Badge
                  key={idx}
                  variant={
                    badge.includes("LIMITÉ")
                      ? "orange"
                      : badge.includes("FAIBLE")
                      ? "orange"
                      : "neon"
                  }
                  rotate={idx % 2 === 0}
                >
                  {badge}
                </Badge>
              ))}
              {totalStock > 0 && totalStock <= 5 && (
                <Badge variant="orange">
                  PLUS QUE {totalStock} PIÈCES
                </Badge>
              )}
            </>
          )}
        </div>

        {/* Wishlist Heart Button (Top Right) */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-2.5 right-2.5 z-20 p-2 border-2 border-black brutal-shadow-sm transition-transform active:scale-90 cursor-pointer ${
            isFavorite ? "bg-[#FF4D00] text-white" : "bg-white text-black hover:bg-[#E6FF00]"
          }`}
          aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
        </button>

        {/* Quick Add Overlay on Hover / Click */}
        {!isSoldOut && (
          <div className="absolute inset-x-0 bottom-0 p-2 z-20 transition-all duration-200">
            {showQuickAdd ? (
              <div className="bg-black/95 p-2 border-2 border-[#E6FF00] brutal-shadow animate-in fade-in duration-150">
                <div className="flex items-center justify-between mb-1.5 px-1">
                  <span className="font-mono text-[10px] font-bold text-[#E6FF00] uppercase">
                    CHOISIR LA TAILLE :
                  </span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setShowQuickAdd(false);
                    }}
                    className="text-white hover:text-[#E6FF00] font-mono text-[10px]"
                  >
                    FERMER
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-1">
                  {product.sizes.map((s) => {
                    const available = s.stock > 0;
                    return (
                      <button
                        key={s.size}
                        disabled={!available}
                        onClick={(e) => handleQuickAdd(e, s.size)}
                        className={`py-1 text-center font-mono text-xs font-bold border ${
                          available
                            ? "bg-white text-black hover:bg-[#E6FF00] border-black cursor-pointer"
                            : "bg-neutral-800 text-neutral-500 border-neutral-700 line-through cursor-not-allowed"
                        }`}
                        title={available ? `${s.stock} en stock` : "Épuisé"}
                      >
                        {s.size}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowQuickAdd(true);
                }}
                className="w-full py-2 bg-white/95 hover:bg-[#E6FF00] text-black font-display text-sm tracking-wider uppercase border-2 border-black brutal-shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-1.5 opacity-90 group-hover:opacity-100"
              >
                <Plus className="w-4 h-4" />
                <span>AJOUT RAPIDE</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Card Body Info */}
      <div className="p-3.5 flex flex-col flex-1 justify-between gap-2">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs font-mono text-[#8A8A8A] mb-1">
            <span className="uppercase tracking-wider font-semibold">
              {product.categoryLabel}
            </span>
            <div className="flex items-center gap-1 text-black font-bold">
              <Star className="w-3.5 h-3.5 fill-[#E6FF00] stroke-black" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-[#8A8A8A] text-[10px]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <Link href={`/produit/${product.slug}`} className="block group-hover:text-[#FF4D00] transition-colors">
            <h3 className="font-display text-base sm:text-lg leading-tight uppercase line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Fabric Weight Tag */}
          <p className="font-mono text-[11px] text-[#555] mt-0.5 line-clamp-1">
            {product.details.weight} • {product.details.fit.split(",")[0]}
          </p>
        </div>

        {/* Price & Colors */}
        <div className="pt-2 border-t-2 border-black/10 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-sm sm:text-base font-bold text-black">
              {formatPrice(product.priceXOF, product.priceEUR)}
            </span>
            {product.originalPriceXOF && (
              <span className="font-mono text-xs text-[#8A8A8A] line-through">
                {formatPrice(product.originalPriceXOF, product.originalPriceEUR!)}
              </span>
            )}
          </div>

          {/* Color Swatches */}
          <div className="flex items-center gap-1" title={`${product.colors.length} coloris`}>
            {product.colors.map((c, i) => (
              <span
                key={i}
                className="w-3 h-3 border border-black inline-block"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
