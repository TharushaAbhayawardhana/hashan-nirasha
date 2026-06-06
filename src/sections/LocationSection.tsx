import { motion } from 'framer-motion';
import { MapPin, Navigation, Phone, Clock } from 'lucide-react';
import { SectionTitle } from '../components/ui/SectionTitle';
import { Button } from '../components/ui/Button';
import { VENUE } from '../data/weddingData';

const locationDetails = [
  { icon: <MapPin size={16} />, label: 'Address', value: VENUE.address },
  { icon: <Clock size={16} />, label: 'Ceremony', value: `${VENUE.ceremony.time} — ${VENUE.ceremony.location}` },
  { icon: <Clock size={16} />, label: 'Reception', value: `${VENUE.reception.time} — ${VENUE.reception.location}` },
  { icon: <Phone size={16} />, label: 'Enquiries', value: '+94 11 234 5678' },
];

export function LocationSection() {
  return (
    <section id="location" className="py-24 md:py-32 px-6 bg-[#FFF0F3] relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <SectionTitle
          eyebrow="Find Us"
          title="The"
          titleItalic="Venue"
          subtitle="Come find us at one of Sri Lanka's most breathtaking wedding venues"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Map placeholder (styled) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(233,165,179,0.2)] h-80 md:h-96 relative group"
          >
            <div className="w-full h-full bg-gradient-to-br from-[#FFF0F3] via-[#F6E7D8] to-[#FFF0F3] flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-[#E9A5B3] to-[#D9A06F] flex items-center justify-center mx-auto mb-4 shadow-[0_8px_40px_rgba(233,165,179,0.5)]"
                >
                  <MapPin size={28} className="text-white" />
                </motion.div>
                <p className="font-playfair text-2xl text-[#2F2430] font-semibold">{VENUE.name}</p>
                <p className="font-inter text-sm text-[#72646A] mt-1">{VENUE.address}</p>
                <Button
                  size="sm"
                  className="mt-4"
                  onClick={() => window.open('https://maps.google.com', '_blank')}
                >
                  <Navigation size={12} />
                  Open in Maps
                </Button>
              </div>
            </div>

            {/* Decorative border animation */}
            <div className="absolute inset-0 rounded-3xl border-2 border-[#E9A5B3] opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="glass rounded-3xl p-6 md:p-8">
              <h3 className="font-playfair text-2xl font-semibold text-[#2F2430] mb-6">
                {VENUE.name}
              </h3>

              <div className="space-y-5">
                {locationDetails.map((detail) => (
                  <div key={detail.label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#E9A5B3] to-[#D9A06F] flex items-center justify-center text-white flex-shrink-0">
                      {detail.icon}
                    </div>
                    <div>
                      <p className="font-inter text-xs tracking-[0.15em] uppercase text-[#C8748A]">
                        {detail.label}
                      </p>
                      <p className="font-inter text-sm text-[#2F2430] mt-0.5">{detail.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Parking note */}
            <div className="glass rounded-2xl p-5">
              <p className="font-cormorant text-lg text-[#72646A] italic">
                🚗 Complimentary valet parking available at the venue. 
                Shuttle service from Colombo city centre will be arranged.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
