import { Hero, Navbar } from "../../components";

export default function HeroSection() {
  return (
    <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
      <Navbar />
      <Hero />
    </div>
  );
}
