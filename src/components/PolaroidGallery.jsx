import React, { useState, useEffect } from 'react';
import { Camera, Image as ImageIcon, Plus, X, Heart, Sparkles, Tag, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { SISTER_CONFIG } from '../data/config';
import { sounds } from '../utils/audioSynthesizer';

export default function PolaroidGallery() {
  const [polaroids, setPolaroids] = useState(SISTER_CONFIG.polaroids);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCaption, setNewCaption] = useState("");
  const [newTag, setNewTag] = useState("11th Class & College Memories");
  const [previewUrl, setPreviewUrl] = useState("");

  // Categories for filter
  const filterCategories = [
    { id: 'All', label: 'All Photos (7)' },
    { id: '11th Class', label: '🎒 11th Class Era' },
    { id: 'College', label: '🎓 College Days' },
    { id: 'Sister', label: '🫂 Sister Bond' },
    { id: 'Bhai Dooj', label: '🪔 Bhai Dooj Special' },
  ];

  const filteredPolaroids = polaroids.filter((item) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === '11th Class') return item.tag.includes('11th') || item.caption.includes('11th');
    if (activeFilter === 'College') return item.tag.includes('College') || item.caption.includes('College');
    if (activeFilter === 'Sister') return item.tag.includes('Sister') || item.tag.includes('Drama');
    if (activeFilter === 'Bhai Dooj') return item.tag.includes('Bhai Dooj') || item.caption.includes('Bhai Dooj');
    return true;
  });

  // Handle Keyboard navigation in lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'ArrowRight') {
        setSelectedPhotoIndex((prev) => (prev + 1) % filteredPolaroids.length);
        sounds.playPop();
      } else if (e.key === 'ArrowLeft') {
        setSelectedPhotoIndex((prev) => (prev - 1 + filteredPolaroids.length) % filteredPolaroids.length);
        sounds.playPop();
      } else if (e.key === 'Escape') {
        setSelectedPhotoIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, filteredPolaroids.length]);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleAddMemory = () => {
    if (!previewUrl && !newCaption) return;
    sounds.playCelebration();
    const newEntry = {
      id: `custom-${Date.now()}`,
      image: previewUrl || SISTER_CONFIG.photos.heroPortrait,
      caption: newCaption || "A special memory between siblings ❤️",
      tag: newTag,
      date: "Forever Memory"
    };
    setPolaroids([newEntry, ...polaroids]);
    setShowAddModal(false);
    setNewCaption("");
    setPreviewUrl("");
  };

  const currentLightboxPhoto = selectedPhotoIndex !== null ? filteredPolaroids[selectedPhotoIndex] : null;

  return (
    <section id="memories" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
          <Camera className="w-4 h-4 text-amber-400" />
          <span>Shikha's Nostalgia Vault</span>
        </div>
        <h2 className="font-festive text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-rose-400">
          The Complete Sister Polaroid Gallery 📸✨
        </h2>
        <p className="text-slate-300 text-sm max-w-xl mx-auto">
          Every moment, every smile, and every memory from 11th class until today. Click any photo to view full size!
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 pt-3">
          {filterCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveFilter(cat.id);
                sounds.playPop();
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-cartoon font-bold transition-all border ${
                activeFilter === cat.id
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Add Real Photo Quick Button */}
        <div className="pt-2">
          <button
            onClick={() => {
              setShowAddModal(true);
              sounds.playPop();
            }}
            className="cartoon-btn px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold inline-flex items-center gap-2 border border-amber-500/30 shadow-md"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Upload Another Memory Photo</span>
          </button>
        </div>
      </div>

      {/* Polaroids Board */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pt-4">
        {filteredPolaroids.map((item, idx) => {
          // Alternating playful tilt angles
          const tilt = idx % 4 === 0 ? '-rotate-2' : idx % 4 === 1 ? 'rotate-2' : idx % 4 === 2 ? '-rotate-1' : 'rotate-3';

          return (
            <div
              key={item.id}
              onClick={() => {
                setSelectedPhotoIndex(idx);
                sounds.playPop();
              }}
              className={`bg-white p-3.5 pb-6 rounded-2xl shadow-xl transform ${tilt} hover:rotate-0 hover:scale-105 transition-all duration-300 cursor-pointer group relative`}
            >
              {/* Cute Washi Tape */}
              <div className="washi-tape" />

              {/* Photo Frame */}
              <div className="aspect-[4/5] rounded-xl overflow-hidden bg-slate-100 border border-slate-200 relative">
                <img
                  src={item.image}
                  alt={item.caption}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = "/photos/sister.jpg";
                  }}
                />
                <div className="absolute top-2 right-2 bg-slate-900/70 backdrop-blur-sm px-2 py-0.5 rounded-full text-[9px] text-amber-300 font-bold border border-amber-400/30">
                  {item.tag}
                </div>
              </div>

              {/* Caption */}
              <div className="mt-3 px-1 text-center">
                <p className="font-handwritten text-lg font-bold text-slate-800 leading-snug">
                  {item.caption}
                </p>
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-sans mt-2 pt-2 border-t border-slate-100">
                  <span className="font-semibold text-rose-500">❤️ Shikha</span>
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enhanced Lightbox Modal with Next / Prev Navigation */}
      {currentLightboxPhoto && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-2xl w-full bg-slate-900 border-2 border-amber-400/60 rounded-3xl p-6 cartoon-card shadow-2xl space-y-4">
            {/* Header controls */}
            <div className="flex items-center justify-between text-xs text-amber-400 font-bold">
              <span>Photo {selectedPhotoIndex + 1} of {filteredPolaroids.length}</span>
              <button
                onClick={() => setSelectedPhotoIndex(null)}
                className="p-1.5 rounded-full bg-slate-800 text-slate-300 hover:text-white"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Photo Container with navigation arrows */}
            <div className="relative aspect-[4/5] max-h-[60vh] rounded-2xl overflow-hidden bg-slate-950 border border-slate-700 flex items-center justify-center">
              <img
                src={currentLightboxPhoto.image}
                alt={currentLightboxPhoto.caption}
                className="w-full h-full object-contain"
              />

              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPhotoIndex((prev) => (prev - 1 + filteredPolaroids.length) % filteredPolaroids.length);
                  sounds.playPop();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-950/80 hover:bg-amber-500 text-white hover:text-slate-950 transition-colors shadow-xl"
                aria-label="Previous Photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPhotoIndex((prev) => (prev + 1) % filteredPolaroids.length);
                  sounds.playPop();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-950/80 hover:bg-amber-500 text-white hover:text-slate-950 transition-colors shadow-xl"
                aria-label="Next Photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Caption & Details */}
            <div className="text-center space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                {currentLightboxPhoto.tag}
              </span>
              <h3 className="font-cartoon text-lg font-bold text-white">
                {currentLightboxPhoto.caption}
              </h3>
              <p className="text-xs text-rose-300 font-medium">
                "Shikha Sapkota • Sister from another mother since 11th class"
              </p>

              <div className="pt-2 flex justify-center">
                <a
                  href={currentLightboxPhoto.image}
                  download={`Shikha_Memory_${selectedPhotoIndex + 1}.jpg`}
                  className="cartoon-btn px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold inline-flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download This Photo</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Memory Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-md w-full bg-slate-900 border-2 border-amber-400/60 rounded-3xl p-6 cartoon-card shadow-2xl space-y-4">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 text-center">
              <h3 className="font-cartoon text-xl font-bold text-amber-300">
                Add a Real Photo / Memory 📸
              </h3>
              <p className="text-xs text-slate-300">
                Upload any picture of Shikha or our school/college days to see it live on the memory wall!
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Upload Photo:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full text-xs text-slate-300 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-500 file:text-slate-950 hover:file:bg-amber-400 cursor-pointer"
                />
              </div>

              {previewUrl && (
                <div className="w-24 h-24 mx-auto rounded-xl overflow-hidden border border-amber-400">
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Memory Caption:
                </label>
                <input
                  type="text"
                  placeholder="e.g. 11th class canteen laughs, college hangout..."
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Memory Tag:
                </label>
                <input
                  type="text"
                  placeholder="e.g. 11th Grade, Canteen Era..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddMemory}
                  className="cartoon-btn px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-cartoon font-bold text-xs"
                >
                  Save to Polaroid Wall 📌
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
