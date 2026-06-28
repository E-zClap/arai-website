import React, { useEffect, useRef } from 'react';
import { usePerformanceSettings } from '../../hooks/usePerformanceSettings';

/**
 * QuantumField — a single canvas-based particle network ("quantum lattice").
 *
 * One requestAnimationFrame loop draws drifting orange/blue nodes that connect
 * to nearby nodes (diamond-lattice feel) and react to the pointer. This is far
 * cheaper than dozens of framer-motion loops and is the site's signature motif.
 *
 * Props:
 *  - density:     relative node count multiplier (default 1)
 *  - interactive: pointer pushes nodes & draws cursor links (default false)
 *  - linkColor / nodeColors: brand colors
 *  - className:   extra classes for the absolutely-positioned canvas
 */
export const QuantumField = ({
  density = 1,
  interactive = false,
  className = '',
}) => {
  const canvasRef = useRef(null);
  const perf = usePerformanceSettings();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduced = perf.prefersReducedMotion;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let nodes = [];
    let raf = 0;
    let running = true;
    const pointer = { x: -9999, y: -9999, active: false };

    const ORANGE = 'rgba(249, 115, 22, ALPHA)';
    const BLUE = 'rgba(59, 130, 246, ALPHA)';

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Node count scales with area, density and device capability.
      const area = width * height;
      const base = Math.round((area / 26000) * density * perf.performanceScore);
      const count = Math.max(8, Math.min(reduced ? 26 : 90, base));
      nodes = new Array(count).fill(0).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 1.1,
        blue: Math.random() > 0.62,
      }));
    };

    const LINK_DIST = 130;

    const frame = () => {
      ctx.clearRect(0, 0, width, height);

      // links
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.22;
            ctx.strokeStyle = ORANGE.replace('ALPHA', alpha.toFixed(3));
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        // link to pointer + draw cursor influence
        if (interactive && pointer.active) {
          const dx = a.x - pointer.x;
          const dy = a.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          const R = 170;
          if (dist < R) {
            const alpha = (1 - dist / R) * 0.5;
            ctx.strokeStyle = ORANGE.replace('ALPHA', alpha.toFixed(3));
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.stroke();
            // gentle repulsion
            if (dist > 0.01) {
              const force = (1 - dist / R) * 0.6;
              a.vx += (dx / dist) * force * 0.08;
              a.vy += (dy / dist) * force * 0.08;
            }
          }
        }
      }

      // nodes
      for (const n of nodes) {
        if (!reduced) {
          n.x += n.vx;
          n.y += n.vy;
          // damping so pointer pushes settle
          n.vx *= 0.98;
          n.vy *= 0.98;
          // keep a little baseline drift
          if (Math.abs(n.vx) < 0.05) n.vx += (Math.random() - 0.5) * 0.02;
          if (Math.abs(n.vy) < 0.05) n.vy += (Math.random() - 0.5) * 0.02;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
          n.x = Math.max(0, Math.min(width, n.x));
          n.y = Math.max(0, Math.min(height, n.y));
        }
        ctx.fillStyle = (n.blue ? BLUE : ORANGE).replace('ALPHA', '0.9');
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (running && !reduced) raf = requestAnimationFrame(frame);
    };

    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active =
        pointer.x >= 0 && pointer.x <= width && pointer.y >= 0 && pointer.y <= height;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };

    const start = () => {
      if (raf) cancelAnimationFrame(raf);
      running = true;
      frame();
    };
    const stop = () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    resize();
    start();

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) frame(); // redraw a static frame on resize
    });
    ro.observe(canvas);

    // Pause when tab hidden or component scrolled out of view.
    const onVisibility = () => (document.hidden ? stop() : !reduced && start());
    document.addEventListener('visibilitychange', onVisibility);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (reduced) return;
        if (entry.isIntersecting && !document.hidden) start();
        else stop();
      },
      { threshold: 0.01 }
    );
    io.observe(canvas);

    if (interactive) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      window.addEventListener('pointerleave', onPointerLeave);
    }

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      if (interactive) {
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerleave', onPointerLeave);
      }
    };
  }, [perf, density, interactive]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 h-full w-full pointer-events-none ${className}`}
    />
  );
};

export default QuantumField;
