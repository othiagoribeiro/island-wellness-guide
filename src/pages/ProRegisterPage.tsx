import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/useI18n";
import { therapies, keywords } from "@/lib/mocks";
import { Check, UploadCloud, X, Loader2 } from "lucide-react";
import registerBg from "@/assets/register-bg.jpg";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Plan = "free" | "pro" | "premium";

interface StepOneData {
  name: string;
  email: string;
  phone: string;
  city: string;
  bio: string;
  website: string;
}

interface StepTwoData {
  therapyIds: string[];
  keywordIds: string[];
  plan: Plan;
  calendarUrl: string;
}

interface StepThreeData {
  identityFile: File | null;
  certFile: File | null;
  acceptCode: boolean;
}

type FieldErrors = Record<string, string>;

/* ------------------------------------------------------------------ */
/*  i18n helpers (inline, no touch to translations.ts)                 */
/* ------------------------------------------------------------------ */

const T: Record<string, Record<string, string>> = {
  "step1.label": { es: "Información básica", en: "Basic info", de: "Grundinformationen", ca: "Informació bàsica" },
  "step2.label": { es: "Tu práctica", en: "Your practice", de: "Ihre Praxis", ca: "La teva pràctica" },
  "step3.label": { es: "Verificación", en: "Verification", de: "Verifizierung", ca: "Verificació" },
  "field.name": { es: "Nombre completo", en: "Full name", de: "Vollständiger Name", ca: "Nom complet" },
  "field.name.ph": { es: "Ej: Ana García López", en: "E.g. Ana García López", de: "z.B. Ana García López", ca: "Ex: Ana García López" },
  "field.email": { es: "Correo electrónico", en: "Email", de: "E-Mail", ca: "Correu electrònic" },
  "field.phone": { es: "Teléfono (opcional)", en: "Phone (optional)", de: "Telefon (optional)", ca: "Telèfon (opcional)" },
  "field.city": { es: "Ciudad", en: "City", de: "Stadt", ca: "Ciutat" },
  "field.city.other": { es: "Otra", en: "Other", de: "Andere", ca: "Altra" },
  "field.bio": { es: "Presentación profesional", en: "Professional bio", de: "Professionelle Vorstellung", ca: "Presentació professional" },
  "field.bio.ph": { es: "Cuéntanos brevemente quién eres y cómo trabajas...", en: "Tell us briefly who you are and how you work...", de: "Erzählen Sie uns kurz, wer Sie sind und wie Sie arbeiten...", ca: "Explica'ns breument qui ets i com treballes..." },
  "field.website": { es: "Web o red social (opcional)", en: "Website or social (optional)", de: "Website oder Social Media (optional)", ca: "Web o xarxa social (opcional)" },
  "btn.next": { es: "Siguiente →", en: "Next →", de: "Weiter →", ca: "Següent →" },
  "btn.back": { es: "← Anterior", en: "← Back", de: "← Zurück", ca: "← Anterior" },
  "err.required": { es: "Este campo es obligatorio.", en: "This field is required.", de: "Dieses Feld ist erforderlich.", ca: "Aquest camp és obligatori." },
  "therapies.label": { es: "Terapias que ofreces", en: "Therapies you offer", de: "Therapien, die Sie anbieten", ca: "Teràpies que ofereixes" },
  "therapies.sub": { es: "Selecciona todas las que apliquen.", en: "Select all that apply.", de: "Wählen Sie alle zutreffenden aus.", ca: "Selecciona totes les que apliquin." },
  "keywords.label": { es: "¿Con qué puede ayudar?", en: "What can you help with?", de: "Wobei können Sie helfen?", ca: "Amb què pots ajudar?" },
  "keywords.sub": { es: "Estas palabras clave ayudan al buscador a encontrarte.", en: "These keywords help the search engine find you.", de: "Diese Schlüsselwörter helfen der Suchmaschine, Sie zu finden.", ca: "Aquestes paraules clau ajuden el cercador a trobar-te." },
  "plan.label": { es: "Elige tu plan inicial", en: "Choose your starting plan", de: "Wählen Sie Ihren Startplan", ca: "Tria el teu pla inicial" },
  "plan.compare": { es: "Ver comparativa completa →", en: "See full comparison →", de: "Vollständigen Vergleich ansehen →", ca: "Veure comparativa completa →" },
  "plan.free.b1": { es: "Perfil básico", en: "Basic profile", de: "Basisprofil", ca: "Perfil bàsic" },
  "plan.free.b2": { es: "Hasta 2 actividades/año", en: "Up to 2 activities/year", de: "Bis zu 2 Aktivitäten/Jahr", ca: "Fins a 2 activitats/any" },
  "plan.free.price": { es: "Gratis", en: "Free", de: "Kostenlos", ca: "Gratis" },
  "plan.pro.b1": { es: "Todo en Free", en: "Everything in Free", de: "Alles in Free", ca: "Tot en Free" },
  "plan.pro.b2": { es: "Agenda online + actividades ilimitadas", en: "Online calendar + unlimited activities", de: "Online-Kalender + unbegrenzte Aktivitäten", ca: "Agenda online + activitats il·limitades" },
  "plan.premium.b1": { es: "Todo en Pro", en: "Everything in Pro", de: "Alles in Pro", ca: "Tot en Pro" },
  "plan.premium.b2": { es: "Destacado en portada", en: "Featured on homepage", de: "Auf der Startseite hervorgehoben", ca: "Destacat a portada" },
  "plan.recommended": { es: "Recomendado", en: "Recommended", de: "Empfohlen", ca: "Recomanat" },
  "calendar.label": { es: "Enlace a tu agenda online (opcional)", en: "Your online calendar link (optional)", de: "Ihr Online-Kalenderlink (optional)", ca: "Enllaç a la teva agenda online (opcional)" },
  "calendar.note": { es: "Aparecerá como botón de reserva en tu perfil.", en: "Will appear as a booking button on your profile.", de: "Erscheint als Buchungsbutton in Ihrem Profil.", ca: "Apareixerà com a botó de reserva al teu perfil." },
  "verify.intro": { es: "Para aparecer como profesional verificado necesitamos comprobar tu identidad y tu formación. Es un proceso sencillo y lo revisamos en un plazo de 24 a 72 horas.", en: "To appear as a verified professional we need to verify your identity and training. It's a simple process and we review it within 24 to 72 hours.", de: "Um als verifizierter Fachmann zu erscheinen, müssen wir Ihre Identität und Ausbildung überprüfen. Es ist ein einfacher Prozess und wir prüfen ihn innerhalb von 24 bis 72 Stunden.", ca: "Per aparèixer com a professional verificat necessitem comprovar la teva identitat i la teva formació. És un procés senzill i el revisem en un termini de 24 a 72 hores." },
  "upload.id.label": { es: "Documento de identidad", en: "Identity document", de: "Ausweisdokument", ca: "Document d'identitat" },
  "upload.id.sub": { es: "DNI, NIE o pasaporte en vigor.", en: "Valid ID, NIE or passport.", de: "Gültiger Ausweis, NIE oder Reisepass.", ca: "DNI, NIE o passaport en vigor." },
  "upload.cert.label": { es: "Diploma o certificación profesional", en: "Professional diploma or certification", de: "Berufsdiplom oder Zertifizierung", ca: "Diploma o certificació professional" },
  "upload.cert.sub": { es: "Cualquier documento que acredite tu formación.", en: "Any document certifying your training.", de: "Jedes Dokument, das Ihre Ausbildung bescheinigt.", ca: "Qualsevol document que acrediti la teva formació." },
  "upload.drag": { es: "Arrastra el archivo aquí o haz clic para seleccionar", en: "Drag file here or click to select", de: "Datei hierher ziehen oder klicken zum Auswählen", ca: "Arrossega el fitxer aquí o fes clic per seleccionar" },
  "upload.remove": { es: "Eliminar", en: "Remove", de: "Entfernen", ca: "Eliminar" },
  "code.text1": { es: "He leído y acepto el ", en: "I have read and accept the ", de: "Ich habe den ", ca: "He llegit i accepto el " },
  "code.link": { es: "código deontológico", en: "deontological code", de: "Ehrenkodex", ca: "codi deontològic" },
  "code.text2": { es: " de Mallorca Holística y me comprometo a ejercer con ética y transparencia.", en: " of Mallorca Holística and I commit to practicing with ethics and transparency.", de: " gelesen und akzeptiert und verpflichte mich zu ethischem und transparentem Handeln.", ca: " de Mallorca Holística i em comprometo a exercir amb ètica i transparència." },
  "code.err": { es: "Debes aceptar el código deontológico para continuar.", en: "You must accept the deontological code to continue.", de: "Sie müssen den Ehrenkodex akzeptieren, um fortzufahren.", ca: "Has d'acceptar el codi deontològic per continuar." },
  "btn.submit": { es: "Enviar solicitud", en: "Submit application", de: "Antrag senden", ca: "Enviar sol·licitud" },
  "btn.sending": { es: "Enviando...", en: "Sending...", de: "Wird gesendet...", ca: "Enviant..." },
  "success.title": { es: "¡Solicitud enviada!", en: "Application sent!", de: "Antrag gesendet!", ca: "Sol·licitud enviada!" },
  "success.body": { es: "Revisaremos tu documentación en un plazo de 24 a 72 horas. Te avisaremos por correo electrónico cuando tu perfil esté verificado.", en: "We'll review your documentation within 24 to 72 hours. We'll notify you by email when your profile is verified.", de: "Wir werden Ihre Dokumentation innerhalb von 24 bis 72 Stunden überprüfen. Wir benachrichtigen Sie per E-Mail, wenn Ihr Profil verifiziert ist.", ca: "Revisarem la teva documentació en un termini de 24 a 72 hores. T'avisarem per correu electrònic quan el teu perfil estigui verificat." },
  "success.dashboard": { es: "Ir a mi panel →", en: "Go to my dashboard →", de: "Zum Dashboard →", ca: "Anar al meu panell →" },
  "success.home": { es: "Volver al inicio", en: "Back to home", de: "Zurück zur Startseite", ca: "Tornar a l'inici" },
  "err.therapies": { es: "Selecciona al menos una terapia.", en: "Select at least one therapy.", de: "Wählen Sie mindestens eine Therapie.", ca: "Selecciona almenys una teràpia." },
  "field.city.select": { es: "Seleccionar...", en: "Select...", de: "Auswählen...", ca: "Seleccionar..." },
};

