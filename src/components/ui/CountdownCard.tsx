import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface CountdownCardProps {
  value: number;
  label: string;
  delay?: number;
}

export function CountdownCard({ value, label, delay = 0 }: CountdownCardProps) {
  const displayValue = String(value).padStart(2, '0');
  const prevValue = useRef(value);

  useEffect(() => {
    prevValue.current = value;
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className="flex flex-col items-center"
    >
      <div className="glass rounded-3xl p-6 md:p-8 w-28 md:w-36 text-center relative overflow-hidden group hover:shadow-[0_20px_60px_rgba(233,165,179,0.3)] transition-shadow duration-500">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFF0F3] to-[#F6E7D8] opacity-60 rounded-3xl" />

        {/* Top rose accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E9A5B3] via-[#D9A06F] to-[#E9A5B3] rounded-t-3xl" />

        <motion.div
          key={value}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="relative z-10"
        >
          <span className="font-playfair text-4xl md:text-5xl font-bold text-gradient-rose block leading-none">
            {displayValue}
          </span>
        </motion.div>

        <div className="relative z-10 mt-2">
          <span className="font-inter text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#72646A]">
            {label}
          </span>
        </div>

        {/* Corner decorations */}
        <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full border border-[#E9A5B3] opacity-40" />
      </div>
    </motion.div>
  );
}
