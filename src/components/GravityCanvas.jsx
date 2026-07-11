import React, { useEffect, useRef } from 'react';

export default function GravityCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: null,
      y: null,
      radius: 160,
    };

    // Particle class representing dots in the orbit system
    class Particle {
      constructor(cx, cy) {
        // Distribute particles outwards from center with density clustering near center
        this.radius = Math.pow(Math.random(), 1.5) * Math.max(width, height) * 0.75 + 30;
        this.angle = Math.random() * Math.PI * 2;
        
        // Slow orbit speed, inversely proportional to distance (Kepler-like rotation speed)
        const baseSpeed = 0.002 + Math.random() * 0.004;
        this.angularSpeed = baseSpeed * (180 / (this.radius + 60));
        
        // Organic radial oscillation waves
        this.waveAmp = Math.random() * 20 + 4;
        this.waveFreq = Math.floor(Math.random() * 3) + 2; // Rosette patterns (2-4 folds)
        this.wavePhase = Math.random() * Math.PI * 2;
        
        this.size = Math.random() * 2.2 + 0.6; // Small beautiful dots (0.6px to 2.8px)
        this.alpha = Math.random() * 0.45 + 0.25; // Transparent glowing dots

        // Color based on the starting angle to maintain the rainbow wheel layout
        const hue = Math.floor((this.angle * 180) / Math.PI) % 360;
        this.color = `hsl(${hue}, 85%, 65%)`;

        this.x = cx + Math.cos(this.angle) * this.radius;
        this.y = cy + Math.sin(this.angle) * this.radius;
      }

      draw(cx, cy) {
        let renderX = this.x;
        let renderY = this.y;

        // Mouse interaction (Zero-G ripple displacement)
        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const distance = Math.hypot(dx, dy);

          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            // Push particles away smoothly
            renderX += (dx / distance) * force * 50;
            renderY += (dy / distance) * force * 50;
          }
        }

        ctx.beginPath();
        ctx.arc(renderX, renderY, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
      }

      update(cx, cy) {
        // Orbit around center
        this.angle += this.angularSpeed;

        // Apply orbit coordinate with rosette wave oscillation
        const currentRadius = this.radius + Math.sin(this.angle * this.waveFreq + this.wavePhase) * this.waveAmp;
        this.x = cx + Math.cos(this.angle) * currentRadius;
        this.y = cy + Math.sin(this.angle) * currentRadius;
      }
    }

    // Initialize particles
    const init = () => {
      particles = [];
      const cx = width / 2;
      const cy = height / 2;
      
      // High count for dense beautiful cluster
      const numberOfParticles = Math.min(Math.floor((width * height) / 1600), 750);
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle(cx, cy));
      }
    };

    // Animation loop
    const animate = () => {
      if (!canvasRef.current) return;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Draw and update particles
      particles.forEach((particle) => {
        particle.update(cx, cy);
        particle.draw(cx, cy);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    init();
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -3,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}
