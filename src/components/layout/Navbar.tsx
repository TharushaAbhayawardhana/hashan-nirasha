import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart } from 'lucide-react';

const navLinks = [
  { label: 'Our Story', href: '#story' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Details', href: '#details' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'RSVP', href: '#rsvp' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Skip to content link - visible on focus for keyboard users */}
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-[#2F2430] focus:text-white focus:rounded-full focus:text-sm focus:font-inter focus:outline-2 focus:outline-offset-2 focus:outline-[#C8748A]"
        onClick={(e) => { e.preventDefault(); document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' }); }}
      >
        Skip to main content
      </a>

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass shadow-[0_4px_30px_rgba(233,165,179,0.15)] py-2 sm:py-3' : 'py-4 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
            className="flex items-center gap-2"
          >
            <Heart size={16} className="text-[#E9A5B3] fill-[#E9A5B3]" />
            <span className="font-playfair text-lg font-semibold text-[#2F2430]">
              H <em className="italic text-[#C8748A]">&</em> N
            </span>
            <Heart size={16} className="text-[#E9A5B3] fill-[#E9A5B3]" />
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="font-inter text-xs tracking-[0.15em] uppercase text-[#72646A] hover:text-[#C8748A] transition-colors duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C8748A] rounded-sm"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* RSVP button desktop */}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(233,165,179,0.5)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleNavClick('#rsvp')}
            className="hidden md:flex items-center gap-2 bg-gradient-to-r from-[#E9A5B3] to-[#D9A06F] text-white font-inter text-xs tracking-widest uppercase px-5 py-2.5 rounded-full shadow-[0_4px_20px_rgba(233,165,179,0.35)] hover:shadow-[0_8px_35px_rgba(233,165,179,0.55)] transition-shadow duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E9A5B3]"
          >
            <Heart size={12} className="fill-white" />
            Reserve Your Seat
          </motion.button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-[#2F2430] cursor-pointer p-2 -mr-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8748A] rounded-lg"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 glass flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => handleNavClick(link.href)}
                className="font-playfair text-3xl text-[#2F2430] hover:text-[#C8748A] transition-colors cursor-pointer"
              >
                {link.label}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.08 }}
              onClick={() => handleNavClick('#rsvp')}
              className="mt-4 bg-gradient-to-r from-[#E9A5B3] to-[#D9A06F] text-white font-inter text-xs tracking-widest uppercase px-8 py-3 rounded-full shadow-[0_4px_20px_rgba(233,165,179,0.35)] cursor-pointer flex items-center gap-2 mx-auto"
            >
              <Heart size={12} className="fill-white" />
              Reserve Your Seat
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
