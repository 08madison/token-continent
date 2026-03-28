/*
 * TokenLedger — Category Page
 * Design: Terminal Noir — category-filtered article grid
 * SEO: Category-specific meta tags and structured content
 */

import { useParams, Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { articles, getAllCategories, CATEGORY_COLORS, type Category } from "@/lib/articles";

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
      <div className="min-h-screen bg-[oklch(0.098_0.008_264)] flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="font-mono text-[oklch(0.82_0.18_195)] text-sm mb-2">404</p>
            <h1 className="font-['Space_Grotesk'] font-700 text-[oklch(0.91_0.006_65)] text-2xl mb-4">Category Not Found</h1>
            <Link href="/">
              <button className="flex items-center gap-2 px-4 py-2 bg-[oklch(0.82_0.18_195)] text-[oklch(0.098_0.008_264)] rounded-sm text-sm font-['Space_Grotesk'] font-600">
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
  const colorClass = CATEGORY_COLORS[category];

  return (
    <div className="min-h-screen bg-[oklch(0.098_0.008_264)] flex flex-col">
      <Navbar />

      {/* Category Header */}
      <div className="border-b border-[oklch(0.22_0.008_264)] bg-[oklch(0.11_0.008_264)]">
        <div className="container py-8">
          <Link href="/">
            <button className="flex items-center gap-1.5 text-[oklch(0.55_0.016_264)] hover:text-[oklch(0.82_0.18_195)] transition-colors text-xs font-['Space_Grotesk'] mb-4">
              <ArrowLeft size={12} /> Back to Home
            </button>
          </Link>
          <div className="flex items-center gap-3">
            <span className={`category-badge border ${colorClass} text-sm px-3 py-1`}>
              {category}
            </span>
            <div className="h-px flex-1 bg-[oklch(0.22_0.008_264)]" />
            <span className="font-mono text-[oklch(0.45_0.008_264)] text-xs">{categoryArticles.length} articles</span>
          </div>
          <h1 className="font-['Space_Grotesk'] font-700 text-[oklch(0.91_0.006_65)] text-2xl mt-3">
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
                style={{ animationDelay: `${i * 60}ms` }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-[oklch(0.45_0.008_264)] font-['Source_Serif_4']">No articles in this category yet.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
