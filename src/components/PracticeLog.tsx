import { useState, type ReactNode } from "react";
import stats from "../data/stats.json";
import { useInView } from "../hooks";
import { ArrowUpRight, Pipeline } from "./Icons";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const monthLabel = (ym: string, withYear = false) => {
  const [y, m] = ym.split("-");
  return `${MONTHS[Number(m) - 1]}${withYear ? ` ${y}` : ""}`;
};
const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

function niceMax(v: number) {
  const step = v <= 20 ? 5 : v <= 50 ? 10 : v <= 100 ? 20 : 50;
  return { max: Math.ceil(v / step) * step, step };
}

/** Vertical bars, one series: commits per month. */
function CommitsChart() {
  const data = stats.commitsByMonth;
  const [hover, setHover] = useState<number | null>(null);
  const W = 560, H = 220, padL = 30, padB = 26, padT = 12;
  const { max, step } = niceMax(Math.max(...data.map((d) => d.value)));
  const plotW = W - padL, plotH = H - padB - padT;
  const slot = plotW / data.length;
  const barW = Math.min(44, slot - 2 * Math.max(2, slot * 0.18));
  const y = (v: number) => padT + plotH - (v / max) * plotH;
  const ticks = Array.from({ length: max / step + 1 }, (_, i) => i * step);
  const peak = data.reduce((a, b) => (b.value > a.value ? b : a));

  // 4px rounded top, square at baseline
  const barPath = (x: number, top: number, w: number) => {
    const h = padT + plotH - top;
    const r = Math.min(4, h, w / 2);
    return `M${x},${padT + plotH} V${top + r} Q${x},${top} ${x + r},${top} H${x + w - r} Q${x + w},${top} ${x + w},${top + r} V${padT + plotH} Z`;
  };

  const h = hover !== null ? data[hover] : null;

  return (
    <div className="colchart">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Commits per month, ${data.map((d) => `${monthLabel(d.month, true)}: ${d.value}`).join(", ")}`}>
        <g className="grid">
          {ticks.map((t) => (
            <line key={t} x1={padL} x2={W} y1={y(t)} y2={y(t)} />
          ))}
        </g>
        <g className="axis">
          {ticks.map((t) => (
            <text key={t} x={padL - 8} y={y(t) + 4} textAnchor="end">{t}</text>
          ))}
          {data.map((d, i) => (
            <text key={d.month} x={padL + slot * i + slot / 2} y={H - 6} textAnchor="middle">
              {monthLabel(d.month)}
            </text>
          ))}
        </g>
        <g className={`bars${hover !== null ? " hovering" : ""}`}>
          {data.map((d, i) => {
            const x = padL + slot * i + (slot - barW) / 2;
            return (
              <g key={d.month}>
                <path className={`bar${hover === i ? " on" : ""}`} d={barPath(x, y(d.value), barW)} />
                {(d === peak || hover === i) && (
                  <text className="val" x={x + barW / 2} y={y(d.value) - 6} textAnchor="middle">{d.value}</text>
                )}
                {/* hit target: full slot height, larger than the mark */}
                <rect
                  x={padL + slot * i} y={padT} width={slot} height={plotH}
                  fill="transparent"
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(i)}
                  onBlur={() => setHover(null)}
                  tabIndex={0}
                  aria-label={`${monthLabel(d.month, true)}: ${d.value} commits`}
                />
              </g>
            );
          })}
        </g>
      </svg>
      {h && hover !== null && (
        <div
          className="tooltip"
          style={{
            left: `${((padL + slot * hover + slot / 2) / W) * 100}%`,
            top: `${(y(h.value) / H) * 100}%`,
          }}
        >
          <b>{monthLabel(h.month, true)}</b> · {h.value} commits
        </div>
      )}
      <details className="table-view">
        <summary>View as table</summary>
        <table>
          <thead><tr><th>Month</th><th>Commits</th></tr></thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.month}><td>{monthLabel(d.month, true)}</td><td>{d.value}</td></tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  );
}

/** Horizontal bar list with values as text, grown in on first view. */
function HBars({ data, showPct = false, total }: { data: { label: string; value: number }[]; showPct?: boolean; total?: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  const max = Math.max(...data.map((d) => d.value));
  const sum = total ?? data.reduce((a, d) => a + d.value, 0);
  return (
    <div className="hbars" ref={ref}>
      {data.map((d) => (
        <div className="hbar" key={d.label} title={`${d.label}: ${d.value}`}>
          <span className="hbar-label">{d.label}</span>
          <span className="hbar-track">
            <span
              className="hbar-fill"
              style={{ display: "block", width: `${(d.value / max) * 100}%`, transform: `scaleX(${inView ? 1 : 0})` }}
            />
          </span>
          <span className="hbar-value">
            {showPct ? <>{Math.round((d.value / sum) * 100)}<span className="hbar-pct">%</span></> : d.value}
          </span>
        </div>
      ))}
    </div>
  );
}

function Insight({ children }: { children: ReactNode }) {
  return (
    <div className="insight">
      <div><b>Takeaway</b>{children}</div>
    </div>
  );
}

const pct = (n: number, d: number) => Math.round((n / d) * 100);

export default function PracticeLog() {
  const months = stats.commitsByMonth;
  const peak = months.reduce((a, b) => (b.value > a.value ? b : a));
  // Steady-state pace excludes the partial first month and the peak sprint.
  const steady = months.filter((m, i) => i > 0 && m !== peak);
  const steadyAvg = steady.length ? Math.round(steady.reduce((a, m) => a + m.value, 0) / steady.length) : peak.value;
  const [topLang, secondLang] = stats.languages;
  const sqlTotal = stats.languages.find((l) => l.label === "SQL")?.value ?? 1;
  const joinsish = stats.sqlConcepts.find((c) => c.label === "GROUP BY")?.value ?? 0;
  const topPattern = stats.pythonPatterns[0];

  const spanDays = Math.max(
    1,
    Math.round((new Date(stats.lastCommit).getTime() - new Date(stats.firstCommit).getTime()) / 86_400_000) + 1
  );
  const sqlCount = stats.languages.find((l) => l.label === "SQL")?.value ?? 0;

  return (
    <section id="data">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">Practice log · live data</span>
          <h2>I analyzed my own learning.</h2>
          <p>
            Wanting to be a data analyst means little without the work behind it. Every SQL and Python
            problem I solve is committed to GitHub, and this section is built from that repo's data
            every time the site deploys.
          </p>
        </div>

        <div className="tiles reveal">
          <div className="tile">
            <div className="tile-label">Problems solved</div>
            <div className="tile-value">{stats.solutions}</div>
            <div className="tile-note">since {fmtDate(stats.firstCommit)}</div>
          </div>
          <div className="tile">
            <div className="tile-label">Commits</div>
            <div className="tile-value">{stats.commits}</div>
            <div className="tile-note">one solution, one commit</div>
          </div>
          <div className="tile">
            <div className="tile-label">Active days</div>
            <div className="tile-value">{stats.activeDays}</div>
            <div className="tile-note">{Math.round((stats.activeDays / spanDays) * 100)}% of days since starting</div>
          </div>
          <div className="tile">
            <div className="tile-label">SQL queries</div>
            <div className="tile-value">{sqlCount}</div>
            <div className="tile-note">joins, aggregates, subqueries</div>
          </div>
        </div>

        <div className="panels">
          <div className="panel reveal">
            <h3>Commits per month</h3>
            <p className="sub">Hover or tab through the bars for values.</p>
            <CommitsChart />
            <Insight>
              {monthLabel(peak.month, true)} was the ramp-up sprint at {peak.value} commits. Since then I've held
              a steady ~{steadyAvg} commits a month.
            </Insight>
          </div>
          <div className="panel reveal">
            <h3>Solutions by language</h3>
            <p className="sub">Share of {stats.solutions} solutions, classified from file contents.</p>
            <HBars data={stats.languages} showPct total={stats.solutions} />
            {topLang && secondLang && (
              <Insight>
                {topLang.label} builds the engineering fundamentals ({pct(topLang.value, stats.solutions)}%).{" "}
                {secondLang.label} is the analyst track: about one in {Math.round(stats.solutions / secondLang.value)}{" "}
                problems.
              </Insight>
            )}
          </div>
          <div className="panel reveal">
            <h3>SQL concepts in use</h3>
            <p className="sub">Number of SQL solutions that use each construct.</p>
            <HBars data={stats.sqlConcepts} />
            <Insight>
              {pct(joinsish, sqlTotal)}% of my SQL solutions aggregate with GROUP BY, the bread and butter of
              loss-ratio and premium reporting.
            </Insight>
          </div>
          <div className="panel reveal">
            <h3>Python patterns in use</h3>
            <p className="sub">Number of Python solutions that use each technique.</p>
            <HBars data={stats.pythonPatterns} />
            {topPattern && (
              <Insight>
                {topPattern.label} are the tool I reach for most ({topPattern.value} solutions). It's the same
                lookup-and-count thinking that matching policies to claims needs.
              </Insight>
            )}
          </div>
        </div>

        <div className="data-note reveal">
          <Pipeline />
          <p>
            Pulled automatically from GitHub · Last refreshed {fmtDate(stats.generatedAt)}
            <span className="data-note-links">
              <a className="text-link" href={stats.repoUrl} target="_blank" rel="noreferrer">
                Browse the solutions <ArrowUpRight />
              </a>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
