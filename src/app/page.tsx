import FeaturedCourse from "@/components/FeaturedCourse";
import HeroSection from "@/components/HeroSection";
import MovingCards from "@/components/MovingsCards";
import UpcomingWebinars from "@/components/UpcomingWebinars";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white">
      <HeroSection />
      <FeaturedCourse />
      <WhyChooseUs />
      <MovingCards />
      <UpcomingWebinars />
    </main>
  );
}
