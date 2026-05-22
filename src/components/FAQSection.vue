<script setup lang="ts">
import { ref } from 'vue';
import type { HomePageData } from '../types/sanity';

defineProps<{
  faq: HomePageData['faq'];
}>();

const openIndex = ref<number | null>(null);

const setInitialHeight = (element: Element) => {
  const panel = element as HTMLElement;
  panel.style.height = '0';
  panel.style.opacity = '0';
};

const expandPanel = (element: Element) => {
  const panel = element as HTMLElement;
  panel.style.height = `${panel.scrollHeight}px`;
  panel.style.opacity = '1';
};

const lockOpenHeight = (element: Element) => {
  const panel = element as HTMLElement;
  panel.style.height = 'auto';
};

const prepareCollapse = (element: Element) => {
  const panel = element as HTMLElement;
  panel.style.height = `${panel.scrollHeight}px`;
  panel.style.opacity = '1';
  panel.offsetHeight;
};

const collapsePanel = (element: Element) => {
  const panel = element as HTMLElement;
  panel.style.height = '0';
  panel.style.opacity = '0';
};
</script>

<template>
  <section id="faq" class="bg-beige-light pt-[78px] md:pt-[96px]">
    <div class="mx-auto grid max-w-[1454px] gap-12 px-6 md:grid-cols-2 md:gap-[120px] md:px-20" data-reveal>
      <div>
        <p class="tag">{{ faq.eyebrow }}</p>
        <h2 class="mt-3 whitespace-pre-line font-serif text-[38px] leading-none tracking-[-0.02em] text-ink md:text-[44px]">
          {{ faq.title }}
        </h2>
      </div>
      <div class="pt-1">
        <div v-for="(item, index) in faq.items" :key="item.question" class="border-b border-[#eadfd3]">
          <button
            class="flex w-full items-center justify-between gap-6 py-5 text-left text-[17px] font-bold text-ink md:text-[18px]"
            type="button"
            @click="openIndex = openIndex === index ? null : index"
          >
            <span>{{ item.question }}</span>
            <span class="text-[24px] font-normal text-accent">{{ openIndex === index ? '-' : '+' }}</span>
          </button>
          <Transition
            name="faq-panel"
            @before-enter="setInitialHeight"
            @enter="expandPanel"
            @after-enter="lockOpenHeight"
            @before-leave="prepareCollapse"
            @leave="collapsePanel"
          >
            <div v-if="openIndex === index" class="faq-panel overflow-hidden">
              <div class="pb-6 pr-12 text-[15px] font-medium leading-[1.45] text-muted">
                {{ item.answer }}
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>
