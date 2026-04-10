import { useParams, Link } from "react-router-dom";
import { useI18n } from "@/i18n/useI18n";
import { getTherapy, getProfessionalsByTherapy, getBlogPostsByTherapy } from "@/lib/api";
import { ArrowLeft, CheckCircle, MapPin } from "lucide-react";

export default function TherapyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t, locale } = useI18n();
  const therapy = getTherapy(id || "");

  if (!therapy) {
    return <div className="min-h-screen bg-background flex items-center justify-center"><p className="text-stone">Not found</p></div>;
  }

  const pros = getProfessionalsByTherapy(therapy.id);
  const posts = getBlogPostsByTherapy(therapy.id);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link to="/therapies" className="text-terracotta text-sm font-medium inline-flex items-center gap-1 mb-6 hover:underline">
          <ArrowLeft size={16} /> {t("nav.terapias")}
        </Link>

        <h1 className="text-3xl font-bold text-brown mb-4">{therapy.name[locale]}</h1>
        <p className="text-foreground mb-10">{therapy.description[locale]}</p>

        {pros.length > 0 && (
          <>
            <h2 className="text-xl font-semibold text-brown mb-4">{t("ther.related")}</h2>
            <div className="flex flex-col gap-3 mb-10">
              {pros.map((pro) => (
                <Link key={pro.id} to={`/professionals/${pro.id}`} className="bg-surface rounded-lg p-4 flex items-center gap-3 hover:shadow-sm transition-shadow">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-terracotta/30 to-brown/20 flex items-center justify-center text-brown font-bold text-sm shrink-0">
                    {pro.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-brown">{pro.name}</span>
                      {pro.verificationStatus === "approved" && <CheckCircle size={14} className="text-terracotta" />}
                    </div>
                    <div className="flex items-center gap-1 text-stone text-xs"><MapPin size={10} /> {pro.city}</div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {posts.length > 0 && (
          <>
            <h2 className="text-xl font-semibold text-brown mb-4">{t("ther.relatedBlog")}</h2>
            <div className="flex flex-col gap-3">
              {posts.map((post) => (
                <Link key={post.id} to={`/blog/${post.id}`} className="bg-surface rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <h3 className="font-medium text-brown">{post.title[locale]}</h3>
                  <p className="text-stone text-sm mt-1 line-clamp-2">{post.excerpt[locale]}</p>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
