"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ArrowRight, ShieldCheck, Box, Flame, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F2EA] text-[#0A0A0A]">
      <Header />

      <main className="flex-1">
        {/* Hero Banner */}
        <section className="bg-[#0A0A0A] text-white border-b-3 border-black py-16 md:py-24 px-4">
          <div className="max-w-7xl mx-auto space-y-6">
            <span className="font-mono text-xs font-bold text-[#E6FF00] uppercase tracking-widest block">
              // MANIFESTE DU LABEL // FONDÉ EN 2024
            </span>
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl uppercase tracking-tight leading-[0.9]">
              L&apos;AUTHENTICITÉ <br />
              <span className="text-[#E6FF00]">CONTRE LA FOULE.</span>
            </h1>
            <p className="font-body text-base sm:text-lg text-[#8A8A8A] max-w-2xl leading-relaxed">
              KÔRNER est un laboratoire de streetwear brut né de la friction créative entre Abidjan et Paris. Nous concevons des armures urbaines en coton ultra lourd pour ceux qui rejettent l&apos;obsolescence programmée.
            </p>
          </div>
        </section>

        {/* 3 Pillars Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-white p-6 border-3 border-black brutal-shadow space-y-3">
              <div className="p-3 bg-[#E6FF00] text-black border-2 border-black inline-block font-mono font-black text-xl">
                01
              </div>
              <h3 className="font-display text-2xl uppercase">DENSITÉ SANS CONCESSION</h3>
              <p className="font-body text-xs text-[#444] leading-relaxed">
                Quand l&apos;industrie utilise des cotons légers de 180 GSM pour réduire les coûts, nos t-shirts commencent à <strong>300 GSM</strong> et nos hoodies montent à <strong>480 GSM</strong>. Le tombé est lourd, géométrique et inusable.
              </p>
            </div>

            <div className="bg-white p-6 border-3 border-black brutal-shadow space-y-3">
              <div className="p-3 bg-[#FF4D00] text-white border-2 border-black inline-block font-mono font-black text-xl">
                02
              </div>
              <h3 className="font-display text-2xl uppercase">DROPS ULTRA LIMITÉS</h3>
              <p className="font-body text-xs text-[#444] leading-relaxed">
                Chaque modèle est tiré à <strong>150 exemplaires strictement numérotés</strong>. Aucun réassort n&apos;est jamais relancé après épuisement du stock. Votre pièce conserve sa valeur et sa singularité.
              </p>
            </div>

            <div className="bg-white p-6 border-3 border-black brutal-shadow space-y-3">
              <div className="p-3 bg-black text-[#E6FF00] border-2 border-black inline-block font-mono font-black text-xl">
                03
              </div>
              <h3 className="font-display text-2xl uppercase">PONT CULTUREL 225 &times; 75</h3>
              <p className="font-body text-xs text-[#444] leading-relaxed">
                L&apos;énergie brute des rues d&apos;Abidjan (District 225) rencontre l&apos;exigence de patronage de la haute confection parisienne. Des coupes boxy pensées pour le climat tropical comme pour le béton européen.
              </p>
            </div>

          </div>
        </section>

        {/* Visual Craft Section */}
        <section className="bg-white border-y-3 border-black py-16 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 relative aspect-[4/3] border-4 border-black brutal-shadow-lg overflow-hidden bg-neutral-900">
              <Image
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1000&auto=format&fit=crop&q=80"
                alt="Atelier KORNER"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-black/90 text-white font-mono text-xs p-3 border border-white/20">
                📍 Atelier de confection • Contrôle qualité unitaire
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <span className="font-mono text-xs font-bold text-[#FF4D00] uppercase tracking-widest block">
                // MATIÈRES ET SAVOIR-FAIRE
              </span>
              <h2 className="font-display text-4xl sm:text-5xl uppercase leading-none">
                L&apos;OBSESSION DU DÉTAIL BRUT
              </h2>
              <div className="space-y-3 font-mono text-xs text-[#444] leading-relaxed">
                <p>
                  • <strong>Col montant 3 cm indéformable :</strong> Tricoté avec un fil de renfort élasthanne pour ne jamais bailler, même après 50 lavages.
                </p>
                <p>
                  • <strong>Zips industriels YKK massifs :</strong> Tirettes gravées au laser, résistantes aux conditions extrêmes et aux manipulations répétées.
                </p>
                <p>
                  • <strong>Sérigraphie artisanale haute densité :</strong> Encre aqueuse non toxique fixée à 180°C pour une pénétration totale dans la fibre de coton.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/boutique"
                  className="brutal-btn brutal-btn-primary inline-flex items-center gap-2 py-3 px-8 text-base"
                >
                  <span>DÉCOUVRIR LE DROP #04</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
