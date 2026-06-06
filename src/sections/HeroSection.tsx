import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Heart, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { COUPLE, WEDDING_DATE } from '../data/weddingData';

function RoseDecor() {
  return (
    <svg className="w-full h-full" viewBox="0 0 200 200" fill="none">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <ellipse
          key={i}
          cx="100"
          cy="100"
          rx="18"
          ry="40"
          fill={i % 2 === 0 ? '#E9A5B3' : '#D9A06F'}
          fillOpacity="0.35"
          transform={`rotate(${angle} 100 100)`}
        />
      ))}
      <circle cx="100" cy="100" r="15" fill="#F6E7D8" fillOpacity="0.8" />
      <circle cx="100" cy="100" r="8" fill="#E9A5B3" fillOpacity="0.6" />
    </svg>
  );
}

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const weddingFormatted = WEDDING_DATE.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Parallax background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute inset-0 hero-gradient" />
        {/* Radial gradient spotlight */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(233,165,179,0.15),transparent)]" />
      </motion.div>

      {/* Large rose decorations */}
      <motion.div
        style={{ y: bgY }}
        className="absolute -top-16 sm:-top-20 -left-16 sm:-left-20 w-48 sm:w-72 h-48 sm:h-72 opacity-20"
        aria-hidden="true"
      >
        <RoseDecor />
      </motion.div>
      <motion.div
        style={{ y: bgY }}
        className="absolute -bottom-8 sm:-bottom-12 -right-8 sm:-right-12 w-56 sm:w-80 h-56 sm:h-80 opacity-15"
        aria-hidden="true"
      >
        <RoseDecor />
      </motion.div>
      <motion.div
        className="absolute top-1/4 -right-8 sm:-right-12 w-36 sm:w-52 h-36 sm:h-52 opacity-10 animate-float"
        aria-hidden="true"
      >
        <RoseDecor />
      </motion.div>
      <motion.div
        className="absolute bottom-1/3 -left-6 sm:-left-8 w-32 sm:w-44 h-32 sm:h-44 opacity-10 animate-float-delay"
        aria-hidden="true"
      >
        <RoseDecor />
      </motion.div>

      {/* Main content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 text-center px-4 sm:px-6 section-container--hero mx-auto"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#E9A5B3]" />
          <span className="font-inter text-xs tracking-[0.35em] uppercase text-[#C8748A]">
            We are getting married
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#E9A5B3]" />
        </motion.div>

        {/* Groom name */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-playfair font-semibold leading-none text-[#2F2430]"
        >
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">{COUPLE.groom}</span>
        </motion.h1>

        {/* Ampersand */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="my-4 sm:my-6 flex items-center justify-center gap-4 sm:gap-8"
        >
          <Heart size={12} className="text-[#E9A5B3] fill-[#E9A5B3] hidden sm:block" />
          <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#E9A5B3] sm:hidden" />
          <span className="font-cormorant text-4xl sm:text-5xl md:text-7xl font-light italic text-gradient-rose">
            &amp;
          </span>
          <div className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#E9A5B3] sm:hidden" />
          <Heart size={12} className="text-[#E9A5B3] fill-[#E9A5B3] hidden sm:block" />
        </motion.div>

        {/* Bride name */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="font-playfair font-semibold leading-none text-[#2F2430]"
        >
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">{COUPLE.bride}</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="font-cormorant text-xl sm:text-2xl md:text-3xl text-[#72646A] italic mt-8 sm:mt-10 mb-6 sm:mb-8"
        >
          Two Souls,{' '}
          <em className="not-italic font-normal text-gradient-rose">One Beautiful Journey</em>
        </motion.p>

        {/* Date */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mb-8 sm:mb-10"
        >
          <div className="glass inline-block rounded-full px-6 sm:px-10 py-3 sm:py-4 animate-pulse-rose">
            <p className="font-cormorant text-lg sm:text-xl md:text-2xl text-[#2F2430] italic">
              {weddingFormatted}
            </p>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="flex flex-wrap gap-4 sm:gap-6 justify-center mt-8 sm:mt-10"
        >
          <Button
            size="lg"
            onClick={() => document.querySelector('#rsvp')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Heart size={14} className="fill-white" />
            RSVP Now
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => document.querySelector('#story')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Our Love Story
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
        style={{ opacity }}
        className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C8748A] rounded-lg"
        onClick={() => document.querySelector('#story')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Scroll to love story section"
      >
        <span className="font-inter text-[10px] tracking-[0.3em] uppercase text-[#72646A]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          aria-hidden="true"
        >
          <ChevronDown size={20} className="text-[#E9A5B3]" />
        </motion.div>
      </motion.button>
    </section>
  );
}
