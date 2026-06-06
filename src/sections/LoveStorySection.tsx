import { motion } from 'framer-motion';
import { Heart, MessageCircle, Coffee, Gem, Stars } from 'lucide-react';
import { SectionTitle } from '../components/ui/SectionTitle';
import { loveStoryTimeline } from '../data/timelineData';

const iconMap: Record<string, React.ReactNode> = {
  sparkles: <Stars size={20} />,
  message: <MessageCircle size={20} />,
  coffee: <Coffee size={20} />,
  ring: <Gem size={20} />,
  heart: <Heart size={20} className="fill-current" />,
};

export function LoveStorySection() {
  return (
    <section id="story" className="py-24 md:py-32 px-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E9A5B3] to-transparent opacity-40" />

      <div className="max-w-4xl mx-auto">
        <SectionTitle
          eyebrow="How It All Began"
          title="Our Love"
          titleItalic="Story"
          subtitle="A journey of two hearts finding their way to each other"
        />

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#E9A5B3] to-transparent hidden md:block" />

          <div className="space-y-12 md:space-y-0">
            {loveStoryTimeline.map((event, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                  className={`relative flex md:items-center gap-6 md:gap-0 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content card */}
                  <div className={`flex-1 ${isLeft ? 'md:pr-16' : 'md:pl-16'}`}>
                    <motion.div
                      whileHover={{ y: -4, boxShadow: '0 20px 50px rgba(233,165,179,0.2)' }}
                      transition={{ duration: 0.4 }}
                      className={`glass rounded-3xl p-6 md:p-8 relative ${
                        isLeft ? 'md:text-right' : 'md:text-left'
                      }`}
                    >
                      <span className="font-inter text-xs tracking-[0.2em] uppercase text-[#C8748A] block mb-2">
                        {event.date}
                      </span>
                      <h3 className="font-playfair text-2xl font-semibold text-[#2F2430] mb-3">
                        {event.title}
                      </h3>
                      <p className="font-inter text-sm leading-relaxed text-[#72646A]">
                        {event.description}
                      </p>
                      <div className={`mt-4 text-3xl ${isLeft ? 'md:flex md:justify-end' : ''}`}>
                        {event.emoji}
                      </div>
                    </motion.div>
                  </div>

                  {/* Center node */}
                  <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E9A5B3] to-[#D9A06F] flex items-center justify-center text-white shadow-[0_4px_20px_rgba(233,165,179,0.5)] z-10"
                    >
                      {iconMap[event.icon]}
                    </motion.div>
                  </div>

                  {/* Mobile icon */}
                  <div className="md:hidden flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#E9A5B3] to-[#D9A06F] flex items-center justify-center text-white">
                    {iconMap[event.icon]}
                  </div>

                  {/* Empty spacer for opposite side */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
