import { useParams, Link } from "react-router-dom";
import { getTerapiaBySlug } from "@/data/terapias";
import PageHeader from "@/components/PageHeader";
import { ArrowLeft } from "lucide-react";

const PLACEHOLDER = "Información en preparación. Pronto encontrarás aquí más detalles sobre esta terapia.";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <h2
        className="text-primary uppercase mb-4"
        style={{ fontWeight: 500, fontSize: 18, letterSpacing: 2 }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

function PlaceholderText() {
  return (
    <p className="italic text-muted-foreground" style={{ fontWeight: 300, fontSize: 16, lineHeight: 1.7 }}>
      {PLACEHOLDER}
    </p>
  );
}

function ContentText({ text }: { text: string }) {
  if (!text) return <PlaceholderText />;
  return (
    <p style={{ fontWeight: 300, fontSize: 16, lineHeight: 1.7, color: "#555" }}>
      {text}
    </p>
  );
}

export default function TerapiaDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const terapia = getTerapiaBySlug(slug || "");

  if (!terapia) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6">
        <p className="text-muted-foreground text-lg">Terapia no encontrada</p>
        <Link
          to="/therapies"
          className="inline-flex items-center gap-2 text-primary hover:underline"
          style={{ fontWeight: 400 }}
        >
          <ArrowLeft size={16} /> Volver a la guía de terapias
        </Link>
      </div>
    );
  }

  const { contenido } = terapia;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4">
        <div className="pt-8">
          <Link
            to="/therapies"
            className="inline-flex items-center gap-1.5 text-primary text-sm hover:underline"
            style={{ fontWeight: 400 }}
          >
            <ArrowLeft size={16} /> Guía de terapias
          </Link>
        </div>

        <PageHeader title={terapia.nombre} />

        <div className="max-w-[800px] mx-auto mt-16 pb-24">
          <Section title="Qué es">
            <ContentText text={contenido.queEs} />
          </Section>

          <Section title="Cómo funciona">
            <ContentText text={contenido.comoFunciona} />
          </Section>

          <Section title="En qué puede ayudar">
            {contenido.enQuePuedeAyudar.length > 0 ? (
              <ul className="list-none p-0 m-0 space-y-2">
                {contenido.enQuePuedeAyudar.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2"
                    style={{ fontWeight: 300, fontSize: 16, lineHeight: 1.7, color: "#555" }}
                  >
                    <span className="text-accent mt-1.5 text-xs">●</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <PlaceholderText />
            )}
          </Section>

          <Section title="Cómo es una sesión">
            <ContentText text={contenido.comoEsUnaSesion} />
          </Section>

          {/* Nota importante */}
          <div
            className="mt-8 rounded-xl p-6"
            style={{ backgroundColor: "hsl(var(--secondary))" }}
          >
            <h2
              className="text-primary uppercase mb-3"
              style={{ fontWeight: 500, fontSize: 18, letterSpacing: 2 }}
            >
              Nota importante
            </h2>
            <p className="italic" style={{ fontWeight: 300, fontSize: 15, lineHeight: 1.7, color: "#6B6B6B" }}>
              Las terapias complementarias acompañan procesos de salud, pero no sustituyen la atención médica cuando es necesaria.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="italic mb-6" style={{ fontWeight: 300, fontSize: 16, color: "#6B6B6B" }}>
              Si sientes que esta terapia puede encajar contigo...
            </p>
            <Link
              to={`/professionals?terapia=${terapia.slug}`}
              className="inline-block bg-primary text-primary-foreground rounded-lg transition-opacity hover:opacity-90"
              style={{ fontWeight: 400, padding: "14px 32px", fontSize: 16 }}
            >
              Ver profesionales de {terapia.nombre.toLowerCase()}
            </Link>
            <p className="italic mt-6" style={{ fontWeight: 300, fontSize: 14, color: "#8B7B6B" }}>
              Estamos ampliando nuestra red de profesionales con mucho cuidado. Muy pronto encontrarás aquí a la persona adecuada para ti.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
