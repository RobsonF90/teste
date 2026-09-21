import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export default function BrandLogo({ size = 'md', className = '' }: BrandLogoProps) {
  const sizeConfig = {
    sm: {
      title: 'text-lg sm:text-xl',
      subtitle: 'text-[8px] tracking-[0.35em]',
      star: 'w-3 h-3',
      gap: 'gap-0.5',
    },
    md: {
      title: 'text-2xl sm:text-3xl',
      subtitle: 'text-[9px] sm:text-[10px] tracking-[0.4em]',
      star: 'w-4 h-4',
      gap: 'gap-0.5',
    },
    lg: {
      title: 'text-4xl sm:text-5xl',
      subtitle: 'text-[11px] sm:text-xs tracking-[0.45em]',
      star: 'w-5 h-5',
      gap: 'gap-1',
    },
    xl: {
      title: 'text-5xl sm:text-6xl md:text-7xl',
      subtitle: 'text-xs sm:text-sm tracking-[0.5em]',
      star: 'w-6 h-6',
      gap: 'gap-1.5',
    },
  };

  const current = sizeConfig[size];

  return (
    <div className={`inline-flex flex-col items-center justify-center select-none text-center ${current.gap} ${className}`}>
      <div className="relative flex items-center justify-center">
        <span
          className={`font-serif italic font-extrabold ${current.title} text-gold-gradient tracking-wide leading-none drop-shadow-[0_2px_12px_rgba(212,175,55,0.4)]`}
          style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
        >
          Mardigras
        </span>
      </div>
      <div className="flex items-center justify-center gap-1.5 w-full">
        <span className="h-[1px] w-3 bg-gradient-to-r from-transparent to-gold/60" />
        <span className={`font-mono uppercase font-bold text-amber-200/90 ${current.subtitle} leading-none`}>
          NIGHTCLUB
        </span>
        <span className="h-[1px] w-3 bg-gradient-to-l from-transparent to-gold/60" />
      </div>
    </div>
  );
}
