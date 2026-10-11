import { history } from "../data/profile";

export default function History() {
  return (
    <section id="history">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">Policy history</span>
          <h2>My career, as policy transactions.</h2>
          <p>
            Every policy moves through submission, bind, issuance, and renewal. Mine has too. The newest
            transaction is still pending.
          </p>
        </div>
        <ol className="history">
          {history.map((t) => (
            <li key={t.type} className={`txn reveal${t.pending ? " pending" : ""}`}>
              <div className="txn-meta">
                <div className="txn-type">{t.type}</div>
                <div className="txn-period">{t.period}</div>
              </div>
              <div className="txn-rail">
                <span className="txn-node" />
              </div>
              <div className="txn-body">
                <div className="txn-card">
                  <div className="txn-head-mobile">
                    <span className="txn-type">{t.type}</span>
                    <span className="txn-period">{t.period}</span>
                  </div>
                  <h3>{t.role}</h3>
                  <div className="txn-org">{t.org}</div>
                  <ul>
                    {t.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
