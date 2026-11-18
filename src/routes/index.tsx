import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Sparkles, Orbit } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { SeriesView } from "@/components/SeriesView";
import { episodeListQuery, seriesListQuery, type SeriesRow } from "@/lib/catalog";
import { FEATURED_SLUG } from "@/lib/data";
import { BUNDLED_POSTERS } from "@/lib/posters";
import { useT } from "@/lib/i18n";

/** Ana dizi: önce sabit slug, yoksa ilk yayımlanmış dizi, yoksa listedeki ilk dizi. */
export function pickFeatured(all: SeriesRow[]): SeriesRow | undefined {
  return all.find((s) => s.slug === FEATURED_SLUG) ?? all.find((s) => s.status === "published") ?? all[0];
}

/** Ana dizi dışında yalnızca yayımlanmış diziler gösterilir; yeni dizi yayımlanınca kendiliğinden belirir. */
export function otherPublished(all: SeriesRow[], featured: SeriesRow | undefined): SeriesRow[] {
  return all.filter((s) => s.id !== featured?.id && s.status === "published");
}

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    const all = await context.queryClient.ensureQueryData(seriesListQuery);
    const f = pickFeatured(all);
    if (f) await context.queryClient.ensureQueryData(episodeListQuery(f.id, f.slug));
    return null;
  },
  head: () => ({
    meta: [
      { title: "AI Multiverse Cinema" },
      { name: "description", content: "AI Multiverse Cinema: The Human Code: 2300 ve diğer yapay zekâ dizilerinin tüm bölümlerini izle." },
      { property: "og:title", content: "AI Multiverse Cinema" },
      { property: "og:description", content: "İnsanlığın kurtuluşu DNA'nda yazılı." },
      { property: "og:type", content: "video.tv_show" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/** Sıradaki diziler (fragmanları yakında). */
const UPCOMING = [
  { title: "Rüya Arşivi", month: new Date(2026, 11, 1), bg: "from-indigo-950 via-violet-900 to-fuchsia-900" },
  { title: "Gezegen Hatası", month: new Date(2027, 0, 1), bg: "from-emerald-950 via-teal-900 to-cyan-900" },
];

function monthName(d: Date, lang: string) {
  try {
    return d.toLocaleDateString(lang, { month: "long", year: "numeric" });
  } catch {
    return d.toISOString().slice(0, 7);
  }
}

function Index() {
  const { data: all } = useSuspenseQuery(seriesListQuery);
  const { t, lang } = useT();
  const featured = pickFeatured(all);
  if (!featured) return <AppShell><p className="px-5 pt-10 text-sm text-muted-foreground">{t("loading")}</p></AppShell>;
  const others = otherPublished(all, featured);

  return (
    <SeriesView id={featured.id} slug={featured.slug} home>
      <Link to="/kapsul" className="mt-8 flex items-center gap-4 rounded-2xl border border-primary/40 bg-card/80 p-4 shadow-neon">
        <Orbit className="h-9 w-9 shrink-0 text-primary" />
        <div>
          <p className="text-sm font-bold">{t("capsule_cta")}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{t("capsule_cta_sub")}</p>
        </div>
      </Link>

      <section className="mt-8">
        <h2 className="flex items-center gap-2 text-sm font-bold">
          <Sparkles className="h-4 w-4 text-gold" /> {t("coming_soon")}
        </h2>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {UPCOMING.map((u) => (
            <div key={u.title} className={`flex aspect-[4/3] flex-col justify-between rounded-2xl border border-primary/30 bg-gradient-to-br p-4 ${u.bg}`}>
              <p className="font-display text-lg font-bold leading-tight text-[#FFF4D6]">{u.title}</p>
              <p className="text-xs font-semibold text-foreground/85">{monthName(u.month, lang)}</p>
            </div>
          ))}
        </div>
      </section>

      {others.length > 0 && (
        <section className="mt-8">
          <h2 className="text-sm font-bold">{t("more_series")}</h2>
          <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
            {others.map((s) => {
              const src = BUNDLED_POSTERS[s.slug];
              return (
                <Link key={s.id} to="/dizi/$slug" params={{ slug: s.slug }} className="w-32 shrink-0">
                  {src ? (
                    <img src={src} alt={s.title} width={768} height={1152} loading="lazy" className="aspect-[2/3] w-full rounded-2xl object-cover" />
                  ) : (
                    <div className="grid aspect-[2/3] w-full place-items-center rounded-2xl bg-gradient-to-br from-primary/30 via-card to-accent/20">
                      <span className="px-3 text-center text-xs font-bold uppercase tracking-widest text-muted-foreground">{s.title}</span>
                    </div>
                  )}
                  <p className="mt-2 line-clamp-2 text-xs font-semibold">{s.title}</p>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </SeriesView>
  );
}
