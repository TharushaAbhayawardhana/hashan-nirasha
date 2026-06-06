import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { AnimatedDivider } from '../components/ui/AnimatedDivider';
import { Button } from '../components/ui/Button';
import { COUPLE } from '../data/weddingData';

export function ThankYouSection() {
  return (
    <section className="py-24 md:py-32 px-6 relative overflow-hidden">
      <div className="max-w-3xl mx-auto text-center">
        <AnimatedDivider />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <p className="font-inter text-xs tracking-[0.3em] uppercase text-[#C8748A] mb-6">
            With Gratitude
          </p>

          <h2 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-semibold text-[#2F2430] leading-tight mb-6">
            Thank <em className="italic text-gradient-rose">You</em>
          </h2>

          <p className="font-cormorant text-2xl md:text-3xl text-[#72646A] italic leading-relaxed mb-8">
            For being a part of our love story. Your presence, love, and support mean the world 
            to us as we begin this beautiful journey together.
          </p>

          <div className="glass rounded-3xl p-8 md:p-12 mb-10">
            <div className="flex justify-center items-center gap-3 mb-6">
              {[...Array(7)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -10, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.15,
                    repeat: Infinity,
                    repeatDelay: 1.5,
                  }}
                >
                  <Heart
                    size={i === 3 ? 28 : 16}
                    className="text-[#E9A5B3] fill-[#E9A5B3]"
                  />
                </motion.div>
              ))}
            </div>

            <p className="font-playfair text-3xl md:text-4xl text-[#2F2430] font-semibold">
              {COUPLE.groom}{' '}
              <em className="italic text-gradient-rose">&</em>{' '}
              {COUPLE.bride}
            </p>

            <p className="font-cormorant text-xl text-[#72646A] italic mt-3">
              September 24, 2026
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => document.querySelector('#rsvp')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Heart size={14} className="fill-white" />
              RSVP Now
            </Button>
            <Button
              variant="secondary"
              onClick={() => document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Back to Top
            </Button>
          </div>
        </motion.div>

        <AnimatedDivider className="mt-12" />
      </div>
    </section>
  );
}
