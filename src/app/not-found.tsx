import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F5F2EA] flex flex-col items-center justify-center p-6 text-[#0A0A0A]">
      <div className="max-w-lg w-full bg-white border-4 border-black brutal-shadow-lg p-8 text-center space-y-6">
        <div className="w-20 h-20 bg-[#FF4D00] text-white border-3 border-black brutal-shadow mx-auto flex items-center justify-center">
          <AlertTriangle className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs font-bold bg-black text-[#E6FF00] px-3 py-1 uppercase">
            ERREUR 404 // DEAD END
          </span>
          <h1 className="font-display text-6xl uppercase tracking-tight">
            PERDU DANS LE DISTRICT
          </h1>
          <p className="font-body text-xs sm:text-sm text-[#555] leading-relaxed">
            Cette page n&apos;existe plus ou a été retirée du catalogue. Reprenez la bonne direction ci-dessous.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="brutal-btn brutal-btn-primary flex items-center justify-center gap-2 py-3"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETOUR À L&apos;ACCUEIL</span>
          </Link>
          <Link
            href="/boutique"
            className="brutal-btn brutal-btn-secondary py-3 text-center"
          >
            EXPLORER LE DROP
          </Link>
        </div>
      </div>
    </div>
  );
}
