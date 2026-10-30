"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useToast } from "@/context/ToastContext";

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeItem,
    updateQuantity,
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

  if (!isCartOpen) return null;

  // Free shipping progress calculation
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
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="cart-drawer-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity duration-200"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F5F2EA] border-l-4 border-black flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-250">
          
          {/* Header */}
          <div className="p-4 sm:p-5 bg-white border-b-3 border-black flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-black" />
              <h2 id="cart-drawer-title" className="font-display text-2xl tracking-wide uppercase">
                MON PANIER ({totalItemsCount})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-2 border-2 border-black brutal-shadow-sm hover:bg-[#E6FF00] transition-colors cursor-pointer"
              aria-label="Fermer le panier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#0A0A0A] text-white p-3 border-b-3 border-black">
            <div className="flex items-center justify-between font-mono text-xs mb-1.5">
              <span>
                {progressPercent >= 100 ? (
                  <span className="text-[#E6FF00] font-bold">✓ LIVRAISON OFFERTE DÉBLOQUÉE !</span>
                ) : (
                  <span>
                    Plus que <strong className="text-[#E6FF00]">{currency === "FCFA" ? `${new Intl.NumberFormat("fr-FR").format(diffRemaining)} FCFA` : `${diffRemaining.toFixed(2)} €`}</strong> pour la livraison offerte
                  </span>
                )}
              </span>
              <span className="font-bold text-[#E6FF00]">{progressPercent}%</span>
            </div>
            {/* Progress bar container */}
            <div className="w-full bg-[#333] h-2.5 border border-white/20">
              <div
                className="bg-[#E6FF00] h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 bg-white border-3 border-black brutal-shadow flex items-center justify-center">
                  <ShoppingBag className="w-10 h-10 text-neutral-400" />
                </div>
                <h3 className="font-display text-2xl uppercase">VOTRE PANIER EST VIDE</h3>
                <p className="font-body text-xs text-[#8A8A8A] max-w-xs">
                  Les pièces du Drop #04 s&apos;épuisent vite. Ne passez pas à côté des pièces limitées.
                </p>
                <Link
                  href="/boutique"
                  onClick={closeCart}
                  className="brutal-btn brutal-btn-primary w-full text-center"
                >
                  EXPLORER LE DROP
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 bg-white p-3 border-2 border-black brutal-shadow-sm"
                >
                  {/* Thumbnail (4:5) */}
                  <div className="relative w-20 aspect-[4/5] bg-neutral-100 border-2 border-black flex-shrink-0 overflow-hidden">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <Link
                          href={`/produit/${item.product.slug}`}
                          onClick={closeCart}
                          className="font-display text-sm uppercase leading-tight hover:text-[#FF4D00] transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 text-neutral-400 hover:text-black transition-colors"
                          aria-label={`Supprimer ${item.product.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Size & Color Tags */}
                      <div className="flex items-center gap-2 mt-1 font-mono text-[11px] text-[#666]">
                        <span className="px-1.5 py-0.5 bg-neutral-100 border border-black font-bold">
                          Taille: {item.size}
                        </span>
                        <span className="flex items-center gap-1">
                          <span
                            className="w-2.5 h-2.5 border border-black inline-block"
                            style={{ backgroundColor: item.color.hex }}
                          />
                          {item.color.name}
                        </span>
                      </div>
                    </div>

                    {/* Quantity & Item Price */}
                    <div className="flex items-center justify-between pt-2 border-t border-black/10 mt-2">
                      <div className="flex items-center border-2 border-black bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-[#E6FF00] transition-colors disabled:opacity-40"
                          disabled={item.quantity <= 1}
                          aria-label="Diminuer la quantité"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 font-mono text-xs font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-[#E6FF00] transition-colors"
                          aria-label="Augmenter la quantité"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="font-mono text-sm font-bold text-black">
                        {formatPrice(
                          item.product.priceXOF * item.quantity,
                          item.product.priceEUR * item.quantity
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 bg-white border-t-3 border-black space-y-3">
              {/* Promo Code Input */}
              <div>
                {promoCode ? (
                  <div className="flex items-center justify-between p-2 bg-[#E6FF00]/30 border-2 border-black font-mono text-xs">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" />
                      <span className="font-bold">CODE: {promoCode} (-{discountPercent}%)</span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-xs font-bold underline hover:text-[#FF4D00]"
                    >
                      Supprimer
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
                      placeholder="Code promo (ex: DROP10)"
                      className="flex-1 px-3 py-1.5 font-mono text-xs border-2 border-black uppercase focus:outline-none focus:border-[#E6FF00]"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-black text-[#E6FF00] font-mono text-xs font-bold border-2 border-black hover:bg-neutral-800 cursor-pointer"
                    >
                      APPLIQUER
                    </button>
                  </form>
                )}
                {promoError && (
                  <p className="font-mono text-[10px] text-[#FF4D00] mt-1 font-bold">
                    {promoError}
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 font-mono text-xs border-t border-black/10 pt-2">
                <div className="flex justify-between text-[#666]">
                  <span>Sous-total</span>
                  <span>{formatPrice(subtotalXOF, subtotalEUR)}</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-[#FF4D00] font-bold">
                    <span>Réduction ({discountPercent}%)</span>
                    <span>-{formatPrice(discountAmountXOF, discountAmountEUR)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#666]">
                  <span>Frais de livraison</span>
                  <span>
                    {(currency === "FCFA" ? shippingXOF : shippingEUR) === 0 ? (
                      <span className="text-[#0A0A0A] font-bold bg-[#E6FF00] px-1">
                        OFFERTE
                      </span>
                    ) : (
                      formatPrice(shippingXOF, shippingEUR)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-black pt-2 border-t-2 border-black">
                  <span className="font-display tracking-wide uppercase">TOTAL TTC</span>
                  <span className="font-mono text-lg text-black">
                    {formatPrice(totalXOF, totalEUR)}
                  </span>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-2 pt-1">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="brutal-btn brutal-btn-primary w-full flex items-center justify-center gap-2 py-3"
                >
                  <span>COMMANDER MAINTENANT</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  href="/panier"
                  onClick={closeCart}
                  className="block text-center font-mono text-xs font-bold underline hover:text-[#FF4D00] py-1"
                >
                  VOIR LE PANIER DÉTAILLÉ
                </Link>
              </div>

              {/* Safe payments reassurance */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-[#8A8A8A] pt-1">
                <ShieldCheck className="w-4 h-4 text-black" />
                <span>Paiement 100% sécurisé • Mobile Money & CB</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
