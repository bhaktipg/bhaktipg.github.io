import { useEffect, useState } from "react";
import { profile } from "../data/profile";
import { useActiveSection, useTheme } from "../hooks";
import { Close, Download, Menu, Moon, Sun } from "./Icons";

const LINKS = [
  { id: "lines", label: "Expertise" },
  { id: "history", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "data", label: "Practice log" },
  { id: "credentials", label: "Credentials" },
  { id: "contact", label: "Contact" },
];
const IDS = LINKS.map((l) => l.id);

export default function Nav() {
  const { theme, toggle } = useTheme();
  const active = useActiveSection(IDS);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="wrap nav-inner">
        <a href="#top" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">BP</span>
          <span>{profile.shortName}</span>
        </a>
        <nav aria-label="Primary">
          <div id="nav-links" className={`nav-links${open ? " open" : ""}`}>
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={active === l.id ? "active" : undefined}
                aria-current={active === l.id ? "location" : undefined}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </div>
        </nav>
        <div className="nav-actions">
          <button
            className="icon-btn"
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </button>
          <a className="btn btn-primary btn-resume" href={profile.resume} target="_blank" rel="noreferrer">
            <Download /> Resume
          </a>
          <button
            className="icon-btn menu-btn"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="nav-links"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}
