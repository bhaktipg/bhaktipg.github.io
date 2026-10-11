import { useState } from "react";
import { openTo, profile } from "../data/profile";
import { GitHub, LinkedIn } from "./Icons";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="wrap contact-grid">
        <div className="reveal">
          <span className="eyebrow">Get a quote</span>
          <h2 style={{ marginTop: 18 }}>
            Need someone who speaks <em>underwriting</em> and <em>Python</em>?
          </h2>
          <p className="contact-lede">
            I'm happy to talk about roles, insurtech ideas, or the hard parts of a Guidewire program. Email
            gets the fastest reply.
          </p>
          <div className="contact-links">
            <div className="contact-link">
              <a href={`mailto:${profile.email}`} style={{ textDecoration: "none", minWidth: 0 }}>
                <div className="k">Email</div>
                <div className="v">{profile.email}</div>
              </a>
              <button className="copy-btn" onClick={copyEmail} aria-live="polite">
                {copied ? "Copied ✓" : "Copy"}
              </button>
            </div>
            <div className="contact-buttons">
              <a className="btn btn-ghost" href={profile.linkedin} target="_blank" rel="noreferrer">
                <LinkedIn /> LinkedIn
              </a>
              <a className="btn btn-ghost" href={profile.github} target="_blank" rel="noreferrer">
                <GitHub /> GitHub
              </a>
            </div>
          </div>
        </div>
        <aside className="open-to reveal" style={{ transitionDelay: "100ms" }}>
          <h3>Coverage requested · open to</h3>
          <ul>
            {openTo.map((o, i) => (
              <li key={o}>
                <span>0{i + 1}</span>
                {o}
              </li>
            ))}
          </ul>
          <a className="btn btn-primary" style={{ marginTop: 18 }} href={profile.resume} target="_blank" rel="noreferrer">
            Download resume (PDF)
          </a>
        </aside>
      </div>
    </section>
  );
}
