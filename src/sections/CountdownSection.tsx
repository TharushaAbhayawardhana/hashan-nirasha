import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { CountdownCard } from '../components/ui/CountdownCard';
import { useCountdown } from '../hooks/useCountdown';
import { WEDDING_DATE } from '../data/weddingData';

export function CountdownSection() {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(WEDDING_DATE);

  return (
    <section className="section-padding relative overflow-hidden bg-[#2F2430]">
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(233,165,179,0.12),transparent)]" />

      {/* Decorative rose rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#E9A5B3] opacity-5" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-[#E9A5B3] opacity-3" aria-hidden="true" />

      <div className="max-w-4xl mx-auto relative z-10 text-center px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#E9A5B3]" />
            <Heart size={14} className="text-[#E9A5B3] fill-[#E9A5B3]" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#E9A5B3]" />
          </div>
          <p className="font-inter text-xs tracking-[0.3em] uppercase text-[#E9A5B3] mb-4">
            Counting Down To
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight">
            Forever <em className="italic text-gradient-rose">Begins</em>
          </h2>
          <p className="font-cormorant text-xl text-[#F5C6D0] mt-4 italic">
            September 24, 2026 — The most beautiful day
          </p>
        </motion.div>

        {/* Countdown grid */}
        {isExpired ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-3xl p-12 text-center"
          >
            <Heart size={48} className="text-[#E9A5B3] fill-[#E9A5B3] mx-auto mb-4" />
            <p className="font-playfair text-4xl text-white">We are Married! 🎉</p>
            <p className="font-cormorant text-xl text-[#F5C6D0] mt-2 italic">
              The journey of forever has begun.
            </p>
          </motion.div>
        ) : (
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            <CountdownCard value={days} label="Days" delay={0} />
            <CountdownCard value={hours} label="Hours" delay={0.1} />
            <CountdownCard value={minutes} label="Minutes" delay={0.2} />
            <CountdownCard value={seconds} label="Seconds" delay={0.3} />
          </div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 font-cormorant text-xl md:text-2xl text-[#72646A] italic max-readable-wide"
        >
          "Every love story is beautiful, but ours is my favourite."
        </motion.p>
      </div>
    </section>
  );
}
