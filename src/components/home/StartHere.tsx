import { Link } from "react-router-dom";
import { Users, Calendar, BookOpen } from "lucide-react";

const cards = [
  {
    icon: Users,
    title: "Profesionales",
    description: "Personas que pueden acompañarte",
    button: "Ver profesionales",
    to: "/professionals",
  },
  {
    icon: Calendar,
    title: "Actividades",
    description: "Eventos, talleres y encuentros para vivirlo en primera persona",
    button: "Ver actividades",
    to: "/activities",
  },
  {
    icon: BookOpen,
    title: "Descubrir",
    description: "Explora las terapias y descubre cómo pueden ayudarte",
    button: "Ver terapias",
    to: "/therapies",
  },
];

export default function StartHere() {
  return (
    <section style={{ background: "#FAFAF7", padding: "96px 16px" }}>
      {/* Title */}
      <h2
        className="text-center uppercase"
        style={{
          fontFamily: "'Jost', sans-serif",
          fontWeight: 400,
          fontSize: 32,
          letterSpacing: 2,
          color: "hsl(150, 22%, 38%)",
          marginBottom: 64,
        }}
      >
        Empieza por aquí
      </h2>

      {/* Cards grid */}
      <div
        className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8"
        style={{ maxWidth: 1100 }}
      >
        {cards.map((card) => (
          <div
            key={card.title}
            className="flex flex-col"
            style={{
              background: "#F5F1E8",
              borderRadius: 16,
              padding: "48px 32px",
              border: "1px solid rgba(0,0,0,0.06)",
              minHeight: 320,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#EFE9DD")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#F5F1E8")}
          >
            <card.icon size={40} color="hsl(145, 24%, 50%)" strokeWidth={1.5} />

            <h3
              style={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 500,
                fontSize: 22,
                color: "hsl(150, 22%, 38%)",
                marginTop: 24,
                letterSpacing: "0.02em",
              }}
            >
              {card.title}
            </h3>

            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 300,
                fontSize: 16,
                color: "#6B6B6B",
                marginTop: 12,
                lineHeight: 1.6,
              }}
            >
              {card.description}
            </p>

            <div className="flex-grow" />

            <Link
              to={card.to}
              className="block text-center mt-8"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 400,
                fontSize: 15,
                background: "hsl(150, 22%, 38%)",
                color: "#fff",
                padding: "12px 24px",
                borderRadius: 8,
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              {card.button}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
