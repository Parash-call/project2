import React, { useState } from 'react';
import { Smile, Flame, Sparkles, Copy, Check, Shuffle } from 'lucide-react';
import { SISTER_CONFIG } from '../data/config';
import { sounds } from '../utils/audioSynthesizer';

export default function BanterMachine() {
  const [mode, setMode] = useState('roast'); // 'roast' | 'pamper'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const list = mode === 'roast' ? SISTER_CONFIG.roasts : SISTER_CONFIG.praises;

  const handleNext = () => {
    sounds.playPop();
    setCurrentIndex((prev) => (prev + 1) % list.length);
  };

  const handleCopy = () => {
    sounds.playPop();
    navigator.clipboard?.writeText(list[currentIndex]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
          <Smile className="w-4 h-4 text-amber-400" />
          <span>Sibling Banter & Love</span>
        </div>
        <h2 className="font-festive text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-rose-400">
          The Sibling Mood Generator 😂💖
        </h2>
        <p className="text-slate-300 text-sm max-w-lg mx-auto">
          Switch between playful brother-sister roasts and heartwarming sibling compliments!
        </p>
      </div>

      <div className="bg-slate-900 border-2 border-amber-500/30 rounded-3xl p-6 sm:p-8 cartoon-card shadow-2xl space-y-6">
        {/* Toggle Mode Buttons */}
        <div className="flex justify-center gap-3">
          <button
            onClick={() => {
              setMode('roast');
              setCurrentIndex(0);
              sounds.playPop();
            }}
            className={`cartoon-btn px-6 py-2.5 rounded-2xl font-cartoon font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
              mode === 'roast'
                ? 'bg-rose-500 text-white scale-105 shadow-md shadow-rose-500/30'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>Roast Shikha 😂</span>
          </button>

          <button
            onClick={() => {
              setMode('pamper');
              setCurrentIndex(0);
              sounds.playPop();
            }}
            className={`cartoon-btn px-6 py-2.5 rounded-2xl font-cartoon font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
              mode === 'pamper'
                ? 'bg-amber-500 text-slate-950 scale-105 shadow-md shadow-amber-500/30'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Pamper Shikha 🌸</span>
          </button>
        </div>

        {/* Dynamic Quote Box */}
        <div
          className={`p-6 sm:p-8 rounded-2xl border-2 text-center transition-all min-h-[140px] flex items-center justify-center relative ${
            mode === 'roast'
              ? 'bg-rose-950/20 border-rose-500/40 text-rose-100'
              : 'bg-amber-950/20 border-amber-500/40 text-amber-100'
          }`}
        >
          <p className="font-cartoon text-lg sm:text-xl font-bold leading-relaxed max-w-lg">
            "{list[currentIndex]}"
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={handleNext}
            className="cartoon-btn px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-cartoon font-bold text-xs flex items-center gap-2"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Another One!</span>
          </button>

          <button
            onClick={handleCopy}
            className="cartoon-btn px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-cartoon font-bold text-xs flex items-center gap-2"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Quote'}</span>
          </button>
        </div>
      </div>
    </section>
  );
}

