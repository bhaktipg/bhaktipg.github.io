// Builds src/data/stats.json from the public LeetCode practice repo.
// Runs in CI before every build (and weekly on a schedule) so the
// "Practice log" section on the site stays current without hand edits.
// Set GITHUB_TOKEN to avoid the unauthenticated API rate limit.
import { writeFile, readFile } from "node:fs/promises";

const OWNER = "bhaktipg";
const REPO = "leetcodesolution";
const OUT = new URL("../src/data/stats.json", import.meta.url);

const headers = { Accept: "application/vnd.github+json", "User-Agent": "bhaktipg-site" };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

async function api(path) {
  const res = await fetch(`https://api.github.com${path}`, { headers });
  if (!res.ok) throw new Error(`${res.status} ${path}`);
  return res.json();
}

function classify(src) {
  const s = src.toLowerCase();
  if (s.includes("@param") || /\bvar\s+\w+\s*=\s*function/.test(s)) return "JavaScript";
  if (s.includes("import pandas") || s.includes("pd.dataframe")) return "Pandas";
  if (s.includes("mysql") || s.includes("postgres") ||
      (/\bselect\b/.test(s) && /\bfrom\b/.test(s) && !src.includes("def "))) return "SQL";
  if (src.includes("def ") || src.includes("class ")) return "Python";
  return "Other";
}

const SQL_CONCEPTS = [
  ["GROUP BY", /group\s+by/],
  ["Aggregates", /\b(sum|avg|count|min|max)\s*\(/],
  ["JOINs", /\bjoin\b/],
  ["Subqueries", /\(\s*select\b/],
  ["Date functions", /\b(date_format|datediff|date_sub|date_add|curdate|interval|year\s*\(|month\s*\()/],
  ["HAVING", /\bhaving\b/],
  ["CASE WHEN", /case\s+when/],
  ["UNION", /\bunion\b/],
  ["Window functions", /\bover\s*\(/],
  ["CTEs", /\bwith\s+\w+\s+as\s*\(/],
];

const PY_PATTERNS = [
  ["Hash maps", /Counter|dict\(|\{\}|defaultdict/],
  ["Two pointers", /\bleft\b.*\bright\b/s],
  ["Sorting", /sort/],
  ["Sets", /set\(/],
  ["Binary trees", /TreeNode/],
  ["BFS / queues", /deque/],
  ["Linked lists", /ListNode/],
];

async function main() {
  const repo = await api(`/repos/${OWNER}/${REPO}`);
  const tree = await api(`/repos/${OWNER}/${REPO}/git/trees/${repo.default_branch}?recursive=1`);
  const files = tree.tree.filter((t) => t.type === "blob" && !t.path.startsWith("."));

  const sources = await Promise.all(
    files.map(async (f) => {
      const url = `https://raw.githubusercontent.com/${OWNER}/${REPO}/${repo.default_branch}/${f.path
        .split("/").map(encodeURIComponent).join("/")}`;
      const res = await fetch(url);
      return res.ok ? res.text() : "";
    })
  );

  const languages = {};
  const sql = Object.fromEntries(SQL_CONCEPTS.map(([k]) => [k, 0]));
  const py = Object.fromEntries(PY_PATTERNS.map(([k]) => [k, 0]));
  for (const src of sources) {
    const lang = classify(src);
    languages[lang] = (languages[lang] ?? 0) + 1;
    if (lang === "SQL") for (const [k, re] of SQL_CONCEPTS) if (re.test(src.toLowerCase())) sql[k]++;
    if (lang === "Python") for (const [k, re] of PY_PATTERNS) if (re.test(src)) py[k]++;
  }

  const dates = [];
  for (let page = 1; ; page++) {
    const batch = await api(`/repos/${OWNER}/${REPO}/commits?per_page=100&page=${page}`);
    dates.push(...batch.map((c) => c.commit.author.date));
    if (batch.length < 100) break;
  }
  dates.sort();
  const byMonth = {};
  for (const d of dates) byMonth[d.slice(0, 7)] = (byMonth[d.slice(0, 7)] ?? 0) + 1;

  const sortDesc = (o) => Object.entries(o).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1])
    .map(([label, value]) => ({ label, value }));

  const stats = {
    generatedAt: new Date().toISOString(),
    repoUrl: repo.html_url,
    solutions: files.length,
    commits: dates.length,
    activeDays: new Set(dates.map((d) => d.slice(0, 10))).size,
    firstCommit: dates[0],
    lastCommit: dates[dates.length - 1],
    languages: sortDesc(languages),
    commitsByMonth: Object.entries(byMonth).map(([month, value]) => ({ month, value })),
    sqlConcepts: sortDesc(sql),
    pythonPatterns: sortDesc(py),
  };
  await writeFile(OUT, JSON.stringify(stats, null, 2) + "\n");
  console.log(`stats.json: ${stats.solutions} solutions, ${stats.commits} commits`);
}

main().catch(async (err) => {
  // Keep the last committed snapshot so a flaky API never breaks the deploy.
  try {
    await readFile(OUT);
    console.warn(`fetch-stats failed (${err.message}); keeping existing stats.json`);
  } catch {
    console.error(err);
    process.exit(1);
  }
});
