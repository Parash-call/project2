import React, { useRef, useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, RefreshCw, Award, Heart, CheckCircle } from 'lucide-react';
import { SISTER_CONFIG } from '../data/config';
import { sounds } from '../utils/audioSynthesizer';

export default function ScratchCard() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isScratched, setIsScratched] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);

  // Initialize Canvas with metallic golden scratch surface
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';

    // Create golden-silver festive scratch surface gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#F59E0B');
    grad.addColorStop(0.3, '#FDE68A');
    grad.addColorStop(0.5, '#D97706');
    grad.addColorStop(0.8, '#FBBF24');
    grad.addColorStop(1, '#B45309');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Decorative festival patterns on scratch foil
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    for (let i = 0; i < width; i += 24) {
      for (let j = 0; j < height; j += 24) {
        ctx.beginPath();
        ctx.arc(i, j, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Border around the scratch foil
    ctx.strokeStyle = '#78350F';
    ctx.lineWidth = 6;
    ctx.strokeRect(4, 4, width - 8, height - 8);

    // Scratch instruction text on the foil
    ctx.fillStyle = '#78350F';
    ctx.font = 'bold 20px "Fredoka", cursive, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ SCRATCH HERE ✨', width / 2, height / 2 - 18);

    ctx.font = '600 13px "Quicksand", sans-serif';
    ctx.fillText('Rub with mouse or touch to reveal surprise!', width / 2, height / 2 + 16);

    setIsScratched(false);
    setScratchPercent(0);
  }, []);

  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  // Compute scratched percentage
  const calculateScratchedArea = () => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentCount = 0;
    const totalPixels = pixels.length / 4;

    for (let i = 3; i < pixels.length; i += 16) {
      // Sample every 4th pixel for high performance
      if (pixels[i] === 0) {
        transparentCount++;
      }
    }

    const percent = Math.round((transparentCount / (totalPixels / 4)) * 100);
    setScratchPercent(percent);

    if (percent >= SISTER_CONFIG.scratchCard.scratchPercentGoal && !isScratched) {
      setIsScratched(true);
      sounds.playCelebration();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#E11D48', '#8B5CF6', '#10B981']
      });
    }
  };

  const scratch = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.fill();

    sounds.playScratch();
    calculateScratchedArea();
  };

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleTouchStart = (e) => {
    setIsDrawing(true);
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e) => {
    if (!isDrawing) return;
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    setIsDrawing(false);
  };

  return (
    <section id="scratch" className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Interactive Canvas Surprise</span>
        </div>
        <h2 className="font-festive text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-rose-400">
          The Secret Bhai Dooj Scratch Card 🎁
        </h2>
        <p className="text-slate-300 text-sm max-w-lg mx-auto">
          {SISTER_CONFIG.scratchCard.hint}
        </p>
      </div>

      {/* Main Scratch Card Box */}
      <div className="bg-slate-900 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 cartoon-card-gold shadow-2xl relative">
        {/* Progress bar */}
        <div className="flex items-center justify-between text-xs font-bold text-amber-300 mb-4">
          <span>Scratched: {scratchPercent}%</span>
          <span>{isScratched ? 'Revealed! 🎉' : 'Keep scratching! ✨'}</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2.5 mb-6 overflow-hidden">
          <div
            className="bg-gradient-to-r from-amber-400 to-rose-500 h-2.5 rounded-full transition-all duration-200"
            style={{ width: `${Math.min(scratchPercent, 100)}%` }}
          />
        </div>

        {/* Card Stage Container */}
        <div
          ref={containerRef}
          className="relative w-full max-w-lg mx-auto h-72 sm:h-80 rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-400/50"
        >
          {/* Secret Message Underneath the Scratch Foil */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-slate-900 to-rose-950 p-6 flex flex-col justify-between text-center select-none">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold font-cartoon">
                <Award className="w-3.5 h-3.5" />
                <span>GOLDEN SIBLING VOUCHER</span>
              </div>
              <h3 className="font-cartoon text-xl sm:text-2xl font-bold text-white leading-tight">
                {SISTER_CONFIG.scratchCard.secretTitle}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans px-2">
              {SISTER_CONFIG.scratchCard.secretMessage}
            </p>

            <div className="bg-slate-950/80 p-2.5 rounded-xl border border-amber-500/30 flex items-center justify-between text-xs">
              <span className="font-mono text-amber-300 font-bold">
                CODE: {SISTER_CONFIG.scratchCard.voucherCode}
              </span>
              <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Lifetime Valid
              </span>
            </div>
          </div>

          {/* HTML5 Canvas Scratch Layer */}
          <canvas
            ref={canvasRef}
            width={512}
            height={320}
            className={`absolute inset-0 w-full h-full cursor-pointer touch-none transition-opacity duration-700 ${
              isScratched ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-3 mt-6">
          <button
            onClick={() => {
              initCanvas();
              sounds.playPop();
            }}
            className="cartoon-btn px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Card & Scratch Again</span>
          </button>
        </div>
      </div>
    </section>
  );
}