const CITIES = ["Palma", "Sóller", "Deià", "Manacor", "Pollença", "Alcúdia"];

/* ------------------------------------------------------------------ */
/*  Shared styles                                                      */
/* ------------------------------------------------------------------ */

const inputBase = "w-full h-14 rounded-[10px] text-base px-4 font-sans bg-white text-foreground outline-none transition-colors";
const inputBorder = "border border-[rgba(44,74,62,0.25)] focus:border-[hsl(160,26%,35%)] focus:ring-2 focus:ring-[rgba(44,74,62,0.15)]";
const labelStyle = "block text-sm font-semibold text-ink mb-1.5";
const errorStyle = "text-[#C0392B] text-xs mt-1 font-normal";
const btnPrimary = "h-14 rounded-[10px] bg-[hsl(160,26%,23%)] text-white font-medium text-sm px-8 hover:opacity-90 transition-opacity disabled:opacity-50";
const btnGhost = "h-14 rounded-[10px] border border-[hsl(160,26%,23%)] text-[hsl(160,26%,23%)] font-medium text-sm px-8 hover:bg-[hsl(160,26%,23%)]/5 transition-colors";

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ProRegisterPage() {
  const { locale } = useI18n();
  const t = useCallback((key: string) => T[key]?.[locale] ?? T[key]?.es ?? key, [locale]);

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  // Step 1
  const [s1, setS1] = useState<StepOneData>({ name: "", email: "", phone: "", city: "", bio: "", website: "" });
  // Step 2
  const [s2, setS2] = useState<StepTwoData>({ therapyIds: [], keywordIds: [], plan: "pro", calendarUrl: "" });
  // Step 3
  const [s3, setS3] = useState<StepThreeData>({ identityFile: null, certFile: null, acceptCode: false });

  /* ---- Validation ---- */
  const validateStep1 = () => {
    const e: FieldErrors = {};
    if (!s1.name.trim()) e.name = t("err.required");
    if (!s1.email.trim()) e.email = t("err.required");
    if (!s1.city) e.city = t("err.required");
    if (!s1.bio.trim()) e.bio = t("err.required");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: FieldErrors = {};
    if (s2.therapyIds.length === 0) e.therapies = t("err.therapies");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep3 = () => {
    const e: FieldErrors = {};
    if (!s3.acceptCode) e.code = t("code.err");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goNext = () => {
    if (step === 1 && validateStep1()) { setStep(2); setErrors({}); }
    else if (step === 2 && validateStep2()) { setStep(3); setErrors({}); }
  };

  const goBack = () => { setStep(step - 1); setErrors({}); };

  const handleSubmit = () => {
    if (!validateStep3()) return;
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setDone(true); }, 1500);
  };

  /* ---- Toggle helpers ---- */
  const toggleArr = (arr: string[], id: string) =>
    arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id];

  /* ---- SUCCESS ---- */
  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center py-16 px-4 relative">
        <div className="absolute inset-0 z-0">
          <img src={registerBg} alt="" className="w-full h-full object-cover saturate-[0.35] contrast-[0.85] brightness-[0.45]" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(30,40,34,0.55), rgba(30,40,34,0.7))" }} />
        </div>
        <div className="relative z-10 bg-white rounded-2xl p-12 max-w-[480px] w-full text-center shadow-sm">
          <div className="mx-auto w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: "hsl(160,26%,35%)" }}>
            <Check className="text-white" size={36} />
          </div>
          <h2 className="text-2xl font-bold mt-6" style={{ color: "hsl(160,26%,23%)", fontFamily: "DM Sans" }}>{t("success.title")}</h2>
          <p className="text-stone text-[15px] leading-[1.7] mt-4">{t("success.body")}</p>
          <div className="flex flex-col gap-3 mt-8">
            <Link to="/pro/dashboard" className={`${btnPrimary} flex items-center justify-center`}>{t("success.dashboard")}</Link>
            <Link to="/" className={`${btnGhost} flex items-center justify-center`}>{t("success.home")}</Link>
          </div>
        </div>
      </div>
    );
  }

  /* ---- STEP INDICATOR ---- */
  const stepLabels = [t("step1.label"), t("step2.label"), t("step3.label")];

  const StepIndicator = (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-5 mb-8 shadow-sm">
      <div className="flex items-center justify-between max-w-[420px] mx-auto">
        {stepLabels.map((label, i) => {
          const num = i + 1;
          const isCompleted = num < step;
          const isActive = num === step;
          return (
            <div key={num} className="flex items-center" style={{ flex: i < stepLabels.length - 1 ? 1 : "none" }}>
              <div className="flex flex-col items-center" style={{ minWidth: 64 }}>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-all"
                  style={{
                    backgroundColor: isCompleted ? "hsl(160,26%,35%)" : isActive ? "hsl(160,26%,23%)" : "hsl(34,33%,95%)",
                    color: isCompleted || isActive ? "white" : "hsl(24,16%,58%)",
                    boxShadow: isActive ? "0 0 0 3px rgba(44,74,62,0.15)" : "none",
                  }}
                >
                  {isCompleted ? <Check size={16} strokeWidth={2.5} /> : num}
                </div>
                <span
                  className="text-[11px] sm:text-xs mt-2 text-center leading-tight whitespace-nowrap"
                  style={{
                    color: isActive ? "hsl(160,26%,23%)" : isCompleted ? "hsl(160,26%,35%)" : "hsl(24,16%,58%)",
                    fontFamily: "DM Sans",
                    fontWeight: isActive ? 700 : isCompleted ? 600 : 400,
                  }}
                >
                  {label}
                </span>
              </div>
              {i < stepLabels.length - 1 && (
                <div className="flex-1 mx-2 sm:mx-3 mt-[-18px]">
                  <div
                    className="h-[2px] w-full rounded-full transition-colors"
                    style={{ backgroundColor: isCompleted ? "hsl(160,26%,35%)" : "rgba(44,74,62,0.12)" }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  /* ---- CARD WRAPPER ---- */
  const Card = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-white rounded-2xl p-7 sm:p-10 shadow-sm">{children}</div>
  );

  /* ---- NAV BUTTONS ---- */
  const NavButtons = ({ onNext, nextLabel, showBack = true }: { onNext: () => void; nextLabel: string; showBack?: boolean }) => (
    <div className={`flex ${showBack ? "justify-between" : "justify-end"} mt-8`}>
      {showBack && (
        <button type="button" className={btnGhost + " flex items-center justify-center cursor-pointer"} onClick={goBack}>
          {t("btn.back")}
        </button>
      )}
      <button type="button" className={btnPrimary + " flex items-center justify-center cursor-pointer"} onClick={onNext}>
        {nextLabel}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen relative py-16 md:py-16 px-4" style={{ paddingTop: 64, paddingBottom: 64 }}>
      <div className="absolute inset-0 z-0">
        <img src={registerBg} alt="" className="w-full h-full object-cover saturate-[0.35] contrast-[0.85] brightness-[0.45]" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(30,40,34,0.55), rgba(30,40,34,0.7))" }} />
      </div>
      <div className="max-w-[680px] mx-auto relative z-10">
        {StepIndicator}

        {/* STEP 1 */}
        {step === 1 && (
          <Card>
            <div className="space-y-5">
              {/* Name */}
              <div>
                <label className={labelStyle}>{t("field.name")}</label>
                <input className={`${inputBase} ${inputBorder}`} value={s1.name} onChange={(e) => setS1({ ...s1, name: e.target.value })} placeholder={t("field.name.ph")} />
                {errors.name && <p className={errorStyle}>{errors.name}</p>}
              </div>
              {/* Email */}
              <div>
                <label className={labelStyle}>{t("field.email")}</label>
                <input className={`${inputBase} ${inputBorder}`} type="email" value={s1.email} onChange={(e) => setS1({ ...s1, email: e.target.value })} placeholder="hola@ejemplo.com" />
                {errors.email && <p className={errorStyle}>{errors.email}</p>}
              </div>
              {/* Phone */}
              <div>
                <label className={labelStyle}>{t("field.phone")}</label>
                <input className={`${inputBase} ${inputBorder}`} value={s1.phone} onChange={(e) => setS1({ ...s1, phone: e.target.value })} placeholder="+34 600 000 000" />
              </div>
              {/* City */}
              <div>
                <label className={labelStyle}>{t("field.city")}</label>
                <select
                  className={`${inputBase} ${inputBorder} appearance-none cursor-pointer`}
                  value={s1.city}
                  onChange={(e) => setS1({ ...s1, city: e.target.value })}
                >
                  <option value="">{t("field.city.select")}</option>
                  {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  <option value="other">{t("field.city.other")}</option>
                </select>
                {errors.city && <p className={errorStyle}>{errors.city}</p>}
              </div>
              {/* Bio */}
              <div>
                <label className={labelStyle}>{t("field.bio")}</label>
                <div className="relative">
                  <textarea
                    className={`${inputBase} ${inputBorder} h-auto resize-none pt-3`}
                    style={{ minHeight: 140 }}
                    maxLength={500}
                    value={s1.bio}
                    onChange={(e) => setS1({ ...s1, bio: e.target.value })}
                    placeholder={t("field.bio.ph")}
                  />
                  <span
                    className="absolute bottom-2 right-3 text-xs"
                    style={{ color: 500 - s1.bio.length < 50 ? "hsl(160,26%,35%)" : "hsl(24,16%,58%)" }}
                  >
                    {s1.bio.length}/500
                  </span>
                </div>
                {errors.bio && <p className={errorStyle}>{errors.bio}</p>}
              </div>
              {/* Website */}
              <div>
                <label className={labelStyle}>{t("field.website")}</label>
                <input className={`${inputBase} ${inputBorder}`} value={s1.website} onChange={(e) => setS1({ ...s1, website: e.target.value })} placeholder="https://..." />
              </div>
            </div>
            <NavButtons onNext={goNext} nextLabel={t("btn.next")} showBack={false} />
          </Card>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <Card>
            {/* Therapies */}
            <div className="mb-8">
              <label className={labelStyle}>{t("therapies.label")}</label>
              <p className="text-stone text-[13px] mb-3">{t("therapies.sub")}</p>
              <div className="flex flex-wrap gap-2">
                {therapies.map((th) => {
                  const sel = s2.therapyIds.includes(th.id);
                  return (
                    <div
                      key={th.id}
                      role="button"
                      tabIndex={0}
                      className="cursor-pointer rounded-full text-sm font-medium px-5 py-2.5 transition-all select-none"
                      style={{
                        backgroundColor: sel ? "hsl(160,26%,23%)" : "white",
                        color: sel ? "white" : "hsl(0,0%,18%)",
                        border: sel ? "none" : "1px solid rgba(44,74,62,0.25)",
                        fontFamily: "DM Sans",
                        fontWeight: 500,
                        fontSize: 14,
                      }}
                      onClick={() => setS2({ ...s2, therapyIds: toggleArr(s2.therapyIds, th.id) })}
                      onKeyDown={(e) => e.key === "Enter" && setS2({ ...s2, therapyIds: toggleArr(s2.therapyIds, th.id) })}
                    >
                      {th.name[locale]}
                    </div>
                  );
                })}
              </div>
              {errors.therapies && <p className={errorStyle}>{errors.therapies}</p>}
            </div>

            {/* Keywords */}
            <div className="mb-8">
              <label className={labelStyle}>{t("keywords.label")}</label>
              <p className="text-stone text-[13px] mb-3">{t("keywords.sub")}</p>
              <div className="flex flex-wrap gap-2">
                {keywords.map((kw) => {
                  const sel = s2.keywordIds.includes(kw.id);
                  return (
                    <div
                      key={kw.id}
                      role="button"
                      tabIndex={0}
                      className="cursor-pointer rounded-full text-sm font-medium px-5 py-2.5 transition-all select-none"
                      style={{
                        backgroundColor: sel ? "hsl(160,26%,23%)" : "white",
                        color: sel ? "white" : "hsl(0,0%,18%)",
                        border: sel ? "none" : "1px solid rgba(44,74,62,0.25)",
                        fontFamily: "DM Sans",
                        fontWeight: 500,
                        fontSize: 14,
                      }}
                      onClick={() => setS2({ ...s2, keywordIds: toggleArr(s2.keywordIds, kw.id) })}
                      onKeyDown={(e) => e.key === "Enter" && setS2({ ...s2, keywordIds: toggleArr(s2.keywordIds, kw.id) })}
                    >
                      {kw.name[locale]}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Plan */}
            <div className="mb-8">
              <div className="flex items-baseline justify-between mb-3">
                <label className={labelStyle + " mb-0"}>{t("plan.label")}</label>
                <a href="/para-profesionales" target="_blank" rel="noopener noreferrer" className="text-[13px] font-medium" style={{ color: "hsl(160,26%,35%)" }}>
                  {t("plan.compare")}
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(["free", "pro", "premium"] as Plan[]).map((plan) => {
                  const sel = s2.plan === plan;
                  const titles = { free: "Free", pro: "Pro", premium: "Premium" };
                  const prices = { free: t("plan.free.price"), pro: "€9/mes", premium: "€19/mes" };
                  const bullets = {
                    free: [t("plan.free.b1"), t("plan.free.b2")],
                    pro: [t("plan.pro.b1"), t("plan.pro.b2")],
                    premium: [t("plan.premium.b1"), t("plan.premium.b2")],
                  };
                  return (
                    <div
                      key={plan}
                      role="button"
                      tabIndex={0}
                      className="relative rounded-xl p-5 cursor-pointer transition-all"
                      style={{
                        border: sel ? "2px solid hsl(160,26%,23%)" : "1.5px solid rgba(44,74,62,0.15)",
                        backgroundColor: sel ? "rgba(44,74,62,0.04)" : "white",
                      }}
                      onClick={() => setS2({ ...s2, plan })}
                      onKeyDown={(e) => e.key === "Enter" && setS2({ ...s2, plan })}
                    >
                      {plan === "pro" && (
                        <span className="absolute top-2 right-2 text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded" style={{ backgroundColor: "hsl(160,26%,35%)", color: "hsl(160,26%,23%)" }}>
                          {t("plan.recommended")}
                        </span>
                      )}
                      <p className="font-bold text-base" style={{ color: "hsl(160,26%,23%)", fontFamily: "DM Sans" }}>{titles[plan]}</p>
                      <p className="text-stone text-sm mt-1">{prices[plan]}</p>
                      <ul className="mt-3 space-y-1">
                        {bullets[plan].map((b, i) => (
                          <li key={i} className="text-stone text-[13px]">• {b}</li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Calendar URL */}
            {(s2.plan === "pro" || s2.plan === "premium") && (
              <div className="mb-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <label className={labelStyle}>{t("calendar.label")}</label>
                <input className={`${inputBase} ${inputBorder}`} value={s2.calendarUrl} onChange={(e) => setS2({ ...s2, calendarUrl: e.target.value })} placeholder="https://calendly.com/tu-nombre" />
                <p className="text-stone text-xs mt-1">{t("calendar.note")}</p>
              </div>
            )}

            <NavButtons onNext={goNext} nextLabel={t("btn.next")} />
          </Card>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <Card>
            <p className="text-ink text-[15px] leading-[1.7] mb-8">{t("verify.intro")}</p>

            {/* Upload 1 - Identity */}
            <UploadArea
              label={t("upload.id.label")}
              subtitle={t("upload.id.sub")}
              dragText={t("upload.drag")}
              removeText={t("upload.remove")}
              file={s3.identityFile}
              onFile={(f) => setS3({ ...s3, identityFile: f })}
            />

            {/* Upload 2 - Cert */}
            <div className="mt-6">
              <UploadArea
                label={t("upload.cert.label")}
                subtitle={t("upload.cert.sub")}
                dragText={t("upload.drag")}
                removeText={t("upload.remove")}
                file={s3.certFile}
                onFile={(f) => setS3({ ...s3, certFile: f })}
              />
            </div>

            {/* Deontological code */}
            <div className="mt-8">
              <div className="flex items-start gap-3">
                <div
                  role="button"
                  tabIndex={0}
                  className="w-5 h-5 rounded shrink-0 mt-0.5 flex items-center justify-center cursor-pointer transition-colors"
                  style={{
                    backgroundColor: s3.acceptCode ? "hsl(160,26%,23%)" : "white",
                    border: s3.acceptCode ? "none" : "1.5px solid rgba(44,74,62,0.25)",
                  }}
                  onClick={() => setS3({ ...s3, acceptCode: !s3.acceptCode })}
                  onKeyDown={(e) => e.key === "Enter" && setS3({ ...s3, acceptCode: !s3.acceptCode })}
                >
                  {s3.acceptCode && <Check size={14} className="text-white" />}
                </div>
                <p className="text-ink text-sm leading-relaxed">
                  {t("code.text1")}
                  <Link to="/about" className="underline" style={{ color: "hsl(160,26%,35%)" }}>{t("code.link")}</Link>
                  {t("code.text2")}
                </p>
              </div>
              {errors.code && <p className={errorStyle + " ml-8"}>{errors.code}</p>}
            </div>

            {/* Nav */}
            <div className="flex justify-between mt-8">
              <button type="button" className={btnGhost + " flex items-center justify-center cursor-pointer"} onClick={goBack}>
                {t("btn.back")}
              </button>
              <button
                type="button"
                className={btnPrimary + " flex items-center justify-center cursor-pointer flex-1 ml-3"}
                disabled={submitting}
                onClick={handleSubmit}
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin mr-2" />
                    {t("btn.sending")}
                  </>
                ) : (
                  t("btn.submit")
                )}
              </button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Upload Area sub-component                                          */
/* ------------------------------------------------------------------ */

function UploadArea({
  label, subtitle, dragText, removeText, file, onFile,
}: {
  label: string; subtitle: string; dragText: string; removeText: string;
  file: File | null; onFile: (f: File | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (files: FileList | null) => {
    if (files && files[0]) onFile(files[0]);
  };

  if (file) {
    return (
      <div>
        <label className={labelStyle}>{label}</label>
        <p className="text-stone text-[13px] mb-2">{subtitle}</p>
        <div className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ border: "1.5px solid rgba(44,74,62,0.25)", background: "rgba(44,74,62,0.03)" }}>
          <Check size={18} style={{ color: "hsl(160,26%,35%)" }} />
          <span className="text-sm text-ink truncate flex-1">{file.name}</span>
          <span
            role="button"
            tabIndex={0}
            className="text-stone text-xs cursor-pointer hover:underline"
            onClick={() => onFile(null)}
            onKeyDown={(e) => e.key === "Enter" && onFile(null)}
          >
            {removeText}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <label className={labelStyle}>{label}</label>
      <p className="text-stone text-[13px] mb-2">{subtitle}</p>
      <div
        role="button"
        tabIndex={0}
        className="flex flex-col items-center justify-center rounded-xl py-8 cursor-pointer transition-colors hover:bg-[rgba(44,74,62,0.05)]"
        style={{ border: "2px dashed rgba(44,74,62,0.3)", background: "rgba(44,74,62,0.03)" }}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files); }}
      >
        <UploadCloud size={32} style={{ color: "hsl(160,26%,35%)" }} />
        <p className="text-stone text-sm mt-2 text-center px-4">{dragText}</p>
        <p className="text-stone text-xs mt-1">PDF, JPG, PNG · Máx 5MB</p>
        <input ref={inputRef} type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFile(e.target.files)} />
      </div>
    </div>
  );
}
