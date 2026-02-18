'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Ripple {
  x: number;
  y: number;
  radius: number;
  speed: number;
  maxRadius: number;
  active: boolean;
}

interface MousePos {
  x: number;
  y: number;
}

class Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  vx: number = 0;
  vy: number = 0;
  opacity: number;
  baseOpacity: number;
  glow: string;
  bursting: boolean = false;
  chainTimer: number = 0;
  trail: { x: number; y: number }[] = [];
  shakeIntensity: number = 0;
  shakeX: number = 0;
  shakeY: number = 0;

  constructor(w: number, h: number) {
    this.x = 0;
    this.y = 0;
    this.size = 1;
    this.speed = 1;
    this.opacity = 1;
    this.baseOpacity = 1;
    this.glow = 'white';
    this.reset(w, h, true);
  }

  reset(w: number, h: number, initial = false) {
    if (initial) {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
    } else {
      if (Math.random() > 0.5) {
        this.x = Math.random() * w;
        this.y = -60;
      } else {
        this.x = -60;
        this.y = Math.random() * h;
      }
    }
    this.size = Math.random() * 1.4 + 0.4;
    this.speed = Math.random() * 1.5 + 0.5;
    this.baseOpacity = Math.random() * 0.2 + 0.1;
    this.opacity = this.baseOpacity;
    this.glow = Math.random() > 0.7 ? '#0ea5e9' : '#ffffff';
    this.vx = 0;
    this.vy = 0;
    this.bursting = false;
    this.chainTimer = 0;
    this.trail = [];
    this.shakeIntensity = 0;
  }

  explode(
    mx: number,
    my: number,
    burstForce: number,
    isRecursive: boolean = false
  ) {
    const dx = this.x - mx;
    const dy = this.y - my;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const f = burstForce * (Math.random() * 0.5 + 0.75);
    this.vx += (dx / dist) * f;
    this.vy += (dy / dist) * f;
    this.bursting = true;
    this.opacity = 1.0;
    if (!isRecursive && Math.random() > 0.8) {
      this.chainTimer = 10 + Math.floor(Math.random() * 20);
    }
  }

  applyShake(intensity: number) {
    this.shakeIntensity = Math.max(this.shakeIntensity, intensity);
  }

  push(forceX: number, forceY: number) {
    this.vx += forceX;
    this.vy += forceY;
    this.opacity = Math.min(1.0, this.opacity + 0.2);
  }

  update(
    w: number,
    h: number,
    mouse: MousePos,
    onSecondaryPop: (x: number, y: number) => void,
    attractionRadius: number,
    attractionStrength: number
  ) {
    if (this.shakeIntensity > 0.1) {
      this.shakeX = (Math.random() - 0.5) * this.shakeIntensity;
      this.shakeY = (Math.random() - 0.5) * this.shakeIntensity;
      this.shakeIntensity *= 0.88;
    } else {
      this.shakeX = 0;
      this.shakeY = 0;
      this.shakeIntensity = 0;
    }

    const isMovingFast = Math.abs(this.vx) > 4 || Math.abs(this.vy) > 4;
    if (this.bursting || isMovingFast) {
      this.trail.push({ x: this.x + this.shakeX, y: this.y + this.shakeY });
      if (this.trail.length > 5) this.trail.shift();
    } else if (this.trail.length > 0) {
      this.trail.shift();
    }

    const dxm = mouse.x - this.x;
    const dym = mouse.y - this.y;
    const distm = Math.sqrt(dxm * dxm + dym * dym);

    // Direction base (angle 60deg)
    const ANGLE = 60 * (Math.PI / 180);
    const DX_BASE = Math.sin(ANGLE);
    const DY_BASE = Math.cos(ANGLE);
    const moveX = DX_BASE * this.speed;
    const moveY = DY_BASE * this.speed;

    if (!this.bursting) {
      if (distm < attractionRadius) {
        const force = (attractionRadius - distm) / attractionRadius;
        const norm = distm || 1;
        this.vx += (dxm / norm) * force * attractionStrength;
        this.vy += (dym / norm) * force * attractionStrength;
        this.opacity = Math.min(0.9, this.opacity + 0.05);
      } else {
        this.opacity = Math.max(this.baseOpacity, this.opacity - 0.015);
      }
    } else {
      this.opacity = Math.max(this.baseOpacity, this.opacity - 0.02);
      if (this.chainTimer > 0) {
        this.chainTimer--;
        if (this.chainTimer === 1) {
          onSecondaryPop(this.x, this.y);
          this.chainTimer = 0;
          this.vx *= 1.4;
          this.vy *= 1.4;
        }
      }
      if (Math.abs(this.vx) < 1 && Math.abs(this.vy) < 1) {
        this.bursting = false;
      }
    }

    this.x += moveX + this.vx;
    this.y += moveY + this.vy;
    const friction = this.bursting || isMovingFast ? 0.94 : 0.96;
    this.vx *= friction;
    this.vy *= friction;

    if (
      this.y > h + 150 ||
      this.x > w + 150 ||
      this.y < -150 ||
      this.x < -150
    ) {
      this.reset(w, h);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const renderX = this.x + this.shakeX;
    const renderY = this.y + this.shakeY;

    if (this.trail.length > 1) {
      ctx.beginPath();
      ctx.moveTo(this.trail[0].x, this.trail[0].y);
      for (let i = 1; i < this.trail.length; i++) {
        ctx.lineTo(this.trail[i].x, this.trail[i].y);
      }
      ctx.strokeStyle =
        this.glow === '#ffffff'
          ? `rgba(255, 255, 255, ${this.opacity * 0.3})`
          : `rgba(14, 165, 233, ${this.opacity * 0.3})`;
      ctx.lineWidth = this.size;
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(renderX, renderY, this.size, 0, Math.PI * 2);
    const isInteracting =
      Math.abs(this.vx) > 0.1 ||
      Math.abs(this.vy) > 0.1 ||
      this.shakeIntensity > 0;
    ctx.shadowBlur = isInteracting ? (this.bursting ? 15 : 8) : 0;
    ctx.shadowColor = this.glow;
    ctx.fillStyle =
      this.glow === '#ffffff'
        ? `rgba(255, 255, 255, ${this.opacity})`
        : `rgba(14, 165, 233, ${this.opacity})`;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgImage =
    'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2111&auto=format&fit=crop';
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsLargeScreen(window.innerWidth >= 1024);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  useEffect(() => {
    if (!isLargeScreen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    let ripples: Ripple[] = [];
    const mouse: MousePos = { x: -2000, y: -2000 };

    const STAR_COUNT = 200;
    const ATTRACTION_RADIUS = 300;
    const ATTRACTION_STRENGTH = 0.5;
    const GATHER_THRESHOLD = 35;
    const GATHER_RADIUS = 38;
    const BASE_BURST_FORCE = 28;

    let globalCooldown = 0;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push(new Star(canvas.width, canvas.height));
      }
    };

    const triggerSecondaryPop = (x: number, y: number) => {
      stars.forEach((star) => {
        const dx = star.x - x;
        const dy = star.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          star.explode(x, y, BASE_BURST_FORCE * 0.5, true);
        }
      });
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.beginPath();
      ctx.arc(x, y, 50, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(5, 5, 8, 0.18)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ripples = ripples.filter((r) => r.active);
      ripples.forEach((ripple) => {
        ripple.radius += ripple.speed;
        if (ripple.radius > ripple.maxRadius) ripple.active = false;
        const rippleThickness = 80;
        stars.forEach((star) => {
          const dx = star.x - ripple.x;
          const dy = star.y - ripple.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          if (dist > ripple.radius - rippleThickness && dist < ripple.radius) {
            const lifeRatio = 1 - ripple.radius / ripple.maxRadius;
            const intensity = lifeRatio * 15;
            star.applyShake(intensity);
            const pushFactor = lifeRatio * 4.5;
            star.push((dx / dist) * pushFactor, (dy / dist) * pushFactor);
          }
        });
        const opacity = (1 - ripple.radius / ripple.maxRadius) * 0.15;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(14, 165, 233, ${opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      });
      let currentGathered = 0;
      stars.forEach((star) => {
        star.update(
          canvas.width,
          canvas.height,
          mouse,
          triggerSecondaryPop,
          ATTRACTION_RADIUS,
          ATTRACTION_STRENGTH
        );
        const dx = mouse.x - star.x;
        const dy = mouse.y - star.y;
        if (Math.sqrt(dx * dx + dy * dy) < GATHER_RADIUS) currentGathered++;
      });
      if (currentGathered >= GATHER_THRESHOLD && globalCooldown <= 0) {
        stars.forEach((star) =>
          star.explode(mouse.x, mouse.y, BASE_BURST_FORCE)
        );
        ctx.fillStyle = 'rgba(14, 165, 233, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        globalCooldown = 100;
      }
      if (globalCooldown > 0) globalCooldown--;
      stars.forEach((star) => star.draw(ctx));
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleWindowClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const style = window.getComputedStyle(target);
      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        !!target.closest('button') ||
        !!target.closest('a') ||
        style.cursor === 'pointer';
      if (!isInteractive) {
        ripples.push({
          x: e.clientX,
          y: e.clientY,
          radius: 0,
          speed: 18,
          maxRadius: Math.max(window.innerWidth, window.innerHeight) * 1.5,
          active: true,
        });
        stars.forEach((star) => {
          const dx = star.x - e.clientX;
          const dy = star.y - e.clientY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < GATHER_RADIUS * 2.5) {
            star.explode(e.clientX, e.clientY, BASE_BURST_FORCE * 1.2);
          }
        });
        ctx.fillStyle = 'rgba(14, 165, 233, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleWindowClick);
    window.addEventListener('resize', init);

    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleWindowClick);
      window.removeEventListener('resize', init);
    };
  }, [isLargeScreen]);

  return (
    <div className="absolute inset-0 z-0 bg-[#050508] overflow-hidden pointer-events-none">
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.35, 0.45, 0.35] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(100px) brightness(0.25) saturate(1.2)',
        }}
        className="absolute inset-[-10%] pointer-events-none"
      />
      {isLargeScreen && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
        />
      )}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '90px 90px',
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(5,5,8,0.95)_100%)] pointer-events-none" />
    </div>
  );
};

export default InteractiveBackground;
