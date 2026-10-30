import { Suspense } from "react";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import { ProductDetailClient } from "./ProductDetailClient";
import type { Metadata } from "next";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({
    id: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.slug === id || p.id === id);
  if (!product) return {};

  return {
    title: `${product.name} — KÔRNER™ Clothing Lab`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} — KÔRNER™`,
      description: product.description,
      images: [product.images[0]],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.slug === id || p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F5F2EA] flex items-center justify-center font-mono">
          CHARGEMENT DE LA PIÈCE...
        </div>
      }
    >
      <ProductDetailClient product={product} />
    </Suspense>
  );
}
