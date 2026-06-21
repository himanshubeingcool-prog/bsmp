import { useMousePosition } from '@/hooks/useMousePosition';
import { useState, useEffect } from 'react';

export function CursorGlow() {
  const { x, y } = useMousePosition();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = () => setVisible(true);
    const hide = () => setVisible(false);
    window.addEventListener('mouseenter', show);
    window.addEventListener('mouseleave', hide);
    return () => {
      window.removeEventListener('mouseenter', show);
      window.removeEventListener('mouseleave', hide);
    };
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-[9999] transition-opacity duration-500"
      style={{
        left: x,
        top: y,
        width: 400,
        height: 400,
        transform: 'translate(-50%, -50%)',
        opacity: visible ? 0.6 : 0,
        background: 'radial-gradient(circle, rgba(34, 211, 238, 0.08) 0%, rgba(234, 179, 8, 0.03) 40%, transparent 70%)',
      }}
    />
  );
}
