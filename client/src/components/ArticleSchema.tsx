/*
 * TokenLedger — Article Schema Component
 * Injects JSON-LD structured data for NewsArticle schema
 * Required for Google rich results and GEO citations
 */

import { useEffect } from "react";
import { Article } from "@/lib/articles";

interface ArticleSchemaProps {
  article: Article;
}

export default function ArticleSchema({ article }: ArticleSchemaProps) {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": article.title,
      "description": article.excerpt,
      "image": article.image,
      "datePublished": article.publishedAt,
      "dateModified": article.publishedAt,
      "author": {
        "@type": "Person",
        "name": article.author,
        "jobTitle": article.authorRole,
        "url": `https://tokenledger.ai/author/${article.author.toLowerCase().replace(/\s+/g, "-")}`
      },
      "publisher": {
        "@type": "NewsMediaOrganization",
        "name": "TokenLedger",
        "url": "https://tokenledger.ai",
        "logo": {
          "@type": "ImageObject",
          "url": "https://tokenledger.ai/favicon.svg"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://tokenledger.ai/article/${article.slug}`
      },
      "articleSection": article.category,
      "keywords": article.tags.join(", "),
      "wordCount": article.content.split(/\s+/).length,
      "timeRequired": `PT${article.readTime}M`
    };

    const existing = document.querySelector('script[data-schema="article"]');
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-schema", "article");
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const el = document.querySelector('script[data-schema="article"]');
      if (el) el.remove();
    };
  }, [article]);

  return null;
}
