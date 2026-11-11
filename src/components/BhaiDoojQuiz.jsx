import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Trophy, Sparkles } from 'lucide-react';
import { SISTER_CONFIG } from '../data/config';
import { sounds } from '../utils/audioSynthesizer';

export default function BhaiDoojQuiz() {
  const questions = SISTER_CONFIG.quiz;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Load from LocalStorage
  useEffect(() => {
    try {
      const savedScore = localStorage.getItem('shikha_quiz_score');
      const savedCompleted = localStorage.getItem('shikha_quiz_completed');
      if (savedCompleted === 'true' && savedScore !== null) {
        setScore(parseInt(savedScore, 10));
        setIsCompleted(true);
      }
    } catch (e) {
      console.warn("LocalStorage read error", e);
    }
  }, []);

  const handleSelectOption = (opt) => {
    if (selectedOption !== null) return; // Prevent double select
    setSelectedOption(opt);

    if (opt.correct) {
      sounds.playCelebration();
      setScore((s) => s + 1);
      setFeedback({ type: 'success', text: opt.feedback });
    } else {
      sounds.playPop();
      setFeedback({ type: 'error', text: opt.feedback });
    }
  };

  const handleNextQuestion = () => {
    sounds.playPop();
    setSelectedOption(null);
    setFeedback(null);

    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      // Completed quiz
      setIsCompleted(true);
      sounds.playCelebration();
      try {
        localStorage.setItem('shikha_quiz_score', (score + (selectedOption?.correct ? 0 : 0)).toString());
        localStorage.setItem('shikha_quiz_completed', 'true');
      } catch (e) {
        console.warn("LocalStorage write error", e);
      }
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    sounds.playPop();
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setIsCompleted(false);
    setFeedback(null);
    try {
      localStorage.removeItem('shikha_quiz_completed');
      localStorage.removeItem('shikha_quiz_score');
    } catch (e) {
      console.warn("LocalStorage clear error", e);
    }
  };

  const currentQ = questions[currentIdx];

  return (
    <section id="quiz" className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-4 h-4 text-amber-400" />
          <span>Interactive Sibling Trivia</span>
        </div>
        <h2 className="font-festive text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-rose-400">
          How Well Do We Know Our Bond? 🧠✨
        </h2>
        <p className="text-slate-300 text-sm max-w-lg mx-auto">
          A fun test of our 11th class meeting, college memories, and brother-sister chemistry!
        </p>
      </div>

      {/* Main Quiz Box */}
      <div className="bg-slate-900 border-2 border-amber-500/30 rounded-3xl p-6 sm:p-8 cartoon-card shadow-2xl relative">
        {!isCompleted ? (
          <div className="space-y-6">
            {/* Header progress info */}
            <div className="flex items-center justify-between text-xs font-bold text-amber-300 border-b border-slate-800 pb-3">
              <span>Question {currentIdx + 1} of {questions.length}</span>
              <span>Score: {score} 🌟</span>
            </div>

            {/* Question Text */}
            <div className="space-y-2">
              <h3 className="font-cartoon text-xl sm:text-2xl font-bold text-white leading-relaxed">
                {currentQ.question}
              </h3>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === opt;
                let btnStyle = 'bg-slate-800/90 text-slate-200 border-slate-700 hover:border-amber-400';

                if (selectedOption !== null) {
                  if (opt.correct) {
                    btnStyle = 'bg-emerald-950/80 border-emerald-400 text-emerald-200 shadow-md shadow-emerald-500/20';
                  } else if (isSelected && !opt.correct) {
                    btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                  } else {
                    btnStyle = 'opacity-50 bg-slate-800/40 border-slate-800 text-slate-400';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={selectedOption !== null}
                    onClick={() => handleSelectOption(opt)}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all font-cartoon font-semibold text-sm sm:text-base flex items-center justify-between cartoon-btn ${btnStyle}`}
                  >
                    <span>{opt.text}</span>
                    {selectedOption !== null && (
                      opt.correct ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 ml-2" />
                      ) : isSelected ? (
                        <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0 ml-2" />
                      ) : null
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback Message */}
            {feedback && (
              <div
                className={`p-3.5 rounded-xl text-xs sm:text-sm font-medium animate-bounce-gentle border ${
                  feedback.type === 'success'
                    ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-200'
                    : 'bg-rose-950/70 border-rose-500/50 text-rose-200'
                }`}
              >
                {feedback.text}
              </div>
            )}

            {/* Next Button */}
            {selectedOption !== null && (
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNextQuestion}
                  className="cartoon-btn px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-cartoon font-bold text-sm"
                >
                  {currentIdx + 1 < questions.length ? 'Next Question →' : 'See Results 🏆'}
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Quiz Results View */
          <div className="text-center py-6 space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-rose-500 flex items-center justify-center text-3xl shadow-xl animate-bounce-gentle">
              🏆
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase font-bold text-amber-400 tracking-widest">
                Quiz Completed!
              </span>
              <h3 className="font-cartoon text-2xl sm:text-3xl font-bold text-white">
                Bond Rating: 100% Certified Sibling Bond! ❤️
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                You scored <strong className="text-amber-400">{score}</strong> out of <strong className="text-amber-400">{questions.length}</strong>!
                From meeting in 11th class to college, our trust and love are unmatched.
              </p>
            </div>

            {/* Badge Card */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-amber-500/40 max-w-sm mx-auto text-center space-y-1">
              <span className="text-xs text-rose-300 font-bold">Official Title Bestowed:</span>
              <div className="font-cartoon text-lg font-bold text-amber-300">
                👑 "11th Class Legends & Sibling Superstars"
              </div>
              <p className="text-[11px] text-slate-400">
                (Progress saved automatically in your browser's local memory)
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={handleRestart}
                className="cartoon-btn px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold inline-flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

