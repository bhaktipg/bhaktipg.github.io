import { profile } from "../data/profile";
import stats from "../data/stats.json";
import { ArrowRight, Download, GitHub, LinkedIn } from "./Icons";

const sqlSolves = stats.languages.find((l) => l.label === "SQL")?.value ?? 0;
const pySolves = stats.languages.find((l) => l.label === "Python")?.value ?? 0;

function Declarations() {
  return (
    <figure className="dec" aria-label="Career summary styled as an insurance policy declarations page">
      <div className="dec-head">
        <div>
          <div className="dec-title">Declarations</div>
          <div className="dec-sub">Career Policy · Form BP-01</div>
        </div>
        <div className="dec-no">
          Policy No.
          <b>BPP-ACE-{profile.careerStart}</b>
        </div>
      </div>

      <dl className="dec-fields">
        <dt>Named insured</dt>
        <dd>{profile.name}</dd>
        <dt>Policy period</dt>
        <dd>{profile.careerStart} – Present</dd>
        <dt>Status</dt>
        <dd className="dec-status"><i className="dot" /> Open to new roles</dd>
        <dt>Territory</dt>
        <dd>
          {profile.workMode} · {profile.openRegion}
          <span className="dec-fine">Currently in {profile.location}</span>
        </dd>
        <dt>Producer</dt>
        <dd>Self-directed</dd>
      </dl>

      <table className="dec-table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Coverage</th>
            <th scope="col" style={{ textAlign: "right" }}>Limit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>A</td>
            <td>P&amp;C domain: Personal, Commercial, WC</td>
            <td>6+ yrs</td>
          </tr>
          <tr>
            <td>B</td>
            <td>Guidewire PolicyCenter · Billing · Claims</td>
            <td>ACE ×2</td>
          </tr>
          <tr>
            <td>C</td>
            <td>Data: SQL, Python, Tableau</td>
            <td>{sqlSolves} SQL</td>
          </tr>
          <tr>
            <td>D</td>
            <td>Software &amp; AI: LLMs, RAG, agents</td>
            <td>{pySolves} Py</td>
          </tr>
        </tbody>
      </table>

      <div className="dec-foot">
        <div>
          Endorsements pending:
          <br />
          <span style={{ color: "var(--ink)" }}>Data Analyst · AI Engineer</span>
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
          <span className="eyebrow">Senior Business Analyst · P&amp;C Insurance</span>
          <h1>
            Most people in insurance IT know the domain <em>or</em> build the systems. I do both.
          </h1>
          <p className="hero-lede">
            I'm a Guidewire ACE-certified Senior BA with 6+ years across Personal Lines, Commercial Lines,
            and Workers' Comp. I'm adding <strong>data analysis</strong> and{" "}
            <strong>software engineering</strong> to that domain depth, and I have LLM tools, SQL, and
            Python on GitHub to show for it.
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
          <Declarations />
        </div>
      </div>
    </section>
  );
}
