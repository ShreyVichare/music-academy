import FeaturedCourse from "@/components/FeaturedCourse";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white">
      <HeroSection />
      <FeaturedCourse />
    </main>
  );
}
