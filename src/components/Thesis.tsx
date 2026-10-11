export default function Thesis() {
  return (
    <section className="thesis" aria-label="What makes my profile different">
      <div className="wrap">
        <div className="thesis-grid reveal">
          <div className="thesis-side">
            <span className="mono">The business</span>
            <h3>Knows why it matters</h3>
            <p>
              Stakeholders, processes, and the rules behind them. I know what breaks for users when a
              requirement changes, and how to get teams aligned on the fix.
            </p>
          </div>
          <div className="thesis-mid">
            <div className="bridge">&amp;</div>
          </div>
          <div className="thesis-side">
            <span className="mono">The build</span>
            <h3>Knows how to ship the fix</h3>
            <p>
              SQL against real data, Python pipelines, and AI tools that turn long documents into
              answers.
            </p>
          </div>
        </div>
        <p className="thesis-quote reveal">
          "Writing requirements was never where I wanted to stop. I wanted to understand the technology
          under them, <span>and build it myself.</span>"
        </p>
      </div>
    </section>
  );
}
