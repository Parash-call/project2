import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Flame, Star, Gift, BookOpen, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { SISTER_CONFIG } from '../data/config';
import { sounds } from '../utils/audioSynthesizer';

export default function HeroSection({ onOpenLetter, onLightDiya }) {
  const allPhotos = SISTER_CONFIG.photos.gallery;
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto-slideshow effect
  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      setCurrentPhotoIdx((prev) => (prev + 1) % allPhotos.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isAutoPlay, allPhotos.length]);

  const handleNextPhoto = () => {
    sounds.playPop();
    setCurrentPhotoIdx((prev) => (prev + 1) % allPhotos.length);
  };

  const handlePrevPhoto = () => {
    sounds.playPop();
    setCurrentPhotoIdx((prev) => (prev - 1 + allPhotos.length) % allPhotos.length);
  };

  const triggerConfetti = () => {
    sounds.playCelebration();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#E11D48', '#8B5CF6', '#10B981', '#FBBF24']
    });
  };

  const currentPhoto = allPhotos[currentPhotoIdx];

  return (
    <section className="relative pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Decorative Background Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Festival Ribbon */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-purple-500/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-bold tracking-wide uppercase shadow-inner animate-bounce-gentle">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Special Bhai Dooj Surprise Edition</span>
          <Sparkles className="w-4 h-4 text-rose-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Story & Titles */}
        <div className="lg:col-span-7 text-center lg:text-left space-y-6">
          <div className="space-y-3">
            <span className="inline-block px-3 py-1 bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-semibold rounded-full">
              ✨ Sister From Another Mother • Since 11th Class ✨
            </span>
            <h1 className="font-festive text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-rose-400 leading-tight">
              A Magical World for <br />
              <span className="font-cartoon text-white drop-shadow-[0_4px_12px_rgba(245,158,11,0.6)]">
                {SISTER_CONFIG.sisterName}
              </span>{' '}
              <span className="text-rose-500 inline-block animate-pulse">❤️</span>
            </h1>
            <p className="text-amber-100/80 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
              We weren't born under the same roof, but in <strong className="text-amber-300">11th class online lectures</strong>, that very first text message changed everything. From talking every single day, collecting countless <strong className="text-rose-300">11th & 12th class memories</strong>, to staying inseparable across <strong className="text-amber-300">different cities today</strong>—this bond is forever.
            </p>
          </div>

          {/* Nickname Tags */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-2 pt-1">
            {SISTER_CONFIG.nicknames.map((nick, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs font-semibold rounded-full bg-slate-800/90 border border-amber-500/30 text-amber-200/90 shadow-sm hover:border-rose-400 hover:scale-105 transition-all cursor-default"
              >
                {nick}
              </span>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-4">
            <a
              href="#ceremony"
              onClick={() => sounds.playPop()}
              className="cartoon-btn px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-cartoon font-bold text-base flex items-center gap-2 hover:from-amber-400 hover:to-amber-500 transform hover:-translate-y-0.5 shadow-lg shadow-amber-500/25"
            >
              <Flame className="w-5 h-5 text-slate-950 fill-slate-950" />
              <span>Perform Virtual Ceremony</span>
            </a>

            <button
              onClick={() => {
                onOpenLetter();
                sounds.playPop();
              }}
              className="cartoon-btn px-6 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-purple-600 text-white font-cartoon font-bold text-base flex items-center gap-2 hover:from-rose-500 hover:to-purple-500 shadow-lg shadow-rose-600/25"
            >
              <Heart className="w-5 h-5 fill-white text-white" />
              <span>Read Brother's Letter</span>
            </button>

            <button
              onClick={triggerConfetti}
              className="cartoon-btn px-4 py-3.5 rounded-2xl bg-slate-800/90 border border-amber-400/40 text-amber-300 font-cartoon font-bold text-sm flex items-center gap-2 hover:bg-slate-700"
              title="Celebrate with festive fireworks!"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Burst Confetti 🎉</span>
            </button>
          </div>

          {/* Quick Stat Highlights */}
          <div className="grid grid-cols-3 gap-3 pt-4 max-w-lg mx-auto lg:mx-0">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-center cartoon-card">
              <div className="text-xl sm:text-2xl font-bold font-cartoon text-amber-400">11th Class</div>
              <div className="text-[11px] text-slate-400 font-medium">Where It Began 🏫</div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-center cartoon-card">
              <div className="text-xl sm:text-2xl font-bold font-cartoon text-rose-400">100%</div>
              <div className="text-[11px] text-slate-400 font-medium">Heart Sibling Bond ❤️</div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-center cartoon-card">
              <div className="text-xl sm:text-2xl font-bold font-cartoon text-purple-400">Forever</div>
              <div className="text-[11px] text-slate-400 font-medium">Brotherly Protection 🛡️</div>
            </div>
          </div>
        </div>

        {/* Right Column: Whimsical Cartoon Photo Frame with Gallery Slider */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative w-72 sm:w-80 md:w-96 group">
            {/* Whimsical Floating Stickers */}
            <div className="absolute -top-6 -left-6 z-20 bg-amber-400 text-slate-950 font-cartoon font-bold text-xs px-3 py-1.5 rounded-full shadow-lg transform -rotate-12 cartoon-btn flex items-center gap-1">
              <span>🪔 Bhai Dooj 2026</span>
            </div>
            <div className="absolute -bottom-4 -right-4 z-20 bg-rose-500 text-white font-cartoon font-bold text-xs px-3 py-1.5 rounded-full shadow-lg transform rotate-6 cartoon-btn flex items-center gap-1">
              <span>Best Sister Ever 👑</span>
            </div>

            {/* Glowing Golden Garland Frame */}
            <div className="relative p-3 rounded-3xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 shadow-2xl cartoon-card">
              <div className="relative rounded-2xl overflow-hidden bg-slate-950 border-4 border-amber-300/80 aspect-[4/5] flex items-center justify-center">
                <img
                  src={currentPhoto.src}
                  alt={currentPhoto.title}
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = "/photos/sister.jpg";
                  }}
                />

                {/* Ambient Warm Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                {/* Left/Right Photo Arrow Controls */}
                <button
                  onClick={handlePrevPhoto}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/70 hover:bg-amber-500 text-white hover:text-slate-950 transition-colors shadow-lg z-20"
                  aria-label="Previous Photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={handleNextPhoto}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/70 hover:bg-amber-500 text-white hover:text-slate-950 transition-colors shadow-lg z-20"
                  aria-label="Next Photo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Bottom Frame Badge */}
                <div className="absolute bottom-4 left-4 right-4 text-center z-10 bg-slate-950/85 backdrop-blur-md rounded-xl p-2.5 border border-amber-400/30">
                  <div className="flex items-center justify-between text-[10px] text-amber-400 font-bold mb-0.5">
                    <span>{currentPhoto.tag}</span>
                    <span>{currentPhotoIdx + 1} / {allPhotos.length}</span>
                  </div>
                  <h3 className="font-cartoon text-sm sm:text-base font-bold text-amber-300">
                    {currentPhoto.title}
                  </h3>
                  <p className="text-[10px] text-rose-300 font-medium">
                    "Sister from another mother, friend for a lifetime"
                  </p>
                </div>
              </div>
            </div>

            {/* Cute Cartoon Floating Emblems */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center text-lg shadow-lg animate-bounce-gentle">
              ✨
            </div>
            <div className="absolute -right-3 top-1/3 w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center text-lg shadow-lg animate-float-slow">
              🌸
            </div>
          </div>

          {/* Gallery Thumbnails & Auto-play Control */}
          <div className="mt-6 flex flex-col items-center gap-3">
            {/* Thumbnail Circles */}
            <div className="flex items-center gap-2 overflow-x-auto p-1.5 bg-slate-900/90 rounded-2xl border border-amber-500/30">
              {allPhotos.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setCurrentPhotoIdx(idx);
                    sounds.playPop();
                  }}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    currentPhotoIdx === idx
                      ? 'border-amber-400 scale-110 shadow-md shadow-amber-400/40'
                      : 'border-slate-700 opacity-60 hover:opacity-100'
                  }`}
                  title={p.title}
                >
                  <img src={p.src} alt={p.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Slideshow Toggle Button */}
            <button
              onClick={() => {
                setIsAutoPlay(!isAutoPlay);
                sounds.playPop();
              }}
              className="text-[11px] font-cartoon font-semibold text-amber-300/80 hover:text-amber-300 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700"
            >
              {isAutoPlay ? <Pause className="w-3 h-3 text-rose-400" /> : <Play className="w-3 h-3 text-amber-400" />}
              <span>{isAutoPlay ? 'Pause Photo Slideshow' : 'Play Photo Slideshow'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
