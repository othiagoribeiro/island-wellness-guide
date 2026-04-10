import type { Locale } from "@/i18n/locales";
import photoPro0001 from "@/assets/pro_0001.jpg";
import photoPro0002 from "@/assets/pro_0002.jpg";
import photoPro0003 from "@/assets/pro_0003.jpg";
import photoPro0004 from "@/assets/pro_0004.jpg";
import photoPro0005 from "@/assets/pro_0005.jpg";
import photoPro0006 from "@/assets/pro_0006.jpg";

export interface Therapy {
  id: string;
  name: Record<Locale, string>;
  description: Record<Locale, string>;
}

export interface Keyword {
  id: string;
  name: Record<Locale, string>;
}

export interface Certification {
  title: string;
  institution: string;
  year: number;
}

export interface Professional {
  id: string;
  name: string;
  specialty: Record<Locale, string>;
  city: string;
  lat: number;
  lng: number;
  therapyIds: string[];
  keywordIds: string[];
  verificationStatus: "approved";
  published: boolean;
  photo?: string;
  bio?: Record<Locale, string>;
  email?: string;
  phone?: string;
  website?: string;
  instagram?: string;
  linkedin?: string;
  certifications?: Certification[];
  plan?: "free" | "pro" | "premium";
  externalCalendarUrl?: string;
}

export interface Activity {
  id: string;
  title: Record<Locale, string>;
  city: string;
  date: string;
  signupUrl: string;
  description?: Record<Locale, string>;
}

export interface BlogPost {
  id: string;
  title: Record<Locale, string>;
  therapyId: string;
  excerpt: Record<Locale, string>;
  body: Record<Locale, string>;
}

export const therapies: Therapy[] = [
  { id: "th_0001", name: { es: "Osteopatía", ca: "Osteopatia", en: "Osteopathy", de: "Osteopathie" }, description: { es: "Terapia manual que trata disfunciones del cuerpo.", ca: "Teràpia manual que tracta disfuncions del cos.", en: "Manual therapy treating body dysfunctions.", de: "Manualtherapie zur Behandlung von Körperfunktionsstörungen." } },
  { id: "th_0002", name: { es: "Quiromasaje", ca: "Quiromassatge", en: "Chiromassage", de: "Chiromassage" }, description: { es: "Masaje terapéutico manual.", ca: "Massatge terapèutic manual.", en: "Therapeutic manual massage.", de: "Therapeutische manuelle Massage." } },
  { id: "th_0003", name: { es: "Acupuntura", ca: "Acupuntura", en: "Acupuncture", de: "Akupunktur" }, description: { es: "Técnica de medicina china con agujas finas.", ca: "Tècnica de medicina xinesa amb agulles fines.", en: "Chinese medicine technique with fine needles.", de: "Chinesische Medizintechnik mit feinen Nadeln." } },
  { id: "th_0004", name: { es: "Reiki", ca: "Reiki", en: "Reiki", de: "Reiki" }, description: { es: "Sanación energética mediante imposición de manos.", ca: "Sanació energètica mitjançant imposició de mans.", en: "Energy healing through hand placement.", de: "Energieheilung durch Handauflegen." } },
  { id: "th_0005", name: { es: "Mindfulness", ca: "Mindfulness", en: "Mindfulness", de: "Achtsamkeit" }, description: { es: "Práctica de atención plena para reducir estrés.", ca: "Pràctica d'atenció plena per reduir estrès.", en: "Mindful awareness practice to reduce stress.", de: "Achtsamkeitspraxis zur Stressreduktion." } },
  { id: "th_0006", name: { es: "Yoga terapéutico", ca: "Ioga terapèutic", en: "Therapeutic yoga", de: "Therapeutisches Yoga" }, description: { es: "Yoga adaptado a necesidades de salud.", ca: "Ioga adaptat a necessitats de salut.", en: "Yoga adapted to health needs.", de: "An Gesundheitsbedürfnisse angepasstes Yoga." } },
  { id: "th_0007", name: { es: "Breathwork", ca: "Breathwork", en: "Breathwork", de: "Atemarbeit" }, description: { es: "Técnicas de respiración consciente.", ca: "Tècniques de respiració conscient.", en: "Conscious breathing techniques.", de: "Bewusste Atemtechniken." } },
  { id: "th_0008", name: { es: "Coaching", ca: "Coaching", en: "Coaching", de: "Coaching" }, description: { es: "Acompañamiento para desarrollo personal.", ca: "Acompanyament per al desenvolupament personal.", en: "Support for personal development.", de: "Begleitung zur persönlichen Entwicklung." } },
  { id: "th_0009", name: { es: "Constelaciones familiares", ca: "Constel·lacions familiars", en: "Family constellations", de: "Familienaufstellungen" }, description: { es: "Método para resolver dinámicas familiares.", ca: "Mètode per resoldre dinàmiques familiars.", en: "Method to resolve family dynamics.", de: "Methode zur Lösung familiärer Dynamiken." } },
  { id: "th_0010", name: { es: "Drenaje linfático", ca: "Drenatge limfàtic", en: "Lymphatic drainage", de: "Lymphdrainage" }, description: { es: "Masaje suave para estimular el sistema linfático.", ca: "Massatge suau per estimular el sistema limfàtic.", en: "Gentle massage to stimulate the lymphatic system.", de: "Sanfte Massage zur Anregung des Lymphsystems." } },
  { id: "th_0011", name: { es: "Pilates", ca: "Pilates", en: "Pilates", de: "Pilates" }, description: { es: "Ejercicio de control corporal y flexibilidad.", ca: "Exercici de control corporal i flexibilitat.", en: "Body control and flexibility exercise.", de: "Übung für Körperkontrolle und Flexibilität." } },
  { id: "th_0012", name: { es: "Naturopatía", ca: "Naturopatia", en: "Naturopathy", de: "Naturheilkunde" }, description: { es: "Enfoque integral de salud con medios naturales.", ca: "Enfocament integral de salut amb mitjans naturals.", en: "Holistic health approach with natural means.", de: "Ganzheitlicher Gesundheitsansatz mit natürlichen Mitteln." } },
];

