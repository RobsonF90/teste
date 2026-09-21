import React, { useState, useEffect } from 'react';
import { Language } from './translations';

// Components
import Splash from './components/Splash';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import ShowsView from './components/ShowsView';
import GalleryView from './components/GalleryView';
import AboutView from './components/AboutView';
import ContactView from './components/ContactView';

import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [showSplash, setShowSplash] = useState(true);
  const [currentView, setCurrentView] = useState<'home' | 'shows' | 'gallery' | 'about' | 'contact'>('home');

  // Verify stored configurations on mount
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('stars-bar-lang') as Language | null;
      const ageVerified = localStorage.getItem('stars-bar-age-verified') === 'true';

      if (savedLang && ageVerified) {
        setLanguage(savedLang);
        setShowSplash(false);
      } else {
        setShowSplash(true);
      }
    } catch {
      setShowSplash(false);
    }
  }, []);

  // Hash-based routing to allow browser back/forward and permanent links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '');
      if (['home', 'shows', 'gallery', 'about', 'contact'].includes(hash)) {
        setCurrentView(hash as any);
        // Scroll back to top on navigation to feel like a separate page
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        window.location.hash = '#/home';
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    // Initial load check
    if (!window.location.hash || window.location.hash === '#') {
      window.location.hash = '#/home';
    } else {
      handleHashChange();
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Set Language chosen in Entrance splash screen
  const handleEnterExperience = (lang: Language) => {
    setLanguage(lang);
    try {
      localStorage.setItem('stars-bar-lang', lang);
      localStorage.setItem('stars-bar-age-verified', 'true');
    } catch {}
    setShowSplash(false);
  };

  // Change Language from top menu
  const handleChangeLanguage = (lang: Language) => {
    setLanguage(lang);
    try {
      localStorage.setItem('stars-bar-lang', lang);
    } catch {}
  };

  // Navigate to view by updating window hash
  const handleNavigate = (view: 'home' | 'shows' | 'gallery' | 'about' | 'contact') => {
    window.location.hash = `#/${view}`;
  };

  return (
    <div className="min-h-screen bg-black text-neutral-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      
      {/* 18+ Language Splash Screen Overlay */}
      <AnimatePresence>
        {showSplash && (
          <Splash onEnter={handleEnterExperience} />
        )}
      </AnimatePresence>

      {/* Main App Layout */}
      {!showSplash && (
        <>
          <Header
            currentView={currentView}
            onNavigate={handleNavigate}
            language={language}
            onChangeLanguage={handleChangeLanguage}
          />

          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentView}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                {currentView === 'home' && (
                  <HomeView language={language} onNavigate={handleNavigate} />
                )}
                {currentView === 'shows' && (
                  <ShowsView language={language} />
                )}
                {currentView === 'gallery' && (
                  <GalleryView language={language} />
                )}
                {currentView === 'about' && (
                  <AboutView language={language} />
                )}
                {currentView === 'contact' && (
                  <ContactView language={language} />
                )}
              </motion.div>
            </AnimatePresence>
          </main>

          <Footer language={language} onNavigate={handleNavigate} />
        </>
      )}
    </div>
  );
}
