import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { RosePetals } from './components/effects/RosePetals';
import { FloatingFlowers } from './components/effects/FloatingFlowers';
import { BackgroundParticles } from './components/effects/BackgroundParticles';
import { Home } from './pages/Home';
import { Admin } from './pages/Admin';
import { Heart } from 'lucide-react';

function LoadingScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Enter' || e.key === ' ') onDone();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onDone]);
  useEffect(() => {
    const t = setTimeout(onDone, 2600);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: '#2F2430',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(233,165,179,0.1), transparent)',
      }} />

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'linear-gradient(135deg, #E9A5B3, #D9A06F)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 32,
            boxShadow: '0 0 60px rgba(233,165,179,0.6)',
          }}
        >
          <Heart size={32} color="white" fill="white" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '2.8rem',
            fontWeight: 600,
            color: 'white',
            textAlign: 'center',
          }}
        >
          Hashan & Nirasha
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.2rem',
            color: '#F5C6D0',
            fontStyle: 'italic',
            marginTop: 12,
          }}
        >
          September 24, 2026
        </motion.p>

        <motion.div
          style={{ marginTop: 40, width: 192, height: 2, background: 'rgba(255,255,255,0.1)', borderRadius: 999, overflow: 'hidden' }}
        >
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            style={{ height: '100%', background: 'linear-gradient(90deg, #E9A5B3, #D9A06F)' }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function HomePage() {
  return (
    <>
      <ScrollProgress />
      <RosePetals />
      <FloatingFlowers />
      <BackgroundParticles />
      <Navbar />
      <Home />
      <Footer />
    </>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <div className="paper-grain" />

      <AnimatePresence>
        {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      )}
    </>
  );
}
