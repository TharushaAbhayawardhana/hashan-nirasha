import { motion } from 'framer-motion';
import { Heart, Users } from 'lucide-react';
import { SectionTitle } from '../components/ui/SectionTitle';
import { GlassCard } from '../components/ui/GlassCard';
import { FAMILY } from '../data/weddingData';

export function FamilySection() {
  return (
    <section className="py-24 md:py-32 px-6 bg-[#FFF0F3] relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <SectionTitle
          eyebrow="With Love"
          title="Our"
          titleItalic="Families"
          subtitle="Two families, one beautiful union — forever joined by love"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FAMILY.map((side, sideIdx) => (
            <GlassCard key={side.side} delay={sideIdx * 0.15}>
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E9A5B3] to-[#D9A06F] flex items-center justify-center">
                  <Users size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="font-playfair text-xl font-semibold text-[#2F2430]">
                    {side.side}
                  </h3>
                </div>
              </div>

              {/* Members */}
              <div className="space-y-4">
                {side.members.map((member, i) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: sideIdx * 0.1 + i * 0.08 }}
                    className="flex items-center gap-3 p-3 rounded-2xl hover:bg-[#FFF0F3] transition-colors duration-300"
                  >
                    <Heart size={12} className="text-[#E9A5B3] fill-[#E9A5B3] flex-shrink-0" />
                    <div>
                      <p className="font-inter text-sm font-medium text-[#2F2430]">
                        {member.name}
                      </p>
                      <p className="font-cormorant text-sm text-[#72646A] italic">
                        {member.relation}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <blockquote className="font-cormorant text-2xl md:text-3xl text-[#72646A] italic max-w-2xl mx-auto">
            "Family is not an important thing, it's everything."
          </blockquote>
          <div className="flex justify-center items-center gap-2 mt-4">
            <Heart size={12} className="text-[#E9A5B3] fill-[#E9A5B3]" />
            <Heart size={16} className="text-[#E9A5B3] fill-[#E9A5B3]" />
            <Heart size={12} className="text-[#E9A5B3] fill-[#E9A5B3]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
