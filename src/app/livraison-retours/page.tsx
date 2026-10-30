"use client";

import React from "react";
import Link from "next/link";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { Truck, RotateCcw, ShieldCheck, MapPin, CheckCircle2 } from "lucide-react";

export default function ShippingReturnsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F2EA] text-[#0A0A0A]">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="space-y-4 mb-10 pb-6 border-b-3 border-black text-center sm:text-left">
          <span className="font-mono text-xs font-bold text-[#FF4D00] uppercase tracking-widest block">
            // CONDITIONS LOGISTIQUES // DÉLAIS &amp; RETOURS
          </span>
          <h1 className="font-display text-4xl sm:text-6xl uppercase leading-none">
            LIVRAISONS &amp; RETOURS
          </h1>
          <p className="font-body text-xs sm:text-sm text-[#666] max-w-2xl">
            Toutes les expéditions partent de notre hub logistique sous emballage métallisé d&apos;archive étanche et scellé.
          </p>
        </div>

        {/* Shipping Rates Table */}
        <section className="space-y-6 mb-12">
          <h2 className="font-display text-3xl uppercase flex items-center gap-2">
            <Truck className="w-7 h-7 text-black" />
            <span>ZONES &amp; DÉLAIS D&apos;EXPÉDITION</span>
          </h2>

          <div className="border-3 border-black bg-white brutal-shadow overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#0A0A0A] text-white border-b-2 border-black uppercase">
                <tr>
                  <th className="p-3 sm:p-4">DESTINATION</th>
                  <th className="p-3 sm:p-4">DÉLAIS MOYENS</th>
                  <th className="p-3 sm:p-4">TARIF STANDARD</th>
                  <th className="p-3 sm:p-4">LIVRAISON GRATUITE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/20 font-bold">
                <tr className="hover:bg-[#E6FF00]/20">
                  <td className="p-3 sm:p-4 font-display text-base">ABIDJAN (CÔTE D&apos;IVOIRE)</td>
                  <td className="p-3 sm:p-4">24h à 48h ouvrées</td>
                  <td className="p-3 sm:p-4">2 500 FCFA</td>
                  <td className="p-3 sm:p-4 text-[#FF4D00]">Dès 50 000 FCFA</td>
                </tr>
                <tr className="hover:bg-[#E6FF00]/20">
                  <td className="p-3 sm:p-4 font-display text-base">SÉNÉGAL (DAKAR)</td>
                  <td className="p-3 sm:p-4">48h à 72h ouvrées</td>
                  <td className="p-3 sm:p-4">4 000 FCFA</td>
                  <td className="p-3 sm:p-4 text-[#FF4D00]">Dès 65 000 FCFA</td>
                </tr>
                <tr className="hover:bg-[#E6FF00]/20">
                  <td className="p-3 sm:p-4 font-display text-base">FRANCE &amp; UNION EUROPÉENNE</td>
                  <td className="p-3 sm:p-4">3 à 5 jours ouvrés</td>
                  <td className="p-3 sm:p-4">4,90 €</td>
                  <td className="p-3 sm:p-4 text-[#FF4D00]">Dès 75,00 €</td>
                </tr>
                <tr className="hover:bg-[#E6FF00]/20">
                  <td className="p-3 sm:p-4 font-display text-base">INTERNATIONAL (USA / RESTE)</td>
                  <td className="p-3 sm:p-4">5 à 7 jours via DHL</td>
                  <td className="p-3 sm:p-4">12,00 € / 8 000 FCFA</td>
                  <td className="p-3 sm:p-4 text-[#FF4D00]">Dès 120,00 €</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Returns Policy */}
        <section className="space-y-6">
          <h2 className="font-display text-3xl uppercase flex items-center gap-2">
            <RotateCcw className="w-7 h-7 text-black" />
            <span>POLITIQUE DE RETOUR // 14 JOURS</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 border-3 border-black brutal-shadow space-y-2">
              <span className="font-mono text-xs font-black bg-[#E6FF00] px-2 py-0.5 border border-black">
                ÉTAPE 1
              </span>
              <h3 className="font-display text-xl uppercase">DÉCLARATION EN LIGNE</h3>
              <p className="font-body text-xs text-[#555]">
                Contactez le support client sur WhatsApp ou par e-mail en indiquant votre numéro de commande (#KRN-...) et le motif du retour ou la taille souhaitée.
              </p>
            </div>

            <div className="bg-white p-5 border-3 border-black brutal-shadow space-y-2">
              <span className="font-mono text-xs font-black bg-[#E6FF00] px-2 py-0.5 border border-black">
                ÉTAPE 2
              </span>
              <h3 className="font-display text-xl uppercase">CONDITIONNEMENT</h3>
              <p className="font-body text-xs text-[#555]">
                Replacez l&apos;article non porté, non lavé, avec toutes ses étiquettes d&apos;origine intactes dans son sac d&apos;archive.
              </p>
            </div>

            <div className="bg-white p-5 border-3 border-black brutal-shadow space-y-2">
              <span className="font-mono text-xs font-black bg-[#E6FF00] px-2 py-0.5 border border-black">
                ÉTAPE 3
              </span>
              <h3 className="font-display text-xl uppercase">REMBOURSEMENT RAPIDE</h3>
              <p className="font-body text-xs text-[#555]">
                Dès réception et contrôle qualité dans notre hub, l&apos;échange de taille est expédié le jour même ou le remboursement est émis sous 48h.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
