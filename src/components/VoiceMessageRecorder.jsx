import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, Pause, Download, Volume2, Sparkles, RefreshCw } from 'lucide-react';
import { sounds } from '../utils/audioSynthesizer';
import { SISTER_CONFIG } from '../data/config';

export default function VoiceMessageRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPlayingRecorded, setIsPlayingRecorded] = useState(false);
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);
  const [micError, setMicError] = useState("");

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const recordedAudioRef = useRef(null);
  const demoAudioRef = useRef(null);

  // Start Recording via MediaRecorder API
  const startRecording = async () => {
    try {
      setMicError("");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(url);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);
      sounds.playPop();

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.warn("Microphone access error:", err);
      setMicError("Microphone access was denied or not supported in this browser. You can still test the demo voice greeting below!");
    }
  };

  // Stop Recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
      clearInterval(timerRef.current);
      sounds.playCelebration();
    }
  };

  // Toggle Play Recorded
  const togglePlayRecorded = () => {
    if (!recordedAudioRef.current) return;
    if (isPlayingRecorded) {
      recordedAudioRef.current.pause();
      setIsPlayingRecorded(false);
    } else {
      recordedAudioRef.current.play();
      setIsPlayingRecorded(true);
    }
  };

  // Toggle Synthesized / Demo Voice Greeting
  const togglePlayDemo = () => {
    if (isPlayingDemo) {
      sounds.stopBgm();
      window.speechSynthesis?.cancel();
      setIsPlayingDemo(false);
    } else {
      setIsPlayingDemo(true);
      sounds.playChime();
      if ('speechSynthesis' in window) {
        const text = `Happy Bhai Dooj, Shikha! From meeting in 11th class to college and beyond, you are the most wonderful sister from another mother. I am always in your corner. May your life be filled with happiness and laughter!`;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.pitch = 1.05;
        utterance.onend = () => setIsPlayingDemo(false);
        utterance.onerror = () => setIsPlayingDemo(false);
        window.speechSynthesis.speak(utterance);
      } else {
        setTimeout(() => setIsPlayingDemo(false), 4000);
      }
    }
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainSecs.toString().padStart(2, '0')}`;
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider">
          <Mic className="w-4 h-4 text-rose-400" />
          <span>MediaRecorder Voice Studio</span>
        </div>
        <h2 className="font-festive text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-300 to-purple-400">
          Brother's Voice Message Studio 🎙️
        </h2>
        <p className="text-slate-300 text-sm max-w-lg mx-auto">
          Record a live personal Bhai Dooj audio note for Shikha, listen back, or play the spoken festive greeting!
        </p>
      </div>

      <div className="bg-slate-900 border-2 border-rose-500/30 rounded-3xl p-6 sm:p-8 cartoon-card shadow-2xl space-y-6">
        {/* Built-in Greeting Button */}
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
              Instant Brother Greeting
            </span>
            <h4 className="font-cartoon text-base font-bold text-white">
              Spoken Bhai Dooj Audio Blessing for Shikha
            </h4>
            <p className="text-xs text-slate-300">
              Listen to the browser's spoken tribute celebrating our 11th-class bond!
            </p>
          </div>
          <button
            onClick={togglePlayDemo}
            className={`cartoon-btn px-5 py-2.5 rounded-xl font-cartoon font-bold text-xs flex items-center gap-2 whitespace-nowrap ${
              isPlayingDemo
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-amber-500 text-slate-950 hover:bg-amber-400'
            }`}
          >
            {isPlayingDemo ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlayingDemo ? 'Stop Speaking' : 'Play Audio Blessing 🔊'}</span>
          </button>
        </div>

        {/* Live Microphone Recording Section */}
        <div className="p-6 rounded-2xl bg-slate-950/50 border border-slate-800 text-center space-y-4">
          <div className="space-y-1">
            <h4 className="font-cartoon text-lg font-bold text-slate-200">
              Record a Real Voice Note (MediaRecorder API)
            </h4>
            <p className="text-xs text-slate-400">
              Click record, speak into your microphone, and create a heartfelt voice message!
            </p>
          </div>

          {/* Recording Timer & Waveform */}
          {isRecording && (
            <div className="space-y-3">
              <div className="text-2xl font-mono font-bold text-rose-500 animate-pulse">
                🔴 {formatTime(recordingTime)}
              </div>
              <div className="flex justify-center items-center gap-1.5 h-8">
                {Array.from({ length: 14 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 bg-rose-500 rounded-full animate-bounce"
                    style={{
                      height: `${12 + (i % 5) * 8}px`,
                      animationDelay: `${i * 0.1}s`
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {micError && (
            <div className="p-3 bg-amber-950/60 border border-amber-500/40 rounded-xl text-xs text-amber-200">
              {micError}
            </div>
          )}

          {/* Record / Stop Action Buttons */}
          <div className="flex justify-center gap-3">
            {!isRecording ? (
              <button
                onClick={startRecording}
                className="cartoon-btn px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-rose-600 text-white font-cartoon font-bold text-sm inline-flex items-center gap-2 hover:scale-105 shadow-lg shadow-rose-500/25"
              >
                <Mic className="w-4 h-4" />
                <span>Start Recording Voice Note</span>
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="cartoon-btn px-6 py-3 rounded-2xl bg-slate-800 border-2 border-rose-500 text-rose-400 font-cartoon font-bold text-sm inline-flex items-center gap-2 hover:bg-slate-700 animate-pulse"
              >
                <Square className="w-4 h-4 fill-rose-400" />
                <span>Stop & Save Recording</span>
              </button>
            )}
          </div>

          {/* Recorded Audio Playback & Download */}
          {recordedAudioUrl && (
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="text-xs font-bold text-emerald-400">
                ✅ Voice note recorded successfully!
              </div>

              <audio
                ref={recordedAudioRef}
                src={recordedAudioUrl}
                onEnded={() => setIsPlayingRecorded(false)}
                className="hidden"
              />

              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={togglePlayRecorded}
                  className="cartoon-btn px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-cartoon font-bold text-xs inline-flex items-center gap-1.5"
                >
                  {isPlayingRecorded ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlayingRecorded ? 'Pause Note' : 'Listen Back'}</span>
                </button>

                <a
                  href={recordedAudioUrl}
                  download="Shikha_Bhai_Dooj_Voice_Note.webm"
                  className="cartoon-btn px-5 py-2 rounded-xl bg-slate-800 text-slate-200 hover:text-white font-cartoon font-bold text-xs inline-flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Audio (.webm)</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

