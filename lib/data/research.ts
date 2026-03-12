export interface Source {
  id: string;
  title: string;
  url: string;
  author: string;
  date: string;
  type: string;
  relevance: number;
}

export interface FindingPoint {
  text: string;
  sources: string[];
}

export interface Finding {
  title: string;
  defaultOpen?: boolean;
  points: FindingPoint[];
}

export interface Section {
  id: string;
  title: string;
  subtitle: string;
  findings: Finding[];
}

export interface SummaryCard {
  label: string;
  text: string;
  color: string;
  sources: string[];
}

export interface Stat {
  label: string;
  value: string;
  context: string;
  color: string;
}

export interface AuditMetric {
  label: string;
  score: number;
  note: string;
}

export interface SingleSourceClaim {
  text: string;
  source: string;
  risk: "Low" | "Medium";
}

export interface CoverageItem {
  question: string;
  sources: number;
  rating: "Strong" | "Adequate";
}

export const stats: Stat[] = [
  { label: "Youth Unemployment", value: "18.9%", context: "Jan 2026 (15-24)", color: "text-red-400" },
  { label: "EU Average", value: "15.1%", context: "Nov 2025 (15-24)", color: "text-yellow-400" },
  { label: "NEET Rate", value: "~15%", context: "2024 (15-29)", color: "text-orange-400" },
  { label: "Emigrated 2024", value: "156K", context: "+36.5% vs 2023", color: "text-red-400" },
  { label: "Brain Drain Cost", value: "\u20AC134B", context: "2011-2023", color: "text-red-400" },
  { label: "Working-Age Decline", value: "-34%", context: "By 2060", color: "text-purple-400" },
];

export const summary: SummaryCard[] = [
  {
    label: "Youth Unemployment",
    text: "Down from 42.7% peak (2014) to 18.9% (Jan 2026), but still 4-6pp above EU average. Youth participation has collapsed from 38% to 25% since 2000.",
    color: "red",
    sources: ["src-001", "src-002", "src-007"],
  },
  {
    label: "Brain Drain Accelerating",
    text: "156,000 left in 2024 (+36.5%). Graduates now 58% of emigrants vs 18% two decades ago. Cost: \u20AC134B over 13 years. Only 53K returned.",
    color: "orange",
    sources: ["src-004", "src-005", "src-006"],
  },
  {
    label: "Precarious Work Trap",
    text: "38.2% of under-30s on temporary contracts. 79.8% of new contracts for under-30s are precarious. Real wages fell since 2000. No minimum wage.",
    color: "yellow",
    sources: ["src-007", "src-008", "src-026"],
  },
  {
    label: "North-South Chasm",
    text: "South unemployment 12% vs North 4%. 175K youth left the South despite an employment boom. PNRR gains may reverse after 2027.",
    color: "blue",
    sources: ["src-010", "src-025"],
  },
  {
    label: "Emerging Sectors",
    text: "Startup ecosystem worth \u20AC60B, 300K+ jobs. Key sectors: fintech, climate tech, aerospace, AI, agritech. Milan-centric. Tech salaries \u20AC40-70K+.",
    color: "emerald",
    sources: ["src-011", "src-012", "src-013"],
  },
  {
    label: "Demographic Cliff",
    text: "Working-age population will shrink 34% by 2060. GDP could contract 9% by 2050. The 65+ cohort is the fastest-growing workforce segment.",
    color: "purple",
    sources: ["src-014", "src-015", "src-016"],
  },
];

