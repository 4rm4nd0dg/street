"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useToast } from "@/context/ToastContext";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Tag, ArrowLeft } from "lucide-react";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    promoCode,
    applyPromoCode,
    removePromoCode,
    discountPercent,
    subtotalXOF,
    subtotalEUR,
    discountAmountXOF,
    discountAmountEUR,
    shippingXOF,
    shippingEUR,
    freeShippingThresholdXOF,
    freeShippingThresholdEUR,
    totalXOF,
    totalEUR,
    totalItemsCount,
  } = useCart();

  const { currency, formatPrice } = useCurrency();
  const { showToast } = useToast();

  const [inputCode, setInputCode] = useState("");
  const [promoError, setPromoError] = useState("");

  const currentSubtotal = currency === "FCFA" ? subtotalXOF : subtotalEUR;
  const targetThreshold = currency === "FCFA" ? freeShippingThresholdXOF : freeShippingThresholdEUR;
  const progressPercent = Math.min(100, Math.round((currentSubtotal / targetThreshold) * 100));
  const diffRemaining = Math.max(0, targetThreshold - currentSubtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    const res = applyPromoCode(inputCode);
    if (res.success) {
      showToast(res.message, "success");
      setInputCode("");
    } else {
      setPromoError(res.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F2EA] text-[#0A0A0A]">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-6 border-b-3 border-black">
          <div>
            <span className="font-mono text-xs font-bold text-[#FF4D00] uppercase tracking-widest block mb-1">
              // RÉCAPITULATIF COMMANDE
            </span>
            <h1 className="font-display text-4xl sm:text-5xl uppercase leading-none">
              VOTRE PANIER ({totalItemsCount} PIÈCES)
            </h1>
          </div>
          <Link
            href="/boutique"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-bold underline uppercase hover:text-[#FF4D00]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>CONTINUER LES ACHATS</span>
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="py-20 text-center bg-white border-3 border-black brutal-shadow max-w-md mx-auto p-8 space-y-4">
            <div className="w-16 h-16 bg-[#F5F2EA] border-2 border-black flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8 text-neutral-400" />
            </div>
            <h2 className="font-display text-2xl uppercase">VOTRE PANIER EST VIDE</h2>
            <p className="font-body text-xs text-[#666]">
              Vous n&apos;avez pas encore sélectionné de pièce pour votre vestiaire streetwear.
            </p>
            <Link href="/boutique" className="brutal-btn brutal-btn-primary block text-center">
              DÉCOUVRIR LE DROP #04
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Items List */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Free Shipping Alert Bar */}
              <div className="p-4 bg-[#0A0A0A] text-white border-3 border-black brutal-shadow-sm space-y-2">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span>
                    {progressPercent >= 100 ? (
                      <span className="text-[#E6FF00] font-bold">
                        ✓ LIVRAISON OFFERTE DÉBLOQUÉE !
                      </span>
                    ) : (
                      <span>
                        Ajoutez encore{" "}
                        <strong className="text-[#E6FF00]">
                          {currency === "FCFA"
                            ? `${new Intl.NumberFormat("fr-FR").format(diffRemaining)} FCFA`
                            : `${diffRemaining.toFixed(2)} €`}
                        </strong>{" "}
                        pour obtenir les frais de port gratuits.
                      </span>
                    )}
                  </span>
                  <span className="font-bold text-[#E6FF00]">{progressPercent}%</span>
                </div>
                <div className="w-full bg-[#222] h-2.5 border border-white/20">
                  <div
                    className="bg-[#E6FF00] h-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Items Card List */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row gap-4 p-4 bg-white border-3 border-black brutal-shadow-sm items-start sm:items-center justify-between"
                  >
                    <div className="flex gap-4 items-center">
                      <div className="relative w-20 aspect-[4/5] bg-neutral-100 border-2 border-black flex-shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>

                      <div>
                        <span className="font-mono text-[10px] text-[#8A8A8A] uppercase font-bold block">
                          {item.product.categoryLabel}
                        </span>
                        <Link
                          href={`/produit/${item.product.slug}`}
                          className="font-display text-lg uppercase leading-tight hover:text-[#FF4D00] transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <div className="flex items-center gap-3 mt-1.5 font-mono text-xs text-[#555]">
                          <span className="bg-neutral-100 border border-black px-2 py-0.5 font-bold">
                            Taille: {item.size}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <span
                              className="w-3 h-3 border border-black inline-block"
                              style={{ backgroundColor: item.color.hex }}
                            />
                            {item.color.name}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Qty controls & Item total */}
                    <div className="flex items-center justify-between w-full sm:w-auto gap-6 sm:border-t-0 pt-3 sm:pt-0 border-t border-black/10">
                      <div className="flex items-center border-2 border-black bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-1.5 hover:bg-[#E6FF00] disabled:opacity-30 cursor-pointer"
                          aria-label="Diminuer la quantité"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 font-mono font-bold text-xs">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-[#E6FF00] cursor-pointer"
                          aria-label="Augmenter la quantité"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="font-mono text-base font-bold text-black">
                          {formatPrice(
                            item.product.priceXOF * item.quantity,
                            item.product.priceEUR * item.quantity
                          )}
                        </div>
                        {item.quantity > 1 && (
                          <div className="font-mono text-[10px] text-[#8A8A8A]">
                            {formatPrice(item.product.priceXOF, item.product.priceEUR)} / unité
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-neutral-400 hover:text-black hover:bg-neutral-100 border border-transparent hover:border-black transition-colors cursor-pointer"
                        aria-label={`Supprimer ${item.product.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={clearCart}
                  className="font-mono text-xs font-bold text-[#8A8A8A] hover:text-[#FF4D00] underline uppercase cursor-pointer"
                >
                  VIDER LE PANIER
                </button>
              </div>
            </div>

            {/* Right Column: Order Summary & Checkout CTA */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white p-5 sm:p-6 border-3 border-black brutal-shadow space-y-5">
                <h2 className="font-display text-2xl uppercase border-b-2 border-black pb-3">
                  RÉCAPITULATIF
                </h2>

                {/* Promo Code Form */}
                <div className="space-y-1.5">
                  <label className="block font-mono text-xs font-bold uppercase">
                    CODE PROMO :
                  </label>
                  {promoCode ? (
                    <div className="flex items-center justify-between p-2.5 bg-[#E6FF00]/30 border-2 border-black font-mono text-xs">
                      <div className="flex items-center gap-1.5">
                        <Tag className="w-4 h-4" />
                        <span className="font-bold">ACTIF : {promoCode} (-{discountPercent}%)</span>
                      </div>
                      <button
                        onClick={removePromoCode}
                        className="text-xs font-bold underline hover:text-[#FF4D00] cursor-pointer"
                      >
                        Retirer
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyPromo} className="flex gap-2">
                      <input
                        type="text"
                        value={inputCode}
                        onChange={(e) => {
                          setInputCode(e.target.value);
                          setPromoError("");
                        }}
                        placeholder="Ex: DROP10"
                        className="flex-1 px-3 py-2 font-mono text-xs border-2 border-black uppercase focus:outline-none focus:border-[#E6FF00]"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-black text-[#E6FF00] font-mono text-xs font-bold border-2 border-black hover:bg-neutral-800 cursor-pointer"
                      >
                        VALIDER
                      </button>
                    </form>
                  )}
                  {promoError && (
                    <p className="font-mono text-[10px] text-[#FF4D00] font-bold">
                      {promoError}
                    </p>
                  )}
                </div>

                {/* Line Items Calculations */}
                <div className="space-y-2 font-mono text-xs border-t-2 border-black/10 pt-4">
                  <div className="flex justify-between text-[#666]">
                    <span>Sous-total articles</span>
                    <span>{formatPrice(subtotalXOF, subtotalEUR)}</span>
                  </div>

                  {discountPercent > 0 && (
                    <div className="flex justify-between text-[#FF4D00] font-bold">
                      <span>Remise promo ({discountPercent}%)</span>
                      <span>-{formatPrice(discountAmountXOF, discountAmountEUR)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-[#666]">
                    <span>Livraison estimée</span>
                    <span>
                      {(currency === "FCFA" ? shippingXOF : shippingEUR) === 0 ? (
                        <span className="bg-[#E6FF00] text-black font-bold px-1.5 py-0.5 border border-black">
                          GRATUITE
                        </span>
                      ) : (
                        formatPrice(shippingXOF, shippingEUR)
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline text-lg font-bold text-black pt-3 border-t-2 border-black">
                    <span className="font-display text-xl uppercase">TOTAL TTC</span>
                    <span className="font-mono text-2xl font-black">
                      {formatPrice(totalXOF, totalEUR)}
                    </span>
                  </div>
                </div>

                {/* Direct Checkout CTA */}
                <Link
                  href="/checkout"
                  className="brutal-btn brutal-btn-primary w-full flex items-center justify-center gap-2 py-4 text-base font-black"
                >
                  <span>PASSER LA COMMANDE</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <div className="p-3 bg-[#F5F2EA] border-2 border-black font-mono text-[11px] text-[#555] space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-black">
                    <ShieldCheck className="w-4 h-4 text-black" />
                    <span>PAIEMENTS ACCEPTÉS :</span>
                  </div>
                  <p>Orange Money • Wave • Moov Money • Carte Visa / Mastercard</p>
                </div>
              </div>
            </div>

          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
