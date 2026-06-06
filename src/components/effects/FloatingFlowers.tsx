import { motion } from 'framer-motion';

const flowers = [
  { top: '10%', left: '3%', size: 60, delay: 0 },
  { top: '25%', right: '2%', size: 50, delay: 1.5 },
  { top: '50%', left: '1%', size: 40, delay: 3 },
  { top: '70%', right: '3%', size: 55, delay: 2 },
  { top: '85%', left: '5%', size: 35, delay: 0.8 },
];

function FlowerSVG({ size, color = '#E9A5B3' }: { size: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <g opacity="0.25">
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <ellipse
            key={i}
            cx="40"
            cy="40"
            rx="12"
            ry="22"
            fill={i % 2 === 0 ? color : '#D9A06F'}
            transform={`rotate(${angle} 40 40)`}
            style={{ transformOrigin: '40px 40px' }}
          />
        ))}
        <circle cx="40" cy="40" r="8" fill="#F6E7D8" />
      </g>
    </svg>
  );
}

export function FloatingFlowers() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {flowers.map((f, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: f.top, left: (f as any).left, right: (f as any).right }}
          animate={{
            y: [0, -20, 0, 10, 0],
            rotate: [0, 5, -5, 3, 0],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 8 + i * 1.2,
            delay: f.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <FlowerSVG size={f.size} />
        </motion.div>
      ))}
    </div>
  );
}
