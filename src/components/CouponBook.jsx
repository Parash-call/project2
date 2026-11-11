import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Ticket, CheckCircle2, RotateCcw, Utensils, Headphones, ShieldAlert, Crown, Heart } from 'lucide-react';
import { SISTER_CONFIG } from '../data/config';
import { sounds } from '../utils/audioSynthesizer';

const iconMap = {
  Utensils: Utensils,
  Headphones: Headphones,
  ShieldAlert: ShieldAlert,
  Crown: Crown,
  Heart: Heart,
};

export default function CouponBook() {
  const coupons = SISTER_CONFIG.coupons;
  const [redeemedCoupons, setRedeemedCoupons] = useState({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem('shikha_redeemed_coupons');
      if (saved) {
        setRedeemedCoupons(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Coupon load error", e);
    }
  }, []);

  const handleRedeem = (id) => {
    sounds.playCelebration();
    const updated = {
      ...redeemedCoupons,
      [id]: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setRedeemedCoupons(updated);

    try {
      localStorage.setItem('shikha_redeemed_coupons', JSON.stringify(updated));
    } catch (e) {
      console.warn("Coupon save error", e);
    }

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const handleResetCoupons = () => {
    sounds.playPop();
    setRedeemedCoupons({});
    try {
      localStorage.removeItem('shikha_redeemed_coupons');
    } catch (e) {
      console.warn("Coupon reset error", e);
    }
  };

  return (
    <section id="coupons" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider">
          <Ticket className="w-4 h-4 text-purple-400" />
          <span>Redeemable Sibling Vouchers</span>
        </div>
        <h2 className="font-festive text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-300 to-purple-400">
          Shikha's VIP Sister Coupon Book 🎟️
        </h2>
        <p className="text-slate-300 text-sm max-w-xl mx-auto">
          Exclusive brother vouchers that Shikha can claim whenever she needs food, emotional support, or a victory in an argument!
        </p>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((c) => {
          const Icon = iconMap[c.icon] || Ticket;
          const isRedeemed = !!redeemedCoupons[c.id];

          return (
            <div
              key={c.id}
              className={`relative bg-slate-900 border-2 rounded-3xl p-5 cartoon-card flex flex-col justify-between transition-all ${
                isRedeemed
                  ? 'border-emerald-500/60 bg-emerald-950/20'
                  : 'border-amber-500/30 hover:border-amber-400'
              }`}
            >
              {/* Cut-out ticket notch circles */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-festive-night border-r-2 border-amber-500/30" />
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-festive-night border-l-2 border-amber-500/30" />

              <div className="space-y-3">
                {/* Header badge */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                    {c.badge}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-amber-400 border border-slate-700">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Title & Desc */}
                <div>
                  <h3 className="font-cartoon text-lg font-bold text-white">
                    {c.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {c.desc}
                  </p>
                </div>

                {/* Terms */}
                <div className="text-[10px] text-slate-400 italic bg-slate-950/50 p-2 rounded-lg border border-slate-800">
                  ⚠️ {c.terms}
                </div>
              </div>

              {/* Action Button / Redeemed Stamp */}
              <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between">
                {isRedeemed ? (
                  <div className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Claimed on {redeemedCoupons[c.id]}</span>
                    </div>
                    <span className="text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/40 transform rotate-[-4deg]">
                      STAMPED
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleRedeem(c.id)}
                    className="w-full cartoon-btn py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-cartoon font-bold text-xs hover:from-amber-400 hover:to-amber-500 flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>Redeem Voucher ✨</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Reset Coupons Option */}
      {Object.keys(redeemedCoupons).length > 0 && (
        <div className="text-center pt-8">
          <button
            onClick={handleResetCoupons}
            className="cartoon-btn px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold inline-flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Claimed Vouchers</span>
          </button>
        </div>
      )}
    </section>
  );
}

