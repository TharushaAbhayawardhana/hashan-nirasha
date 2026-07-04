import { motion } from 'framer-motion';
import { Clock, MapPin, Calendar, Heart } from 'lucide-react';
import { SectionTitle } from '../components/ui/SectionTitle';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { VENUE } from '../data/weddingData';

const details = [
  {
    icon: <Clock size={24} />,
    title: 'Poruwa Ceremony',
    time: VENUE.ceremony.time,
    description: VENUE.ceremony.location,
    color: '#E9A5B3',
  },
  {
    icon: <Clock size={24} />,
    title: 'Registration',
    time: '11:06 AM',
    description: 'Rings & Garlands Exchange',
    color: '#D9A06F',
  },
  {
    icon: <Clock size={24} />,
    title: 'Reception',
    time: VENUE.reception.time,
    description: VENUE.reception.location,
    color: '#C8748A',
  },
];

export function WeddingDetailsSection() {
  return (
    <section id="details" className="section-padding bg-[#FFF0F3] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E9A5B3] to-transparent opacity-30" aria-hidden="true" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="The Details"
          title="Wedding"
          titleItalic="Details"
          subtitle="Everything you need to know for the most beautiful day"
        />

        {/* Main venue card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass rounded-[2rem] overflow-hidden mb-8 shadow-[0_10px_60px_rgba(233,165,179,0.15)]"
        >
          <div className="bg-gradient-to-r from-[#E9A5B3] to-[#D9A06F] p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Heart size={20} className="text-white fill-white" />
              </div>
              <div>
                <h3 className="font-playfair text-3xl text-white font-semibold">{VENUE.name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <MapPin size={14} className="text-white/80" />
                  <p className="font-inter text-sm text-white/90">{VENUE.address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={16} className="text-[#C8748A]" />
              <span className="font-cormorant text-xl text-[#2F2430] italic">
                Thursday, September 24, 2026
              </span>
            </div>
            <p className="font-inter text-sm md:text-base text-[#72646A] leading-relaxed max-readable">
              Join us for a magical day filled with love, laughter, and beautiful memories at
              Diendra Bolgoda. We look forward to celebrating this special moment with our
              closest family and friends.
            </p>
          </div>
        </motion.div>

        {/* Time cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {details.map((detail, i) => (
            <GlassCard key={detail.title} delay={i * 0.1} className="text-center">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white"
                style={{ background: `linear-gradient(135deg, ${detail.color}, #2F2430)` }}
              >
                {detail.icon}
              </div>
              <p className="font-inter text-xs tracking-[0.2em] uppercase text-[#C8748A] mb-1">
                {detail.title}
              </p>
              <p className="font-playfair text-2xl font-semibold text-[#2F2430]">{detail.time}</p>
              <p className="font-cormorant text-lg text-[#72646A] italic mt-1">{detail.description}</p>
            </GlassCard>
          ))}
        </div>

        {/* Map button */}
        <div className="text-center">
          <Button
            variant="secondary"
            onClick={() => window.open(VENUE.mapUrl, '_blank')}
          >
            <MapPin size={14} />
            View on Google Maps
          </Button>
        </div>
      </div>
    </section>
  );
}
