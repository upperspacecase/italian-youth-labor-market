export interface Source {
  id: string;
  title: string;
  url: string;
  author: string;
  date: string;
  type: string;
  relevance: number;
}

export interface HeroStat {
  value: string;
  label: string;
  sublabel: string;
  color: string;
}

export interface NarrativeSection {
  id: string;
  title: string;
  color: string;
  narratives: {
    heading: string;
    body: string;
    pullQuote?: string;
    pullQuoteColor?: string;
  }[];
}

export interface SummaryCard {
  label: string;
  text: string;
  color: string;
  sources: string[];
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

export const heroStats: HeroStat[] = [
  { value: "18.9%", label: "Youth Unemployment", sublabel: "Jan 2026, ages 15-24", color: "text-rose-500" },
  { value: "156K", label: "Emigrated in 2024", sublabel: "+36.5% vs prior year", color: "text-orange-500" },
  { value: "\u20AC134B", label: "Brain Drain Cost", sublabel: "2011\u20132023 losses", color: "text-amber-500" },
  { value: "~15%", label: "NEET Rate", sublabel: "Ages 15-29, 2024", color: "text-purple-500" },
  { value: "38.2%", label: "Youth on Temp Contracts", sublabel: "Ages 15-29", color: "text-teal-500" },
  { value: "-34%", label: "Working-Age Decline", sublabel: "Projected by 2060", color: "text-blue-500" },
];

export const summaryNarrative: string = "Italy\u2019s youth labor market tells a story of paradoxes. Overall unemployment has hit a 22-year low of 5.1%, yet nearly one in five young Italians cannot find work. The country produces world-class graduates\u2014then watches 156,000 of them leave each year for better wages abroad. A startup ecosystem worth \u20AC60 billion is flourishing in Milan, while the South still grapples with 12% unemployment and a generation caught in precarious contracts paying \u20AC9,500 a year. As Italy faces a demographic cliff that will shrink its working-age population by a third before 2060, the question is no longer whether change is coming\u2014but whether it will come fast enough.";

export const narrativeSections: NarrativeSection[] = [
  {
    id: "unemployment",
    title: "Youth Unemployment",
    color: "rose",
    narratives: [
      {
        heading: "A Dramatic Recovery \u2014 With Caveats",
        body: "Italy\u2019s youth unemployment rate has undergone a remarkable transformation, falling from a staggering 42.7% peak in 2014 to 18.9% in January 2026 [src-001, src-007]. The broader labor market has followed suit, with overall unemployment hitting 5.1%\u2014a 22-year low that now sits below the EU average of 5.8% [src-028]. But these headline numbers mask a persistent gap: Italy\u2019s youth rate remains 4 to 6 percentage points above the EU average of 15.1%, and the euro area figure of 14.6% [src-002]. The improvement is real, but Italy still has further to go than most of its peers.",
        pullQuote: "42.7% \u2192 18.9%",
        pullQuoteColor: "text-rose-500",
      },
      {
        heading: "The NEET Generation",
        body: "Between 14% and 15.2% of Italians aged 15-29 are classified as NEETs\u2014neither in employment, education, nor training\u2014compared to an EU average of 11% [src-021]. Italy did achieve one of the largest drops in this figure across the EU, falling 11 percentage points between 2014 and 2024, but stark regional divides remain. Sicily\u2019s NEET rate sits at 28%, while Trentino-South Tyrol manages just 9% [src-021]. Perhaps most telling is the collapse in youth labor force participation itself: from 38.1% in 2000 to just 24.7% in 2024 [src-007]. Many young Italians have simply stopped looking.",
        pullQuote: "28% NEET rate in Sicily vs 9% in Trentino",
        pullQuoteColor: "text-orange-500",
      },
    ],
  },
  {
    id: "precarious",
    title: "The Precarious Work Trap",
    color: "amber",
    narratives: [
      {
        heading: "Temporary by Default",
        body: "For young Italians entering the workforce, a permanent contract is the exception, not the rule. A striking 38.2% of workers aged 15-29 are on temporary contracts [src-008], and among those aged 25-34, the rate is 23.9%\u2014far above Germany\u2019s 15.3% or the EU average of 16.7% [src-007]. The scale becomes even more alarming when you look at new hires: 79.8% of all new contract activations for workers under 30 in 2023 were precarious arrangements [src-026]. This is emphatically a youth problem\u2014only 5% of workers aged 55-64 face the same condition [src-008].",
        pullQuote: "79.8%",
        pullQuoteColor: "text-amber-500",
      },
      {
        heading: "Wages That Don\u2019t Add Up",
        body: "Italy holds a dubious distinction: it is the only EU country where real wages are lower today than they were in the 1990s, having fallen approximately 3% [src-027]. The gap between contract types is devastating\u2014fixed-term workers earn an average of \u20AC9,038 per year compared to \u20AC20,431 for those on permanent contracts [src-026]. For the youngest workers aged 15-24, average annual pay is just \u20AC9,546 [src-026]. Italy has no national minimum wage system [src-023], and productivity has flatlined at $52-55 per hour since 2000, while France and Germany have pulled away to $65 and $69 respectively [src-007]. The result is predictable: the average age at which young Italians leave their family home is 30\u2014among the highest in the EU [src-004].",
        pullQuote: "\u20AC9,546/year",
        pullQuoteColor: "text-rose-500",
      },
    ],
  },
  {
    id: "braindrain",
    title: "The Brain Drain",
    color: "orange",
    narratives: [
      {
        heading: "A Talent Hemorrhage",
        body: "In 2024, 156,000 Italian citizens left the country\u2014a 36.5% surge over the previous year and the highest figure in 25 years [src-005]. Only 53,000 returned, leaving a massive net deficit [src-005]. Over the past decade, more than one million Italians have emigrated, with a third of them aged 25-34 [src-004]. Between 2011 and 2024, some 630,000 young people aged 18-34 moved abroad, producing a net loss of approximately 440,000 [src-006]. The character of emigration has shifted dramatically: graduates now make up 58% of those leaving, compared to just 18% two decades ago [src-004]. For every young foreigner who settles in Italy, nearly nine young Italians depart [src-004].",
        pullQuote: "\u20AC134 billion",
        pullQuoteColor: "text-orange-500",
      },
      {
        heading: "Why They Leave",
        body: "The brain drain has cost Italy an estimated \u20AC134 billion between 2011 and 2023\u2014more than \u20AC10 billion per year in lost human capital investment [src-004]. The motivations are straightforward: salaries that fail to match qualifications, workplaces perceived as unmeritocratic, and a recognition gap that leaves talented young professionals asking a simple question\u2014\u201CWhy should I sacrifice my prospects when my profile is more valued abroad?\u201D [src-004, src-023]. Until Italy addresses the fundamental salary gap with Northern Europe, this exodus shows no sign of slowing.",
      },
    ],
  },
  {
    id: "northsouth",
    title: "North\u2013South Divide",
    color: "blue",
    narratives: [
      {
        heading: "Two Labor Markets, One Country",
        body: "Italy\u2019s labor market is effectively split in two. In the North, unemployment sits at 4.3%; in the South, it is 11.9%\u2014nearly three times higher [src-007]. Female labor force participation exceeds 66% in the North but falls below 45% in the South, a gap of more than 20 percentage points [src-007]. The informal economy compounds the problem: undeclared work accounts for 15.6% of employment in the South versus 8.9% in the North [src-007]. The Mezzogiorno contains 2.4 million working poor\u2014fully half the national total\u2014and that figure grew by 60,000 between 2023 and 2024 [src-010].",
        pullQuote: "4.3% vs 11.9%",
        pullQuoteColor: "text-blue-500",
      },
      {
        heading: "The Mezzogiorno Paradox",
        body: "In a surprising twist, the South actually outpaced the North in GDP growth from 2021 to 2024, expanding 8.5% compared to the Centre-North\u2019s 5.8% [src-010]. This boom was largely fueled by PNRR construction spending and EU recovery funds. Yet even during this period of unprecedented growth, 175,000 young people still chose to emigrate from the South [src-025]. The outlook is sobering: from 2027 onward, as PNRR spending winds down, the South\u2019s growth rate is projected to fall back below the North\u2019s [src-010, src-025]. Real wages in the South have also eroded faster, falling 10.2% compared to 8.2% in the North since 2021 [src-010].",
      },
    ],
  },
  {
    id: "emerging",
    title: "Emerging Sectors",
    color: "teal",
    narratives: [
      {
        heading: "A Startup Renaissance",
        body: "Beyond the traditional pillars of fashion and luxury, Italy\u2019s technology ecosystem has undergone a transformation. The startup sector is now valued at \u20AC60 billion\u2014an 11-fold increase over the past decade\u2014and has generated more than 300,000 jobs across 14,000+ registered startups [src-011]. Venture capital funding reached \u20AC1.3 billion in 2024, with projected growth of over 15% in 2025 [src-011]. Milan dominates as the primary hub, followed by Turin and Rome, with standout companies spanning fintech (Satispay, \u20AC60M raised), space logistics (D-Orbit, \u20AC150M), agritech (xFarm, \u20AC36M), and cybersecurity (Cyber Guru, $25M) [src-011].",
        pullQuote: "\u20AC60B ecosystem",
        pullQuoteColor: "text-teal-500",
      },
      {
        heading: "Green Jobs and the Skills Gap",
        body: "Climate technology represents perhaps the most significant new frontier. Italy\u2019s cleantech investment peaked in 2023, and 2025 is on track to surpass it [src-013]. Microsoft is investing \u20AC4.3 billion in Italian AI and cloud infrastructure [src-011]. Tech salaries in Milan and Rome now range from \u20AC40,000 to \u20AC70,000 or more [src-012], and over 30% of new tech positions require high-level qualifications [src-011]. Yet the transition faces a critical bottleneck: there is an estimated 800,000-worker gap in green sectors alone, even as 1.92 million green-related contracts were issued in 2023 [src-032]. The opportunity is enormous\u2014if the workforce can be prepared to seize it.",
        pullQuote: "800K worker gap in green sectors",
        pullQuoteColor: "text-emerald-500",
      },
    ],
  },
  {
    id: "policy",
    title: "Policy Landscape",
    color: "purple",
    narratives: [
      {
        heading: "The PNRR Bet",
        body: "Italy\u2019s National Recovery and Resilience Plan (PNRR) is the largest in the EU, combining \u20AC71.8 billion in grants with \u20AC122.6 billion in loans [src-018]. By February 2025, \u20AC65.7 billion had been deployed\u201433.8% of total resources\u2014with a deadline of August 2026 [src-018]. The plan has already created more than 60,000 jobs per year in PNRR-financed construction between 2023 and 2025, particularly in Sicily and Calabria [src-018]. But the plan\u2019s impact on youth employment is indirect at best, flowing primarily through construction and infrastructure rather than targeted skills development.",
        pullQuote: "\u20AC71.8B in grants",
        pullQuoteColor: "text-purple-500",
      },
      {
        heading: "Youth Incentives and Structural Gaps",
        body: "The Bonus Giovani program offers employers a 100% social security exemption\u2014up to \u20AC500 per month per worker for 24 months\u2014when hiring under-35s on their first permanent contract [src-019]. The scheme, backed by roughly \u20AC1.43 billion through 2027, facilitated 68,234 hirings in its first nine months of 2025 [src-020]. Yet the broader policy architecture remains heavily supply-side: training programs and employer incentives, with little direct intervention on wages or demand [src-018]. History offers a cautionary tale\u2014the Jobs Act of 2015 saw permanent hiring surge during the subsidy period, only to normalize once incentives expired [src-007]. No current policy meaningfully addresses the fundamental salary gap with Northern Europe [src-004].",
      },
    ],
  },
  {
    id: "outlook",
    title: "Future Outlook 2025\u20132030",
    color: "indigo",
    narratives: [
      {
        heading: "The Demographic Cliff",
        body: "Italy faces a demographic reckoning that will reshape its labor market within a generation. The population is projected to fall from 59 million today to 45.8 million by 2080 [src-014]. The working-age population will decline by 34% between 2023 and 2060, while the share of Italians aged 65 and over will rise from 24.3% to 34.6% by 2050 [src-014, src-015]. The economic consequences could be severe\u2014GDP may contract approximately 9% by 2050 from demographic decline alone [src-014]. Already, 45% of anticipated hires in Italy proved difficult to fill in 2023, and an annual labor market deficit of around 150,000 workers is projected by 2030 [src-032].",
        pullQuote: "59M \u2192 45.8M by 2080",
        pullQuoteColor: "text-indigo-500",
      },
      {
        heading: "AI, Green Transition, and a Paradox of Hope",
        body: "Artificial intelligence may prove to be a demographic lifeline. In AI-exposed industries, productivity growth has jumped from 7% to 27%, and workers with AI skills already command a 56% wage premium [src-030]. The World Economic Forum projects that 39% of core skills required by employers will change by 2030 [src-029]. Simultaneously, the green transition will demand 2.4 million workers with green competencies [src-032]. The PNRR construction boom in the South will fade after 2027 [src-010], and the tech sector, while expanding, will likely remain Milan-centric [src-011]. Brain drain will continue unless wages meaningfully rise [src-004]. Yet there is a paradox of hope: as labor grows scarce, the young Italians who choose to stay may find themselves in an increasingly strong negotiating position\u2014provided productivity improves and the economy adapts [src-014, src-017].",
        pullQuote: "150K annual worker deficit by 2030",
        pullQuoteColor: "text-blue-500",
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
    official: "bg-blue-50 text-blue-700 border-blue-200",
    academic: "bg-purple-50 text-purple-700 border-purple-200",
    report: "bg-emerald-50 text-emerald-700 border-emerald-200",
    news: "bg-amber-50 text-amber-700 border-amber-200",
    analysis: "bg-orange-50 text-orange-700 border-orange-200",
    data: "bg-cyan-50 text-cyan-700 border-cyan-200",
  };
  return colors[type] || "bg-stone-50 text-stone-600 border-stone-200";
}
