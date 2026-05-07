export interface Terapia {
  slug: string;
  nombre: string;
  letra: string;
  contenido: {
    queEs: string;
    comoFunciona: string;
    enQuePuedeAyudar: string[];
    comoEsUnaSesion: string;
  };
}

export const terapias: Terapia[] = [
  // A
  { slug: "acupuntura", nombre: "Acupuntura", letra: "A", contenido: {
    queEs: "La acupuntura es una práctica terapéutica de origen milenario que forma parte de la medicina tradicional china. Se basa en la estimulación de puntos específicos del cuerpo mediante agujas muy finas, con el objetivo de favorecer el equilibrio y acompañar los procesos naturales del organismo.",
    comoFunciona: "Durante una sesión, el profesional selecciona distintos puntos del cuerpo según las necesidades de la persona. Las agujas se colocan de forma suave y permanecen durante unos minutos mientras el cuerpo entra en un estado de relajación. Las sesiones suelen desarrollarse en un ambiente tranquilo, cuidando el ritmo y el bienestar de la persona.",
    enQuePuedeAyudar: [
      "tensiones musculares o articulares",
      "dolores de espalda o cervicales",
      "migrañas o dolores de cabeza",
      "estrés y ansiedad",
      "fatiga o falta de energía"
    ],
    comoEsUnaSesion: "Una sesión suele comenzar con una conversación para comprender la situación y las necesidades de la persona. A partir de ahí, el profesional define el enfoque más adecuado y realiza la sesión adaptándola a cada caso. La experiencia suele ser suave y, en la mayoría de los casos, poco o nada dolorosa."
  }},
  { slug: "acupresion", nombre: "Acupresión", letra: "A", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  { slug: "aromaterapia", nombre: "Aromaterapia", letra: "A", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  { slug: "arteterapia", nombre: "Arteterapia", letra: "A", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  { slug: "ayurveda", nombre: "Ayurveda", letra: "A", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  // B
  { slug: "biodescodificacion", nombre: "Biodescodificación", letra: "B", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  { slug: "biomagnetismo", nombre: "Biomagnetismo", letra: "B", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  // C
  { slug: "coaching-emocional", nombre: "Coaching emocional", letra: "C", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  { slug: "coaching-de-vida", nombre: "Coaching de vida", letra: "C", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  { slug: "comunicacion-animal", nombre: "Comunicación animal", letra: "C", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  { slug: "constelaciones-familiares", nombre: "Constelaciones familiares", letra: "C", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  { slug: "cromoterapia", nombre: "Cromoterapia", letra: "C", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  // D
  { slug: "danza-terapia", nombre: "Danza terapia", letra: "D", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  { slug: "drenaje-linfatico-manual", nombre: "Drenaje linfático manual", letra: "D", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  // E
  { slug: "eft", nombre: "EFT (liberación emocional)", letra: "E", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  { slug: "emdr", nombre: "EMDR", letra: "E", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  { slug: "eneagrama", nombre: "Eneagrama", letra: "E", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  { slug: "equilibrio-energetico", nombre: "Equilibrio energético", letra: "E", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  { slug: "equinoterapia", nombre: "Equinoterapia", letra: "E", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  // F
  { slug: "fasciaterapia", nombre: "Fasciaterapia", letra: "F", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  { slug: "feng-shui", nombre: "Feng Shui", letra: "F", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  { slug: "fitoterapia", nombre: "Fitoterapia", letra: "F", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  { slug: "flores-de-bach", nombre: "Flores de Bach", letra: "F", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  // G
  { slug: "gestalt", nombre: "Gestalt", letra: "G", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  { slug: "ginecologia-holistica", nombre: "Ginecología holística", letra: "G", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  // H
  { slug: "hipnosis", nombre: "Hipnosis", letra: "H", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  { slug: "homeopatia", nombre: "Homeopatía", letra: "H", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  // I
  { slug: "iridologia", nombre: "Iridología", letra: "I", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  // K
  { slug: "kinesiologia", nombre: "Kinesiología", letra: "K", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  // M
  { slug: "masaje-relajante", nombre: "Masaje relajante", letra: "M", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  { slug: "masaje-terapeutico", nombre: "Masaje terapéutico", letra: "M", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  { slug: "meditacion", nombre: "Meditación", letra: "M", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  { slug: "medicina-tradicional-china", nombre: "Medicina tradicional china", letra: "M", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  { slug: "mindfulness", nombre: "Mindfulness", letra: "M", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  // N
  { slug: "naturopatia", nombre: "Naturopatía", letra: "N", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  { slug: "nutricion-consciente", nombre: "Nutrición consciente", letra: "N", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  // O
  { slug: "osteopatia", nombre: "Osteopatía", letra: "O", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  // P
  { slug: "pnl", nombre: "PNL (Programación Neurolingüística)", letra: "P", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  { slug: "psicologia-integrativa", nombre: "Psicología integrativa", letra: "P", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  // Q
  { slug: "quiromasaje", nombre: "Quiromasaje", letra: "Q", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  // R
  { slug: "reflexologia", nombre: "Reflexología", letra: "R", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  { slug: "reiki", nombre: "Reiki", letra: "R", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  { slug: "relajacion-guiada", nombre: "Relajación guiada", letra: "R", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  { slug: "respiracion-consciente", nombre: "Respiración consciente", letra: "R", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  // S
  { slug: "salud-bucodental", nombre: "Salud bucodental", letra: "S", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  { slug: "sanacion-energetica", nombre: "Sanación energética", letra: "S", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  { slug: "shiatsu", nombre: "Shiatsu", letra: "S", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  { slug: "sonoterapia", nombre: "Sonoterapia", letra: "S", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  // T
  { slug: "terapia-craneosacral", nombre: "Terapia craneosacral", letra: "T", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  { slug: "terapia-de-pareja", nombre: "Terapia de pareja", letra: "T", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  { slug: "terapia-emocional", nombre: "Terapia emocional", letra: "T", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  { slug: "terapia-familiar", nombre: "Terapia familiar", letra: "T", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  { slug: "terapia-transpersonal", nombre: "Terapia transpersonal", letra: "T", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
  // Y
  { slug: "yoga", nombre: "Yoga", letra: "Y", contenido: { queEs: "", comoFunciona: "", enQuePuedeAyudar: [], comoEsUnaSesion: "" }},
];

export const terapiasGrouped = terapias.reduce((acc, t) => {
  if (!acc[t.letra]) acc[t.letra] = [];
  acc[t.letra].push(t);
  return acc;
}, {} as Record<string, Terapia[]>);

export const getTerapiaBySlug = (slug: string): Terapia | undefined =>
  terapias.find(t => t.slug === slug);
