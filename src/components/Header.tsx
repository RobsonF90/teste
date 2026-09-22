import React, { useState } from 'react';
import { Language, translations } from '../translations';
import { Menu, X, Sparkles, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import BrandLogo from './BrandLogo';
import headerBg from '../assets/images/header_background_1783896110456.jpg';

interface HeaderProps {
  currentView: 'home' | 'shows' | 'gallery' | 'about' | 'contact' | 'casting';
  onNavigate: (view: 'home' | 'shows' | 'gallery' | 'about' | 'contact' | 'casting') => void;
  language: Language;
  onChangeLanguage: (lang: Language) => void;
}

export default function Header({ currentView, onNavigate, language, onChangeLanguage }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [bgSrc, setBgSrc] = useState(headerBg);
  const t = translations[language];

  const menuItems = [
    { key: 'home', label: t.nav.home },
    { key: 'shows', label: t.nav.shows },
    { key: 'gallery', label: t.nav.gallery },
    { key: 'about', label: t.nav.about },
    { key: 'contact', label: t.nav.contact },
    { key: 'casting', label: t.nav.casting },
  ] as const;

  const handleLinkClick = (key: 'home' | 'shows' | 'gallery' | 'about' | 'contact' | 'casting') => {
    onNavigate(key);
    setIsOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#0a0a0a]/45 backdrop-blur-md border-b border-gold/20 overflow-hidden">
        {/* Header Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none opacity-50 bg-[#0a0a0a]"
          style={{
            backgroundImage: `url(${bgSrc}), url('/header_background.jpg'), url('/images/header_background_1783896110456.jpg')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <img 
            src={bgSrc} 
            alt="Mardigras NightClub Header Background" 
            loading="eager"
            decoding="async"
            onError={() => {
              if (bgSrc !== '/header_background.jpg') {
                setBgSrc('/header_background.jpg');
              } else if (bgSrc !== '/images/header_background_1783896110456.jpg') {
                setBgSrc('/images/header_background_1783896110456.jpg');
              }
            }}
            className="w-full h-full object-cover object-center brightness-110"
          />
          {/* Gradients to blend smoothly */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]/60" />

          {/* Dynamic Nightclub Club Spotlights / Lasers */}
          <div className="absolute inset-0 overflow-hidden opacity-40 mix-blend-color-dodge">
            {/* Cyan Laser Spotlight */}
            <motion.div 
              className="absolute -top-1/2 -left-1/4 w-[300px] h-[300px] rounded-full bg-gradient-to-br from-cyan-500/30 via-blue-600/5 to-transparent blur-3xl"
              animate={{
                x: [0, 180, -90, 0],
                y: [0, -30, 80, 0],
                scale: [1, 1.25, 0.85, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* Magenta Laser Spotlight */}
            <motion.div 
              className="absolute -top-1/2 -right-1/4 w-[300px] h-[300px] rounded-full bg-gradient-to-bl from-pink-500/30 via-purple-600/5 to-transparent blur-3xl"
              animate={{
                x: [0, -180, 90, 0],
                y: [0, 60, -30, 0],
                scale: [1, 0.85, 1.3, 1],
              }}
              transition={{
                duration: 13,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* Gold Laser Spotlight */}
            <motion.div 
              className="absolute top-0 left-1/3 w-[250px] h-[250px] rounded-full bg-gradient-to-b from-gold/25 to-transparent blur-3xl"
              animate={{
                scale: [0.8, 1.15, 0.8],
                opacity: [0.4, 0.75, 0.4],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Dynamic Nightclub Strobe Flash Overlays */}
          <motion.div 
            className="absolute inset-0 bg-white/25 mix-blend-overlay pointer-events-none"
            animate={{
              opacity: [0, 0.12, 0, 0.35, 0, 0, 0.45, 0, 0.15, 0, 0, 0, 0.65, 0, 0],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div 
            className="absolute inset-0 bg-gold/20 mix-blend-color-dodge pointer-events-none"
            animate={{
              opacity: [0, 0.25, 0, 0, 0.35, 0, 0.15, 0, 0, 0.45, 0, 0],
            }}
            transition={{
              duration: 4.2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div 
              className="flex-shrink-0 flex items-center gap-2 cursor-pointer transition-transform hover:scale-105 duration-300 py-1" 
              onClick={() => onNavigate('home')}
            >
              <BrandLogo size="md" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {menuItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleLinkClick(item.key)}
                  className={`relative py-2 text-xs font-medium uppercase tracking-widest transition-colors cursor-pointer ${
                    currentView === item.key
                      ? 'text-gold'
                      : 'text-neutral-300 hover:text-gold-light'
                  }`}
                >
                  {item.label}
                  {currentView === item.key && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Language Toggle + CTA */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Language toggle buttons */}
              <div className="flex items-center bg-neutral-950 border border-neutral-900 rounded-full p-1">
                <button
                  onClick={() => onChangeLanguage('en')}
                  className={`px-3 py-1 text-[10px] font-bold tracking-wider rounded-full transition-all cursor-pointer ${
                    language === 'en'
                      ? 'bg-gold text-black shadow-sm shadow-gold/20'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => onChangeLanguage('pt')}
                  className={`px-3 py-1 text-[10px] font-bold tracking-wider rounded-full transition-all cursor-pointer ${
                    language === 'pt'
                      ? 'bg-gold text-black shadow-sm shadow-gold/20'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  PT
                </button>
              </div>

              {/* Book Now Button */}
              <button
                onClick={() => onNavigate('contact')}
                className="px-5 py-2.5 bg-transparent border border-gold text-gold font-semibold uppercase tracking-widest text-[10px] rounded hover:bg-gold hover:text-black transition-all duration-300 shadow-sm shadow-gold/5 cursor-pointer"
              >
                {t.nav.bookNow}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-4">
              {/* Language switcher shortcut */}
              <div className="flex items-center bg-neutral-950 border border-neutral-900 rounded-full p-0.5">
                <button
                  onClick={() => onChangeLanguage(language === 'en' ? 'pt' : 'en')}
                  className="px-2.5 py-1 text-[9px] font-bold tracking-wider rounded-full text-gold flex items-center gap-1 cursor-pointer"
                >
                  <Globe className="w-2.5 h-2.5" />
                  {language.toUpperCase()}
                </button>
              </div>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-neutral-300 hover:text-gold p-2 focus:outline-none cursor-pointer"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-20 z-30 bg-[#050505]/98 border-b border-gold/20 md:hidden overflow-hidden gold-glow"
          >
            <div className="px-6 py-8 space-y-6 flex flex-col">
              {menuItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleLinkClick(item.key)}
                  className={`text-left text-sm font-semibold uppercase tracking-widest py-2 transition-colors cursor-pointer ${
                    currentView === item.key ? 'text-gold pl-2 border-l-2 border-gold' : 'text-neutral-300 hover:text-gold-light'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="h-[1px] bg-neutral-900" />

              {/* Language switcher */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400 uppercase tracking-widest font-mono">Language / Idioma</span>
                <div className="flex items-center bg-neutral-950 border border-neutral-900 rounded-full p-1">
                  <button
                    onClick={() => onChangeLanguage('en')}
                    className={`px-4 py-1.5 text-xs font-bold tracking-wider rounded-full transition-all cursor-pointer ${
                      language === 'en' ? 'bg-gold text-black' : 'text-neutral-400'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => onChangeLanguage('pt')}
                    className={`px-4 py-1.5 text-xs font-bold tracking-wider rounded-full transition-all cursor-pointer ${
                      language === 'pt' ? 'bg-gold text-black' : 'text-neutral-400'
                    }`}
                  >
                    Português
                  </button>
                </div>
              </div>

              {/* CTA Booking Button */}
              <button
                onClick={() => handleLinkClick('contact')}
                className="w-full py-3.5 bg-gold-gradient text-black font-semibold uppercase tracking-widest text-xs rounded shadow-lg shadow-gold/10 transition-all text-center cursor-pointer"
              >
                {t.nav.bookNow}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
