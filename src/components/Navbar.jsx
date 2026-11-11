import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Heart, Menu, X, Flame, Mail } from 'lucide-react';
import { sounds } from '../utils/audioSynthesizer';
import { SISTER_CONFIG } from '../data/config';

export default function Navbar({ diyaCount, onLightDiya, onReopenOpening }) {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMusic = () => {
    const isPlaying = sounds.toggleBgm();
    setIsPlayingMusic(isPlaying);
    sounds.playPop();
  };

  const navLinks = [
    { label: "🪔 Bhai Dooj Ritual", href: "#ceremony" },
    { label: "📖 Our Story", href: "#story" },
    { label: "✨ Scratch Card", href: "#scratch" },
    { label: "🧠 Sibling Quiz", href: "#quiz" },
    { label: "🎟️ Coupons", href: "#coupons" },
    { label: "📸 Polaroids", href: "#memories" },
    { label: "💌 Sister's Note", href: "#sister-reply" },
    { label: "🎨 Greeting Card", href: "#card-maker" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-amber-500/20 shadow-lg">
      {/* Decorative Marigold Garland Top Bar */}
      <div className="h-2 w-full bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 flex justify-around overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <span key={i} className="text-[10px] transform -translate-y-1">🌼</span>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo / Title */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-rose-600 flex items-center justify-center text-xl shadow-md transform group-hover:scale-110 transition-transform">
            🪔
          </div>
          <div>
            <h1 className="font-cartoon font-bold text-base sm:text-lg text-amber-300 flex items-center gap-1.5 leading-tight">
              Shikha Sapkota <span className="text-rose-400">❤️</span>
            </h1>
            <p className="text-[11px] text-amber-200/70 font-medium">Bhai Dooj Surprise World</p>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => sounds.playPop()}
              className="px-3 py-1.5 text-xs xl:text-sm font-semibold rounded-full text-slate-200 hover:text-amber-300 hover:bg-white/5 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Replay Opening Gate Button */}
          {onReopenOpening && (
            <button
              onClick={() => {
                sounds.playPop();
                onReopenOpening();
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 transition-all text-xs font-bold shadow-sm"
              title="Return to the opening surprise screen"
            >
              <Mail className="w-3.5 h-3.5 text-rose-400" />
              <span>Opening Page</span>
            </button>
          )}

          {/* Diya Counter & Quick Blessing */}
          <button
            onClick={() => {
              onLightDiya();
              sounds.playBell();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition-all text-xs font-bold shadow-sm"
            title="Click to light another Diya and shower blessings!"
          >
            <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse fill-amber-400" />
            <span>{diyaCount} Diyas</span>
          </button>

          {/* Festive Ambient Music Player Toggle */}
          <button
            onClick={toggleMusic}
            className={`p-2 rounded-full border transition-all text-xs flex items-center gap-1 ${
              isPlayingMusic
                ? 'bg-rose-500 text-white border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.6)] animate-pulse'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-amber-400'
            }`}
            title={isPlayingMusic ? "Mute Festive Melody" : "Play Festive Indian Melody"}
          >
            {isPlayingMusic ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline font-semibold">{isPlayingMusic ? 'Music ON' : 'Music OFF'}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-amber-300"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-amber-500/30 px-4 py-4 space-y-2">
          {onReopenOpening && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                sounds.playPop();
                onReopenOpening();
              }}
              className="w-full text-left px-3 py-2 text-sm font-semibold rounded-lg text-rose-300 hover:bg-rose-500/20 flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Replay Opening Surprise Screen</span>
            </button>
          )}

          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => {
                setMobileMenuOpen(false);
                sounds.playPop();
              }}
              className="block px-3 py-2 text-sm font-semibold rounded-lg text-slate-200 hover:bg-amber-500/20 hover:text-amber-300 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
