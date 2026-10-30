"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Bell, CheckCircle2 } from "lucide-react";
import { Product } from "@/types";
import { useToast } from "@/context/ToastContext";

interface BackInStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  size: string;
}

export function BackInStockModal({
  isOpen,
  onClose,
  product,
  size,
}: BackInStockModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      showToast("Veuillez renseigner un email valide.", "error");
      return;
    }
    setIsSubmitted(true);
    showToast(`Alerte activée pour ${product.name} (Taille ${size}) !`, "success");
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail("");
      onClose();
    }, 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs p-4 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="back-in-stock-title"
    >
      <div className="w-full max-w-md bg-[#F5F2EA] border-4 border-black brutal-shadow-lg p-6 relative animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-3 border-black">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#FF4D00]" />
            <h3 id="back-in-stock-title" className="font-display text-xl uppercase">
              ALERTE RETOUR EN STOCK
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 border-2 border-black bg-white hover:bg-[#E6FF00] transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product preview */}
        <div className="flex gap-3 my-4 p-3 bg-white border-2 border-black">
          <div className="relative w-14 aspect-[4/5] bg-neutral-100 border border-black flex-shrink-0">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>
          <div className="flex-1">
            <h4 className="font-display text-sm uppercase leading-tight line-clamp-1">
              {product.name}
            </h4>
            <div className="mt-1 flex items-center gap-2 font-mono text-xs font-bold">
              <span className="bg-[#FF4D00] text-white px-2 py-0.5">
                TAILLE : {size}
              </span>
              <span className="text-[#8A8A8A]">ACTUELLEMENT ÉPUISÉ</span>
            </div>
          </div>
        </div>

        {isSubmitted ? (
          <div className="p-4 bg-[#E6FF00] border-2 border-black text-center font-mono text-xs font-bold space-y-2">
            <CheckCircle2 className="w-8 h-8 text-black mx-auto" />
            <p className="uppercase">VOTRE ALERTE EST ENREGISTRÉE !</p>
            <p className="font-normal text-neutral-800">
              Vous recevrez un e-mail prioritaire dès qu&apos;une pièce en taille {size} redevient disponible.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="font-body text-xs text-[#555] leading-relaxed">
              Nos pièces étant produites en tirages limités, les réassorts dépendent des retours d&apos;ateliers et d&apos;échanges. Soyez le premier averti.
            </p>

            <div className="space-y-1">
              <label htmlFor="alert-email" className="block font-mono text-xs font-bold uppercase">
                VOTRE ADRESSE E-MAIL :
              </label>
              <input
                id="alert-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre-email@streetwear.com"
                required
                className="w-full px-3 py-2 bg-white border-2 border-black font-mono text-xs focus:outline-none focus:border-[#E6FF00]"
              />
            </div>

            <button
              type="submit"
              className="w-full brutal-btn brutal-btn-primary py-2.5 text-center flex items-center justify-center gap-2"
            >
              <Bell className="w-4 h-4" />
              <span>M&apos;ALERTER DU RÉASSORT</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
