import React from 'react';
import { X, Heart, Sparkles, Feather } from 'lucide-react';
import { SISTER_CONFIG } from '../data/config';
import { sounds } from '../utils/audioSynthesizer';

export default function LetterModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const letter = SISTER_CONFIG.letter;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative max-w-2xl w-full bg-gradient-to-b from-[#FFFBEB] to-[#FEF3C7] text-slate-900 border-4 border-amber-600 rounded-3xl p-6 sm:p-10 shadow-2xl cartoon-card my-8 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => {
            onClose();
            sounds.playPop();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-amber-200/80 hover:bg-amber-300 text-amber-950 transition-colors"
          aria-label="Close Letter"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Decorative Festive Header Seal */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-14 h-14 rounded-full bg-rose-600 text-amber-100 flex items-center justify-center text-2xl shadow-lg border-2 border-amber-300">
            🪔
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-1 mb-6">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-800">
            A Bhai Dooj Letter From Your Brother
          </span>
          <h3 className="font-festive text-2xl sm:text-3xl font-extrabold text-amber-950">
            {letter.greeting}
          </h3>
        </div>

        {/* Letter Body Paragraphs */}
        <div className="space-y-4 font-body text-slate-800 text-sm sm:text-base leading-relaxed">
          {letter.paragraphs.map((p, idx) => (
            <p key={idx} className="indent-4">
              {p}
            </p>
          ))}
        </div>

        {/* Sign-off */}
        <div className="mt-8 pt-6 border-t-2 border-dashed border-amber-400 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4">
          <div>
            <p className="text-xs text-amber-800 font-semibold">{letter.closing}</p>
            <p className="font-handwritten text-2xl font-bold text-amber-950">
              {letter.signature}
            </p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-600/15 border border-rose-600/30 text-rose-800 text-xs font-bold font-cartoon">
            <Heart className="w-4 h-4 fill-rose-600 text-rose-600" />
            <span>Since 11th Class & Forever</span>
          </div>
        </div>
      </div>
    </div>
  );
}

