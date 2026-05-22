<script setup lang="ts">
import { onMounted, ref } from 'vue';
import SiteHeader from './components/SiteHeader.vue';
import HeroSection from './components/HeroSection.vue';
import IntroSection from './components/IntroSection.vue';
import PracticeSection from './components/PracticeSection.vue';
import AudienceSection from './components/AudienceSection.vue';
import TestimonialsSection from './components/TestimonialsSection.vue';
import BookingSection from './components/BookingSection.vue';
import FAQSection from './components/FAQSection.vue';
import FinalCTA from './components/FinalCTA.vue';
import SiteFooter from './components/SiteFooter.vue';
import { fallbackHomePage } from './sanity/fallbackContent';
import { getHomePage } from './sanity/queries';
import { useScrollMotion } from './composables/useScrollMotion';
import type { HomePageData } from './types/sanity';

const page = ref<HomePageData>(fallbackHomePage);

onMounted(async () => {
  page.value = await getHomePage();
  document.title = page.value.seo.title;
  const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (description) description.content = page.value.seo.description;
  useScrollMotion();
});
</script>

<template>
  <SiteHeader :nav="page.nav" :cta="page.headerCta" />
  <main>
    <HeroSection :hero="page.hero" />
    <IntroSection :intro="page.intro" :open-lab="page.openLab" />
    <PracticeSection :steps="page.practiceSteps" :full-width-image="page.fullWidthImage" />
    <AudienceSection :audience="page.audience" />
    <TestimonialsSection :content="page.testimonials" />
    <BookingSection :booking="page.booking" />
    <FAQSection :faq="page.faq" />
    <FinalCTA :content="page.finalCta" />
  </main>
  <SiteFooter :footer="page.footer" />
</template>
