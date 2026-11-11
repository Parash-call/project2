import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import { Palette, Download, Sparkles, Heart, Flame, Image as ImageIcon } from 'lucide-react';
import { SISTER_CONFIG } from '../data/config';
import { sounds } from '../utils/audioSynthesizer';

export default function GreetingCardMaker() {
  const cardRef = useRef(null);
  const allPhotos = SISTER_CONFIG.photos.gallery;
  const [selectedPhoto, setSelectedPhoto] = useState(allPhotos[0]?.src || SISTER_CONFIG.photos.heroPortrait);
  const [theme, setTheme] = useState('royal'); // 'royal' | 'gold' | 'rose' | 'twilight'
  const [customWish, setCustomWish] = useState(
    "To the best sister from another mother! Thank you for the endless laughs since 11th class. Happy Bhai Dooj, Shikha! ❤️"
  );
  const [senderName, setSenderName] = useState(SISTER_CONFIG.brotherName);
  const [selectedSticker, setSelectedSticker] = useState("🪔");
  const [isDownloading, setIsDownloading] = useState(false);

  const themes = {
    royal: 'from-purple-950 via-slate-900 to-indigo-950 border-amber-400',
    gold: 'from-amber-950 via-amber-900 to-yellow-950 border-amber-300',
    rose: 'from-rose-950 via-slate-900 to-pink-950 border-rose-400',
    twilight: 'from-slate-950 via-blue-950 to-slate-900 border-amber-400'
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);
    sounds.playCelebration();

    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2.5,
      });

      const link = document.createElement('a');
      link.download = `Shikha_Sapkota_Bhai_Dooj_Card_2026.png`;
      link.href = dataUrl;
      link.click();

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.warn("Card download error:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section id="card-maker" className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
          <Palette className="w-4 h-4 text-amber-400" />
          <span>html-to-image Card Studio</span>
        </div>
        <h2 className="font-festive text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-rose-400">
          Design & Download Shikha's Greeting Card 🎨
        </h2>
        <p className="text-slate-300 text-sm max-w-xl mx-auto">
          Personalize a high-resolution Bhai Dooj card for Shikha Sapkota, select your favorite photo of her, and download it straight to your device!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Controls & Customization */}
        <div className="lg:col-span-5 bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 cartoon-card space-y-5">
          <h3 className="font-cartoon text-lg font-bold text-amber-300">
            Card Customization Controls
          </h3>

          {/* Photo Selector for the Greeting Card */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">
              Select Shikha's Photo for Card:
            </label>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {allPhotos.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedPhoto(p.src);
                    sounds.playPop();
                  }}
                  className={`w-12 h-12 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                    selectedPhoto === p.src
                      ? 'border-amber-400 scale-105 shadow-md shadow-amber-400/40 ring-2 ring-amber-400/50'
                      : 'border-slate-700 opacity-60 hover:opacity-100'
                  }`}
                  title={p.title}
                >
                  <img src={p.src} alt={p.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Theme Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">
              Color Theme:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'royal', label: '👑 Royal Purple' },
                { id: 'gold', label: '🪔 Golden Festive' },
                { id: 'rose', label: '🌸 Rose Pink' },
                { id: 'twilight', label: '✨ Midnight Starry' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                    sounds.playPop();
                  }}
                  className={`py-2 px-3 rounded-xl text-xs font-cartoon font-bold border transition-all ${
                    theme === t.id
                      ? 'bg-amber-500 text-slate-950 border-amber-400'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sticker Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">
              Festival Sticker Badge:
            </label>
            <div className="flex gap-2">
              {['🪔', '🍬', '✨', '🌸', '👑', '🫂'].map((stk) => (
                <button
                  key={stk}
                  onClick={() => {
                    setSelectedSticker(stk);
                    sounds.playPop();
                  }}
                  className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center border transition-all ${
                    selectedSticker === stk
                      ? 'bg-amber-500/20 border-amber-400 scale-110'
                      : 'bg-slate-800 border-slate-700 hover:border-amber-400/50'
                  }`}
                >
                  {stk}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Message input */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Personalized Wish Message:
            </label>
            <textarea
              rows={3}
              value={customWish}
              onChange={(e) => setCustomWish(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:border-amber-400 focus:outline-none"
            />
          </div>

          {/* Brother Name input */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Brother's Name / Signature:
            </label>
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:border-amber-400 focus:outline-none"
            />
          </div>

          {/* Download Action Button */}
          <div className="pt-2">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="w-full cartoon-btn py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-cartoon font-bold text-sm flex items-center justify-center gap-2 hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-500/25"
            >
              <Download className="w-4 h-4" />
              <span>{isDownloading ? 'Generating High-Res Card...' : 'Download Card as Image (PNG)'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Live Printable Card Preview */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="text-xs text-slate-400 mb-2 font-medium">
            Live Card Preview (Ready for Download):
          </div>

          {/* The Actual Card DOM Node rendered by html-to-image */}
          <div
            ref={cardRef}
            className={`w-full max-w-md bg-gradient-to-b ${themes[theme]} border-4 rounded-3xl p-6 sm:p-8 text-center shadow-2xl relative overflow-hidden`}
          >
            {/* Corner Decorative Ornaments */}
            <span className="absolute top-2 left-2 text-sm text-amber-300 opacity-60">⚜️</span>
            <span className="absolute top-2 right-2 text-sm text-amber-300 opacity-60">⚜️</span>
            <span className="absolute bottom-2 left-2 text-sm text-amber-300 opacity-60">⚜️</span>
            <span className="absolute bottom-2 right-2 text-sm text-amber-300 opacity-60">⚜️</span>

            {/* Top Festival Tag */}
            <div className="inline-block px-3 py-1 bg-amber-500/20 border border-amber-400/40 rounded-full text-[10px] font-bold text-amber-300 uppercase tracking-widest mb-3">
              Happy Bhai Dooj 2026 {selectedSticker}
            </div>

            {/* Title */}
            <h3 className="font-festive text-2xl sm:text-3xl font-extrabold text-amber-300 mb-1">
              Shikha Sapkota
            </h3>
            <p className="text-xs text-rose-300 font-medium mb-4">
              ✨ Sister From Another Mother • Since 11th Class ✨
            </p>

            {/* Sister Photo Frame */}
            <div className="w-44 h-44 mx-auto rounded-full p-1.5 bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-500 shadow-xl mb-4">
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border-2 border-amber-300">
                <img
                  src={selectedPhoto}
                  alt={SISTER_CONFIG.sisterName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/photos/sister.jpg";
                  }}
                />
              </div>
            </div>

            {/* Wish Quote */}
            <div className="bg-slate-950/70 p-4 rounded-2xl border border-amber-400/30 text-xs sm:text-sm text-slate-100 font-handwritten text-lg leading-relaxed mb-4">
              "{customWish}"
            </div>

            {/* Signature */}
            <div className="pt-2 border-t border-amber-500/30 flex items-center justify-between text-xs text-amber-200">
              <span className="font-bold flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                With brotherly love,
              </span>
              <span className="font-cartoon font-bold text-amber-300">
                {senderName} 🤜🤛
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
