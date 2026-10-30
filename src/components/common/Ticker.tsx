import React from "react";

interface TickerProps {
  items?: string[];
  speed?: "normal" | "slow" | "fast";
  variant?: "black" | "neon" | "orange";
}

export function Ticker({
  items = [
    "DROP #04 'NÉON BÉTON' DISPONIBLE EN ÉDITION LIMITÉE",
    "LIVRAISON OFFERTE DÈS 50 000 FCFA / 75 €",
    "HEAVYWEIGHT COTTON 300 À 480 GSM",
    "PAIEMENT MOBILE MONEY (ORANGE / MOOV / WAVE) ET CARTE BANCAIRE",
    "EXPÉDITION EXPRESS DANS TOUTE L'AFRIQUE DE L'OUEST & EUROPE",
    "AUCUN RÉASSORT APRÈS ÉPUISEMENT",
  ],
  variant = "black",
}: TickerProps) {
  const bgStyles = {
    black: "bg-[#0A0A0A] text-[#F5F2EA] border-b-2 border-black",
    neon: "bg-[#E6FF00] text-[#0A0A0A] border-b-2 border-black font-black",
    orange: "bg-[#FF4D00] text-white border-b-2 border-black",
  };

  return (
    <div
      className={`overflow-hidden py-2 border-y-2 border-black select-none ${bgStyles[variant]}`}
      role="region"
      aria-label="Annonces défilantes"
    >
      <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
        {[...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center gap-8 text-xs md:text-sm font-mono font-bold tracking-wider uppercase">
            <span>{text}</span>
            <span className="text-[#E6FF00] font-black text-base">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
