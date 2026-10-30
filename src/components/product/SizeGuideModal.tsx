"use client";

import React, { useState } from "react";
import { X, Ruler, CheckCircle2 } from "lucide-react";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}

export function SizeGuideModal({ isOpen, onClose, category }: SizeGuideModalProps) {
  const [unit, setUnit] = useState<"cm" | "inch">("cm");

  if (!isOpen) return null;

  const dataCm = [
    { size: "S", chest: "108-112 cm", length: "72 cm", shoulder: "54 cm", height: "165-175 cm" },
    { size: "M", chest: "114-118 cm", length: "74 cm", shoulder: "56 cm", height: "172-182 cm" },
    { size: "L", chest: "120-124 cm", length: "76 cm", shoulder: "58 cm", height: "178-188 cm" },
    { size: "XL", chest: "126-130 cm", length: "78 cm", shoulder: "60 cm", height: "185-195 cm" },
    { size: "XXL", chest: "132-136 cm", length: "80 cm", shoulder: "62 cm", height: "190+ cm" },
  ];

  const dataInch = [
    { size: "S", chest: "42.5-44 in", length: "28.3 in", shoulder: "21.2 in", height: "5'5\" - 5'9\"" },
    { size: "M", chest: "44.8-46.5 in", length: "29.1 in", shoulder: "22.0 in", height: "5'8\" - 6'0\"" },
    { size: "L", chest: "47.2-48.8 in", length: "29.9 in", shoulder: "22.8 in", height: "5'10\" - 6'2\"" },
    { size: "XL", chest: "49.6-51.2 in", length: "30.7 in", shoulder: "23.6 in", height: "6'1\" - 6'5\"" },
    { size: "XXL", chest: "52.0-53.5 in", length: "31.5 in", shoulder: "24.4 in", height: "6'3\"+" },
  ];

  const currentData = unit === "cm" ? dataCm : dataInch;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs p-4 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="size-guide-title"
    >
      <div className="w-full max-w-2xl bg-[#F5F2EA] border-4 border-black brutal-shadow-lg p-6 relative animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-3 border-black">
          <div className="flex items-center gap-2">
            <Ruler className="w-6 h-6 text-black" />
            <h3 id="size-guide-title" className="font-display text-2xl uppercase tracking-wide">
              GUIDE DES TAILLES // BOXY FIT
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 border-2 border-black bg-white hover:bg-[#E6FF00] transition-colors cursor-pointer"
            aria-label="Fermer le guide des tailles"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Unit Selector */}
        <div className="flex items-center justify-between my-4 font-mono text-xs">
          <span className="font-bold text-neutral-600 uppercase">
            COUPE : BOXY STREETWEAR (LÉGÈREMENT AMPLE)
          </span>
          <div className="flex border-2 border-black bg-white">
            <button
              onClick={() => setUnit("cm")}
              className={`px-3 py-1 font-bold ${
                unit === "cm" ? "bg-black text-[#E6FF00]" : "text-black hover:bg-neutral-100"
              }`}
            >
              CM
            </button>
            <button
              onClick={() => setUnit("inch")}
              className={`px-3 py-1 font-bold ${
                unit === "inch" ? "bg-black text-[#E6FF00]" : "text-black hover:bg-neutral-100"
              }`}
            >
              POUCES (INCH)
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border-2 border-black bg-white brutal-shadow-sm">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-[#0A0A0A] text-[#F5F2EA] uppercase border-b-2 border-black">
              <tr>
                <th className="p-2.5">TAILLE</th>
                <th className="p-2.5">POITRINE</th>
                <th className="p-2.5">LONGUEUR</th>
                <th className="p-2.5">ÉPAULES</th>
                <th className="p-2.5">STATURE REC.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/20 font-bold">
              {currentData.map((row) => (
                <tr key={row.size} className="hover:bg-[#E6FF00]/20">
                  <td className="p-2.5 font-display text-sm">{row.size}</td>
                  <td className="p-2.5">{row.chest}</td>
                  <td className="p-2.5">{row.length}</td>
                  <td className="p-2.5">{row.shoulder}</td>
                  <td className="p-2.5 text-[#666]">{row.height}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fit recommendations */}
        <div className="mt-5 p-4 bg-white border-2 border-black space-y-2 font-mono text-xs">
          <div className="flex items-center gap-2 font-bold text-black uppercase">
            <CheckCircle2 className="w-4 h-4 text-[#FF4D00]" />
            <span>CONSEIL DU STYLISTE :</span>
          </div>
          <p className="text-neutral-700 leading-relaxed">
            Nos pièces sont taillées avec une coupe boxy et des épaules déstructurées tombantes. Prenez votre taille habituelle pour l&apos;effet oversize streetwear voulu par le créateur. Si vous préférez une coupe plus ajustée près du corps, prenez une taille en dessous.
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full brutal-btn brutal-btn-primary py-2.5 text-center"
        >
          COMPRIS, RETOUR AU PRODUIT
        </button>
      </div>
    </div>
  );
}
