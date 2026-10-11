import { Fragment, useEffect, useState } from "react";
import { projects, rag, type Project } from "../data/profile";
import { useInView } from "../hooks";
import { ArrowUpRight, GitHub } from "./Icons";

type Step = { title: string; detail: string; store?: boolean };

const INGEST: Step[] = [
  { title: "Upload", detail: "PDF · TXT · MD" },
  { title: "Extract", detail: "PyMuPDF" },
  { title: "Chunk", detail: "2048 / 200" },
  { title: "Embed", detail: "MiniLM-L6" },
];
const STORE: Step = { title: "ChromaDB", detail: "1 collection / doc", store: true };
const QUERY: Step[] = [
  { title: "Ask", detail: "Streamlit" },
  { title: "Embed", detail: "same model" },
  { title: "Retrieve", detail: "top-k" },
  { title: "Generate", detail: "Ollama / Groq" },
  { title: "Answer", detail: "+ sources" },
];
const ORDER = [...INGEST, STORE, ...QUERY];

function usePipelineCursor(active: boolean) {
  const [lit, setLit] = useState(-1);
  useEffect(() => {
    if (!active || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setLit((i) => (i + 1) % (ORDER.length + 2)), 750);
    return () => window.clearInterval(id);
  }, [active]);
  return lit;
}

function StepBox({ step, lit }: { step: Step; lit: boolean }) {
  return (
    <div className={`pipe-step${step.store ? " store" : ""}${lit ? " lit" : ""}`}>
      {step.title}
      <small>{step.detail}</small>
    </div>
  );
}

function RagPipeline() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  const lit = usePipelineCursor(inView);

  const row = (steps: Step[], offset: number) =>
    steps.map((s, i) => (
      <Fragment key={`${offset}-${s.title}`}>
        {i > 0 && <span className="pipe-arrow" aria-hidden="true">→</span>}
        <StepBox step={s} lit={lit === offset + i} />
      </Fragment>
    ));

  return (
    <div className="pipe" ref={ref} role="img" aria-label="RAG pipeline: documents are extracted, chunked, embedded and stored in ChromaDB; questions are embedded, matched against the store, and answered by an LLM with sources.">
      <div className="pipe-row">
        <span className="pipe-label">Ingest</span>
        <div className="pipe-steps">{row(INGEST, 0)}</div>
      </div>
      <div className="pipe-store-row">
        <span />
        <div>
          <div className="pipe-vert" aria-hidden="true">↓ store</div>
          <StepBox step={STORE} lit={lit === INGEST.length} />
          <div className="pipe-vert" aria-hidden="true">↓ similarity search</div>
        </div>
      </div>
      <div className="pipe-row">
        <span className="pipe-label">Query</span>
        <div className="pipe-steps">{row(QUERY, INGEST.length + 1)}</div>
      </div>
    </div>
  );
}

function ProjectCard({ p, delay }: { p: Project; delay: number }) {
  return (
    <article className="card reveal" style={{ transitionDelay: `${delay}ms` }}>
      <span className="kind">{p.kind}</span>
      <h3>{p.name}</h3>
      <p>{p.summary}</p>
      {p.problem && (
        <div className="problem">
          <b>{p.problemLabel ?? "The problem"}</b>
          {p.problem}
        </div>
      )}
      <ul>
        {p.highlights.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
      <div className="card-foot">
        <div className="chips">
          {p.stack.map((s) => (
            <span key={s} className="chip">{s}</span>
          ))}
        </div>
        {p.repo ? (
          <div className="links">
            <a className="text-link" href={p.repo} target="_blank" rel="noreferrer">
              View on GitHub <ArrowUpRight />
            </a>
            {p.source && (
              <a className="text-link" href={p.source.url} target="_blank" rel="noreferrer">
                {p.source.label} <ArrowUpRight />
              </a>
            )}
          </div>
        ) : (
          <span className="internal">Internal tool · details on request</span>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">Projects</span>
          <h2>Things I've built, not just specified.</h2>
          <p>
            Some come from my day job, where I built the tool I needed. Some I build after hours, aimed at
            the same problem: insurance runs on documents and data that people still read by hand.
          </p>
        </div>

        <article className="feature reveal">
          <div className="feature-viz">
            <span className="caption">// architecture: how a question becomes a cited answer</span>
            <RagPipeline />
          </div>
          <div className="feature-copy">
            <span className="kind">{rag.kind} · Featured</span>
            <h3>{rag.name}</h3>
            <p>{rag.summary}</p>
            {rag.insuranceAngle && (
              <div className="angle">
                <b>Why it matters in insurance</b>
                {rag.insuranceAngle}
              </div>
            )}
            <div className="links">
              <a className="btn btn-primary" href={rag.repo} target="_blank" rel="noreferrer">
                <GitHub /> View the code
              </a>
            </div>
          </div>
          <div className="feature-copy">
            <span className="kind">What's inside</span>
            <ul>
              {rag.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <div className="chips">
              {rag.stack.map((s) => (
                <span key={s} className="chip">{s}</span>
              ))}
            </div>
          </div>
        </article>

        <div className="cards">
          {projects.map((p, i) => (
            <ProjectCard key={p.name} p={p} delay={i * 90} />
          ))}
        </div>
      </div>
    </section>
  );
}
