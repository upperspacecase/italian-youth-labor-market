"use client";

import { useState, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  heroStats, summaryNarrative, narrativeSections, sources,
  auditMetrics, singleSourceClaims, coverage, getSourceTypeColor,
} from "@/lib/data/research";

function getSectionAccent(color: string) {
  const map: Record<string, { border: string; bg: string; text: string; light: string }> = {
    rose: { border: "border-rose-500", bg: "bg-rose-500", text: "text-rose-500", light: "bg-rose-50" },
    amber: { border: "border-amber-500", bg: "bg-amber-500", text: "text-amber-500", light: "bg-amber-50" },
    orange: { border: "border-orange-500", bg: "bg-orange-500", text: "text-orange-500", light: "bg-orange-50" },
    blue: { border: "border-blue-500", bg: "bg-blue-500", text: "text-blue-500", light: "bg-blue-50" },
    teal: { border: "border-teal-500", bg: "bg-teal-500", text: "text-teal-500", light: "bg-teal-50" },
    purple: { border: "border-purple-500", bg: "bg-purple-500", text: "text-purple-500", light: "bg-purple-50" },
    indigo: { border: "border-indigo-500", bg: "bg-indigo-500", text: "text-indigo-500", light: "bg-indigo-50" },
  };
  return map[color] || map.rose;
}

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
                    className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer font-mono text-xs"
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

