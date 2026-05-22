<script setup lang="ts">
import type { CTA, FooterLink } from '../types/sanity';

defineProps<{
  nav: FooterLink[];
  cta: CTA;
}>();
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 bg-beige-light/88 backdrop-blur-md">
    <div class="mx-auto flex h-[72px] max-w-[1454px] items-center justify-between px-6 md:px-20">
      <a href="#" class="text-[20px] font-bold text-ink md:text-[21px]">Cogniflux Lab</a>
      <nav class="hidden items-center gap-[66px] text-[15px] font-bold text-ink lg:flex">
        <a v-for="item in nav" :key="item.href" :href="item.href" class="transition hover:text-accent">
          {{ item.label }}
        </a>
      </nav>
      <div class="hidden items-center gap-5 text-[15px] font-bold text-ink md:flex">
        <span>Ready to train your mind?</span>
        <a :href="cta.href" class="btn btn-teal">{{ cta.label }}</a>
      </div>
      <a :href="cta.href" class="btn btn-teal md:hidden">{{ cta.label }}</a>
    </div>
  </header>
</template>
