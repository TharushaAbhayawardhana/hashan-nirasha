import { motion } from 'framer-motion';
import { SectionTitle } from '../components/ui/SectionTitle';
import { weddingDayTimeline } from '../data/timelineData';

export function EventTimelineSection() {
  return (
    <section id="timeline" className="section-padding relative overflow-hidden">
      <div className="max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="The Day's Schedule"
          title="Day Of"
          titleItalic="Celebration"
          subtitle="A beautiful journey through our most special day"
        />

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#E9A5B3] via-[#D9A06F] to-transparent" />

          <div className="space-y-8">
            {weddingDayTimeline.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: 'easeOut' }}
                className="flex gap-8 pl-0"
              >
                {/* Dot */}
                <div className="relative flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E9A5B3] to-[#D9A06F] flex items-center justify-center text-xl shadow-[0_4px_20px_rgba(233,165,179,0.4)] z-10 relative"
                  >
                    {event.emoji}
                  </motion.div>
                </div>

                {/* Content */}
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 pb-8"
                >
                  <div className="glass rounded-2xl p-5 hover:shadow-[0_10px_40px_rgba(233,165,179,0.2)] transition-shadow duration-500">
                    <span className="font-inter text-xs tracking-[0.2em] uppercase text-[#C8748A]">
                      {event.date}
                    </span>
                    <h3 className="font-playfair text-xl font-semibold text-[#2F2430] mt-1 mb-2">
                      {event.title}
                    </h3>
                    <p className="font-inter text-sm text-[#72646A] leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
