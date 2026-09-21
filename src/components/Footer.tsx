import React from 'react';
import { Language, translations } from '../translations';
import { Sparkles, Instagram, ShieldAlert, MessageCircle } from 'lucide-react';
import BrandLogo from './BrandLogo';

interface FooterProps {
  language: Language;
  onNavigate: (view: 'home' | 'shows' | 'gallery' | 'about' | 'contact') => void;
}

export default function Footer({ language, onNavigate }: FooterProps) {
  const t = translations[language];

  return (
    <footer className="bg-neutral-950 border-t border-gold/20 py-12 md:py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Slogan column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
              <BrandLogo size="md" />
            </div>
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              {t.footer.description}
            </p>
            <p className="text-xs text-neutral-500 font-mono">
              Exclusive Luxury Nightlife Experience
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xs font-semibold text-gold uppercase tracking-widest mb-4">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-gold-light transition-colors cursor-pointer text-left">
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shows')} className="hover:text-gold-light transition-colors cursor-pointer text-left">
                  {t.nav.shows}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gallery')} className="hover:text-gold-light transition-colors cursor-pointer text-left">
                  {t.nav.gallery}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-gold-light transition-colors cursor-pointer text-left">
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-gold-light transition-colors cursor-pointer text-left">
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Policies & Socials */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-semibold text-gold uppercase tracking-widest mb-4">
                {language === 'en' ? 'Connect' : 'Ligar'}
              </h3>
              <div className="flex space-x-4">
                <a
                  href="https://wa.me/351913208108"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-gold hover:border-gold/50 transition-all cursor-pointer"
                  title="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/nightclubmardigras?igsi=MTc0MnhpMGZ2NGQxNA%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-gold hover:border-gold/50 transition-all cursor-pointer"
                  title="Instagram @nightclubmardigras"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Warning card */}
            <div className="bg-neutral-900/60 border border-red-950/40 rounded-lg p-3 flex gap-2 items-start">
              <ShieldAlert className="w-4 h-4 text-gold shrink-0 mt-0.5 animate-pulse" />
              <p className="text-[10px] text-neutral-400 leading-normal">
                {t.footer.warningAge}
              </p>
            </div>
          </div>
        </div>

        <div className="h-[1px] bg-neutral-900 my-10" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-neutral-500 font-mono">
            {t.footer.rights}{' '}
            <span className="text-neutral-600">
              By{' '}
              <a
                href="https://wa.me/5191982527909?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20sites%20que%20voce%20cria."
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-gold transition-colors font-semibold"
              >
                Localize Assessoria
              </a>
            </span>
          </p>
          <p className="text-xs text-neutral-500 hover:text-gold transition-colors cursor-pointer font-mono">
            MARDIGRAS NIGHTCLUB • VIP LOUNGE • CABARET & BAR
          </p>
        </div>
      </div>
    </footer>
  );
}
