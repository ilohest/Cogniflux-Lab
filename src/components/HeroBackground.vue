<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

type Rgb = [number, number, number];

interface Orb {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radiusBase: number;
  currentRadius: number;
  color: Rgb;
  phase: number;
  speed: number;
  amplitudeX: number;
  amplitudeY: number;
}

const canvas = ref<HTMLCanvasElement | null>(null);

const props = withDefaults(defineProps<{
  distribution?: 'wide' | 'center';
}>(), {
  distribution: 'wide',
});

const colors: Rgb[] = [
  [255, 154, 61],
  [255, 179, 102],
  [230, 82, 78],
  [255, 209, 163],
  [255, 127, 70],
  [244, 105, 84],
];

const mouse = {
  active: false,
  x: 0,
  y: 0,
};

let ctx: CanvasRenderingContext2D | null = null;
let frameId = 0;
let resizeObserver: ResizeObserver | null = null;
let width = 0;
let height = 0;
let pixelRatio = 1;
let orbs: Orb[] = [];
let prefersReducedMotion = false;

const rgba = ([r, g, b]: Rgb, alpha: number) => `rgba(${r}, ${g}, ${b}, ${alpha})`;
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

// Petit générateur déterministe pour garder une composition stable à chaque reload.
const seededRandom = (seed: number) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
};

const resizeCanvas = () => {
  if (!canvas.value) return;

  const bounds = canvas.value.getBoundingClientRect();
  width = bounds.width;
  height = bounds.height;
  pixelRatio = Math.min(window.devicePixelRatio || 1, 1.25);

  canvas.value.width = Math.round(width * pixelRatio);
  canvas.value.height = Math.round(height * pixelRatio);

  ctx = canvas.value.getContext('2d', { alpha: true });
  if (!ctx) return;

  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  createOrbs();
  draw(performance.now());
};

const createOrbs = () => {
  const orbCount = width < 760 ? 22 : 34;
  const nextOrbs: Orb[] = [];

  for (let index = 0; index < orbCount; index += 1) {
    const horizontalSeed = seededRandom(index + 1);
    const centeredSeed = 0.5 + (horizontalSeed - 0.5) * 0.42;
    const baseX = props.distribution === 'center'
      ? centeredSeed * width
      : (horizontalSeed * 1.2 - 0.1) * width;
    const baseY = (0.34 + seededRandom(index + 18) * 0.74) * height;
    const radiusBase = clamp(150 + seededRandom(index + 34) * 210, 145, width < 760 ? 300 : 360);

    nextOrbs.push({
      baseX,
      baseY,
      x: baseX,
      y: baseY,
      vx: 0,
      vy: 0,
      radiusBase,
      currentRadius: radiusBase,
      color: colors[index % colors.length],
      phase: seededRandom(index + 51) * Math.PI * 2,
      speed: 0.0005 + seededRandom(index + 68) * 0.001,
      amplitudeX: (props.distribution === 'center' ? 50 : 95) + seededRandom(index + 85) * (props.distribution === 'center' ? 54 : 95),
      amplitudeY: 82 + seededRandom(index + 102) * 88,
    });
  }

  orbs = nextOrbs;
};

const updateOrb = (orb: Orb, time: number) => {
  const idleX = orb.baseX + Math.sin(time * orb.speed + orb.phase) * orb.amplitudeX;
  const idleY = orb.baseY + Math.cos(time * orb.speed * 0.8 + orb.phase) * orb.amplitudeY;
  let targetX = idleX;
  let targetY = idleY;

  if (mouse.active) {
    const dx = orb.x - mouse.x;
    const dy = orb.y - mouse.y;
    const distance = Math.hypot(dx, dy) || 1;
    const influenceRadius = 400;

    if (distance < influenceRadius) {
      const force = (influenceRadius - distance) / influenceRadius;
      const angle = Math.atan2(dy, dx);
      orb.vx += Math.cos(angle) * force * 2.5;
      orb.vy += Math.sin(angle) * force * 2.5;
      orb.currentRadius += (orb.radiusBase * 0.72 - orb.currentRadius) * 0.1;
    } else {
      orb.currentRadius += (orb.radiusBase - orb.currentRadius) * 0.05;
    }
  } else {
    orb.currentRadius += (orb.radiusBase - orb.currentRadius) * 0.05;
  }

  // Physique de ressort: tension + friction pour un retour élastique et doux.
  const tension = 0.015;
  const friction = 0.9;
  orb.vx = (orb.vx + (targetX - orb.x) * tension) * friction;
  orb.vy = (orb.vy + (targetY - orb.y) * tension) * friction;
  orb.x += orb.vx;
  orb.y += orb.vy;
};

const drawOrb = (orb: Orb) => {
  if (!ctx) return;

  const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.currentRadius);
  gradient.addColorStop(0, rgba(orb.color, 0.72));
  gradient.addColorStop(0.36, rgba(orb.color, 0.42));
  gradient.addColorStop(0.72, rgba(orb.color, 0.16));
  gradient.addColorStop(1, rgba(orb.color, 0));

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(orb.x, orb.y, orb.currentRadius, 0, Math.PI * 2);
  ctx.fill();
};

const draw = (time = 0) => {
  if (!ctx) return;

  ctx.clearRect(0, 0, width, height);
  ctx.globalCompositeOperation = 'screen';

  orbs.forEach((orb) => {
    updateOrb(orb, time);
    drawOrb(orb);
  });

  ctx.globalCompositeOperation = 'source-over';

  if (!prefersReducedMotion) {
    frameId = requestAnimationFrame(draw);
  }
};

const handleMouseMove = (event: PointerEvent) => {
  if (!canvas.value) return;

  const bounds = canvas.value.getBoundingClientRect();
  mouse.active =
    event.clientX >= bounds.left &&
    event.clientX <= bounds.right &&
    event.clientY >= bounds.top &&
    event.clientY <= bounds.bottom;
  mouse.x = event.clientX - bounds.left;
  mouse.y = event.clientY - bounds.top;
};

const handleMouseLeave = () => {
  mouse.active = false;
};

onMounted(() => {
  prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  resizeCanvas();

  if (canvas.value) {
    resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas.value);
  }

  window.addEventListener('pointermove', handleMouseMove, { passive: true });
  window.addEventListener('pointerleave', handleMouseLeave);

  if (!prefersReducedMotion) {
    frameId = requestAnimationFrame(draw);
  }
});

onUnmounted(() => {
  cancelAnimationFrame(frameId);
  resizeObserver?.disconnect();
  window.removeEventListener('pointermove', handleMouseMove);
  window.removeEventListener('pointerleave', handleMouseLeave);
});
</script>

<template>
  <canvas ref="canvas" class="hero-background-canvas" aria-hidden="true"></canvas>
</template>

<style scoped>
.hero-background-canvas {
  position: absolute;
  inset-inline: 0;
  top: 0;
  z-index: 1;
  width: 100%;
  height: calc(100% - var(--hero-haze-cutoff));
  filter: blur(58px) saturate(1.08);
  pointer-events: none;
  transform: translateZ(0);
}
</style>
