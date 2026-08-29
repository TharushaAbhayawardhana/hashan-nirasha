import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionTitle } from '../components/ui/SectionTitle';
import { galleryImages, type GalleryImage } from '../data/galleryData';

/**
 * Grid resolution is doubled (2 "units" per visual column) so spans can
 * express half-widths — that's what 'narrow' needs. 3 visual columns on
 * desktop = 6 units, 2 visual columns on mobile = 4 units.
 */
function useGridUnits() {
  const [units, setUnits] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth >= 768 ? 6 : 4
  );

  useEffect(() => {
    function handleResize() {
      setUnits(window.innerWidth >= 768 ? 6 : 4);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return units;
}

interface PlacedImage extends GalleryImage {
  gridColumn: string;
  gridRow: string;
}

const SPAN_WIDTH_UNITS: Record<NonNullable<GalleryImage['span']>, number> = {
  normal: 2,
  wide: 4,
  tall: 2,
  narrow: 1, // half the width of 'normal'/'tall', same height as 'tall'
};

const SPAN_HEIGHT_ROWS: Record<NonNullable<GalleryImage['span']>, number> = {
  normal: 1,
  wide: 1,
  tall: 2,
  narrow: 2,
};

/**
 * Skyline bin-packing: for each image, place it in whichever unit-columns
 * are currently shortest. Works the same regardless of grid resolution —
 * doubling the units just lets 'narrow' claim a half-width slot.
 */
function layoutGallery(
  images: GalleryImage[],
  units: number
): { images: PlacedImage[]; colHeights: number[] } {
  const colHeights = new Array(units).fill(0);

  const placed = images.map((image) => {
    const span = image.span ?? 'normal';
    const w = Math.min(SPAN_WIDTH_UNITS[span], units);
    const h = SPAN_HEIGHT_ROWS[span];

    let bestCol = 0;
    let bestHeight = Infinity;
    for (let c = 0; c <= units - w; c++) {
      const segmentHeight = Math.max(...colHeights.slice(c, c + w));
      if (segmentHeight < bestHeight) {
        bestHeight = segmentHeight;
        bestCol = c;
      }
    }

    for (let c = bestCol; c < bestCol + w; c++) {
      colHeights[c] = bestHeight + h;
    }

    return {
      ...image,
      gridColumn: `${bestCol + 1} / span ${w}`,
      gridRow: `${bestHeight + 1} / span ${h}`,
    };
  });

  return { images: placed, colHeights };
}

/**
 * Find the largest empty pocket left in the grid after all images are packed.
 * A "pocket" is a contiguous run of unit-columns whose final height is below the
 * tallest column; its top-left is that run's shortest row, sized to reach maxHeight.
 * Returns the same "start / span N" string format used by PlacedImage, or null when
 * no meaningful (>= 1 unit^2) gap exists — e.g. the grid happens to be flush.
 */
function findLargestGap(
  colHeights: number[],
  units: number
): { gridColumn: string; gridRow: string } | null {
  const maxHeight = Math.max(...colHeights);
  if (maxHeight <= 0) return null;

  let best: { col: number; width: number; height: number; top: number; area: number } | null =
    null;

  let i = 0;
  while (i < units) {
    if (colHeights[i] >= maxHeight) {
      i += 1;
      continue;
    }

    let j = i;
    let minInRun = colHeights[i];
    while (j < units && colHeights[j] < maxHeight) {
      minInRun = Math.min(minInRun, colHeights[j]);
      j += 1;
    }

    const width = j - i;
    const height = maxHeight - minInRun;
    const area = width * height;
    if (width > 0 && height > 0 && (!best || area > best.area)) {
      best = { col: i, width, height, top: minInRun, area };
    }

    i = j;
  }

  if (!best || best.area < 1) return null;

  return {
    gridColumn: `${best.col + 1} / span ${best.width}`,
    gridRow: `${best.top + 1} / span ${best.height}`,
  };
}

function HeartMotif() {
  return (
    <svg
      width={46}
      height={46}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#E9A5B3"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="opacity-90 drop-shadow-sm"
      aria-hidden="true"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function GalleryFillerCard({
  gridColumn,
  gridRow,
  index,
}: {
  gridColumn: string;
  gridRow: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: 'easeOut' }}
      style={{ gridColumn, gridRow }}
      className="relative overflow-hidden rounded-[1.4rem] glass pointer-events-none shadow-[0_6px_24px_rgba(233,165,179,0.12)] h-full w-full flex items-center justify-center"
    >
      {/* soft palette gradient behind the glass, echoing the two blurred blobs */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E9A5B3]/25 via-[#F6E7D8]/10 to-[#D9A06F]/25" />
      <div className="absolute inset-3 rounded-2xl border border-[#E9A5B3]/25 pointer-events-none" />

      <div className="relative flex flex-col items-center gap-2.5 px-4 text-center">
        <motion.span
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-flex"
        >
          <HeartMotif />
        </motion.span>
        <span className="w-8 h-px bg-[#E9A5B3]" />
        <p className="font-cormorant text-2xl sm:text-3xl text-[#2F2430] italic leading-none">
          H &amp; N
        </p>
        <p className="font-cormorant text-base sm:text-lg text-[#2F2430]/70 italic">
          Forever begins here
        </p>
      </div>
    </motion.div>
  );
}

function GalleryCard({
  image,
  index,
  onClick,
}: {
  image: PlacedImage;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
      onClick={onClick}
      style={{ gridColumn: image.gridColumn, gridRow: image.gridRow }}
      className="relative overflow-hidden rounded-[1.4rem] cursor-pointer group shadow-[0_6px_24px_rgba(233,165,179,0.12)] hover:shadow-[0_20px_60px_rgba(233,165,179,0.28)] transition-shadow duration-500 h-full w-full"
      role="button"
      tabIndex={0}
      aria-label={`View photo: ${image.caption}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        style={{ objectPosition: image.focal ?? 'center' }}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110 group-hover:rotate-[0.5deg]"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#2F2430]/85 via-[#2F2430]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-px bg-[#E9A5B3]" />
          <p className="font-cormorant text-lg sm:text-xl text-white italic leading-snug">{image.caption}</p>
        </div>
      </div>

      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-75 transition-all duration-300">
        <ZoomIn size={16} className="text-white" />
      </div>

      <div className="absolute inset-3 rounded-2xl border border-white/0 group-hover:border-white/30 transition-colors duration-500 pointer-events-none" />
    </motion.div>
  );
}

function Lightbox({ image, onClose, onPrev, onNext }: { image: GalleryImage; onClose: () => void; onPrev: () => void; onNext: () => void }) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, onPrev, onNext]);

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
          className="relative max-w-5xl w-full flex items-center justify-center"
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full max-h-[85vh] rounded-3xl object-contain bg-[#2F2430] shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
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

          <button
            onClick={onPrev}
            className="absolute left-2 sm:-left-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-[#E9A5B3] hover:border-transparent transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="Previous photo"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={onNext}
            className="absolute right-2 sm:-right-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-[#E9A5B3] hover:border-transparent transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="Next photo"
          >
            <ChevronRight size={20} />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function GallerySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const units = useGridUnits();
  const laidOut = useMemo(() => layoutGallery(galleryImages, units), [units]);
  const fillerGap = useMemo(
    () => findLargestGap(laidOut.colHeights, units),
    [laidOut, units]
  );

  const selected =
    selectedIndex !== null ? galleryImages[selectedIndex] : null;

  const prev = () =>
    setSelectedIndex((i) => (i === null ? null : (i - 1 + galleryImages.length) % galleryImages.length));
  const next = () => setSelectedIndex((i) => (i === null ? null : (i + 1) % galleryImages.length));

  return (
    <section id="gallery" className="section-padding relative overflow-hidden">
      <div className="absolute -top-20 -left-24 w-80 h-80 rounded-full bg-[#E9A5B3]/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#D9A06F]/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionTitle
          eyebrow="Our Moments"
          title="A Gallery of"
          titleItalic="Love"
          subtitle="Capturing every precious memory we've shared together"
        />

        <div className="flex justify-center -mt-4 mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-[#2F2430] text-sm">
            <Camera size={15} className="text-[#E9A5B3]" />
            {galleryImages.length} treasured moments
          </span>
        </div>

        <div
          className="grid auto-rows-[170px] sm:auto-rows-[200px] md:auto-rows-[230px] lg:auto-rows-[260px] gap-3 sm:gap-5 lg:gap-6"
          style={{ gridTemplateColumns: `repeat(${units}, 1fr)` }}
        >
          {laidOut.images.map((image, index) => (
            <GalleryCard
              key={image.id}
              image={image}
              index={index}
              onClick={() => setSelectedIndex(index)}
            />
          ))}

          {fillerGap && (
            <GalleryFillerCard
              gridColumn={fillerGap.gridColumn}
              gridRow={fillerGap.gridRow}
              index={laidOut.images.length}
            />
          )}
        </div>
      </div>

      {selected && (
        <Lightbox
          image={selected}
          onClose={() => setSelectedIndex(null)}
          onPrev={prev}
          onNext={next}
        />
      )}
    </section>
  );
}