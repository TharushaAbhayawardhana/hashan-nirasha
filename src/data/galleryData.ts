export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  caption: string;
  span?: 'tall' | 'wide' | 'normal';
}

// Using curated Unsplash images for weddings/roses
export const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
    alt: 'Couple in rose garden',
    caption: 'Lost in the garden',
    span: 'tall',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80',
    alt: 'Wedding rings',
    caption: 'Forever symbols',
    span: 'normal',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
    alt: 'Romantic moment',
    caption: 'Together always',
    span: 'normal',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
    alt: 'Wedding flowers',
    caption: 'Blooming love',
    span: 'wide',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1550005809-91ad75fb315f?w=800&q=80',
    alt: 'Wedding venue',
    caption: 'Our forever place',
    span: 'normal',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80',
    alt: 'Couple portrait',
    caption: 'Two souls, one heart',
    span: 'tall',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1478146059778-26b7d7c1a628?w=800&q=80',
    alt: 'Rose bouquet',
    caption: 'A thousand roses',
    span: 'normal',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800&q=80',
    alt: 'Golden hour photo',
    caption: 'Golden memories',
    span: 'normal',
  },
];
