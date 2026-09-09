import Hero from "./components/Hero";
import Stats from "./components/Stats";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Stats />
    </main>
  );
}
