"use client";

import { useState, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  stats,
  summary,
  sections,
  sources,
  auditMetrics,
  singleSourceClaims,
  coverage,
  getSourceTypeColor,
  getSummaryBorderColor,
  getSummaryLabelColor,
} from "@/lib/data/research";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("unemployment");
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
    setActiveTab("sources");
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Italian Youth Labor Market
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Current State & Future Trends (2024–2030)
              </p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                32 Sources
              </Badge>
              <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                Audit: 87/100
              </Badge>
              <span className="text-muted-foreground">March 12, 2026</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 space-y-6">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((stat) => (
            <Card key={stat.label} className="bg-card">
              <CardContent className="p-3">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  {stat.label}
                </p>
                <p className={`text-xl font-bold mt-1 ${stat.color}`}>
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {stat.context}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Executive Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Executive Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {summary.map((item) => (
                <div
                  key={item.label}
                  className={`rounded-lg border-l-4 bg-muted/50 p-4 ${getSummaryBorderColor(item.color)}`}
                >
                  <p
                    className={`text-xs font-medium uppercase tracking-wide mb-2 ${getSummaryLabelColor(item.color)}`}
                  >
                    {item.label}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.text}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {item.sources.map((src) => (
                      <button
                        key={src}
                        onClick={() => scrollToSource(src)}
                        className="text-xs bg-muted text-blue-400 px-1.5 py-0.5 rounded hover:bg-blue-500/20 transition cursor-pointer"
                      >
                        {src}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex flex-wrap h-auto gap-1 bg-muted/50 p-1">
            {[
              ...sections.map((s) => ({ id: s.id, label: s.title.replace(/^\d+\.\s*/, "") })),
              { id: "sources", label: "Sources" },
              { id: "audit", label: "Audit" },
            ].map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="text-xs sm:text-sm px-3 py-1.5"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Section Tabs */}
          {sections.map((section) => (
            <TabsContent key={section.id} value={section.id}>
              <Card>
                <CardHeader>
                  <CardTitle>{section.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {section.subtitle}
                  </p>
                </CardHeader>
                <CardContent>
                  <Accordion
                    multiple
                    defaultValue={section.findings
                      .filter((f) => f.defaultOpen)
                      .map((_, i) => i)}
                  >
                    {section.findings.map((finding, fi) => (
                      <AccordionItem key={finding.title} value={fi}>
                        <AccordionTrigger className="text-sm font-semibold">
                          {finding.title}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2">
                            {finding.points.map((point, pi) => (
                              <div key={pi} className="flex gap-2 text-sm">
                                <span className="text-muted-foreground mt-0.5 shrink-0">
                                  &bull;
                                </span>
                                <div>
                                  <span className="text-foreground/80">
                                    {point.text}
                                  </span>
                                  {point.sources.map((src) => (
                                    <button
                                      key={src}
                                      onClick={() => scrollToSource(src)}
                                      className="text-xs text-blue-400 ml-1 hover:underline cursor-pointer"
                                    >
                                      [{src}]
                                    </button>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          ))}

          {/* Sources Tab */}
          <TabsContent value="sources">
            <Card>
              <CardHeader>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <CardTitle>Source Registry</CardTitle>
                  <div className="flex gap-2">
                    <Input
                      value={sourceSearch}
                      onChange={(e) => setSourceSearch(e.target.value)}
                      placeholder="Search sources..."
                      className="w-48 h-8 text-sm"
                    />
                    <select
                      value={sourceTypeFilter}
                      onChange={(e) => setSourceTypeFilter(e.target.value)}
                      className="h-8 rounded-md border bg-background px-3 text-sm"
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
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-20">ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead className="hidden sm:table-cell">Author</TableHead>
                        <TableHead className="hidden md:table-cell">Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="hidden sm:table-cell">Relevance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSources.map((source) => (
                        <TableRow
                          key={source.id}
                          id={`source-${source.id}`}
                          className={
                            highlightedSource === source.id
                              ? "bg-blue-500/10 transition-colors duration-1000"
                              : ""
                          }
                        >
                          <TableCell className="font-mono text-xs text-blue-400">
                            {source.id}
                          </TableCell>
                          <TableCell>
                            <a
                              href={source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-foreground/80 hover:text-blue-400 transition text-sm"
                            >
                              {source.title}
                            </a>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell text-muted-foreground text-sm">
                            {source.author}
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
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
                                      ? "bg-blue-400"
                                      : "bg-muted"
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
              </CardContent>
            </Card>
          </TabsContent>

          {/* Audit Tab */}
          <TabsContent value="audit" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Audit Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {auditMetrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-lg bg-muted/50 p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground uppercase tracking-wide">
                          {metric.label}
                        </span>
                        <span
                          className={`text-sm font-bold ${
                            metric.score >= 85
                              ? "text-emerald-400"
                              : metric.score >= 75
                              ? "text-yellow-400"
                              : "text-red-400"
                          }`}
                        >
                          {metric.score}/100
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full transition-all duration-500 ${
                            metric.score >= 85
                              ? "bg-emerald-400"
                              : metric.score >= 75
                              ? "bg-yellow-400"
                              : "bg-red-400"
                          }`}
                          style={{ width: `${metric.score}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {metric.note}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Single-Source Claims</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {singleSourceClaims.map((claim) => (
                  <div
                    key={claim.text}
                    className="rounded-lg bg-muted/50 p-3 flex items-start gap-3"
                  >
                    <Badge
                      variant="outline"
                      className={`shrink-0 mt-0.5 ${
                        claim.risk === "Medium"
                          ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                          : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                      }`}
                    >
                      {claim.risk}
                    </Badge>
                    <div>
                      <p className="text-sm text-foreground/80">{claim.text}</p>
                      <button
                        onClick={() => scrollToSource(claim.source)}
                        className="text-xs text-blue-400 mt-1 hover:underline cursor-pointer"
                      >
                        Source: {claim.source}
                      </button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">
                  Coverage by Sub-Question
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {coverage.map((cov) => (
                  <div
                    key={cov.question}
                    className="flex items-center gap-3"
                  >
                    <span className="text-emerald-400 text-sm">&#10003;</span>
                    <span className="text-sm flex-1">{cov.question}</span>
                    <span className="text-xs text-muted-foreground">
                      {cov.sources} sources
                    </span>
                    <Badge
                      variant="outline"
                      className={
                        cov.rating === "Strong"
                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                          : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                      }
                    >
                      {cov.rating}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12">
        <div className="mx-auto max-w-7xl px-4 py-4 text-center text-xs text-muted-foreground">
          Deep Research Dashboard &middot; Generated March 12, 2026 &middot; 32
          sources &middot; Audit score 87/100
        </div>
      </footer>
    </div>
  );
}
