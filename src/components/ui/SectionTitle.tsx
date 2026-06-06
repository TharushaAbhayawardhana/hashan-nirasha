import { motion } from 'framer-motion';

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  titleItalic?: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export function SectionTitle({
  eyebrow,
  title,
  titleItalic,
  subtitle,
  centered = true,
  light = false,
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`mb-12 lg:mb-16 ${centered ? 'text-center' : ''}`}
    >
      {eyebrow && (
        <p
          className={`font-inter text-xs tracking-[0.3em] uppercase mb-4 ${
            light ? 'text-[#E9A5B3]' : 'text-[#C8748A]'
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-playfair text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight ${
          light ? 'text-white' : 'text-[#2F2430]'
        }`}
      >
        {title}
        {titleItalic && (
          <>
            {' '}
            <em className="italic text-gradient-rose">{titleItalic}</em>
          </>
        )}
      </h2>
      {subtitle && (
        <p
          className={`font-cormorant text-lg sm:text-xl md:text-2xl mt-4 sm:mt-5 leading-relaxed max-readable-wide ${
            light ? 'text-[#F5C6D0]' : 'text-[#72646A]'
          }`}
        >
          {subtitle}
        </p>
      )}
      <div className={`mt-6 flex ${centered ? 'justify-center' : ''} gap-2 items-center`}>
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#E9A5B3]" />
        <div className="w-2 h-2 rounded-full bg-[#E9A5B3]" />
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#E9A5B3]" />
      </div>
    </motion.div>
  );
}
