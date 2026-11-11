import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import VirtualCeremony from './components/VirtualCeremony';
import StorybookTimeline from './components/StorybookTimeline';
import ScratchCard from './components/ScratchCard';
import BhaiDoojQuiz from './components/BhaiDoojQuiz';
import CouponBook from './components/CouponBook';
import PolaroidGallery from './components/PolaroidGallery';
import VoiceMessageRecorder from './components/VoiceMessageRecorder';
import BanterMachine from './components/BanterMachine';
import GreetingCardMaker from './components/GreetingCardMaker';
import SisterReplyBox from './components/SisterReplyBox';
import LetterModal from './components/LetterModal';
import Footer from './components/Footer';
import FloatingParticles from './components/FloatingParticles';
import OpeningGate from './components/OpeningGate';
import { sounds } from './utils/audioSynthesizer';

export default function App() {
  const [isEntered, setIsEntered] = useState(false);
  const [diyaCount, setDiyaCount] = useState(11);
  const [isLetterOpen, setIsLetterOpen] = useState(false);

  // Load Diya count from localStorage
  useEffect(() => {
    try {
      const savedCount = localStorage.getItem('shikha_diya_count');
      if (savedCount) {
        setDiyaCount(parseInt(savedCount, 10));
      }
    } catch (e) {
      console.warn("Diya count load error", e);
    }
  }, []);

  const handleLightDiya = () => {
    setDiyaCount((prev) => {
      const next = prev + 1;
      try {
        localStorage.setItem('shikha_diya_count', next.toString());
      } catch (e) {
        console.warn("Diya count save error", e);
      }
      return next;
    });

    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.8 },
      colors: ['#F59E0B', '#FBBF24', '#E11D48']
    });
  };

  return (
    <div className="relative min-h-screen text-slate-100 font-body selection:bg-rose-500 selection:text-white">
      {/* 1. Magical Opening Gate Screen (Displayed First) */}
      {!isEntered && (
        <OpeningGate onEnter={() => setIsEntered(true)} />
      )}

      {/* 2. Main Enchanted World (Unveiled after opening) */}
      <div className={`transition-opacity duration-1000 ${isEntered ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
        {/* Background Floating Petals & Sparkles */}
        <FloatingParticles />

        {/* Navigation Bar with Replay Opening button */}
        <Navbar
          diyaCount={diyaCount}
          onLightDiya={handleLightDiya}
          onReopenOpening={() => setIsEntered(false)}
        />

        {/* Main Content Sections */}
        <main className="relative z-10 space-y-12 sm:space-y-16">
          {/* 1. Hero Welcome & Photo Switcher */}
          <HeroSection
            onOpenLetter={() => setIsLetterOpen(true)}
            onLightDiya={handleLightDiya}
          />

          {/* 2. Interactive Bhai Dooj Virtual Rituals */}
          <VirtualCeremony
            onDiyaLit={handleLightDiya}
          />

          {/* 3. Illustrated Cartoon Storybook: 11th Class Online Era to Different Cities */}
          <StorybookTimeline />

          {/* 4. Canvas API Interactive Scratch Card */}
          <ScratchCard />

          {/* 5. Brother-Sister Bond Quiz (11th class, daily talks, different cities) */}
          <BhaiDoojQuiz />

          {/* 6. Sister's VIP Coupon Book */}
          <CouponBook />

          {/* 7. Complete Polaroid Wall (All 7 Photos with Lightbox) */}
          <PolaroidGallery />

          {/* 8. MediaRecorder API Voice Note Studio */}
          <VoiceMessageRecorder />

          {/* 9. Sibling Banter & Mood Generator (Roast vs Pamper) */}
          <BanterMachine />

          {/* 10. Sister's Dedicated Reply Box (Shikha to Brother) */}
          <SisterReplyBox />

          {/* 11. html-to-image Greeting Card Designer & Downloader */}
          <GreetingCardMaker />
        </main>

        {/* Brother's Heartfelt Letter Modal */}
        <LetterModal
          isOpen={isLetterOpen}
          onClose={() => setIsLetterOpen(false)}
        />

        {/* Festive Footer */}
        <Footer
          onLightDiya={handleLightDiya}
          onReopenOpening={() => setIsEntered(false)}
        />
      </div>
    </div>
  );
}
