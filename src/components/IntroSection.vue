<script setup lang="ts">
import type { HomePageData } from '../types/sanity';

defineProps<{
  intro: HomePageData['intro'];
  openLab: HomePageData['openLab'];
}>();
</script>

<template>
  <section id="practice" class="bg-beige-light pb-20 pt-8 md:pb-28">
    <div class="mx-auto max-w-[1454px] px-5 sm:px-6 md:px-20">
      <div class="grid gap-12 md:grid-cols-2 md:gap-[110px]" data-reveal>
        <div>
          <p class="tag">{{ intro.eyebrow }}</p>
          <h2 class="mt-4 max-w-[560px] font-serif text-[34px] leading-none tracking-[-0.02em] text-ink md:text-[43px]">
            {{ intro.title }}
          </h2>
        </div>
        <div class="space-y-6 pt-1 text-[16px] font-medium leading-[1.4] text-ink md:text-[17px]">
          <p v-for="paragraph in intro.body" :key="paragraph">{{ paragraph }}</p>
        </div>
      </div>
      <div class="mx-auto mt-[150px] max-w-[620px] text-center md:mt-[180px]" data-reveal>
        <p class="tag">{{ openLab.eyebrow }}</p>
        <h2 class="mt-3 whitespace-pre-line font-serif text-[44px] leading-none tracking-[-0.02em] text-ink md:text-[56px]">
          {{ openLab.title }}
        </h2>
        <p class="mt-8 text-[16px] font-medium leading-[1.4] text-ink md:text-[17px]">
          {{ openLab.body }}
        </p>
      </div>
    </div>
  </section>
</template>
