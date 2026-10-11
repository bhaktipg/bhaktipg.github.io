import { credentials, toolbox } from "../data/profile";

export default function Credentials() {
  return (
    <section id="credentials">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">Credentials &amp; toolbox</span>
          <h2>Certified in the platform. Trained as an engineer.</h2>
        </div>
        <div className="creds">
          {credentials.map((c, i) => (
            <div
              key={c.detail}
              className={`cred reveal${c.kind === "Certification" ? " cert" : ""}`}
              data-mark={c.label.startsWith("IBM") ? "IBM" : "ACE"}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <span className="cred-kind">{c.kind}</span>
              <h3>{c.label}</h3>
              <p>{c.detail}</p>
            </div>
          ))}
        </div>
        <div className="toolbox reveal">
          {toolbox.map((g) => (
            <div key={g.group}>
              <h4>{g.group}</h4>
              <div className="chips">
                {g.items.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
