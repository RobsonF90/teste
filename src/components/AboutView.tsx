import React, { useState } from 'react';
import { Language, translations } from '../translations';
import { Award, Star, Quote, Plus, User, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Import custom generated images
import clubVipLounge from '../assets/images/club_vip_lounge_1783389253637.jpg';

interface AboutViewProps {
  language: Language;
}

interface UserReview {
  id: string;
  author: string;
  text: string;
  rating: number;
  origin: string;
  date: string;
}

export default function AboutView({ language }: AboutViewProps) {
  const t = translations[language];

  // Testimonials state
  const [reviews, setReviews] = useState<UserReview[]>([
    {
      id: 'rev-1',
      author: t.about.review1Author,
      text: t.about.review1Text,
      rating: 5,
      origin: 'Google Review • London, UK',
      date: 'June 2026',
    },
    {
      id: 'rev-2',
      author: t.about.review2Author,
      text: t.about.review2Text,
      rating: 5,
      origin: 'TripAdvisor • Paris, France',
      date: 'May 2026',
    },
    {
      id: 'rev-3',
      author: t.about.review3Author,
      text: t.about.review3Text,
      rating: 5,
      origin: 'Zomato • Lisbon, PT',
      date: 'April 2026',
    },
  ]);

  // Form states
  const [showForm, setShowForm] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newText, setNewText] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newText.trim()) return;

    const addedReview: UserReview = {
      id: `user-rev-${Date.now()}`,
      author: newAuthor,
      text: newText,
      rating: newRating,
      origin: language === 'en' ? 'Verified Guest Review' : 'Avaliação de Hóspede Verificado',
      date: language === 'en' ? 'Just now' : 'Agora mesmo',
    };

    setReviews([addedReview, ...reviews]);
    setNewAuthor('');
    setNewText('');
    setNewRating(5);
    setFormSubmitted(true);

    setTimeout(() => {
      setFormSubmitted(false);
      setShowForm(false);
    }, 3000);
  };

  return (
    <div className="space-y-20 pb-20">
      {/* Editorial Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center space-y-3 mb-12">
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-wider text-gold-gradient">
            {t.about.title}
          </h1>
          <div className="h-[1px] w-24 bg-gold/30 mx-auto" />
          <p className="text-sm md:text-base text-neutral-400 max-w-xl mx-auto">
            {t.about.subtitle}
          </p>
        </div>

        {/* Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Frame */}
          <div className="lg:col-span-5 relative h-80 sm:h-96 rounded-xl overflow-hidden border border-gold/40 gold-glow">
            <img
              src={clubVipLounge}
              alt="Mardigras NightClub Luxury Lounge"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
            <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-black/85 border border-gold/40 rounded-xl p-4">
              <Award className="w-8 h-8 text-gold shrink-0" />
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-white font-mono">
                  {t.about.starsBadge}
                </h4>
                <p className="text-[10px] text-neutral-400 leading-normal">
                  {t.about.starsBadgeDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Right Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white tracking-wide">
              {t.about.conceptTitle}
            </h2>
            <div className="h-[1px] w-20 bg-gold/50" />
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
              {t.about.conceptP1}
            </p>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed font-sans">
              {t.about.conceptP2}
            </p>

            <div className="bg-neutral-950/50 border border-neutral-900 rounded-xl p-5 text-xs text-neutral-400 leading-relaxed font-mono flex items-start gap-3">
              <Star className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <span>
                {language === 'en'
                  ? 'Mardigras NightClub is recognized as a premier luxury nightlife standard. Smart casual elegant dress code is strictly enforced at entry. Right of admission reserved.'
                  : 'O Mardigras NightClub é reconhecido como o padrão de vida noturna e espetáculo de elite. O código de vestuário chique e elegante é obrigatório na entrada.'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials / Reviews Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-12">
          <div className="space-y-2 text-center sm:text-left">
            <h2 className="font-serif text-3xl font-semibold text-white tracking-wide">
              {t.about.reviewsTitle}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400">
              {t.about.reviewsSubtitle}
            </p>
          </div>

          <a
            href="https://g.page/r/Cf6ubGYJGIJdEBM/review"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 bg-[#0a0a0a] border border-gold text-gold font-semibold uppercase tracking-widest text-xs rounded hover:bg-gold hover:text-black transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> {language === 'en' ? 'Write a Review' : 'Escrever Avaliação'}
          </a>
        </div>

        {/* Expandable Review Submission Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-12 overflow-hidden"
            >
              <div className="max-w-2xl mx-auto bg-[#0a0a0a] border border-gold rounded-xl p-6 md:p-8 gold-glow">
                {formSubmitted ? (
                  <div className="text-center py-6 space-y-3">
                    <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                    <h3 className="font-serif text-xl font-semibold text-white">
                      {language === 'en' ? 'Review Published!' : 'Avaliação Publicada!'}
                    </h3>
                    <p className="text-xs text-neutral-400">
                      {language === 'en' ? 'Thank you. Your review has been successfully added below.' : 'Obrigado. A sua avaliação foi adicionada abaixo.'}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <h3 className="font-serif text-lg font-semibold text-white mb-2">
                      {language === 'en' ? 'Share Your Experience' : 'Partilhe a Sua Experiência'}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase font-mono tracking-wider text-gold/80 mb-1 font-semibold">
                          {language === 'en' ? 'Your Name' : 'Seu Nome'}
                        </label>
                        <input
                          type="text"
                          required
                          value={newAuthor}
                          onChange={(e) => setNewAuthor(e.target.value)}
                          placeholder="e.g. Robert J."
                          className="w-full bg-neutral-900 border border-neutral-800 rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-gold transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-mono tracking-wider text-gold/80 mb-1 font-semibold">
                          {language === 'en' ? 'Rating' : 'Classificação'}
                        </label>
                        <div className="flex items-center gap-2 h-10">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setNewRating(star)}
                              className="text-gold hover:scale-110 transition-transform cursor-pointer focus:outline-none"
                            >
                              <Star
                                className={`w-5 h-5 ${
                                  star <= newRating ? 'fill-gold text-gold' : 'text-neutral-700'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-mono tracking-wider text-gold/80 mb-1 font-semibold">
                        {language === 'en' ? 'Your Review' : 'Sua Avaliação'}
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        placeholder={language === 'en' ? 'How was your night at Mardigras NightClub...' : 'Como foi a sua noite no Mardigras NightClub...'}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-gold transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-3 bg-gold-gradient text-black font-semibold uppercase tracking-widest text-[10px] rounded hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                    >
                      {language === 'en' ? 'Publish Review' : 'Publicar Avaliação'}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Testimonials List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {reviews.map((rev) => (
              <motion.div
                layout
                key={rev.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#0a0a0a] border border-neutral-900 rounded-xl p-6 relative flex flex-col justify-between hover:border-gold/30 transition-all group"
              >
                {/* Accent quote icon */}
                <div className="absolute top-4 right-4 text-neutral-900 group-hover:text-gold/10 transition-colors pointer-events-none">
                  <Quote className="w-10 h-10 transform rotate-180" />
                </div>

                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating ? 'fill-gold text-gold' : 'text-neutral-800'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                    "{rev.text}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="border-t border-neutral-900/60 pt-4 mt-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-gold/80">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">
                      {rev.author}
                    </h4>
                    <div className="flex items-center gap-1.5 text-[9px] text-neutral-500 font-mono">
                      <span>{rev.origin}</span>
                      <span>•</span>
                      <span>{rev.date}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
