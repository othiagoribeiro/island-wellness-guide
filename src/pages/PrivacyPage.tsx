import { useI18n } from "@/i18n/useI18n";

export default function PrivacyPage() {
  const { t } = useI18n();

  const sections = [
    { title: t("privacy.s1.title"), body: t("privacy.s1.body") },
    { title: t("privacy.s2.title"), body: t("privacy.s2.body") },
    { title: t("privacy.s3.title"), body: t("privacy.s3.body") },
    { title: t("privacy.s4.title"), body: t("privacy.s4.body") },
    { title: t("privacy.s5.title"), body: t("privacy.s5.body") },
    { title: t("privacy.s6.title"), body: t("privacy.s6.body") },
    { title: t("privacy.s7.title"), body: t("privacy.s7.body") },
    { title: t("privacy.s8.title"), body: t("privacy.s8.body") },
    { title: t("privacy.s9.title"), body: t("privacy.s9.body") },
  ];

  return (
    <main className="max-w-[760px] mx-auto px-4 py-12 md:py-20">
      <h1 className="font-display text-3xl md:text-4xl font-semibold text-[hsl(var(--green-dark))] mb-2">
        {t("privacy.title")}
      </h1>
      <p className="text-[13px] italic text-[hsl(var(--stone))] mb-10">
        {t("privacy.updated")}
      </p>

      <div className="space-y-8">
        {sections.map((s, i) => (
          <section key={i}>
            <h2 className="font-display text-xl font-semibold text-[hsl(var(--green-dark))] mb-2">
              {s.title}
            </h2>
            <p className="text-[hsl(var(--ink))] leading-[1.8] text-[15px]">
              {s.body}
            </p>
          </section>
        ))}
      </div>
    </main>
  );
}
