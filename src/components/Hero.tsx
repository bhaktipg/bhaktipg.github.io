import { useState } from "react";
import { profile } from "../data/profile";
import stats from "../data/stats.json";
import { ArrowRight, Download, GitHub, LinkedIn } from "./Icons";

const sqlSolves = stats.languages.find((l) => l.label === "SQL")?.value ?? 0;
const pySolves = stats.languages.find((l) => l.label === "Python")?.value ?? 0;

function PhotoId() {
  const [failed, setFailed] = useState(false);
  return (
    <div className="dec-photo">
      <svg className="clip" viewBox="0 0 24 56" aria-hidden="true">
        <path d="M8 40V10a4 4 0 0 1 8 0v34a6 6 0 0 1-12 0V14" />
      </svg>
      <div className="dec-photo-frame">
        {failed ? (
          <div className="dec-photo-mono" aria-hidden="true">BP</div>
        ) : (
          <img src={profile.photo} alt={`Portrait of ${profile.shortName}`} onError={() => setFailed(true)} />
        )}
      </div>
    </div>
  );
}

function ProfileCard() {
  return (
    <figure className="dec" aria-label="Profile summary">
      <div className="dec-head">
        <div>
          <div className="dec-title">Profile summary</div>
          <div className="dec-sub">At a glance</div>
        </div>
        <div className="dec-no">
          Experience
          <b>6+ years</b>
        </div>
      </div>

      <div className="dec-id">
        <PhotoId />
        <div className="dec-id-text">
          <span className="dec-label">{profile.title}</span>
          <span className="dec-name">{profile.name}</span>
          <span className="dec-status"><i className="dot" /> Open to new roles</span>
        </div>
      </div>

      <dl className="dec-fields">
        <dt>Working since</dt>
        <dd>{profile.careerStart}</dd>
        <dt>Work style</dt>
        <dd>
          {profile.workMode} · {profile.openRegion}
          <span className="dec-fine">Currently in {profile.location}</span>
        </dd>
        <dt>Education</dt>
        <dd>M.S. ECE, Georgia Tech</dd>
      </dl>

      <table className="dec-table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Skill</th>
            <th scope="col" style={{ textAlign: "right" }}>Proof</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>01</td>
            <td>Business analysis &amp; requirements</td>
            <td>6+ yrs</td>
          </tr>
          <tr>
            <td>02</td>
            <td>Product delivery: Agile, backlog, UAT</td>
            <td>Certified ×2</td>
          </tr>
          <tr>
            <td>03</td>
            <td>Data: SQL, Python, Tableau</td>
            <td>{sqlSolves} SQL</td>
          </tr>
          <tr>
            <td>04</td>
            <td>Software &amp; AI: Python, LLMs, RAG</td>
            <td>{pySolves} Py</td>
          </tr>
        </tbody>
      </table>

      <div className="dec-foot">
        <div>
          Next roles:
          <br />
          <span style={{ color: "var(--ink)" }}>Data · Product · Software</span>
        </div>
        <div className="dec-sig" aria-label="Signature">Bhakti Patel</div>
      </div>
    </figure>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="reveal">
          <span className="eyebrow">Business Analyst · Data · Product · Engineering</span>
          <h1>
            Most people understand the business <em>or</em> build the product. I do both.
          </h1>
          <p className="hero-lede">
            I'm a Senior Business Analyst with 6+ years of turning messy business problems into software
            that ships. Now I'm growing into <strong>data analysis</strong>, <strong>product management</strong>,
            and <strong>software engineering</strong>, with SQL, Python, and AI projects on GitHub to show for
            it.
          </p>
          <div className="hero-ctas">
            <a className="btn btn-primary" href="#projects">
              See what I've built <ArrowRight />
            </a>
            <a className="btn btn-ghost" href={profile.resume} target="_blank" rel="noreferrer">
              <Download /> Resume
            </a>
            <a className="btn btn-ghost btn-icon" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
              <LinkedIn />
            </a>
            <a className="btn btn-ghost btn-icon" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
              <GitHub />
            </a>
          </div>
          <div className="hero-meta">
            <span><i className="dot" /> Open to conversations</span>
            <span>{profile.workMode}</span>
            <span>Georgia Tech M.S. ECE</span>
          </div>
        </div>
        <div className="reveal" style={{ transitionDelay: "120ms" }}>
          <ProfileCard />
        </div>
      </div>
    </section>
  );
}