export const sections: Section[] = [
  {
    id: "unemployment",
    title: "1. Youth Unemployment",
    subtitle: "Improving but still significantly above EU average",
    findings: [
      {
        title: "Current Rates & Trajectory",
        defaultOpen: true,
        points: [
          { text: "Youth unemployment (15-24) fell to 18.9% in January 2026, down from 42.7% peak in 2014", sources: ["src-001", "src-007"] },
          { text: "Rate has been volatile: 20.5% in Dec 2025, 19.1% Nov, 18.9% Jan 2026", sources: ["src-001"] },
          { text: "Still 4-6pp above EU average (15.1%) and euro area (14.6%)", sources: ["src-002"] },
          { text: "Overall unemployment hit 5.1% in Jan 2026 \u2014 22-year low, now below EU average (5.8%)", sources: ["src-028"] },
        ],
      },
      {
        title: "NEET Crisis",
        points: [
          { text: "14-15.2% of 15-29 year olds are NEETs vs EU average of 11%", sources: ["src-021"] },
          { text: "Italy saw 11pp decrease 2014-2024 \u2014 one of largest EU drops", sources: ["src-021"] },
          { text: "Sicily: 28% NEET rate. Trentino-South Tyrol: just 9%", sources: ["src-021"] },
        ],
      },
      {
        title: "Declining Participation",
        points: [
          { text: "Youth labor force participation collapsed: 38.1% (2000) to 24.7% (2024)", sources: ["src-007"] },
          { text: "The paradox: Italy\u2019s overall rate is below EU average while youth rate is 4-6pp above it", sources: ["src-028", "src-001"] },
        ],
      },
    ],
  },
  {
    id: "precarious",
    title: "2. Precarious Work",
    subtitle: "Temporary contracts as the default entry point for youth",
    findings: [
      {
        title: "Scale of Temporary Employment",
        defaultOpen: true,
        points: [
          { text: "38.2% of workers aged 15-29 are on temporary contracts", sources: ["src-008"] },
          { text: "25-34 age group: 23.9% temporary vs EU average 16.7%, Germany 15.3%", sources: ["src-007"] },
          { text: "79.8% of new contract activations for under-30s in 2023 were precarious", sources: ["src-026"] },
          { text: "Only 5% of workers 55-64 on fixed-term \u2014 this is a youth-specific problem", sources: ["src-008"] },
        ],
      },
      {
        title: "Wage Stagnation",
        points: [
          { text: "Italy is the only EU country where wages are lower than in the 1990s (-3%)", sources: ["src-027"] },
          { text: "Fixed-term workers earn \u20AC9,038/yr vs \u20AC20,431 for permanent contracts", sources: ["src-026"] },
          { text: "Average annual pay for young workers (15-24): just \u20AC9,546", sources: ["src-026"] },
          { text: "No national minimum wage system in Italy", sources: ["src-023"] },
          { text: "Productivity flat at $52-55/hr since 2000. France: $65+, Germany: $69", sources: ["src-007"] },
        ],
      },
      {
        title: "Life Consequences",
        points: [
          { text: "Average age leaving family home: 30 years \u2014 among highest in EU", sources: ["src-004"] },
          { text: "Temporary employment directly linked to higher poverty rates among young workers", sources: ["src-009"] },
          { text: "Most young workers accept temporary roles involuntarily \u2014 permanent positions unavailable", sources: ["src-007"] },
        ],
      },
    ],
  },
  {
    id: "braindrain",
    title: "3. Brain Drain",
    subtitle: "Italy\u2019s accelerating talent hemorrhage",
    findings: [
      {
        title: "Emigration Scale",
        defaultOpen: true,
        points: [
          { text: "156,000 Italian citizens left in 2024 \u2014 36.5% increase over 2023, highest in 25 years", sources: ["src-005"] },
          { text: "Only 53,000 returned home in 2024 \u2014 massive net loss", sources: ["src-005"] },
          { text: "1+ million Italians emigrated in past decade; one-third aged 25-34", sources: ["src-004"] },
          { text: "630,000 aged 18-34 moved out 2011-2024; net loss ~440,000", sources: ["src-006"] },
        ],
      },
      {
        title: "Graduate Exodus",
        points: [
          { text: "Share of graduates among emigrants rose from 18% to 58% over two decades", sources: ["src-004"] },
          { text: "For every young foreigner settling in Italy, nearly 9 young Italians leave", sources: ["src-004"] },
          { text: "Brain drain cost Italy estimated \u20AC134 billion between 2011-2023 (>\u20AC10B/year)", sources: ["src-004"] },
        ],
      },
      {
        title: "Why They Leave",
        points: [
          { text: "Low salaries relative to qualifications and European peers", sources: ["src-004", "src-023"] },
          { text: "Workplaces perceived as unmeritocratic \u2014 recognition gap", sources: ["src-004"] },
          { text: "\u201CWhy should I sacrifice my prospects when my profile is more valued abroad?\u201D", sources: ["src-004"] },
        ],
      },
    ],
  },
  {
    id: "northsouth",
    title: "4. North-South Divide",
    subtitle: "Two labor markets in one country",
    findings: [
      {
        title: "The Employment Gap",
        defaultOpen: true,
        points: [
          { text: "Unemployment: North 4.3% vs South 11.9% \u2014 nearly 3x higher", sources: ["src-007"] },
          { text: "Female participation: >66% in North vs <45% in South (20+ pp gap)", sources: ["src-007"] },
          { text: "Undeclared work: South 15.6% vs North 8.9%", sources: ["src-007"] },
        ],
      },
      {
        title: "The Mezzogiorno Paradox",
        points: [
          { text: "Mezzogiorno GDP grew 8.5% (2021-24) vs Centre-North 5.8% \u2014 faster recovery", sources: ["src-010"] },
          { text: "Despite boom, 175,000 young people still emigrated from the South", sources: ["src-025"] },
          { text: "From 2027, South\u2019s growth will fall below North\u2019s as PNRR winds down", sources: ["src-010", "src-025"] },
        ],
      },
      {
        title: "Working Poor",
        points: [
          { text: "Real wages lost more in South (-10.2%) vs North (-8.2%) since 2021", sources: ["src-010"] },
          { text: "2.4 million working poor in Italy; 1.2 million (half) in the South", sources: ["src-010"] },
          { text: "Working poor in South increased by 60,000 between 2023-2024", sources: ["src-010"] },
        ],
      },
    ],
  },
  {
    id: "emerging",
    title: "5. Emerging Sectors",
    subtitle: "Growth opportunities beyond luxury and fashion",
    findings: [
      {
        title: "Startup Ecosystem",
        defaultOpen: true,
        points: [
          { text: "Ecosystem valued at \u20AC60 billion \u2014 11x increase over past decade", sources: ["src-011"] },
          { text: "Over 300,000 jobs created; 14,000+ startups registered", sources: ["src-011"] },
          { text: "\u20AC1.3 billion in VC funding raised in 2024; projected +15.38% growth in 2025", sources: ["src-011"] },
          { text: "Hubs: Milan (dominant), Turin, Rome", sources: ["src-011"] },
        ],
      },
      {
        title: "Key Growth Sectors",
        defaultOpen: true,
        points: [
          { text: "Fintech: Satispay (\u20AC60M raised), digital payments infrastructure", sources: ["src-011"] },
          { text: "Climate Tech: Italy\u2019s cleantech peaked in 2023, 2025 on track to surpass it", sources: ["src-013"] },
          { text: "Aerospace: D-Orbit raised \u20AC150M for space logistics", sources: ["src-011"] },
          { text: "AI/Robotics: Microsoft investing \u20AC4.3B in Italian AI/cloud infrastructure", sources: ["src-011"] },
          { text: "Agritech: xFarm raised \u20AC36M \u2014 agriculture meets digital innovation", sources: ["src-011"] },
          { text: "Cybersecurity: Cyber Guru raised $25M for security training", sources: ["src-011"] },
        ],
      },
      {
        title: "Tech Salaries & Skills",
        points: [
          { text: "Tech salaries: \u20AC40K-\u20AC70K+ in Milan and Rome", sources: ["src-012"] },
          { text: "30%+ of new tech positions require high-level qualifications", sources: ["src-011"] },
          { text: "800,000-worker gap in green sectors; 1.92M green contracts in 2023", sources: ["src-032"] },
        ],
      },
    ],
  },
  {
    id: "policy",
    title: "6. Policy Landscape",
    subtitle: "Government reforms targeting youth employment",
    findings: [
      {
        title: "PNRR (National Recovery Plan)",
        defaultOpen: true,
        points: [
          { text: "Largest EU national plan: \u20AC71.8B in grants + \u20AC122.6B in loans", sources: ["src-018"] },
          { text: "\u20AC65.7B spent by Feb 2025 (33.8% of resources); deadline Aug 2026", sources: ["src-018"] },
          { text: "60,000+ jobs/year in PNRR-financed construction (2023-25), especially in Sicily and Calabria", sources: ["src-018"] },
        ],
      },
      {
        title: "Bonus Giovani (Youth Bonus)",
        defaultOpen: true,
        points: [
          { text: "100% social security exemption, up to \u20AC500/month per worker, for 24 months", sources: ["src-019"] },
          { text: "For hiring under-35s on first permanent contract (Sep 2024 - Dec 2025)", sources: ["src-019"] },
          { text: "68,234 hirings used related incentives in first 9 months of 2025", sources: ["src-020"] },
          { text: "Total budget: ~\u20AC1.43 billion (2024-2027)", sources: ["src-019"] },
        ],
      },
      {
        title: "Structural Gaps",
        points: [
          { text: "Policy remains heavily supply-side: training and incentives, not wage/demand interventions", sources: ["src-018"] },
          { text: "Jobs Act (2015) effects proved temporary \u2014 permanent hiring surged during subsidies then normalized", sources: ["src-007"] },
          { text: "No policy currently addresses the fundamental salary gap with Northern Europe", sources: ["src-004"] },
        ],
      },
    ],
  },
  {
    id: "outlook",
    title: "7. Future Outlook (2025\u20132030)",
    subtitle: "Demographic cliff meets potential opportunity",
    findings: [
      {
        title: "The Demographic Crisis",
        defaultOpen: true,
        points: [
          { text: "Population: 59M today \u2192 45.8M by 2080", sources: ["src-014"] },
          { text: "Working-age population will decline 34% between 2023-2060", sources: ["src-015"] },
          { text: "34.6% of Italians will be 65+ by 2050 (vs 24.3% today)", sources: ["src-014"] },
          { text: "GDP could contract ~9% by 2050 from demographic decline alone", sources: ["src-014"] },
        ],
      },
      {
        title: "AI: Threat or Lifeline?",
        points: [
          { text: "AI could be a demographic lifeline \u2014 offsetting labor scarcity through productivity gains", sources: ["src-014"] },
          { text: "AI-exposed industries: productivity growth from 7% to 27%. Workers with AI skills earn 56% premium", sources: ["src-030"] },
          { text: "39% of core skills required by employers will change by 2030 (WEF)", sources: ["src-029"] },
          { text: "45% of anticipated hires in Italy proved difficult to fill in 2023", sources: ["src-032"] },
          { text: "Green transition will require 2.4 million workers with green competencies", sources: ["src-032"] },
        ],
      },
      {
        title: "Key Trends Through 2030",
        defaultOpen: true,
        points: [
          { text: "Annual labor market deficit of ~150,000 workers projected by 2030", sources: ["src-032"] },
          { text: "PNRR construction boom in the South will fade after 2026-2027", sources: ["src-010"] },
          { text: "Tech sector will expand but remain Milan-centric", sources: ["src-011"] },
          { text: "Brain drain will continue unless wages meaningfully rise", sources: ["src-004"] },
          { text: "Green transition and climate tech represent genuine new job pathways", sources: ["src-013"] },
          { text: "Paradox: labor scarcity should empower youth who stay \u2014 if productivity improves", sources: ["src-014", "src-017"] },
        ],
      },
    ],
  },
];

