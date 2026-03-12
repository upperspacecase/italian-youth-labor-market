"use client";

import { useState, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  heroStats, summaryNarrative, narrativeSections, sources,
  auditMetrics, singleSourceClaims, coverage,
} from "@/lib/data/research";

/* ── Earthy color system ──────────────────────────────────── */

const earthAccents: Record<string, { bg: string; light: string; text: string; border: string }> = {
  terracotta: { bg: "bg-[#c07850]", light: "bg-[#faf0ea]", text: "text-[#c07850]", border: "border-[#c07850]" },
  amber:      { bg: "bg-[#c4a35a]", light: "bg-[#faf5e8]", text: "text-[#c4a35a]", border: "border-[#c4a35a]" },
  clay:       { bg: "bg-[#b8956a]", light: "bg-[#f8f0e6]", text: "text-[#b8956a]", border: "border-[#b8956a]" },
  sage:       { bg: "bg-[#8b9e7e]", light: "bg-[#eef2eb]", text: "text-[#8b9e7e]", border: "border-[#8b9e7e]" },
  olive:      { bg: "bg-[#7c8c6e]", light: "bg-[#ecf0e8]", text: "text-[#7c8c6e]", border: "border-[#7c8c6e]" },
  stone:      { bg: "bg-[#8c8578]", light: "bg-[#f0eeeb]", text: "text-[#8c8578]", border: "border-[#8c8578]" },
  brown:      { bg: "bg-[#7a5c42]", light: "bg-[#f2ebe4]", text: "text-[#7a5c42]", border: "border-[#7a5c42]" },
};

/** Map the old vibrant color keys to earthy equivalents */
function getSectionAccent(color: string) {
  const map: Record<string, string> = {
    rose: "terracotta", amber: "amber", orange: "clay",
    blue: "stone", teal: "sage", purple: "olive", indigo: "brown",
  };
  return earthAccents[map[color] ?? "sage"] ?? earthAccents.sage;
}

/** Earthy pull-quote color override */
function earthyPullQuote(color?: string) {
  if (!color) return "text-[#8b9e7e]";
  const m: Record<string, string> = {
    "text-rose-500": "text-[#c07850]", "text-orange-500": "text-[#b8956a]",
    "text-amber-500": "text-[#c4a35a]", "text-blue-500": "text-[#8c8578]",
    "text-teal-500": "text-[#8b9e7e]", "text-emerald-500": "text-[#7c8c6e]",
    "text-purple-500": "text-[#7c8c6e]", "text-indigo-500": "text-[#7a5c42]",
  };
  return m[color] ?? "text-[#8b9e7e]";
}

/** Earthy source-type badge colors */
function earthySourceColor(type: string) {
  const c: Record<string, string> = {
    official: "bg-[#eef2eb] text-[#5a6e4e] border-[#c8d4c0]",
    academic: "bg-[#ecf0e8] text-[#4a5740] border-[#bcc8b4]",
    report:   "bg-[#faf5e8] text-[#8b7430] border-[#e0d4a8]",
    news:     "bg-[#faf0ea] text-[#8b5030] border-[#e0c4a8]",
    analysis: "bg-[#f8f0e6] text-[#7a5c38] border-[#d8c4a8]",
    data:     "bg-[#f0eeeb] text-[#5c564c] border-[#d0ccc4]",
  };
  return c[type] ?? "bg-[#f0eeeb] text-[#5c564c] border-[#d0ccc4]";
}

/* ── Inline citation component ────────────────────────────── */

