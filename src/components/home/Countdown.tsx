"use client";

import React, { useState, useEffect } from "react";
import { Timer, Zap, Bell } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 14,
    minutes: 42,
    seconds: 19,
  });

  const { showToast } = useToast();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      showToast("Veuillez entrer une adresse e-mail valide.", "error");
      return;
    }
    showToast("Accès VIP DROP #05 réservé ! Rendez-vous dans 3 jours.", "success");
    setEmail("");
  };

  return (
    <section className="bg-[#0A0A0A] text-[#F5F2EA] border-y-3 border-black py-12 md:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Slogan & Drop Title */}
          <div className="space-y-3 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E6FF00] text-black font-mono text-xs font-bold uppercase tracking-widest border-2 border-black rotate-[-1deg]">
              <Zap className="w-3.5 h-3.5 fill-black" />
              <span>PROCHAIN DROP SECRET // ÉDITION #05</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-white leading-none">
              &quot;ASPHALTE &amp; ACIER&quot;
            </h2>
            <p className="font-body text-xs sm:text-sm text-[#8A8A8A] max-w-lg">
              100 hoodies numérotés 500 GSM, vestes tactiques modulaires et accessoires en argent brossé. Aucune précommande, premier arrivé, premier servi.
            </p>
          </div>

          {/* Brutal Countdown Digits */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex flex-col items-center bg-[#141414] border-3 border-white/20 brutal-shadow-neon p-2.5 sm:p-4 min-w-[70px] sm:min-w-[90px]">
              <span className="font-mono text-3xl sm:text-5xl font-black text-[#E6FF00]">
                {String(timeLeft.days).padStart(2, "0")}
              </span>
              <span className="font-mono text-[10px] text-[#8A8A8A] uppercase tracking-wider font-bold">
                JOURS
              </span>
            </div>
            <span className="font-mono text-2xl text-[#E6FF00] font-bold">:</span>
            <div className="flex flex-col items-center bg-[#141414] border-3 border-white/20 brutal-shadow-neon p-2.5 sm:p-4 min-w-[70px] sm:min-w-[90px]">
              <span className="font-mono text-3xl sm:text-5xl font-black text-[#E6FF00]">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="font-mono text-[10px] text-[#8A8A8A] uppercase tracking-wider font-bold">
                HEURES
              </span>
            </div>
            <span className="font-mono text-2xl text-[#E6FF00] font-bold">:</span>
            <div className="flex flex-col items-center bg-[#141414] border-3 border-white/20 brutal-shadow-neon p-2.5 sm:p-4 min-w-[70px] sm:min-w-[90px]">
              <span className="font-mono text-3xl sm:text-5xl font-black text-[#E6FF00]">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="font-mono text-[10px] text-[#8A8A8A] uppercase tracking-wider font-bold">
                MINUTES
              </span>
            </div>
            <span className="font-mono text-2xl text-[#E6FF00] font-bold">:</span>
            <div className="flex flex-col items-center bg-[#141414] border-3 border-[#FF4D00] brutal-shadow-orange p-2.5 sm:p-4 min-w-[70px] sm:min-w-[90px]">
              <span className="font-mono text-3xl sm:text-5xl font-black text-[#FF4D00]">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
              <span className="font-mono text-[10px] text-[#FF4D00] uppercase tracking-wider font-bold">
                SECONDES
              </span>
            </div>
          </div>

          {/* Quick Notification RSVP */}
          <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre-email@crew.com"
              className="bg-[#141414] border-2 border-white/40 px-3 py-2 text-xs font-mono text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#E6FF00]"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#E6FF00] text-black font-mono text-xs font-bold uppercase border-2 border-[#E6FF00] hover:bg-white transition-colors cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>M&apos;AVERTIR EN PREMIER</span>
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}
