/*
 * Token Continent — Footer
 * Design: Editorial Light — clean footer with social links and partner friendly links
 * No hard advertising — partner links presented as "Resources" / "Friendly Links"
 */

import { Link } from "wouter";
import { Globe, Twitter, Youtube, Linkedin, Instagram, MessageCircle } from "lucide-react";
import { getAllCategories } from "@/lib/articles";

const SOCIAL_LINKS = [
  { icon: <Twitter size={16} />, label: "X (Twitter)", href: "https://x.com/tokencontinentai", handle: "@tokencontinentai" },
  { icon: <Youtube size={16} />, label: "YouTube", href: "https://youtube.com/@tokencontinentai", handle: "TokenContinent" },
  { icon: <Linkedin size={16} />, label: "LinkedIn", href: "https://linkedin.com/company/tokencontinentai", handle: "Token Continent" },
  { icon: <Instagram size={16} />, label: "Instagram", href: "https://instagram.com/tokencontinentai", handle: "@tokencontinentai" },
  { icon: <MessageCircle size={16} />, label: "Discord", href: "https://discord.gg/tokencontinentai", handle: "Join Community" },
];

const PARTNER_LINKS = [
  { label: "OpenAI Token Marketplace", href: "#" },
  { label: "Anthropic API Access", href: "#" },
  { label: "GPU Cloud Rentals", href: "#" },
  { label: "CoreWeave H100/H200", href: "#" },
  { label: "Lambda Labs GPU", href: "#" },
  { label: "Vast.ai GPU Marketplace", href: "#" },
];

export default function Footer() {
  const categories = getAllCategories();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12">
      {/* Newsletter Section */}
      <div id="newsletter" className="bg-[#0096B4]">
        <div className="container py-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-['Space_Grotesk'] font-700 text-white text-xl mb-2">
              Daily AI Intelligence Brief
            </h2>
            <p className="text-[#B2EAF5] text-sm mb-5 font-['Source_Serif_4']">
              Join 12,000+ AI professionals. Get the day's top stories on LLM tokens, GPU markets, and model releases — free, every morning.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-2.5 rounded-sm bg-white/15 border border-white/30 text-white placeholder-white/60 text-sm focus:outline-none focus:border-white/60 font-['Space_Grotesk'] transition-colors"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-white text-[#0096B4] rounded-sm text-sm font-['Space_Grotesk'] font-700 hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                Subscribe Free
              </button>
            </form>
            <p className="text-white/50 text-xs mt-3 font-['Space_Grotesk']">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-sm bg-[#0096B4] flex items-center justify-center">
                <Globe size={14} className="text-white" />
              </div>
              <span className="font-['Space_Grotesk'] font-800 text-gray-900 text-base tracking-tight">
                Token<span className="text-[#0096B4]">Continent</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed font-['Source_Serif_4'] mb-4">
              The independent intelligence platform for AI token economics, LLM research, and GPU infrastructure. Published daily for AI professionals worldwide.
            </p>
            {/* Social Links */}
            <div className="flex flex-wrap gap-2">
              {SOCIAL_LINKS.map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center rounded-sm border border-gray-200 text-gray-500 hover:text-[#0096B4] hover:border-[#0096B4]/40 hover:bg-[#E0F7FA] transition-all"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Coverage Column */}
          <div>
            <h3 className="font-['Space_Grotesk'] font-700 text-gray-800 text-xs uppercase tracking-widest mb-3">Coverage</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link href={`/category/${cat.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                    <span className="text-gray-500 hover:text-[#0096B4] text-sm font-['Space_Grotesk'] transition-colors">
                      {cat}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us Column */}
          <div>
            <h3 className="font-['Space_Grotesk'] font-700 text-gray-800 text-xs uppercase tracking-widest mb-3">Follow Us</h3>
            <ul className="space-y-2.5">
              {SOCIAL_LINKS.map(({ icon, label, href, handle }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-500 hover:text-[#0096B4] transition-colors group"
                  >
                    <span className="text-gray-400 group-hover:text-[#0096B4] transition-colors">{icon}</span>
                    <div>
                      <div className="text-xs font-['Space_Grotesk'] font-500 text-gray-700 group-hover:text-[#0096B4] transition-colors leading-none">{label}</div>
                      <div className="text-[11px] text-gray-400 font-mono leading-none mt-0.5">{handle}</div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Friendly Links Column */}
          <div>
            <h3 className="font-['Space_Grotesk'] font-700 text-gray-800 text-xs uppercase tracking-widest mb-3">Friendly Links</h3>
            <ul className="space-y-2">
              {PARTNER_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-[#0096B4] text-sm font-['Space_Grotesk'] transition-colors flex items-center gap-1 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-[#0096B4] transition-colors flex-shrink-0" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-gray-400 text-xs font-['Space_Grotesk']">
            © {new Date().getFullYear()} Token Continent. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-400 hover:text-gray-600 text-xs font-['Space_Grotesk'] transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-gray-600 text-xs font-['Space_Grotesk'] transition-colors">Terms of Use</a>
            <a href="#" className="text-gray-400 hover:text-gray-600 text-xs font-['Space_Grotesk'] transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