export const keywords: Keyword[] = [
  { id: "kw_0001", name: { es: "Estrés", ca: "Estrès", en: "Stress", de: "Stress" } },
  { id: "kw_0002", name: { es: "Ansiedad", ca: "Ansietat", en: "Anxiety", de: "Angst" } },
  { id: "kw_0003", name: { es: "Insomnio", ca: "Insomni", en: "Insomnia", de: "Schlaflosigkeit" } },
  { id: "kw_0004", name: { es: "Dolor crónico", ca: "Dolor crònic", en: "Chronic pain", de: "Chronische Schmerzen" } },
  { id: "kw_0005", name: { es: "Tensión muscular", ca: "Tensió muscular", en: "Muscle tension", de: "Muskelverspannung" } },
  { id: "kw_0006", name: { es: "Cefaleas", ca: "Cefalees", en: "Headaches", de: "Kopfschmerzen" } },
  { id: "kw_0007", name: { es: "Equilibrio emocional", ca: "Equilibri emocional", en: "Emotional balance", de: "Emotionales Gleichgewicht" } },
  { id: "kw_0008", name: { es: "Fatiga", ca: "Fatiga", en: "Fatigue", de: "Müdigkeit" } },
];

export const professionals: Professional[] = [
  {
    id: "pro_0001", name: "Ana María Ruiz",
    specialty: { es: "Acupuntura & Medicina Tradicional China", ca: "Acupuntura & Medicina Tradicional Xinesa", en: "Acupuncture & Traditional Chinese Medicine", de: "Akupunktur & Traditionelle Chinesische Medizin" },
    city: "Palma", lat: 39.5696, lng: 2.6502,
    therapyIds: ["th_0003"], keywordIds: ["kw_0001", "kw_0004", "kw_0003", "kw_0002"],
    verificationStatus: "approved", published: true, photo: photoPro0001,
    bio: { es: "Especialista en acupuntura con más de 10 años de experiencia.", ca: "Especialista en acupuntura amb més de 10 anys d'experiència.", en: "Acupuncture specialist with over 10 years of experience.", de: "Akupunkturspezialistin mit über 10 Jahren Erfahrung." },
    email: "ana@example.com", phone: "+34 612 345 678", website: "https://anamaria-acupuntura.com",
    instagram: "https://instagram.com/anamaria.acupuntura", linkedin: "https://linkedin.com/in/anamaria-ruiz",
    plan: "pro",
    externalCalendarUrl: "https://calendly.com/anamaria-ruiz",
    certifications: [
      { title: "Licenciada en Medicina Tradicional China", institution: "Universidad de Barcelona", year: 2008 },
      { title: "Certificada en Acupuntura Clínica", institution: "Escuela Superior de MTC", year: 2010 },
    ],
  },
  {
    id: "pro_0002", name: "Isabel Torres",
    specialty: { es: "Reiki & Sanación Energética", ca: "Reiki & Sanació Energètica", en: "Reiki & Energy Healing", de: "Reiki & Energieheilung" },
    city: "Deià", lat: 39.7487, lng: 2.6490,
    therapyIds: ["th_0004"], keywordIds: ["kw_0007", "kw_0008", "kw_0001", "kw_0002"],
    verificationStatus: "approved", published: true, photo: photoPro0002,
    bio: { es: "Maestra de Reiki nivel III con enfoque en sanación emocional.", ca: "Mestra de Reiki nivell III amb enfocament en sanació emocional.", en: "Reiki Master level III focused on emotional healing.", de: "Reiki-Meisterin Stufe III mit Schwerpunkt emotionale Heilung." },
    email: "isabel@example.com",
  },
  {
    id: "pro_0003", name: "Carlos Vidal",
    specialty: { es: "Masaje Craneosacral & Osteopatía", ca: "Massatge Craneosacral & Osteopatia", en: "Craniosacral Massage & Osteopathy", de: "Kraniosakralmassage & Osteopathie" },
    city: "Sóller", lat: 39.7694, lng: 2.7148,
    therapyIds: ["th_0001", "th_0002"], keywordIds: ["kw_0005", "kw_0006", "kw_0004", "kw_0002"],
    verificationStatus: "approved", published: true, photo: photoPro0003,
    bio: { es: "Osteópata titulado con especialización en terapia craneosacral.", ca: "Osteopata titulat amb especialització en teràpia craneosacral.", en: "Licensed osteopath specializing in craniosacral therapy.", de: "Zugelassener Osteopath mit Spezialisierung auf Kraniosakraltherapie." },
    email: "carlos@example.com",
  },
  {
    id: "pro_0004", name: "Lucía Fernández",
    specialty: { es: "Naturopatía & Fitoterapia", ca: "Naturopatia & Fitoteràpia", en: "Naturopathy & Phytotherapy", de: "Naturheilkunde & Phytotherapie" },
    city: "Manacor", lat: 39.5671, lng: 3.2100,
    therapyIds: ["th_0012"], keywordIds: ["kw_0004", "kw_0002", "kw_0007", "kw_0008"],
    verificationStatus: "approved", published: true, photo: photoPro0004,
    bio: { es: "Naturópata certificada especializada en fitoterapia y nutrición.", ca: "Naturòpata certificada especialitzada en fitoteràpia i nutrició.", en: "Certified naturopath specializing in phytotherapy and nutrition.", de: "Zertifizierte Naturheilpraktikerin mit Spezialisierung auf Phytotherapie und Ernährung." },
    email: "lucia@example.com",
  },
  {
    id: "pro_0005", name: "Marco Benítez",
    specialty: { es: "Yoga Terapéutico & Meditación", ca: "Ioga Terapèutic & Meditació", en: "Therapeutic Yoga & Meditation", de: "Therapeutisches Yoga & Meditation" },
    city: "Pollença", lat: 39.8783, lng: 3.0146,
    therapyIds: ["th_0006", "th_0005"], keywordIds: ["kw_0001", "kw_0005", "kw_0004", "kw_0002"],
    verificationStatus: "approved", published: true, photo: photoPro0005,
    bio: { es: "Instructor de yoga terapéutico y meditación con formación en India.", ca: "Instructor de ioga terapèutic i meditació amb formació a l'Índia.", en: "Therapeutic yoga and meditation instructor trained in India.", de: "Therapeutischer Yoga- und Meditationslehrer, ausgebildet in Indien." },
    email: "marco@example.com",
  },
  {
    id: "pro_0006", name: "David Martín",
    specialty: { es: "Reflexología Podal y Auricular", ca: "Reflexologia Podal i Auricular", en: "Foot & Ear Reflexology", de: "Fuß- & Ohrreflexologie" },
    city: "Alcúdia", lat: 39.8530, lng: 3.1210,
    therapyIds: ["th_0002"], keywordIds: ["kw_0001", "kw_0005", "kw_0004", "kw_0008"],
    verificationStatus: "approved", published: true, photo: photoPro0006,
    bio: { es: "Reflexólogo certificado con enfoque en bienestar integral.", ca: "Reflexòleg certificat amb enfocament en benestar integral.", en: "Certified reflexologist focused on holistic wellbeing.", de: "Zertifizierter Reflexologe mit Fokus auf ganzheitliches Wohlbefinden." },
    email: "david@example.com",
  },
];

