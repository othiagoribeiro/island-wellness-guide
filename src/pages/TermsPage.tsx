import { useI18n } from "@/i18n/useI18n";

export default function TermsPage() {
  const { t } = useI18n();

  const sections = [
    { title: t("terms.s1.title"), body: t("terms.s1.body") },
    { title: t("terms.s2.title"), body: t("terms.s2.body") },
    { title: t("terms.s3.title"), body: t("terms.s3.body") },
    { title: t("terms.s4.title"), body: t("terms.s4.body") },
    { title: t("terms.s5.title"), body: t("terms.s5.body") },
    { title: t("terms.s6.title"), body: t("terms.s6.body") },
    { title: t("terms.s7.title"), body: t("terms.s7.body") },
  ];

  return (
    <main className="max-w-[760px] mx-auto px-4 py-12 md:py-20">
      <h1 className="font-['DM_Sans'] text-3xl md:text-4xl font-semibold text-primary mb-2">
        {t("terms.title")}
      </h1>
      <p className="text-[13px] italic text-muted-foreground mb-10">
        {t("terms.updated")}
      </p>

      <div className="space-y-8">
        {sections.map((s, i) => (
          <section key={i}>
            <h2 className="font-['DM_Sans'] text-xl font-semibold text-primary mb-2">
              {s.title}
            </h2>
            <p className="text-foreground leading-[1.8] text-[15px]">
              {s.body}
            </p>
          </section>
        ))}
      </div>
    </main>
  );
}
