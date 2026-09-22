import React, { useState } from 'react';
import { translations, Language } from '../translations';
import { Sparkles, Check, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';
import BrandLogo from './BrandLogo';
import heroCabaretShow from '../assets/images/gallery_featured_upscaled.jpg';

interface SplashProps {
  onEnter: (lang: Language) => void;
}

export default function Splash({ onEnter }: SplashProps) {
  const [selectedLang, setSelectedLang] = useState<Language>('en');
  const [ageChecked, setAgeChecked] = useState(false);
  const [showError, setShowError] = useState(false);

  const t = translations[selectedLang];

  const handleEnter = () => {
    if (!ageChecked) {
      setShowError(true);
      return;
    }
    onEnter(selectedLang);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505] p-4 overflow-y-auto">
      {/* Rich club background image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src={heroCabaretShow} 
          alt="" 
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover scale-105 filter blur-sm opacity-35" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,160,40,0.15),transparent_60%)] pointer-events-none" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-lg bg-[#0a0a0a] border border-gold rounded-2xl p-8 md:p-10 gold-glow"
      >
        {/* Decorative corner borders */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold rounded-tl-2xl animate-pulse" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold rounded-tr-2xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold rounded-bl-2xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold rounded-br-2xl animate-pulse" />

        <div className="text-center mb-8">
          <div className="flex justify-center mb-6 py-2">
            <BrandLogo size="xl" />
          </div>
          <div className="h-[1px] w-24 bg-gold/30 mx-auto my-4" />
          <p className="text-sm text-neutral-300 leading-relaxed max-w-sm mx-auto">
            {t.splash.description}
          </p>
        </div>

        {/* Language Selection */}
        <div className="mb-8">
          <p className="text-xs text-center uppercase tracking-wider text-gold/80 mb-4 font-semibold">
            {t.splash.choose}
          </p>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => {
                setSelectedLang('en');
                setShowError(false);
              }}
              className={`flex items-center justify-center gap-3 py-3 px-4 rounded-lg border text-sm font-medium tracking-wide transition-all ${
                selectedLang === 'en'
                  ? 'bg-gold/10 border-gold text-gold font-semibold'
                  : 'bg-neutral-900/50 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
              }`}
            >
              <span className="text-lg">🇬🇧</span> English
            </button>
            <button
              onClick={() => {
                setSelectedLang('pt');
                setShowError(false);
              }}
              className={`flex items-center justify-center gap-3 py-3 px-4 rounded-lg border text-sm font-medium tracking-wide transition-all ${
                selectedLang === 'pt'
                  ? 'bg-gold/10 border-gold text-gold font-semibold'
                  : 'bg-neutral-900/50 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
              }`}
            >
              <span className="text-lg">🇵🇹</span> Português
            </button>
          </div>
        </div>

        {/* Age Check Box */}
        <div className="mb-8 bg-neutral-950/40 border border-neutral-900 rounded-xl p-4">
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center mt-1">
              <input
                type="checkbox"
                checked={ageChecked}
                onChange={(e) => {
                  setAgeChecked(e.target.checked);
                  if (e.target.checked) setShowError(false);
                }}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 rounded border transition-all flex items-center justify-center ${
                  ageChecked
                    ? 'bg-gold border-gold text-black'
                    : 'bg-neutral-950 border-neutral-800 group-hover:border-gold/50'
                }`}
              >
                {ageChecked && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
              </div>
            </div>
            <span className="text-xs text-neutral-300 leading-relaxed select-none">
              {t.splash.ageCheck}
            </span>
          </label>

          {showError && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mt-3 text-red-400 text-xs"
            >
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{t.splash.ageWarning}</span>
            </motion.div>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={handleEnter}
          className="w-full py-4 bg-gold-gradient hover:opacity-90 active:scale-[0.98] text-black font-semibold uppercase tracking-widest text-xs rounded-xl shadow-lg shadow-gold/15 transition-all cursor-pointer"
        >
          {t.splash.enter}
        </button>

        <div className="text-center mt-6">
          <p className="text-[10px] text-neutral-500 leading-normal font-mono max-w-xs mx-auto">
            18+ ONLY • MARDIGRAS NIGHTCLUB • LUXURY ENTERTAINMENT
          </p>
        </div>
      </motion.div>
    </div>
  );
}
