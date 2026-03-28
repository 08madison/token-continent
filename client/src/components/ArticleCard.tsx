/*
 * TokenLedger — ArticleCard Component
 * Design: Terminal Noir — dark editorial card with category accent border
 * Features: Category badge, image, title, excerpt, author, read time
 */

import { Link } from "wouter";
import { Clock, ArrowRight } from "lucide-react";
import { Article, CATEGORY_COLORS, CATEGORY_BORDER } from "@/lib/articles";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "featured" | "compact" | "horizontal";
  style?: React.CSSProperties;
}

export default function ArticleCard({ article, variant = "default", style }: ArticleCardProps) {
  const categoryColor = CATEGORY_COLORS[article.category];
  const borderColor = CATEGORY_BORDER[article.category];

  if (variant === "featured") {
    return (
      <Link href={`/article/${article.slug}`}>
        <article
          className={`group relative overflow-hidden rounded-sm border border-[oklch(0.22_0.008_264)] border-l-2 ${borderColor} bg-[oklch(0.11_0.008_264)] hover:bg-[oklch(0.14_0.008_264)] transition-all duration-200 cursor-pointer h-full`}
          style={style}
        >
          {/* Image */}
          <div className="relative overflow-hidden aspect-[16/9]">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.11_0.008_264)] via-[oklch(0.11_0.008_264/0.3)] to-transparent" />
            <div className="absolute bottom-3 left-3">
              <span className={`category-badge border ${categoryColor}`}>
                {article.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <h2 className="font-['Space_Grotesk'] font-700 text-[oklch(0.91_0.006_65)] text-xl leading-tight mb-3 group-hover:text-[oklch(0.82_0.18_195)] transition-colors line-clamp-2">
              {article.title}
            </h2>
            <p className="text-[oklch(0.55_0.016_264)] text-sm leading-relaxed mb-4 line-clamp-2 font-['Source_Serif_4']">
              {article.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[oklch(0.22_0.008_264)] flex items-center justify-center">
                  <span className="text-[oklch(0.82_0.18_195)] text-[9px] font-mono font-700">
                    {article.author.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <span className="text-[oklch(0.45_0.008_264)] text-xs font-['Space_Grotesk']">{article.author}</span>
              </div>
              <div className="flex items-center gap-1 text-[oklch(0.35_0.008_264)]">
                <Clock size={10} />
                <span className="font-mono text-[10px]">{article.readTime}m</span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={`/article/${article.slug}`}>
        <article
          className={`group flex gap-3 p-3 rounded-sm border-l-2 ${borderColor} border border-transparent hover:border-[oklch(0.22_0.008_264)] hover:bg-[oklch(0.13_0.008_264)] transition-all duration-200 cursor-pointer`}
          style={style}
        >
          <div className="flex-1 min-w-0">
            <span className={`category-badge border ${categoryColor} mb-1.5 inline-block`}>
              {article.category}
            </span>
            <h3 className="font-['Space_Grotesk'] font-600 text-[oklch(0.85_0.006_65)] text-sm leading-snug group-hover:text-[oklch(0.82_0.18_195)] transition-colors line-clamp-2 mb-1">
              {article.title}
            </h3>
            <div className="flex items-center gap-2 text-[oklch(0.35_0.008_264)]">
              <span className="font-mono text-[10px]">{article.publishedAt}</span>
              <span className="text-[oklch(0.22_0.008_264)]">·</span>
              <Clock size={9} />
              <span className="font-mono text-[10px]">{article.readTime}m read</span>
            </div>
          </div>
          {article.image && (
            <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-sm">
              <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
          )}
        </article>
      </Link>
    );
  }

  if (variant === "horizontal") {
    return (
      <Link href={`/article/${article.slug}`}>
        <article
          className={`group flex gap-4 p-4 rounded-sm border border-[oklch(0.22_0.008_264)] border-l-2 ${borderColor} bg-[oklch(0.11_0.008_264)] hover:bg-[oklch(0.14_0.008_264)] transition-all duration-200 cursor-pointer`}
          style={style}
        >
          <div className="w-32 h-24 flex-shrink-0 overflow-hidden rounded-sm">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          </div>
          <div className="flex-1 min-w-0">
            <span className={`category-badge border ${categoryColor} mb-2 inline-block`}>
              {article.category}
            </span>
            <h3 className="font-['Space_Grotesk'] font-600 text-[oklch(0.91_0.006_65)] text-sm leading-snug group-hover:text-[oklch(0.82_0.18_195)] transition-colors line-clamp-2 mb-1.5">
              {article.title}
            </h3>
            <p className="text-[oklch(0.45_0.008_264)] text-xs leading-relaxed line-clamp-1 font-['Source_Serif_4'] mb-2">
              {article.excerpt}
            </p>
            <div className="flex items-center gap-2 text-[oklch(0.35_0.008_264)]">
              <span className="font-['Space_Grotesk'] text-[10px]">{article.author}</span>
              <span>·</span>
              <Clock size={9} />
              <span className="font-mono text-[10px]">{article.readTime}m</span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  // Default card
  return (
    <Link href={`/article/${article.slug}`}>
      <article
        className={`group article-card rounded-sm border border-[oklch(0.22_0.008_264)] border-l-2 ${borderColor} bg-[oklch(0.11_0.008_264)] overflow-hidden cursor-pointer h-full flex flex-col`}
        style={style}
      >
        {/* Image */}
        <div className="relative overflow-hidden aspect-[16/9]">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.11_0.008_264/0.6)] to-transparent" />
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <span className={`category-badge border ${categoryColor} mb-2.5 self-start`}>
            {article.category}
          </span>
          <h3 className="font-['Space_Grotesk'] font-700 text-[oklch(0.91_0.006_65)] text-base leading-snug mb-2 group-hover:text-[oklch(0.82_0.18_195)] transition-colors line-clamp-2 flex-1">
            {article.title}
          </h3>
          <p className="text-[oklch(0.45_0.008_264)] text-xs leading-relaxed line-clamp-2 font-['Source_Serif_4'] mb-3">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-[oklch(0.22_0.008_264/0.5)]">
            <span className="font-['Space_Grotesk'] text-[oklch(0.45_0.008_264)] text-[11px]">{article.author}</span>
            <div className="flex items-center gap-1 text-[oklch(0.35_0.008_264)]">
              <Clock size={9} />
              <span className="font-mono text-[10px]">{article.readTime}m</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
