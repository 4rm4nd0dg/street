"use client";

import React, { useState } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { useToast } from "@/context/ToastContext";
import { Send, MapPin, Phone, MessageSquare, Clock, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const { showToast } = useToast();
  const [isSent, setIsSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "SAV & Suivi de commande",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast("Veuillez remplir tous les champs obligatoires.", "error");
      return;
    }
    setIsSent(true);
    showToast("Message envoyé avec succès au support KÔRNER !", "success");
    setFormData({ name: "", email: "", subject: "SAV & Suivi de commande", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F2EA] text-[#0A0A0A]">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="space-y-4 mb-10 pb-6 border-b-3 border-black text-center sm:text-left">
          <span className="font-mono text-xs font-bold text-[#FF4D00] uppercase tracking-widest block">
            // SUPPORT TECHNIQUE // DISTRICT CREW
          </span>
          <h1 className="font-display text-4xl sm:text-6xl uppercase leading-none">
            CONTACTER LE LAB
          </h1>
          <p className="font-body text-xs sm:text-sm text-[#666] max-w-xl">
            Une question sur une coupe, un délai de livraison ou un partenariat ? Écrivez-nous ou échangez en direct sur WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 border-3 border-black brutal-shadow">
            {isSent ? (
              <div className="p-8 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#FF4D00] mx-auto" />
                <h3 className="font-display text-2xl uppercase">MESSAGE TRANSMIS !</h3>
                <p className="font-mono text-xs text-[#555]">
                  Notre équipe du lab vous répondra sous 2 à 4 heures ouvrées.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="brutal-btn brutal-btn-primary"
                >
                  ENVOYER UN AUTRE MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs font-bold uppercase mb-1">
                      Votre Nom *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Koffi Kouamé"
                      required
                      className="w-full p-2.5 font-mono text-xs border-2 border-black bg-white focus:outline-none focus:border-[#E6FF00]"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-bold uppercase mb-1">
                      Votre E-mail *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="koffi@district.ci"
                      required
                      className="w-full p-2.5 font-mono text-xs border-2 border-black bg-white focus:outline-none focus:border-[#E6FF00]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">
                    Objet de la demande
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full p-2.5 font-mono text-xs border-2 border-black bg-white"
                  >
                    <option value="SAV & Suivi de commande">SAV &amp; Suivi de commande</option>
                    <option value="Conseil de taille (Boxy Fit)">Conseil de taille (Boxy Fit)</option>
                    <option value="Question sur le prochain Drop #05">Question sur le prochain Drop #05</option>
                    <option value="Presse & Collaboration créative">Presse &amp; Collaboration créative</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">
                    Votre Message *
                  </label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Détaillez votre question ou indiquez votre numéro de commande..."
                    required
                    className="w-full p-2.5 font-mono text-xs border-2 border-black bg-white focus:outline-none focus:border-[#E6FF00]"
                  />
                </div>

                <button
                  type="submit"
                  className="brutal-btn brutal-btn-primary w-full py-4 text-center text-sm font-bold flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>TRANSMETTRE AU STUDIO</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Direct Channels & Hub Addresses */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp Direct Help */}
            <div className="bg-[#E6FF00] p-6 border-3 border-black brutal-shadow space-y-3">
              <div className="flex items-center gap-2 font-display text-2xl uppercase text-black">
                <MessageSquare className="w-6 h-6" />
                <span>ASSISTANCE WHATSAPP RAPIDE</span>
              </div>
              <p className="font-body text-xs text-neutral-800 leading-relaxed">
                Besoin d&apos;une réponse immédiate sur une taille ou votre statut de livraison ? Envoyez un message direct à notre équipe locale.
              </p>
              <a
                href="https://wa.me/2250700000000"
                target="_blank"
                rel="noreferrer"
                className="brutal-btn brutal-btn-dark w-full text-center flex items-center justify-center gap-2 py-3"
              >
                <span>OUVRIR WHATSAPP (+225 07 00 00 00)</span>
              </a>
            </div>

            {/* Hub Addresses */}
            <div className="bg-white p-6 border-3 border-black brutal-shadow space-y-4">
              <h3 className="font-display text-xl uppercase border-b-2 border-black pb-2">
                NOS ATELIERS &amp; HUBS
              </h3>

              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#FF4D00] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-black uppercase">HUB PRINCIPAL // ABIDJAN :</strong>
                    <span className="text-neutral-600">Rue des Jardins, II Plateaux Vallons, Abidjan, Côte d&apos;Ivoire</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#FF4D00] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-black uppercase">STUDIO DESIGN // PARIS :</strong>
                    <span className="text-neutral-600">14 Rue de la Roquette, 75011 Paris, France</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-black flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-black uppercase">HORAIRES DU SUPPORT :</strong>
                    <span className="text-neutral-600">Lundi au Samedi : 09h00 - 20h00 (GMT)</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
