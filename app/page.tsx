import CursorGlow from "./components/CursorGlow";
import Navbar from "./components/Navbar";
import MissionControl from "./components/MissionControl";
import CinematicScroll from "./components/CinematicScroll";
import Process from "./components/Process";
import Services from "./components/Services";
import Work from "./components/Work";
import About from "./components/About";
import HomeFAQ from "./components/HomeFAQ";
import LatestPosts from "./components/LatestPosts";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <CursorGlow />
      <Navbar />
      <MissionControl />
      <Work />
      <Services />
      <CinematicScroll />
      <Process />
      <About />
      <LatestPosts />
      <HomeFAQ />
      <Contact />
      <Footer />
    </main>
  );
}
