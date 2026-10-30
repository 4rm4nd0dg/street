export type Currency = "FCFA" | "EUR";

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductSize {
  size: "XS" | "S" | "M" | "L" | "XL" | "XXL" | "TU";
  stock: number;
}

export interface ProductDetails {
  composition: string;
  fit: string;
  weight: string; // e.g. "320 GSM"
  care: string;
  origin: string;
}

export interface ProductReview {
  id: string;
  author: string;
  city: string;
  rating: number; // 1-5
  date: string;
  comment: string;
  fitFeedback: "Taille grand (oversize)" | "Fidèle à la taille" | "Taille ajusté";
  verified: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: "t-shirts" | "hoodies" | "cargos" | "vestes" | "casquettes" | "accessoires";
  categoryLabel: string;
  priceXOF: number;
  priceEUR: number;
  originalPriceXOF?: number;
  originalPriceEUR?: number;
  images: string[];
  description: string;
  shortDescription: string;
  details: ProductDetails;
  sizes: ProductSize[];
  colors: ProductColor[];
  badges: string[]; // e.g. "NOUVEAU", "DROP LIMITÉ", "STOCK FAIBLE"
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isLimited?: boolean;
  dropNumber?: string;
  reviews?: ProductReview[];
}

export interface CartItem {
  id: string; // generated product.id + size + color
  product: Product;
  size: string;
  color: ProductColor;
  quantity: number;
}

export interface FilterOptions {
  category: string;
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
  inStockOnly: boolean;
  sortBy: "featured" | "newest" | "price-asc" | "price-desc" | "rating";
}
