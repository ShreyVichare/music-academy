import FeaturedCourse from "@/components/FeaturedCourse";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import MovingCards from "@/components/MovingsCards";
import ToolTip from "@/components/ToolTip";
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
      <ToolTip />
      <Footer />
    </main>
  );
}
