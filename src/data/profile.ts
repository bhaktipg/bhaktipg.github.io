// All site copy lives here. Edit this file to update the site; components only render it.

export const profile = {
  name: "Bhakti Purshottam Patel",
  shortName: "Bhakti Patel",
  title: "Senior IT Business Analyst",
  location: "Columbus, OH",
  workMode: "Hybrid · Remote",
  openRegion: "West Coast",
  email: "patbhaktip95@gmail.com",
  linkedin: "https://www.linkedin.com/in/pbp04",
  github: "https://github.com/bhaktipg",
  resume: "/Bhakti_Patel_Resume.pdf",
  careerStart: 2019,
};

export type LineStatus = "in-force" | "endorsing" | "new-business";

export const lines: {
  code: string;
  name: string;
  status: LineStatus;
  statusLabel: string;
  pitch: string;
  proof: string[];
  tools: string[];
}[] = [
  {
    code: "LOB-01",
    name: "Insurance & Business Analysis",
    status: "in-force",
    statusLabel: "In force · 6+ yrs",
    pitch:
      "I own requirements end to end, from the first stakeholder conversation to UAT sign-off, for Personal Lines, Commercial Lines, and Workers' Comp.",
    proof: [
      "Dual Guidewire ACE: PolicyCenter + BillingCenter",
      "Functional SME across PolicyCenter, BillingCenter & ClaimCenter at Encova",
      "Full policy lifecycle: submission → issuance → change → cancellation → rewrite",
      "Set the BA function's standards; onboarding SME for new PolicyCenter analysts",
    ],
    tools: ["BRD", "FSD", "RTM", "User stories", "UAT", "GAP analysis", "AS-IS / TO-BE", "Rally", "JIRA", "HP ALM"],
  },
  {
    code: "LOB-02",
    name: "Data Analysis",
    status: "endorsing",
    statusLabel: "Endorsement in progress",
    pitch:
      "Most of my BA work comes down to data: mapping legacy policy structures to Guidewire, deciding what gets migrated, and tracing production issues through the logs.",
    proof: [
      "Owned source-to-target mapping for PolicyCenter data entities",
      "Set the migration strategy: historical vs. active data, look-back windows, scope",
      "Built MySQL + Tableau KPI reporting at View, Inc.",
      "SQL practice logged publicly, with live stats in the practice log below",
    ],
    tools: ["SQL", "MS SQL Server", "Oracle", "MySQL", "Pandas", "Tableau", "Splunk", "Excel"],
  },
  {
    code: "LOB-03",
    name: "Software & AI Engineering",
    status: "new-business",
    statusLabel: "New business · bound",
    pitch:
      "I want to build the systems I used to write requirements for. I started with LLM tooling that solves the document-heavy problems insurance has everywhere.",
    proof: [
      "Built a Copilot AI agent for Commercial Lines & WC policy-form comparison",
      "Built a modular RAG document Q&A system with tests and an eval harness",
      "Daily Python algorithm practice: trees, hash maps, two pointers, BFS",
      "Deep-learning defect detection pipelines at View, Inc. (Python, MATLAB)",
    ],
    tools: ["Python", "LLMs", "RAG", "ChromaDB", "Streamlit", "Flask", "Docker", "pytest", "Git"],
  },
];

export type Transaction = {
  type: string;
  period: string;
  role: string;
  org: string;
  note?: string;
  points: string[];
  pending?: boolean;
};

