<script setup lang="ts">
import { imageUrl } from '../sanity/image';
import type { PracticeStep, SanityImageAsset } from '../types/sanity';

defineProps<{
  steps: PracticeStep[];
  fullWidthImage: SanityImageAsset | string;
}>();
</script>

<template>
  <section class="bg-white ">
    <div class="practice-stack mx-auto max-w-[1454px] px-6 md:px-20">
      <article
        v-for="(step, index) in steps"
        :key="step.number"
        class="practice-card grid min-h-[590px] overflow-hidden rounded-[10px] md:grid-cols-[1.56fr_1fr]"
        :class="step.dark ? 'bg-ink text-beige-light' : 'bg-beige-light text-ink'"
        :style="{ zIndex: index + 1 }"
        data-reveal
      >
        <div class="flex min-h-[430px] flex-col justify-between p-8 md:min-h-[590px] md:p-10">
          <div>
            <p class="font-serif text-[30px] leading-none tracking-[-0.02em] text-accent">{{ step.number }}</p>
            <h3 class="mt-5 font-sans text-[68px] font-normal leading-[0.9] tracking-[-0.03em] md:text-[96px]">
              {{ step.title }}
            </h3>
          </div>
          <div class="max-w-[610px] space-y-6 text-[17px] font-bold leading-[1.4]" :class="step.dark ? 'text-beige-light/92' : 'text-[#4b362d]'">
            <p v-for="paragraph in step.body" :key="paragraph" :class="step.dark && step.body.indexOf(paragraph) > 0 ? 'text-primary/70' : ''">
              {{ paragraph }}
            </p>
          </div>
        </div>
        <img
          :src="imageUrl(step.image, 1200)"
          :alt="typeof step.image === 'string' ? '' : step.image.alt || ''"
          class="h-[430px] w-full object-cover md:h-full"
        />
      </article>
    </div>
    <div class="mt-[70px] md:mt-[86px]" data-reveal>
      <img :src="imageUrl(fullWidthImage, 2400)" alt="" class="h-[360px] w-full object-cover object-center md:h-[490px]" />
    </div>
  </section>
</template>
