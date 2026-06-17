import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Copy, Check, Play, MessageCircle, MousePointer2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { copyToClipboard } from '@/lib/utils';
import { useMousePosition } from '@/hooks/useMousePosition';

const SERVER_IP = 'play.bhukkadsmp.com';

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; size: number; alpha: number }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 12000));
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      particlesRef.current.forEach((p, i) => {
        let dx = 0, dy = 0;
        const dist = Math.hypot(mx - p.x, my - p.y);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          dx = ((p.x - mx) / dist) * force * 0.5;
          dy = ((p.y - my) / dist) * force * 0.5;
        }

        p.x += p.vx + dx;
        p.y += p.vy + dy;
        p.vx += (Math.random() - 0.5) * 0.02;
        p.vy += (Math.random() - 0.5) * 0.02;
        p.vx *= 0.99;
        p.vy *= 0.99;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 197, 94, ${p.alpha})`;
        ctx.fill();

        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p2 = particlesRef.current[j];
          const d = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(34, 197, 94, ${0.06 * (1 - d / 120)})`;
            ctx.stroke();
          }
        }
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    const mouseMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', mouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', mouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}

export function HeroSection() {
  const [copied, setCopied] = useState(false);
  const mouse = useMousePosition();

  const handleCopy = async () => {
    await copyToClipboard(SERVER_IP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const bgX = useMotionValue(0);
  const bgY = useMotionValue(0);
  const smoothX = useSpring(bgX, { stiffness: 50, damping: 30 });
  const smoothY = useSpring(bgY, { stiffness: 50, damping: 30 });

  useEffect(() => {
    bgX.set((mouse.x / window.innerWidth - 0.5) * 20);
    bgY.set((mouse.y / window.innerHeight - 0.5) * 20);
  }, [mouse.x, mouse.y, bgX, bgY]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-stone-950" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(34, 197, 94, 0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(234, 179, 8, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(34, 197, 94, 0.05) 0%, transparent 50%)',
        }}
      />

      <motion.div
        className="absolute inset-0"
        style={{ x: smoothX, y: smoothY }}
      >
        <div className="absolute inset-0 grid-bg" />
      </motion.div>

      <ParticleField />

      <div className="absolute inset-0 bg-gradient-to-b from-stone-950/0 via-stone-950/30 to-stone-950 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 mb-6 sm:mb-8 hover:border-green-500/40 transition-colors duration-300 group">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-glow" />
            <span className="text-xs sm:text-sm font-medium text-green-400 group-hover:text-green-300 transition-colors">
              <span className="tabular-nums">1,247</span> Players Online
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black mb-4 sm:mb-6 leading-tight"
        >
          <span className="text-gradient">Welcome to</span>
          <br />
          <span className="text-gradient">BhukkadSMP</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Premium Minecraft Survival Experience. Build, explore, and conquer
          with thousands of players in the ultimate adventure.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 sm:mb-10"
        >
          <div
            className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 sm:px-6 py-3 hover:border-green-500/30 transition-all duration-300 group cursor-pointer active:scale-[0.98]"
            onClick={handleCopy}
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse-glow" />
            <span className="font-heading font-bold text-sm sm:text-base text-green-400 group-hover:text-green-300 transition-colors">{SERVER_IP}</span>
            <button
              onClick={e => { e.stopPropagation(); handleCopy(); }}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer active:scale-90"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400 group-hover:text-gray-200 transition-colors" />
              )}
            </button>
          </div>

          <Button variant="primary" size="lg" icon={<Play className="w-5 h-5" />}>
            Play Now
          </Button>

          <Button variant="secondary" size="lg" icon={<MessageCircle className="w-5 h-5" />}>
            Join Discord
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex items-center justify-center gap-6 sm:gap-8 text-sm text-muted"
        >
          {[
            { label: '1.21.x Compatible', color: 'bg-green-500' },
            { label: 'Premium Survival', color: 'bg-gold-500' },
            { label: 'Active Community', color: 'bg-green-500' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2 hover:text-gray-300 transition-colors cursor-default">
              <span className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
              <span>{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-border flex items-start justify-center p-1.5 hover:border-green-500/50 transition-colors">
          <div className="w-1.5 h-3 rounded-full bg-green-500 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}
