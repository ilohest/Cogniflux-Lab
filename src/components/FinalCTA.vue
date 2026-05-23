<script setup lang="ts">
import HeroBackground from './HeroBackground.vue';
import type { HomePageData } from '../types/sanity';

defineProps<{
  content: HomePageData['finalCta'];
}>();
</script>

<template>
  <section class="final-haze bg-beige-light py-[118px] text-center md:py-[155px]">
    <HeroBackground />
    <div class="relative z-10 mx-auto max-w-[1454px] px-6 md:px-20" data-reveal>
      <h2 class="mx-auto max-w-[760px] whitespace-pre-line font-serif text-[42px] leading-none tracking-[-0.02em] text-ink md:text-[56px]">
        {{ content.title }}
      </h2>
      <a :href="content.cta.href" class="btn btn-brown mt-10">{{ content.cta.label }}</a>
    </div>
  </section>
</template>
