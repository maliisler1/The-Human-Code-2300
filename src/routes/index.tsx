import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Sparkles, Orbit } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { SeriesView } from "@/components/SeriesView";
import { episodeListQuery, seriesListQuery, type SeriesRow } from "@/lib/catalog";
import { FEATURED_SLUG } from "@/lib/data";
import { BUNDLED_POSTERS } from "@/lib/posters";
import { useT } from "@/lib/i18n";
import { UPCOMING, trailerUrl } from "@/lib/trailers";
import { TrailerModal } from "@/components/TrailerModal";
import { useState } from "react";
import { toast } from "sonner";

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
  const [play, setPlay] = useState<{ src: string; title: string } | null>(null);

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
        <div className="mt-3 flex snap-x gap-3 overflow-x-auto pb-2">
          {UPCOMING.map((u) => (
            <button
              key={u.key}
              onClick={() => (u.video ? setPlay({ src: trailerUrl(u.video), title: u.title }) : toast.info(t("trailer_soon")))}
              className={`flex aspect-[3/4] w-40 shrink-0 snap-start flex-col justify-between rounded-2xl border border-primary/30 bg-gradient-to-br p-4 text-start ${u.bg}`}
            >
              <span className="self-start rounded-full bg-black/40 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-gold">{monthName(u.month, lang)}</span>
              <span>
                <span className="block font-display text-lg font-bold leading-tight text-[#FFF4D6]">{u.title}</span>
                <span className="mt-1.5 line-clamp-3 block text-[11px] leading-snug text-foreground/80">{lang === "tr" ? u.hook.tr : u.hook.en}</span>
                <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-gold">▶ {u.video ? t("trailer") : t("trailer_soon")}</span>
              </span>
            </button>
          ))}
        </div>
        {play && <TrailerModal src={play.src} title={play.title} onClose={() => setPlay(null)} />}
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
