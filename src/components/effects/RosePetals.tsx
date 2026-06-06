
interface Petal {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
  color: string;
}

const PETAL_COLORS = ['#E9A5B3', '#F5C6D0', '#D9A06F', '#F6E7D8', '#C8748A'];

export function RosePetals() {
  const petals: Petal[] = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 14 + 8,
    duration: Math.random() * 8 + 8,
    delay: Math.random() * 12,
    rotation: Math.random() * 360,
    color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.x}%`,
            top: '-5%',
            animation: `petalFall ${petal.duration}s linear ${petal.delay}s infinite`,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size * 1.3}
            viewBox="0 0 20 26"
            fill="none"
            style={{ transform: `rotate(${petal.rotation}deg)` }}
          >
            <path
              d="M10 0C10 0 20 8 20 16C20 21.5 15.5 26 10 26C4.5 26 0 21.5 0 16C0 8 10 0 10 0Z"
              fill={petal.color}
              fillOpacity="0.7"
            />
            <path
              d="M10 4C10 4 16 10 16 16C16 19.3 13.3 22 10 22C6.7 22 4 19.3 4 16C4 10 10 4 10 4Z"
              fill={petal.color}
              fillOpacity="0.4"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
