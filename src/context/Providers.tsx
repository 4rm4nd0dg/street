"use client";

import React, { useState } from "react";
import { CurrencyProvider } from "./CurrencyContext";
import { WishlistProvider } from "./WishlistContext";
import { CartProvider } from "./CartContext";
import { ToastProvider } from "./ToastContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SearchModal } from "@/components/search/SearchModal";

export function Providers({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <CurrencyProvider>
      <WishlistProvider>
        <CartProvider>
          <ToastProvider>
            {children}
            <CartDrawer />
            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
          </ToastProvider>
        </CartProvider>
      </WishlistProvider>
    </CurrencyProvider>
  );
}
