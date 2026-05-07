import { Link } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import { terapiasGrouped } from "@/data/terapias";

export default function TherapiesPage() {
  const letters = Object.keys(terapiasGrouped).sort();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4">
        <PageHeader title="Guía de terapias" subtitle="Explora las disciplinas de bienestar presentes en nuestra comunidad" />

        <p
          className="text-center italic text-accent"
          style={{ fontWeight: 300, fontSize: 16 }}
        >
          Haz clic en una terapia para saber más
        </p>

        <div
          className="mt-16 max-w-[1100px] mx-auto pb-24 columns-1 sm:columns-2 lg:columns-3"
          style={{ columnGap: 64 }}
        >
          {letters.map((letter) => (
            <div key={letter} className="break-inside-avoid mb-8">
              <h2
                className="text-primary mb-4 pb-2"
                style={{
                  fontWeight: 500,
                  fontSize: 24,
                  borderBottom: "1px solid rgba(0,0,0,0.08)",
                  letterSpacing: "0.06em",
                }}
              >
                {letter}
              </h2>
              <ul className="list-none p-0 m-0">
                {terapiasGrouped[letter].map((t) => (
                  <li key={t.slug}>
                    <Link
                      to={`/terapia/${t.slug}`}
                      className="block py-2 text-foreground hover:text-primary hover:underline transition-colors"
                      style={{ fontWeight: 400, fontSize: 17 }}
                    >
                      {t.nombre}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
