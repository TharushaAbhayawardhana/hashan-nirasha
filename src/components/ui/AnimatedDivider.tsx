import { motion } from 'framer-motion';

interface AnimatedDividerProps {
  className?: string;
}

export function AnimatedDivider({ className = '' }: AnimatedDividerProps) {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className={`flex items-center justify-center gap-4 my-12 sm:my-16 ${className}`}
      aria-hidden="true"
    >
      <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-[#E9A5B3]" />
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
        <path
          d="M15 2C15 2 18 8 24 8C24 8 18 11 18 17C18 17 15 11 9 11C9 11 15 8 15 2Z"
          fill="#E9A5B3"
          opacity="0.6"
        />
        <path
          d="M15 28C15 28 12 22 6 22C6 22 12 19 12 13C12 13 15 19 21 19C21 19 15 22 15 28Z"
          fill="#D9A06F"
          opacity="0.6"
        />
        <circle cx="15" cy="15" r="2" fill="#C8748A" />
      </svg>
      <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-[#E9A5B3]" />
    </motion.div>
  );
}
