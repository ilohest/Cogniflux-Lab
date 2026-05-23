<script setup lang="ts">
import { ref } from 'vue';
import type { CTA, FooterLink } from '../types/sanity';

defineProps<{
  nav: FooterLink[];
  cta: CTA;
}>();

const isMenuOpen = ref(false);

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 bg-beige-light/92 backdrop-blur-md" @keydown.escape.window="closeMenu">
    <div class="relative z-10 mx-auto flex h-[68px] max-w-[1454px] items-center justify-between px-5 sm:px-6 md:h-[72px] md:px-20">
      <a href="#" class="text-[19px] font-bold text-ink md:text-[21px]" @click="closeMenu">Cogniflux Lab</a>
      <nav class="hidden items-center gap-[66px] text-[15px] font-bold text-ink lg:flex">
        <a v-for="item in nav" :key="item.href" :href="item.href" class="transition hover:text-accent">
          {{ item.label }}
        </a>
      </nav>
      <div class="hidden items-center gap-5 text-[15px] font-bold text-ink lg:flex">
        <span>Ready to train your mind?</span>
        <a :href="cta.href" class="btn btn-teal">{{ cta.label }}</a>
      </div>
      <button
        type="button"
        class="inline-flex h-11 w-11 items-center justify-center text-ink transition hover:text-accent lg:hidden"
        :aria-expanded="isMenuOpen"
        aria-controls="mobile-menu"
        :aria-label="isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span class="relative block h-3.5 w-5">
          <span
            class="absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition"
            :class="isMenuOpen ? 'translate-y-[6px] rotate-45' : ''"
          ></span>
          <span
            class="absolute left-0 top-[6px] h-0.5 w-5 rounded-full bg-current transition"
            :class="isMenuOpen ? 'opacity-0' : ''"
          ></span>
          <span
            class="absolute bottom-0 left-0 h-0.5 w-5 rounded-full bg-current transition"
            :class="isMenuOpen ? '-translate-y-[6px] -rotate-45' : ''"
          ></span>
        </span>
      </button>
    </div>
    <Transition
      enter-active-class="mobile-menu-enter-active"
      enter-from-class="mobile-menu-enter-from"
      enter-to-class="mobile-menu-enter-to"
      leave-active-class="mobile-menu-leave-active"
      leave-from-class="mobile-menu-leave-from"
      leave-to-class="mobile-menu-leave-to"
    >
      <div v-if="isMenuOpen" id="mobile-menu" class="mobile-menu-panel fixed inset-0 h-svh bg-beige-light px-5 pb-9 pt-[92px] sm:px-6 md:pt-[100px] lg:hidden">
        <nav class="mx-auto flex h-full max-w-[1454px] flex-col text-[18px] font-bold leading-[1.15] text-ink sm:text-[20px]">
          <a
            v-for="(item, index) in nav"
            :key="item.href"
            :href="item.href"
            class="mobile-menu-item py-2.5 transition hover:text-accent sm:py-3"
            :style="{ '--menu-item-index': index }"
            @click="closeMenu"
          >
            {{ item.label }}
          </a>
          <div class="mobile-menu-prompt mt-auto pb-4 text-center text-[15px] font-bold leading-[1.25] text-ink sm:text-[16px]">
            Ready to train your mind?
          </div>
          <a :href="cta.href" class="btn btn-teal mobile-menu-cta w-full text-[16px] sm:text-[17px]" @click="closeMenu">{{ cta.label }}</a>
        </nav>
      </div>
    </Transition>
  </header>
</template>
