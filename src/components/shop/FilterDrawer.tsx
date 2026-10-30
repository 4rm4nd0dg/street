"use client";

import React from "react";
import { X, SlidersHorizontal, Check } from "lucide-react";
import { CATEGORIES } from "@/data/products";
import { useCurrency } from "@/context/CurrencyContext";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedSizes: string[];
  onToggleSize: (size: string) => void;
  inStockOnly: boolean;
  onToggleInStock: () => void;
  sortBy: string;
  onChangeSortBy: (sort: string) => void;
  onResetFilters: () => void;
  totalFilteredCount: number;
}

export function FilterDrawer({
  isOpen,
  onClose,
  selectedCategory,
  onSelectCategory,
  selectedSizes,
  onToggleSize,
  inStockOnly,
  onToggleInStock,
  sortBy,
  onChangeSortBy,
  onResetFilters,
  totalFilteredCount,
}: FilterDrawerProps) {
  const { currency } = useCurrency();
  const allSizes = ["S", "M", "L", "XL", "XXL", "TU"];

  const sortOptions = [
    { value: "featured", label: "Sélection Studio (Par défaut)" },
    { value: "newest", label: "Nouveautés récentes" },
    { value: "price-asc", label: "Prix croissant" },
    { value: "price-desc", label: "Prix décroissant" },
    { value: "rating", label: "Meilleures notes clients" },
  ];

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="filter-drawer-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F5F2EA] border-l-4 border-black flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-200">
          
          {/* Header */}
          <div className="p-4 sm:p-5 bg-white border-b-3 border-black flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-black" />
              <h2 id="filter-drawer-title" className="font-display text-2xl tracking-wide uppercase">
                FILTRER LE DROP
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 border-2 border-black hover:bg-[#E6FF00] transition-colors cursor-pointer"
              aria-label="Fermer les filtres"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filter Body Scrollable */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            
            {/* Sort Section */}
            <div className="space-y-2">
              <label className="block font-mono text-xs font-bold uppercase tracking-wider text-black">
                TRIER PAR :
              </label>
              <div className="space-y-1">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => onChangeSortBy(opt.value)}
                    className={`w-full flex items-center justify-between p-2.5 font-mono text-xs font-bold border-2 transition-all cursor-pointer ${
                      sortBy === opt.value
                        ? "bg-black text-[#E6FF00] border-black brutal-shadow-sm"
                        : "bg-white text-black border-black/40 hover:border-black hover:bg-neutral-100"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {sortBy === opt.value && <Check className="w-4 h-4 text-[#E6FF00]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-2 pt-2 border-t-2 border-black/10">
              <label className="block font-mono text-xs font-bold uppercase tracking-wider text-black">
                CATÉGORIES :
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => onSelectCategory(cat.id)}
                      className={`p-2 text-left font-mono text-xs font-bold border-2 transition-all cursor-pointer ${
                        isSelected
                          ? "bg-black text-[#E6FF00] border-black brutal-shadow-sm"
                          : "bg-white text-black border-black/40 hover:border-black"
                      }`}
                    >
                      <span className="block truncate">{cat.label}</span>
                      <span className="text-[10px] text-neutral-400">({cat.count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sizes */}
            <div className="space-y-2 pt-2 border-t-2 border-black/10">
              <label className="block font-mono text-xs font-bold uppercase tracking-wider text-black">
                TAILLES DISPONIBLES :
              </label>
              <div className="grid grid-cols-6 gap-2">
                {allSizes.map((sz) => {
                  const isSelected = selectedSizes.includes(sz);
                  return (
                    <button
                      key={sz}
                      onClick={() => onToggleSize(sz)}
                      className={`py-2 text-center font-mono text-xs font-bold border-2 transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#E6FF00] text-black border-black brutal-shadow-sm font-black"
                          : "bg-white text-black border-black hover:bg-neutral-100"
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* In stock toggle */}
            <div className="pt-2 border-t-2 border-black/10">
              <label className="flex items-center gap-3 p-3 bg-white border-2 border-black cursor-pointer brutal-shadow-sm">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={onToggleInStock}
                  className="w-5 h-5 accent-black cursor-pointer"
                />
                <span className="font-mono text-xs font-bold uppercase">
                  UNIQUEMENT LES PIÈCES EN STOCK
                </span>
              </label>
            </div>
          </div>

          {/* Footer Controls */}
          <div className="p-4 sm:p-5 bg-white border-t-3 border-black flex gap-2">
            <button
              onClick={onResetFilters}
              className="flex-1 py-3 bg-neutral-200 border-2 border-black font-mono text-xs font-bold uppercase hover:bg-neutral-300 transition-colors cursor-pointer"
            >
              RÉINITIALISER
            </button>
            <button
              onClick={onClose}
              className="flex-1 brutal-btn brutal-btn-primary py-3 text-center text-sm font-bold"
            >
              VOIR ({totalFilteredCount})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
