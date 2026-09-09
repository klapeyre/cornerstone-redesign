import Hero from "./components/Hero";
import Stats from "./components/Stats";
import ServicesPreview from "./components/ServicesPreview";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Stats />
      <ServicesPreview />
    </main>
  );
}
