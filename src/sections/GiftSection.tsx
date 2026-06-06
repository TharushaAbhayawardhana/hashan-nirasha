import { motion } from 'framer-motion';
import { Gift, Heart, CreditCard } from 'lucide-react';
import { SectionTitle } from '../components/ui/SectionTitle';
import { GlassCard } from '../components/ui/GlassCard';

const giftOptions = [
  {
    icon: <CreditCard size={28} />,
    title: 'Bank Transfer',
    description: 'A monetary gift towards our honeymoon adventures.',
    detail: 'Account details provided upon request',
    color: '#E9A5B3',
  },
  {
    icon: <Gift size={28} />,
    title: 'Wishing Well',
    description: 'Contributions to our new home and future together.',
    detail: 'Wishing well at the venue',
    color: '#D9A06F',
  },
  {
    icon: <Heart size={28} />,
    title: 'Your Presence',
    description: 'The greatest gift is simply having you with us.',
    detail: 'Your love means everything',
    color: '#C8748A',
  },
];

export function GiftSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Gifts & Registry"
          title="Gift"
          titleItalic="Registry"
          subtitle="Your presence is the greatest present of all"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {giftOptions.map((gift, i) => (
            <GlassCard key={gift.title} delay={i * 0.1} className="text-center">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white"
                style={{ background: `linear-gradient(135deg, ${gift.color}, #2F2430)` }}
              >
                {gift.icon}
              </div>
              <h3 className="font-playfair text-xl font-semibold text-[#2F2430] mb-2">
                {gift.title}
              </h3>
              <p className="font-inter text-sm text-[#72646A] leading-relaxed mb-3">
                {gift.description}
              </p>
              <p className="font-cormorant text-sm italic text-[#C8748A]">{gift.detail}</p>
            </GlassCard>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass rounded-3xl p-8 text-center"
        >
          <p className="font-cormorant text-xl sm:text-2xl text-[#72646A] italic max-readable">
            "We are so grateful for your love and support as we begin this new chapter together. 
            Your presence on our special day is the greatest gift we could ever receive."
          </p>
          <div className="flex justify-center items-center gap-2 mt-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#E9A5B3]" />
            <Heart size={14} className="text-[#E9A5B3] fill-[#E9A5B3]" />
            <span className="font-playfair italic text-[#2F2430]">Hashan & Nirasha</span>
            <Heart size={14} className="text-[#E9A5B3] fill-[#E9A5B3]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#E9A5B3]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
