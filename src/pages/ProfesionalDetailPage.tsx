import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfesionalBySlug } from "@/data/profesionales";
import { trackEvent } from "@/lib/tracking";
import {
  MapPin,
  CheckCircle,
  Star,
  MessageCircle,
  ChevronDown,
} from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

export default function ProfesionalDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const profesional = getProfesionalBySlug(slug || "");
  const [formacionOpen, setFormacionOpen] = useState(false);

  useEffect(() => {
    if (profesional) {
      trackEvent("click_perfil_terapeuta", { terapeutaSlug: profesional.slug });
    }
  }, [profesional?.slug]);

  if (!profesional) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
        <p style={{ fontFamily: "Jost, sans-serif", fontWeight: 300, fontSize: 20, color: "#666" }}>
          Profesional no encontrado
        </p>
        <Link
          to="/profesionales"
          style={{
            fontFamily: "Jost, sans-serif",
            fontWeight: 400,
            fontSize: 16,
            color: "hsl(var(--primary))",
            textDecoration: "underline",
          }}
        >
          Ver todos los profesionales
        </Link>
      </div>
    );
  }

  const p = profesional;

  const handleSolicitarSesion = () => {
    trackEvent("click_solicitar_sesion", { terapeutaSlug: p.slug });
    window.open(p.linkReserva, "_blank", "noopener,noreferrer");
  };

  const whatsappUrl = `https://wa.me/${p.telefonoWhatsapp}?text=${encodeURIComponent(
    `Hola ${p.nombre}, te he encontrado en Mallorca Holística. Me gustaría saber cómo puedes ayudarme y consultar tu disponibilidad. Gracias 🤍`
  )}`;

  const handleWhatsapp = () => {
    trackEvent("click_whatsapp", { terapeutaSlug: p.slug });
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const sectionHeadingStyle: React.CSSProperties = {
    fontFamily: "Jost, sans-serif",
    fontWeight: 500,
    fontSize: 14,
    textTransform: "uppercase" as const,
    letterSpacing: "2px",
    color: "#8B7B6B",
    marginBottom: 16,
  };

  return (
    <div className="min-h-screen bg-background">
      <div
        className="mx-auto px-6"
        style={{ maxWidth: 1100, paddingTop: 80, paddingBottom: 80 }}
      >
        {/* SECTION 1: CABECERA */}
        <div className="flex flex-col md:flex-row items-start gap-8">
          <img
            src={p.fotoUrl}
            alt={`${p.nombre} ${p.apellido}`}
            className="rounded-full object-cover shrink-0"
            style={{ width: 140, height: 140 }}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <h1
                style={{
                  fontFamily: "Jost, sans-serif",
                  fontWeight: 500,
                  fontSize: 36,
                  color: "hsl(var(--primary))",
                  lineHeight: 1.1,
                }}
              >
                {p.nombre} {p.apellido}
              </h1>

              {p.verificado && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span
                      className="inline-flex items-center gap-1.5 shrink-0 cursor-help"
                      style={{
                        fontFamily: "Jost, sans-serif",
                        fontWeight: 300,
                        fontSize: 13,
                        color: "#5A8A6A",
                        background: "rgba(90,138,106,0.08)",
                        padding: "6px 12px",
                        borderRadius: 999,
                      }}
                    >
                      <CheckCircle size={14} />
                      Perfil verificado · {p.anosExperiencia} años de experiencia
                    </span>
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    className="max-w-xs p-4"
                    style={{ fontFamily: "Jost, sans-serif" }}
                  >
                    <p className="font-medium text-sm mb-2">
                      Perfil verificado por Mallorca Holística
                    </p>
                    <p className="text-xs text-muted-foreground mb-1">
                      Este profesional ha aportado:
                    </p>
                    <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-0.5">
                      <li>Formación y diplomas</li>
                      <li>Experiencia profesional</li>
                      <li>Seguro de responsabilidad civil</li>
                      <li>Adhesión al código deontológico</li>
                    </ul>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>

            <p
              style={{
                fontFamily: "Jost, sans-serif",
                fontWeight: 300,
                fontSize: 18,
                color: "#6B6B6B",
                marginTop: 6,
              }}
            >
              {p.especialidad} · {p.subespecialidades.join(" · ")}
            </p>

            <p
              className="flex items-center gap-1"
              style={{
                fontFamily: "Jost, sans-serif",
                fontWeight: 300,
                fontSize: 16,
                color: "#888",
                marginTop: 4,
              }}
            >
              <MapPin size={14} /> {p.ubicacion}
            </p>

            <p
              style={{
                fontFamily: "Jost, sans-serif",
                fontWeight: 300,
                fontSize: 14,
                color: "#888",
                marginTop: 6,
              }}
            >
              {p.modalidad
                .map((m) => m.charAt(0).toUpperCase() + m.slice(1))
                .join(" · ")}
            </p>
          </div>
        </div>

        {/* SECTION 2: OPINIONES PLACEHOLDER */}
        <div style={{ marginTop: 24 }}>
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={16}
                className="fill-amber-400 text-amber-400"
              />
            ))}
          </div>
          <p
            style={{
              fontFamily: "Jost, sans-serif",
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: 13,
              color: "#999",
              marginTop: 4,
            }}
          >
            Opiniones verificadas próximamente
          </p>
        </div>

        {/* SECTION 3: FRASE CLAVE */}
        <p
          style={{
            fontFamily: "Jost, sans-serif",
            fontWeight: 400,
            fontSize: 24,
            fontStyle: "italic",
            color: "hsl(var(--primary))",
            marginTop: 48,
          }}
        >
          {p.fraseClave}
        </p>

        {/* SECTION 4: BLOQUE DE ACCIÓN */}
        <div
          className="flex flex-col sm:flex-row gap-3"
          style={{ marginTop: 32 }}
        >
          {p.linkReserva && (
            <button
              onClick={handleSolicitarSesion}
              className="w-full sm:w-auto"
              style={{
                fontFamily: "Jost, sans-serif",
                fontWeight: 400,
                fontSize: 16,
                background: "hsl(var(--primary))",
                color: "white",
                padding: "14px 32px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
              }}
            >
              Solicitar sesión
            </button>
          )}
          <button
            onClick={handleWhatsapp}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2"
            style={{
              fontFamily: "Jost, sans-serif",
              fontWeight: 400,
              fontSize: 16,
              background: "transparent",
              color: "hsl(var(--primary))",
              padding: "14px 32px",
              borderRadius: 8,
              border: "1.5px solid hsl(var(--primary))",
              cursor: "pointer",
            }}
          >
            <MessageCircle size={18} />
            Hablar con {p.nombre}
          </button>
        </div>
        <p
          style={{
            fontFamily: "Jost, sans-serif",
            fontWeight: 300,
            fontStyle: "italic",
            fontSize: 14,
            color: "#888",
            marginTop: 12,
          }}
        >
          Consulta disponibilidad directamente con {p.nombre}
        </p>

        {/* 2-column layout for remaining content */}
        <div
          className="flex flex-col lg:flex-row gap-12"
          style={{ marginTop: 64 }}
        >
          {/* LEFT COLUMN */}
          <div className="flex-1 min-w-0">
            {/* SECTION 5: SOBRE MÍ */}
            <div>
              <h2 style={sectionHeadingStyle}>SOBRE MÍ</h2>
              <p
                style={{
                  fontFamily: "Jost, sans-serif",
                  fontWeight: 300,
                  fontSize: 17,
                  color: "#444",
                  lineHeight: 1.7,
                }}
              >
                {p.sobreMi}
              </p>
            </div>

            {/* SECTION 6: TE ACOMPAÑO EN */}
            <div style={{ marginTop: 48 }}>
              <h2 style={sectionHeadingStyle}>TE ACOMPAÑO EN</h2>
              <div className="flex flex-wrap gap-2">
                {p.areasAyuda.map((area) => (
                  <span
                    key={area}
                    style={{
                      fontFamily: "Jost, sans-serif",
                      fontWeight: 300,
                      fontSize: 14,
                      color: "hsl(var(--primary))",
                      background: "rgba(90,138,106,0.1)",
                      padding: "6px 14px",
                      borderRadius: 999,
                    }}
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* SECTION 8: FORMACIÓN Y TRAYECTORIA */}
            <div style={{ marginTop: 48 }}>
              <Collapsible open={formacionOpen} onOpenChange={setFormacionOpen}>
                <CollapsibleTrigger
                  className="inline-flex items-center gap-1 hover:underline cursor-pointer"
                  style={{
                    fontFamily: "Jost, sans-serif",
                    fontWeight: 400,
                    fontSize: 16,
                    color: "hsl(var(--primary))",
                    background: "none",
                    border: "none",
                    padding: 0,
                  }}
                >
                  Ver formación y trayectoria
                  <ChevronDown
                    size={18}
                    className="transition-transform duration-200"
                    style={{
                      transform: formacionOpen ? "rotate(180deg)" : "rotate(0)",
                    }}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="overflow-hidden data-[state=open]:animate-none">
                  <div style={{ marginTop: 24 }}>
                    <h3 style={sectionHeadingStyle}>FORMACIÓN</h3>
                    <p
                      style={{
                        fontFamily: "Jost, sans-serif",
                        fontWeight: 300,
                        fontSize: 16,
                        color: "#555",
                        lineHeight: 1.7,
                      }}
                    >
                      {p.formacion}
                    </p>

                    <h3 style={{ ...sectionHeadingStyle, marginTop: 32 }}>
                      EXPERIENCIA
                    </h3>
                    <p
                      style={{
                        fontFamily: "Jost, sans-serif",
                        fontWeight: 300,
                        fontSize: 16,
                        color: "#555",
                        lineHeight: 1.7,
                      }}
                    >
                      {p.experiencia}
                    </p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>

          {/* RIGHT COLUMN (sidebar) */}
          <div className="w-full lg:w-[340px] shrink-0 space-y-12">
            {/* SECTION 7: SESIONES */}
            {p.sesiones && p.sesiones.length > 0 && (
              <div>
                <h2 style={sectionHeadingStyle}>SESIONES</h2>
                <div className="space-y-2">
                  {p.sesiones.map((s, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between"
                      style={{
                        fontFamily: "Jost, sans-serif",
                        fontWeight: 400,
                        fontSize: 16,
                        color: "#444",
                      }}
                    >
                      <span>
                        {s.nombre} ({s.duracion})
                      </span>
                      <span>€{s.precio}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 9: MAPA */}
            {p.latitud != null && p.longitud != null && (
              <div>
                <h2 style={sectionHeadingStyle}>UBICACIÓN</h2>
                <iframe
                  src={`https://www.google.com/maps?q=${p.latitud},${p.longitud}&z=14&output=embed`}
                  width="100%"
                  height="320"
                  style={{ border: 0, borderRadius: 12 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación del profesional"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
