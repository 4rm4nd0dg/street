import type { Metadata } from "next";
import { Anton, Epilogue, Space_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/context/Providers";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-epilogue",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KÔRNER™ — Streetwear Urbain Brutaliste & Éditions Limitées",
  description:
    "KÔRNER™ Clothing Lab — Streetwear d'avant-garde, coupes boxy, heavyweight cotton 350+ GSM et drops ultra-limités. Abidjan — Paris.",
  openGraph: {
    title: "KÔRNER™ — Streetwear Urbain Brutaliste",
    description:
      "Streetwear d'avant-garde, coupes boxy, heavyweight cotton et drops ultra-limités.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${anton.variable} ${epilogue.variable} ${spaceMono.variable}`}
    >
      <body className="min-h-screen bg-[#F5F2EA] text-[#0A0A0A] font-sans antialiased selection:bg-[#E6FF00] selection:text-[#0A0A0A]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
