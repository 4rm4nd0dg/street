"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, ProductColor, CartItem } from "@/types";

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, size: string, color: ProductColor, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  promoCode: string;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  discountPercent: number;
  subtotalXOF: number;
  subtotalEUR: number;
  discountAmountXOF: number;
  discountAmountEUR: number;
  shippingXOF: number;
  shippingEUR: number;
  freeShippingThresholdXOF: number;
  freeShippingThresholdEUR: number;
  totalXOF: number;
  totalEUR: number;
  totalItemsCount: number;
  lastAddedItem: CartItem | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_XOF = 50000;
const FREE_SHIPPING_EUR = 75;
const STANDARD_SHIPPING_XOF = 2500;
const STANDARD_SHIPPING_EUR = 4.9;

const VALID_PROMOS: Record<string, number> = {
  DROP10: 10,
  KORNER20: 20,
  STREETWEAR15: 15,
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("korner_cart");
      if (saved) {
        setItems(JSON.parse(saved));
      }
      const savedPromo = localStorage.getItem("korner_promo");
      if (savedPromo && VALID_PROMOS[savedPromo]) {
        setPromoCode(savedPromo);
        setDiscountPercent(VALID_PROMOS[savedPromo]);
      }
    } catch {
      // ignore
    }
  }, []);

  const saveItems = (newItems: CartItem[]) => {
    setItems(newItems);
    try {
      localStorage.setItem("korner_cart", JSON.stringify(newItems));
    } catch {
      // ignore
    }
  };

  const addItem = (product: Product, size: string, color: ProductColor, quantity = 1) => {
    const itemId = `${product.id}-${size}-${color.name}`.toLowerCase().replace(/\s+/g, "-");
    const existingIndex = items.findIndex((i) => i.id === itemId);

    let updated: CartItem[];
    let addedItem: CartItem;

    if (existingIndex > -1) {
      updated = [...items];
      const newQty = updated[existingIndex].quantity + quantity;
      updated[existingIndex] = {
        ...updated[existingIndex],
        quantity: newQty,
      };
      addedItem = updated[existingIndex];
    } else {
      addedItem = {
        id: itemId,
        product,
        size,
        color,
        quantity,
      };
      updated = [addedItem, ...items];
    }

    saveItems(updated);
    setLastAddedItem(addedItem);
    setIsCartOpen(true);
  };

  const removeItem = (itemId: string) => {
    saveItems(items.filter((i) => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    const updated = items.map((item) =>
      item.id === itemId ? { ...item, quantity } : item
    );
    saveItems(updated);
  };

  const clearCart = () => {
    saveItems([]);
    setPromoCode("");
    setDiscountPercent(0);
    localStorage.removeItem("korner_promo");
  };

  const applyPromoCode = (code: string) => {
    const normalized = code.trim().toUpperCase();
    if (VALID_PROMOS[normalized]) {
      setPromoCode(normalized);
      setDiscountPercent(VALID_PROMOS[normalized]);
      localStorage.setItem("korner_promo", normalized);
      return {
        success: true,
        message: `Code ${normalized} appliqué : -${VALID_PROMOS[normalized]}% sur votre drop !`,
      };
    }
    return {
      success: false,
      message: "Code promo invalide. Essayez 'DROP10' ou 'KORNER20'.",
    };
  };

  const removePromoCode = () => {
    setPromoCode("");
    setDiscountPercent(0);
    localStorage.removeItem("korner_promo");
  };

  // Calculations
  const subtotalXOF = items.reduce(
    (sum, item) => sum + item.product.priceXOF * item.quantity,
    0
  );
  const subtotalEUR = items.reduce(
    (sum, item) => sum + item.product.priceEUR * item.quantity,
    0
  );

  const discountAmountXOF = Math.round((subtotalXOF * discountPercent) / 100);
  const discountAmountEUR = Number(((subtotalEUR * discountPercent) / 100).toFixed(2));

  const afterDiscountXOF = subtotalXOF - discountAmountXOF;
  const afterDiscountEUR = subtotalEUR - discountAmountEUR;

  const shippingXOF =
    items.length === 0 || afterDiscountXOF >= FREE_SHIPPING_XOF ? 0 : STANDARD_SHIPPING_XOF;
  const shippingEUR =
    items.length === 0 || afterDiscountEUR >= FREE_SHIPPING_EUR ? 0 : STANDARD_SHIPPING_EUR;

  const totalXOF = items.length === 0 ? 0 : afterDiscountXOF + shippingXOF;
  const totalEUR = items.length === 0 ? 0 : Number((afterDiscountEUR + shippingEUR).toFixed(2));

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        toggleCart: () => setIsCartOpen(!isCartOpen),
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
        freeShippingThresholdXOF: FREE_SHIPPING_XOF,
        freeShippingThresholdEUR: FREE_SHIPPING_EUR,
        totalXOF,
        totalEUR,
        totalItemsCount,
        lastAddedItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
