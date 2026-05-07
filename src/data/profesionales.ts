export interface Sesion {
  nombre: string;
  duracion: string;
  precio: number;
}

export interface Profesional {
  slug: string;
  nombre: string;
  apellido: string;
  fotoUrl: string;
  especialidad: string;
  subespecialidades: string[];
  ubicacion: string;
  modalidad: ("presencial" | "online" | "domicilio")[];
  anosExperiencia: number;
  verificado: boolean;
  fraseClave: string;
  sobreMi: string;
  areasAyuda: string[];
  terapias: string[];
  sesiones?: Sesion[];
  formacion: string;
  experiencia: string;
  linkReserva?: string;
  telefonoWhatsapp: string;
  latitud?: number;
  longitud?: number;
}

export const profesionales: Profesional[] = [
  {
    slug: "lucia-gelabert",
    nombre: "Lucía",
    apellido: "Gelabert",
    fotoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    especialidad: "Terapeuta Energética",
    subespecialidades: ["Maestra ChiKung", "Reiki"],
    ubicacion: "Deià, Mallorca",
    modalidad: ["presencial", "online"],
    anosExperiencia: 10,
    verificado: true,
    fraseClave: "Te acompaño a recuperar el equilibrio y sentirte mejor.",
    sobreMi: "Soy terapeuta especializada en Reiki y sanación energética. Acompaño procesos emocionales ayudando a recuperar la calma, el equilibrio y la conexión interior. Cada sesión es un espacio para escucharte y sostenerte en tu proceso.",
    areasAyuda: ["Inflamación", "Artritis", "Vitalidad", "Dolores físicos", "Dolores crónicos"],
    terapias: ["reiki", "sanacion-energetica"],
    sesiones: [
      { nombre: "Sesión individual", duracion: "60 min", precio: 75 },
      { nombre: "Sesión extendida", duracion: "90 min", precio: 95 }
    ],
    formacion: "Maestra en Reiki Usui (Nivel III). Formación en ChiKung tradicional con maestros en China y España. Diplomada en sanación energética.",
    experiencia: "10 años acompañando procesos de salud y bienestar en consultas privadas y retiros holísticos. Colaboradora en centros de bienestar en Mallorca y Cataluña.",
    linkReserva: "https://calendly.com/lucia-gelabert",
    telefonoWhatsapp: "34666111222",
    latitud: 39.7470,
    longitud: 2.6488
  },
  {
    slug: "sarah-molina",
    nombre: "Sarah",
    apellido: "Molina",
    fotoUrl: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
    especialidad: "Naturópata",
    subespecialidades: ["Masajista"],
    ubicacion: "Palma, Mallorca",
    modalidad: ["domicilio"],
    anosExperiencia: 7,
    verificado: true,
    fraseClave: "Cuidar tu salud desde lo más profundo, con métodos naturales.",
    sobreMi: "Naturópata diplomada con enfoque integral. Trabajo a domicilio para que puedas recibir el cuidado que necesitas en tu propio espacio. Combino masaje terapéutico, fitoterapia y acompañamiento nutricional.",
    areasAyuda: ["Digestión", "Ansiedad", "Estrés", "Equilibrio Hormonal", "Sistema Inmunológico"],
    terapias: ["naturopatia", "masaje-terapeutico", "fitoterapia"],
    formacion: "Diploma en Naturopatía (FENACO). Especialización en masaje terapéutico y drenaje linfático. Formación continua en nutrición funcional.",
    experiencia: "7 años de práctica privada en Mallorca. Colaboraciones con centros de bienestar y retiros de salud.",
    telefonoWhatsapp: "34666333444",
    latitud: 39.5696,
    longitud: 2.6502
  },
  {
    slug: "pau-elenco",
    nombre: "Pau",
    apellido: "Elenco",
    fotoUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
    especialidad: "Psicoterapeuta",
    subespecialidades: ["Biodescodificación"],
    ubicacion: "Sóller, Mallorca",
    modalidad: ["presencial", "online"],
    anosExperiencia: 12,
    verificado: true,
    fraseClave: "Comprender el origen del síntoma para liberarlo.",
    sobreMi: "Psicoterapeuta especializado en biodescodificación. Acompaño procesos profundos de comprensión emocional y liberación de patrones inconscientes. Trabajo con adultos y parejas.",
    areasAyuda: ["Traumas", "Crecimiento personal", "Gestión emocional", "Fobias y miedos", "Problemas de pareja"],
    terapias: ["biodescodificacion", "psicologia-integrativa", "terapia-de-pareja"],
    sesiones: [
      { nombre: "Sesión individual", duracion: "75 min", precio: 80 }
    ],
    formacion: "Licenciatura en Psicología (UB). Especialización en Biodescodificación con Christian Flèche. Formación en Gestalt y constelaciones familiares.",
    experiencia: "12 años de práctica clínica. Conferenciante y formador en biodescodificación en España y Latinoamérica.",
    linkReserva: "https://calendly.com/pau-elenco",
    telefonoWhatsapp: "34666555666",
    latitud: 39.7659,
    longitud: 2.7144
  }
];

export const getProfesionalBySlug = (slug: string): Profesional | undefined =>
  profesionales.find(p => p.slug === slug);
