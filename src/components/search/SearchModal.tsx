"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, ArrowRight, Tag } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { Product } from "@/types";
import { useCurrency } from "@/context/CurrencyContext";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const { formatPrice } = useCurrency();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase().trim();
    const filtered = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.details.weight.toLowerCase().includes(q) ||
        p.badges.some((b) => b.toLowerCase().includes(q))
    );
    setResults(filtered);
  }, [query]);

  if (!isOpen) return null;

  const quickSearches = [
    "HOODIE 460 GSM",
    "BOXY TEE",
    "CARGO RIPSTOP",
    "DROP LIMITÉ",
    "TECHWEAR",
    "SNAPBACK",
  ];

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs p-4 sm:p-6 md:p-10 flex items-start justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Recherche de produits"
    >
      <div className="w-full max-w-3xl bg-[#F5F2EA] border-4 border-black brutal-shadow-lg p-5 sm:p-6 my-8 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Search Bar Input */}
        <div className="flex items-center gap-3 border-3 border-black bg-white p-2 sm:p-3 brutal-shadow-sm">
          <Search className="w-6 h-6 text-black flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="RECHERCHER UN PRODUIT, MATIÈRE (300 GSM), COUPE..."
            className="w-full bg-transparent font-mono text-sm sm:text-base font-bold uppercase focus:outline-none placeholder:text-neutral-400"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 hover:bg-neutral-200 text-black cursor-pointer"
              aria-label="Effacer la recherche"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 bg-[#E6FF00] border-2 border-black font-mono text-xs font-bold px-3 hover:bg-black hover:text-[#E6FF00] transition-colors cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        {!query && (
          <div className="mt-5 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#8A8A8A] uppercase">
              <Tag className="w-3.5 h-3.5" />
              <span>RECHERCHES FRÉQUENTES :</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {quickSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3 py-1 bg-white border-2 border-black font-mono text-xs font-bold hover:bg-[#E6FF00] transition-colors cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {query && (
          <div className="mt-6">
            <div className="flex items-center justify-between font-mono text-xs text-[#8A8A8A] pb-2 border-b-2 border-black/20 mb-4">
              <span>{results.length} RÉSULTAT(S) POUR &quot;{query.toUpperCase()}&quot;</span>
              <Link
                href={`/boutique?q=${encodeURIComponent(query)}`}
                onClick={onClose}
                className="text-black font-bold hover:underline flex items-center gap-1"
              >
                <span>Voir tout dans la boutique</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {results.length === 0 ? (
              <div className="p-8 text-center bg-white border-2 border-black">
                <p className="font-display text-xl uppercase">AUCUN ARTICLE TROUVÉ</p>
                <p className="font-mono text-xs text-[#8A8A8A] mt-1">
                  Essayez avec un mot-clé plus générique comme &quot;tee&quot;, &quot;cargo&quot; ou &quot;hoodie&quot;.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-1">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/produit/${product.slug}`}
                    onClick={onClose}
                    className="flex gap-3 p-2 bg-white border-2 border-black brutal-shadow-sm hover:bg-[#E6FF00]/20 transition-all group"
                  >
                    <div className="relative w-16 aspect-[4/5] bg-neutral-100 border border-black flex-shrink-0 overflow-hidden">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-0.5">
                      <div>
                        <span className="font-mono text-[10px] text-[#8A8A8A] uppercase font-bold">
                          {product.categoryLabel}
                        </span>
                        <h4 className="font-display text-sm uppercase leading-tight line-clamp-1 group-hover:text-[#FF4D00]">
                          {product.name}
                        </h4>
                        <p className="font-mono text-[11px] text-[#666]">
                          {product.details.weight}
                        </p>
                      </div>
                      <div className="font-mono text-xs font-bold text-black">
                        {formatPrice(product.priceXOF, product.priceEUR)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
