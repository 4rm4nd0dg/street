"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useToast } from "@/context/ToastContext";
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Smartphone,
  CreditCard,
  Truck,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";

export default function CheckoutPage() {
  const {
    items,
    subtotalXOF,
    subtotalEUR,
    discountPercent,
    discountAmountXOF,
    discountAmountEUR,
    shippingXOF,
    shippingEUR,
    totalXOF,
    totalEUR,
    clearCart,
  } = useCart();

  const { currency, formatPrice } = useCurrency();
  const { showToast } = useToast();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  // Form Fields
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "Abidjan",
    country: "Côte d'Ivoire",
    postalCode: "",
    shippingMethod: "express",
    paymentMethod: "orange_money",
    mobileMoneyNumber: "",
    cardNumber: "",
    cardExp: "",
    cardCvc: "",
    cardName: "",
  });

  // Inline Validation Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!formData.email.trim() || !formData.email.includes("@")) {
      errs.email = "Veuillez entrer une adresse e-mail valide.";
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      errs.phone = "Numéro de téléphone obligatoire (ex: +225 07 XX XX XX XX).";
    }
    if (!formData.firstName.trim()) {
      errs.firstName = "Veuillez renseigner votre prénom.";
    }
    if (!formData.lastName.trim()) {
      errs.lastName = "Veuillez renseigner votre nom.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!formData.address.trim()) {
      errs.address = "Veuillez renseigner votre adresse de livraison.";
    }
    if (!formData.city.trim()) {
      errs.city = "Veuillez indiquer la ville.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs: Record<string, string> = {};
    if (
      formData.paymentMethod === "orange_money" ||
      formData.paymentMethod === "moov_money" ||
      formData.paymentMethod === "wave"
    ) {
      if (!formData.mobileMoneyNumber.trim() || formData.mobileMoneyNumber.length < 8) {
        errs.mobileMoneyNumber = "Veuillez entrer le numéro Mobile Money pour le prélèvement.";
      }
    } else if (formData.paymentMethod === "card") {
      if (!formData.cardNumber.trim() || formData.cardNumber.replace(/\s/g, "").length < 16) {
        errs.cardNumber = "Numéro de carte invalide (16 chiffres requis).";
      }
      if (!formData.cardExp.trim() || !formData.cardExp.includes("/")) {
        errs.cardExp = "Format MM/AA requis.";
      }
      if (!formData.cardCvc.trim() || formData.cardCvc.length < 3) {
        errs.cardCvc = "3 chiffres au dos.";
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setCurrentStep(2);
      window.scrollTo({ top: 150, behavior: "smooth" });
    }
  };

  const handleNextStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep2()) {
      setCurrentStep(3);
      window.scrollTo({ top: 150, behavior: "smooth" });
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    const generatedId = `KRN-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setIsOrderPlaced(true);
    clearCart();
    showToast(`Commande ${generatedId} validée avec succès !`, "success");
  };

  const handleChange = (field: string, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F2EA] text-[#0A0A0A]">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Checkout Header */}
        <div className="flex items-center justify-between pb-6 border-b-3 border-black mb-8">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#FF4D00] uppercase tracking-widest mb-1">
              <Lock className="w-3.5 h-3.5" />
              <span>TUNNEL DE PAIEMENT SÉCURISÉ // SSL 256-BIT</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl uppercase leading-none">
              FINALISER LA COMMANDE
            </h1>
          </div>
          <Link
            href="/panier"
            className="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs font-bold underline uppercase hover:text-[#FF4D00]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETOUR AU PANIER</span>
          </Link>
        </div>

        {/* Successful Order Modal / Screen */}
        {isOrderPlaced ? (
          <div className="max-w-2xl mx-auto bg-white border-4 border-black brutal-shadow-lg p-6 sm:p-10 text-center space-y-6 my-6">
            <div className="w-20 h-20 bg-[#E6FF00] border-3 border-black brutal-shadow mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-black" />
            </div>

            <div className="space-y-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider bg-black text-[#E6FF00] px-3 py-1">
                COMMANDE CONFIRMÉE
              </span>
              <h2 className="font-display text-4xl uppercase">MERCI POUR VOTRE DROP !</h2>
              <p className="font-mono text-sm font-bold text-black">
                NUMÉRO DE COMMANDE : <span className="text-[#FF4D00]">{orderId}</span>
              </p>
            </div>

            <p className="font-body text-xs sm:text-sm text-[#444] max-w-md mx-auto leading-relaxed">
              Un e-mail de confirmation contenant votre facture et le lien de suivi en temps réel de votre colis a été envoyé à <strong>{formData.email}</strong>. Vos pièces sont en cours de conditionnement dans notre hub d&apos;Abidjan.
            </p>

            <div className="p-4 bg-[#F5F2EA] border-2 border-black font-mono text-xs text-left space-y-1.5 max-w-md mx-auto">
              <div className="font-bold text-black uppercase pb-1 border-b border-black/20">
                RÉCAPITULATIF EXPÉDITION :
              </div>
              <p>Destinataire : {formData.firstName} {formData.lastName}</p>
              <p>Adresse : {formData.address}, {formData.city} ({formData.country})</p>
              <p>Contact : {formData.phone}</p>
              <p>Moyen de paiement : {formData.paymentMethod.toUpperCase()}</p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/boutique"
                className="brutal-btn brutal-btn-primary py-3 px-8 text-center"
              >
                RETOURNER AU CATALOGUE
              </Link>
              <Link
                href="/compte"
                className="brutal-btn brutal-btn-secondary py-3 px-8 text-center"
              >
                VOIR MES COMMANDES
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT: 3-Step Checkout Accordion / Form (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* STEP 1: COORDONNÉES */}
              <div className="bg-white border-3 border-black brutal-shadow">
                <div
                  className="p-4 sm:p-5 border-b-2 border-black flex items-center justify-between cursor-pointer bg-[#F5F2EA]"
                  onClick={() => setCurrentStep(1)}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 font-mono font-bold flex items-center justify-center border-2 border-black ${
                      currentStep === 1 ? "bg-[#E6FF00] text-black" : "bg-black text-white"
                    }`}>
                      1
                    </span>
                    <h2 className="font-display text-xl uppercase">
                      COORDONNÉES CLIENT (ACHAT SANS COMPTE)
                    </h2>
                  </div>
                  {currentStep > 1 && (
                    <span className="font-mono text-xs font-bold text-black underline">
                      Modifier
                    </span>
                  )}
                </div>

                {currentStep === 1 && (
                  <form onSubmit={handleNextStep1} className="p-5 sm:p-6 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-xs font-bold uppercase mb-1">
                          Prénom *
                        </label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => handleChange("firstName", e.target.value)}
                          placeholder="Jean"
                          className={`w-full p-2.5 font-mono text-xs border-2 ${
                            errors.firstName ? "border-[#FF4D00] bg-[#FF4D00]/5" : "border-black bg-white"
                          }`}
                        />
                        {errors.firstName && (
                          <p className="font-mono text-[10px] text-[#FF4D00] mt-1 font-bold flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.firstName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block font-mono text-xs font-bold uppercase mb-1">
                          Nom *
                        </label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => handleChange("lastName", e.target.value)}
                          placeholder="Kouassi"
                          className={`w-full p-2.5 font-mono text-xs border-2 ${
                            errors.lastName ? "border-[#FF4D00] bg-[#FF4D00]/5" : "border-black bg-white"
                          }`}
                        />
                        {errors.lastName && (
                          <p className="font-mono text-[10px] text-[#FF4D00] mt-1 font-bold flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-xs font-bold uppercase mb-1">
                        Adresse E-mail pour confirmation et facture *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="jean.kouassi@district.ci"
                        className={`w-full p-2.5 font-mono text-xs border-2 ${
                          errors.email ? "border-[#FF4D00] bg-[#FF4D00]/5" : "border-black bg-white"
                        }`}
                      />
                      {errors.email && (
                        <p className="font-mono text-[10px] text-[#FF4D00] mt-1 font-bold flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block font-mono text-xs font-bold uppercase mb-1">
                        Téléphone portable (SMS suivi &amp; livreur) *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="+225 07 00 00 00 00"
                        className={`w-full p-2.5 font-mono text-xs border-2 ${
                          errors.phone ? "border-[#FF4D00] bg-[#FF4D00]/5" : "border-black bg-white"
                        }`}
                      />
                      {errors.phone && (
                        <p className="font-mono text-[10px] text-[#FF4D00] mt-1 font-bold flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.phone}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="brutal-btn brutal-btn-primary w-full py-3.5 text-center flex items-center justify-center gap-2"
                    >
                      <span>CONTINUER VERS LA LIVRAISON</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>

              {/* STEP 2: LIVRAISON */}
              <div className="bg-white border-3 border-black brutal-shadow">
                <div
                  className="p-4 sm:p-5 border-b-2 border-black flex items-center justify-between cursor-pointer bg-[#F5F2EA]"
                  onClick={() => {
                    if (validateStep1()) setCurrentStep(2);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 font-mono font-bold flex items-center justify-center border-2 border-black ${
                      currentStep === 2 ? "bg-[#E6FF00] text-black" : "bg-black text-white"
                    }`}>
                      2
                    </span>
                    <h2 className="font-display text-xl uppercase">
                      ADRESSE &amp; MODE DE LIVRAISON
                    </h2>
                  </div>
                  {currentStep > 2 && (
                    <span className="font-mono text-xs font-bold text-black underline">
                      Modifier
                    </span>
                  )}
                </div>

                {currentStep === 2 && (
                  <form onSubmit={handleNextStep2} className="p-5 sm:p-6 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-xs font-bold uppercase mb-1">
                          Pays *
                        </label>
                        <select
                          value={formData.country}
                          onChange={(e) => handleChange("country", e.target.value)}
                          className="w-full p-2.5 font-mono text-xs border-2 border-black bg-white"
                        >
                          <option value="Côte d'Ivoire">Côte d&apos;Ivoire (Abidjan)</option>
                          <option value="Sénégal">Sénégal (Dakar)</option>
                          <option value="France">France métropolitaine</option>
                          <option value="Belgique">Belgique</option>
                          <option value="Cameroun">Cameroun (Douala / Yaoundé)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-mono text-xs font-bold uppercase mb-1">
                          Ville *
                        </label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => handleChange("city", e.target.value)}
                          placeholder="Abidjan (Cocody)"
                          className={`w-full p-2.5 font-mono text-xs border-2 ${
                            errors.city ? "border-[#FF4D00] bg-[#FF4D00]/5" : "border-black bg-white"
                          }`}
                        />
                        {errors.city && (
                          <p className="font-mono text-[10px] text-[#FF4D00] mt-1 font-bold">
                            {errors.city}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-xs font-bold uppercase mb-1">
                        Adresse complète (Quartier, Rue, Immeuble, Repère) *
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => handleChange("address", e.target.value)}
                        placeholder="II Plateaux Vallons, Rue des Jardins, Immeuble Horizon"
                        className={`w-full p-2.5 font-mono text-xs border-2 ${
                          errors.address ? "border-[#FF4D00] bg-[#FF4D00]/5" : "border-black bg-white"
                        }`}
                      />
                      {errors.address && (
                        <p className="font-mono text-[10px] text-[#FF4D00] mt-1 font-bold">
                          {errors.address}
                        </p>
                      )}
                    </div>

                    {/* Shipping carrier option selection */}
                    <div className="space-y-2 pt-2">
                      <label className="block font-mono text-xs font-bold uppercase">
                        CHOIX DU TRANSPORTEUR :
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center justify-between p-3 border-2 border-black bg-white cursor-pointer hover:bg-[#E6FF00]/20">
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="shippingMethod"
                              checked={formData.shippingMethod === "express"}
                              onChange={() => handleChange("shippingMethod", "express")}
                              className="accent-black w-4 h-4"
                            />
                            <div>
                              <span className="font-mono text-xs font-bold block uppercase">
                                KÔRNER EXPRESS COURIER (24H - 48H)
                              </span>
                              <span className="font-mono text-[11px] text-neutral-500">
                                Remise en main propre contre code SMS
                              </span>
                            </div>
                          </div>
                          <span className="font-mono text-xs font-bold">
                            {currency === "FCFA" ? (shippingXOF === 0 ? "GRATUIT" : "2 500 FCFA") : (shippingEUR === 0 ? "GRATUIT" : "4,90 €")}
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="py-3 px-4 bg-neutral-200 border-2 border-black font-mono text-xs font-bold uppercase hover:bg-neutral-300"
                      >
                        RETOUR
                      </button>
                      <button
                        type="submit"
                        className="flex-1 brutal-btn brutal-btn-primary py-3 text-center flex items-center justify-center gap-2"
                      >
                        <span>PASSER AU PAIEMENT</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* STEP 3: PAIEMENT */}
              <div className="bg-white border-3 border-black brutal-shadow">
                <div
                  className="p-4 sm:p-5 border-b-2 border-black flex items-center justify-between bg-[#F5F2EA]"
                  onClick={() => {
                    if (validateStep1() && validateStep2()) setCurrentStep(3);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 font-mono font-bold flex items-center justify-center border-2 border-black ${
                      currentStep === 3 ? "bg-[#E6FF00] text-black" : "bg-black text-white"
                    }`}>
                      3
                    </span>
                    <h2 className="font-display text-xl uppercase">
                      PAIEMENT SÉCURISÉ (MOBILE MONEY / CARTE)
                    </h2>
                  </div>
                </div>

                {currentStep === 3 && (
                  <form onSubmit={handleCompleteOrder} className="p-5 sm:p-6 space-y-5">
                    {/* Method Radio Options */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: "orange_money", label: "ORANGE MONEY", color: "text-[#FF4D00]" },
                        { id: "wave", label: "WAVE MONEY", color: "text-[#00A3E0]" },
                        { id: "moov_money", label: "MOOV MONEY", color: "text-[#0066B2]" },
                        { id: "card", label: "CARTE BANCAIRE", color: "text-black" },
                      ].map((m) => (
                        <button
                          type="button"
                          key={m.id}
                          onClick={() => handleChange("paymentMethod", m.id)}
                          className={`p-3 text-center border-2 font-mono text-xs font-bold uppercase transition-all cursor-pointer ${
                            formData.paymentMethod === m.id
                              ? "bg-black text-[#E6FF00] border-black brutal-shadow-sm scale-102"
                              : "bg-white text-black border-black/40 hover:border-black"
                          }`}
                        >
                          <span className="block">{m.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Mobile Money Input View */}
                    {(formData.paymentMethod === "orange_money" ||
                      formData.paymentMethod === "wave" ||
                      formData.paymentMethod === "moov_money") && (
                      <div className="p-4 bg-[#F5F2EA] border-2 border-black space-y-3">
                        <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase">
                          <Smartphone className="w-4 h-4 text-black" />
                          <span>NUMÉRO DE FACTURATION {formData.paymentMethod.replace("_", " ").toUpperCase()} :</span>
                        </div>
                        <input
                          type="tel"
                          value={formData.mobileMoneyNumber}
                          onChange={(e) => handleChange("mobileMoneyNumber", e.target.value)}
                          placeholder="Entrez votre numéro (ex: 07 48 XX XX XX)"
                          className={`w-full p-2.5 font-mono text-xs border-2 bg-white ${
                            errors.mobileMoneyNumber ? "border-[#FF4D00]" : "border-black"
                          }`}
                        />
                        {errors.mobileMoneyNumber && (
                          <p className="font-mono text-[10px] text-[#FF4D00] font-bold">
                            {errors.mobileMoneyNumber}
                          </p>
                        )}
                        <p className="font-mono text-[10px] text-neutral-600">
                          ℹ️ Une notification de confirmation ou un code USSD sera instantanément envoyé sur votre mobile pour valider la transaction de {formatPrice(totalXOF, totalEUR)}.
                        </p>
                      </div>
                    )}

                    {/* Credit Card Input View */}
                    {formData.paymentMethod === "card" && (
                      <div className="p-4 bg-[#F5F2EA] border-2 border-black space-y-3">
                        <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase">
                          <CreditCard className="w-4 h-4 text-black" />
                          <span>CARTE BANCAIRE (VISA / MASTERCARD) :</span>
                        </div>

                        <div>
                          <input
                            type="text"
                            value={formData.cardNumber}
                            onChange={(e) => handleChange("cardNumber", e.target.value)}
                            placeholder="4000 1234 5678 9010"
                            maxLength={19}
                            className={`w-full p-2.5 font-mono text-xs border-2 bg-white ${
                              errors.cardNumber ? "border-[#FF4D00]" : "border-black"
                            }`}
                          />
                          {errors.cardNumber && (
                            <p className="font-mono text-[10px] text-[#FF4D00] font-bold mt-1">
                              {errors.cardNumber}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <input
                              type="text"
                              value={formData.cardExp}
                              onChange={(e) => handleChange("cardExp", e.target.value)}
                              placeholder="MM/AA"
                              maxLength={5}
                              className={`w-full p-2.5 font-mono text-xs border-2 bg-white ${
                                errors.cardExp ? "border-[#FF4D00]" : "border-black"
                              }`}
                            />
                            {errors.cardExp && (
                              <p className="font-mono text-[10px] text-[#FF4D00] font-bold mt-1">
                                {errors.cardExp}
                              </p>
                            )}
                          </div>
                          <div>
                            <input
                              type="password"
                              value={formData.cardCvc}
                              onChange={(e) => handleChange("cardCvc", e.target.value)}
                              placeholder="CVC (3 chiffres)"
                              maxLength={4}
                              className={`w-full p-2.5 font-mono text-xs border-2 bg-white ${
                                errors.cardCvc ? "border-[#FF4D00]" : "border-black"
                              }`}
                            />
                            {errors.cardCvc && (
                              <p className="font-mono text-[10px] text-[#FF4D00] font-bold mt-1">
                                {errors.cardCvc}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="py-3 px-4 bg-neutral-200 border-2 border-black font-mono text-xs font-bold uppercase hover:bg-neutral-300"
                      >
                        RETOUR
                      </button>
                      <button
                        type="submit"
                        className="flex-1 brutal-btn brutal-btn-primary py-4 text-center text-base font-black flex items-center justify-center gap-2"
                      >
                        <Lock className="w-5 h-5" />
                        <span>PAYER {formatPrice(totalXOF, totalEUR)}</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>

            </div>

            {/* RIGHT: Live Sticky Order Summary (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white p-5 sm:p-6 border-3 border-black brutal-shadow sticky top-28 space-y-4">
                <h2 className="font-display text-2xl uppercase border-b-2 border-black pb-3">
                  VOTRE COMMANDE ({items.length} REF)
                </h2>

                {/* Items preview */}
                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 items-center justify-between font-mono text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="relative w-12 aspect-[4/5] bg-neutral-100 border border-black flex-shrink-0">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <div>
                          <span className="font-bold block truncate max-w-[170px] uppercase">
                            {item.product.name}
                          </span>
                          <span className="text-neutral-500 text-[10px]">
                            Taille: {item.size} • Qté: {item.quantity}
                          </span>
                        </div>
                      </div>

                      <span className="font-bold text-black">
                        {formatPrice(
                          item.product.priceXOF * item.quantity,
                          item.product.priceEUR * item.quantity
                        )}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price calculations */}
                <div className="space-y-2 font-mono text-xs border-t-2 border-black/10 pt-3">
                  <div className="flex justify-between text-[#666]">
                    <span>Sous-total</span>
                    <span>{formatPrice(subtotalXOF, subtotalEUR)}</span>
                  </div>

                  {discountPercent > 0 && (
                    <div className="flex justify-between text-[#FF4D00] font-bold">
                      <span>Remise code (-{discountPercent}%)</span>
                      <span>-{formatPrice(discountAmountXOF, discountAmountEUR)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-[#666]">
                    <span>Frais de livraison</span>
                    <span>
                      {(currency === "FCFA" ? shippingXOF : shippingEUR) === 0 ? (
                        <span className="bg-[#E6FF00] px-1 font-bold text-black">
                          OFFERTE
                        </span>
                      ) : (
                        formatPrice(shippingXOF, shippingEUR)
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-lg font-bold text-black pt-3 border-t-2 border-black">
                    <span className="font-display text-xl uppercase">TOTAL NET</span>
                    <span className="font-mono text-2xl font-black">
                      {formatPrice(totalXOF, totalEUR)}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-[#F5F2EA] border-2 border-black font-mono text-[10px] text-neutral-600 space-y-1">
                  <div className="flex items-center gap-1 font-bold text-black">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>GARANTIE KÔRNER STUDIO :</span>
                  </div>
                  <p>Colis scellé sous vide avec certificat d&apos;authenticité numéroté.</p>
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