export const sources: Source[] = [
  { id: "src-001", title: "Italy Youth Unemployment Rate", url: "https://tradingeconomics.com/italy/youth-unemployment-rate", author: "Trading Economics", date: "2026-03", type: "data", relevance: 5 },
  { id: "src-002", title: "Eurozone unemployment at 6.2%", url: "https://www.eunews.it/en/2025/03/04/eurozone-unemployment-at-6-2-percent-in-italy-it-falls-but-stays-among-the-highest/", author: "EU News", date: "2025-03", type: "news", relevance: 4 },
  { id: "src-003", title: "Euro area unemployment at 6.3%", url: "https://ec.europa.eu/eurostat/web/products-euro-indicators/w/3-08012026-ap", author: "Eurostat", date: "2026-01", type: "official", relevance: 5 },
  { id: "src-004", title: "Brain drain: Young talent fleeing Italy", url: "https://fortune.com/europe/2024/12/10/brain-drain-italy-young-talent-fleeing/", author: "Fortune Europe", date: "2024-12", type: "analysis", relevance: 5 },
  { id: "src-005", title: "Italy Faces Alarm Over Rising Youth Migration", url: "https://www.fastbull.com/news-detail/italy-faces-alarm-over-rising-youth-migration-and-4330476_0", author: "FastBull", date: "2025", type: "news", relevance: 4 },
  { id: "src-006", title: "Nearly 100,000 young graduates left Italy", url: "https://www.thelocal.it/20250521/nearly-100000-young-graduates-left-italy-over-past-decade-report-finds", author: "The Local Italy", date: "2025-05", type: "news", relevance: 4 },
  { id: "src-007", title: "The labor market in Italy, 2000\u20132024", url: "https://wol.iza.org/articles/the-labor-market-in-italy/long", author: "IZA World of Labor", date: "2024", type: "academic", relevance: 5 },
  { id: "src-008", title: "Can labor policies reduce precarization?", url: "https://www.sciencedirect.com/science/article/pii/S0954349X25001018", author: "ScienceDirect", date: "2025", type: "academic", relevance: 4 },
  { id: "src-009", title: "Poverty and Temporary Employment in Italy", url: "https://link.springer.com/article/10.1007/s40797-024-00297-z", author: "Italian Economic Journal", date: "2024", type: "academic", relevance: 4 },
  { id: "src-010", title: "SVIMEZ Report 2025 Executive Summary", url: "https://www.svimez.it/wp-content/uploads/2025/11/executivesummary2025_eng.pdf", author: "SVIMEZ", date: "2025-11", type: "report", relevance: 5 },
  { id: "src-011", title: "Italy\u2019s tech ecosystem: Innovation & growth", url: "https://tech.eu/2025/06/19/italys-tech-ecosystem-innovation-growth-and-emerging-opportunities/", author: "Tech.eu", date: "2025-06", type: "analysis", relevance: 4 },
  { id: "src-012", title: "10 promising Italian startups 2025", url: "https://www.eu-startups.com/2025/02/ciao-innovation-10-promising-italian-startups-you-should-keep-and-eye-on-in-2025/", author: "EU-Startups", date: "2025-02", type: "analysis", relevance: 3 },
  { id: "src-013", title: "Italy\u2019s climate tech sector surges", url: "https://www.impactloop.com/artikel/italy-s-fastest-growing-climate-tech-startups", author: "Impact Loop", date: "2025", type: "analysis", relevance: 3 },
  { id: "src-014", title: "Italy\u2019s aging workforce solutions", url: "https://www.deloitte.com/us/en/insights/topics/talent/italy-aging-workforce-solutions.html", author: "Deloitte Insights", date: "2025", type: "report", relevance: 5 },
  { id: "src-015", title: "OECD Employment Outlook 2025: Italy", url: "https://www.oecd.org/en/publications/2025/07/oecd-employment-outlook-2025-country-notes_5f33b4c5/italy_a775131b.html", author: "OECD", date: "2025-07", type: "official", relevance: 5 },
  { id: "src-016", title: "Cedefop 2025 Skills Forecast: Italy", url: "https://www.cedefop.europa.eu/files/skills_forecast_-_italy_2025.pdf", author: "Cedefop / EU", date: "2025", type: "official", relevance: 4 },
  { id: "src-017", title: "Projecting Italy\u2019s labour market by 2050", url: "https://www.rieds-journal.org/rieds/article/view/520", author: "RIEDS", date: "2025", type: "academic", relevance: 4 },
  { id: "src-018", title: "Italy\u2019s NRRP: Latest state of play", url: "https://www.europarl.europa.eu/thinktank/en/document/EPRS_BRI(2021)698847", author: "European Parliament", date: "2025", type: "official", relevance: 4 },
  { id: "src-019", title: "Youth Bonus under 36: How It Works", url: "https://ldp-ita.com/news-payroll-en/youth-employment-bonus-under-36-what-it-is-and-how-it-works", author: "LDP", date: "2025", type: "analysis", relevance: 4 },
  { id: "src-020", title: "Cohesion Decree: Relief for Hiring Youth", url: "https://ldp-ita.com/news-payroll-en/cohesion-decree-contribution-relief-for-hiring-young-people-under-35", author: "LDP", date: "2025", type: "analysis", relevance: 3 },
  { id: "src-021", title: "NEET statistics", url: "https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Statistics_on_young_people_neither_in_employment_nor_in_education_or_training", author: "Eurostat", date: "2025", type: "official", relevance: 4 },
  { id: "src-022", title: "Brain drain: inequalities in the South", url: "https://www.unicaradio.it/en/blog/2026/02/18/brain-drain-the-inequalities-that-afflict-the-south-and-the-islands/", author: "Unica Radio", date: "2026-02", type: "news", relevance: 3 },
  { id: "src-023", title: "Plight of Young Workers in Italy", url: "https://harvardpolitics.com/plight-of-young-workers/", author: "Harvard Political Review", date: "2024", type: "analysis", relevance: 4 },
  { id: "src-024", title: "Italy\u2019s 2026 Budget Bill", url: "https://knowledge.dlapiper.com/dlapiperknowledge/globalemploymentlatestdevelopments/2025/italys-2026-budget-bill", author: "DLA Piper", date: "2025", type: "analysis", relevance: 3 },
  { id: "src-025", title: "South employment boom but 175K youth emigrate", url: "https://en.ilsole24ore.com/art/from-2027-south-will-slow-down-and-grow-less-north-centre-us-tariffs-risk-over-13000-jobs-AHy9J3yD", author: "Il Sole 24 ORE", date: "2025", type: "news", relevance: 4 },
  { id: "src-026", title: "Giovani 2024: Il bilancio di una generazione", url: "https://agenziagioventu.gov.it/giovani-2024-il-bilancio-di-una-generazione-pubblicato-il-rapporto-eures-per-il-consiglio-nazionale-dei-giovani-e-lagenzia-italiana-per-la-gioventu/", author: "CNG / Agenzia Giovent\u00f9", date: "2024-04", type: "report", relevance: 5 },
  { id: "src-027", title: "Precarious work & poverty: young workers in Italy", url: "https://www.equaltimes.org/precarious-work-exploitation-and", author: "Equal Times", date: "2022-10", type: "analysis", relevance: 4 },
  { id: "src-028", title: "Italy unemployment falls to 22-year low", url: "https://www.reuters.com/markets/europe/italy-january-jobless-rate-falls-22-year-low-51-2026-03-04/", author: "Reuters", date: "2026-03", type: "news", relevance: 5 },
  { id: "src-029", title: "WEF Future of Jobs Report 2025", url: "https://www.weforum.org/publications/the-future-of-jobs-report-2025/digest/", author: "World Economic Forum", date: "2025-01", type: "report", relevance: 4 },
  { id: "src-030", title: "PwC 2025 AI Jobs Barometer \u2014 Italy", url: "https://www.pwc.com/gx/en/issues/artificial-intelligence/job-barometer/aijb-2025-italy-analysis.pdf", author: "PwC", date: "2025", type: "report", relevance: 4 },
  { id: "src-031", title: "IMF: Italy Needs Higher Productivity", url: "https://www.imf.org/en/news/articles/2025/09/15/cf-italy-needs-higher-productivity-and-more-people-working", author: "IMF", date: "2025-09", type: "official", relevance: 5 },
  { id: "src-032", title: "Il Futuro del Mercato del Lavoro 2030", url: "https://www.federdat.it/il-futuro-del-mercato-del-lavoro-in-italia-prospettive-al-2030/", author: "Federdat", date: "2025", type: "analysis", relevance: 4 },
];

