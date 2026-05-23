<script setup lang="ts">
import { computed } from 'vue';
import HeroBackground from './HeroBackground.vue';
import { imageUrl } from '../sanity/image';
import type { HomePageData } from '../types/sanity';

const props = defineProps<{
  hero: HomePageData['hero'];
}>();

const emphasis = 'training your brain?';
const heroTitleLines = computed(() => props.hero.title.split('\n').filter(Boolean));

const emphasisIndex = (line: string) => line.toLowerCase().indexOf(emphasis);
</script>

<template>
  <section class="hero-haze relative isolate overflow-hidden bg-beige-light pt-[190px] md:pt-[220px]">
    <HeroBackground />
    <div class="relative z-10 mx-auto max-w-[1454px] px-5 sm:px-6 md:px-20">
      <div class="mx-auto max-w-[930px] text-center" data-reveal>
        <p class="pill mx-auto mb-7 w-fit">{{ hero.eyebrow }}</p>
        <h1 class="mx-auto max-w-[900px] font-serif text-[48px] leading-[1] tracking-[-0.02em] text-ink md:text-[56px]">
          <span v-for="line in heroTitleLines" :key="line" class="block">
            <template v-if="emphasisIndex(line) >= 0">
              {{ line.slice(0, emphasisIndex(line)) }}<strong class="font-semibold">{{ line.slice(emphasisIndex(line)) }}</strong>
            </template>
            <template v-else>{{ line }}</template>
          </span>
        </h1>
        <p class="mx-auto mt-7 max-w-[670px] text-[18px] font-medium leading-[1.4] text-[#4b362d] md:text-[20px]">
          {{ hero.body }}
        </p>
        <a :href="hero.cta.href" class="btn btn-brown mt-12">{{ hero.cta.label }}</a>
      </div>
      <div class="relative mt-12 pb-28 md:mt-14 md:pb-32" data-reveal>
        <img
          :src="imageUrl(hero.image, 2200)"
          :alt="typeof hero.image === 'string' ? '' : hero.image.alt || ''"
          class="h-[360px] w-full rounded-[8px] object-cover object-center shadow-soft md:h-[650px]"
        />
      </div>
    </div>
  </section>
</template>
