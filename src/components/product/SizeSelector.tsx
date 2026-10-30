"use client";

import React from "react";
import { ProductSize } from "@/types";
import { AlertCircle, Bell } from "lucide-react";

interface SizeSelectorProps {
  sizes: ProductSize[];
  selectedSize: string;
  onSelectSize: (size: string) => void;
  onOpenSizeGuide: () => void;
  onOpenBackInStock: (size: string) => void;
}

export function SizeSelector({
  sizes,
  selectedSize,
  onSelectSize,
  onOpenSizeGuide,
  onOpenBackInStock,
}: SizeSelectorProps) {
  const selectedSizeObj = sizes.find((s) => s.size === selectedSize);

  return (
    <div className="space-y-3">
      {/* Header with Label & Size Guide link */}
      <div className="flex items-center justify-between font-mono text-xs">
        <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
          <span>TAILLE :</span>
          <span className="text-black bg-[#E6FF00] px-1.5 py-0.5 border border-black">
            {selectedSize || "SÉLECTIONNER"}
          </span>
        </div>
        <button
          type="button"
          onClick={onOpenSizeGuide}
          className="text-black font-bold underline hover:text-[#FF4D00] transition-colors cursor-pointer"
        >
          GUIDE DES TAILLES (CM)
        </button>
      </div>

      {/* Size Buttons Grid */}
      <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
        {sizes.map((s) => {
          const isAvailable = s.stock > 0;
          const isSelected = selectedSize === s.size;

          return (
            <button
              key={s.size}
              type="button"
              onClick={() => {
                if (isAvailable) {
                  onSelectSize(s.size);
                } else {
                  onOpenBackInStock(s.size);
                }
              }}
              className={`relative py-3 text-center font-mono text-sm font-bold border-3 transition-all cursor-pointer ${
                isSelected
                  ? "bg-black text-[#E6FF00] border-black brutal-shadow-sm scale-102"
                  : isAvailable
                  ? "bg-white text-black border-black hover:bg-[#E6FF00] hover:translate-x-[-1px] hover:translate-y-[-1px]"
                  : "bg-neutral-200 text-neutral-400 border-neutral-400 line-through hover:bg-neutral-300"
              }`}
              title={
                isAvailable
                  ? `${s.stock} pièce(s) restante(s)`
                  : "Épuisé — Cliquez pour recevoir une alerte de retour"
              }
            >
              <span>{s.size}</span>
              {!isAvailable && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#FF4D00] text-white rounded-full flex items-center justify-center text-[9px] no-underline">
                  <Bell className="w-2.5 h-2.5" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Stock Feedback Alert */}
      {selectedSizeObj && selectedSizeObj.stock > 0 && selectedSizeObj.stock <= 4 && (
        <div className="flex items-center gap-2 p-2 bg-[#FF4D00]/10 border-2 border-[#FF4D00] text-[#0A0A0A] font-mono text-xs font-bold animate-pulse">
          <AlertCircle className="w-4 h-4 text-[#FF4D00] flex-shrink-0" />
          <span>ATTENTION : Plus que {selectedSizeObj.stock} pièce(s) disponible(s) en taille {selectedSize} !</span>
        </div>
      )}
    </div>
  );
}
