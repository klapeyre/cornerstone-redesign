import Hero from "./components/Hero";
import Stats from "./components/Stats";
import ServicesPreview from "./components/ServicesPreview";
import FeaturedWork from "./components/FeaturedWork";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Stats />
      <ServicesPreview />
      <FeaturedWork />
    </main>
  );
}
