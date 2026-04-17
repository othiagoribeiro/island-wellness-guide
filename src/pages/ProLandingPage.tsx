import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/useI18n";
import { Eye, Languages, ShieldCheck, Sparkles, UserPlus, Globe, MessageCircle, Check, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* ─── HERO ─── */
function ProHero() {
  const { t } = useI18n();

  const scrollToPlans = () => {
    document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-background py-20 md:py-[120px] border-b border-border/50">
      <div className="container mx-auto px-4 max-w-[800px] text-center">
        <span className="text-accent text-xs uppercase tracking-[0.15em] mb-5 block">
          {t("proLanding.eyebrow")}
        </span>
        <h1 className="text-3xl md:text-[42px] text-primary leading-tight mb-5">
          {t("proLanding.hero.title")}
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          {t("proLanding.hero.trust")}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Link
            to="/pro/register"
            className="bg-primary text-primary-foreground px-8 rounded-[10px] hover:opacity-90 transition-all flex items-center justify-center"
            style={{ height: 56 }}
          >
            {t("proLanding.hero.cta1")}
          </Link>
          <button
            onClick={scrollToPlans}
            className="border border-primary text-primary px-8 rounded-[10px] hover:bg-primary/5 transition-all flex items-center justify-center"
            style={{ height: 56 }}
          >
            {t("proLanding.hero.cta2")}
          </button>
        </div>

        <Link to="/pro/login" className="text-[13px] text-muted-foreground hover:text-primary transition-colors">
          {t("proLogin.hasAccount")}
        </Link>
      </div>
    </section>
  );
}

/* ─── WHY JOIN ─── */
const whyCards = [
  { icon: Eye, titleKey: "proLanding.why.card1.title" as const, bodyKey: "proLanding.why.card1.body" as const },
  { icon: Languages, titleKey: "proLanding.why.card2.title" as const, bodyKey: "proLanding.why.card2.body" as const },
  { icon: ShieldCheck, titleKey: "proLanding.why.card3.title" as const, bodyKey: "proLanding.why.card3.body" as const },
  { icon: Sparkles, titleKey: "proLanding.why.card4.title" as const, bodyKey: "proLanding.why.card4.body" as const },
];

function WhyJoin() {
  const { t } = useI18n();
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-12">
          {t("proLanding.why.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-4xl mx-auto">
          {whyCards.map((c) => (
            <div key={c.titleKey} className="bg-surface rounded-xl p-7 shadow-sm border border-border/40">
              <c.icon size={28} className="text-accent mb-4" />
              <h3 className="font-semibold text-primary text-base mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {t(c.titleKey)}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{t(c.bodyKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── HOW IT WORKS ─── */
const howSteps = [
  { num: "1", icon: UserPlus, titleKey: "proLanding.how.step1.title" as const, bodyKey: "proLanding.how.step1.body" as const },
  { num: "2", icon: ShieldCheck, titleKey: "proLanding.how.step2.title" as const, bodyKey: "proLanding.how.step2.body" as const },
  { num: "3", icon: Globe, titleKey: "proLanding.how.step3.title" as const, bodyKey: "proLanding.how.step3.body" as const },
  { num: "4", icon: MessageCircle, titleKey: "proLanding.how.step4.title" as const, bodyKey: "proLanding.how.step4.body" as const },
];

function HowItWorksPro() {
  const { t } = useI18n();
  return (
    <section className="py-16 md:py-24 bg-surface">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-12 md:mb-16">
          {t("proLanding.how.title")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-5 max-w-5xl mx-auto relative">
          {howSteps.map((step, i) => (
            <div key={step.num} className="flex flex-col items-center text-center relative">
              {i < howSteps.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-2.5 translate-x-1/2 z-10">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-accent/50">
                    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "hsl(24 40% 92%)" }}>
                <step.icon size={28} className="text-accent" strokeWidth={1.4} />
              </div>
              <h3 className="font-semibold text-primary text-base mb-2">{t(step.titleKey)}</h3>
              <p className="text-sm leading-relaxed max-w-[240px]" style={{ color: "rgba(0,0,0,0.9)" }}>{t(step.bodyKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PLANS ─── */
function Plans() {
  const { t } = useI18n();

  const plans = [
    {
      name: t("proLanding.plans.free.title"),
      price: t("proLanding.plans.free.price"),
      highlighted: false,
      features: [
        t("proLanding.plans.free.f1"),
        t("proLanding.plans.free.f2"),
        t("proLanding.plans.free.f3"),
        t("proLanding.plans.free.f4"),
      ],
      missing: [
        t("proLanding.plans.free.x1"),
        t("proLanding.plans.free.x2"),
      ],
    },
    {
      name: t("proLanding.plans.pro.title"),
      price: t("proLanding.plans.pro.price"),
      highlighted: true,
      features: [
        t("proLanding.plans.pro.f1"),
        t("proLanding.plans.pro.f2"),
        t("proLanding.plans.pro.f3"),
        t("proLanding.plans.pro.f4"),
        t("proLanding.plans.pro.f5"),
      ],
      missing: [],
    },
    {
      name: t("proLanding.plans.premium.title"),
      price: t("proLanding.plans.premium.price"),
      highlighted: false,
      features: [
        t("proLanding.plans.premium.f1"),
        t("proLanding.plans.premium.f2"),
        t("proLanding.plans.premium.f3"),
        t("proLanding.plans.premium.f4"),
      ],
      missing: [],
    },
  ];

  return (
    <section id="plans" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-3">
          {t("proLanding.plans.title")}
        </h2>
        <p className="text-muted-foreground text-center mb-10 md:mb-14 text-sm md:text-base">
          {t("proLanding.plans.subtitle")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl p-7 border flex flex-col relative ${
                plan.highlighted
                  ? "bg-primary text-primary-foreground border-primary shadow-lg scale-[1.02]"
                  : "bg-surface border-border/40 shadow-sm"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-semibold px-4 py-1 rounded-full">
                  {t("proLanding.plans.recommended")}
                </span>
              )}

              <h3
                className={`text-xl font-bold mb-1 ${plan.highlighted ? "text-white" : "text-primary"}`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {plan.name}
              </h3>
              <p className={`text-lg font-semibold mb-6 ${plan.highlighted ? "text-white/80" : "text-accent"}`}>
                {plan.price}
              </p>

              <ul className="space-y-3 mb-6 flex-1">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check
                      size={16}
                      className={`shrink-0 mt-0.5 ${plan.highlighted ? "text-accent" : "text-accent"}`}
                    />
                    <span className={`text-sm ${plan.highlighted ? "text-white/90" : "text-foreground"}`}>
                      {f}
                    </span>
                  </li>
                ))}
                {plan.missing.map((f, i) => (
                  <li key={`x-${i}`} className="flex items-start gap-2.5">
                    <X
                      size={16}
                      className={`shrink-0 mt-0.5 ${plan.highlighted ? "text-white/30" : "text-muted-foreground/50"}`}
                    />
                    <span className={`text-sm line-through ${plan.highlighted ? "text-white/40" : "text-muted-foreground/60"}`}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                to="/pro/register"
                className={`block text-center font-semibold py-3 rounded-[10px] transition-all text-sm ${
                  plan.highlighted
                    ? "bg-white text-primary hover:shadow-lg"
                    : "bg-primary text-primary-foreground hover:opacity-90"
                }`}
              >
                {t("proLanding.plans.selectPlan")}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ─── */
const faqItems = [
  { qKey: "proLanding.faq.q1" as const, aKey: "proLanding.faq.a1" as const },
  { qKey: "proLanding.faq.q2" as const, aKey: "proLanding.faq.a2" as const },
  { qKey: "proLanding.faq.q3" as const, aKey: "proLanding.faq.a3" as const },
  { qKey: "proLanding.faq.q4" as const, aKey: "proLanding.faq.a4" as const },
];

function ProFAQ() {
  const { t } = useI18n();
  return (
    <section className="py-16 md:py-24 bg-surface">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-10">
          {t("proLanding.faq.title")}
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-b border-border/20">
              <AccordionTrigger className="text-left font-semibold text-primary py-5 hover:no-underline">
                {t(item.qKey)}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                {t(item.aKey)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* ─── FINAL CTA ─── */
function FinalCTA() {
  const { t } = useI18n();
  return (
    <section className="bg-background py-24 md:py-32 border-t border-border/50">
      <div className="container mx-auto px-4 text-center max-w-[700px]">
        <h2 className="text-2xl md:text-3xl text-primary mb-4">
          {t("proLanding.finalCta.title")}
        </h2>
        <p className="text-base text-muted-foreground mb-8">
          {t("proLanding.finalCta.body")}
        </p>
        <Link
          to="/pro/register"
          className="inline-block bg-primary text-primary-foreground px-9 py-4 rounded-[10px] hover:opacity-90 transition-all"
        >
          {t("proLanding.finalCta.button")}
        </Link>
      </div>
    </section>
  );
}

/* ─── PAGE ─── */
export default function ProLandingPage() {
  return (
    <>
      <ProHero />
      <WhyJoin />
      <HowItWorksPro />
      <Plans />
      <ProFAQ />
      <FinalCTA />
    </>
  );
}
