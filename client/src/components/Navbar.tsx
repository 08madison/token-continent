/*
 * TokenLedger — Navbar Component
 * Design: Terminal Noir — sticky top nav with live ticker tape
 * Features: Logo, category nav, search, ticker tape with token prices
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Search, Menu, X, Zap } from "lucide-react";
import { getAllCategories, TICKER_ITEMS } from "@/lib/articles";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = getAllCategories();

  return (
    <>
      {/* Ticker Tape */}
      <div className="bg-[oklch(0.11_0.008_264)] border-b border-[oklch(0.22_0.008_264)] overflow-hidden">
        <div className="flex items-center">
          <div className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-[oklch(0.82_0.18_195)] text-[oklch(0.098_0.008_264)] z-10">
            <Zap size={11} strokeWidth={2.5} />
            <span className="font-mono text-[10px] font-700 tracking-widest uppercase">Live</span>
          </div>
          <div className="overflow-hidden flex-1">
            <div className="ticker-scroll flex gap-0 whitespace-nowrap">
              {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                <span key={i} className="inline-flex items-center gap-2 px-5 py-1.5 border-r border-[oklch(0.22_0.008_264)]">
                  <span className="font-mono text-[10px] text-[oklch(0.55_0.016_264)] uppercase tracking-wide">{item.label}</span>
                  <span className="font-mono text-[10px] font-600 text-[oklch(0.91_0.006_65)]">{item.value}</span>
                  <span className={`font-mono text-[10px] font-600 ${
                    item.change.startsWith("-") ? "text-[oklch(0.82_0.18_195)]" :
                    item.change === "NEW" ? "text-amber-400" :
                    "text-[oklch(0.55_0.016_264)]"
                  }`}>{item.change}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[oklch(0.098_0.008_264/0.95)] backdrop-blur-md border-b border-[oklch(0.22_0.008_264)]"
          : "bg-[oklch(0.098_0.008_264)] border-b border-[oklch(0.22_0.008_264)]"
      }`}>
        <div className="container">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-7 h-7 rounded-sm bg-[oklch(0.82_0.18_195)] flex items-center justify-center">
                <span className="font-mono text-[oklch(0.098_0.008_264)] text-xs font-700">TL</span>
              </div>
              <span className="font-['Space_Grotesk'] font-700 text-[oklch(0.91_0.006_65)] text-lg tracking-tight group-hover:text-[oklch(0.82_0.18_195)] transition-colors">
                Token<span className="text-[oklch(0.82_0.18_195)]">Ledger</span>
              </span>
            </Link>

            {/* Desktop Category Nav */}
            <div className="hidden lg:flex items-center gap-0.5">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/category/${cat.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  className={`px-3 py-1.5 text-xs font-['Space_Grotesk'] font-500 tracking-wide transition-colors rounded-sm ${
                    location.includes(cat.toLowerCase().replace(/[^a-z0-9]+/g, "-"))
                      ? "text-[oklch(0.82_0.18_195)] bg-[oklch(0.82_0.18_195/0.1)]"
                      : "text-[oklch(0.55_0.016_264)] hover:text-[oklch(0.91_0.006_65)]"
                  }`}
                >
                  {cat}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-sm border border-[oklch(0.22_0.008_264)] text-[oklch(0.55_0.016_264)] hover:border-[oklch(0.82_0.18_195/0.4)] hover:text-[oklch(0.82_0.18_195)] transition-all text-xs font-mono">
                <Search size={12} />
                <span>Search</span>
                <span className="text-[10px] opacity-50">⌘K</span>
              </button>
              <a
                href="#newsletter"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[oklch(0.82_0.18_195)] text-[oklch(0.098_0.008_264)] rounded-sm text-xs font-['Space_Grotesk'] font-600 hover:bg-[oklch(0.88_0.18_195)] transition-colors"
              >
                Subscribe
              </a>
              <button
                className="lg:hidden p-1.5 text-[oklch(0.55_0.016_264)] hover:text-[oklch(0.91_0.006_65)] transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-[oklch(0.22_0.008_264)] bg-[oklch(0.11_0.008_264)]">
            <div className="container py-3 flex flex-col gap-1">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/category/${cat.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  className="px-3 py-2 text-sm font-['Space_Grotesk'] text-[oklch(0.75_0.008_65)] hover:text-[oklch(0.82_0.18_195)] hover:bg-[oklch(0.82_0.18_195/0.05)] rounded-sm transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {cat}
                </Link>
              ))}
              <div className="mt-2 pt-2 border-t border-[oklch(0.22_0.008_264)]">
                <a
                  href="#newsletter"
                  className="flex items-center justify-center gap-1.5 px-3 py-2 bg-[oklch(0.82_0.18_195)] text-[oklch(0.098_0.008_264)] rounded-sm text-sm font-['Space_Grotesk'] font-600"
                  onClick={() => setMenuOpen(false)}
                >
                  Subscribe to Newsletter
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
