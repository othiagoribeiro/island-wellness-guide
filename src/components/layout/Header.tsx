import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useI18n } from "@/i18n/useI18n";
import { LOCALES, type Locale } from "@/i18n/locales";
import { Menu, X } from "lucide-react";

const navLinks = [
  { key: "nav.inicio" as const, path: "/" },
  { key: "nav.directorio" as const, path: "/professionals" },
  { key: "nav.actividades" as const, path: "/activities" },
  { key: "nav.terapias" as const, path: "/therapies" },
  { key: "nav.blog" as const, path: "/blog" },
];

export default function Header() {
  const { t, locale, setLocale } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-sm" style={{ borderBottom: '1px solid rgba(44,74,62,0.1)' }}>
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="font-bold text-xl text-brown tracking-tight">
          Mallorca Holística
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium tracking-wide transition-colors hover:text-terracotta ${
                location.pathname === link.path ? "text-terracotta" : "text-brown"
              }`}
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          {/* Language switcher */}
          <div className="flex items-center gap-1 text-sm text-stone">
            {LOCALES.map((l, i) => (
              <span key={l}>
                {i > 0 && <span className="mx-1 text-border">|</span>}
                <button
                  onClick={() => setLocale(l)}
                  className={`font-medium transition-colors ${
                    locale === l ? "text-brown" : "text-stone hover:text-brown"
                  }`}
                  aria-label={`Switch to ${l.toUpperCase()}`}
                >
                  {l.toUpperCase()}
                </button>
              </span>
            ))}
          </div>

          <Link
            to="/pro/register"
            className="bg-primary text-primary-foreground px-5 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            {t("nav.pro")}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 text-brown"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-surface border-t border-border px-4 pb-4">
          <nav className="flex flex-col gap-3 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`text-sm font-medium py-2 ${
                  location.pathname === link.path ? "text-terracotta" : "text-brown"
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 pb-3 text-sm">
            {LOCALES.map((l, i) => (
              <span key={l}>
                {i > 0 && <span className="text-border">|</span>}
                <button
                  onClick={() => setLocale(l)}
                  className={`px-1 font-medium ${locale === l ? "text-brown" : "text-stone"}`}
                  aria-label={`Switch to ${l.toUpperCase()}`}
                >
                  {l.toUpperCase()}
                </button>
              </span>
            ))}
          </div>
          <Link
            to="/pro/register"
            onClick={() => setMobileOpen(false)}
            className="block text-center bg-primary text-primary-foreground px-5 py-3 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            {t("nav.pro")}
          </Link>
        </div>
      )}
    </header>
  );
}
