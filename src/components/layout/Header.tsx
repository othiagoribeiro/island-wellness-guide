import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import isotipo from "@/assets/isotipo.png";

const navLinks = [
  { label: "Inicio", path: "/" },
  { label: "Profesionales", path: "/professionals" },
  { label: "Actividades", path: "/activities" },
  { label: "Terapias", path: "/therapies" },
  { label: "Blog", path: "/blog" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl tracking-tight text-foreground">
          <img src={isotipo} alt="" className="w-7 h-7" style={{ filter: "sepia(1) saturate(3) hue-rotate(120deg) brightness(0.45)" }} />
          Mallorca Holística
        </Link>

        {/* Desktop nav — centered */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-[13px] font-normal tracking-wide transition-colors hover:text-primary ${
                location.pathname === link.path ? "text-primary" : "text-foreground/70"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:block">
          <Link
            to="/para-profesionales"
            className="inline-flex items-center gap-1.5 border border-primary text-primary px-5 py-1.5 rounded-lg text-[13px] font-medium hover:bg-primary/5 transition-colors"
          >
            Soy Profesional <ArrowRight size={14} />
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-border/50 px-4 pb-4">
          <nav className="flex flex-col gap-3 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`text-[13px] font-normal py-2 ${
                  location.pathname === link.path ? "text-primary" : "text-foreground/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            to="/para-profesionales"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-1.5 border border-primary text-primary px-5 py-2.5 rounded-lg text-[13px] font-medium hover:bg-primary/5 transition-colors"
          >
            Soy Profesional <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </header>
  );
}
