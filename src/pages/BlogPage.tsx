import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/useI18n";
import { getBlogPosts, getTherapy } from "@/lib/api";

export default function BlogPage() {
  const { t, locale } = useI18n();
  const posts = getBlogPosts();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-brown mb-8">{t("blog.title")}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => {
            const therapy = getTherapy(post.therapyId);
            return (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="bg-surface rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group"
              >
                {therapy && (
                  <span className="text-xs font-medium text-terracotta bg-terracotta/10 px-3 py-1 rounded-full">
                    {therapy.name[locale]}
                  </span>
                )}
                <h3 className="font-semibold text-brown text-lg mt-3 mb-2 group-hover:text-terracotta transition-colors">
                  {post.title[locale]}
                </h3>
                <p className="text-stone text-sm line-clamp-3">{post.excerpt[locale]}</p>
                <span className="text-terracotta text-sm font-medium mt-3 inline-block">{t("blog.readMore")}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