export const activities: Activity[] = [
  {
    id: "act_0001",
    title: { es: "Taller de Breathwork", ca: "Taller de Breathwork", en: "Breathwork Workshop", de: "Atemarbeit-Workshop" },
    city: "Palma", date: "2026-05-10", signupUrl: "#",
    description: { es: "Un taller práctico de técnicas de respiración consciente.", ca: "Un taller pràctic de tècniques de respiració conscient.", en: "A practical workshop on conscious breathing techniques.", de: "Ein praktischer Workshop für bewusste Atemtechniken." },
  },
  {
    id: "act_0002",
    title: { es: "Retiro de Mindfulness", ca: "Retir de Mindfulness", en: "Mindfulness Retreat", de: "Achtsamkeits-Retreat" },
    city: "Sóller", date: "2026-05-24", signupUrl: "#",
    description: { es: "Retiro de fin de semana para cultivar la atención plena.", ca: "Retir de cap de setmana per cultivar l'atenció plena.", en: "Weekend retreat to cultivate mindful awareness.", de: "Wochenend-Retreat zur Kultivierung der Achtsamkeit." },
  },
  {
    id: "act_0003",
    title: { es: "Clase de Yoga Terapéutico", ca: "Classe de Ioga Terapèutic", en: "Therapeutic Yoga Class", de: "Therapeutische Yoga-Klasse" },
    city: "Pollença", date: "2026-06-07", signupUrl: "#",
    description: { es: "Clase abierta de yoga adaptado a necesidades individuales.", ca: "Classe oberta de ioga adaptat a necessitats individuals.", en: "Open yoga class adapted to individual needs.", de: "Offene Yogaklasse, angepasst an individuelle Bedürfnisse." },
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "ct_0001", therapyId: "th_0001",
    title: { es: "Qué es la osteopatía y para quién es", ca: "Què és l'osteopatia i per a qui és", en: "What is osteopathy and who is it for", de: "Was ist Osteopathie und für wen ist sie" },
    excerpt: { es: "La osteopatía es una terapia manual que busca restablecer el equilibrio del cuerpo de forma natural.", ca: "L'osteopatia és una teràpia manual que busca restablir l'equilibri del cos de forma natural.", en: "Osteopathy is a manual therapy that seeks to restore the body's natural balance.", de: "Osteopathie ist eine manuelle Therapie, die das natürliche Gleichgewicht des Körpers wiederherstellt." },
    body: { es: "La osteopatía es una disciplina terapéutica manual que se centra en la estructura del cuerpo y su funcionamiento. A través de técnicas manuales, el osteópata busca restaurar la movilidad y el equilibrio del organismo. Es especialmente útil para dolor de espalda, tensión muscular, cefaleas y problemas posturales. Puede beneficiar a personas de todas las edades.", ca: "L'osteopatia és una disciplina terapèutica manual que se centra en l'estructura del cos i el seu funcionament. A través de tècniques manuals, l'osteopata busca restaurar la mobilitat i l'equilibri de l'organisme.", en: "Osteopathy is a manual therapeutic discipline that focuses on the structure of the body and how it functions. Through manual techniques, the osteopath seeks to restore mobility and balance to the body. It is especially useful for back pain, muscle tension, headaches, and postural problems.", de: "Osteopathie ist eine manuelle therapeutische Disziplin, die sich auf die Struktur des Körpers und seine Funktionsweise konzentriert. Durch manuelle Techniken versucht der Osteopath, die Mobilität und das Gleichgewicht des Körpers wiederherzustellen." },
  },
  {
    id: "ct_0002", therapyId: "th_0005",
    title: { es: "Mindfulness: primeros pasos", ca: "Mindfulness: primers passos", en: "Mindfulness: first steps", de: "Achtsamkeit: erste Schritte" },
    excerpt: { es: "Descubre cómo empezar a practicar mindfulness en tu día a día con técnicas sencillas.", ca: "Descobreix com començar a practicar mindfulness en el teu dia a dia amb tècniques senzilles.", en: "Discover how to start practicing mindfulness in your daily life with simple techniques.", de: "Entdecken Sie, wie Sie mit einfachen Techniken Achtsamkeit in Ihren Alltag integrieren." },
    body: { es: "El mindfulness o atención plena es la práctica de prestar atención al momento presente de forma deliberada y sin juzgar. Puedes empezar dedicando 5 minutos al día a observar tu respiración. Con el tiempo, esta práctica puede ayudarte a reducir el estrés, mejorar la concentración y aumentar el bienestar emocional.", ca: "El mindfulness o atenció plena és la pràctica de prestar atenció al moment present de forma deliberada i sense jutjar.", en: "Mindfulness is the practice of deliberately paying attention to the present moment without judgment. You can start by dedicating 5 minutes a day to observing your breathing.", de: "Achtsamkeit ist die Praxis, dem gegenwärtigen Moment bewusst und ohne Urteil Aufmerksamkeit zu schenken." },
  },
  {
    id: "ct_0003", therapyId: "th_0007",
    title: { es: "Breathwork para reducir el estrés", ca: "Breathwork per reduir l'estrès", en: "Breathwork to reduce stress", de: "Atemarbeit zur Stressreduktion" },
    excerpt: { es: "Las técnicas de respiración consciente pueden transformar tu relación con el estrés.", ca: "Les tècniques de respiració conscient poden transformar la teva relació amb l'estrès.", en: "Conscious breathing techniques can transform your relationship with stress.", de: "Bewusste Atemtechniken können Ihre Beziehung zu Stress verändern." },
    body: { es: "El breathwork engloba diversas técnicas de respiración que se utilizan para mejorar el bienestar físico y emocional. Desde la respiración diafragmática hasta técnicas más avanzadas como la respiración holotrópica, estas prácticas ayudan a regular el sistema nervioso y reducir los niveles de cortisol.", ca: "El breathwork engloba diverses tècniques de respiració que s'utilitzen per millorar el benestar físic i emocional.", en: "Breathwork encompasses various breathing techniques used to improve physical and emotional wellbeing. From diaphragmatic breathing to more advanced techniques, these practices help regulate the nervous system.", de: "Atemarbeit umfasst verschiedene Atemtechniken, die zur Verbesserung des körperlichen und emotionalen Wohlbefindens eingesetzt werden." },
  },
  {
    id: "ct_0004", therapyId: "th_0004",
    title: { es: "Reiki: preguntas frecuentes", ca: "Reiki: preguntes freqüents", en: "Reiki: frequently asked questions", de: "Reiki: häufig gestellte Fragen" },
    excerpt: { es: "Resolvemos las dudas más comunes sobre el Reiki y sus beneficios.", ca: "Resolem els dubtes més comuns sobre el Reiki i els seus beneficis.", en: "We answer the most common questions about Reiki and its benefits.", de: "Wir beantworten die häufigsten Fragen zu Reiki und seinen Vorteilen." },
    body: { es: "El Reiki es una técnica de sanación energética que se originó en Japón. El practicante canaliza energía universal a través de sus manos para promover la relajación y el equilibrio. No requiere contacto físico y es compatible con cualquier otro tratamiento.", ca: "El Reiki és una tècnica de sanació energètica que es va originar al Japó.", en: "Reiki is an energy healing technique that originated in Japan. The practitioner channels universal energy through their hands to promote relaxation and balance.", de: "Reiki ist eine Energieheilungstechnik, die ihren Ursprung in Japan hat. Der Praktizierende kanalisiert universelle Energie durch seine Hände." },
  },
];

export const CITIES = ["Palma", "Sóller", "Deià", "Manacor", "Pollença", "Alcúdia"];
