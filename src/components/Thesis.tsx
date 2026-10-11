export default function Thesis() {
  return (
    <section className="thesis" aria-label="What makes my profile different">
      <div className="wrap">
        <div className="thesis-grid reveal">
          <div className="thesis-side">
            <span className="mono">The domain</span>
            <h3>Knows why the rule exists</h3>
            <p>
              Rating, underwriting, billing, and the full policy lifecycle. I know what breaks for an agent
              when a form edition changes.
            </p>
          </div>
          <div className="thesis-mid">
            <div className="bridge">&amp;</div>
          </div>
          <div className="thesis-side">
            <span className="mono">The build</span>
            <h3>Knows how to ship the fix</h3>
            <p>
              SQL against policy data, Python pipelines, and LLM tools that read the documents insurance runs
              on.
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