export const auditMetrics: AuditMetric[] = [
  { label: "Citation Coverage", score: 90, note: "Strong inline citations; agent analysis clearly labeled" },
  { label: "Source Validity", score: 88, note: "Official (Eurostat, OECD, IMF), academic, reports (WEF, PwC, Deloitte)" },
  { label: "Duplicate Detection", score: 90, note: "Minor overlap justified by different contexts" },
  { label: "Single-Source Claims", score: 78, note: "Better corroborated with additional sources" },
  { label: "Coverage", score: 90, note: "All 7 sub-questions addressed with 4+ sources" },
  { label: "Recency", score: 82, note: "Most sources 2024-2026; some use 2022-23 data" },
  { label: "Bias Check", score: 80, note: "Improved with CNG youth report and worker perspective" },
  { label: "Overall", score: 87, note: "Suitable for use with noted caveats" },
];

export const singleSourceClaims: SingleSourceClaim[] = [
  { text: "For every young foreigner settling, nearly 9 young Italians leave", source: "src-004", risk: "Medium" },
  { text: "Startup ecosystem valued at \u20AC60B, 300,000 jobs created", source: "src-011", risk: "Medium" },
  { text: "\u20AC134 billion brain drain cost (2011-2023)", source: "src-004", risk: "Medium" },
  { text: "68,234 hirings used youth bonus in first 9 months", source: "src-020", risk: "Low" },
  { text: "Working-age population decline of 34% by 2060", source: "src-015", risk: "Low" },
  { text: "GDP could contract 9% by 2050", source: "src-014", risk: "Medium" },
];

