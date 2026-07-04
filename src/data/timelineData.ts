export interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  emoji: string;
  icon: string;
}

export const loveStoryTimeline: TimelineEvent[] = [
  {
    id: 1,
    date: '2014',
    title: 'First Glance',
    description:
      'It was 2014 at Central College Piliyandala. In the hallways of our school, Hashan first saw Nirasha \u2014 and something clicked. Little did we know, this was the beginning of a journey that would last a lifetime.',
    emoji: '\u2728',
    icon: 'sparkles',
  },
  {
    id: 2,
    date: 'July 13, 2016',
    title: 'Love Blossomed',
    description:
      'On this special day, our hearts found each other. What started as a simple connection grew into a beautiful love story. This is the day we celebrate as our anniversary \u2014 the day our love truly began.',
    emoji: '\u2764\uFE0F',
    icon: 'heart',
  },
  {
    id: 3,
    date: '2016 \u2014 2026',
    title: 'A Decade of Love',
    description:
      'Through school days at Central College, growing up, and every challenge in between \u2014 we stood by each other. Ten years of laughter, tears, dreams, and unwavering love. Each moment brought us closer to forever.',
    emoji: '\uD83E\uDD1D',
    icon: 'heart',
  },
  {
    id: 4,
    date: 'September 24, 2026',
    title: 'Forever Begins',
    description:
      'After 10 years of a beautiful love story, two souls become one. Surrounded by our loved ones, we begin our forever \u2014 together, as husband and wife.',
    emoji: '\uD83C\uDF39',
    icon: 'ring',
  },
];

export const weddingDayTimeline: TimelineEvent[] = [
  {
    id: 1,
    date: '10:20 AM',
    title: 'Poruwa Blessing',
    description: 'Auspicious preparatory rite — poruwa-setting blessing to start the ceremony with blessings.',
    emoji: '🪷',
    icon: 'sparkles',
  },
  {
    id: 2,
    date: '10:55 AM',
    title: 'Poruwa Ceremony',
    description: 'The couple ascends the poruwa as family and friends gather to witness the sacred union.',
    emoji: '💒',
    icon: 'heart',
  },
  {
    id: 3,
    date: '11:06 AM',
    title: 'Marriage Registration',
    description: 'The key auspicious moment — signing the marriage register, exchanging rings & garlands.',
    emoji: '💍',
    icon: 'ring',
  },
  {
    id: 4,
    date: '12:00 PM',
    title: 'Cake & Champagne',
    description: 'Cake cutting, champagne toast, and family photos to celebrate the happy union.',
    emoji: '🥂',
    icon: 'heart',
  },
  {
    id: 5,
    date: '12:40 PM',
    title: 'Lunch Reception',
    description: 'Wedding feast with family and friends — bar service, DJ, and Kandyan dancing.',
    emoji: '🍽️',
    icon: 'heart',
  },
  {
    id: 6,
    date: '2:00 PM',
    title: 'Dancing Floor Open',
    description: 'Time to hit the dance floor — celebrate with music, laughter, and unforgettable moves.',
    emoji: '💃',
    icon: 'heart',
  },
  {
    id: 7,
    date: '4:00 PM',
    title: 'Closing Ceremony',
    description: 'A heartfelt close to a beautiful day — thank you all for being part of our journey.',
    emoji: '🌅',
    icon: 'heart',
  },
];
