import { useParams, Link } from "react-router-dom";
import { useI18n } from "@/i18n/useI18n";
import { getProfessional, getKeywordsForProfessional, getTherapiesForProfessional } from "@/lib/api";
import { MapPin, CheckCircle, Star, Mail, Phone, Globe, ArrowLeft } from "lucide-react";

export default function ProfessionalProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { t, locale } = useI18n();
  const pro = getProfessional(id || "");

  if (!pro) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-stone">Not found</p>
      </div>
    );
  }

  const kws = getKeywordsForProfessional(pro);
  const therapies = getTherapiesForProfessional(pro);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link to="/professionals" className="text-terracotta text-sm font-medium inline-flex items-center gap-1 mb-6 hover:underline">
          <ArrowLeft size={16} /> {t("dir.back")}
        </Link>

        <div className="bg-surface rounded-xl p-8 shadow-sm">
          {/* Header */}
          <div className="flex items-start gap-5 mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-terracotta/30 to-brown/20 flex items-center justify-center text-brown font-bold text-2xl shrink-0">
              {pro.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-brown">{pro.name}</h1>
                {pro.verificationStatus === "approved" && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-terracotta bg-terracotta/10 px-2 py-1 rounded-full">
                    <CheckCircle size={12} /> {t("dir.verified")}
                  </span>
                )}
              </div>
              <p className="text-stone">{pro.specialty[locale]}</p>
              <div className="flex items-center gap-1 text-stone text-sm mt-1">
                <MapPin size={14} /> {pro.city}
              </div>
              <div className="flex gap-0.5 mt-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={16} className="text-terracotta fill-terracotta" />
                ))}
              </div>
            </div>
          </div>

          {/* Therapies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {therapies.map((th) => (
              <Link
                key={th.id}
                to={`/therapies/${th.id}`}
                className="text-sm bg-brown/10 text-brown px-3 py-1 rounded-full hover:bg-brown/20 transition-colors"
              >
                {th.name[locale]}
              </Link>
            ))}
          </div>

          {/* Keywords */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {kws.map((kw) => (
              <span key={kw.id} className="text-xs bg-terracotta/10 text-brown px-2 py-0.5 rounded-full">
                {kw.name[locale]}
              </span>
            ))}
          </div>

          {/* Bio */}
          {pro.bio && (
            <p className="text-foreground mb-6">{pro.bio[locale]}</p>
          )}

          {/* Contact */}
          <div className="flex flex-wrap gap-3">
            {pro.email && (
              <a
                href={`mailto:${pro.email}`}
                className="inline-flex items-center gap-2 bg-terracotta text-surface px-5 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Mail size={18} /> Email
              </a>
            )}
            {pro.phone && (
              <a
                href={`tel:${pro.phone}`}
                className="inline-flex items-center gap-2 bg-brown text-primary-foreground px-5 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                <Phone size={18} />
              </a>
            )}
            {pro.website && (
              <a
                href={pro.website}
                className="inline-flex items-center gap-2 border border-brown text-brown px-5 py-3 rounded-lg font-medium hover:bg-brown/5 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe size={18} /> Web
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
