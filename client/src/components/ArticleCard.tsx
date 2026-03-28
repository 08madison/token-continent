/*
 * Token Continent — ArticleCard Component
 * Design: Editorial Light — clean white card with category accent
 * Variants: default, featured, compact, horizontal
 */

import { Link } from "wouter";
import { Clock } from "lucide-react";
import { Article } from "@/lib/articles";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "featured" | "compact" | "horizontal";
  style?: React.CSSProperties;
}

const CAT_BADGE_CLASS: Record<string, string> = {
  "Token Economics": "cat-token",
  "LLM Research": "cat-llm",
  "GPU & Infrastructure": "cat-gpu",
  "Industry News": "cat-news",
  "Analysis": "cat-analysis",
  "Opinion": "cat-opinion",
};

function CatBadge({ cat }: { cat: string }) {
  return <span className={`cat-badge ${CAT_BADGE_CLASS[cat] ?? "cat-news"}`}>{cat}</span>;
}

const CAT_BORDER: Record<string, string> = {
  "Token Economics": "border-l-[#0096B4]",
  "LLM Research": "border-l-[#7C3AED]",
  "GPU & Infrastructure": "border-l-[#059669]",
  "Industry News": "border-l-[#DC2626]",
  "Analysis": "border-l-[#D97706]",
  "Opinion": "border-l-[#DB2777]",
};

export default function ArticleCard({ article, variant = "default", style }: ArticleCardProps) {
  const borderClass = CAT_BORDER[article.category] ?? "border-l-gray-300";

  if (variant === "featured") {
    return (
      <Link href={`/article/${article.slug}`}>
        <article
          className={`group article-card border-l-2 ${borderClass} overflow-hidden cursor-pointer h-full flex flex-col`}
          style={style}
        >
          <div className="relative overflow-hidden aspect-[16/9]">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-4 flex flex-col flex-1">
            <CatBadge cat={article.category} />
            <h2 className="font-['Space_Grotesk'] font-700 text-gray-900 text-base leading-snug mt-2 mb-2 group-hover:text-[#0096B4] transition-colors line-clamp-2 flex-1">
              {article.title}
            </h2>
            <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 font-['Source_Serif_4'] mb-3">
              {article.excerpt}
            </p>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className="font-['Space_Grotesk'] text-gray-500 text-[11px]">{article.author}</span>
              <div className="flex items-center gap-1 text-gray-400">
                <Clock size={9} />
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
          className={`group flex gap-3 py-3 border-b border-gray-100 last:border-0 cursor-pointer`}
          style={style}
        >
          <div className="flex-1 min-w-0">
            <CatBadge cat={article.category} />
            <h3 className="font-['Space_Grotesk'] font-600 text-gray-900 text-sm leading-snug group-hover:text-[#0096B4] transition-colors line-clamp-2 mt-1.5 mb-1">
              {article.title}
            </h3>
            <div className="flex items-center gap-2 text-gray-400">
              <span className="font-mono text-[10px]">{article.publishedAt}</span>
              <span>·</span>
              <Clock size={9} />
              <span className="font-mono text-[10px]">{article.readTime}m</span>
            </div>
          </div>
          {article.image && (
            <div className="w-16 h-14 flex-shrink-0 overflow-hidden rounded-sm">
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
          className={`group article-card border-l-2 ${borderClass} flex gap-4 p-4 cursor-pointer`}
          style={style}
        >
          <div className="w-28 h-20 flex-shrink-0 overflow-hidden rounded-sm">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          </div>
          <div className="flex-1 min-w-0">
            <CatBadge cat={article.category} />
            <h3 className="font-['Space_Grotesk'] font-600 text-gray-900 text-sm leading-snug group-hover:text-[#0096B4] transition-colors line-clamp-2 mt-1.5 mb-1">
              {article.title}
            </h3>
            <div className="flex items-center gap-2 text-gray-400 text-[11px]">
              <span className="font-['Space_Grotesk']">{article.author}</span>
              <span>·</span>
              <Clock size={9} />
              <span className="font-mono">{article.readTime}m</span>
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
        className={`group article-card border-l-2 ${borderClass} overflow-hidden cursor-pointer h-full flex flex-col`}
        style={style}
      >
        <div className="relative overflow-hidden aspect-[16/9]">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-4 flex flex-col flex-1">
          <CatBadge cat={article.category} />
          <h3 className="font-['Space_Grotesk'] font-700 text-gray-900 text-sm leading-snug mt-2 mb-2 group-hover:text-[#0096B4] transition-colors line-clamp-2 flex-1">
            {article.title}
          </h3>
          <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 font-['Source_Serif_4'] mb-3">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <span className="font-['Space_Grotesk'] text-gray-500 text-[11px]">{article.author}</span>
            <div className="flex items-center gap-1 text-gray-400">
              <Clock size={9} />
              <span className="font-mono text-[10px]">{article.readTime}m</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
