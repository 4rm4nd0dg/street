"use client";

import React from "react";
import { Star, ShieldCheck, Quote } from "lucide-react";

export function CustomerReviews() {
  const reviews = [
    {
      author: "Malik D.",
      city: "Abidjan, Cocody",
      piece: "RAW SEAM HOODIE 460 GSM",
      rating: 5,
      date: "Il y a 2 jours",
      fit: "Taille grand (effet boxy parfait)",
      content:
        "J'attendais un drop de cette qualité en Afrique depuis des années. Le coton 460 GSM est extrêmement lourd, la capuche a une tenue incroyable et ne s'affaisse jamais. Foncez les yeux fermés.",
    },
    {
      author: "Julien V.",
      city: "Paris 10e",
      piece: "MODULAR 8-POCKET CARGO",
      rating: 5,
      date: "Il y a 5 jours",
      fit: "Fidèle à la taille",
      content:
        "Les détails des sangles et du ripstop sont au niveau des meilleures marques techwear japonaises. Reçu en 48h à Paris. L'emballage façon sac d'archive sous vide est fou.",
    },
    {
      author: "Aïcha S.",
      city: "Dakar, Almadies",
      piece: "HEAVYWEIGHT BOX TEE",
      rating: 5,
      date: "Il y a 1 semaine",
      fit: "Taille grand (oversize)",
      content:
        "Le col 3 cm ne bouge pas d'un millimètre au lavage. Le tissu tombe droit sans mouler, c'est exactement la coupe streetwear recherchée. Paiement par Wave ultra fluide.",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-white border-b-3 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#FF4D00] uppercase tracking-widest mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>AVIS CLIENTS VÉRIFIÉS DU CREW // NOTE MOYENNE 4.9/5</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl uppercase tracking-tight text-black leading-none">
              CE QU&apos;ILS DISENT DE LA MATIÈRE
            </h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs font-bold bg-[#E6FF00] px-3 py-2 border-2 border-black brutal-shadow-sm">
            <span className="text-black">+450 COMMANDES LIVRÉES CE MOIS</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-6 bg-[#F5F2EA] border-3 border-black brutal-shadow flex flex-col justify-between gap-4"
            >
              <div className="space-y-3">
                {/* Stars & Fit tag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#0A0A0A] stroke-black" />
                    ))}
                  </div>
                  <span className="font-mono text-[10px] font-bold bg-white px-2 py-0.5 border border-black">
                    {rev.date}
                  </span>
                </div>

                {/* Piece bought */}
                <div className="font-mono text-xs font-bold text-[#FF4D00] uppercase">
                  Acheté : {rev.piece}
                </div>

                {/* Comment */}
                <p className="font-body text-sm text-[#222] leading-relaxed">
                  &ldquo;{rev.content}&rdquo;
                </p>
              </div>

              {/* Author & Fit Feedback */}
              <div className="pt-4 border-t-2 border-black/10 flex items-center justify-between font-mono text-xs">
                <div>
                  <span className="font-bold text-black block">{rev.author}</span>
                  <span className="text-[#8A8A8A] text-[11px]">{rev.city}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#666] block">Avis coupe :</span>
                  <span className="font-bold text-[11px] text-black bg-[#E6FF00] px-1.5 py-0.5 border border-black">
                    {rev.fit}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
