import { Link } from "react-router-dom";
import isotipo from "@/assets/isotipo.png";

export default function Footer() {
  return (
    <footer className="bg-muted/40 text-foreground py-10 md:py-16 border-t border-border/50">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
        <div>
          <h3 className="text-lg mb-3 flex items-center gap-2 text-primary">
            <img src={isotipo} alt="" className="w-6 h-6" />
            Mallorca Holística
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Tu guía de bienestar y terapias naturales en Mallorca.
          </p>
          <p className="text-sm text-muted-foreground italic mt-3">
            Donde el bienestar encuentra su hogar.
          </p>
        </div>
        <div className="md:mx-auto">
          <h4 className="mb-3 text-primary">Explorar</h4>
          <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/about" className="hover:text-primary transition-colors">Sobre nosotros</Link>
            <Link to="/professionals" className="hover:text-primary transition-colors">Profesionales</Link>
            <Link to="/therapies" className="hover:text-primary transition-colors">Terapias</Link>
            <Link to="/activities" className="hover:text-primary transition-colors">Actividades</Link>
            <Link to="/support" className="hover:text-primary transition-colors">Soporte</Link>
            <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
          </nav>
        </div>
        <div>
          <h4 className="mb-3 text-primary">Contacto</h4>
          <p className="text-sm text-muted-foreground">hola@mallorcaholistica.com</p>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-6 border-t border-border/50">
        <p className="text-[13px] text-stone text-center">
          <Link to="/terms" className="hover:text-primary transition-colors">Condiciones de uso</Link>
          <span className="mx-1">·</span>
          <Link to="/privacy" className="hover:text-primary transition-colors">Política de privacidad</Link>
        </p>
        <p className="text-[12px] text-muted-foreground/60 text-center mt-3">
          Orientación informativa. No sustituye diagnóstico médico.
        </p>
      </div>
    </footer>
  );
}
