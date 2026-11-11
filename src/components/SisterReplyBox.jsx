import React, { useState, useEffect, useRef } from 'react';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import { Heart, Send, CheckCircle2, Download, Sparkles, MessageCircleHeart, RotateCcw } from 'lucide-react';
import { SISTER_CONFIG } from '../data/config';
import { sounds } from '../utils/audioSynthesizer';

export default function SisterReplyBox() {
  const cardRef = useRef(null);
  const [replyText, setReplyText] = useState(
    "Happy Bhai Dooj to my brother! Thank you for that first text in 11th class and for all the laughs through 12th grade exams. Even though we live in different cities today, you will always be my forever brother and my favorite safe haven! ❤️"
  );
  const [selectedNick, setSelectedNick] = useState(SISTER_CONFIG.nicknames[0] || "Shikhu 🌸");
  const [selectedSticker, setSelectedSticker] = useState("🫂");
  const [isSaved, setIsSaved] = useState(false);
  const [savedDate, setSavedDate] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  // Load from localStorage if already saved
  useEffect(() => {
    try {
      const saved = localStorage.getItem('shikha_sister_reply');
      if (saved) {
        const data = JSON.parse(saved);
        setReplyText(data.text);
        setSelectedNick(data.nick);
        setSelectedSticker(data.sticker);
        setSavedDate(data.date);
        setIsSaved(true);
      }
    } catch (e) {
      console.warn("Reply load error", e);
    }
  }, []);

  const handleSaveReply = () => {
    sounds.playCelebration();
    const dateStr = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    const payload = {
      text: replyText,
      nick: selectedNick,
      sticker: selectedSticker,
      date: dateStr
    };
    try {
      localStorage.setItem('shikha_sister_reply', JSON.stringify(payload));
    } catch (e) {
      console.warn("Reply save error", e);
    }
    setSavedDate(dateStr);
    setIsSaved(true);

    confetti({
      particleCount: 120,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#E11D48', '#F59E0B', '#8B5CF6', '#10B981']
    });
  };

  const handleEditAgain = () => {
    sounds.playPop();
    setIsSaved(false);
  };

  const handleDownloadReply = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);
    sounds.playCelebration();

    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2.5
      });
      const link = document.createElement('a');
      link.download = `Shikha_Reply_To_Brother_Bhai_Dooj.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.warn("Download error", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section id="sister-reply" className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider">
          <MessageCircleHeart className="w-4 h-4 text-rose-400" />
          <span>Sister's Dedicated Corner</span>
        </div>
        <h2 className="font-festive text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-300 to-purple-400">
          Shikha's Reply Note to Her Brother 💌
        </h2>
        <p className="text-slate-300 text-sm max-w-lg mx-auto">
          Shikha, write a sweet Bhai Dooj reply or secret message back to your brother! Your note will be sealed and saved right here.
        </p>
      </div>

      <div className="bg-slate-900 border-2 border-rose-500/30 rounded-3xl p-6 sm:p-8 cartoon-card shadow-2xl space-y-6">
        {!isSaved ? (
          /* Edit Mode */
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Your Sister Reply Message:
              </label>
              <textarea
                rows={4}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write your personal words for your brother here..."
                className="w-full px-4 py-3 rounded-2xl bg-slate-950/80 border border-rose-500/40 text-slate-100 text-sm focus:border-amber-400 focus:outline-none leading-relaxed"
              />
            </div>

            {/* Signature Nickname Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                Choose Your Signature:
              </label>
              <div className="flex flex-wrap gap-2">
                {SISTER_CONFIG.nicknames.map((nick) => (
                  <button
                    key={nick}
                    onClick={() => {
                      setSelectedNick(nick);
                      sounds.playPop();
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-cartoon font-bold border transition-all ${
                      selectedNick === nick
                        ? 'bg-rose-500 text-white border-rose-400 shadow-md'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-rose-400/50'
                    }`}
                  >
                    {nick}
                  </button>
                ))}
              </div>
            </div>

            {/* Sticker selector */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                Add an Emotion Sticker:
              </label>
              <div className="flex gap-2">
                {['🫂', '🪔', '❤️', '🌸', '👑', '🍕'].map((stk) => (
                  <button
                    key={stk}
                    onClick={() => {
                      setSelectedSticker(stk);
                      sounds.playPop();
                    }}
                    className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center border transition-all ${
                      selectedSticker === stk
                        ? 'bg-rose-500/30 border-rose-400 scale-110 shadow-md'
                        : 'bg-slate-800 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    {stk}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 flex justify-center">
              <button
                onClick={handleSaveReply}
                className="cartoon-btn px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-cartoon font-bold text-sm flex items-center gap-2 hover:scale-105 shadow-xl shadow-rose-500/25"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Seal With Sister Love & Save Note ❤️</span>
              </button>
            </div>
          </div>
        ) : (
          /* Sealed Card View */
          <div className="space-y-5">
            <div className="text-center text-xs font-bold text-emerald-400 flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Note Sealed & Saved on {savedDate}!</span>
            </div>

            {/* The Downloadable Reply Card Node */}
            <div
              ref={cardRef}
              className="max-w-md mx-auto bg-gradient-to-b from-rose-950/70 via-slate-900 to-purple-950/70 border-3 border-rose-400/80 rounded-3xl p-6 sm:p-8 text-center shadow-2xl relative overflow-hidden cartoon-card-rose"
            >
              {/* Corner Traditional Motifs */}
              <span className="absolute top-2 left-2 text-xs text-rose-300 opacity-60">🌸</span>
              <span className="absolute top-2 right-2 text-xs text-rose-300 opacity-60">🌸</span>
              <span className="absolute bottom-2 left-2 text-xs text-rose-300 opacity-60">🌸</span>
              <span className="absolute bottom-2 right-2 text-xs text-rose-300 opacity-60">🌸</span>

              <div className="inline-block px-3 py-1 bg-rose-500/20 border border-rose-400/40 rounded-full text-[10px] font-bold text-rose-300 uppercase tracking-widest mb-3">
                Bhai Dooj Sister Reply {selectedSticker}
              </div>

              {/* Sister Photo */}
              <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-rose-400 shadow-md mb-3">
                <img
                  src={SISTER_CONFIG.photos.heroPortrait}
                  alt={SISTER_CONFIG.sisterName}
                  className="w-full h-full object-cover"
                />
              </div>

              <h4 className="font-festive text-xl font-bold text-white mb-2">
                From Shikha Sapkota
              </h4>

              <div className="bg-slate-950/80 p-4 rounded-2xl border border-rose-500/30 text-xs sm:text-sm text-slate-100 font-handwritten text-lg leading-relaxed mb-4">
                "{replyText}"
              </div>

              <div className="pt-2 border-t border-rose-500/30 flex items-center justify-between text-xs text-rose-200">
                <span className="font-semibold">To: My Forever Brother</span>
                <span className="font-cartoon font-bold text-amber-300">{selectedNick}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                onClick={handleDownloadReply}
                disabled={isDownloading}
                className="cartoon-btn px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-cartoon font-bold text-xs flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isDownloading ? 'Generating...' : 'Download Reply Card (PNG)'}</span>
              </button>

              <button
                onClick={handleEditAgain}
                className="cartoon-btn px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Edit Note</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