export default function Dashboard() {
  const [activeView, setActiveView] = useState<"report" | "sources" | "audit">("report");
  const [sourceSearch, setSourceSearch] = useState("");
  const [sourceTypeFilter, setSourceTypeFilter] = useState("");
  const [highlightedSource, setHighlightedSource] = useState<string | null>(null);

  const filteredSources = sources.filter((s) => {
    const matchesSearch =
      !sourceSearch ||
      s.title.toLowerCase().includes(sourceSearch.toLowerCase()) ||
      s.author.toLowerCase().includes(sourceSearch.toLowerCase()) ||
      s.id.toLowerCase().includes(sourceSearch.toLowerCase());
    const matchesType = !sourceTypeFilter || s.type === sourceTypeFilter;
    return matchesSearch && matchesType;
  });

  const scrollToSource = useCallback((srcId: string) => {
    setActiveView("sources");
    setHighlightedSource(srcId);
    setTimeout(() => {
      const el = document.getElementById(`source-${srcId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => setHighlightedSource(null), 2000);
      }
    }, 100);
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      {/* Hero Header */}
      <header className="bg-white border-b border-stone-200">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-stone-400 mb-3">
                Deep Research Report
              </p>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-stone-900 leading-tight">
                Italian Youth<br />Labor Market
              </h1>
              <div className="mt-2 h-1 w-16 bg-rose-500 rounded-full" />
              <p className="mt-4 text-lg text-stone-500">
                Current State &amp; Future Trends, 2024&ndash;2030
              </p>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-3xl font-bold text-stone-300">2024</p>
              <p className="text-stone-400">&mdash;</p>
              <p className="text-3xl font-bold text-stone-300">2030</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="mt-8 flex gap-1">
            {[
              { id: "report" as const, label: "Report" },
              { id: "sources" as const, label: `Sources (${sources.length})` },
              { id: "audit" as const, label: "Audit" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition cursor-pointer ${
                  activeView === tab.id
                    ? "bg-stone-900 text-white"
                    : "text-stone-500 hover:text-stone-900 hover:bg-stone-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        {activeView === "report" && (
          <div className="space-y-16">
            {/* Hero Stats Grid */}
            <section>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className={`text-3xl md:text-4xl font-bold ${stat.color}`}>
                      {stat.value}
                    </p>
                    <p className="text-sm font-semibold text-stone-700 mt-1">
                      {stat.label}
                    </p>
                    <p className="text-xs text-stone-400 mt-0.5">
                      {stat.sublabel}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Executive Summary Narrative */}
            <section>
              <div className="max-w-3xl mx-auto">
                <p className="text-lg md:text-xl leading-relaxed text-stone-600 font-light">
                  {summaryNarrative}
                </p>
              </div>
            </section>

            {/* Section divider */}
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-stone-200" />
              <span className="text-xs uppercase tracking-widest text-stone-400 font-medium">Findings</span>
              <div className="h-px flex-1 bg-stone-200" />
            </div>

            {/* Narrative Sections */}
            {narrativeSections.map((section) => {
              const accent = getSectionAccent(section.color);
              return (
                <section key={section.id} id={section.id} className="scroll-mt-8">
                  {/* Section Header */}
                  <div className="flex items-center gap-3 mb-8">
                    <div className={`w-3 h-3 rounded-full ${accent.bg}`} />
                    <h2 className="text-2xl md:text-3xl font-bold text-stone-900">
                      {section.title}
                    </h2>
                  </div>

                  {/* Narratives */}
                  <div className="space-y-10">
                    {section.narratives.map((narrative) => (
                      <div key={narrative.heading} className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Pull quote / stat - left column on large screens */}
                        {narrative.pullQuote ? (
                          <div className="lg:col-span-1">
                            <div className={`${accent.light} rounded-2xl p-6 text-center lg:text-left`}>
                              <p className={`text-3xl md:text-4xl font-bold ${narrative.pullQuoteColor || accent.text}`}>
                                {narrative.pullQuote}
                              </p>
                              <p className="text-xs text-stone-500 mt-2 font-medium uppercase tracking-wide">
                                {narrative.heading}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="lg:col-span-1">
                            <div className={`border-l-4 ${accent.border} pl-4`}>
                              <h3 className="text-lg font-semibold text-stone-800">
                                {narrative.heading}
                              </h3>
                            </div>
                          </div>
                        )}

                        {/* Body text - right columns */}
                        <div className="lg:col-span-3">
                          {narrative.pullQuote && (
                            <h3 className="text-lg font-semibold text-stone-800 mb-3">
                              {narrative.heading}
                            </h3>
                          )}
                          <p className="text-base leading-relaxed text-stone-600">
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

        {activeView === "sources" && (
          <div className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl font-bold">Source Registry</h2>
              <div className="flex gap-2">
                <Input
                  value={sourceSearch}
                  onChange={(e) => setSourceSearch(e.target.value)}
                  placeholder="Search sources..."
                  className="w-48 h-9 text-sm bg-white border-stone-200"
                />
                <select
                  value={sourceTypeFilter}
                  onChange={(e) => setSourceTypeFilter(e.target.value)}
                  className="h-9 rounded-md border border-stone-200 bg-white px-3 text-sm"
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
            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-stone-200">
                    <TableHead className="w-20 text-stone-500">ID</TableHead>
                    <TableHead className="text-stone-500">Title</TableHead>
                    <TableHead className="hidden sm:table-cell text-stone-500">Author</TableHead>
                    <TableHead className="hidden md:table-cell text-stone-500">Date</TableHead>
                    <TableHead className="text-stone-500">Type</TableHead>
                    <TableHead className="hidden sm:table-cell text-stone-500">Relevance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSources.map((source) => (
                    <TableRow
                      key={source.id}
                      id={`source-${source.id}`}
                      className={`border-stone-100 ${
                        highlightedSource === source.id
                          ? "bg-blue-50 transition-colors duration-1000"
                          : "hover:bg-stone-50"
                      }`}
                    >
                      <TableCell className="font-mono text-xs text-blue-600">
                        {source.id}
                      </TableCell>
                      <TableCell>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-stone-700 hover:text-blue-600 transition text-sm"
                        >
                          {source.title}
                        </a>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-stone-500 text-sm">
                        {source.author}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-stone-500 text-sm">
                        {source.date}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`text-xs ${getSourceTypeColor(source.type)}`}
                        >
                          {source.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${
                                i <= source.relevance
                                  ? "bg-blue-500"
                                  : "bg-stone-200"
                              }`}
                            />
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

        {activeView === "audit" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">Audit Results</h2>

            {/* Metrics */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {auditMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="bg-white rounded-xl border border-stone-200 p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-stone-400 uppercase tracking-wide font-medium">
                      {metric.label}
                    </span>
                    <span
                      className={`text-sm font-bold ${
                        metric.score >= 85
                          ? "text-emerald-600"
                          : metric.score >= 75
                          ? "text-amber-600"
                          : "text-rose-600"
                      }`}
                    >
                      {metric.score}/100
                    </span>
                  </div>
                  <div className="w-full bg-stone-100 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        metric.score >= 85
                          ? "bg-emerald-500"
                          : metric.score >= 75
                          ? "bg-amber-500"
                          : "bg-rose-500"
                      }`}
                      style={{ width: `${metric.score}%` }}
                    />
                  </div>
                  <p className="text-xs text-stone-500 mt-2">{metric.note}</p>
                </div>
              ))}
            </div>

            {/* Single Source Claims */}
            <div className="bg-white rounded-xl border border-stone-200 p-6">
              <h3 className="text-sm font-semibold text-stone-700 mb-4 uppercase tracking-wide">
                Single-Source Claims
              </h3>
              <div className="space-y-3">
                {singleSourceClaims.map((claim) => (
                  <div
                    key={claim.text}
                    className="flex items-start gap-3 p-3 rounded-lg bg-stone-50"
                  >
                    <Badge
                      variant="outline"
                      className={`shrink-0 mt-0.5 ${
                        claim.risk === "Medium"
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-emerald-50 text-emerald-700 border-emerald-200"
                      }`}
                    >
                      {claim.risk}
                    </Badge>
                    <div>
                      <p className="text-sm text-stone-700">{claim.text}</p>
                      <button
                        onClick={() => scrollToSource(claim.source)}
                        className="text-xs text-blue-600 mt-1 hover:underline cursor-pointer"
                      >
                        Source: {claim.source}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coverage */}
            <div className="bg-white rounded-xl border border-stone-200 p-6">
              <h3 className="text-sm font-semibold text-stone-700 mb-4 uppercase tracking-wide">
                Coverage by Sub-Question
              </h3>
              <div className="space-y-3">
                {coverage.map((cov) => (
                  <div key={cov.question} className="flex items-center gap-3">
                    <span className="text-emerald-500 text-sm">&#10003;</span>
                    <span className="text-sm flex-1 text-stone-700">{cov.question}</span>
                    <span className="text-xs text-stone-400">{cov.sources} sources</span>
                    <Badge
                      variant="outline"
                      className={
                        cov.rating === "Strong"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }
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
      <footer className="border-t border-stone-200 mt-16">
        <div className="mx-auto max-w-6xl px-6 py-6 text-center text-xs text-stone-400">
          Deep Research Report &middot; Generated March 2026 &middot; {sources.length} sources &middot; Audit score 87/100
        </div>
      </footer>
    </div>
  );
}
