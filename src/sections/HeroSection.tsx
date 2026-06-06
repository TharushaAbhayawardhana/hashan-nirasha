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
      >
        <div className="absolute inset-0 hero-gradient" />
        {/* Radial gradient spotlight */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(233,165,179,0.15),transparent)]" />
      </motion.div>

      {/* Large rose decorations */}
      <motion.div
        style={{ y: bgY }}
        className="absolute -top-16 -left-16 w-72 h-72 opacity-20"
      >
        <RoseDecor />
      </motion.div>
      <motion.div
        style={{ y: bgY }}
        className="absolute -bottom-8 -right-8 w-80 h-80 opacity-15"
      >
        <RoseDecor />
      </motion.div>
      <motion.div
        className="absolute top-1/4 -right-12 w-52 h-52 opacity-10 animate-float"
      >
        <RoseDecor />
      </motion.div>
      <motion.div
        className="absolute bottom-1/3 -left-8 w-44 h-44 opacity-10 animate-float-delay"
      >
        <RoseDecor />
      </motion.div>

      {/* Main content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
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
          <span className="block text-7xl sm:text-8xl md:text-9xl">{COUPLE.groom}</span>
        </motion.h1>

        {/* Ampersand */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="my-2 flex items-center justify-center gap-6"
        >
          <Heart size={14} className="text-[#E9A5B3] fill-[#E9A5B3]" />
          <span className="font-cormorant text-5xl md:text-7xl font-light italic text-gradient-rose">
            &amp;
          </span>
          <Heart size={14} className="text-[#E9A5B3] fill-[#E9A5B3]" />
        </motion.div>

        {/* Bride name */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="font-playfair font-semibold leading-none text-[#2F2430]"
        >
          <span className="block text-7xl sm:text-8xl md:text-9xl">{COUPLE.bride}</span>
        </motion.h1>

        {/* Date */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-8 mb-4"
        >
          <div className="glass inline-block rounded-full px-8 py-3 animate-pulse-rose">
            <p className="font-cormorant text-xl md:text-2xl text-[#2F2430] italic">
              {weddingFormatted}
            </p>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="font-cormorant text-2xl md:text-3xl text-[#72646A] italic mt-4 mb-10"
        >
          Two Souls,{' '}
          <em className="not-italic font-normal text-gradient-rose">One Beautiful Journey</em>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="flex flex-wrap gap-4 justify-center"
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => document.querySelector('#story')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="font-inter text-[10px] tracking-[0.3em] uppercase text-[#72646A]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={20} className="text-[#E9A5B3]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
