import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { SectionTitle } from '../components/ui/SectionTitle';
import { galleryImages, type GalleryImage } from '../data/galleryData';

function GalleryCard({ image, onClick }: { image: GalleryImage; onClick: () => void }) {
  const heightClass =
    image.span === 'tall' ? 'h-72 sm:h-80 md:h-96' : image.span === 'wide' ? 'h-52 sm:h-56' : 'h-52 sm:h-56 md:h-72';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
      onClick={onClick}
      className={`relative overflow-hidden rounded-3xl cursor-pointer group shadow-[0_4px_20px_rgba(233,165,179,0.12)] hover:shadow-[0_16px_50px_rgba(233,165,179,0.25)] transition-shadow duration-500 ${heightClass} ${
        image.span === 'tall' ? 'row-span-2' : ''
      } ${image.span === 'wide' ? 'col-span-2' : ''}`}
    >
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#2F2430]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
        <p className="font-cormorant text-lg text-white italic">{image.caption}</p>
      </div>

      {/* Zoom icon */}
      <div className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75 group-hover:scale-100">
        <ZoomIn size={16} className="text-white" />
      </div>
    </motion.div>
  );
}

function Lightbox({ image, onClose }: { image: GalleryImage; onClose: () => void }) {
  // Close on Escape key
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-[#2F2430]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-label={`Photo: ${image.caption}`}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-5xl w-full"
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full rounded-3xl object-cover max-h-[85vh] shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 glass-dark rounded-b-3xl">
            <p className="font-cormorant text-xl sm:text-2xl text-white italic">{image.caption}</p>
          </div>
          <button
            onClick={onClose}
            className="absolute -top-3 sm:-top-4 -right-3 sm:-right-4 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white text-[#2F2430] flex items-center justify-center shadow-lg hover:bg-[#E9A5B3] hover:text-white transition-all duration-300 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="Close lightbox"
          >
            <X size={18} />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function GallerySection() {
  const [selected, setSelected] = useState<GalleryImage | null>(null);

  return (
    <section id="gallery" className="section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Our Moments"
          title="A Gallery of"
          titleItalic="Love"
          subtitle="Capturing every precious memory we've shared together"
        />

        {/* Masonry grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 auto-rows-auto">
          {galleryImages.map((image) => (
            <GalleryCard
              key={image.id}
              image={image}
              onClick={() => setSelected(image)}
            />
          ))}
        </div>
      </div>

      {selected && (
        <Lightbox image={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
