import { Heart } from 'lucide-react';
import { COUPLE } from '../../data/weddingData';

export function Footer() {
  return (
    <footer className="bg-[#2F2430] text-white py-16 relative overflow-hidden">
      {/* Background rose pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full border-2 border-white -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full border-2 border-white translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="flex justify-center items-center gap-3 mb-4">
          <Heart size={14} className="text-[#E9A5B3] fill-[#E9A5B3]" />
          <Heart size={20} className="text-[#E9A5B3] fill-[#E9A5B3]" />
          <Heart size={14} className="text-[#E9A5B3] fill-[#E9A5B3]" />
        </div>

        <h3 className="font-playfair text-4xl md:text-5xl font-semibold mb-2">
          {COUPLE.groom}{' '}
          <em className="italic text-[#E9A5B3]">&</em>{' '}
          {COUPLE.bride}
        </h3>

        <p className="font-cormorant text-xl text-[#F5C6D0] mb-2 italic">
          September 24, 2026
        </p>

        <p className="font-inter text-xs tracking-[0.2em] uppercase text-[#72646A] mb-8">
          {COUPLE.hashtag}
        </p>

        <div className="h-px bg-gradient-to-r from-transparent via-[#E9A5B3] to-transparent mb-8" />

        <nav className="flex flex-wrap justify-center gap-6 mb-8">
          {['Our Story', 'Gallery', 'Details', 'Timeline', 'RSVP'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '')}`}
              className="font-inter text-xs tracking-widest uppercase text-[#72646A] hover:text-[#E9A5B3] transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </nav>

        <p className="font-cormorant text-lg italic text-[#72646A]">
          "Two souls, one beautiful journey — forever begins today."
        </p>
        <p className="font-inter text-xs text-[#4a3d4a] mt-4">
          Made with <Heart size={10} className="inline text-[#E9A5B3] fill-[#E9A5B3]" /> for Hashan & Nirasha
        </p>
      </div>
    </footer>
  );
}
