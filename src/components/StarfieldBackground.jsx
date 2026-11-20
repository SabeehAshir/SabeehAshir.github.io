import { useEffect, useRef } from "react";

const STAR_COLORS = ["#ffffff", "#e0f2fe", "#93c5fd", "#c4b5fd"];
const CURSOR_RADIUS = 160; // How far from the cursor stars light up and connect
const STAR_LINK_DISTANCE = 115; // Max distance between two nearby stars to link them

const StarfieldBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let stars = [];
    let shootingStars = [];
    let animationFrameId;

    // Smooth mouse parallax + exact cursor tracking for constellations
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    const mouse = { x: -9999, y: -9999, active: false };

    const createStars = () => {
      const count = Math.min(180, Math.floor((width * height) / 9000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.4 + 0.4,
        depth: Math.random() * 0.8 + 0.2,
        baseAlpha: Math.random() * 0.6 + 0.25,
        twinkleSpeed: Math.random() * 0.002 + 0.0008,
        twinkleOffset: Math.random() * Math.PI * 2,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)]
      }));
    };

    const spawnShootingStar = () => {
      const startFromTop = Math.random() > 0.35;
      const x = startFromTop ? Math.random() * width * 0.85 : -40;
      const y = startFromTop ? -20 : Math.random() * height * 0.45;
      const angle = (Math.PI / 180) * (25 + Math.random() * 20);
      const speed = 10 + Math.random() * 6;

      shootingStars.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length: 90 + Math.random() * 70,
        opacity: 1,
        decay: 0.014 + Math.random() * 0.008
      });
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createStars();
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
      targetX = (e.clientX / width - 0.5) * 28;
      targetY = (e.clientY / height - 0.5) * 28;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    let nextMeteorAt = performance.now() + 1200;

    const render = (now) => {
      ctx.clearRect(0, 0, width, height);

      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;

      const nearbyStars = [];

      // Draw twinkling stars & collect stars near the cursor
      for (const star of stars) {
        if (!prefersReducedMotion) {
          star.y -= star.depth * 0.12;
          if (star.y < -5) {
            star.y = height + 5;
            star.x = Math.random() * width;
          }
        }

        const twinkle = prefersReducedMotion
          ? 0
          : Math.sin(now * star.twinkleSpeed + star.twinkleOffset) * 0.35;
        let alpha = Math.max(0.1, Math.min(1, star.baseAlpha + twinkle));
        let radius = star.radius;

        const drawX = star.x - currentX * star.depth;
        const drawY = star.y - currentY * star.depth;

        if (mouse.active && !prefersReducedMotion) {
          const dx = drawX - mouse.x;
          const dy = drawY - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < CURSOR_RADIUS) {
            const boost = 1 - dist / CURSOR_RADIUS;
            alpha = Math.min(1, alpha + boost * 0.5);
            radius += boost * 0.8;
            nearbyStars.push({ x: drawX, y: drawY, dist });
          }
        }

        ctx.beginPath();
        ctx.arc(drawX, drawY, radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
      }

      // Draw constellation hover lines around the cursor
      if (nearbyStars.length > 0) {
        ctx.globalAlpha = 1;
        ctx.lineWidth = 1;

        for (let i = 0; i < nearbyStars.length; i++) {
          const a = nearbyStars[i];

          // Connect star to cursor
          const cursorOpacity = (1 - a.dist / CURSOR_RADIUS) * 0.35;
          ctx.strokeStyle = `rgba(96, 165, 250, ${cursorOpacity})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();

          // Connect nearby stars to each other
          for (let j = i + 1; j < nearbyStars.length; j++) {
            const b = nearbyStars[j];
            const pairDist = Math.hypot(a.x - b.x, a.y - b.y);

            if (pairDist < STAR_LINK_DISTANCE) {
              const pairOpacity = (1 - pairDist / STAR_LINK_DISTANCE) * 0.28;
              ctx.strokeStyle = `rgba(147, 197, 253, ${pairOpacity})`;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }

      // Spawn & draw shooting stars
      if (!prefersReducedMotion) {
        if (now >= nextMeteorAt) {
          spawnShootingStar();
          nextMeteorAt = now + 2600 + Math.random() * 3400;
        }

        for (let i = shootingStars.length - 1; i >= 0; i--) {
          const s = shootingStars[i];
          s.x += s.vx;
          s.y += s.vy;
          s.opacity -= s.decay;

          if (s.opacity <= 0 || s.x > width + 150 || s.y > height + 150) {
            shootingStars.splice(i, 1);
            continue;
          }

          const tailX = s.x - (s.vx / Math.hypot(s.vx, s.vy)) * s.length;
          const tailY = s.y - (s.vy / Math.hypot(s.vx, s.vy)) * s.length;

          const gradient = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
          gradient.addColorStop(0, `rgba(255, 255, 255, ${s.opacity})`);
          gradient.addColorStop(0.3, `rgba(96, 165, 250, ${s.opacity * 0.8})`);
          gradient.addColorStop(1, "rgba(59, 130, 246, 0)");

          ctx.globalAlpha = 1;
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="starfield-canvas" aria-hidden="true" />;
};

export default StarfieldBackground;