import { lines } from "../data/profile";

export default function Lines() {
  return (
    <section id="lines">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">Lines of business</span>
          <h2>Three lines, at three stages.</h2>
          <p>
            One line is already in force. One is being endorsed. One is new business that's been
            written and is growing. Each comes with proof, not just keywords.
          </p>
        </div>
        <div className="lines">
          {lines.map((l, i) => (
            <article key={l.code} className="line reveal" style={{ transitionDelay: `${i * 90}ms` }}>
              <div className="line-top">
                <span className="line-code">{l.code}</span>
                <span className={`status ${l.status}`}>{l.statusLabel}</span>
              </div>
              <h3>{l.name}</h3>
              <p className="line-pitch">{l.pitch}</p>
              <ul className="proof">
                {l.proof.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <div className="chips">
                {l.tools.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
