"use client";

import { useEffect, useRef } from "react";

// World units: the terrain spans WIDTH on x and wraps every DEPTH on z.
const WIDTH = 16;
const DEPTH = 14;
const NEAR = 0.6;
const LEVELS = 6;

interface Star {
  x: number;
  y: number;
  size: number;
  phase: number;
}

function heightAt(x: number, z: number, t: number) {
  return (
    0.55 * Math.sin(x * 0.42 + z * 0.31 + t * 0.15) +
    0.35 * Math.sin(x * 0.9 - z * 0.55 + 1.7 - t * 0.1) +
    0.18 * Math.sin(x * 2.1 + z * 1.3 + t * 0.2)
  );
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let pointsX = new Float32Array(0);
    let pointsZ = new Float32Array(0);
    let stars: Star[] = [];

    const mouse = { x: 0.5, y: 0.5 };
    const camera = { x: 0, y: 1.6 };

    let frame = 0;
    let visible = true;
    const start = performance.now();

    function setup() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = rect.height;

      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = width < 640 ? 10000 : 24000;

      pointsX = new Float32Array(count);
      pointsZ = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        pointsX[i] = (Math.random() * 2 - 1) * WIDTH;
        pointsZ[i] = Math.random() * DEPTH;
      }

      stars = Array.from({ length: width < 640 ? 70 : 160 }, () => ({
        x: Math.random(),
        y: Math.random() * 0.45,
        size: Math.random() < 0.85 ? 1 : 1.6,
        phase: Math.random() * Math.PI * 2,
      }));
    }

    function draw(time: number) {
      const t = (time - start) / 1000;

      ctx!.clearRect(0, 0, width, height);

      // Stars
      for (const star of stars) {
        const alpha = 0.25 + 0.45 * Math.abs(Math.sin(t * 0.6 + star.phase));

        ctx!.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
        ctx!.fillRect(star.x * width, star.y * height, star.size, star.size);
      }

      // Ease the camera toward the pointer for a subtle parallax
      camera.x += ((mouse.x - 0.5) * 1.4 - camera.x) * 0.04;
      camera.y += (1.6 + (mouse.y - 0.5) * 0.4 - camera.y) * 0.04;

      const travel = t * 0.35;
      const focal = width * 0.55;
      const horizon = height * 0.22;

      const paths = Array.from({ length: LEVELS }, () => new Path2D());

      for (let i = 0; i < pointsX.length; i++) {
        const z = (((pointsZ[i] - travel) % DEPTH) + DEPTH) % DEPTH;

        if (z < NEAR) {
          continue;
        }

        const x = pointsX[i];
        const h = heightAt(x, z + travel, t);

        const sx = width / 2 + ((x - camera.x) * focal) / z;
        const sy = horizon + ((camera.y - h) * focal) / z;

        if (sx < -4 || sx > width + 4 || sy < -4 || sy > height + 4) {
          continue;
        }

        // Crests glow, valleys fade, and both edges of the depth range fade out
        const ridge = Math.min(1, Math.max(0, (h + 1.08) / 2.16));
        const fadeNear = Math.min(1, (z - NEAR) / 1.2);
        const fadeFar = 1 - Math.pow(z / DEPTH, 1.6);
        const alpha =
          fadeNear * fadeFar * (0.15 + 0.85 * Math.pow(ridge, 2));

        if (alpha < 0.04) {
          continue;
        }

        const level = Math.min(LEVELS - 1, Math.floor(alpha * LEVELS));
        const size = z < 3 ? 1.6 : 1.1;

        paths[level].rect(sx, sy, size, size);
      }

      paths.forEach((path, level) => {
        ctx!.fillStyle = `rgba(255,255,255,${((level + 1) / LEVELS).toFixed(3)})`;
        ctx!.fill(path);
      });
    }

    function loop(time: number) {
      if (visible) {
        draw(time);
      }

      frame = requestAnimationFrame(loop);
    }

    function handlePointer(event: PointerEvent) {
      mouse.x = event.clientX / window.innerWidth;
      mouse.y = event.clientY / window.innerHeight;
    }

    function handleResize() {
      setup();

      if (reducedMotion) {
        draw(start + 8000);
      }
    }

    setup();

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });

    observer.observe(canvas);
    window.addEventListener("resize", handleResize);

    if (reducedMotion) {
      draw(start + 8000);
    } else {
      window.addEventListener("pointermove", handlePointer);
      frame = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
