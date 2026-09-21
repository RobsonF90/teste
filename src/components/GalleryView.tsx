import React from 'react';
import { Language, translations } from '../translations';
import PhotoGallery from './PhotoGallery';
import { Sparkles, Calendar, GlassWater } from 'lucide-react';

interface GalleryViewProps {
  language: Language;
}

export default function GalleryView({ language }: GalleryViewProps) {
  const t = translations[language];

  return (
    <div className="space-y-12 pb-24">
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 text-center">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-mono uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Cabaret & Nightlife Gallery' : 'Galeria de Cabaret & Vida Noturna'}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-wider text-gold-gradient">
            {t.gallery.title}
          </h1>
          <div className="h-[1px] w-24 bg-gold/30 mx-auto" />
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            {t.gallery.subtitle}
          </p>
        </div>
      </section>

      {/* Main Photo Gallery Component */}
      <PhotoGallery language={language} />

      {/* Invitation Banner to Live Experience */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden border border-gold/30 p-8 sm:p-12 bg-gradient-to-r from-[#0c0c0c] via-[#14120a] to-[#0c0c0c] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
              {language === 'en' ? 'Experience the Artistry in Person' : 'Viva a Arte e a Sedução ao Vivo'}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {language === 'en'
                ? 'Every night at Mardigras NightClub brings new sensations, breathtaking live burlesque acts, and elite VIP bottle hospitality.'
                : 'Todas as noites no Mardigras NightClub trazem novas sensações, espetáculos de burlesco e serviço VIP exclusivo de garrafa.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/351913208108?text=${encodeURIComponent(
                language === 'en'
                  ? 'Hello, I was browsing the photo gallery and would like to reserve a VIP table for tonight.'
                  : 'Olá, estive a ver a galeria de fotos e gostaria de reservar uma mesa VIP para esta noite.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-gold hover:bg-gold-light text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>{language === 'en' ? 'Book VIP Table' : 'Reservar Mesa VIP'}</span>
            </a>

            <a
              href="#/shows"
              className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#111] hover:bg-neutral-800 border border-neutral-800 text-neutral-200 text-xs tracking-wider uppercase font-semibold transition-colors cursor-pointer"
            >
              <GlassWater className="w-4 h-4 text-gold" />
              <span>{language === 'en' ? 'Explore Drinks & Shows' : 'Ver Bebidas & Shows'}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
