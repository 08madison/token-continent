/*
 * Token Continent — Article Detail Page
 * Design: Editorial Light — focused reading layout, clean white background
 * Features: Reading progress bar, structured content, related articles, social share
 * No hard ads — only newsletter signup in sidebar
 */

import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { ArrowLeft, Clock, Calendar, Twitter, Linkedin, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import ArticleSchema from "@/components/ArticleSchema";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { getArticleBySlug, articles } from "@/lib/articles";

const CAT_BADGE_CLASS: Record<string, string> = {
  "Token Economics": "cat-token",
  "LLM Research": "cat-llm",
  "GPU & Infrastructure": "cat-gpu",
  "Industry News": "cat-news",
  "Analysis": "cat-analysis",
  "Opinion": "cat-opinion",
};

const CAT_BORDER: Record<string, string> = {
  "Token Economics": "border-l-[#0096B4]",
  "LLM Research": "border-l-[#7C3AED]",
  "GPU & Infrastructure": "border-l-[#059669]",
  "Industry News": "border-l-[#DC2626]",
  "Analysis": "border-l-[#D97706]",
  "Opinion": "border-l-[#DB2777]",
};

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const [readingProgress, setReadingProgress] = useState(0);
  const article = getArticleBySlug(slug || "");

  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setReadingProgress(Math.min(100, progress));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="font-mono text-[#0096B4] text-sm mb-2">404</p>
            <h1 className="font-['Space_Grotesk'] font-700 text-gray-900 text-2xl mb-4">Article Not Found</h1>
            <Link href="/">
              <button className="flex items-center gap-2 px-4 py-2 bg-[#0096B4] text-white rounded-sm text-sm font-['Space_Grotesk'] font-600">
                <ArrowLeft size={14} />
                Back to Home
              </button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const borderClass = CAT_BORDER[article.category] ?? "border-l-gray-300";
  const badgeClass = CAT_BADGE_CLASS[article.category] ?? "cat-news";
  const relatedArticles = articles
    .filter((a) => a.id !== article.id && (a.category === article.category || a.tags.some((t) => article.tags.includes(t))))
    .slice(0, 3);
  const moreArticles = articles.filter((a) => a.id !== article.id).slice(0, 5);
  const articleUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="reading-progress" style={{ width: `${readingProgress}%` }} />
      <Navbar />
      {article && <ArticleSchema article={article} />}

      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="container py-2.5 flex items-center gap-2 text-xs font-['Space_Grotesk'] text-gray-400">
          <Link href="/"><span className="hover:text-[#0096B4] transition-colors cursor-pointer">Home</span></Link>
          <ChevronRight size={12} />
          <Link href={`/category/${article.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
            <span className="hover:text-[#0096B4] transition-colors cursor-pointer">{article.category}</span>
          </Link>
          <ChevronRight size={12} />
          <span className="text-gray-600 truncate max-w-xs">{article.title}</span>
        </div>
      </div>

      <main className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
          {/* Article Body */}
          <article>
            {/* Header */}
            <div className={`border-l-4 ${borderClass} pl-5 mb-6`}>
              <span className={`cat-badge ${badgeClass} mb-3 inline-block`}>{article.category}</span>
              <h1 className="font-['Space_Grotesk'] font-800 text-gray-900 text-2xl sm:text-3xl leading-tight mb-3 tracking-tight">
                {article.title}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed font-['Source_Serif_4'] mb-4">
                {article.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-gray-400 text-xs font-['Space_Grotesk']">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#E0F7FA] flex items-center justify-center">
                    <span className="text-[#0096B4] text-[9px] font-mono font-700">
                      {article.author.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <span className="font-500 text-gray-700">{article.author}</span>
                    <span className="text-gray-400 ml-1">· {article.authorRole}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={11} />
                  <span className="font-mono">{article.publishedAt}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={11} />
                  <span className="font-mono">{article.readTime} min read</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="mb-6 rounded-sm overflow-hidden aspect-[16/9]">
              <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {article.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-0.5 rounded-sm bg-gray-100 text-gray-500 text-[11px] font-mono hover:bg-[#E0F7FA] hover:text-[#0096B4] transition-colors cursor-pointer">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Content */}
            <div
              className="article-prose"
              dangerouslySetInnerHTML={{
                __html: article.content
                  .split('\n')
                  .filter(line => line.trim())
                  .map(line => {
                    if (line.startsWith('## ')) return `<h2>${line.slice(3)}</h2>`;
                    if (line.startsWith('### ')) return `<h3>${line.slice(4)}</h3>`;
                    if (line.startsWith('> ')) return `<blockquote>${line.slice(2)}</blockquote>`;
                    const processed = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
                    return `<p>${processed}</p>`;
                  })
                  .join('\n')
              }}
            />

            {/* Share */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-['Space_Grotesk'] text-xs text-gray-400 uppercase tracking-widest">Share this article</span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(articleUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-gray-200 text-gray-500 hover:text-[#0096B4] hover:border-[#0096B4]/40 transition-all text-xs font-['Space_Grotesk']"
                >
                  <Twitter size={12} />
                  Share on X
                </a>
                <a
                  href={`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-300 transition-all text-xs font-['Space_Grotesk']"
                >
                  <Linkedin size={12} />
                  Share on LinkedIn
                </a>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Newsletter */}
            <div className="rounded-sm border border-gray-200 bg-gray-50 p-5 sticky top-20">
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

            {/* More from this category */}
            <div>
              <div className="section-heading">
                <span>More Stories</span>
              </div>
              <div className="space-y-0">
                {moreArticles.map((a) => (
                  <Link key={a.id} href={`/article/${a.slug}`}>
                    <div className="group py-3 border-b border-gray-100 last:border-0 cursor-pointer">
                      <span className={`cat-badge ${CAT_BADGE_CLASS[a.category] ?? "cat-news"}`}>{a.category}</span>
                      <h4 className="font-['Space_Grotesk'] font-600 text-gray-900 text-xs leading-snug mt-1.5 group-hover:text-[#0096B4] transition-colors line-clamp-2">
                        {a.title}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-1 text-gray-400 text-[10px] font-mono">
                        <span>{a.publishedAt}</span>
                        <span>·</span>
                        <Clock size={8} />
                        <span>{a.readTime}m</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="section-heading">
              <span>Related Coverage</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedArticles.map((a) => (
                <ArticleCard key={a.id} article={a} variant="default" />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
