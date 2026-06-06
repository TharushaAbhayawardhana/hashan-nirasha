import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
  dark?: boolean;
}

export function GlassCard({
  children,
  className = '',
  hover = true,
  delay = 0,
  dark = false,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      whileHover={
        hover
          ? { y: -6, boxShadow: '0 24px 60px rgba(233,165,179,0.25)' }
          : {}
      }
      className={`rounded-3xl p-6 md:p-8 transition-all duration-500 ${
        dark ? 'glass-dark' : 'glass'
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}
