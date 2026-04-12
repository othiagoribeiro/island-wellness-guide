import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/useI18n";
import isotipo from "@/assets/isotipo.png";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="text-primary-foreground py-10 md:py-16" style={{ backgroundColor: "hsl(160, 26%, 16%)" }}>
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
        <div>
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            <img src={isotipo} alt="" className="w-6 h-6" style={{ filter: "brightness(0) invert(1) opacity(0.9)" }} />
            Mallorca Holística
          </h3>
          <p className="text-sm opacity-75 leading-relaxed">{t("footer.tagline")}</p>
          <p className="text-sm opacity-60 italic mt-3">{t("footer.motto")}</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <h4 className="font-semibold mb-3">{t("footer.explore")}</h4>
          <nav className="flex flex-col gap-2 text-sm opacity-75">
            <Link to="/about" className="hover:opacity-100 transition-opacity">{t("footer.about")}</Link>
            <Link to="/professionals" className="hover:opacity-100 transition-opacity">{t("footer.professionals")}</Link>
            <Link to="/therapies" className="hover:opacity-100 transition-opacity">{t("footer.therapies")}</Link>
            <Link to="/activities" className="hover:opacity-100 transition-opacity">{t("footer.activities")}</Link>
            <Link to="/support" className="hover:opacity-100 transition-opacity">{t("nav.soporte")}</Link>
            <Link to="/blog" className="hover:opacity-100 transition-opacity">{t("nav.blog")}</Link>
          </nav>
        </div>
        <div>
          <h4 className="font-semibold mb-3">{t("footer.contact")}</h4>
          <p className="text-sm opacity-75">hola@mallorcaholistica.com</p>
        </div>
      </div>
    </footer>
  );
}
