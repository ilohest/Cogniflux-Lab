import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const useScrollMotion = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
    gsap.fromTo(
      element,
      { y: 36, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 86%',
          once: true,
        },
      },
    );
  });

  gsap.utils.toArray<HTMLElement>('[data-float-card]').forEach((element, index) => {
    gsap.to(element, {
      y: index % 2 === 0 ? -18 : 16,
      rotation: Number(element.dataset.rotation || 0) + (index % 2 === 0 ? 1.5 : -1.5),
      ease: 'none',
      scrollTrigger: {
        trigger: element.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.7,
      },
    });
  });
};
