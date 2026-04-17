import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/useI18n";
import { getBlogPosts, getTherapy } from "@/lib/api";
import { ArrowRight } from "lucide-react";

const BLOG_IMAGES = [
  "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=75", // turquoise water light
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=75", // golden field sunrise
  "https://images.unsplash.com/photo-1476611338391-6f395a0ebc7b?w=600&q=75", // green hills landscape
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=75", // sandy beach light
  "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600&q=75", // clear lake nature
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=75", // foggy green valley
  "https://images.unsplash.com/photo-1465188162913-8fb5709d6d57?w=600&q=75", // blue sky nature path
];

function FadeInOnScroll({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function RecentBlog() {
  const { t, locale } = useI18n();
  const allPosts = getBlogPosts();

  // Featured = first post, grid = next 6 (repeat if needed)
  const featured = allPosts[0];
  const gridPosts = allPosts.length >= 7
    ? allPosts.slice(1, 7)
    : [...allPosts.slice(1), ...allPosts].slice(0, 6);

  const featuredTherapy = featured ? getTherapy(featured.therapyId) : null;

  return (
    <section className="py-20 md:py-36 bg-background">
      <div className="container mx-auto px-4">
        <FadeInOnScroll>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-14">
            {t("blog.sectionTitle")}
          </h2>
        </FadeInOnScroll>

        {/* Featured article */}
        {featured && (
          <FadeInOnScroll delay={0.1} className="mb-12">
            <Link
              to={`/blog/${featured.id}`}
              className="group block relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500 max-w-5xl mx-auto"
            >
              <div className="aspect-[16/10] md:aspect-[21/12]">
                <img
                  src={BLOG_IMAGES[0]}
                  alt={featured.title[locale]}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  style={{ filter: "saturate(0.55) brightness(0.85)" }}
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                {featuredTherapy && (
                  <span className="inline-block text-xs font-medium bg-primary/90 text-primary-foreground px-3 py-1 rounded-full mb-3">
                    {featuredTherapy.name[locale]}
                  </span>
                )}
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary-foreground mb-2">
                  {featured.title[locale]}
                </h3>
                <p className="text-sm md:text-base text-primary-foreground/75 max-w-xl line-clamp-2">
                  {featured.excerpt[locale]}
                </p>
              </div>
            </Link>
          </FadeInOnScroll>
        )}

        {/* 3×2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {gridPosts.map((post, i) => {
            const therapy = getTherapy(post.therapyId);
            return (
              <FadeInOnScroll key={`${post.id}-${i}`} delay={0.1 + i * 0.08}>
                <Link
                  to={`/blog/${post.id}`}
                  className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-400 flex flex-col h-full border border-border/50"
                >
                  <div className="aspect-[4/3] md:aspect-[3/4] overflow-hidden">
                    <img
                      src={BLOG_IMAGES[(i + 1) % BLOG_IMAGES.length]}
                      alt={post.title[locale]}
                      className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500 ease-out"
                      style={{ filter: "saturate(0.55) brightness(0.85)" }}
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    {therapy && (
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-0.5 rounded-full self-start mb-2">
                        {therapy.name[locale]}
                      </span>
                    )}
                    <h3 className="font-semibold text-foreground text-base mb-1.5 group-hover:text-primary transition-colors duration-200 line-clamp-2">
                      {post.title[locale]}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 flex-1">
                      {post.excerpt[locale]}
                    </p>
                    <span className="text-primary text-sm font-medium mt-3 inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                      {t("blog.readMore")}
                    </span>
                  </div>
                </Link>
              </FadeInOnScroll>
            );
          })}
        </div>

        {/* See more link */}
        <FadeInOnScroll delay={0.6} className="text-center mt-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary font-semibold text-base hover:gap-3 transition-all duration-200 group"
          >
            {t("blog.seeAll")}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
