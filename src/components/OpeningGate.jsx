import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Flame, Gift, ArrowRight } from 'lucide-react';
import { SISTER_CONFIG } from '../data/config';
import { sounds } from '../utils/audioSynthesizer';

export default function OpeningGate({ onEnter }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenSurprise = () => {
    setIsOpening(true);
    sounds.playCelebration();
    sounds.playBell();

    // Big festive confetti explosion
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#F59E0B', '#E11D48', '#8B5CF6', '#10B981', '#FBBF24']
    });

    // Auto trigger background ambient music
    sounds.startBgm();

    setTimeout(() => {
      onEnter();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#070b14] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Background Animated Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-600/15 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />

        {/* Floating Lanterns & Diyas */}
        {Array.from({ length: 15 }).map((_, i) => (
          <span
            key={i}
            className="absolute select-none opacity-40 animate-float-slow"
            style={{
              left: `${(i * 6.5) + (Math.random() * 3)}%`,
              top: `${(i * 7) % 85}%`,
              fontSize: `${18 + (i % 3) * 8}px`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${5 + (i % 4) * 2}s`
            }}
          >
            {i % 3 === 0 ? '🪔' : i % 3 === 1 ? '✨' : '🌸'}
          </span>
        ))}
      </div>

      {/* Main Opening Surprise Card Container */}
      <div
        className={`relative max-w-lg w-full transition-all duration-1000 transform ${
          isOpening ? 'scale-110 opacity-0 blur-sm pointer-events-none' : 'scale-100 opacity-100'
        }`}
      >
        {/* Decorative Top Garland */}
        <div className="flex justify-center items-center gap-1.5 mb-4">
          <span className="text-xl">🌼</span>
          <span className="text-xl">🌸</span>
          <span className="text-2xl animate-pulse">🪔</span>
          <span className="text-xl">🌸</span>
          <span className="text-xl">🌼</span>
        </div>

        {/* The Royal Envelope / Gift Box */}
        <div className="relative bg-gradient-to-b from-slate-900/95 via-purple-950/90 to-slate-900/95 border-3 border-amber-400/80 rounded-3xl p-6 sm:p-10 text-center shadow-[0_0_50px_rgba(245,158,11,0.25)] cartoon-card-gold relative overflow-hidden">
          {/* Corner traditional motifs */}
          <span className="absolute top-3 left-3 text-sm text-amber-300 opacity-60">⚜️</span>
          <span className="absolute top-3 right-3 text-sm text-amber-300 opacity-60">⚜️</span>
          <span className="absolute bottom-3 left-3 text-sm text-amber-300 opacity-60">⚜️</span>
          <span className="absolute bottom-3 right-3 text-sm text-amber-300 opacity-60">⚜️</span>

          {/* Top Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-cartoon font-bold mb-5 shadow-inner">
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
            <span>A Secret Bhai Dooj Delivery 💌</span>
          </div>

          {/* Sister Photo Avatar in Opening Screen */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-5">
            <div className="w-full h-full rounded-full p-1 bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-500 shadow-2xl animate-pulse-glow">
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-950 border-2 border-amber-300">
                <img
                  src={SISTER_CONFIG.photos.heroPortrait}
                  alt={SISTER_CONFIG.sisterName}
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    e.currentTarget.src = "/photos/sister1.jpg";
                  }}
                />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-rose-500 border border-white flex items-center justify-center text-sm shadow-md animate-bounce-gentle">
              ❤️
            </div>
          </div>

          {/* Big Greeting */}
          <div className="space-y-2 mb-6">
            <span className="text-xs uppercase font-bold tracking-widest text-rose-300">
              Specially Dedicated To
            </span>
            <h1 className="font-festive text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-rose-300">
              Shikha Sapkota
            </h1>
            <p className="font-cartoon text-sm text-amber-200/90 font-medium">
              "Sister from another mother • Bond that began in 11th class"
            </p>
          </div>

          {/* Story Prelude Teaser */}
          <div className="bg-slate-950/70 p-4 rounded-2xl border border-amber-500/30 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans mb-6 text-left space-y-2">
            <p className="flex items-start gap-2">
              <span className="text-amber-400 text-base">💌</span>
              <span>
                Remember 11th class online classes? That very first text message? From talking every day to 12th class exam panic, and now across different cities—this world was built just for you.
              </span>
            </p>
          </div>

          {/* Big Enter / Unseal Button */}
          <button
            onClick={handleOpenSurprise}
            disabled={isOpening}
            className="w-full cartoon-btn py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-cartoon font-bold text-base sm:text-lg flex items-center justify-center gap-3 shadow-xl shadow-amber-500/30 transform hover:scale-[1.02] active:scale-95 transition-all animate-bounce-gentle"
          >
            <Gift className="w-5 h-5 text-slate-950" />
            <span>Open Shikha's Magical World 🪔</span>
            <ArrowRight className="w-5 h-5 text-slate-950" />
          </button>

          <p className="text-[11px] text-amber-200/60 mt-3 font-medium">
            (Tap to reveal the virtual ceremony, long story, scratch card & vouchers)
          </p>
        </div>
      </div>
    </div>
  );
}

