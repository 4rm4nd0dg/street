import { Product } from "@/types";

export const PRODUCTS: Product[] = [
  {
    id: "prod-01",
    slug: "heavyweight-box-tee-beton",
    name: "HEAVYWEIGHT BOX TEE — BÉTON",
    category: "t-shirts",
    categoryLabel: "T-Shirts",
    priceXOF: 24500,
    priceEUR: 38,
    originalPriceXOF: 29000,
    originalPriceEUR: 45,
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=1000&auto=format&fit=crop&q=80"
    ],
    description: "T-shirt ultra lourd conçu en pur coton peigné 300 GSM. Coupe carrée 'boxy fit', emmanchures descendues et col épais côtelé 3 cm anti-déformation. Teinture pigmentaire effet béton vieilli.",
    shortDescription: "Coton peigné 300 GSM • Coupe boxy streetwear • Col renforcé 3 cm",
    details: {
      composition: "100% Coton peigné biologique lourd (300 GSM)",
      fit: "Boxy fit, épaules tombantes, longueur cropped moderne",
      weight: "300 GSM Heavyweight",
      care: "Lavage machine à 30°C à l'envers. Ne pas sécher en machine. Repassage doux.",
      origin: "Conçu à Abidjan, tricoté et confectionné au Portugal"
    },
    sizes: [
      { size: "S", stock: 12 },
      { size: "M", stock: 8 },
      { size: "L", stock: 3 },
      { size: "XL", stock: 0 },
      { size: "XXL", stock: 0 }
    ],
    colors: [
      { name: "Béton Vintage", hex: "#8A8A8A" },
      { name: "Noir Asphalte", hex: "#0A0A0A" },
      { name: "Blanc Cassé", hex: "#F5F2EA" }
    ],
    badges: ["DROP LIMITÉ", "STOCK FAIBLE"],
    rating: 4.9,
    reviewsCount: 38,
    isLimited: true,
    dropNumber: "DROP 04",
    reviews: [
      {
        id: "rev-01",
        author: "Koffi A.",
        city: "Abidjan (Cocody)",
        rating: 5,
        date: "24 Oct 2026",
        comment: "La qualité du coton est impressionnante. Vrai 300 GSM bien rigide qui garde sa forme. Le col ne bouge pas après 5 lavages.",
        fitFeedback: "Taille grand (oversize)",
        verified: true
      },
      {
        id: "rev-02",
        author: "Romain D.",
        city: "Paris 11e",
        rating: 5,
        date: "18 Oct 2026",
        comment: "Tombé parfait, esprit brutaliste comme promis. Mention spéciale pour l'étiquette extérieure sticker cousue.",
        fitFeedback: "Fidèle à la taille",
        verified: true
      }
    ]
  },
  {
    id: "prod-02",
    slug: "cyber-district-oversized-tee",
    name: "CYBER DISTRICT OVERSIZED TEE",
    category: "t-shirts",
    categoryLabel: "T-Shirts",
    priceXOF: 26000,
    priceEUR: 40,
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1000&auto=format&fit=crop&q=80"
    ],
    description: "Sérigraphie artisanale haute densité au dos avec le plan cadastral de District 225 revisité en coordonnées néon. Coutures surjetées apparentes contrastées.",
    shortDescription: "Sérigraphie dos HD • Coutures contrastées • 280 GSM",
    details: {
      composition: "100% Coton premium filé à l'anneau (280 GSM)",
      fit: "Oversized silhouette large street",
      weight: "280 GSM",
      care: "Lavage 30°C cycle délicat. Repasser sur l'envers du motif.",
      origin: "Atelier KÔRNER Lab"
    },
    sizes: [
      { size: "S", stock: 15 },
      { size: "M", stock: 20 },
      { size: "L", stock: 14 },
      { size: "XL", stock: 5 },
      { size: "XXL", stock: 2 }
    ],
    colors: [
      { name: "Noir Asphalte", hex: "#0A0A0A" },
      { name: "Jaune Néon", hex: "#E6FF00" }
    ],
    badges: ["NOUVEAU"],
    rating: 4.8,
    reviewsCount: 19,
    isNew: true,
    dropNumber: "DROP 04"
  },
  {
    id: "prod-03",
    slug: "acid-wash-raw-graphic-tee",
    name: "ACID WASH RAW GRAPHIC TEE",
    category: "t-shirts",
    categoryLabel: "T-Shirts",
    priceXOF: 28000,
    priceEUR: 43,
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=1000&auto=format&fit=crop&q=80"
    ],
    description: "Traitement acid wash exclusif appliqué à la main. Chaque pièce présente des nuances uniques de gris minéral et de délavage asymétrique. Typographie Anton embossée sur la poitrine.",
    shortDescription: "Traitement acid wash manuel • Pièce unique • 320 GSM",
    details: {
      composition: "100% Coton lourd texturé (320 GSM)",
      fit: "Relaxed drop-shoulder fit",
      weight: "320 GSM",
      care: "Laver séparément lors du premier lavage à l'eau froide.",
      origin: "Édition capsule KÔRNER"
    },
    sizes: [
      { size: "S", stock: 6 },
      { size: "M", stock: 4 },
      { size: "L", stock: 0 },
      { size: "XL", stock: 0 },
      { size: "XXL", stock: 0 }
    ],
    colors: [
      { name: "Gris Minéral Lavé", hex: "#5C5C5C" }
    ],
    badges: ["DROP LIMITÉ", "STOCK FAIBLE"],
    rating: 5.0,
    reviewsCount: 27,
    isLimited: true,
    dropNumber: "ARCHIVE"
  },
  {
    id: "prod-04",
    slug: "archive-logo-boxy-tee-noir",
    name: "ARCHIVE LOGO BOXY TEE — NOIR",
    category: "t-shirts",
    categoryLabel: "T-Shirts",
    priceXOF: 23000,
    priceEUR: 35,
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1000&auto=format&fit=crop&q=80"
    ],
    description: "Le t-shirt fondamental du vestiaire brut KÔRNER. Logo brutaliste monochrome sérigraphié au centre de la poitrine avec étiquette drapeau tissée sur l'ourlet gauche.",
    shortDescription: "Le basique indispensable • 280 GSM • Coupe boxy",
    details: {
      composition: "100% Coton peigné 280 GSM",
      fit: "Boxy fit classique",
      weight: "280 GSM",
      care: "Lavage 30°C.",
      origin: "Confection éthique"
    },
    sizes: [
      { size: "S", stock: 24 },
      { size: "M", stock: 35 },
      { size: "L", stock: 18 },
      { size: "XL", stock: 12 },
      { size: "XXL", stock: 8 }
    ],
    colors: [
      { name: "Noir Brut", hex: "#0A0A0A" },
      { name: "Blanc Craie", hex: "#F5F2EA" }
    ],
    badges: ["PERMANENT"],
    rating: 4.7,
    reviewsCount: 54
  },
  {
    id: "prod-05",
    slug: "tactical-pocket-tee-khaki",
    name: "TACTICAL POCKET TEE — MILITARY",
    category: "t-shirts",
    categoryLabel: "T-Shirts",
    priceXOF: 27500,
    priceEUR: 42,
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1000&auto=format&fit=crop&q=80"
    ],
    description: "T-shirt technique enrichi d'une poche poitrine cargo en nylon ripstop imperméable avec fermeture zippée étanche YKK et anneau d'accroche D-ring en métal noir.",
    shortDescription: "Poche cargo nylon ripstop • Zip YKK étanche • Anneau D-ring",
    details: {
      composition: "Corps 100% Coton (290 GSM), Poche 100% Nylon Ripstop",
      fit: "Coupe utilitaire droite",
      weight: "290 GSM",
      care: "Lavage délicat 30°C.",
      origin: "KÔRNER Tech Series"
    },
    sizes: [
      { size: "S", stock: 9 },
      { size: "M", stock: 11 },
      { size: "L", stock: 7 },
      { size: "XL", stock: 2 },
      { size: "XXL", stock: 0 }
    ],
    colors: [
      { name: "Gris Béton", hex: "#8A8A8A" },
      { name: "Noir Asphalte", hex: "#0A0A0A" }
    ],
    badges: ["TECHWEAR"],
    rating: 4.9,
    reviewsCount: 14
  },
  {
    id: "prod-06",
    slug: "raw-seam-hoodie-460-gsm",
    name: "RAW SEAM HOODIE 460 GSM — NOIR",
    category: "hoodies",
    categoryLabel: "Hoodies",
    priceXOF: 49000,
    priceEUR: 75,
    originalPriceXOF: 58000,
    originalPriceEUR: 89,
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1000&auto=format&fit=crop&q=80"
    ],
    description: "Le graal du streetwear brut. Hoodie confectionné dans un French Terry ultra dense de 460 GSM. Capuche double épaisseur sans cordon pour une tenue géométrique impeccable. Coutures brutes effilochées aux emmanchures et poche kangourou XL renforcée.",
    shortDescription: "French Terry 460 GSM • Capuche double épaisseur sans cordon • Coutures brutes",
    details: {
      composition: "100% Coton French Terry lourd (460 GSM)",
      fit: "Ultra boxy, manches volumineuses resserrées aux poignets",
      weight: "460 GSM Ultra Heavy",
      care: "Lavage à froid conseillé pour préserver la densité de la maille.",
      origin: "Confectionné au Portugal"
    },
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 5 },
      { size: "L", stock: 2 },
      { size: "XL", stock: 0 },
      { size: "XXL", stock: 0 }
    ],
    colors: [
      { name: "Noir Profond", hex: "#0A0A0A" },
      { name: "Béton Brut", hex: "#8A8A8A" }
    ],
    badges: ["BEST SELLER", "STOCK FAIBLE"],
    rating: 5.0,
    reviewsCount: 63,
    isLimited: true,
    dropNumber: "DROP 04",
    reviews: [
      {
        id: "rev-03",
        author: "Yannick K.",
        city: "Abidjan (Plateau)",
        rating: 5,
        date: "28 Oct 2026",
        comment: "Le poids de ce hoodie est fou ! Il tient tout seul sur les épaules, la capuche se tient droite sans s'affaisser. C'est du niveau des marques japonaises haut de gamme.",
        fitFeedback: "Taille grand (oversize)",
        verified: true
      }
    ]
  },
  {
    id: "prod-07",
    slug: "neon-strike-oversized-hoodie",
    name: "NÉON STRIKE OVERSIZED HOODIE",
    category: "hoodies",
    categoryLabel: "Hoodies",
    priceXOF: 52000,
    priceEUR: 80,
    images: [
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1000&auto=format&fit=crop&q=80"
    ],
    description: "Pièce maîtresse du Drop 04. Bandes graphiques jaune néon #E6FF00 thermo-collées sur les manches avec message brutaliste 'NO RESTOCK // DROP 04'. Bord-côtes extra larges 2x2.",
    shortDescription: "Bandes jaune néon thermo-collées • 450 GSM • Édition 150 pièces",
    details: {
      composition: "100% Coton brossé intérieur polaire (450 GSM)",
      fit: "Oversized et structuré",
      weight: "450 GSM",
      care: "Lavage 30°C sur l'envers. Ne pas repasser directement sur les bandes néon.",
      origin: "Atelier KÔRNER"
    },
    sizes: [
      { size: "S", stock: 7 },
      { size: "M", stock: 14 },
      { size: "L", stock: 8 },
      { size: "XL", stock: 3 },
      { size: "XXL", stock: 1 }
    ],
    colors: [
      { name: "Noir & Néon", hex: "#0A0A0A" }
    ],
    badges: ["DROP LIMITÉ", "NOUVEAU"],
    rating: 4.9,
    reviewsCount: 31,
    isNew: true,
    isLimited: true,
    dropNumber: "DROP 04"
  },
  {
    id: "prod-08",
    slug: "asphalte-wash-zip-hoodie",
    name: "ASPHALTE WASH ZIP HOODIE",
    category: "hoodies",
    categoryLabel: "Hoodies",
    priceXOF: 55000,
    priceEUR: 85,
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1000&auto=format&fit=crop&q=80"
    ],
    description: "Hoodie zippé intégral avec double curseur en métal massif gravé KÔRNER. Traitement délavé minéral façon poussière d'asphalte et poches invisibles plaquées.",
    shortDescription: "Zip intégral double curseur • Délavage asphalte • 480 GSM",
    details: {
      composition: "100% Coton peigné délavé (480 GSM)",
      fit: "Boxy fit contemporain",
      weight: "480 GSM",
      care: "Lavage machine 30°C.",
      origin: "Série Limitée"
    },
    sizes: [
      { size: "S", stock: 8 },
      { size: "M", stock: 12 },
      { size: "L", stock: 6 },
      { size: "XL", stock: 2 },
      { size: "XXL", stock: 0 }
    ],
    colors: [
      { name: "Asphalte Foncé", hex: "#222222" },
      { name: "Gris Ciment", hex: "#8A8A8A" }
    ],
    badges: ["DROP LIMITÉ"],
    rating: 4.8,
    reviewsCount: 22,
    isLimited: true
  },
  {
    id: "prod-09",
    slug: "district-225-heavy-hoodie",
    name: "DISTRICT 225 HEAVY HOODIE",
    category: "hoodies",
    categoryLabel: "Hoodies",
    priceXOF: 48000,
    priceEUR: 74,
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=1000&auto=format&fit=crop&q=80"
    ],
    description: "Hommage au berceau créatif de la marque. Broderie en relief ton sur ton '225 RAW VIBES' sur la poitrine et étiquette code-barres oversize en bas du dos.",
    shortDescription: "Broderie ton sur ton • Hommage Abidjan • 450 GSM",
    details: {
      composition: "100% Coton biologique épais",
      fit: "Relaxed streetwear fit",
      weight: "450 GSM",
      care: "Lavage 30°C.",
      origin: "Abidjan Lab"
    },
    sizes: [
      { size: "S", stock: 15 },
      { size: "M", stock: 18 },
      { size: "L", stock: 9 },
      { size: "XL", stock: 4 },
      { size: "XXL", stock: 2 }
    ],
    colors: [
      { name: "Blanc Cassé", hex: "#F5F2EA" },
      { name: "Noir Brut", hex: "#0A0A0A" }
    ],
    badges: ["NOUVEAU"],
    rating: 4.9,
    reviewsCount: 16,
    isNew: true
  },
  {
    id: "prod-10",
    slug: "modular-8-pocket-cargo-pant",
    name: "MODULAR 8-POCKET CARGO PANT",
    category: "cargos",
    categoryLabel: "Pantalons Cargo",
    priceXOF: 45000,
    priceEUR: 69,
    originalPriceXOF: 52000,
    originalPriceEUR: 80,
    images: [
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=1000&auto=format&fit=crop&q=80"
    ],
    description: "Pantalon cargo tactique en coton ripstop anti-déchirure. Équipé de 8 poches volumétriques avec rabats à velcro militaire, sangles d'ajustement amovibles aux genoux et chevilles resserrables par cordons élastiques.",
    shortDescription: "8 poches tactiques • Tissu ripstop indéchirable • Bas ajustables",
    details: {
      composition: "98% Coton Ripstop militaire, 2% Élasthanne",
      fit: "Coupe carotte large aux cuisses, resserrée aux chevilles",
      weight: "340 GSM Ripstop",
      care: "Lavage à 30°C. Séchage à l'air libre.",
      origin: "Atelier Techwear KÔRNER"
    },
    sizes: [
      { size: "S", stock: 11 },
      { size: "M", stock: 6 },
      { size: "L", stock: 2 },
      { size: "XL", stock: 0 },
      { size: "XXL", stock: 0 }
    ],
    colors: [
      { name: "Noir Militaire", hex: "#0A0A0A" },
      { name: "Kaki Combat", hex: "#4B5320" }
    ],
    badges: ["DROP LIMITÉ", "STOCK FAIBLE"],
    rating: 5.0,
    reviewsCount: 47,
    isLimited: true,
    dropNumber: "DROP 04",
    reviews: [
      {
        id: "rev-04",
        author: "Bakary T.",
        city: "Dakar",
        rating: 5,
        date: "25 Oct 2026",
        comment: "Le meilleur cargo que j'ai possédé. Les poches ont une vraie capacité, le tissu ripstop est hyper résistant. Les finitions aux sangles sont impeccables.",
        fitFeedback: "Fidèle à la taille",
        verified: true
      }
    ]
  },
  {
    id: "prod-11",
    slug: "parachute-techwear-pant-noir",
    name: "PARACHUTE TECHWEAR PANT — NOIR",
    category: "cargos",
    categoryLabel: "Pantalons Cargo",
    priceXOF: 42000,
    priceEUR: 65,
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=1000&auto=format&fit=crop&q=80"
    ],
    description: "Inspiré des tenues de saut en parachute. Silhouette ultra ample et fluide, tissu technique déperlant finition matte, pinces articulées aux genoux pour une liberté de mouvement maximale.",
    shortDescription: "Silhouette parachute ample • Tissu déperlant mat • Genoux articulés",
    details: {
      composition: "100% Nylon technique déperlant",
      fit: "Wide-leg parachute silhouette avec stoppeurs",
      weight: "180 GSM Tech",
      care: "Lavage délicat 30°C sans adoucissant.",
      origin: "KÔRNER Lab"
    },
    sizes: [
      { size: "S", stock: 14 },
      { size: "M", stock: 22 },
      { size: "L", stock: 15 },
      { size: "XL", stock: 6 },
      { size: "XXL", stock: 3 }
    ],
    colors: [
      { name: "Noir Mat", hex: "#0A0A0A" },
      { name: "Gris Béton", hex: "#8A8A8A" }
    ],
    badges: ["NOUVEAU"],
    rating: 4.8,
    reviewsCount: 20,
    isNew: true
  },
  {
    id: "prod-12",
    slug: "canvas-workwear-double-knee",
    name: "CANVAS WORKWEAR DOUBLE KNEE",
    category: "cargos",
    categoryLabel: "Pantalons Cargo",
    priceXOF: 46000,
    priceEUR: 70,
    images: [
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=1000&auto=format&fit=crop&q=80"
    ],
    description: "Pantalon de travailleur urbain ultra robuste avec empiècements double genou rivetés en laiton vieilli. Toile de coton canevas 380 GSM quasi indestructible.",
    shortDescription: "Toile canevas 380 GSM • Double genoux rivetés • Coupe droite workwear",
    details: {
      composition: "100% Toile Canvas de Coton lourd",
      fit: "Straight leg classique workwear",
      weight: "380 GSM Canvas",
      care: "Lavage à l'envers 30°C.",
      origin: "Confection artisanale"
    },
    sizes: [
      { size: "S", stock: 7 },
      { size: "M", stock: 10 },
      { size: "L", stock: 4 },
      { size: "XL", stock: 1 },
      { size: "XXL", stock: 0 }
    ],
    colors: [
      { name: "Noir Lavé", hex: "#1C1C1C" },
      { name: "Ocre Terre", hex: "#C68B59" }
    ],
    badges: ["PERMANENT"],
    rating: 4.9,
    reviewsCount: 35
  },
  {
    id: "prod-13",
    slug: "windblocker-brutal-anorak",
    name: "WINDBLOCKER BRUTAL ANORAK",
    category: "vestes",
    categoryLabel: "Vestes & Techwear",
    priceXOF: 59000,
    priceEUR: 90,
    originalPriceXOF: 69000,
    originalPriceEUR: 105,
    images: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1000&auto=format&fit=crop&q=80"
    ],
    description: "Anorak demi-zip coupe-vent et imperméable (colonne d'eau 10 000 mm). Grande poche ventrale zippée avec rabat tempête, capuche réglable à visière rigide et logo imprimé réflectif 3M.",
    shortDescription: "Imperméable 10 000 mm • Logo réfléchissant 3M • Poche ventrale tempête",
    details: {
      composition: "Extérieur 100% Polyamide 3 couches respirant, Doublure mesh",
      fit: "Oversized pour superposition avec hoodie",
      weight: "3 couches technique",
      care: "Nettoyage délicat avec imperméabilisant.",
      origin: "KÔRNER Lab Outdoors"
    },
    sizes: [
      { size: "S", stock: 5 },
      { size: "M", stock: 8 },
      { size: "L", stock: 3 },
      { size: "XL", stock: 0 },
      { size: "XXL", stock: 0 }
    ],
    colors: [
      { name: "Noir & Gris Asphalte", hex: "#0A0A0A" }
    ],
    badges: ["DROP LIMITÉ", "STOCK FAIBLE"],
    rating: 5.0,
    reviewsCount: 18,
    isLimited: true,
    dropNumber: "DROP 04"
  },
  {
    id: "prod-14",
    slug: "tactical-quilted-bomber-v4",
    name: "TACTICAL QUILTED BOMBER V4",
    category: "vestes",
    categoryLabel: "Vestes & Techwear",
    priceXOF: 65000,
    priceEUR: 99,
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544441893-675973e31985?w=1000&auto=format&fit=crop&q=80"
    ],
    description: "Bomber MA-1 réinterprété dans un style neo-brutaliste. Matelassage géométrique carré, col teddy côtelé, doublure contrastée orange sécurité #FF4D00 réversible et tirette de zip industrielle avec sangle tissée.",
    shortDescription: "Matelassage géométrique • Doublure orange réversible • Zip industriel",
    details: {
      composition: "Nylon sergé satiné imperméabilisé, Garnissage ouate thermique",
      fit: "Boxy bomber fit court sur la taille",
      weight: "Heavy Winter Shield",
      care: "Nettoyage à sec uniquement.",
      origin: "Atelier d'exception"
    },
    sizes: [
      { size: "S", stock: 4 },
      { size: "M", stock: 7 },
      { size: "L", stock: 2 },
      { size: "XL", stock: 1 },
      { size: "XXL", stock: 0 }
    ],
    colors: [
      { name: "Noir & Doublure Orange", hex: "#0A0A0A" }
    ],
    badges: ["NOUVEAU", "PIÈCE MAÎTRESSE"],
    rating: 5.0,
    reviewsCount: 12,
    isNew: true,
    isLimited: true
  },
  {
    id: "prod-15",
    slug: "distressed-denim-overshirt",
    name: "RAW DENIM OVERSIZED SHIRT",
    category: "vestes",
    categoryLabel: "Vestes & Techwear",
    priceXOF: 52000,
    priceEUR: 80,
    images: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1000&auto=format&fit=crop&q=80"
    ],
    description: "Surchemise en denim brut 14 oz non traité (selvedge feel). Boutons-pression métalliques noirs mats gravés, ourlet brut non surfilé et double poche poitrine surdimensionnée.",
    shortDescription: "Denim brut 14 oz • Boutons pression noirs mats • Ourlet franc",
    details: {
      composition: "100% Coton Denim Brut rigide (14 oz)",
      fit: "Surchemise loose et carrée",
      weight: "14 oz Denim",
      care: "Premier bain à l'eau froide sans essorage.",
      origin: "Tissé au Japon, assemblé à Abidjan"
    },
    sizes: [
      { size: "S", stock: 8 },
      { size: "M", stock: 11 },
      { size: "L", stock: 5 },
      { size: "XL", stock: 2 },
      { size: "XXL", stock: 0 }
    ],
    colors: [
      { name: "Indigo Brut Profond", hex: "#1A2530" },
      { name: "Noir Asphalte", hex: "#0A0A0A" }
    ],
    badges: ["RAW CRAFT"],
    rating: 4.8,
    reviewsCount: 15
  },
  {
    id: "prod-16",
    slug: "distressed-arch-logo-snapback",
    name: "DISTRESSED ARCH LOGO SNAPBACK",
    category: "casquettes",
    categoryLabel: "Casquettes",
    priceXOF: 16000,
    priceEUR: 25,
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=1000&auto=format&fit=crop&q=80"
    ],
    description: "Casquette 6 panels en sergé de coton lourd délavé avec micro-griffures d'usure artisanales. Logo KÔRNER brodé en 3D volumétrique sur le devant et fermeture arrière par languette crantée.",
    shortDescription: "Broderie 3D haute densité • Coton sergé vieilli • Visière plate",
    details: {
      composition: "100% Coton Sergé lourd délavé",
      fit: "Taille unique réglable (54 à 61 cm)",
      weight: "Structure rigide",
      care: "Nettoyage éponge humide uniquement.",
      origin: "KÔRNER Headwear"
    },
    sizes: [
      { size: "TU", stock: 28 }
    ],
    colors: [
      { name: "Noir Délavé", hex: "#1A1A1A" },
      { name: "Vert Bouteille Vieilli", hex: "#1E352F" },
      { name: "Béton", hex: "#8A8A8A" }
    ],
    badges: ["NOUVEAU", "BEST SELLER"],
    rating: 4.9,
    reviewsCount: 42,
    isNew: true
  },
  {
    id: "prod-17",
    slug: "tactical-crossbody-chest-rig",
    name: "TACTICAL CROSSBODY CHEST RIG",
    category: "accessoires",
    categoryLabel: "Accessoires",
    priceXOF: 22000,
    priceEUR: 34,
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1000&auto=format&fit=crop&q=80"
    ],
    description: "Sacoche poitrine utilitaire en Cordura 1000D résistant à l'abrasion. Double compartiment indépendant avec séparateurs pour téléphone, passeport et clés, mousqueton tactique et sangle bandoulière réglable renforcée.",
    shortDescription: "Cordura 1000D étanche • Sangle multipoints • Boucle Fidlock",
    details: {
      composition: "100% Nylon Balistique Cordura 1000D",
      fit: "Porté torse, épaule ou ceinture réglable",
      weight: "280g",
      care: "Nettoyage avec chiffon humide.",
      origin: "Série Équipement Tactique"
    },
    sizes: [
      { size: "TU", stock: 17 }
    ],
    colors: [
      { name: "Noir Mat", hex: "#0A0A0A" }
    ],
    badges: ["TECHWEAR"],
    rating: 4.9,
    reviewsCount: 33
  },
  {
    id: "prod-18",
    slug: "industrial-woven-webbing-belt",
    name: "INDUSTRIAL WOVEN WEBBING BELT",
    category: "accessoires",
    categoryLabel: "Accessoires",
    priceXOF: 13000,
    priceEUR: 20,
    images: [
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=1000&auto=format&fit=crop&q=80"
    ],
    description: "Ceinture à sangle tissée ultra résistante de 3.8 cm de large, avec typographie jacquard jaune néon 'KÔRNER ATHLETICS // CAUTION 350 GSM'. Boucle à largage rapide en alliage de zinc noir mat.",
    shortDescription: "Sangle jacquard 3.8 cm • Boucle zinc à largage rapide • Longueur 135 cm",
    details: {
      composition: "100% Polyamide tressé haute ténacité, Boucle Métal",
      fit: "Taille unique réglable jusqu'à 130 cm",
      weight: "150g",
      care: "Ne pas passer en machine.",
      origin: "KÔRNER Lab"
    },
    sizes: [
      { size: "TU", stock: 25 }
    ],
    colors: [
      { name: "Noir & Slogan Néon", hex: "#E6FF00" },
      { name: "Noir Monochrome", hex: "#0A0A0A" }
    ],
    badges: ["ACCESSOIRE PHARE"],
    rating: 4.7,
    reviewsCount: 29
  },
  {
    id: "prod-19",
    slug: "heavy-ribbed-beanie-neon",
    name: "HEAVY RIBBED BEANIE — NÉON",
    category: "casquettes",
    categoryLabel: "Casquettes",
    priceXOF: 15000,
    priceEUR: 23,
    images: [
      "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=1000&auto=format&fit=crop&q=80"
    ],
    description: "Bonnet court 'fisherman' à côtes épaisses en mélange laine mérinos et acrylique chaud. Écusson en caoutchouc sérigraphié cousu sur le revers. Teinte jaune néon électrisante pour trancher sur l'asphalte.",
    shortDescription: "Coupe fisherman courte • Maille côtelée épaisse • Écusson rubber",
    details: {
      composition: "50% Laine Mérinos, 50% Acrylique anti-boulochage",
      fit: "Coupe courte au-dessus des oreilles",
      weight: "Côtes 2x2 lourdes",
      care: "Lavage à la main à l'eau froide.",
      origin: "KÔRNER Headwear"
    },
    sizes: [
      { size: "TU", stock: 19 }
    ],
    colors: [
      { name: "Jaune Néon Brut", hex: "#E6FF00" },
      { name: "Noir Asphalte", hex: "#0A0A0A" }
    ],
    badges: ["NOUVEAU"],
    rating: 4.8,
    reviewsCount: 17,
    isNew: true
  },
  {
    id: "prod-20",
    slug: "brutal-carabiner-keychain-chain",
    name: "HEAVY METAL CARABINER KEYCHAIN",
    category: "accessoires",
    categoryLabel: "Accessoires",
    priceXOF: 11000,
    priceEUR: 17,
    images: [
      "https://images.unsplash.com/photo-1531053793667-846353347bb7?w=1000&auto=format&fit=crop&q=80"
    ],
    description: "Mousqueton d'escalade industriel en acier inoxydable trempé avec gravure laser KÔRNER et chaîne barbelée stylisée en argent brossé. Attache solide pour passants de pantalon cargo ou sacs.",
    shortDescription: "Acier trempé chirurgical • Gravure laser KÔRNER • Poids lourd 180g",
    details: {
      composition: "100% Acier inoxydable chirurgical brossé",
      fit: "Longueur totale 24 cm",
      weight: "180g massif",
      care: "Résistant à l'eau et à la rouille.",
      origin: "KÔRNER Hardware"
    },
    sizes: [
      { size: "TU", stock: 32 }
    ],
    colors: [
      { name: "Argent Brossé", hex: "#D4D4D4" },
      { name: "Noir PVD", hex: "#1A1A1A" }
    ],
    badges: ["HARDWARE"],
    rating: 4.9,
    reviewsCount: 38
  }
];

export const CATEGORIES = [
  { id: "all", label: "TOUT LE DROP", count: 20 },
  { id: "t-shirts", label: "T-SHIRTS", count: 5 },
  { id: "hoodies", label: "HOODIES", count: 4 },
  { id: "cargos", label: "PANTALONS & CARGOS", count: 3 },
  { id: "vestes", label: "VESTES & TECHWEAR", count: 3 },
  { id: "casquettes", label: "CASQUETTES & BONNETS", count: 2 },
  { id: "accessoires", label: "ACCESSOIRES", count: 3 },
];
