import { useParams, Link } from "react-router-dom";
import { useI18n } from "@/i18n/useI18n";
import { getProfessional, getKeywordsForProfessional, getTherapiesForProfessional } from "@/lib/api";
import { MapPin, ShieldCheck, Star, Mail, Phone, Globe, ArrowLeft, GraduationCap, Calendar, ExternalLink } from "lucide-react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function createProfilePin() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 30 40" fill="none">
    <path d="M15 0C6.716 0 0 6.716 0 15c0 10.5 15 25 15 25s15-14.5 15-25C30 6.716 23.284 0 15 0z" fill="hsl(150,22%,38%)"/>
    <circle cx="15" cy="14" r="6" fill="white" fill-opacity="0.95"/>
    <circle cx="15" cy="14" r="3" fill="hsl(150,22%,38%)"/>
  </svg>`;
  return L.divIcon({
    html: svg,
    className: "custom-pin",
    iconSize: [30, 40],
    iconAnchor: [15, 40],
  });
}

export default function ProfessionalProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { t, locale } = useI18n();
  const pro = getProfessional(id || "");

  if (!pro) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Not found</p>
      </div>
    );
  }

  const kws = getKeywordsForProfessional(pro);
  const therapies = getTherapiesForProfessional(pro);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[860px] mx-auto px-4 pt-12 md:pt-16 pb-16">
        {/* Back link */}
        <Link
          to="/professionals"
          className="inline-flex items-center gap-1 text-accent text-sm font-medium mb-8 hover:underline"
        >
          <ArrowLeft size={16} /> {t("profile.back")}
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start gap-5 mb-10">
          <div
            className="w-[120px] h-[120px] rounded-full flex items-center justify-center text-white font-bold text-3xl shrink-0 overflow-hidden"
            style={{
              background: pro.photo ? undefined : "linear-gradient(135deg, hsl(var(--accent)), hsl(var(--primary)))",
            }}
          >
            {pro.photo ? (
              <img src={pro.photo} alt={pro.name} className="w-full h-full object-cover" />
            ) : (
              pro.name.split(" ").map((n) => n[0]).join("").slice(0, 2)
            )}
          </div>
          <div>
            <h1 className="text-[28px] font-bold text-primary">{pro.name}</h1>
            {pro.verificationStatus === "approved" && (
              <div className="flex items-center gap-1 text-accent text-sm font-medium mt-1">
                <ShieldCheck size={16} /> {t("dir.verified")}
              </div>
            )}
            <p className="text-muted-foreground text-[16px] mt-1">{pro.specialty[locale]}</p>
            <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
              <MapPin size={14} /> {pro.city}
            </div>
            <div className="flex items-center gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={16} className="text-accent fill-accent" />
              ))}
              <span className="text-muted-foreground text-[13px] ml-1">4.9</span>
            </div>
          </div>
        </div>

        {/* Therapies */}
        <section className="mb-8">
          <h2 className="text-[16px] font-semibold text-primary mb-3">{t("profile.therapies")}</h2>
          <div className="flex flex-wrap gap-2">
            {therapies.map((th) => (
              <Link
                key={th.id}
                to={`/therapies/${th.id}`}
                className="text-sm bg-primary text-primary-foreground px-4 py-1.5 rounded-full font-medium hover:opacity-90 transition-opacity"
              >
                {th.name[locale]}
              </Link>
            ))}
          </div>
        </section>

        {/* About */}
        {pro.bio && (
          <section className="mb-8">
            <h2 className="text-[16px] font-semibold text-primary mb-3">{t("profile.about")}</h2>
            <p className="text-foreground text-[16px] leading-[1.7]">{pro.bio[locale]}</p>
          </section>
        )}

        {/* Keywords */}
        <section className="mb-8">
          <h2 className="text-[16px] font-semibold text-primary mb-3">{t("profile.canHelp")}</h2>
          <div className="flex flex-wrap gap-2">
            {kws.map((kw) => (
              <span
                key={kw.id}
                className="text-[13px] text-primary px-3.5 py-1 rounded-full"
                style={{ background: "rgba(70,110,90,0.1)" }}
              >
                {kw.name[locale]}
              </span>
            ))}
          </div>
        </section>

        {/* Certifications */}
        {pro.certifications && pro.certifications.length > 0 && (
          <section className="mb-8">
            <h2 className="text-[16px] font-semibold text-primary mb-3">{t("profile.certifications")}</h2>
            <div className="space-y-0">
              {pro.certifications.map((cert, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 py-3"
                  style={{ borderBottom: i < pro.certifications!.length - 1 ? "1px solid rgba(70,110,90,0.08)" : undefined }}
                >
                  <GraduationCap size={18} className="text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="text-primary font-semibold text-sm">{cert.title}</p>
                    <p className="text-muted-foreground text-[13px]">{cert.institution} · {cert.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        <section className="mb-8">
          <h2 className="text-[16px] font-semibold text-primary mb-3">{t("profile.contact")}</h2>
          <div className="flex flex-wrap gap-3">
            {pro.email && (
              <a
                href={`mailto:${pro.email}`}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 rounded-lg font-medium hover:opacity-90 transition-opacity"
                style={{ height: 48 }}
              >
                <Mail size={18} /> {t("profile.sendEmail")}
              </a>
            )}
            {pro.phone && (
              <a
                href={`tel:${pro.phone}`}
                className="inline-flex items-center gap-2 border text-primary px-5 rounded-lg font-medium hover:bg-primary/5 transition-colors"
                style={{ height: 48, borderColor: "hsl(var(--primary))" }}
              >
                <Phone size={18} /> {t("profile.call")}
              </a>
            )}
            {pro.website && (
              <a
                href={pro.website}
                className="inline-flex items-center gap-2 border text-primary px-5 rounded-lg font-medium hover:bg-primary/5 transition-colors"
                style={{ height: 48, borderColor: "hsl(var(--primary))" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe size={18} /> {t("profile.website")}
              </a>
            )}
          </div>
          {/* Social links */}
          {(pro.instagram || pro.linkedin) && (
            <div className="flex gap-3 mt-3">
              {pro.instagram && (
                <a href={pro.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
              )}
              {pro.linkedin && (
                <a href={pro.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              )}
            </div>
          )}
        </section>

        {/* Booking */}
        {(pro.plan === "pro" || pro.plan === "premium") && pro.externalCalendarUrl && (
          <section className="mb-8">
            <a
              href={pro.externalCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-accent text-white font-semibold rounded-[10px] hover:opacity-90 transition-opacity"
              style={{ height: 56 }}
            >
              <Calendar size={20} /> {t("profile.booking")}
            </a>
            <p className="text-muted-foreground text-xs text-center italic mt-2">{t("profile.bookingNote")}</p>
          </section>
        )}

        {/* Location Map */}
        <section className="mb-8">
          <div className="rounded-xl overflow-hidden" style={{ height: 220 }}>
            <MapContainer
              center={[pro.lat, pro.lng]}
              zoom={13}
              scrollWheelZoom={false}
              zoomControl={false}
              dragging={false}
              className="w-full h-full"
              style={{ zIndex: 0 }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[pro.lat, pro.lng]} icon={createProfilePin()} />
            </MapContainer>
          </div>
        </section>
      </div>
    </div>
  );
}
