"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Smartphone, CreditCard } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export function Footer() {
  const [email, setEmail] = useState("");
  const { showToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      showToast("Veuillez entrer une adresse e-mail valide.", "error");
      return;
    }
    showToast("Bienvenue dans le crew ! Code promo -10% : DROP10", "success");
    setEmail("");
  };

  return (
    <footer className="bg-[#0A0A0A] text-[#F5F2EA] border-t-3 border-black pt-16 pb-12 mt-20">
      {/* Guarantees Bar (3 Highlights) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b-2 border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-4 p-5 bg-[#141414] border-2 border-white/20 brutal-shadow-neon">
            <div className="p-3 bg-[#E6FF00] text-black border-2 border-black">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display text-lg tracking-wide uppercase text-white">
                EXPÉDITION EXPRESS
              </h3>
              <p className="font-body text-xs text-[#8A8A8A] mt-1">
                Livraison en 24-48h à Abidjan & Dakar. 3-5 jours ouvrés vers la France et l&apos;Europe.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 bg-[#141414] border-2 border-white/20 brutal-shadow-neon">
            <div className="p-3 bg-[#FF4D00] text-white border-2 border-black">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display text-lg tracking-wide uppercase text-white">
                MOBILE MONEY & CARTE
              </h3>
              <p className="font-body text-xs text-[#8A8A8A] mt-1">
                Orange Money, Moov Money, Wave et Carte Bancaire 100% sécurisés.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 bg-[#141414] border-2 border-white/20 brutal-shadow-neon">
            <div className="p-3 bg-white text-black border-2 border-black">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display text-lg tracking-wide uppercase text-white">
                RETOURS 14 JOURS
              </h3>
              <p className="font-body text-xs text-[#8A8A8A] mt-1">
                Échange de taille facile ou remboursement immédiat sans friction.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Brand Manifesto & Newsletter (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="inline-block">
              <span className="font-display text-4xl sm:text-5xl tracking-tight text-white hover:text-[#E6FF00] transition-colors">
                KÔRNER<span className="text-[#FF4D00]">™</span>
              </span>
            </Link>
            <p className="font-body text-sm text-[#8A8A8A] max-w-md leading-relaxed">
              Streetwear brutaliste conçu à la croisée d&apos;Abidjan et de Paris. Matériaux ultra-lourds (300 à 480 GSM), coupes boxy rigides et tirages limités à 150 pièces numérotées. Pas de réassort.
            </p>

            {/* Newsletter Box */}
            <div className="bg-[#141414] p-5 border-2 border-white/30">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs font-bold bg-[#E6FF00] text-black px-2 py-0.5 uppercase">
                  DROP VIP ALERT
                </span>
                <span className="font-mono text-xs text-[#8A8A8A]">-10% SUR LE DROP</span>
              </div>
              <p className="font-body text-xs text-white/80 mb-3">
                Accédez aux drops 2 heures avant le public. Pas de spam, uniquement des alertes de sortie.
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre-email@district.com"
                  className="bg-black border-2 border-white/40 px-3 py-2 text-sm text-white font-mono placeholder:text-white/40 focus:border-[#E6FF00] focus:outline-none flex-1"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#E6FF00] text-black font-display text-sm tracking-wider uppercase border-2 border-[#E6FF00] hover:bg-white transition-colors cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>REJOINDRE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Links Column 1: Boutique (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-mono text-xs font-bold text-[#E6FF00] tracking-widest uppercase">
              // CATALOGUE
            </h4>
            <ul className="space-y-2.5 font-mono text-xs uppercase">
              <li>
                <Link href="/boutique?cat=t-shirts" className="hover:text-[#E6FF00] transition-colors">
                  T-Shirts Boxy
                </Link>
              </li>
              <li>
                <Link href="/boutique?cat=hoodies" className="hover:text-[#E6FF00] transition-colors">
                  Hoodies 460 GSM
                </Link>
              </li>
              <li>
                <Link href="/boutique?cat=cargos" className="hover:text-[#E6FF00] transition-colors">
                  Pantalons Cargo
                </Link>
              </li>
              <li>
                <Link href="/boutique?cat=vestes" className="hover:text-[#E6FF00] transition-colors">
                  Vestes & Techwear
                </Link>
              </li>
              <li>
                <Link href="/boutique?cat=casquettes" className="hover:text-[#E6FF00] transition-colors">
                  Casquettes & Bonnets
                </Link>
              </li>
              <li>
                <Link href="/boutique?cat=accessoires" className="hover:text-[#E6FF00] transition-colors">
                  Hardware & Bags
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Client & Infos (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-mono text-xs font-bold text-[#E6FF00] tracking-widest uppercase">
              // INFOS & SAV
            </h4>
            <ul className="space-y-2.5 font-mono text-xs uppercase">
              <li>
                <Link href="/compte" className="hover:text-[#E6FF00] transition-colors">
                  Mon Compte
                </Link>
              </li>
              <li>
                <Link href="/livraison-retours" className="hover:text-[#E6FF00] transition-colors">
                  Délais & Tarifs Livraison
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#E6FF00] transition-colors">
                  Guide des Tailles & FAQ
                </Link>
              </li>
              <li>
                <Link href="/lookbook" className="hover:text-[#E6FF00] transition-colors">
                  Lookbook SS26
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#E6FF00] transition-colors">
                  Assistance WhatsApp
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Localisation & Payments (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-mono text-xs font-bold text-[#E6FF00] tracking-widest uppercase">
              // ATELIERS & HUBS
            </h4>
            <div className="font-mono text-xs text-[#8A8A8A] space-y-2">
              <p>
                <span className="text-white font-bold">ABIDJAN HUB :</span> Rue des Jardins, II Plateaux Vallons, Abidjan, Côte d&apos;Ivoire.
              </p>
              <p>
                <span className="text-white font-bold">PARIS ARCHIVE :</span> 14 Rue de la Roquette, 75011 Paris, France.
              </p>
            </div>

            {/* Payment methods badges */}
            <div className="pt-2">
              <span className="font-mono text-[11px] font-bold text-[#8A8A8A] block mb-2 uppercase">
                PAIEMENTS SÉCURISÉS :
              </span>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-black border border-white/30 font-mono text-[10px] font-bold text-[#FF4D00]">
                  ORANGE MONEY
                </span>
                <span className="px-2 py-1 bg-black border border-white/30 font-mono text-[10px] font-bold text-[#00A3E0]">
                  WAVE
                </span>
                <span className="px-2 py-1 bg-black border border-white/30 font-mono text-[10px] font-bold text-[#0066B2]">
                  MOOV MONEY
                </span>
                <span className="px-2 py-1 bg-black border border-white/30 font-mono text-[10px] font-bold text-white">
                  VISA / MC
                </span>
                <span className="px-2 py-1 bg-black border border-white/30 font-mono text-[10px] font-bold text-[#E6FF00]">
                  APPLE PAY
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t-2 border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-[#8A8A8A]">
          <p>© 2026 KÔRNER CLOTHING LAB. TOUS DROITS RÉSERVÉS.</p>
          <div className="flex items-center gap-6">
            <span>NEO-BRUTALIST FASHION SYSTEM</span>
            <span className="text-[#E6FF00]">EDITION: DROP_04</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
