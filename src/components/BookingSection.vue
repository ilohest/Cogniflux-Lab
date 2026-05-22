<script setup lang="ts">
import { imageUrl } from '../sanity/image';
import type { HomePageData } from '../types/sanity';

defineProps<{
  booking: HomePageData['booking'];
}>();
</script>

<template>
  <section id="agenda" class="bg-beige-med py-[72px] md:py-[82px]">
    <div class="mx-auto grid max-w-[1454px] gap-12 px-6 md:grid-cols-2 md:gap-[120px] md:px-20" data-reveal>
      <div class="flex min-h-[420px] flex-col justify-between">
        <div>
          <p class="tag">{{ booking.eyebrow }}</p>
          <h2 class="mt-3 font-serif text-[38px] leading-none tracking-[-0.02em] text-ink md:text-[44px]">{{ booking.title }}</h2>
          <p class="mt-5 max-w-[360px] text-[16px] font-medium leading-[1.35] text-ink">{{ booking.body }}</p>
          <a :href="booking.cta.href" class="btn btn-brown mt-8">{{ booking.cta.label }}</a>
        </div>
        <form class="mt-12 border-t border-[#d7c8ba] pt-7 md:mt-0" @submit.prevent>
          <h3 class="text-[17px] font-bold text-ink">{{ booking.waitlistTitle }}</h3>
          <p class="mt-1 text-[14px] font-medium leading-[1.35] text-muted">{{ booking.waitlistBody }}</p>
          <div class="mt-4 flex max-w-[420px] flex-col gap-2 sm:flex-row">
            <input type="email" placeholder="your@email.com" class="input-pill" aria-label="Email address" />
            <button type="submit" class="btn btn-muted">{{ booking.waitlistCta }}</button>
          </div>
        </form>
      </div>
      <div>
        <img
          :src="imageUrl(booking.image, 1400)"
          :alt="typeof booking.image === 'string' ? '' : booking.image.alt || ''"
          class="h-[320px] w-full rounded-[6px] object-cover object-center md:h-[338px]"
        />
        <div class="mt-7 grid gap-5 text-[15px] font-medium leading-[1.35] text-ink sm:grid-cols-3">
          <p class="font-bold">{{ booking.location.label }}</p>
          <p>{{ booking.location.name }}</p>
          <p class="whitespace-pre-line">{{ booking.location.address }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
