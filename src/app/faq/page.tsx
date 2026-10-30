"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({
    0: true,
    1: true,
  });

  const toggle = (idx: number) => {
    setOpenItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const faqData = [
    {
      q: "COMMENT TAILLENT LES PIÈCES KÔRNER ?",
      a: "Toutes nos pièces sont conçues avec une coupe 'boxy streetwear' intentionnelle : emmanchures descendues, torse élargi et longueur légèrement raccourcie pour ne pas tasser la silhouette. Prenez votre taille habituelle pour obtenir l'effet oversize recherché. Si vous souhaitez un tombé ajusté plus classique, prenez une taille en dessous. Consultez notre guide des tailles détaillé disponible sur chaque fiche produit.",
    },
    {
      q: "QUELS SONT LES DÉLAIS DE LIVRAISON À ABIDJAN ET DANS LE RESTE DU MONDE ?",
      a: "À Abidjan et Dakar, nos coursiers express livrent sous 24h à 48h ouvrées avec remise en main propre. Pour la France métropolitaine et l'Union Européenne, les colis sont expédiés via Colissimo International ou DHL Express avec un délai moyen de 3 à 5 jours ouvrés. Vous recevez un numéro de suivi dès le départ de votre commande de notre hub.",
    },
    {
      q: "COMMENT FONCTIONNE LE PAIEMENT PAR MOBILE MONEY (ORANGE, WAVE, MOOV) ?",
      a: "Lors du paiement à l'étape 3 du checkout, sélectionnez votre opérateur (Orange Money, Wave ou Moov Money) et saisissez votre numéro de téléphone. Dès validation du panier, vous recevez un push USSD sur votre écran pour composer votre code secret et autoriser le débit sécurisé. Le montant est prélevé instantanément sans frais supplémentaires.",
    },
    {
      q: "Y AURA-T-IL DU RÉASSORT SUR LES PIÈCES ÉPUISÉES DU DROP #04 ?",
      a: "Non. Conformément à notre charte anti-fast-fashion, chaque référence est tirée à 150 exemplaires strictement numérotés. Une fois la totalité des pièces écoulée, la production est définitivement arrêtée et le modèle rejoint nos archives. Seules des pièces issues d'échanges de taille peuvent occasionnellement réapparaître ; nous vous invitons à activer l'alerte 'Retour en stock' sur votre taille.",
    },
    {
      q: "QUELLE EST LA POLITIQUE DE RETOUR ET D'ÉCHANGE ?",
      a: "Vous disposez de 14 jours calendaires à compter de la réception de votre colis pour demander un échange de taille ou un remboursement. La pièce doit être retournée dans son état neuf, non portée, non lavée et dans son sac d'archive d'origine. Les retours pour échange de taille sont gratuits.",
    },
    {
      q: "QUE SIGNIFIE 'GSM' ET POURQUOI EST-CE IMPORTANT ?",
      a: "'GSM' signifie Grams per Square Meter (grammes par mètre carré). C'est l'indicateur officiel de l'épaisseur et de la densité du tissu. Les t-shirts du commerce oscillent généralement entre 140 et 180 GSM. Chez KÔRNER, nos t-shirts débutent à 300 GSM et nos hoodies atteignent 460 GSM, garantissant une tenue géométrique incomparable et une durabilité de plusieurs années.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F2EA] text-[#0A0A0A]">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="space-y-4 mb-10 pb-6 border-b-3 border-black text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 font-mono text-xs font-bold text-[#FF4D00] uppercase tracking-widest">
            <HelpCircle className="w-4 h-4" />
            <span>CENTRE D&apos;AIDE // FOIRE AUX QUESTIONS</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl uppercase leading-none">
            QUESTIONS FRÉQUENTES
          </h1>
          <p className="font-body text-xs sm:text-sm text-[#666] max-w-xl">
            Toutes les réponses sur nos matières ultra-lourdes, nos coupes boxy, nos moyens de paiement et notre logistique internationale.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {faqData.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border-3 border-black brutal-shadow transition-all"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between font-display text-lg sm:text-xl uppercase hover:bg-[#E6FF00]/20 transition-colors cursor-pointer"
              >
                <span>{item.q}</span>
                <ChevronDown
                  className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${
                    openItems[idx] ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openItems[idx] && (
                <div className="p-4 sm:p-5 pt-0 font-body text-xs sm:text-sm text-[#333] leading-relaxed border-t border-black/10">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact fallback block */}
        <div className="mt-12 p-6 bg-[#0A0A0A] text-white border-3 border-black brutal-shadow-neon flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl uppercase">UNE AUTRE QUESTION ?</h3>
            <p className="font-mono text-xs text-[#8A8A8A]">
              Notre équipe SAV vous répond sur WhatsApp en moins de 30 minutes.
            </p>
          </div>
          <Link
            href="/contact"
            className="brutal-btn brutal-btn-primary whitespace-nowrap"
          >
            CONTACTER LE SAV
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
