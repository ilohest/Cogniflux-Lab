<script setup lang="ts">
import { ref } from 'vue';
import type { HomePageData } from '../types/sanity';

const hoveredIndex = ref<number | null>(null);

defineProps<{
  content: HomePageData['testimonials'];
}>();

const cardLayout = [
  { left: '11%', y: 22, rotation: -5, z: 2 },
  { left: '28%', y: 76, rotation: 5, z: 8 },
  { left: '43%', y: 20, rotation: -4, z: 3 },
  { left: '61%', y: 70, rotation: -8, z: 10 },
  { left: '78%', y: 30, rotation: 11, z: 4 },
  { left: '91%', y: 34, rotation: 7, z: 1 },
];

const cardTransform = (index: number) => {
  const layout = cardLayout[index % cardLayout.length];
  const hoverLift = hoveredIndex.value === index ? -30 : 0;
  const hoverScale = hoveredIndex.value === index ? 1.035 : 1;

  return `translateX(-50%) translateY(${layout.y + hoverLift}px) rotate(${layout.rotation}deg) scale(${hoverScale})`;
};
</script>

<template>
  <section class="overflow-hidden bg-beige-light pb-[120px] pt-[120px] md:pb-[150px] md:pt-[160px]">
    <div class="mx-auto max-w-[1454px] px-6 md:px-20">
      <div class="mx-auto max-w-[460px] text-center" data-reveal>
        <p class="tag">{{ content.eyebrow }}</p>
        <h2 class="mt-3 whitespace-pre-line font-serif text-[42px] leading-none tracking-[-0.02em] text-ink md:text-[56px]">
          {{ content.title }}
        </h2>
      </div>
      <div class="testimonial-stage relative mt-[96px] md:h-[360px]" data-reveal>
        <article
          v-for="(item, index) in content.items"
          :key="`${item.name}-${item.role}`"
          class="testimonial-card absolute top-0 flex h-[278px] w-[280px] origin-center flex-col justify-between rounded-[7px] p-8 shadow-sm md:h-[292px] md:w-[310px]"
          :style="{
            backgroundColor: item.color || '#F7D3BA',
            left: cardLayout[index % cardLayout.length].left,
            transform: cardTransform(index),
            zIndex: hoveredIndex === index ? 40 : cardLayout[index % cardLayout.length].z,
          }"
          tabindex="0"
          @mouseenter="hoveredIndex = index"
          @mouseleave="hoveredIndex = null"
          @focusin="hoveredIndex = index"
          @focusout="hoveredIndex = null"
        >
          <p class="font-serif text-[22px] leading-[0.96] tracking-[-0.02em] text-ink md:text-[24px]">"{{ item.quote }}"</p>
          <p class="text-[15px] font-medium leading-none text-ink">{{ item.name }} - {{ item.role }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
