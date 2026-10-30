"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Heart, Menu, X, ArrowUpRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCurrency } from "@/context/CurrencyContext";
import { Ticker } from "./Ticker";
import { Badge } from "./Badge";

interface HeaderProps {
  onOpenSearch?: () => void;
}

export function Header({ onOpenSearch }: HeaderProps) {
  const pathname = usePathname();
  const { totalItemsCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const { currency, toggleCurrency } = useCurrency();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/boutique", label: "BOUTIQUE", badge: "20 ITEMS" },
    { href: "/lookbook", label: "LOOKBOOK", badge: "SS26" },
    { href: "/a-propos", label: "MANIFESTE" },
    { href: "/faq", label: "FAQ & AIDE" },
    { href: "/contact", label: "CONTACT" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F5F2EA] border-b-3 border-black">
      {/* Top Banner Marquee */}
      <Ticker speed="normal" variant="black" />

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 md:h-20 gap-4">
          
          {/* Left: Mobile Menu Trigger & Main Links */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 bg-white border-2 border-black brutal-shadow-sm hover:bg-[#E6FF00] transition-colors focus-visible:ring-2 focus-visible:ring-black cursor-pointer"
              aria-label={mobileMenuOpen ? "Fermer le menu de navigation" : "Ouvrir le menu de navigation"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Brand Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group focus-visible:ring-2 focus-visible:ring-black"
              aria-label="KÔRNER Accueil"
            >
              <span className="font-display text-3xl md:text-4xl tracking-tight text-black group-hover:text-[#FF4D00] transition-colors">
                KÔRNER<span className="text-[#FF4D00]">™</span>
              </span>
              <span className="hidden sm:inline-block">
                <Badge variant="neon" rotate>
                  DROP 04
                </Badge>
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-3" aria-label="Navigation principale">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 font-mono text-xs lg:text-sm font-bold uppercase tracking-wider transition-all border-2 ${
                    isActive
                      ? "bg-black text-[#E6FF00] border-black brutal-shadow-sm"
                      : "text-black border-transparent hover:border-black hover:bg-white"
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="ml-1.5 text-[10px] text-[#8A8A8A] group-hover:text-black">
                      [{link.badge}]
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Actions (Currency, Search, Wishlist, Cart) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Currency Toggle */}
            <button
              onClick={toggleCurrency}
              className="hidden sm:flex items-center px-2.5 py-1.5 bg-white border-2 border-black brutal-shadow-sm font-mono text-xs font-bold hover:bg-[#E6FF00] transition-colors cursor-pointer"
              title="Changer de devise (FCFA / EUR)"
              aria-label={`Devise active : ${currency}. Cliquer pour basculer.`}
            >
              <span className="mr-1 text-[#8A8A8A]">DEVISE:</span>
              <span className="text-black font-black">{currency}</span>
            </button>

            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 sm:p-2.5 bg-white border-2 border-black brutal-shadow-sm hover:bg-[#E6FF00] transition-colors focus-visible:ring-2 focus-visible:ring-black cursor-pointer"
              aria-label="Rechercher des produits streetwear"
              title="Rechercher un produit (Ctrl+K)"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Link */}
            <Link
              href="/compte#favoris"
              className="relative p-2 sm:p-2.5 bg-white border-2 border-black brutal-shadow-sm hover:bg-[#E6FF00] transition-colors focus-visible:ring-2 focus-visible:ring-black cursor-pointer"
              aria-label={`Favoris (${wishlistCount} articles)`}
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FF4D00] text-white border-2 border-black font-mono text-[10px] font-bold w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 px-3 py-2 bg-[#E6FF00] border-2 border-black brutal-shadow-sm hover:bg-black hover:text-[#E6FF00] transition-all focus-visible:ring-2 focus-visible:ring-black cursor-pointer"
              aria-label={`Ouvrir le panier (${totalItemsCount} articles)`}
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="font-mono font-bold text-xs sm:text-sm">
                PANIER
              </span>
              <span className="bg-black text-[#E6FF00] px-1.5 py-0.5 text-xs font-mono font-black border border-black">
                {totalItemsCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F5F2EA] border-b-3 border-black p-5 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 bg-white border-2 border-black brutal-shadow-sm font-display text-xl tracking-wide uppercase hover:bg-[#E6FF00] transition-colors"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            ))}

            <div className="pt-2 flex items-center justify-between border-t-2 border-black">
              <span className="font-mono text-xs font-bold uppercase">Devise du store :</span>
              <button
                onClick={toggleCurrency}
                className="px-4 py-2 bg-black text-[#E6FF00] font-mono font-bold text-sm border-2 border-black brutal-shadow-sm cursor-pointer"
              >
                {currency === "FCFA" ? "BASCULER VERS EUR (€)" : "BASCULER VERS FCFA (XOF)"}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
