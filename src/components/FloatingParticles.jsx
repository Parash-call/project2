import React, { useMemo } from 'react';

export default function FloatingParticles() {
  const petals = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${(i * 5.5) + (Math.random() * 4)}%`,
      delay: `${(i * 0.7) % 6}s`,
      duration: `${10 + (i % 6) * 2}s`,
      size: 16 + (i % 4) * 6,
      rotate: Math.random() * 360,
      type: i % 3 === 0 ? '🌸' : i % 3 === 1 ? '🌼' : '✨'
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map((p) => (
        <span
          key={p.id}
          className="absolute select-none opacity-40 animate-float-slow transition-opacity duration-1000"
          style={{
            left: p.left,
            top: '-20px',
            fontSize: `${p.size}px`,
            animation: `fallPetal ${p.duration} linear infinite`,
            animationDelay: p.delay,
            transform: `rotate(${p.rotate}deg)`
          }}
        >
          {p.type}
        </span>
      ))}
      <style>{`
        @keyframes fallPetal {
          0% {
            transform: translateY(-20px) rotate(0deg) translateX(0px);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(105vh) rotate(360deg) translateX(40px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

