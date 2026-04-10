import { therapies, keywords, professionals, activities, blogPosts, type Therapy, type Professional, type Activity, type BlogPost } from "./mocks";

const USE_MOCKS = true;

export function getTherapies(): Therapy[] {
  return therapies;
}

export function getTherapy(id: string): Therapy | undefined {
  return therapies.find((t) => t.id === id);
}

export function getProfessionals(filters?: { q?: string; therapyId?: string; city?: string }): Professional[] {
  let results = professionals.filter((p) => p.published);
  if (filters?.city) results = results.filter((p) => p.city === filters.city);
  if (filters?.therapyId) results = results.filter((p) => p.therapyIds.includes(filters.therapyId!));
  if (filters?.q) {
    const q = filters.q.toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.specialty.es.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.keywordIds.some((kid) => {
          const kw = keywords.find((k) => k.id === kid);
          return kw && Object.values(kw.name).some((n) => n.toLowerCase().includes(q));
        })
    );
  }
  return results;
}

export function getProfessional(id: string): Professional | undefined {
  return professionals.find((p) => p.id === id);
}

export function getActivities(cityFilter?: string): Activity[] {
  let results = activities;
  if (cityFilter) results = results.filter((a) => a.city === cityFilter);
  return results.sort((a, b) => a.date.localeCompare(b.date));
}

export function getBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getBlogPost(id: string): BlogPost | undefined {
  return blogPosts.find((b) => b.id === id);
}

export function getKeywordsForProfessional(pro: Professional) {
  return pro.keywordIds.map((id) => keywords.find((k) => k.id === id)!).filter(Boolean);
}

export function getTherapiesForProfessional(pro: Professional) {
  return pro.therapyIds.map((id) => therapies.find((t) => t.id === id)!).filter(Boolean);
}

export function getProfessionalsByTherapy(therapyId: string) {
  return professionals.filter((p) => p.published && p.therapyIds.includes(therapyId));
}

export function getBlogPostsByTherapy(therapyId: string) {
  return blogPosts.filter((b) => b.therapyId === therapyId);
}

// Orient mock logic
export function getOrientResults(query: string) {
  const q = query.toLowerCase();
  const matchedTherapies = therapies.filter((t) =>
    Object.values(t.name).some((n) => q.includes(n.toLowerCase())) ||
    Object.values(t.description).some((d) => q.includes(d.toLowerCase().slice(0, 10)))
  ).slice(0, 3);

  // fallback: suggest based on keywords
  if (matchedTherapies.length === 0) {
    const stressRelated = q.includes("estrés") || q.includes("stress") || q.includes("estrès") || q.includes("gestresst");
    const painRelated = q.includes("dolor") || q.includes("pain") || q.includes("schmerz") || q.includes("tensión") || q.includes("tension") || q.includes("neck");
    const suggested: Therapy[] = [];
    if (stressRelated) { suggested.push(therapies[4], therapies[6]); } // mindfulness, breathwork
    if (painRelated) { suggested.push(therapies[0], therapies[1]); } // osteopathy, chiromassage
    if (suggested.length === 0) { suggested.push(therapies[4], therapies[0], therapies[3]); } // defaults
    matchedTherapies.push(...suggested.slice(0, 3));
  }

  const uniqueTherapies = [...new Map(matchedTherapies.map(t => [t.id, t])).values()].slice(0, 3);

  const matchedPros = professionals.filter((p) =>
    p.published && uniqueTherapies.some((t) => p.therapyIds.includes(t.id))
  ).slice(0, 3);

  const matchedPosts = blogPosts.filter((b) =>
    uniqueTherapies.some((t) => b.therapyId === t.id)
  ).slice(0, 3);

  return {
    therapies: uniqueTherapies.map((t) => ({
      ...t,
      why: {
        es: "Puede ayudarte según lo que describes.",
        ca: "Pot ajudar-te segons el que descrius.",
        en: "May help based on what you describe.",
        de: "Kann Ihnen basierend auf Ihrer Beschreibung helfen.",
      },
    })),
    professionals: matchedPros,
    blogPosts: matchedPosts,
  };
}
