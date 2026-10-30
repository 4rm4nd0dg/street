"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { FilterDrawer } from "@/components/shop/FilterDrawer";
import { SearchModal } from "@/components/search/SearchModal";
import { PRODUCTS, CATEGORIES } from "@/data/products";
import { SlidersHorizontal, ArrowUpDown, RotateCcw, Flame } from "lucide-react";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("cat") || "all";
  const initialQuery = searchParams.get("q") || "";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  const toggleSize = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedSizes([]);
    setInStockOnly(false);
    setSortBy("featured");
  };

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== "all" && product.category !== selectedCategory) {
        return false;
      }
      // Sizes filter
      if (selectedSizes.length > 0) {
        const hasMatchingSize = product.sizes.some(
          (s) => selectedSizes.includes(s.size) && s.stock > 0
        );
        if (!hasMatchingSize) return false;
      }
      // In stock only
      if (inStockOnly) {
        const isAvailable = product.sizes.some((s) => s.stock > 0);
        if (!isAvailable) return false;
      }
      // Search query filter
      if (initialQuery) {
        const q = initialQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCat = product.categoryLabel.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        if (!matchesName && !matchesCat && !matchesDesc) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.priceXOF - b.priceXOF;
      if (sortBy === "price-desc") return b.priceXOF - a.priceXOF;
      if (sortBy === "newest") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedCategory, selectedSizes, inStockOnly, sortBy, initialQuery]);

  const activeFiltersCount =
    (selectedCategory !== "all" ? 1 : 0) +
    selectedSizes.length +
    (inStockOnly ? 1 : 0);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F2EA] text-[#0A0A0A]">
      <Header onOpenSearch={() => setIsSearchOpen(true)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <main className="flex-1">
        {/* Page Banner Title */}
        <section className="bg-[#0A0A0A] text-white border-b-3 border-black py-10 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#E6FF00] uppercase tracking-widest mb-2">
                <Flame className="w-4 h-4 fill-[#E6FF00]" />
                <span>CATALOGUE COMPLET // DROP #04</span>
              </div>
              <h1 className="font-display text-4xl sm:text-6xl uppercase tracking-tight leading-none">
                TOUTES LES PIÈCES
              </h1>
            </div>
            <div className="font-mono text-xs text-[#8A8A8A]">
              <span>AFFICHAGE DE </span>
              <strong className="text-white">{filteredProducts.length}</strong>
              <span> RÉFÉRENCES STREETWEAR</span>
            </div>
          </div>
        </section>

        {/* Filter Controls Bar */}
        <section className="sticky top-28 z-30 bg-[#F5F2EA] border-b-3 border-black py-3 px-4 shadow-sm">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            
            {/* Category horizontal scroll pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none max-w-full lg:max-w-3xl">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 font-mono text-xs font-bold uppercase whitespace-nowrap border-2 transition-all cursor-pointer ${
                      isSelected
                        ? "bg-black text-[#E6FF00] border-black brutal-shadow-sm"
                        : "bg-white text-black border-black hover:bg-[#E6FF00]"
                    }`}
                  >
                    {cat.label} ({cat.count})
                  </button>
                );
              })}
            </div>

            {/* Filter Drawer Trigger & Sort */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsFilterDrawerOpen(true)}
                className="flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-black brutal-shadow-sm font-mono text-xs font-bold hover:bg-[#E6FF00] transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>FILTRES</span>
                {activeFiltersCount > 0 && (
                  <span className="bg-[#FF4D00] text-white px-1.5 py-0.2 text-[10px]">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {/* Reset filter shortcut */}
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="p-1.5 bg-white border-2 border-black hover:bg-neutral-200 text-xs font-mono font-bold"
                  title="Réinitialiser tous les filtres"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        </section>

        {/* Products Grid Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {displayedProducts.length === 0 ? (
            <div className="py-20 text-center bg-white border-3 border-black brutal-shadow max-w-lg mx-auto p-8 space-y-4">
              <h3 className="font-display text-3xl uppercase">AUCUNE PIÈCE DISPONIBLE</h3>
              <p className="font-body text-xs text-[#666]">
                Aucun produit ne correspond à vos filtres de taille ou de catégorie actuels.
              </p>
              <button
                onClick={resetFilters}
                className="brutal-btn brutal-btn-primary"
              >
                RÉINITIALISER LES FILTRES
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {displayedProducts.map((product, idx) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    priority={idx < 4}
                  />
                ))}
              </div>

              {/* Load More Button */}
              {visibleCount < filteredProducts.length && (
                <div className="mt-12 text-center">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 8)}
                    className="brutal-btn brutal-btn-secondary px-8 py-3 text-base"
                  >
                    CHARGER PLUS DE PIÈCES ({filteredProducts.length - visibleCount} RESTANTES)
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        {/* Filter Drawer */}
        <FilterDrawer
          isOpen={isFilterDrawerOpen}
          onClose={() => setIsFilterDrawerOpen(false)}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          selectedSizes={selectedSizes}
          onToggleSize={toggleSize}
          inStockOnly={inStockOnly}
          onToggleInStock={() => setInStockOnly(!inStockOnly)}
          sortBy={sortBy}
          onChangeSortBy={(sort) => setSortBy(sort)}
          onResetFilters={resetFilters}
          totalFilteredCount={filteredProducts.length}
        />
      </main>

      <Footer />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F2EA] flex items-center justify-center font-mono">CHARGEMENT DU CATALOGUE...</div>}>
      <ShopContent />
    </Suspense>
  );
}