export const history: Transaction[] = [
  {
    type: "Endorsement",
    period: "Pending · 2026 →",
    role: "Adding coverage: Data Analyst + AI Engineer",
    org: "Self-directed",
    pending: true,
    points: [
      "Daily SQL & Python practice, logged publicly on GitHub",
      "Building RAG and LLM agent projects aimed at P&C insurance problems",
      "Looking for roles where domain depth and hands-on building both matter",
    ],
  },
  {
    type: "Renewal",
    period: "May 2025 – Present",
    role: "IT Business Analyst III (Senior BA)",
    org: "Encova Insurance · Columbus, OH",
    points: [
      "Functional SME across PolicyCenter, BillingCenter & ClaimCenter, owning requirements from submission through cancellation and rewrite",
      "SME on the Guidewire Cloud (GWCP) transformation: validated policy & billing workflows end to end and flagged configuration gaps",
      "Built a Copilot AI agent that compares Commercial Lines & Workers' Comp policy forms, so gaps surface faster and compliance reviews are more accurate",
      "Led WC & Commercial Lines data-migration decisions: historical vs. active data, look-back windows, in- vs. out-of-scope elements",
      "Set BA function standards; coached junior BAs on FSD/BRD authoring and RTM practice",
    ],
  },
  {
    type: "Policy change",
    period: "Jul 2023 – Apr 2025",
    role: "IT Business Analyst II",
    org: "Encova Insurance",
    points: [
      "Owned source-to-target mapping that converted legacy policy structures into Guidewire configurations",
      "Ran AS-IS / TO-BE GAP analysis across Rating, Product, Underwriting & Policy Servicing, with an end-to-end RTM",
      "Drove UAT to formal business sign-off; defined data retention, archival & compliance rules",
      "Handled production support through Splunk & ServiceNow log analysis, and wrote the RCAs",
    ],
  },
  {
    type: "Issuance",
    period: "Aug 2022 – Jun 2023",
    role: "IT Business Analyst",
    org: "Encova Insurance",
    points: [
      "Moved into a Guidewire BA role: wrote requirements and supported Personal Lines configuration & UAT",
      "Built depth in the P&C domain and in PolicyCenter",
    ],
  },
  {
    type: "Bind",
    period: "Oct 2020 – Jul 2022",
    role: "Requirements Analyst",
    org: "AMG Technology · client: Nationwide Insurance",
    points: [
      "Elicited requirements and got BRD/FSD sign-off on a P&C core-system modernization (Homeowners, Auto, Umbrella)",
      "Owned the requirements migration from IBM RRC to Jira R4J, with full validation for traceability",
      "Wrote Python data-transformation scripts and complex Oracle SQL",
      "Ran defect triage across JIRA & HP ALM; did root-cause analysis with Splunk & ServiceNow",
    ],
  },
  {
    type: "Quote",
    period: "Jul 2019 – Sep 2020",
    role: "Process Engineer → Data Analyst",
    org: "View, Inc. · Codersdata",
    points: [
      "Built deep-learning glass-defect detection pipelines (Python, MATLAB, Bash) and tuned thresholds to catch more defects",
      "Built MySQL + Tableau reporting infrastructure that delivered weekly KPI insights",
      "Delivered automated reporting, SQL analytics, and Excel solutions for clients across industries",
    ],
  },
  {
    type: "Submission",
    period: "2013 – 2019",
    role: "M.S. & B.Tech, Electrical / Electronics Engineering",
    org: "Georgia Tech · VJTI Mumbai",
    points: [
      "M.S. Electrical & Computer Engineering, Georgia Institute of Technology (2019)",
      "B.Tech Electronics & Telecommunication, VJTI Mumbai (2017)",
    ],
  },
];

export type Project = {
  name: string;
  kind: string;
  summary: string;
  problem?: string;
  problemLabel?: string;
  source?: { label: string; url: string };
  highlights: string[];
  stack: string[];
  repo?: string;
  insuranceAngle?: string;
};

export const rag: Project = {
  name: "RAG Document Q&A",
  kind: "Personal project · LLM engineering",
  summary:
    "A retrieval-augmented chatbot: upload PDFs, text, or Markdown and ask questions in plain English. Answers come back with the sources they were drawn from. I built it as modular Python on purpose, so no framework is hiding the hard parts.",
  highlights: [
    "Ingestion pipeline: PyMuPDF page-level extraction, header/footer stripping, corrupt-file detection",
    "Recursive chunking (2,048 chars, 200 overlap) so context carries across chunk boundaries",
    "Local all-MiniLM-L6-v2 embeddings, loaded once through a thread-safe singleton",
    "Persistent ChromaDB store with one collection per document and cross-collection top-k search",
    "Swappable LLM backend: local Ollama (free, offline) or Groq API, picked by one env variable",
    "pytest suite plus a RAGAS-based evaluation harness; Dockerized",
  ],
  stack: ["Python", "LangChain", "ChromaDB", "sentence-transformers", "Ollama", "Groq", "Streamlit", "pytest", "RAGAS", "Docker"],
  repo: "https://github.com/bhaktipg/rag-document-qna",
  insuranceAngle:
    "Policy forms, endorsements, and underwriting guidelines are long, dense, and versioned, which is exactly the kind of document RAG handles well. This is the prototype for that.",
};

