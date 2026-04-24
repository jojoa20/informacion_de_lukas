"use client";

import React, { useEffect, useRef } from 'react';

const NODE_COLOR = '#5FA8FF';
const LINE_COLOR_BASE = '95, 168, 255'; // RGB for rgba()
const GLOW_COLOR = 'rgba(95, 168, 255, 0.4)';
const CONNECTION_DISTANCE = 160;
const BASE_COUNT = 60; // desktop particle count
const SPEED = 0.12; // extremely slow drift

export default function BackgroundNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * SPEED;
        this.vy = (Math.random() - 0.5) * SPEED;
        this.radius = Math.random() * 1.4 + 0.6;
        this.alpha = Math.random() * 0.5 + 0.3; // subtle variance per node
      }

      update(width: number, height: number) {
        this.x += this.vx;
        this.y += this.vy;
        // Wrap around edges smoothly
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Node glow halo
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius * 4
        );
        gradient.addColorStop(0, `rgba(95, 168, 255, ${this.alpha})`);
        gradient.addColorStop(1, 'rgba(95, 168, 255, 0)');
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Node core
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = NODE_COLOR;
        ctx.shadowBlur = 8;
        ctx.shadowColor = GLOW_COLOR;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      }
    }

    const getNodeCount = () => {
      const w = window.innerWidth;
      if (w < 768) return Math.floor(BASE_COUNT * 0.5);   // mobile: -50%
      if (w < 1024) return Math.floor(BASE_COUNT * 0.7);  // tablet: -30%
      return BASE_COUNT;                                    // desktop: full
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const init = () => {
      particles = [];
      const count = getNodeCount();
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update(canvas.width, canvas.height);

        // Draw connecting lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            // Fade line based on distance
            const lineAlpha = (1 - dist / CONNECTION_DISTANCE) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${LINE_COLOR_BASE}, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        // Draw node after lines so it appears on top
        p1.draw(ctx);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full bg-[#020617]"
      style={{ pointerEvents: 'none', zIndex: -100, opacity: 0.25 }}
    />
  );
}
