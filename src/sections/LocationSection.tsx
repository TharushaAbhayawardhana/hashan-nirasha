import { motion } from 'framer-motion';
import { MapPin, Navigation, Clock } from 'lucide-react';
import { SectionTitle } from '../components/ui/SectionTitle';
import { Button } from '../components/ui/Button';
import { VENUE } from '../data/weddingData';

const locationDetails = [
  { icon: <MapPin size={16} />, label: 'Address', value: VENUE.address },
  { icon: <Clock size={16} />, label: 'Ceremony', value: `${VENUE.ceremony.time} — ${VENUE.ceremony.location}` },
  { icon: <Clock size={16} />, label: 'Reception', value: `${VENUE.reception.time} — ${VENUE.reception.location}` },
];

export function LocationSection() {
  return (
    <section id="location" className="section-padding bg-[#FFF0F3] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Find Us"
          title="The"
          titleItalic="Venue"
          subtitle="Come find us at Diendra Bolgoda — a beautiful venue for our special day"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Google Maps Embed */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(233,165,179,0.2)] h-80 md:h-96 relative group"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3131.175655662817!2d79.90447907499548!3d6.808082493189453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sdeandra%20bolgoda%20google%20map!5e1!3m2!1sen!2slk!4v1783194964379!5m2!1sen!2slk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Diendra Bolgoda"
            />
            <div className="absolute inset-0 rounded-3xl border-2 border-[#E9A5B3] opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />
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

                <div className="pt-2">
                  <Button
                    size="sm"
                    onClick={() => window.open(VENUE.mapUrl, '_blank')}
                  >
                    <Navigation size={12} />
                    Open in Google Maps
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
