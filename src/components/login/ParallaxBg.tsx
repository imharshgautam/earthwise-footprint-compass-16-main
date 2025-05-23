
import React, { useEffect, useState } from "react";

// Background image assets for layers (unsplash, copyright free)
const bgImages = [
  // Backmost sky
  "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=1800",
  // Distant mountains/forest
  "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1800",
  // Middle forest
  "https://images.unsplash.com/photo-1615929378383-687ccc635154?q=80&w=1800",
  // Closer trees
  "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1800",
  // Foreground leaves/ground
  "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=1800"
];

const layerStrengths = [0.15, 0.12, 0.09, 0.06, 0.03]; // How much each layer moves on scroll

const ParallaxBg: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
      {bgImages.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 w-full h-full transition-transform duration-1000 ease-out`}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: i,
            transform: `translateY(${scrollY * layerStrengths[i]}px) scale(${1 + i * 0.08})`,
            opacity: 1 - i * 0.12
          }}
        />
      ))}
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100/60 via-green-300/60 to-green-500/40 dark:from-green-950/60 dark:via-green-700/60 dark:to-green-500/40"></div>
      <div className="absolute inset-0 bg-white/30 dark:bg-green-900/40 backdrop-blur-[2px]" />
    </div>
  );
};

export default ParallaxBg;
