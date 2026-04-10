import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/useI18n";
import { ArrowLeft } from "lucide-react";

export default function ProRegisterPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        <h1 className="text-2xl font-bold text-brown mb-4">{t("pro.title")}</h1>
        <p className="text-stone mb-8">{t("pro.message")}</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 border border-brown text-brown px-6 py-3 rounded-lg font-medium hover:bg-brown/5 transition-colors"
        >
          <ArrowLeft size={16} /> {t("pro.back")}
        </Link>
      </div>
    </div>
  );
}
