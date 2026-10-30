"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Currency } from "@/types";

interface CurrencyContextType {
  currency: Currency;
  toggleCurrency: () => void;
  setCurrency: (c: Currency) => void;
  formatPrice: (priceXOF: number, priceEUR: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("FCFA");

  useEffect(() => {
    const saved = localStorage.getItem("korner_currency") as Currency | null;
    if (saved === "FCFA" || saved === "EUR") {
      setCurrencyState(saved);
    }
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem("korner_currency", c);
  };

  const toggleCurrency = () => {
    const next = currency === "FCFA" ? "EUR" : "FCFA";
    setCurrency(next);
  };

  const formatPrice = (priceXOF: number, priceEUR: number): string => {
    if (currency === "EUR") {
      return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(priceEUR);
    }
    return `${new Intl.NumberFormat("fr-FR").format(priceXOF)} FCFA`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        toggleCurrency,
        setCurrency,
        formatPrice,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
