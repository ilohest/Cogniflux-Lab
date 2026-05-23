<script setup lang="ts">
import type { HomePageData } from '../types/sanity';

const footerCredit = 'WEBSITE BY ISAURE';

defineProps<{
  footer: HomePageData['footer'];
}>();
</script>

<template>
  <footer class="bg-beige-med py-16 md:py-[78px]">
    <div class="mx-auto max-w-[1454px] px-6 md:px-20">
      <div class="grid gap-12 md:grid-cols-2 md:gap-[120px]">
        <h2 class="whitespace-pre-line font-serif text-[38px] leading-none tracking-[-0.02em] text-ink md:text-[44px]">
          {{ footer.headline }}
        </h2>
        <div>
          <a :href="`mailto:${footer.email}`" class="font-serif text-[30px] leading-none tracking-[-0.02em] text-ink md:text-[34px]">{{ footer.email }}</a>
          <div class="mt-8 grid max-w-[430px] grid-cols-2 gap-10">
            <div v-for="column in footer.columns" :key="column.title">
              <h3 class="mb-4 text-[16px] font-bold text-muted">{{ column.title }}</h3>
              <ul class="space-y-1 text-[17px] font-bold leading-[1.2] text-ink">
                <li v-for="link in column.links" :key="link.href">
                  <a :href="link.href" class="transition hover:text-accent">{{ link.label }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-24 flex flex-col gap-5 text-[11px] font-medium text-muted md:mt-[130px] md:flex-row md:items-end md:justify-between">
        <div>
          <p class="text-[18px] font-bold text-ink">Cogniflux Lab</p>
          <p class="mt-1">
            Cogniflux Lab © 2026 All rights reserved
            <template v-for="link in footer.legalLinks" :key="link.href">
              <span> - </span><a :href="link.href" class="hover:text-ink">{{ link.label }}</a>
            </template>
          </p>
        </div>
        <a
          href="https://isaure-lohest.com/"
          target="_blank"
          rel="noreferrer"
          class="font-mono text-[10px] uppercase tracking-[0.04em] text-ink transition hover:text-accent"
        >
          {{ footerCredit }}
        </a>
      </div>
    </div>
  </footer>
</template>
