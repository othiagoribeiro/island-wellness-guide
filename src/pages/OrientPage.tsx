import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useI18n } from "@/i18n/useI18n";
import { getOrientResults, getTherapy } from "@/lib/api";
import { MapPin, CheckCircle } from "lucide-react";

export default function OrientPage() {
  const { t, locale } = useI18n();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [submitted, setSubmitted] = useState(!!searchParams.get("q"));
  const results = submitted && query ? getOrientResults(query) : null;

  const handleSubmit = () => {
    if (query.trim()) setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-bold text-brown mb-6">{t("orient.title")}</h1>

        <textarea
          value={query}
          onChange={(e) => { setQuery(e.target.value); setSubmitted(false); }}
          placeholder={t("orient.placeholder")}
          className="w-full bg-surface border border-border rounded-lg p-4 text-foreground placeholder:text-stone focus:outline-none focus:ring-2 focus:ring-terracotta/30 resize-none"
          style={{ minHeight: 128, fontSize: 16 }}
        />

        <button
          onClick={handleSubmit}
          className="mt-4 bg-terracotta text-surface font-semibold rounded-lg px-9 hover:opacity-90 transition-opacity"
          style={{ height: 56, fontSize: 16 }}
        >
          {t("orient.submit")}
        </button>

        {results && (
          <div className="mt-10 space-y-10">
            {/* Suggested therapies */}
            {results.therapies.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-brown mb-4">{t("orient.therapies")}</h2>
                <div className="flex flex-col gap-3">
                  {results.therapies.map((th) => (
                    <Link key={th.id} to={`/therapies/${th.id}`} className="bg-surface rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <h3 className="font-medium text-brown">{th.name[locale]}</h3>
                      <p className="text-stone text-sm mt-1">{th.description[locale]}</p>
                      <p className="text-terracotta text-xs mt-2 italic">{t("orient.why")} {th.why[locale]}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Recommended professionals */}
            {results.professionals.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-brown mb-4">{t("orient.professionals")}</h2>
                <div className="flex flex-col gap-3">
                  {results.professionals.map((pro) => (
                    <Link key={pro.id} to={`/professionals/${pro.id}`} className="bg-surface rounded-lg p-4 flex items-center gap-3 hover:shadow-sm transition-shadow">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-terracotta/30 to-brown/20 flex items-center justify-center text-brown font-bold text-sm shrink-0">
                        {pro.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium text-brown">{pro.name}</span>
                          {pro.verificationStatus === "approved" && <CheckCircle size={14} className="text-terracotta" />}
                        </div>
                        <p className="text-stone text-sm">{pro.specialty[locale]}</p>
                        <div className="flex items-center gap-1 text-stone text-xs"><MapPin size={10} /> {pro.city}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related articles */}
            {results.blogPosts.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-brown mb-4">{t("orient.articles")}</h2>
                <div className="flex flex-col gap-3">
                  {results.blogPosts.map((post) => {
                    const therapy = getTherapy(post.therapyId);
                    return (
                      <Link key={post.id} to={`/blog/${post.id}`} className="bg-surface rounded-lg p-4 hover:shadow-sm transition-shadow">
                        {therapy && <span className="text-xs text-terracotta font-medium">{therapy.name[locale]}</span>}
                        <h3 className="font-medium text-brown">{post.title[locale]}</h3>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <p className="text-stone text-xs italic">{t("orient.disclaimer")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
