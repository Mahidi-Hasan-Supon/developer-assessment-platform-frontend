"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Clock3,
  Search,
  Sparkles,
} from "lucide-react";

const articles = [
  {
    id: 1,
    category: "Career",
    title: "How to Prepare for Your First Technical Assessment",
    description:
      "Learn how to practice coding problems, manage your time, and approach technical assessments with confidence.",
    date: "October 12, 2026",
    readTime: "6 min read",
    author: "DevAssess Team",
    initials: "DA",
    gradient: "from-blue-500/20 to-cyan-500/10",
    featured: true,
  },
  {
    id: 2,
    category: "Programming",
    title: "10 JavaScript Concepts Every Developer Should Know",
    description:
      "Strengthen your JavaScript fundamentals with closures, promises, scope, array methods, and more.",
    date: "October 8, 2026",
    readTime: "8 min read",
    author: "DevAssess Team",
    initials: "DA",
    gradient: "from-emerald-500/20 to-teal-500/10",
    featured: false,
  },
  {
    id: 3,
    category: "Career",
    title: "How to Build a Developer Portfolio That Stands Out",
    description:
      "Discover how to present your projects, demonstrate your skills, and make your portfolio more effective.",
    date: "October 3, 2026",
    readTime: "5 min read",
    author: "DevAssess Team",
    initials: "DA",
    gradient: "from-violet-500/20 to-indigo-500/10",
    featured: false,
  },
  {
    id: 4,
    category: "Interview Tips",
    title: "Common Coding Interview Mistakes and How to Avoid Them",
    description:
      "Understand common problem-solving mistakes and learn practical ways to communicate your approach.",
    date: "September 26, 2026",
    readTime: "7 min read",
    author: "DevAssess Team",
    initials: "DA",
    gradient: "from-orange-500/20 to-amber-500/10",
    featured: false,
  },
  {
    id: 5,
    category: "Programming",
    title: "REST APIs Explained for Beginner Developers",
    description:
      "Explore HTTP methods, status codes, request validation, and API design through practical examples.",
    date: "September 19, 2026",
    readTime: "6 min read",
    author: "DevAssess Team",
    initials: "DA",
    gradient: "from-sky-500/20 to-blue-500/10",
    featured: false,
  },
  {
    id: 6,
    category: "Career",
    title: "What Companies Look for in Junior Developers",
    description:
      "Explore the technical skills, communication habits, and project experience that can help junior developers.",
    date: "September 12, 2026",
    readTime: "5 min read",
    author: "DevAssess Team",
    initials: "DA",
    gradient: "from-pink-500/20 to-rose-500/10",
    featured: false,
  },
];

const categories = ["All", "Programming", "Career", "Interview Tips"];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredArticles = useMemo(() => {
    const query = search.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesCategory =
        activeCategory === "All" || article.category === activeCategory;

      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const featuredArticle = articles.find((article) => article.featured);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              The DevAssess Blog
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Ideas to help you{" "}
              <span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
                grow.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Practical programming guides, technical assessment tips, and
              career insights to help you become a better developer.
            </p>

            <div className="relative mx-auto mt-8 max-w-xl">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search articles, topics, and guides..."
                aria-label="Search blog articles"
                className="h-14 w-full rounded-2xl border border-border bg-card pl-12 pr-4 text-sm shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured article */}
      {featuredArticle && activeCategory === "All" && !search.trim() && (
        <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8 lg:pt-16">
          <div className="grid overflow-hidden rounded-3xl border border-border bg-card lg:grid-cols-2">
            <div
              className={`flex min-h-64 items-center justify-center bg-gradient-to-br ${featuredArticle.gradient} p-8 sm:p-12`}
            >
              <div className="flex h-36 w-36 items-center justify-center rounded-[2rem] border border-white/20 bg-background/60 shadow-xl backdrop-blur">
                <BookOpen
                  className="h-16 w-16 text-primary"
                  strokeWidth={1.4}
                />
              </div>
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
              <span className="w-fit rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                Featured article
              </span>

              <h2 className="mt-5 text-2xl font-bold leading-tight sm:text-3xl">
                {featuredArticle.title}
              </h2>

              <p className="mt-4 leading-7 text-muted-foreground">
                {featuredArticle.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  {featuredArticle.date}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock3 className="h-4 w-4" />
                  {featuredArticle.readTime}
                </span>
              </div>

              <Link
                href="/assessments"
                className="mt-7 inline-flex w-fit items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                Explore assessments
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Articles */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Explore our articles
            </p>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              Latest insights
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Resources for your next step in tech.
            </p>
          </div>

          <p className="text-sm text-muted-foreground">
            {filteredArticles.length}{" "}
            {filteredArticles.length === 1 ? "article" : "articles"} found
          </p>
        </div>

        <div className="mt-7 flex flex-wrap gap-2">
          {categories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={isActive}
                className={`rounded-full border px-4 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {filteredArticles.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <div
                  className={`relative flex h-48 items-center justify-center bg-gradient-to-br ${article.gradient}`}
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/20 bg-background/60 shadow-sm backdrop-blur transition-transform duration-300 group-hover:scale-105">
                    <BookOpen
                      className="h-9 w-9 text-primary"
                      strokeWidth={1.5}
                    />
                  </div>

                  <span className="absolute left-4 top-4 rounded-full border border-border/50 bg-background/85 px-3 py-1.5 text-xs font-semibold backdrop-blur">
                    {article.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {article.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="h-3.5 w-3.5" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-bold leading-7 transition-colors group-hover:text-primary">
                    {article.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
                    {article.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {article.initials}
                      </div>
                      <span className="text-xs font-medium text-muted-foreground">
                        {article.author}
                      </span>
                    </div>

                    <Link
                      href="/assessments"
                      aria-label={`Explore assessments related to ${article.title}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border transition hover:border-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-border px-6 py-16 text-center">
            <Search className="mx-auto h-10 w-10 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No articles found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Try another search term or choose a different category.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
              className="mt-5 text-sm font-semibold text-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* CTA */}
        <div className="relative mt-16 overflow-hidden rounded-3xl border border-primary/20 bg-primary/5 p-7 sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                <Sparkles className="h-4 w-4" />
                Ready to put your skills to the test?
              </div>
              <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                Turn what you learn into progress.
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Practice your skills and discover opportunities to grow with
                DevAssess.
              </p>
            </div>

            <Link
              href="/assessments"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Browse assessments
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
