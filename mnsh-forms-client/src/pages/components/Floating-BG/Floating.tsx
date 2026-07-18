import { motion } from "motion/react";
import { useMemo } from "react";

function FloatingDots({ count = 30 }: { count?: number }) {
  const dots = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: 4 + Math.random() * 6, // 4px to 10px
      duration: 8 + Math.random() * 10, // 8s to 18s
      xMove: 20 + Math.random() * 40,
      yMove: 20 + Math.random() * 40,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="bg-ink absolute rounded-full"
          style={{
            top: dot.top,
            left: dot.left,
            width: dot.size,
            height: dot.size,
          }}
          animate={{
            x: [0, dot.xMove, -dot.xMove * 0.6, 0],
            y: [0, -dot.yMove, dot.yMove * 0.6, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: dot.duration,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default FloatingDots