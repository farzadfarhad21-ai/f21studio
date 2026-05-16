import CursorGlow from "./components/CursorGlow";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CinematicScroll from "./components/CinematicScroll";
import Process from "./components/Process";
import Services from "./components/Services";
import Showcase from "./components/Showcase";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <CursorGlow />
      <Navbar />
      <Hero />
      <CinematicScroll />
      <Process />
      <Services />
      <Showcase />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
