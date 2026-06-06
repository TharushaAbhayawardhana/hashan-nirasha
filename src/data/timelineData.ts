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
    date: 'June 2018',
    title: 'First Glance',
    description:
      'In a crowded room at a mutual friend\'s gathering, their eyes met across the room. Time stood still for just a moment — enough to plant the seed of something beautiful.',
    emoji: '✨',
    icon: 'sparkles',
  },
  {
    id: 2,
    date: 'August 2018',
    title: 'First Message',
    description:
      'A simple "Hello, how are you?" — three words that would change everything. Hashan nervously typed, deleted, and typed again before finally hitting send.',
    emoji: '💬',
    icon: 'message',
  },
  {
    id: 3,
    date: 'October 2018',
    title: 'First Date',
    description:
      'Coffee turned into dinner, dinner turned into a moonlit walk. They talked until the stars came out, discovering they had been searching for each other all along.',
    emoji: '☕',
    icon: 'coffee',
  },
  {
    id: 4,
    date: 'March 2022',
    title: 'The Proposal',
    description:
      'Surrounded by a thousand roses in their favourite garden, Hashan got down on one knee. With trembling hands and a full heart, he asked the question — and Nirasha said yes.',
    emoji: '💍',
    icon: 'ring',
  },
  {
    id: 5,
    date: 'September 24, 2026',
    title: 'Forever Begins',
    description:
      'The most beautiful day of their lives. Two families unite, two souls become one, and a love story that started with a glance finds its most perfect chapter.',
    emoji: '🌹',
    icon: 'heart',
  },
];

export const weddingDayTimeline: TimelineEvent[] = [
  {
    id: 1,
    date: '10:00 AM',
    title: 'Wedding Ceremony',
    description: 'The sacred union begins at the Rose Garden Pavilion.',
    emoji: '💒',
    icon: 'church',
  },
  {
    id: 2,
    date: '12:30 PM',
    title: 'Cocktail Hour',
    description: 'Celebrate with champagne and canapés in the garden.',
    emoji: '🥂',
    icon: 'wine',
  },
  {
    id: 3,
    date: '2:00 PM',
    title: 'Wedding Lunch',
    description: 'A luxurious garden feast with family and friends.',
    emoji: '🌸',
    icon: 'utensils',
  },
  {
    id: 4,
    date: '6:00 PM',
    title: 'Evening Reception',
    description: 'Dancing, toasts, and celebrating into the night.',
    emoji: '🎊',
    icon: 'music',
  },
  {
    id: 5,
    date: '8:00 PM',
    title: 'First Dance',
    description: 'Under the stars, Hashan & Nirasha share their first dance.',
    emoji: '💃',
    icon: 'heart',
  },
];