export const projects: Project[] = [
  {
    name: "Policy Form Comparison Agent",
    kind: "At work · Encova Insurance",
    summary:
      "A Copilot AI agent that compares Commercial Lines and Workers' Compensation policy forms automatically and surfaces differences that reviewers used to hunt for by hand.",
    problem:
      "Form-by-form comparison was slow, manual, and easy to get wrong, and a missed gap becomes a compliance or underwriting risk.",
    highlights: [
      "Cut the time to surface product gaps",
      "Made compliance & underwriting reviews more accurate",
      "Grew out of my own BA work: I built the tool I needed",
    ],
    stack: ["Microsoft Copilot", "AI agents", "Prompt design", "Commercial Lines", "Workers' Comp"],
  },
  {
    name: "Emotion Detector",
    kind: "IBM certification · completed",
    summary:
      "The final project for IBM's \"Developing AI Applications with Python and Flask\" course. It's a Flask web app that sends text to a Watson NLP emotion model and returns scores for anger, disgust, fear, joy, and sadness, plus the dominant emotion.",
    problem:
      "I forked the starter repo from IBM Developer Skills Network, then built the emotion-detection module, Flask server, error handling, and tests to complete the certification.",
    problemLabel: "Forked IBM exercise",
    highlights: [
      "Packaged as an importable Python module with unit tests",
      "Handles blank or invalid input gracefully (HTTP 400 → null scores)",
      "Lint-clean server code; JS front end calls the Flask API",
    ],
    stack: ["Python", "Flask", "IBM Watson NLP", "REST", "unittest"],
    repo: "https://github.com/bhaktipg/Emotion-detector-web-application-using-Python-Flask",
    source: {
      label: "Original IBM exercise",
      url: "https://github.com/ibm-developer-skills-network/oaqjp-final-project-emb-ai",
    },
  },
  {
    name: "LeetCode Practice Log",
    kind: "Ongoing · SQL + Python",
    summary:
      "Every solution I write is committed publicly: Python algorithms and SQL analytics, the two skills I'm deliberately building. This site analyzes the repo every time it builds.",
    highlights: [
      "SQL: aggregates, GROUP BY, JOINs, subqueries, HAVING, CASE, UNION",
      "Python: hash maps, two pointers, trees, BFS, sorting",
      "Live stats in the practice log section below",
    ],
    stack: ["SQL", "Python", "Pandas", "Data structures"],
    repo: "https://github.com/bhaktipg/leetcodesolution",
  },
];

export const credentials = [
  { label: "Guidewire ACE", detail: "PolicyCenter Business Analyst", kind: "Certification" },
  { label: "Guidewire ACE", detail: "BillingCenter Business Analyst", kind: "Certification" },
  { label: "IBM: AI Applications with Python & Flask", detail: "Course certificate · Emotion Detector project", kind: "Certification" },
  { label: "M.S. Electrical & Computer Engineering", detail: "Georgia Institute of Technology · 2019", kind: "Education" },
  { label: "B.Tech Electronics & Telecommunication", detail: "VJTI, Mumbai · 2017", kind: "Education" },
];

export const toolbox: { group: string; items: string[] }[] = [
  { group: "Guidewire", items: ["PolicyCenter v7 / 8 / 10 / Cloud", "BillingCenter", "ClaimCenter", "Agent Portal"] },
  { group: "Data", items: ["SQL", "MS SQL Server", "Oracle", "MySQL", "MongoDB", "Tableau", "Splunk", "Excel"] },
  { group: "Engineering & AI", items: ["Python", "LLMs / RAG", "ChromaDB", "Streamlit", "Flask", "Docker", "pytest"] },
  { group: "Delivery", items: ["Agile / Scrum", "Rally", "JIRA", "HP ALM", "ServiceNow", "Trello"] },
];

export const openTo = [
  "Senior / Technical BA (Guidewire)",
  "Data Analyst: insurance & financial data",
  "Insurtech product roles",
  "AI / ML engineering with a domain focus",
];
