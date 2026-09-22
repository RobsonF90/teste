import React from 'react';
import { Language, translations } from '../translations';
import { Sparkles, Instagram, ShieldAlert } from 'lucide-react';
import BrandLogo from './BrandLogo';

interface FooterProps {
  language: Language;
  onNavigate: (view: 'home' | 'shows' | 'gallery' | 'about' | 'contact' | 'casting') => void;
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
            <p className="text-sm sm:text-base text-neutral-300 max-w-md leading-relaxed font-normal">
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
              <li>
                <button onClick={() => onNavigate('casting')} className="hover:text-gold-light transition-colors cursor-pointer text-left text-emerald-400 flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {t.nav.casting}
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
                  href={`https://wa.me/351913208108?text=${encodeURIComponent('Hello, I came through the website, I would like more information.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-[#25D366] hover:border-[#25D366]/50 transition-all cursor-pointer group shadow-sm hover:shadow-[0_0_12px_rgba(37,211,102,0.25)]"
                  title="WhatsApp: +351 913 208 108"
                  aria-label="WhatsApp"
                >
                  <svg className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.428 1.98 13.96 1.05 11.47 1.05 6.03 1.05 1.61 5.424 1.606 10.856c-.001 1.704.451 3.371 1.31 4.887L1.93 20.17l4.717-1.016zM17.41 14.92c-.317-.159-1.88-.93-2.172-1.036-.29-.105-.503-.159-.714.159-.211.318-.818 1.036-1.003 1.248-.185.21-.37.238-.687.08-1.3-.647-2.316-1.185-3.232-2.76-.242-.415.242-.385.693-1.285.074-.15.037-.282-.019-.395-.056-.113-.503-1.218-.69-1.667-.181-.438-.364-.378-.503-.385-.13-.006-.279-.007-.428-.007-.15 0-.395.056-.602.282-.207.227-.79.773-.79 1.884s.806 2.186.918 2.337c.112.15 1.583 2.427 3.834 3.4s2.996 1.157 3.541 1.012c1.17-.31 1.88-1.22 2.17-2.036z"/>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/nightclubmardigras?igsi=MTc0MnhpMGZ2NGQxNA%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-pink-400 hover:border-pink-500/50 transition-all cursor-pointer group shadow-sm hover:shadow-[0_0_12px_rgba(236,72,153,0.25)]"
                  title="Instagram @nightclubmardigras"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
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
