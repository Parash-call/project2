import React from 'react';
import { Heart, Sparkles, ArrowUp, Flame } from 'lucide-react';
import { SISTER_CONFIG } from '../data/config';
import { sounds } from '../utils/audioSynthesizer';

export default function Footer({ onLightDiya, onReopenOpening }) {
  const scrollToTop = () => {
    sounds.playPop();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-amber-500/20 bg-slate-950/90 text-slate-400 relative overflow-hidden">
      {/* Decorative Bottom Marigold Band */}
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          {/* Logo & Tribute */}
          <div className="space-y-2">
            <h3 className="font-cartoon font-bold text-lg text-amber-300 flex items-center justify-center md:justify-start gap-2">
              <span>🪔</span>
              <span>A Magical World for Shikha Sapkota</span>
              <span className="text-rose-500">❤️</span>
            </h3>
            <p className="text-xs text-slate-400 max-w-md">
              From that first text in 11th class online lectures, to 12th grade exam panic, to staying inseparable across different cities today.
            </p>
          </div>

          {/* Quick Diya Blessings & Opening Screen Button */}
          <div className="flex items-center gap-3">
            {onReopenOpening && (
              <button
                onClick={() => {
                  sounds.playPop();
                  onReopenOpening();
                }}
                className="cartoon-btn px-4 py-2 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 font-cartoon font-bold text-xs flex items-center gap-2 hover:bg-rose-500/30"
              >
                <span>Replay Opening Surprise 💌</span>
              </button>
            )}

            <button
              onClick={() => {
                onLightDiya();
                sounds.playBell();
              }}
              className="cartoon-btn px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-cartoon font-bold text-xs flex items-center gap-2 hover:bg-amber-500/30"
            >
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Light a Diya 🪔</span>
            </button>

            <button
              onClick={scrollToTop}
              className="cartoon-btn p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Credits & Heartwarming Notice */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p className="flex items-center gap-1.5">
            Crafted with deep love & gratitude for my favorite sister from another mother.
          </p>
          <p className="font-semibold text-amber-400/80">
            Happy Bhai Dooj 2026 • Forever Siblings 🤜🤛
          </p>
        </div>
      </div>
    </footer>
  );
}

