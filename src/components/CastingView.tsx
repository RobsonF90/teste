import React from 'react';
import { Language, translations } from '../translations';
import {
  Briefcase,
  Sparkles,
  Clock,
  DollarSign,
  Shield,
  Home as HomeIcon,
  Lock,
  MessageCircle,
  CheckCircle2,
} from 'lucide-react';

interface CastingViewProps {
  language: Language;
}

export default function CastingView({ language }: CastingViewProps) {
  const t = translations[language];

  const whatsappRecruitmentUrl = `https://wa.me/351913208108?text=${encodeURIComponent(
    language === 'en'
      ? 'Hello! I am interested in applying to work at Mardigras NightClub. Here are my details (Name, Age, and recent photos):'
      : 'Olá! Tenho interesse em trabalhar no Mardigras NightClub. Seguem os meus dados (Nome, Idade e fotos recentes):'
  )}`;

  return (
    <div className="space-y-16 pb-20">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-14 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono tracking-widest uppercase">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'RECRUITMENT & CASTING' : 'RECRUTAMENTO & CASTING'}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-wider text-gold-gradient">
            {t.casting.heroTitle}
          </h1>
          <div className="h-[1px] w-24 bg-gold/40 mx-auto" />
          <p className="text-sm sm:text-base md:text-lg text-neutral-300 leading-relaxed font-normal">
            {t.casting.heroSubtitle}
          </p>

          {/* Quick highlight badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <span className="px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-gold text-xs font-mono font-medium">
              ✓ {t.casting.badgeLocation}
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-emerald-400 text-xs font-mono font-medium">
              ★ {t.casting.badgeIncome}
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-mono font-medium">
              🛡 {t.casting.badgeSafe}
            </span>
          </div>
        </div>

        {/* Vagas em Destaque */}
        <div className="mb-16">
          <div className="mb-8 text-center max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-wide">
              {t.casting.vacanciesTitle}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1.5">
              {t.casting.vacanciesSubtitle}
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Vaga: Dançarinas */}
            <div className="bg-[#0a0a0a] border border-gold/40 rounded-2xl p-7 sm:p-10 relative flex flex-col justify-between hover:border-gold transition-all duration-300 group shadow-2xl">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    onClick={() => window.open(whatsappRecruitmentUrl, '_blank', 'noopener,noreferrer')}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        window.open(whatsappRecruitmentUrl, '_blank', 'noopener,noreferrer');
                      }
                    }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/20 hover:bg-gold text-gold hover:text-black border border-gold/50 hover:border-gold text-xs font-mono uppercase font-bold tracking-wider transition-all duration-300 shadow-md hover:shadow-gold/30 hover:scale-105 cursor-pointer group/tag"
                    title={language === 'en' ? 'Click to apply via WhatsApp' : 'Clique para se candidatar via WhatsApp'}
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{t.casting.roleDancersTag}</span>
                    <span className="text-[10px] group-hover/tag:translate-x-0.5 transition-transform">→</span>
                  </span>
                  <Sparkles className="w-5 h-5 text-gold group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">
                  {t.casting.roleDancersTitle}
                </h3>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
                  {t.casting.roleDancersDesc}
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-neutral-900 flex items-center justify-between text-xs sm:text-sm text-gold/90 font-mono">
                <span>{language === 'en' ? 'Daily Commission & Generous Tips' : 'Comissões Diárias & Gorjetas Elevadas'}</span>
                <span className="px-2.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">+18</span>
              </div>
            </div>
          </div>
        </div>

        {/* O Que Oferecemos */}
        <div className="mb-16 bg-neutral-950/80 border border-neutral-800 rounded-2xl p-6 sm:p-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              {t.casting.benefitsTitle}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2">
              {t.casting.benefitsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Benefício 1: Ganhos elevados */}
            <div className="bg-[#0d0d0d] border border-neutral-800 rounded-xl p-6 flex items-start gap-4 hover:border-gold/30 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white mb-1.5">
                  {t.casting.benefit1Title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                  {t.casting.benefit1Desc}
                </p>
              </div>
            </div>

            {/* Benefício 2: Ambiente seguro */}
            <div className="bg-[#0d0d0d] border border-neutral-800 rounded-xl p-6 flex items-start gap-4 hover:border-gold/30 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white mb-1.5">
                  {t.casting.benefit2Title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                  {t.casting.benefit2Desc}
                </p>
              </div>
            </div>

            {/* Benefício 3: Flexibilidade */}
            <div className="bg-[#0d0d0d] border border-neutral-800 rounded-xl p-6 flex items-start gap-4 hover:border-gold/30 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white mb-1.5">
                  {t.casting.benefit3Title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                  {t.casting.benefit3Desc}
                </p>
              </div>
            </div>

            {/* Benefício 4: Alojamento */}
            <div className="bg-[#0d0d0d] border border-neutral-800 rounded-xl p-6 flex items-start gap-4 hover:border-gold/30 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <HomeIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white mb-1.5">
                  {t.casting.benefit4Title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                  {t.casting.benefit4Desc}
                </p>
              </div>
            </div>

            {/* Benefício 5: Total Confidencialidade */}
            <div className="bg-[#0d0d0d] border border-neutral-800 rounded-xl p-6 flex items-start gap-4 hover:border-gold/30 transition-colors sm:col-span-2 lg:col-span-2">
              <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white mb-1.5">
                  {t.casting.benefit5Title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                  {t.casting.benefit5Desc}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Secção de Contacto (CTA Direto) */}
        <div className="bg-[#0a0a0a] border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-12 md:p-14 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>{t.casting.ctaSectionTitle}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wide">
              {language === 'en' ? 'Apply Now via WhatsApp' : 'Candidate-se Agora via WhatsApp'}
            </h2>

            {/* Instructions Box */}
            <div className="bg-[#121212] border border-neutral-800 rounded-2xl p-6 sm:p-8 text-left max-w-lg mx-auto space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold mb-3 flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span>{t.casting.ctaInstructionsTitle}</span>
              </h3>
              <div className="space-y-3 text-sm text-neutral-200">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs shrink-0 font-mono">1</span>
                  <span className="font-medium">{t.casting.ctaInstruction1}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs shrink-0 font-mono">2</span>
                  <span className="font-medium">{t.casting.ctaInstruction2}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs shrink-0 font-mono">3</span>
                  <span className="font-medium">{t.casting.ctaInstruction3}</span>
                </div>
              </div>
            </div>

            {/* WhatsApp Green Button */}
            <div className="pt-2">
              <a
                href={whatsappRecruitmentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 sm:px-12 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold uppercase tracking-wider text-sm rounded-xl shadow-lg shadow-[#25D366]/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <svg className="w-6 h-6 fill-current shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.428 1.98 13.96 1.05 11.47 1.05 6.03 1.05 1.61 5.424 1.606 10.856c-.001 1.704.451 3.371 1.31 4.887L1.93 20.17l4.717-1.016zM17.41 14.92c-.317-.159-1.88-.93-2.172-1.036-.29-.105-.503-.159-.714.159-.211.318-.818 1.036-1.003 1.248-.185.21-.37.238-.687.08-1.3-.647-2.316-1.185-3.232-2.76-.242-.415.242-.385.693-1.285.074-.15.037-.282-.019-.395-.056-.113-.503-1.218-.69-1.667-.181-.438-.364-.378-.503-.385-.13-.006-.279-.007-.428-.007-.15 0-.395.056-.602.282-.207.227-.79.773-.79 1.884s.806 2.186.918 2.337c.112.15 1.583 2.427 3.834 3.4s2.996 1.157 3.541 1.012c1.17-.31 1.88-1.22 2.17-2.036z"/>
                </svg>
                <span>{t.casting.whatsappBtn}</span>
              </a>
            </div>

            {/* Email Alternativo */}
            <div className="pt-2 text-xs sm:text-sm text-neutral-400">
              <span>{t.casting.emailLabel}: </span>
              <a
                href="mailto:patty.ps@icloud.com?subject=Candidatura%20Mardigras%20NightClub"
                className="text-gold hover:text-gold-light font-semibold underline underline-offset-4 ml-1 transition-colors"
              >
                patty.ps@icloud.com
              </a>
            </div>

            {/* Aviso Legal */}
            <div className="pt-6 border-t border-neutral-900">
              <p className="text-xs font-mono text-neutral-400">
                ⚠️ {t.casting.legalNotice}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
