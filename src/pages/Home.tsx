import { HeroSection } from '../sections/HeroSection';
import { LoveStorySection } from '../sections/LoveStorySection';
import { CountdownSection } from '../sections/CountdownSection';
import { GallerySection } from '../sections/GallerySection';
import { WeddingDetailsSection } from '../sections/WeddingDetailsSection';
import { EventTimelineSection } from '../sections/EventTimelineSection';
import { FamilySection } from '../sections/FamilySection';
import { RSVPSection } from '../sections/RSVPSection';
import { LocationSection } from '../sections/LocationSection';
import { ThankYouSection } from '../sections/ThankYouSection';

export function Home() {
  return (
    <main>
      <HeroSection />
      <LoveStorySection />
      <CountdownSection />
      <GallerySection />
      <WeddingDetailsSection />
      <EventTimelineSection />
      <FamilySection />
      <RSVPSection />
      <LocationSection />
      <ThankYouSection />
    </main>
  );
}
