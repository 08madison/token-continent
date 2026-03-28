/*
 * Token Continent — Navbar
 * Design: Editorial Light — clean white header, newspaper-style
 * Features: Live token ticker, category nav, search, subscribe CTA
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Search, Menu, X, Globe } from "lucide-react";
import { getAllCategories, TICKER_ITEMS } from "@/lib/articles";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const categories = getAllCategories();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${scrolled ? "shadow-[0_2px_16px_rgba(0,0,0,0.07)]" : "border-b border-gray-200"}`}>
      {/* Ticker Tape */}
      <div className="bg-gray-50 border-b border-gray-200 overflow-hidden py-1.5">
        <div className="flex items-center">
          <div className="flex-shrink-0 flex items-center gap-1.5 pl-4 pr-3 border-r border-gray-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0096B4] animate-pulse" />
            <span className="font-mono text-[9px] font-700 text-[#0096B4] uppercase tracking-widest">LIVE</span>
          </div>
          <div className="ticker-wrap flex-1 overflow-hidden">
            <div className="ticker-inner">
              {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                <span key={i} className="inline-flex items-center gap-2 mr-8">
                  <span className="font-mono text-[10px] font-500 text-gray-500 tracking-wide uppercase">{item.label}</span>
                  <span className="font-mono text-[11px] font-700 text-gray-800">{item.value}</span>
                  <span className={`font-mono text-[10px] font-600 ${
                    item.change.startsWith("-") ? "text-red-500" :
                    item.change === "NEW" ? "text-amber-500" :
                    "text-emerald-600"
                  }`}>{item.change}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-sm bg-[#0096B4] flex items-center justify-center flex-shrink-0">
                <Globe size={16} className="text-white" />
              </div>
              <span className="font-['Space_Grotesk'] font-800 text-gray-900 text-lg tracking-tight leading-none">
                Token<span className="text-[#0096B4]">Continent</span>
              </span>
            </div>
          </Link>

          {/* Desktop Category Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {categories.map((cat) => {
              const slug = cat.toLowerCase().replace(/[^a-z0-9]+/g, "-");
              const isActive = location.includes(slug);
              return (
                <Link key={cat} href={`/category/${slug}`}>
                  <span className={`px-3 py-1.5 rounded-sm text-[13px] font-['Space_Grotesk'] font-500 transition-colors whitespace-nowrap ${
                    isActive
                      ? "bg-[#E0F7FA] text-[#0096B4] font-600"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}>
                    {cat}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-gray-200 text-gray-500 hover:text-gray-800 hover:border-gray-300 transition-colors text-xs font-['Space_Grotesk']">
              <Search size={13} />
              <span className="hidden md:inline">Search</span>
              <kbd className="hidden md:inline text-[10px] bg-gray-100 px-1 rounded font-mono">⌘K</kbd>
            </button>
            <a href="#newsletter">
              <button className="px-4 py-1.5 bg-[#0096B4] text-white rounded-sm text-xs font-['Space_Grotesk'] font-600 hover:bg-[#007A94] transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </a>
            <button
              className="lg:hidden p-1.5 text-gray-500 hover:text-gray-800"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="container py-3 space-y-0.5">
            {categories.map((cat) => {
              const slug = cat.toLowerCase().replace(/[^a-z0-9]+/g, "-");
              return (
                <Link key={cat} href={`/category/${slug}`}>
                  <div
                    className="px-3 py-2.5 rounded-sm text-sm font-['Space_Grotesk'] font-500 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {cat}
                  </div>
                </Link>
              );
            })}
            <div className="pt-2 mt-1 border-t border-gray-100">
              <a href="#newsletter" onClick={() => setMenuOpen(false)}>
                <div className="px-3 py-2.5 bg-[#0096B4] text-white rounded-sm text-sm font-['Space_Grotesk'] font-600 text-center">
                  Subscribe to Newsletter
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