export const coverage: CoverageItem[] = [
  { question: "Youth unemployment rates", sources: 5, rating: "Strong" },
  { question: "Precarious work & temporary contracts", sources: 5, rating: "Strong" },
  { question: "Brain drain & emigration", sources: 4, rating: "Strong" },
  { question: "North-South divide", sources: 4, rating: "Strong" },
  { question: "Emerging sectors", sources: 4, rating: "Adequate" },
  { question: "Policy reforms", sources: 4, rating: "Adequate" },
  { question: "2030 outlook & demographics", sources: 5, rating: "Strong" },
];

export function getSourceTypeColor(type: string) {
  const colors: Record<string, string> = {
    official: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    academic: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    report: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    news: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    analysis: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    data: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  };
  return colors[type] || "bg-muted text-muted-foreground";
}

export function getSummaryBorderColor(color: string) {
  const colors: Record<string, string> = {
    red: "border-l-red-500",
    orange: "border-l-orange-500",
    yellow: "border-l-yellow-500",
    blue: "border-l-blue-500",
    emerald: "border-l-emerald-500",
    purple: "border-l-purple-500",
  };
  return colors[color] || "";
}

export function getSummaryLabelColor(color: string) {
  const colors: Record<string, string> = {
    red: "text-red-400",
    orange: "text-orange-400",
    yellow: "text-yellow-400",
    blue: "text-blue-400",
    emerald: "text-emerald-400",
    purple: "text-purple-400",
  };
  return colors[color] || "";
}
