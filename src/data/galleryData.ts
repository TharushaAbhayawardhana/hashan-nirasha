import img1 from '../assets/Gallery/DSC03663.jpg';
import img2 from '../assets/Gallery/DSC03828.jpg';
import img3 from '../assets/Gallery/DSC03834.jpg';
import img4 from '../assets/Gallery/DSC03871 copy.jpg';
import img5 from '../assets/Gallery/DSC03883.jpg';
import img6 from '../assets/Gallery/DSC03896.jpg';
import img7 from '../assets/Gallery/DSC03933.jpg';
import img8 from '../assets/Gallery/DSC03963.jpg';
import img9 from '../assets/Gallery/DSC03908.jpg';
import img10 from '../assets/Gallery/DSC03718.jpg';

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  caption: string;
  span?: 'tall' | 'wide' | 'normal' | 'narrow';
  focal?: string;
}

export const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: img1,
    alt: 'Hashan and Nirasha walking hand in hand on the beach',
    caption: 'Laughter that never fades',
    span: 'tall',
    focal: 'center 30%',
  },
  {
    id: 2,
    src: img2,
    alt: 'Hashan and Nirasha dancing together on the beach',
    caption: 'Two hearts, one rhythm',
    span: 'tall',
    focal: 'center 55%',
  },
  {
    id: 3,
    src: img3,
    alt: 'A close-up detail of Hashan and Nirasha holding hands',
    caption: 'In love with every glance',
    span: 'normal',
    focal: 'center',
  },
  {
    id: 4,
    src: img4,
    alt: 'Hashan and Nirasha portrait by the shoreline',
    caption: 'Forever by your side',
    span: 'tall',
    focal: 'center 15%',
  },
  {
    id: 5,
    src: img5,
    alt: 'Hashan and Nirasha walking together at the water\'s edge',
    caption: 'Our favourite moment',
    span: 'tall',
    focal: 'center 45%',
  },
  {
    id: 6,
    src: img6,
    alt: 'Detail of flowers held between Hashan and Nirasha',
    caption: 'Where our story lives',
    span: 'wide',
    focal: 'center',
  },
  {
    id: 7,
    src: img7,
    alt: 'Hashan and Nirasha sharing a quiet moment together',
    caption: 'Hand in hand, always',
    span: 'normal',
    focal: 'center 20%',
  },
  {
    id: 8,
    src: img8,
    alt: 'Hashan and Nirasha portrait, looking at each other',
    caption: 'Making memories together',
    span: 'tall',
    focal: 'center 40%',
  },
  {
    id: 9,
    src: img9,
    alt: 'Hashan kissing Nirasha\'s forehead on the beach at sunset, bouquet in hand',
    caption: 'A tender kiss at golden hour',
    span: 'tall',
    focal: 'center 50%',
  },
  {
    id: 10,
    src: img10,   // back to the original DSC03718.jpg — no crop needed
    alt: 'Nirasha looking up at Hashan, her hand on his shoulder, by the sea',
    caption: 'Close to your heart',
    span: 'normal',    // half-width, tall-height — guarantees full head-to-feet visibility
    focal: 'center 25%',    // vertical crop no longer happens, so only x-centering matters
  },
];  