function CitedText({ text, onCiteClick }: { text: string; onCiteClick: (id: string) => void }) {
  const parts = text.split(/(\[src-\d+(?:,\s*src-\d+)*\])/g);
  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(/^\[(src-\d+(?:,\s*src-\d+)*)\]$/);
        if (match) {
          const ids = match[1].split(/,\s*/);
          return (
            <span key={i}>
              [
              {ids.map((id, j) => (
                <span key={id}>
                  {j > 0 && ", "}
                  <button
                    onClick={() => onCiteClick(id)}
                    className="text-[#8b9e7e] hover:text-[#5a6e4e] hover:underline cursor-pointer font-mono text-xs"
                  >
                    {id}
                  </button>
                </span>
              ))}
              ]
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

/* ── Navigation ───────────────────────────────────────────── */

const navItems = [
  { id: "overview", label: "Overview" },
  { id: "insights", label: "Insights" },
  { id: "sources",  label: "Sources" },
  { id: "audit",    label: "Audit" },
] as const;

type ViewId = (typeof navItems)[number]["id"];

/* ── Main dashboard ───────────────────────────────────────── */

export default function Dashboard() {
  const [activeView, setActiveView] = useState<ViewId>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sourceSearch, setSourceSearch] = useState("");
  const [sourceTypeFilter, setSourceTypeFilter] = useState("");
  const [highlightedSource, setHighlightedSource] = useState<string | null>(null);

  const filteredSources = sources.filter((s) => {
    const q = sourceSearch.toLowerCase();
    const matchesSearch = !q || s.title.toLowerCase().includes(q) || s.author.toLowerCase().includes(q) || s.id.includes(q);
    const matchesType = !sourceTypeFilter || s.type === sourceTypeFilter;
    return matchesSearch && matchesType;
  });

  const scrollToSource = useCallback((srcId: string) => {
    setActiveView("sources");
    setSidebarOpen(false);
    setHighlightedSource(srcId);
    setTimeout(() => {
      document.getElementById(`source-${srcId}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => setHighlightedSource(null), 2000);
    }, 100);
  }, []);

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good Morning!";
    if (h < 17) return "Good Afternoon!";
    return "Good Evening!";
  })();

  const overallScore = auditMetrics.find((m) => m.label === "Overall")?.score ?? 87;

  /* ── Sidebar content (shared desktop & mobile) ── */
  const sidebar = (
    <>
      <div className="p-6 pb-4">
        <h2 className="text-xl font-serif italic text-[#3d3029]">{greeting}</h2>
        <p className="text-sm text-[#8e8880] mt-1 leading-relaxed">
          What would you like to know about the research today?
        </p>
      </div>

      <div className="px-6 mb-5">
        <div className="relative">
          <Input
            placeholder="Search"
            className="bg-white/80 border-[#e0dcd6] text-[#3d3029] placeholder:text-[#b8b2aa] rounded-xl h-10 pr-9"
          />
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8e8880] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <nav className="px-6 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => { setActiveView(item.id); setSidebarOpen(false); }}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200 cursor-pointer ${
              activeView === item.id
                ? "bg-white text-[#3d3029] shadow-sm"
                : "text-[#5a5247] hover:text-[#3d3029] hover:bg-white/50"
            }`}
          >
            {item.label}
            {item.id === "sources" && (
              <span className="ml-1 text-[#8e8880] text-xs">({sources.length})</span>
            )}
          </button>
        ))}
      </nav>

      <div className="mt-auto p-6 border-t border-[#e8e4de]">
        <div className="flex items-center gap-2 text-xs text-[#8e8880]">
          <div className="w-2 h-2 rounded-full bg-[#8b9e7e]" />
          <span>{sources.length} sources</span>
          <span className="text-[#d0ccc4]">&middot;</span>
          <span>Score {overallScore}/100</span>
        </div>
        <p className="text-xs text-[#b8b2aa] mt-1">Generated March 2026</p>
      </div>
    </>
  );

  /* ── Top 3 stats for Zen View ── */
  const zenStats = heroStats.slice(0, 3);
  const zenColors = ["text-[#c07850]", "text-[#c4a35a]", "text-[#8b9e7e]"];

  /* ────────────────────────── RENDER ────────────────────────── */

  return (
    <div className="min-h-screen bg-[#f5f0eb]">
      {/* ── Mobile top bar ── */}
      <header className="lg:hidden sticky top-0 z-40 bg-[#f5f0eb]/90 backdrop-blur-sm border-b border-[#e8e4de]">
        <div className="flex items-center justify-between px-4 h-14">
          <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 rounded-xl hover:bg-white/50 cursor-pointer" aria-label="Open menu">
            <svg className="w-5 h-5 text-[#3d3029]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <p className="text-sm font-medium text-[#3d3029] truncate">Italian Youth Labor Market</p>
          <div className="w-9" />
        </div>
      </header>

      {/* ── Mobile sidebar overlay ── */}
      {sidebarOpen && (
        <>
          <div className="lg:hidden fixed inset-0 z-50 bg-black/20 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-72 bg-[#faf8f5] shadow-xl flex flex-col">
            <div className="flex items-center justify-end p-3">
              <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-xl hover:bg-white/50 cursor-pointer" aria-label="Close menu">
                <svg className="w-5 h-5 text-[#3d3029]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {sidebar}
          </aside>
        </>
      )}

      {/* ── Desktop sidebar ── */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-72 bg-[#faf8f5] border-r border-[#e8e4de] flex-col z-30">
        {sidebar}
      </aside>

      {/* ══════════════════════ MAIN CONTENT ══════════════════════ */}
      <main className="lg:ml-72 px-4 py-6 md:px-8 md:py-8 lg:px-10 lg:py-10 max-w-5xl">

        {/* ═══════ OVERVIEW ═══════ */}
        {activeView === "overview" && (
          <div className="space-y-8">
            {/* So What? Header */}
            <section>
              <p className="text-sm font-medium text-[#8e8880] uppercase tracking-widest mb-3">So What?</p>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-[#3d3029] leading-snug">
                Youth unemployment hit record lows{" "}
                <span className="text-[#8b9e7e]">but 156,000 young Italians</span>{" "}
                still emigrate each year.
              </h1>
            </section>

            {/* Zen View */}
            <section>
              <p className="text-xs font-medium text-[#8e8880] uppercase tracking-widest mb-4">Zen View</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {zenStats.map((stat, i) => (
                  <div key={stat.label} className="bg-white rounded-2xl p-6 border border-[#e8e4de]">
                    <p className="text-xs text-[#8e8880] font-medium mb-2">{stat.label}:</p>
                    <p className={`text-3xl md:text-4xl font-bold ${zenColors[i]}`}>{stat.value}</p>
                    <p className="text-xs text-[#b8b2aa] mt-1">{stat.sublabel}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Quote + Green callout */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-3 bg-white rounded-2xl p-6 border border-[#e8e4de]">
                <p className="text-xs text-[#8e8880] font-medium mb-3">Key Insight</p>
                <p className="text-base text-[#5a5247] leading-relaxed italic font-serif">
                  &ldquo;Italy produces world-class graduates&mdash;then watches 156,000 of them leave each year for better wages abroad.&rdquo;
                </p>
                <p className="text-xs text-[#8e8880] mt-3">&mdash; Research finding, 2024&ndash;2026 data</p>
              </div>
              <div className="md:col-span-2 bg-[#8b9e7e] rounded-2xl p-6 text-white flex items-center">
                <p className="text-sm leading-relaxed">
                  As labor grows scarce, young Italians who stay may find themselves in an increasingly strong negotiating position&mdash;provided productivity improves.
                </p>
              </div>
            </div>

            {/* Preview cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setActiveView("insights")}
                className="bg-white rounded-2xl p-6 border border-[#e8e4de] text-left hover:shadow-md transition-shadow duration-200 cursor-pointer"
              >
                <h3 className="text-base font-semibold text-[#3d3029] mb-1">Top Findings</h3>
                <p className="text-sm text-[#8e8880] mb-4">
                  Precarious work and the brain drain dominate the landscape.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Unemployment", "Precarious Work", "Brain Drain"].map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1 bg-[#f5f0eb] text-[#5a5247] rounded-full">{t}</span>
                  ))}
                </div>
              </button>
              <button
                onClick={() => setActiveView("insights")}
                className="bg-white rounded-2xl p-6 border border-[#e8e4de] text-left hover:shadow-md transition-shadow duration-200 cursor-pointer"
              >
                <h3 className="text-base font-semibold text-[#3d3029] mb-1">Emerging Opportunities</h3>
                <p className="text-sm text-[#8e8880] mb-4">
                  Tech ecosystem valued at &euro;60B with 800K green job gap.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Startups", "Green Jobs", "AI"].map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1 bg-[#eef2eb] text-[#5a6e4e] rounded-full">{t}</span>
                  ))}
                </div>
              </button>
            </div>

            {/* Remaining metrics */}
            <section>
              <p className="text-xs font-medium text-[#8e8880] uppercase tracking-widest mb-4">Additional Metrics</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {heroStats.slice(3).map((stat) => (
                  <div key={stat.label} className="bg-white rounded-2xl p-5 border border-[#e8e4de]">
                    <p className="text-xs text-[#8e8880] font-medium mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-[#3d3029]">{stat.value}</p>
                    <p className="text-xs text-[#b8b2aa] mt-0.5">{stat.sublabel}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ═══════ INSIGHTS ═══════ */}
        {activeView === "insights" && (
          <div className="space-y-12">
            <section>
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#3d3029] mb-4">Research Insights</h1>
              <p className="text-base text-[#5a5247] max-w-3xl leading-relaxed">{summaryNarrative}</p>
            </section>

            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-[#e0dcd6]" />
              <span className="text-xs uppercase tracking-widest text-[#8e8880] font-medium">Findings</span>
              <div className="h-px flex-1 bg-[#e0dcd6]" />
            </div>

            {narrativeSections.map((section) => {
              const accent = getSectionAccent(section.color);
              return (
                <section key={section.id} id={section.id} className="scroll-mt-8">
                  <div className="flex items-center gap-3 mb-8">
                    <div className={`w-3 h-3 rounded-full ${accent.bg}`} />
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-[#3d3029]">{section.title}</h2>
                  </div>

                  <div className="space-y-8">
                    {section.narratives.map((narrative) => (
                      <div key={narrative.heading} className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {narrative.pullQuote ? (
                          <div className="lg:col-span-1">
                            <div className={`${accent.light} rounded-2xl p-5 text-center lg:text-left`}>
                              <p className={`text-2xl md:text-3xl font-bold ${earthyPullQuote(narrative.pullQuoteColor)}`}>
                                {narrative.pullQuote}
                              </p>
                              <p className="text-xs text-[#8e8880] mt-2 font-medium uppercase tracking-wide">
                                {narrative.heading}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="lg:col-span-1">
                            <div className={`border-l-4 ${accent.border} pl-4`}>
                              <h3 className="text-base font-semibold text-[#3d3029]">{narrative.heading}</h3>
                            </div>
                          </div>
                        )}
                        <div className="lg:col-span-3">
                          {narrative.pullQuote && (
                            <h3 className="text-base font-semibold text-[#3d3029] mb-3">{narrative.heading}</h3>
                          )}
                          <p className="text-base leading-relaxed text-[#5a5247]">
                            <CitedText text={narrative.body} onCiteClick={scrollToSource} />
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        {/* ═══════ SOURCES ═══════ */}
        {activeView === "sources" && (
          <div className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl font-serif font-bold text-[#3d3029]">Source Registry</h2>
              <div className="flex gap-2">
                <Input
                  value={sourceSearch}
                  onChange={(e) => setSourceSearch(e.target.value)}
                  placeholder="Search sources..."
                  className="w-48 h-9 text-sm bg-white border-[#e0dcd6] rounded-xl"
                />
                <select
                  value={sourceTypeFilter}
                  onChange={(e) => setSourceTypeFilter(e.target.value)}
                  className="h-9 rounded-xl border border-[#e0dcd6] bg-white px-3 text-sm text-[#5a5247] cursor-pointer"
                >
                  <option value="">All types</option>
                  <option value="official">Official</option>
                  <option value="academic">Academic</option>
                  <option value="report">Reports</option>
                  <option value="news">News</option>
                  <option value="analysis">Analysis</option>
                  <option value="data">Data</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#e8e4de] overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-[#e8e4de]">
                    <TableHead className="w-20 text-[#8e8880]">ID</TableHead>
                    <TableHead className="text-[#8e8880]">Title</TableHead>
                    <TableHead className="hidden sm:table-cell text-[#8e8880]">Author</TableHead>
                    <TableHead className="hidden md:table-cell text-[#8e8880]">Date</TableHead>
                    <TableHead className="text-[#8e8880]">Type</TableHead>
                    <TableHead className="hidden sm:table-cell text-[#8e8880]">Relevance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSources.map((source) => (
                    <TableRow
                      key={source.id}
                      id={`source-${source.id}`}
                      className={`border-[#f0eeeb] ${
                        highlightedSource === source.id
                          ? "bg-[#eef2eb] transition-colors duration-1000"
                          : "hover:bg-[#faf8f5]"
                      }`}
                    >
                      <TableCell className="font-mono text-xs text-[#8b9e7e]">{source.id}</TableCell>
                      <TableCell>
                        <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-[#3d3029] hover:text-[#8b9e7e] transition text-sm">
                          {source.title}
                        </a>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-[#8e8880] text-sm">{source.author}</TableCell>
                      <TableCell className="hidden md:table-cell text-[#8e8880] text-sm">{source.date}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`text-xs ${earthySourceColor(source.type)}`}>{source.type}</Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((dot) => (
                            <div key={dot} className={`w-2 h-2 rounded-full ${dot <= source.relevance ? "bg-[#8b9e7e]" : "bg-[#e8e4de]"}`} />
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {/* ═══════ AUDIT ═══════ */}
        {activeView === "audit" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-serif font-bold text-[#3d3029]">Audit Results</h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {auditMetrics.map((metric) => {
                const barColor = metric.score >= 85 ? "bg-[#8b9e7e]" : metric.score >= 75 ? "bg-[#c4a35a]" : "bg-[#c07850]";
                const numColor = metric.score >= 85 ? "text-[#8b9e7e]" : metric.score >= 75 ? "text-[#c4a35a]" : "text-[#c07850]";
                return (
                  <div key={metric.label} className="bg-white rounded-2xl border border-[#e8e4de] p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-[#8e8880] uppercase tracking-wide font-medium">{metric.label}</span>
                      <span className={`text-sm font-bold ${numColor}`}>{metric.score}/100</span>
                    </div>
                    <div className="w-full bg-[#f0eeeb] rounded-full h-2">
                      <div className={`h-2 rounded-full transition-all duration-500 ${barColor}`} style={{ width: `${metric.score}%` }} />
                    </div>
                    <p className="text-xs text-[#8e8880] mt-2">{metric.note}</p>
                  </div>
                );
              })}
            </div>

            {/* Single-source claims */}
            <div className="bg-white rounded-2xl border border-[#e8e4de] p-6">
              <h3 className="text-sm font-semibold text-[#3d3029] mb-4 uppercase tracking-wide">Single-Source Claims</h3>
              <div className="space-y-3">
                {singleSourceClaims.map((claim) => (
                  <div key={claim.text} className="flex items-start gap-3 p-3 rounded-xl bg-[#faf8f5]">
                    <Badge
                      variant="outline"
                      className={`shrink-0 mt-0.5 ${
                        claim.risk === "Medium"
                          ? "bg-[#faf5e8] text-[#8b7430] border-[#e0d4a8]"
                          : "bg-[#eef2eb] text-[#5a6e4e] border-[#c8d4c0]"
                      }`}
                    >
                      {claim.risk}
                    </Badge>
                    <div>
                      <p className="text-sm text-[#5a5247]">{claim.text}</p>
                      <button onClick={() => scrollToSource(claim.source)} className="text-xs text-[#8b9e7e] mt-1 hover:underline cursor-pointer">
                        Source: {claim.source}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coverage */}
            <div className="bg-white rounded-2xl border border-[#e8e4de] p-6">
              <h3 className="text-sm font-semibold text-[#3d3029] mb-4 uppercase tracking-wide">Coverage by Sub-Question</h3>
              <div className="space-y-3">
                {coverage.map((cov) => (
                  <div key={cov.question} className="flex items-center gap-3">
                    <span className="text-[#8b9e7e] text-sm">&#10003;</span>
                    <span className="text-sm flex-1 text-[#5a5247]">{cov.question}</span>
                    <span className="text-xs text-[#8e8880]">{cov.sources} sources</span>
                    <Badge
                      variant="outline"
                      className={cov.rating === "Strong" ? "bg-[#eef2eb] text-[#5a6e4e] border-[#c8d4c0]" : "bg-[#faf5e8] text-[#8b7430] border-[#e0d4a8]"}
                    >
                      {cov.rating}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="lg:ml-72 border-t border-[#e8e4de] mt-16">
        <div className="px-6 py-6 text-center text-xs text-[#b8b2aa]">
          Deep Research Report &middot; Generated March 2026 &middot; {sources.length} sources &middot; Audit score {overallScore}/100
        </div>
      </footer>
    </div>
  );
}
