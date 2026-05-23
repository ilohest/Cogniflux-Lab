<script setup lang="ts">
import { imageUrl } from '../sanity/image';
import type { PracticeStep, SanityImageAsset } from '../types/sanity';

defineProps<{
  steps: PracticeStep[];
  fullWidthImage: SanityImageAsset | string;
}>();
</script>

<template>
  <section class="practice-section bg-beige-light">
    <div class="practice-stack mx-auto max-w-[1454px] px-5 sm:px-6 md:px-20">
      <article
        v-for="(step, index) in steps"
        :key="step.number"
        class="practice-card grid min-h-[590px] rounded-[10px] md:grid-cols-[1.56fr_1fr]"
        :class="step.dark ? 'text-beige-light' : 'text-ink'"
        :style="{ zIndex: index + 1 }"
      >
        <div
          class="flex min-h-[430px] flex-col justify-between overflow-hidden rounded-t-[10px] p-8 md:min-h-[590px] md:rounded-l-[10px] md:rounded-tr-none md:p-10"
          :class="step.dark ? 'bg-ink' : 'bg-beige-light'"
        >
          <div>
            <p class="font-serif text-[30px] leading-none tracking-[-0.02em] text-accent">{{ step.number }}</p>
            <h3 class="mt-5 font-sans text-[56px] font-normal leading-[0.9] tracking-[-0.03em] sm:text-[68px] md:text-[96px]">
              {{ step.title }}
            </h3>
          </div>
          <div class="practice-card-body max-w-[610px] space-y-6 text-[17px] font-bold leading-[1.4]" :class="step.dark ? 'text-beige-light/92' : 'text-[#4b362d]'">
            <p v-for="paragraph in step.body" :key="paragraph" :class="step.dark && step.body.indexOf(paragraph) > 0 ? 'text-primary/70' : ''">
              {{ paragraph }}
            </p>
          </div>
        </div>
        <img
          :src="imageUrl(step.image, 1200)"
          :alt="typeof step.image === 'string' ? '' : step.image.alt || ''"
          class="h-[430px] w-full rounded-b-[10px] object-cover md:h-full md:rounded-b-none md:rounded-r-[10px]"
        />
      </article>
    </div>
    <div class="practice-after-stack" data-reveal>
      <img :src="imageUrl(fullWidthImage, 2400)" alt="" class="h-[360px] w-full object-cover object-center md:h-[490px]" />
    </div>
  </section>
</template>
