"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useToast } from "@/context/ToastContext";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import {
  Package,
  Heart,
  MapPin,
  User,
  CheckCircle2,
  Clock,
  Truck,
  Plus,
  Trash2,
  ArrowRight,
} from "lucide-react";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<"orders" | "wishlist" | "addresses" | "auth">(
    "orders"
  );

  const { wishlist, clearWishlist } = useWishlist();
  const { formatPrice } = useCurrency();
  const { showToast } = useToast();

  // Auth mock state
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [authEmail, setAuthEmail] = useState("koffi.street@korner.ci");
  const [authPass, setAuthPass] = useState("••••••••");

  // Mock addresses
  const [addresses, setAddresses] = useState([
    {
      id: "addr-1",
      title: "RÉSIDENCE PRINCIPALE",
      name: "Koffi A.",
      address: "Rue des Jardins, Immeuble Horizon, Apt 4B",
      city: "Abidjan (Cocody Vallons)",
      country: "Côte d'Ivoire",
      phone: "+225 07 48 12 34 56",
      isDefault: true,
    },
    {
      id: "addr-2",
      title: "BUREAU / STUDIO",
      name: "Koffi A.",
      address: "14 Rue de la Roquette",
      city: "75011 Paris",
      country: "France",
      phone: "+33 6 12 34 56 78",
      isDefault: false,
    },
  ]);

  // Wishlist products
  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    showToast("Connexion réussie ! Bienvenue dans votre lab.", "success");
    setActiveTab("orders");
  };

  const deleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    showToast("Adresse supprimée.", "info");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F2EA] text-[#0A0A0A]">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b-3 border-black mb-8">
          <div>
            <span className="font-mono text-xs font-bold text-[#FF4D00] uppercase tracking-widest block mb-1">
              // ESPACE MEMBRE CREW
            </span>
            <h1 className="font-display text-4xl sm:text-5xl uppercase leading-none">
              TABLEAU DE BORD
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold bg-[#E6FF00] px-3 py-1.5 border-2 border-black brutal-shadow-sm">
              STATUT : MEMBRE VIP DROP
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 border-b-2 border-black/10 pb-4">
          {[
            { id: "orders", label: "COMMANDES", icon: Package, count: 2 },
            { id: "wishlist", label: "FAVORIS", icon: Heart, count: wishlist.length },
            { id: "addresses", label: "ADRESSES", icon: MapPin, count: addresses.length },
            { id: "auth", label: isLoggedIn ? "MON COMPTE" : "CONNEXION", icon: User },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 font-mono text-xs font-bold uppercase border-3 transition-all cursor-pointer ${
                  isActive
                    ? "bg-black text-[#E6FF00] border-black brutal-shadow-sm scale-102"
                    : "bg-white text-black border-black hover:bg-[#E6FF00]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`px-1.5 py-0.2 text-[10px] border ${
                    isActive ? "bg-[#E6FF00] text-black border-black" : "bg-neutral-100 text-black border-black"
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: COMMANDES */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <div className="space-y-4">
              {/* Order 1: Delivered */}
              <div className="bg-white border-3 border-black brutal-shadow p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b-2 border-black/10">
                  <div className="flex items-center gap-3">
                    <span className="p-2 bg-[#E6FF00] text-black border-2 border-black">
                      <Truck className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg uppercase leading-none">
                        COMMANDE #KRN-948102
                      </h3>
                      <p className="font-mono text-xs text-[#8A8A8A] mt-1">
                        Passée le 26 Octobre 2026 • 2 articles
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold bg-green-100 text-green-800 border-2 border-green-800 px-2.5 py-1 uppercase">
                      ✓ LIVRÉE À COCODY
                    </span>
                    <span className="font-mono text-base font-black text-black">
                      {formatPrice(73500, 113)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-3 p-2 bg-[#F5F2EA] border border-black/20">
                    <div className="relative w-12 aspect-[4/5] bg-neutral-200 border border-black flex-shrink-0">
                      <Image
                        src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=200&auto=format&fit=crop&q=80"
                        alt="Hoodie"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="font-mono text-xs">
                      <span className="font-bold block uppercase">RAW SEAM HOODIE 460 GSM</span>
                      <span className="text-neutral-500 text-[10px]">Taille: L • Noir Profond</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-2 bg-[#F5F2EA] border border-black/20">
                    <div className="relative w-12 aspect-[4/5] bg-neutral-200 border border-black flex-shrink-0">
                      <Image
                        src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=200&auto=format&fit=crop&q=80"
                        alt="Tee"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="font-mono text-xs">
                      <span className="font-bold block uppercase">HEAVYWEIGHT BOX TEE</span>
                      <span className="text-neutral-500 text-[10px]">Taille: L • Béton</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order 2: In Preparation */}
              <div className="bg-white border-3 border-black brutal-shadow p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b-2 border-black/10">
                  <div className="flex items-center gap-3">
                    <span className="p-2 bg-[#FF4D00] text-white border-2 border-black">
                      <Clock className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg uppercase leading-none">
                        COMMANDE #KRN-952400
                      </h3>
                      <p className="font-mono text-xs text-[#8A8A8A] mt-1">
                        Passée hier à 14h20 • 1 article
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold bg-[#E6FF00] text-black border-2 border-black px-2.5 py-1 uppercase animate-pulse">
                      EN COURS DE CONDITIONNEMENT
                    </span>
                    <span className="font-mono text-base font-black text-black">
                      {formatPrice(45000, 69)}
                    </span>
                  </div>
                </div>

                <div className="p-2 bg-[#F5F2EA] border border-black/20 flex items-center gap-3 max-w-sm">
                  <div className="relative w-12 aspect-[4/5] bg-neutral-200 border border-black flex-shrink-0">
                    <Image
                      src="https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=200&auto=format&fit=crop&q=80"
                      alt="Cargo"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="font-mono text-xs">
                    <span className="font-bold block uppercase">MODULAR 8-POCKET CARGO</span>
                    <span className="text-neutral-500 text-[10px]">Taille: M • Noir Militaire</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FAVORIS */}
        {activeTab === "wishlist" && (
          <div className="space-y-6">
            {wishlistProducts.length === 0 ? (
              <div className="py-16 text-center bg-white border-3 border-black brutal-shadow max-w-md mx-auto p-8 space-y-4">
                <Heart className="w-12 h-12 text-neutral-300 mx-auto" />
                <h3 className="font-display text-2xl uppercase">AUCUN FAVORIS ENREGISTRÉ</h3>
                <p className="font-body text-xs text-[#666]">
                  Cliquez sur l&apos;icône coeur sur n&apos;importe quelle pièce du drop pour la sauvegarder dans votre vestiaire.
                </p>
                <Link href="/boutique" className="brutal-btn brutal-btn-primary block text-center">
                  VOIR LE DROP
                </Link>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-mono text-xs font-bold uppercase text-[#8A8A8A]">
                    {wishlistProducts.length} ARTICLES SAUVEGARDÉS
                  </span>
                  <button
                    onClick={clearWishlist}
                    className="font-mono text-xs font-bold underline text-[#FF4D00] uppercase"
                  >
                    Vider les favoris
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                  {wishlistProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ADRESSES */}
        {activeTab === "addresses" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="bg-white border-3 border-black brutal-shadow p-5 space-y-3 relative"
                >
                  <div className="flex items-center justify-between pb-2 border-b-2 border-black/10">
                    <span className="font-mono text-xs font-bold uppercase text-[#FF4D00]">
                      {addr.title}
                    </span>
                    {addr.isDefault && (
                      <span className="bg-[#E6FF00] font-mono text-[10px] font-bold px-2 py-0.5 border border-black">
                        PAR DÉFAUT
                      </span>
                    )}
                  </div>
                  <div className="font-mono text-xs space-y-1 text-black">
                    <p className="font-bold">{addr.name}</p>
                    <p>{addr.address}</p>
                    <p>{addr.city}, {addr.country}</p>
                    <p className="text-[#666]">Tél : {addr.phone}</p>
                  </div>
                  <div className="pt-2 flex items-center justify-between border-t border-black/10 font-mono text-xs">
                    <span className="text-neutral-500">Prêt pour expédition express</span>
                    <button
                      onClick={() => deleteAddress(addr.id)}
                      className="text-[#FF4D00] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: COMPTE & AUTH */}
        {activeTab === "auth" && (
          <div className="max-w-md mx-auto bg-white border-3 border-black brutal-shadow p-6 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="font-display text-3xl uppercase">
                {authMode === "login" ? "CONNEXION AU CREW" : "CRÉER UN COMPTE LAB"}
              </h2>
              <p className="font-mono text-xs text-[#8A8A8A]">
                Accès prioritaire aux drops limités et historique des commandes
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-xs font-bold uppercase mb-1">
                  E-mail :
                </label>
                <input
                  type="email"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  className="w-full p-2.5 font-mono text-xs border-2 border-black bg-white"
                  required
                />
              </div>

              <div>
                <label className="block font-mono text-xs font-bold uppercase mb-1">
                  Mot de passe :
                </label>
                <input
                  type="password"
                  value={authPass}
                  onChange={(e) => setAuthPass(e.target.value)}
                  className="w-full p-2.5 font-mono text-xs border-2 border-black bg-white"
                  required
                />
              </div>

              <button
                type="submit"
                className="brutal-btn brutal-btn-primary w-full py-3.5 text-center text-sm font-bold"
              >
                {authMode === "login" ? "SE CONNECTER" : "S'INSCRIRE"}
              </button>
            </form>

            <div className="pt-4 border-t-2 border-black/10 text-center font-mono text-xs">
              {authMode === "login" ? (
                <p>
                  Pas encore de compte ?{" "}
                  <button
                    onClick={() => setAuthMode("register")}
                    className="font-bold underline text-black hover:text-[#FF4D00]"
                  >
                    Créer un compte
                  </button>
                </p>
              ) : (
                <p>
                  Déjà membre ?{" "}
                  <button
                    onClick={() => setAuthMode("login")}
                    className="font-bold underline text-black hover:text-[#FF4D00]"
                  >
                    Se connecter
                  </button>
                </p>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
