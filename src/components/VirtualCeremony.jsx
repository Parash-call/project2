import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import { Flame, Sparkles, CheckCircle2, RotateCw, Gift, Award, Heart, Shield, Download } from 'lucide-react';
import { SISTER_CONFIG } from '../data/config';
import { sounds } from '../utils/audioSynthesizer';

export default function VirtualCeremony({ onDiyaLit }) {
  const certificateRef = useRef(null);
  const [isDownloadingCert, setIsDownloadingCert] = useState(false);
  // Ceremony Progress States
  const [activeTab, setActiveTab] = useState('aarti'); // 'aarti' | 'tilak' | 'sweets' | 'vows' | 'gift'
  const [aartiRotations, setAartiRotations] = useState(0);
  const [hasAppliedTilak, setHasAppliedTilak] = useState(false);
  const [selectedSweet, setSelectedSweet] = useState(null);
  const [sweetsFedCount, setSweetsFedCount] = useState(0);
  const [giftOpened, setGiftOpened] = useState(false);
  const [sweetMessage, setSweetMessage] = useState("");

  // Handle Aarti Rotation
  const handleAartiWave = () => {
    sounds.playBell();
    setAartiRotations((prev) => prev + 1);
    if (onDiyaLit) onDiyaLit();

    if (aartiRotations + 1 >= 3 && !hasAppliedTilak) {
      // Auto suggest next step
      setTimeout(() => {
        setActiveTab('tilak');
      }, 900);
    }
  };

  // Handle Tilak Apply
  const handleApplyTilak = () => {
    sounds.playChime();
    setHasAppliedTilak(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#E11D48', '#F59E0B', '#FBBF24']
    });
  };

  // Handle Sweet Feeding
  const handleFeedSweet = (sweet) => {
    setSelectedSweet(sweet);
    sounds.playMunch();
    setSweetsFedCount((c) => c + 1);
    setSweetMessage(`Brother ate ${sweet.name}! "Mmm, so delicious! Thank you, Shikha!" 😋`);

    setTimeout(() => {
      setSweetMessage("");
    }, 3500);
  };

  // Handle Download Certificate
  const handleDownloadCertificate = async () => {
    if (!certificateRef.current) return;
    setIsDownloadingCert(true);
    sounds.playCelebration();
    try {
      const dataUrl = await toPng(certificateRef.current, {
        cacheBust: true,
        pixelRatio: 2.5
      });
      const link = document.createElement('a');
      link.download = `Shikha_Certificate_Of_Sisterhood.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.warn("Certificate download error", err);
    } finally {
      setIsDownloadingCert(false);
    }
  };

  // Handle Gift Unbox
  const handleOpenGift = () => {
    if (giftOpened) return;
    sounds.playCelebration();
    setGiftOpened(true);
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.55 },
      colors: ['#F59E0B', '#E11D48', '#8B5CF6', '#10B981']
    });
  };

  return (
    <section id="ceremony" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
          <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span>Sacred Bhai Dooj Rituals</span>
        </div>
        <h2 className="font-festive text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-rose-400">
          The Virtual Bhai Dooj Ceremony 🪔
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
          Perform each sacred step of Bhai Dooj virtually: wave the Aarti thali, apply the auspicious Tilak, feed festival sweets, and unlock the brother's gift!
        </p>
      </div>

      {/* Ritual Step Navigation Tabs */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
        {[
          { id: 'aarti', label: '1. Aarti Thali 🪔', done: aartiRotations >= 3 },
          { id: 'tilak', label: '2. Sacred Tilak 🔴', done: hasAppliedTilak },
          { id: 'sweets', label: '3. Feed Sweets 🍬', done: sweetsFedCount > 0 },
          { id: 'vows', label: '4. Brother Promises 🛡️', done: true },
          { id: 'gift', label: '5. Gift Unbox 🎁', done: giftOpened }
        ].map((step) => (
          <button
            key={step.id}
            onClick={() => {
              setActiveTab(step.id);
              sounds.playPop();
            }}
            className={`cartoon-btn px-4 py-2.5 rounded-xl font-cartoon font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
              activeTab === step.id
                ? 'bg-amber-500 text-slate-950 scale-105 shadow-md shadow-amber-500/30'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border-slate-700'
            }`}
          >
            <span>{step.label}</span>
            {step.done && <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-950" />}
          </button>
        ))}
      </div>

      {/* Main Interactive Stage */}
      <div className="bg-slate-900/90 border-2 border-amber-500/30 rounded-3xl p-6 sm:p-8 cartoon-card shadow-2xl relative overflow-hidden min-h-[480px] flex flex-col justify-between">
        {/* Glow backdrop */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* STEP 1: AARTI THALI */}
        {activeTab === 'aarti' && (
          <div className="text-center space-y-6 my-auto">
            <div className="space-y-2">
              <h3 className="font-cartoon text-2xl sm:text-3xl font-bold text-amber-300">
                Step 1: Wave the Sacred Aarti Thali
              </h3>
              <p className="text-slate-300 text-sm max-w-md mx-auto">
                {SISTER_CONFIG.rituals.aarti.instruction}
              </p>
            </div>

            {/* Aarti Thali Visual */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto flex items-center justify-center">
              {/* Spinning Thali Container */}
              <div
                className="w-full h-full rounded-full border-4 border-amber-400 bg-gradient-to-tr from-amber-700 via-amber-500 to-yellow-300 p-3 shadow-2xl transition-transform duration-700 flex items-center justify-center cursor-pointer relative group"
                style={{
                  transform: `rotate(${aartiRotations * 120}deg)`,
                  boxShadow: '0 0 30px rgba(245, 158, 11, 0.4)'
                }}
                onClick={handleAartiWave}
              >
                {/* Brass Plate Details */}
                <div className="w-full h-full rounded-full border-2 border-dashed border-amber-950/40 bg-amber-600/90 flex items-center justify-center relative">
                  {/* Outer Flower Ring */}
                  <div className="absolute inset-2 flex items-center justify-around pointer-events-none opacity-80">
                    <span className="text-xl">🌼</span>
                    <span className="text-xl">🌸</span>
                    <span className="text-xl">🌼</span>
                    <span className="text-xl">🌸</span>
                  </div>

                  {/* Sacred Tilak Bowl & Rice */}
                  <div className="absolute top-6 w-9 h-9 rounded-full bg-rose-700 border border-amber-200 flex items-center justify-center text-xs shadow-md">
                    🔴
                  </div>
                  <div className="absolute bottom-6 w-8 h-8 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-xs shadow-md text-amber-900 font-bold">
                    🌾
                  </div>

                  {/* Center Diya */}
                  <div className="w-20 h-20 rounded-full bg-gradient-to-b from-amber-700 to-amber-900 border-2 border-amber-300 flex flex-col items-center justify-center shadow-lg relative group-hover:scale-105 transition-transform">
                    <span className="text-3xl -mt-4 animate-pulse diya-glow">🔥</span>
                    <span className="text-xs font-bold text-amber-200 -mt-1 font-cartoon">🪔 Diya</span>
                  </div>
                </div>
              </div>

              {/* Sparkle badge */}
              <div className="absolute -top-2 right-4 bg-amber-400 text-slate-950 px-3 py-1 rounded-full text-xs font-bold font-cartoon shadow-md">
                Aartis Done: {aartiRotations} / 3
              </div>
            </div>

            {/* Control Button */}
            <div className="space-y-3">
              <button
                onClick={handleAartiWave}
                className="cartoon-btn px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-cartoon font-bold text-base inline-flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-amber-500/20"
              >
                <RotateCw className="w-5 h-5" />
                <span>Wave Aarti Plate (Click Me!) 🪔</span>
              </button>
              <p className="text-xs text-amber-300/80 italic font-medium">
                "{SISTER_CONFIG.rituals.aarti.blessing}"
              </p>
            </div>
          </div>
        )}

        {/* STEP 2: SACRED TILAK */}
        {activeTab === 'tilak' && (
          <div className="text-center space-y-6 my-auto">
            <div className="space-y-2">
              <h3 className="font-cartoon text-2xl sm:text-3xl font-bold text-rose-400">
                Step 2: Apply the Sacred Tilak (Tikka) 🔴🌾
              </h3>
              <p className="text-slate-300 text-sm max-w-md mx-auto">
                {SISTER_CONFIG.rituals.tilak.meaning}
              </p>
            </div>

            {/* Brother Face Avatar Display */}
            <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
              {/* Brother Cartoon Avatar Container */}
              <div className="relative w-56 h-56 rounded-full bg-gradient-to-b from-amber-100 to-amber-200 border-4 border-amber-400 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
                {/* Hair */}
                <div className="absolute top-0 w-full h-16 bg-slate-900 rounded-b-3xl" />
                
                {/* Forehead Area */}
                <div className="relative z-10 w-32 h-14 mt-4 flex items-center justify-center">
                  {hasAppliedTilak ? (
                    <div className="flex flex-col items-center animate-bounce-gentle">
                      <div className="w-3.5 h-8 bg-rose-600 rounded-full border border-amber-300 kumkum-glow shadow-md flex items-center justify-center">
                        <span className="text-[7px] text-amber-200">🌾</span>
                      </div>
                      <span className="text-[10px] text-amber-900 font-bold font-cartoon mt-0.5">Blessed!</span>
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full border-2 border-dashed border-rose-400/70 flex items-center justify-center text-xs text-rose-600 font-bold bg-rose-50/50 animate-pulse">
                      Tap
                    </div>
                  )}
                </div>

                {/* Eyes */}
                <div className="flex gap-10 mt-2 z-10">
                  <div className="w-4 h-4 rounded-full bg-slate-900" />
                  <div className="w-4 h-4 rounded-full bg-slate-900" />
                </div>

                {/* Smile */}
                <div className="w-10 h-5 border-b-4 border-slate-900 rounded-b-full mt-2 z-10" />

                {/* Traditional Kurta Collar */}
                <div className="absolute bottom-0 w-full h-12 bg-gradient-to-r from-amber-600 to-rose-600 border-t-2 border-amber-300 flex items-center justify-center">
                  <span className="text-[10px] text-amber-100 font-bold uppercase tracking-wider">Happy Bhai Dooj</span>
                </div>
              </div>

              {/* Kumkum Plate Floating on Side */}
              <div
                onClick={handleApplyTilak}
                className="absolute -right-4 top-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-rose-600 p-2 shadow-xl cursor-pointer hover:scale-110 transition-transform cartoon-card flex flex-col items-center justify-center"
                title="Click to apply Roli & Akshat"
              >
                <span className="text-xl">🔴</span>
                <span className="text-[9px] font-bold text-white font-cartoon leading-none">Roli & Rice</span>
              </div>
            </div>

            {/* Action Button */}
            <div className="space-y-2">
              <button
                onClick={handleApplyTilak}
                className={`cartoon-btn px-6 py-3 rounded-2xl font-cartoon font-bold text-base inline-flex items-center gap-2 transition-all ${
                  hasAppliedTilak
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:scale-105 shadow-rose-500/25'
                }`}
              >
                <Sparkles className="w-5 h-5" />
                <span>{hasAppliedTilak ? 'Tilak Applied Successfully! ✨' : 'Apply Sacred Tilak Now 🔴'}</span>
              </button>
              {hasAppliedTilak && (
                <p className="text-xs text-emerald-400 font-medium">
                  Brother's forehead is blessed with health, victory, and prosperity!
                </p>
              )}
            </div>
          </div>
        )}

        {/* STEP 3: SWEETS */}
        {activeTab === 'sweets' && (
          <div className="text-center space-y-6 my-auto">
            <div className="space-y-2">
              <h3 className="font-cartoon text-2xl sm:text-3xl font-bold text-amber-300">
                Step 3: Feed Delicious Festival Sweets 🍬
              </h3>
              <p className="text-slate-300 text-sm max-w-md mx-auto">
                No festival is complete without feeding your brother his favorite mithai! Pick a sweet below:
              </p>
            </div>

            {/* Sweets Selection Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto">
              {SISTER_CONFIG.rituals.sweets.map((sweet, idx) => (
                <div
                  key={idx}
                  onClick={() => handleFeedSweet(sweet)}
                  className={`p-3 rounded-2xl border-2 cursor-pointer transition-all cartoon-card flex flex-col items-center text-center ${
                    selectedSweet?.name === sweet.name
                      ? 'bg-amber-500/20 border-amber-400 scale-105'
                      : 'bg-slate-800/80 border-slate-700 hover:border-amber-400/60'
                  }`}
                >
                  <span className="text-3xl mb-1">{sweet.icon}</span>
                  <h4 className="font-cartoon text-xs font-bold text-amber-200">{sweet.name}</h4>
                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{sweet.desc}</p>
                  <span className="mt-2 text-[9px] px-2 py-0.5 rounded-full bg-slate-900 text-amber-300 font-semibold border border-amber-500/30">
                    Feed Brother 😋
                  </span>
                </div>
              ))}
            </div>

            {/* Brother Feeding Reaction Display */}
            <div className="h-14 flex items-center justify-center">
              {sweetMessage ? (
                <div className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-cartoon font-bold text-sm animate-bounce-gentle shadow-lg">
                  {sweetMessage}
                </div>
              ) : (
                <p className="text-xs text-slate-400">
                  Total Sweets Fed: <strong className="text-amber-400">{sweetsFedCount}</strong> pieces!
                </p>
              )}
            </div>
          </div>
        )}

        {/* STEP 4: BROTHER PROMISES */}
        {activeTab === 'vows' && (
          <div className="text-center space-y-6 my-auto">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-400/30">
                <Shield className="w-3.5 h-3.5" />
                <span>Brotherly Vows to Shikha Sapkota</span>
              </div>
              <h3 className="font-cartoon text-2xl sm:text-3xl font-bold text-purple-300">
                Step 4: The Sacred Raksha & Sister Protection Pledge 🛡️
              </h3>
              <p className="text-slate-300 text-sm max-w-lg mx-auto">
                Blood didn't make us family—choice, loyalty, and heart did. Here is my solemn commitment to you:
              </p>
            </div>

            {/* Vow Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto text-left">
              {SISTER_CONFIG.rituals.brotherPromises.map((promise, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-800/80 border border-purple-500/30 cartoon-card flex items-start gap-3"
                >
                  <span className="text-base p-1 rounded-lg bg-purple-500/20 text-purple-300">
                    {idx === 0 ? '📞' : idx === 1 ? '🎯' : idx === 2 ? '🤜🤛' : idx === 3 ? '🍕' : '🛡️'}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                    {promise}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setActiveTab('gift');
                  sounds.playPop();
                }}
                className="cartoon-btn px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-rose-600 text-white font-cartoon font-bold text-sm inline-flex items-center gap-2 hover:scale-105 transition-all shadow-lg"
              >
                <span>Proceed to Step 5: Claim Your Gift Box 🎁</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: GIFT UNBOXING */}
        {activeTab === 'gift' && (
          <div className="text-center space-y-6 my-auto">
            <div className="space-y-2">
              <h3 className="font-cartoon text-2xl sm:text-3xl font-bold text-amber-300">
                Step 5: Brother's Special Bhai Dooj Gift 🎁
              </h3>
              <p className="text-slate-300 text-sm max-w-md mx-auto">
                {giftOpened
                  ? "Surprise revealed! Here is your special Bhai Dooj token of love & gratitude!"
                  : "Click the wrapped golden box below to untie the ribbon and claim your surprise!"}
              </p>
            </div>

            {/* Gift Box Container */}
            <div className="py-2">
              {!giftOpened ? (
                <div
                  onClick={handleOpenGift}
                  className="w-48 h-48 sm:w-56 sm:h-56 mx-auto bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 rounded-3xl p-3 shadow-2xl cursor-pointer hover:scale-105 transition-all transform animate-bounce-gentle cartoon-card relative group"
                >
                  {/* Ribbon cross */}
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-amber-300 shadow-md z-10" />
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-8 bg-amber-300 shadow-md z-10" />

                  {/* Ribbon Bow on top */}
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20 w-16 h-12 bg-amber-300 rounded-full border-2 border-amber-600 flex items-center justify-center shadow-lg font-bold text-amber-950">
                    🎀
                  </div>

                  <div className="w-full h-full rounded-2xl bg-slate-900/60 border-2 border-white/20 flex flex-col items-center justify-center p-4 text-center z-10 relative">
                    <Gift className="w-12 h-12 text-amber-300 animate-pulse mb-2" />
                    <span className="font-cartoon text-white font-bold text-sm">
                      For Shikha Sapkota ❤️
                    </span>
                    <span className="text-[10px] text-amber-300 font-semibold mt-1">
                      (Tap to Open)
                    </span>
                  </div>
                </div>
              ) : (
                /* Unboxed Gift Card */
                <div
                  ref={certificateRef}
                  className="max-w-md mx-auto bg-gradient-to-tr from-amber-950/80 via-slate-900 to-purple-950/80 border-2 border-amber-400 rounded-3xl p-6 cartoon-card-gold text-center space-y-4 animate-scale-up shadow-2xl"
                >
                  <div className="w-14 h-14 mx-auto rounded-full bg-amber-400 flex items-center justify-center text-2xl shadow-lg">
                    👑
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300">
                      Official Certificate of Sisterhood
                    </span>
                    <h4 className="font-cartoon text-xl font-bold text-white">
                      The VIP Sister Lifetime Pass
                    </h4>
                    <p className="text-xs text-rose-300 font-medium">
                      Awarded to Shikha Sapkota • Sister from another mother
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/70 border border-amber-500/30 text-left space-y-2 text-xs text-slate-200">
                    <div className="flex items-center gap-2 text-amber-300 font-bold">
                      <Sparkles className="w-4 h-4" />
                      <span>Privileges Included:</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-slate-300">
                      <li>Free Kaju Katli / Coffee treats whenever we meet</li>
                      <li>Unlimited phone call venting sessions with brotherly advice</li>
                      <li>Brother will be your official bodyguard against any life problems</li>
                      <li>Valid: From 11th Class classroom to Infinity! ♾️</li>
                    </ul>
                  </div>

                  <div className="text-[10px] font-mono text-amber-400/80 bg-amber-500/10 py-1.5 px-3 rounded-lg border border-amber-400/20">
                    Voucher ID: SHIKHA-SISTER-SUPERSTAR-2026
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handleDownloadCertificate}
                      disabled={isDownloadingCert}
                      className="cartoon-btn px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-cartoon font-bold text-xs inline-flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{isDownloadingCert ? 'Generating...' : 'Download Certificate (PNG)'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {!giftOpened && (
              <button
                onClick={handleOpenGift}
                className="cartoon-btn px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-cartoon font-bold text-sm inline-flex items-center gap-2 hover:scale-105 shadow-lg shadow-amber-500/20"
              >
                <Gift className="w-4 h-4" />
                <span>Tap Here to Open Gift Box 🎀</span>
              </button>
            )}
          </div>
        )}

        {/* Ceremony Footer status */}
        <div className="border-t border-slate-800 pt-4 mt-6 flex flex-wrap items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Ceremony Status: In Progress</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Aarti: {aartiRotations}/3</span>
            <span>•</span>
            <span>Tilak: {hasAppliedTilak ? 'Applied ✅' : 'Pending ⏳'}</span>
            <span>•</span>
            <span>Sweets: {sweetsFedCount}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

