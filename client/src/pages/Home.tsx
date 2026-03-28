/*
 * TokenLedger — Home Page
 * Design: Terminal Noir — asymmetric editorial layout
 * Layout: Full-bleed hero → 2-col featured → 3-col grid + sidebar
 * SEO: Structured content with clear headings, self-contained paragraphs
 */

import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, TrendingUp, Cpu, BookOpen, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import {
  articles,
  getFeaturedArticles,
  getRecentArticles,
  getAllCategories,
  CATEGORY_COLORS,
  type Category,
} from "@/lib/articles";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663268995439/ibhnTzn7FkYdJFgZFYPNt7/hero-bg-VR4GjaR2k9iPEr3rj4ityq.webp";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const featured = getFeaturedArticles();
  const recent = getRecentArticles(8);
  const categories = getAllCategories();

  const filteredArticles = activeCategory === "All"
    ? articles
    : articles.filter((a) => a.category === activeCategory);

  const heroArticle = featured[0];
  const secondFeatured = featured[1];
  const sidebarArticles = articles.slice(2, 7);

  return (
    <div className="min-h-screen bg-[oklch(0.098_0.008_264)] flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.098_0.008_264/0.95)] via-[oklch(0.098_0.008_264/0.75)] to-[oklch(0.098_0.008_264/0.3)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.098_0.008_264)] via-transparent to-transparent" />

        <div className="relative container py-16 lg:py-20">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-5">
              <div className="w-1 h-4 bg-[oklch(0.82_0.18_195)] rounded-full" />
              <span className="font-mono text-[10px] text-[oklch(0.82_0.18_195)] uppercase tracking-widest">
                Featured Analysis
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-['Space_Grotesk'] font-700 text-[oklch(0.96_0.006_65)] text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4 tracking-tight">
              {heroArticle.title}
            </h1>

            <p className="text-[oklch(0.65_0.008_65)] text-base sm:text-lg leading-relaxed mb-6 max-w-2xl font-['Source_Serif_4']">
              {heroArticle.excerpt}
            </p>

            <div className="flex items-center gap-4 flex-wrap">
              <Link href={`/article/${heroArticle.slug}`}>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-[oklch(0.82_0.18_195)] text-[oklch(0.098_0.008_264)] rounded-sm font-['Space_Grotesk'] font-600 text-sm hover:bg-[oklch(0.88_0.18_195)] transition-colors">
                  Read Analysis
                  <ArrowRight size={14} />
                </button>
              </Link>
              <div className="flex items-center gap-2 text-[oklch(0.45_0.008_264)]">
                <span className="font-['Space_Grotesk'] text-xs">{heroArticle.author}</span>
                <span>·</span>
                <span className="font-mono text-xs">{heroArticle.readTime} min read</span>
                <span>·</span>
                <span className="font-mono text-xs">{heroArticle.publishedAt}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="border-y border-[oklch(0.22_0.008_264)] bg-[oklch(0.11_0.008_264)]">
        <div className="container">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-[oklch(0.22_0.008_264)]">
            {[
              { icon: <TrendingUp size={14} />, label: "Articles Published", value: "5–10 / day" },
              { icon: <Zap size={14} />, label: "Token Providers Tracked", value: "24+" },
              { icon: <Cpu size={14} />, label: "GPU Platforms Monitored", value: "12+" },
              { icon: <BookOpen size={14} />, label: "Newsletter Subscribers", value: "12,000+" },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 px-4 py-3">
                <span className="text-[oklch(0.82_0.18_195)]">{icon}</span>
                <div>
                  <div className="font-['Space_Grotesk'] font-700 text-[oklch(0.91_0.006_65)] text-sm">{value}</div>
                  <div className="font-mono text-[10px] text-[oklch(0.45_0.008_264)] uppercase tracking-wide">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container py-10 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          {/* Left: Main Feed */}
          <div>
            {/* Featured 2-up */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1 h-4 bg-[oklch(0.82_0.18_195)] rounded-full" />
                <h2 className="font-['Space_Grotesk'] font-700 text-[oklch(0.91_0.006_65)] text-sm uppercase tracking-widest">
                  Top Stories
                </h2>
                <div className="flex-1 h-px bg-[oklch(0.22_0.008_264)]" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {featured.map((article, i) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    variant="featured"
                    style={{ animationDelay: `${i * 60}ms` }}
                  />
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-4 bg-[oklch(0.82_0.18_195)] rounded-full" />
                <h2 className="font-['Space_Grotesk'] font-700 text-[oklch(0.91_0.006_65)] text-sm uppercase tracking-widest">
                  Latest Coverage
                </h2>
                <div className="flex-1 h-px bg-[oklch(0.22_0.008_264)]" />
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setActiveCategory("All")}
                  className={`px-3 py-1 rounded-sm text-xs font-['Space_Grotesk'] font-500 transition-colors ${
                    activeCategory === "All"
                      ? "bg-[oklch(0.82_0.18_195)] text-[oklch(0.098_0.008_264)]"
                      : "border border-[oklch(0.22_0.008_264)] text-[oklch(0.55_0.016_264)] hover:text-[oklch(0.91_0.006_65)] hover:border-[oklch(0.35_0.008_264)]"
                  }`}
                >
                  All
                </button>
                {categories.map((cat) => {
                  const colors = CATEGORY_COLORS[cat];
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1 rounded-sm text-xs font-['Space_Grotesk'] font-500 transition-colors border ${
                        activeCategory === cat
                          ? colors
                          : "border-[oklch(0.22_0.008_264)] text-[oklch(0.55_0.016_264)] hover:text-[oklch(0.91_0.006_65)] hover:border-[oklch(0.35_0.008_264)]"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Article Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredArticles.map((article, i) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  variant="default"
                  style={{ animationDelay: `${i * 60}ms` }}
                />
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-6">
            {/* CTA: Buy Tokens */}
            <div className="rounded-sm border border-[oklch(0.82_0.18_195/0.3)] bg-gradient-to-br from-[oklch(0.82_0.18_195/0.08)] to-[oklch(0.13_0.008_264)] p-5">
              <div className="flex items-center gap-2 mb-3">
                <Zap size={14} className="text-[oklch(0.82_0.18_195)]" />
                <span className="font-mono text-[10px] text-[oklch(0.82_0.18_195)] uppercase tracking-widest">Partner</span>
              </div>
              <h3 className="font-['Space_Grotesk'] font-700 text-[oklch(0.91_0.006_65)] text-base mb-2">
                Access AI Tokens at Scale
              </h3>
              <p className="text-[oklch(0.45_0.008_264)] text-xs leading-relaxed mb-4 font-['Source_Serif_4']">
                Get discounted access to GPT-4o, Claude, Gemini, and 20+ other models through our token distribution platform.
              </p>
              <a
                href="#"
                className="flex items-center justify-center gap-2 w-full py-2 bg-[oklch(0.82_0.18_195)] text-[oklch(0.098_0.008_264)] rounded-sm text-sm font-['Space_Grotesk'] font-600 hover:bg-[oklch(0.88_0.18_195)] transition-colors"
              >
                Get API Access
                <ArrowRight size={13} />
              </a>
            </div>

            {/* CTA: Rent GPUs */}
            <div className="rounded-sm border border-[oklch(0.22_0.008_264)] bg-[oklch(0.11_0.008_264)] p-5">
              <div className="flex items-center gap-2 mb-3">
                <Cpu size={14} className="text-blue-400" />
                <span className="font-mono text-[10px] text-blue-400 uppercase tracking-widest">Partner</span>
              </div>
              <h3 className="font-['Space_Grotesk'] font-700 text-[oklch(0.91_0.006_65)] text-base mb-2">
                H100 & H200 GPU Rentals
              </h3>
              <p className="text-[oklch(0.45_0.008_264)] text-xs leading-relaxed mb-4 font-['Source_Serif_4']">
                On-demand and reserved GPU instances for training, fine-tuning, and inference. Starting at $4.20/hr.
              </p>
              <a
                href="#"
                className="flex items-center justify-center gap-2 w-full py-2 border border-blue-400/40 text-blue-400 rounded-sm text-sm font-['Space_Grotesk'] font-600 hover:bg-blue-400/10 transition-colors"
              >
                Compare GPU Prices
                <ArrowRight size={13} />
              </a>
            </div>

            {/* Latest Articles Compact */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-4 bg-[oklch(0.82_0.18_195)] rounded-full" />
                <h3 className="font-['Space_Grotesk'] font-700 text-[oklch(0.91_0.006_65)] text-xs uppercase tracking-widest">
                  More Stories
                </h3>
              </div>
              <div className="space-y-1">
                {sidebarArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} variant="compact" />
                ))}
              </div>
            </div>

            {/* Newsletter Mini */}
            <div className="rounded-sm border border-[oklch(0.22_0.008_264)] bg-[oklch(0.11_0.008_264)] p-5">
              <h3 className="font-['Space_Grotesk'] font-700 text-[oklch(0.91_0.006_65)] text-sm mb-2">
                Daily AI Intelligence Brief
              </h3>
              <p className="text-[oklch(0.45_0.008_264)] text-xs mb-3 font-['Source_Serif_4']">
                Join 12,000+ AI professionals. Free, daily.
              </p>
              <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-[oklch(0.13_0.008_264)] border border-[oklch(0.22_0.008_264)] rounded-sm px-3 py-2 text-xs text-[oklch(0.91_0.006_65)] placeholder-[oklch(0.35_0.008_264)] focus:outline-none focus:border-[oklch(0.82_0.18_195/0.6)] font-mono transition-colors"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-[oklch(0.82_0.18_195)] text-[oklch(0.098_0.008_264)] rounded-sm text-xs font-['Space_Grotesk'] font-600 hover:bg-[oklch(0.88_0.18_195)] transition-colors"
                >
                  Subscribe Free
                </button>
              </form>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
