/*
 * Token Continent — Home Page
 * Design: Editorial Light — content-first, newspaper-inspired layout
 * Layout: Hero lead story → 3-col featured → full-width latest feed + sidebar
 * Philosophy: Articles dominate. No hard ads. Clean, scannable, high-density.
 */

import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Clock, TrendingUp, Cpu, BookOpen, Zap, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import {
  articles,
  getFeaturedArticles,
  getAllCategories,
  CATEGORY_COLORS,
  type Category,
} from "@/lib/articles";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663268995439/ibhnTzn7FkYdJFgZFYPNt7/hero-bg-VR4GjaR2k9iPEr3rj4ityq.webp";

// Category badge helper
function CatBadge({ cat }: { cat: string }) {
  const map: Record<string, string> = {
    "Token Economics": "cat-token",
    "LLM Research": "cat-llm",
    "GPU & Infrastructure": "cat-gpu",
    "Industry News": "cat-news",
    "Analysis": "cat-analysis",
    "Opinion": "cat-opinion",
  };
  return <span className={`cat-badge ${map[cat] ?? "cat-news"}`}>{cat}</span>;
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const featured = getFeaturedArticles();
  const categories = getAllCategories();

  const heroArticle = featured[0];
  const secondaryArticles = featured.slice(1, 4);
  const sidebarArticles = articles.slice(4, 9);

  const filteredArticles = activeCategory === "All"
    ? articles.slice(0, 12)
    : articles.filter((a) => a.category === activeCategory).slice(0, 12);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* ── HERO LEAD STORY ── */}
      <section className="border-b border-gray-200">
        <div className="container py-0">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-0 lg:gap-0">
            {/* Left: Hero Article */}
            <Link href={`/article/${heroArticle.slug}`}>
              <div className="group relative overflow-hidden cursor-pointer border-r-0 lg:border-r border-gray-200 pr-0 lg:pr-8 py-6">
                <div className="flex items-center gap-2 mb-3">
                  <CatBadge cat={heroArticle.category} />
                  <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">Featured</span>
                </div>
                <h1 className="font-['Space_Grotesk'] font-800 text-gray-900 text-2xl sm:text-3xl lg:text-[2rem] leading-tight mb-3 tracking-tight group-hover:text-[#0096B4] transition-colors">
                  {heroArticle.title}
                </h1>
                <p className="text-gray-600 text-base leading-relaxed mb-4 font-['Source_Serif_4'] max-w-xl">
                  {heroArticle.excerpt}
                </p>
                <div className="flex items-center gap-3 text-gray-400 text-xs font-['Space_Grotesk']">
                  <span className="font-500 text-gray-700">{heroArticle.author}</span>
                  <span>·</span>
                  <span className="font-mono">{heroArticle.publishedAt}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Clock size={10} />{heroArticle.readTime} min read</span>
                </div>
              </div>
            </Link>

            {/* Right: Hero Image + 2 secondary stories */}
            <div className="py-6 pl-0 lg:pl-8 space-y-0">
              {/* Hero image */}
              <Link href={`/article/${heroArticle.slug}`}>
                <div className="relative overflow-hidden rounded-sm mb-5 cursor-pointer group aspect-[16/9]">
                  <img
                    src={heroArticle.image}
                    alt={heroArticle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </Link>
              {/* 2 secondary stacked */}
              <div className="space-y-4">
                {secondaryArticles.slice(0, 2).map((article) => (
                  <Link key={article.id} href={`/article/${article.slug}`}>
                    <div className="group flex gap-3 cursor-pointer py-3 border-t border-gray-100">
                      <div className="flex-1 min-w-0">
                        <CatBadge cat={article.category} />
                        <h3 className="font-['Space_Grotesk'] font-700 text-gray-900 text-sm leading-snug mt-1.5 group-hover:text-[#0096B4] transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1.5 text-gray-400 text-[11px] font-mono">
                          <span>{article.publishedAt}</span>
                          <span>·</span>
                          <span>{article.readTime}m</span>
                        </div>
                      </div>
                      <div className="w-20 h-16 flex-shrink-0 overflow-hidden rounded-sm">
                        <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-200">
            {[
              { icon: <TrendingUp size={13} />, label: "Articles / Day", value: "5–10" },
              { icon: <Zap size={13} />, label: "Token Providers", value: "24+" },
              { icon: <Cpu size={13} />, label: "GPU Platforms", value: "12+" },
              { icon: <BookOpen size={13} />, label: "Subscribers", value: "12,000+" },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-center gap-2.5 px-4 py-3">
                <span className="text-[#0096B4]">{icon}</span>
                <div>
                  <div className="font-['Space_Grotesk'] font-700 text-gray-900 text-sm">{value}</div>
                  <div className="font-mono text-[10px] text-gray-400 uppercase tracking-wide">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <main className="container py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">

          {/* ── LEFT: Main Feed ── */}
          <div>
            {/* Top Stories 3-col grid */}
            <div className="mb-8">
              <div className="section-heading">
                <span>Top Stories</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {secondaryArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} variant="default" />
                ))}
              </div>
            </div>

            {/* Category Filter + Latest */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="section-heading" style={{ marginBottom: 0, flex: 1 }}>
                  <span>Latest Coverage</span>
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                <button
                  onClick={() => setActiveCategory("All")}
                  className={`px-3 py-1 rounded-sm text-xs font-['Space_Grotesk'] font-500 transition-colors border ${
                    activeCategory === "All"
                      ? "bg-[#0096B4] text-white border-[#0096B4]"
                      : "border-gray-200 text-gray-500 hover:text-gray-800 hover:border-gray-300 bg-white"
                  }`}
                >
                  All
                </button>
                {categories.map((cat) => {
                  const colorMap: Record<string, string> = {
                    "Token Economics": "active:bg-[#E0F7FA] active:text-[#0096B4] active:border-[#0096B4]",
                    "LLM Research": "active:bg-[#EDE9FE] active:text-[#7C3AED] active:border-[#7C3AED]",
                    "GPU & Infrastructure": "active:bg-[#D1FAE5] active:text-[#059669] active:border-[#059669]",
                    "Industry News": "active:bg-[#FEE2E2] active:text-[#DC2626] active:border-[#DC2626]",
                    "Analysis": "active:bg-[#FEF3C7] active:text-[#D97706] active:border-[#D97706]",
                    "Opinion": "active:bg-[#FCE7F3] active:text-[#DB2777] active:border-[#DB2777]",
                  };
                  const activeStyles: Record<string, string> = {
                    "Token Economics": "bg-[#E0F7FA] text-[#0096B4] border-[#0096B4]",
                    "LLM Research": "bg-[#EDE9FE] text-[#7C3AED] border-[#7C3AED]",
                    "GPU & Infrastructure": "bg-[#D1FAE5] text-[#059669] border-[#059669]",
                    "Industry News": "bg-[#FEE2E2] text-[#DC2626] border-[#DC2626]",
                    "Analysis": "bg-[#FEF3C7] text-[#D97706] border-[#D97706]",
                    "Opinion": "bg-[#FCE7F3] text-[#DB2777] border-[#DB2777]",
                  };
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1 rounded-sm text-xs font-['Space_Grotesk'] font-500 transition-colors border ${
                        activeCategory === cat
                          ? activeStyles[cat]
                          : "border-gray-200 text-gray-500 hover:text-gray-800 hover:border-gray-300 bg-white"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Article Grid — 2 col */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredArticles.map((article, i) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    variant="default"
                    style={{ animationDelay: `${i * 40}ms` }}
                  />
                ))}
              </div>

              {/* Load More */}
              <div className="mt-6 text-center">
                <button className="px-6 py-2.5 border border-gray-200 rounded-sm text-sm font-['Space_Grotesk'] font-500 text-gray-600 hover:text-[#0096B4] hover:border-[#0096B4]/40 transition-colors">
                  Load More Articles
                </button>
              </div>
            </div>
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <aside className="space-y-6">
            {/* More Stories compact list */}
            <div>
              <div className="section-heading">
                <span>More Stories</span>
              </div>
              <div className="space-y-0 divide-y divide-gray-100">
                {sidebarArticles.map((article) => (
                  <Link key={article.id} href={`/article/${article.slug}`}>
                    <div className="group py-3 cursor-pointer">
                      <CatBadge cat={article.category} />
                      <h3 className="font-['Space_Grotesk'] font-600 text-gray-900 text-sm leading-snug mt-1.5 group-hover:text-[#0096B4] transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1.5 text-gray-400 text-[11px] font-mono">
                        <span>{article.publishedAt}</span>
                        <span>·</span>
                        <Clock size={9} />
                        <span>{article.readTime}m</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/category/industry-news">
                <div className="mt-3 flex items-center gap-1 text-[#0096B4] text-xs font-['Space_Grotesk'] font-600 hover:underline cursor-pointer">
                  View all stories <ChevronRight size={13} />
                </div>
              </Link>
            </div>

            {/* Trending Topics */}
            <div>
              <div className="section-heading">
                <span>Trending Topics</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["GPT-4o", "H200 GPU", "Claude 3.7", "DeepSeek V3", "Token Pricing", "Inference Cost", "Fine-tuning", "RAG", "Context Window", "Mistral", "LLaMA 3.3", "AI Agents"].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-sm bg-gray-100 text-gray-600 text-xs font-['Space_Grotesk'] hover:bg-[#E0F7FA] hover:text-[#0096B4] transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Newsletter Mini */}
            <div className="rounded-sm border border-gray-200 bg-gray-50 p-5">
              <h3 className="font-['Space_Grotesk'] font-700 text-gray-900 text-sm mb-1.5">
                Daily AI Brief
              </h3>
              <p className="text-gray-500 text-xs mb-3 font-['Source_Serif_4'] leading-relaxed">
                Join 12,000+ AI professionals. Free, every morning.
              </p>
              <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-white border border-gray-200 rounded-sm px-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0096B4]/60 font-['Space_Grotesk'] transition-colors"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-[#0096B4] text-white rounded-sm text-xs font-['Space_Grotesk'] font-600 hover:bg-[#007A94] transition-colors"
                >
                  Subscribe Free
                </button>
              </form>
            </div>

            {/* About Box */}
            <div className="rounded-sm border border-gray-200 p-5">
              <h3 className="font-['Space_Grotesk'] font-700 text-gray-900 text-sm mb-2">
                About Token Continent
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed font-['Source_Serif_4']">
                Independent daily coverage of AI token economics, large language model research, GPU infrastructure, and the business of artificial intelligence. Written for practitioners, researchers, and enterprise decision-makers.
              </p>
              <Link href="/category/analysis">
                <div className="mt-3 flex items-center gap-1 text-[#0096B4] text-xs font-['Space_Grotesk'] font-600 hover:underline cursor-pointer">
                  Read our analysis <ChevronRight size={13} />
                </div>
              </Link>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
