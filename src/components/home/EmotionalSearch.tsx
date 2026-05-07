import { useState } from "react";
import { useNavigate } from "react-router-dom";

const chips = [
  "Me duele la espalda",
  "Tengo ansiedad",
  "Estoy pasando por un duelo",
  "Necesito parar un poco",
  "Tengo dolores crónicos",
  "Busco equilibrio emocional",
  "Me siento deprimido",
];

export default function EmotionalSearch() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  return (
    <section style={{ background: "#E8EDE3", padding: "96px 16px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Card */}
        <div
          style={{
            background: "#F5F1E8",
            borderRadius: 32,
            padding: "48px 32px",
            border: "1px solid rgba(0,0,0,0.05)",
          }}
          className="md:px-16"
        >
          {/* Row 1: Input + Button */}
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <div className="flex-1">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                rows={2}
                placeholder="Cuéntanos cómo te sientes o qué necesitas ahora..."
                className="w-full bg-transparent border-0 border-b border-transparent focus:border-b focus:outline-none resize-none"
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 300,
                  fontSize: 18,
                  color: "#333",
                  lineHeight: 1.5,
                  borderBottomColor: "rgba(0,0,0,0.1)",
                }}
              />
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 300,
                  fontStyle: "italic",
                  fontSize: 14,
                  color: "#999",
                  marginTop: 8,
                }}
              >
                Ej: "Estoy estresado", "no duermo bien"
              </p>
            </div>
            <button
              onClick={() => navigate("/professionals")}
              style={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 400,
                fontSize: 15,
                background: "#B8C9B0",
                color: "#2D3A2E",
                border: "none",
                borderRadius: 999,
                padding: "12px 28px",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#A3B89A")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#B8C9B0")}
            >
              Ver opciones
            </button>
          </div>

          {/* Row 2: Chips */}
          <div className="flex flex-wrap gap-3 mt-8">
            {chips.map((chip) => (
              <button
                key={chip}
                onClick={() => navigate("/professionals")}
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 300,
                  fontStyle: "italic",
                  fontSize: 14,
                  color: "#6B6B6B",
                  background: "#F0EFEC",
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: 999,
                  padding: "8px 18px",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#E5E4E0")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#F0EFEC")}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Below card text */}
        <p
          className="text-center mt-12"
          style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 300,
            fontStyle: "italic",
            fontSize: 16,
            color: "#8B7B6B",
          }}
        >
          Un espacio de confianza para empezar a cuidarte
        </p>
      </div>
    </section>
  );
}
