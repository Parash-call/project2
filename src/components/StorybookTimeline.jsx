import React, { useState } from 'react';
import { BookOpen, Sparkles, ChevronRight, ChevronLeft, GraduationCap, School, HeartHandshake, Flame, Coffee } from 'lucide-react';
import { SISTER_CONFIG } from '../data/config';
import { sounds } from '../utils/audioSynthesizer';

export default function StorybookTimeline() {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const chapters = SISTER_CONFIG.storyChapters;
  const current = chapters[activeChapterIndex];

  const handleNext = () => {
    sounds.playPop();
    setActiveChapterIndex((prev) => (prev + 1) % chapters.length);
  };

  const handlePrev = () => {
    sounds.playPop();
    setActiveChapterIndex((prev) => (prev - 1 + chapters.length) % chapters.length);
  };

  return (
    <section id="story" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-rose-400" />
          <span>The Chronicle of Two Strangers</span>
        </div>
        <h2 className="font-festive text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-300 to-purple-400">
          How 11th Class Brought Us Together 📖
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
          An interactive illustrated storybook of how two classmates sharing notes in 11th class grew into an inseparable brother-sister bond.
        </p>
      </div>

      {/* Chapter Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-6">
        {chapters.map((ch, idx) => (
          <button
            key={ch.id}
            onClick={() => {
              setActiveChapterIndex(idx);
              sounds.playPop();
            }}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-cartoon font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeChapterIndex === idx
                ? 'bg-amber-500 text-slate-950 scale-105 shadow-md shadow-amber-500/30'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span>{ch.chapterNumber}.</span>
            <span className="hidden sm:inline">{ch.title}</span>
            <span className="sm:hidden">{ch.tag}</span>
          </button>
        ))}
      </div>

      {/* Main Interactive Storybook Page */}
      <div className="bg-slate-900 border-2 border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl cartoon-card relative overflow-hidden">
        {/* Book Binding Visual Cue */}
        <div className="absolute top-0 bottom-0 left-0 w-3 bg-gradient-to-r from-amber-600 to-amber-800" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Visual Polaroid & Cartoon illustration */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-64 sm:w-72 bg-white p-3 pb-8 rounded-xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-300 group">
              {/* Cute Washi Tape at Top */}
              <div className="washi-tape" />

              {/* Photo */}
              <div className="aspect-[4/4] rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={current.photo}
                  alt={current.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = "/photos/sister.jpg";
                  }}
                />
              </div>

              {/* Polaroid Caption */}
              <div className="mt-3 text-center">
                <span className="font-handwritten text-xl font-bold text-slate-800">
                  {current.tag}
                </span>
                <p className="text-[11px] font-sans text-slate-500 mt-0.5">
                  {current.cartoonMood}
                </p>
              </div>
            </div>

            <div className="mt-4 text-center">
              <span className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold rounded-full">
                📅 {current.timeframe}
              </span>
            </div>
          </div>

          {/* Right Column: Story Text & Quotes */}
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-1">
              <div className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Chapter {current.chapterNumber} of {chapters.length.toString().padStart(2, '0')}
              </div>
              <h3 className="font-cartoon text-2xl sm:text-3xl font-bold text-white">
                {current.title}
              </h3>
            </div>

            {/* Story Paragraph */}
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed bg-slate-950/60 p-4 sm:p-5 rounded-2xl border border-slate-800 font-sans">
              {current.story}
            </p>

            {/* Emotional Quote Callout */}
            <blockquote className="border-l-4 border-amber-400 pl-4 py-2 italic text-amber-200 text-sm sm:text-base font-handwritten text-lg">
              {current.quote}
            </blockquote>

            {/* Page Flip Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={handlePrev}
                className="cartoon-btn px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Chapter</span>
              </button>

              <span className="text-xs text-slate-400 font-medium">
                Page {activeChapterIndex + 1} / {chapters.length}
              </span>

              <button
                onClick={handleNext}
                className="cartoon-btn px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5"
              >
                <span>Next Chapter</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

