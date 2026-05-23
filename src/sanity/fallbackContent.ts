import type { HomePageData } from '../types/sanity';

const photo = (name: string) => `/photos/${name}`;

export const fallbackHomePage: HomePageData = {
  seo: {
    title: 'Cogniflux Lab | Brain health, in motion',
    description: 'One-hour group classes in Brussels that combine cognitive training and physical challenge.',
  },
  nav: [
    { label: 'The practice', href: '#practice' },
    { label: "Who it's for", href: '#for' },
    { label: 'Agenda', href: '#agenda' },
    { label: 'FAQ', href: '#faq' },
  ],
  headerCta: { label: 'Book a session', href: '#agenda' },
  hero: {
    eyebrow: 'Brussels - Brain health, in motion',
    title: "You train your body.\nWhy aren't you training your brain?",
    body: 'One-hour group classes in Brussels that combine cognitive training and physical challenge. Track your performance. Watch your progress build.',
    cta: { label: 'Book a session', href: '#agenda' },
    image: photo('COGNIFLUXLAB2-PHOTO6.jpg'),
  },
  intro: {
    eyebrow: 'The mind needs a gym',
    title: 'For the body, we have gyms, coaches, classes, and programmes. We track our reps, our heart rate, our recovery.',
    body: [
      'For the mind, we mostly built treatment, assistance, and distraction. Therapy, which is essential. Productivity tools, which help. Endless feeds, which mostly do not. But never the equivalent of a gym.',
      'Brain health deserves a practice too. Because staying sharp, steady, and confident takes use, challenge, and care. Especially when attention is pulled in many directions, daily life asks you to stay responsive, and mental fatigue builds over time.',
      'And now Artificial Intelligence adds a different pressure: underuse. As more thinking is handed over to tools, mental capacities can become less actively exercised. What has been missing, until now, is a place to train the mind on purpose.',
      'Cogniflux Lab is that place. This is not passive wellness. It is deliberate training for the mind, delivered through the body.',
    ],
  },
  openLab: {
    eyebrow: 'What happens in an Open Lab',
    title: 'One hour. Coached.\nStructured',
    body: "The Open Lab is our one-hour group format. You move through a structured circuit of stations that combine physical effort with cognitive demand. You'll sweat. You'll think. And you'll do both at the same time, with the challenge adjusted to your level.",
  },
  practiceSteps: [
    {
      number: '01',
      title: 'Warm-up',
      body: ['The coach brings the group through quick motor-cognitive exercises to switch on your attention and get your body and brain working together from the start.'],
      image: photo('COGNIFLUXLAB2-PHOTO16.jpg'),
    },
    {
      number: '02',
      title: 'The circuit',
      body: [
        'You rotate through a sequence of stations where bodyweight strength, cardio, agility, and coordination are layered with tasks that challenge your focus, memory, processing speed, and decision-making. Each station demands something different.',
        'Physical intensity is moderate and adjustable. You should expect to move, think, and respond in real time, but the session is designed to challenge you without overwhelming you.',
      ],
      image: photo('COGNIFLUXLAB2-PHOTO26.jpg'),
      dark: true,
    },
    {
      number: '03',
      title: 'Cooldown',
      body: ['Five minutes of guided mindfulness, bringing your attention to the body and breath. You reset after the effort and leave composed.'],
      image: photo('COGNIFLUXLAB2-PHOTO31.jpg'),
    },
  ],
  fullWidthImage: photo('COGNIFLUXLAB2-PHOTO14.jpg'),
  audience: {
    eyebrow: 'Who this is for',
    title: 'Built for people with demanding lives.',
    body: [
      'People who want to stay sharp, steady, and confident. People who value challenge, routine, community, and progress they can see. People who take their physical fitness seriously and wonder why there is no equivalent for the mind.',
      'People who want something more rigorous than a mindfulness app and more structured than vague advice to keep your brain active. People who worry that constant input, screens, and AI are changing how actively they use their own attention, memory, and judgement.',
      'This is a practice for generally healthy adults. It is not therapy, clinical care, or rehabilitation.',
    ],
    note: 'If you want a deliberate, measurable practice for cognitive performance, this was built for you.',
  },
  testimonials: {
    eyebrow: 'What participants say',
    title: 'After the circuits,\nsomething shifts.',
    items: [
      { quote: 'It reminds me of Formula One drivers practising cognitive drills. I know people with intense jobs who want to sharpen focus.', name: 'Michiel', role: 'Consultant', color: '#F6B875' },
      { quote: 'You can feel your focus sharpen as the session goes on. You can see your results improve.', name: 'Dimitris', role: 'Analyst', color: '#F7A092' },
      { quote: 'It keeps your mind engaged while you move. Not just exercise, not just thinking.', name: 'Ana', role: 'Policy officer', color: '#F7D3BA' },
      { quote: 'It is for people who want to keep the connection between body and mind alive. And do something better than doomscrolling.', name: 'Yoana', role: 'Communication consultant', color: '#D2A084' },
      { quote: 'Most jobs require you to stay in your head at speed. This feels like a way to train that skill.', name: 'Laura', role: 'Service advisor', color: '#F3D9AA' },
      { quote: 'You leave calmer, but sharper.', name: 'Sam', role: 'Digital consultant', color: '#80D2C8' },
    ],
  },
  booking: {
    eyebrow: 'Upcoming Open Labs',
    title: 'Reserve your spot.',
    body: 'Browse upcoming dates and book your place below. Single-session access. Limited spots.',
    cta: { label: 'Check the next sessions', href: 'https://cal.com/' },
    waitlistTitle: "Can't make these dates?",
    waitlistBody: "We'll send you an email when the next session opens. No spam.",
    waitlistCta: 'Get notified',
    image: photo('COGNIFLUXLAB2-PHOTO7.jpg'),
    location: {
      label: 'Location:',
      name: 'Lokahi Holistic Studio',
      address: 'Place du Chatelain 23,\n1050 Ixelles',
    },
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Frequently asked\nquestions',
    items: [
      { question: 'Is this therapy or clinical care?', answer: 'No. Cogniflux Lab is a training practice for generally healthy adults. It does not replace therapy, diagnosis, treatment, or rehabilitation.' },
      { question: 'Is this suitable for older adults?', answer: 'The session can be adjusted, but it is designed for adults who can safely take part in moderate physical activity.' },
      { question: 'Do I need previous experience?', answer: 'No. The coach explains each station and adapts the challenge to your level.' },
      { question: 'How intense should I expect a session to be?', answer: 'Moderate and adjustable. You will move, think, and respond in real time without being pushed past your capacity.' },
      { question: 'In which language are sessions held?', answer: 'Sessions can be held in English and French depending on the group.' },
      { question: 'How is my data handled?', answer: 'Only the information needed for booking, contact, and session operation is collected. Performance data is handled with care and can be explained before you participate.' },
      { question: 'What should I wear for an Open Lab?', answer: 'Comfortable training clothes and indoor shoes. Bring water and anything else you normally use for a light workout.' },
    ],
  },
  finalCta: {
    title: 'Your mind deserves a practice\nfor strength.',
    cta: { label: 'Book your Open Lab', href: '#agenda' },
  },
  footer: {
    headline: 'Brain health,\nin motion',
    email: 'studio@cognifluxlab.com',
    columns: [
      {
        title: 'Explore',
        links: [
          { label: 'The practice', href: '#practice' },
          { label: "Who it's for", href: '#for' },
          { label: 'Agenda', href: '#agenda' },
          { label: 'FAQ', href: '#faq' },
        ],
      },
      {
        title: 'Follow us',
        links: [
          { label: 'LinkedIn', href: 'https://linkedin.com' },
          { label: 'WhatsApp', href: 'https://wa.me/' },
          { label: 'Instagram', href: 'https://instagram.com' },
        ],
      },
    ],
    legalLinks: [
      { label: 'Terms of service', href: '/terms' },
      { label: 'Privacy policy', href: '/privacy' },
    ],
  },
};
