<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

type CloudBlob = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  driftX: number;
  driftY: number;
  phase: number;
  speed: number;
  color: string;
};

const canvas = ref<HTMLCanvasElement | null>(null);

let context: CanvasRenderingContext2D | null = null;
let animationFrame = 0;
let blobs: CloudBlob[] = [];
let width = 0;
let height = 0;
let pixelRatio = 1;
let reducedMotion = false;

const pointer = {
  active: false,
  x: 0,
  y: 0,
};

const palette = [
  'rgba(255, 91, 30, 0.30)',
  'rgba(255, 126, 67, 0.26)',
  'rgba(248, 158, 69, 0.24)',
  'rgba(255, 186, 121, 0.22)',
  'rgba(255, 118, 100, 0.18)',
];

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const createBlobs = () => {
  const cloudWidth = width * 0.92;
  const cloudHeight = height * 0.48;
  const centerX = width * 0.54;
  const centerY = height * 0.68;

  const seeds = [
    [-0.42, -0.04, 0.34, 0],
    [-0.28, 0.08, 0.42, 1],
    [-0.1, -0.1, 0.46, 2],
    [0.08, 0.02, 0.52, 3],
    [0.26, -0.02, 0.44, 1],
    [0.42, 0.08, 0.34, 2],
    [-0.2, 0.22, 0.38, 4],
    [0.18, 0.23, 0.4, 0],
    [0.0, -0.26, 0.36, 3],
    [0.36, -0.2, 0.3, 4],
  ];

  blobs = seeds.map(([x, y, radius, colorIndex], index) => {
    const baseX = centerX + x * cloudWidth;
    const baseY = centerY + y * cloudHeight;

    return {
      x: baseX,
      y: baseY,
      baseX,
      baseY,
      vx: 0,
      vy: 0,
      radius: clamp(width * radius, 260, 680),
      driftX: width * (0.018 + index * 0.002),
      driftY: height * (0.018 + index * 0.0015),
      phase: index * 0.74,
      speed: 0.00022 + index * 0.000025,
      color: palette[colorIndex],
    };
  });
};

const drawBlob = (blob: CloudBlob, time: number) => {
  if (!context) return;

  const pulse = 1 + Math.sin(time * blob.speed * 1.8 + blob.phase) * 0.07;
  const radius = blob.radius * pulse;
  const gradient = context.createRadialGradient(blob.x, blob.y, radius * 0.08, blob.x, blob.y, radius);

  gradient.addColorStop(0, blob.color);
  gradient.addColorStop(0.42, blob.color.replace(/0\.\d+\)/, '0.16)'));
  gradient.addColorStop(1, 'rgba(255, 248, 238, 0)');

  context.fillStyle = gradient;
  context.beginPath();
  context.ellipse(blob.x, blob.y, radius * 1.22, radius * 0.58, Math.sin(time * 0.00018 + blob.phase) * 0.28, 0, Math.PI * 2);
  context.fill();
};

const draw = (time = 0) => {
  if (!context) return;

  context.clearRect(0, 0, width, height);

  const baseGradient = context.createLinearGradient(0, 0, 0, height);
  baseGradient.addColorStop(0, '#fff8ee');
  baseGradient.addColorStop(0.35, '#fff8ee');
  baseGradient.addColorStop(0.62, 'rgba(255, 230, 211, 0.84)');
  baseGradient.addColorStop(0.82, 'rgba(249, 177, 120, 0.72)');
  baseGradient.addColorStop(1, 'rgba(255, 248, 238, 0)');
  context.fillStyle = baseGradient;
  context.fillRect(0, 0, width, height);

  context.save();
  context.globalCompositeOperation = 'multiply';
  context.filter = `blur(${Math.max(38, width * 0.032)}px) saturate(1.12)`;

  blobs.forEach((blob, index) => {
    const driftX = Math.sin(time * blob.speed + blob.phase) * blob.driftX;
    const driftY = Math.cos(time * blob.speed * 0.82 + blob.phase) * blob.driftY;
    let targetX = blob.baseX + driftX;
    let targetY = blob.baseY + driftY;

    if (pointer.active) {
      const dx = blob.x - pointer.x;
      const dy = blob.y - pointer.y;
      const distance = Math.hypot(dx, dy) || 1;
      const reach = Math.max(width * 0.42, 420);
      const strength = Math.max(0, 1 - distance / reach) ** 2;
      const direction = index % 2 === 0 ? 1 : -0.42;

      targetX += (dx / distance) * strength * width * 0.085 * direction;
      targetY += (dy / distance) * strength * height * 0.07;
    }

    blob.vx = (blob.vx + (targetX - blob.x) * 0.018) * 0.88;
    blob.vy = (blob.vy + (targetY - blob.y) * 0.018) * 0.88;
    blob.x += blob.vx;
    blob.y += blob.vy;

    drawBlob(blob, time);
  });

  context.restore();

  if (!reducedMotion) {
    animationFrame = requestAnimationFrame(draw);
  }
};

const resize = () => {
  if (!canvas.value) return;

  const rect = canvas.value.getBoundingClientRect();
  width = rect.width;
  height = rect.height;
  pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

  canvas.value.width = Math.round(width * pixelRatio);
  canvas.value.height = Math.round(height * pixelRatio);
  context = canvas.value.getContext('2d');

  if (!context) return;

  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  createBlobs();
  draw(performance.now());
};

const updatePointer = (event: PointerEvent) => {
  if (!canvas.value) return;

  const rect = canvas.value.getBoundingClientRect();
  const isInside =
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom;

  pointer.active = isInside;
  pointer.x = event.clientX - rect.left;
  pointer.y = event.clientY - rect.top;
};

const deactivatePointer = () => {
  pointer.active = false;
};

onMounted(() => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  resize();

  window.addEventListener('resize', resize);
  window.addEventListener('pointermove', updatePointer, { passive: true });
  window.addEventListener('pointerleave', deactivatePointer);

  if (!reducedMotion) {
    animationFrame = requestAnimationFrame(draw);
  }
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrame);
  window.removeEventListener('resize', resize);
  window.removeEventListener('pointermove', updatePointer);
  window.removeEventListener('pointerleave', deactivatePointer);
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
  z-index: 0;
  width: 100%;
  height: calc(100% - var(--hero-haze-cutoff));
  pointer-events: none;
}
</style>
