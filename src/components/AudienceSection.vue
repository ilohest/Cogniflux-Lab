<script setup lang="ts">
import type { HomePageData } from '../types/sanity';

defineProps<{
  audience: HomePageData['audience'];
}>();
</script>

<template>
  <section id="for" class="bg-beige-light pt-[62px] md:pt-[76px]">
    <div class="mx-auto grid max-w-[1454px] gap-10 px-5 sm:px-6 md:grid-cols-2 md:gap-[110px] md:px-20" data-reveal>
      <div>
        <p class="tag">{{ audience.eyebrow }}</p>
        <h2 class="mt-4 max-w-[430px] font-serif text-[36px] leading-none tracking-[-0.02em] text-ink md:text-[44px]">
          {{ audience.title }}
        </h2>
      </div>
      <div class="text-[16px] font-medium leading-[1.4] text-ink md:text-[17px]">
        <div class="space-y-5">
          <p v-for="paragraph in audience.body" :key="paragraph">{{ paragraph }}</p>
        </div>
        <p class="mt-16 max-w-[620px] text-[20px] font-bold leading-[1.35] text-muted md:text-[21px]">
          {{ audience.note }}
        </p>
      </div>
    </div>
  </section>
</template>
