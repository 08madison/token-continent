/*
 * TokenLedger — Article Detail Page
 * Design: Terminal Noir — focused reading layout with sidebar
 * Features: Reading progress bar, structured content, related articles, social share, CTAs
 * SEO: Article schema markup, canonical URLs, author metadata
 */

import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { ArrowLeft, Clock, Calendar, Share2, Twitter, Linkedin, ArrowRight, Cpu, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import ArticleSchema from "@/components/ArticleSchema";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { getArticleBySlug, articles, CATEGORY_COLORS, CATEGORY_BORDER } from "@/lib/articles";

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
      <div className="min-h-screen bg-[oklch(0.098_0.008_264)] flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="font-mono text-[oklch(0.82_0.18_195)] text-sm mb-2">404</p>
            <h1 className="font-['Space_Grotesk'] font-700 text-[oklch(0.91_0.006_65)] text-2xl mb-4">Article Not Found</h1>
            <Link href="/">
              <button className="flex items-center gap-2 px-4 py-2 bg-[oklch(0.82_0.18_195)] text-[oklch(0.098_0.008_264)] rounded-sm text-sm font-['Space_Grotesk'] font-600">
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

  const categoryColor = CATEGORY_COLORS[article.category];
  const borderColor = CATEGORY_BORDER[article.category];
  const relatedArticles = articles
    .filter((a) => a.id !== article.id && (a.category === article.category || a.tags.some((t) => article.tags.includes(t))))
    .slice(0, 3);

  const articleUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="min-h-screen bg-[oklch(0.098_0.008_264)] flex flex-col">
      {article && <ArticleSchema article={article} />}

      {/* Reading Progress */}
      <div
        className="reading-progress"
        style={{ width: `${readingProgress}%` }}
      />

      <Navbar />

      {/* Article Hero */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${article.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.098_0.008_264/0.7)] via-[oklch(0.098_0.008_264/0.85)] to-[oklch(0.098_0.008_264)]" />
        <div className="relative container py-12 lg:py-16">
          <Link href="/">
            <button className="flex items-center gap-1.5 text-[oklch(0.55_0.016_264)] hover:text-[oklch(0.82_0.18_195)] transition-colors text-xs font-['Space_Grotesk'] mb-6">
              <ArrowLeft size={12} />
              Back to Home
            </button>
          </Link>
          <div className="max-w-3xl">
            <span className={`category-badge border ${categoryColor} mb-4 inline-block`}>
              {article.category}
            </span>
            <h1 className="font-['Space_Grotesk'] font-700 text-[oklch(0.96_0.006_65)] text-2xl sm:text-3xl lg:text-4xl leading-tight mb-4 tracking-tight">
              {article.title}
            </h1>
            <p className="text-[oklch(0.65_0.008_65)] text-base sm:text-lg leading-relaxed mb-6 font-['Source_Serif_4']">
              {article.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-[oklch(0.45_0.008_264)] text-xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[oklch(0.22_0.008_264)] flex items-center justify-center">
                  <span className="text-[oklch(0.82_0.18_195)] text-[9px] font-mono font-700">
                    {article.author.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <span className="font-['Space_Grotesk'] text-[oklch(0.75_0.008_65)]">{article.author}</span>
                  <span className="text-[oklch(0.35_0.008_264)] ml-1">· {article.authorRole}</span>
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
        </div>
      </div>

      {/* Article Content */}
      <main className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
          {/* Article Body */}
          <article className={`border-l-2 ${borderColor} pl-6`}>
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {article.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded-sm bg-[oklch(0.16_0.008_264)] text-[oklch(0.55_0.016_264)] text-[10px] font-mono">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Content */}
            <div
              className="article-prose"
              dangerouslySetInnerHTML={{
                __html: article.content
                  .replace(/^## (.+)$/gm, '<h2>$1</h2>')
                  .replace(/^### (.+)$/gm, '<h3>$1</h3>')
                  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                  .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
                  .replace(/\n\n/g, '</p><p>')
                  .replace(/^(?!<h[23]|<blockquote)(.+)$/gm, (match) => {
                    if (match.startsWith('<')) return match;
                    return match;
                  })
                  .split('\n')
                  .filter(line => line.trim())
                  .map(line => {
                    if (line.startsWith('<h2>') || line.startsWith('<h3>') || line.startsWith('<blockquote>')) return line;
                    return `<p>${line}</p>`;
                  })
                  .join('\n')
              }}
            />

            {/* Share */}
            <div className="mt-10 pt-6 border-t border-[oklch(0.22_0.008_264)]">
              <div className="flex items-center gap-3">
                <span className="font-['Space_Grotesk'] text-xs text-[oklch(0.55_0.016_264)] uppercase tracking-widest">Share</span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(articleUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-[oklch(0.22_0.008_264)] text-[oklch(0.55_0.016_264)] hover:text-[oklch(0.82_0.18_195)] hover:border-[oklch(0.82_0.18_195/0.4)] transition-all text-xs font-['Space_Grotesk']"
                >
                  <Twitter size={12} />
                  Share on X
                </a>
                <a
                  href={`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-[oklch(0.22_0.008_264)] text-[oklch(0.55_0.016_264)] hover:text-blue-400 hover:border-blue-400/40 transition-all text-xs font-['Space_Grotesk']"
                >
                  <Linkedin size={12} />
                  Share on LinkedIn
                </a>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Token CTA */}
            <div className="rounded-sm border border-[oklch(0.82_0.18_195/0.3)] bg-gradient-to-br from-[oklch(0.82_0.18_195/0.08)] to-[oklch(0.13_0.008_264)] p-5 sticky top-20">
              <div className="flex items-center gap-2 mb-3">
                <Zap size={14} className="text-[oklch(0.82_0.18_195)]" />
                <span className="font-mono text-[10px] text-[oklch(0.82_0.18_195)] uppercase tracking-widest">Sponsored</span>
              </div>
              <h3 className="font-['Space_Grotesk'] font-700 text-[oklch(0.91_0.006_65)] text-sm mb-2">
                Access AI Tokens at Scale
              </h3>
              <p className="text-[oklch(0.45_0.008_264)] text-xs leading-relaxed mb-4 font-['Source_Serif_4']">
                Discounted access to GPT-4o, Claude, Gemini, and 20+ models. Volume pricing available.
              </p>
              <a
                href="#"
                className="flex items-center justify-center gap-2 w-full py-2 bg-[oklch(0.82_0.18_195)] text-[oklch(0.098_0.008_264)] rounded-sm text-xs font-['Space_Grotesk'] font-600 hover:bg-[oklch(0.88_0.18_195)] transition-colors mb-3"
              >
                Get API Access <ArrowRight size={12} />
              </a>
              <a
                href="#"
                className="flex items-center justify-center gap-2 w-full py-2 border border-blue-400/40 text-blue-400 rounded-sm text-xs font-['Space_Grotesk'] font-600 hover:bg-blue-400/10 transition-colors"
              >
                <Cpu size={12} />
                Rent H100/H200 GPUs
              </a>
            </div>
          </aside>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-12 pt-8 border-t border-[oklch(0.22_0.008_264)]">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-4 bg-[oklch(0.82_0.18_195)] rounded-full" />
              <h2 className="font-['Space_Grotesk'] font-700 text-[oklch(0.91_0.006_65)] text-sm uppercase tracking-widest">
                Related Coverage
              </h2>
              <div className="flex-1 h-px bg-[oklch(0.22_0.008_264)]" />
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
