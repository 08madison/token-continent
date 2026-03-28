/*
 * Token Continent — Category Page
 * Design: Editorial Light — clean category archive
 */

import { useParams, Link } from "wouter";
import { ArrowLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { articles, getAllCategories, type Category } from "@/lib/articles";

const CAT_BADGE_CLASS: Record<string, string> = {
  "Token Economics": "cat-token",
  "LLM Research": "cat-llm",
  "GPU & Infrastructure": "cat-gpu",
  "Industry News": "cat-news",
  "Analysis": "cat-analysis",
  "Opinion": "cat-opinion",
};

function slugToCategory(slug: string): Category | null {
  const categories = getAllCategories();
  return categories.find(
    (c) => c.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug
  ) || null;
}

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const category = slugToCategory(slug || "");

  if (!category) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="font-mono text-[#0096B4] text-sm mb-2">404</p>
            <h1 className="font-['Space_Grotesk'] font-700 text-gray-900 text-2xl mb-4">Category Not Found</h1>
            <Link href="/">
              <button className="flex items-center gap-2 px-4 py-2 bg-[#0096B4] text-white rounded-sm text-sm font-['Space_Grotesk'] font-600">
                <ArrowLeft size={14} /> Back to Home
              </button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const categoryArticles = articles.filter((a) => a.category === category);
  const badgeClass = CAT_BADGE_CLASS[category] ?? "cat-news";

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="container py-2.5 flex items-center gap-2 text-xs font-['Space_Grotesk'] text-gray-400">
          <Link href="/"><span className="hover:text-[#0096B4] transition-colors cursor-pointer">Home</span></Link>
          <ChevronRight size={12} />
          <span className="text-gray-600">{category}</span>
        </div>
      </div>

      {/* Category Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container py-6">
          <div className="flex items-center gap-3 mb-2">
            <span className={`cat-badge ${badgeClass} text-sm px-3 py-1`}>{category}</span>
            <span className="font-mono text-gray-400 text-xs">{categoryArticles.length} articles</span>
          </div>
          <h1 className="font-['Space_Grotesk'] font-800 text-gray-900 text-2xl tracking-tight">
            {category}
          </h1>
        </div>
      </div>

      <main className="container py-8 flex-1">
        {categoryArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryArticles.map((article, i) => (
              <ArticleCard
                key={article.id}
                article={article}
                variant="default"
                style={{ animationDelay: `${i * 50}ms` }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 font-['Source_Serif_4']">No articles in this category yet.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
