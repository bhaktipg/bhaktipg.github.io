import Contact from "./components/Contact";
import Credentials from "./components/Credentials";
import Hero from "./components/Hero";
import History from "./components/History";
import Lines from "./components/Lines";
import Nav from "./components/Nav";
import PracticeLog from "./components/PracticeLog";
import Projects from "./components/Projects";
import Thesis from "./components/Thesis";
import { profile } from "./data/profile";
import { useRevealAll } from "./hooks";

export default function App() {
  useRevealAll();
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <Thesis />
        <Lines />
        <History />
        <Projects />
        <PracticeLog />
        <Credentials />
        <Contact />
      </main>
      <footer>
        <div className="wrap">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>Built with React + Vite · data refreshed by GitHub Actions</span>
        </div>
      </footer>
    </>
  );
}
