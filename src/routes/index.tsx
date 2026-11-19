import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Sparkles, Orbit, Play, Film, CalendarDays } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { episodeListQuery, seriesListQuery, seriesTextOf, type SeriesRow } from "@/lib/catalog";
import { FEATURED_SLUG } from "@/lib/data";
import { BUNDLED_POSTERS } from "@/lib/posters";
import { useT } from "@/lib/i18n";
import { SERIES_TRAILERS, UPCOMING, trailerUrl } from "@/lib/trailers";
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
  const [play, setPlay] = useState<{ src: string; title: string; poster?: string | undefined; subsKey?: string | undefined } | null>(null);
  const epCount = useQuery({ ...episodeListQuery(featured?.id ?? "", featured?.slug ?? ""), enabled: !!featured }).data?.length ?? 0;
  if (!featured) return <AppShell><p className="px-5 pt-10 text-sm text-muted-foreground">{t("loading")}</p></AppShell>;
  const others = otherPublished(all, featured);
  const tx = seriesTextOf(featured, lang);
  const poster = BUNDLED_POSTERS[featured.slug];
  const ft = SERIES_TRAILERS[featured.slug];
  const openUpcoming = (u: (typeof UPCOMING)[number]) => {
    const name = lang === "tr" ? u.title : u.titleEn;
    if (u.video) setPlay({ src: trailerUrl(u.video), title: name, poster: u.poster && trailerUrl(u.poster), subsKey: u.key });
    else toast.info(t("trailer_soon"));
  };

  return (
    <AppShell>
      {/* 1) Yayındaki dizi: büyük vitrin; bölümler dizi sayfasında */}
      <section className="relative -mt-2 h-[68vh] min-h-[440px] w-full overflow-hidden">
        {ft ? (
          <video src={ft.video} poster={poster ?? ft.poster} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
        ) : poster ? (
          <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-black/30" />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" /> {t("now_streaming")}
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold leading-none text-[#FFF4D6] [text-shadow:0_2px_12px_#000]">{featured.title}</h1>
          {tx.tagline && <p className="mt-2 line-clamp-2 text-sm text-foreground/85">{tx.tagline}</p>}
          {epCount > 0 && <p className="mt-1 text-xs text-muted-foreground">{t("episodes_count", { n: epCount })}</p>}
          <div className="mt-4 flex gap-3">
            <Link to="/dizi/$slug" params={{ slug: featured.slug }} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-bold text-black">
              <Play className="h-4 w-4 fill-black" /> {t("see_episodes")}
            </Link>
            {ft && (
              <button onClick={() => setPlay({ src: ft.video, title: featured.title, poster: ft.poster })} className="flex items-center justify-center gap-2 rounded-full border border-gold/60 px-5 py-3 text-sm font-bold text-gold">
                <Film className="h-4 w-4" /> {t("play_trailer")}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 2) Gelecek diziler: büyük fragman kartları */}
      <section className="mt-6 px-5">
        <h2 className="flex items-center gap-2 font-display text-xl font-bold text-gold">
          <Sparkles className="h-5 w-5" /> {t("upcoming_title")}
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">{t("upcoming_sub")}</p>
      </section>
      <div className="mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2">
        {UPCOMING.map((u) => {
          const name = lang === "tr" ? u.title : u.titleEn;
          return (
            <button key={u.key} onClick={() => openUpcoming(u)} className={`relative aspect-video w-[82vw] max-w-md shrink-0 snap-center overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br text-start ${u.bg}`}>
              {u.poster && <img src={trailerUrl(u.poster)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />}
              <span className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-gold">{monthName(u.month, lang)}</span>
              <span className="absolute inset-0 m-auto grid h-14 w-14 place-items-center rounded-full bg-black/50 ring-2 ring-gold/70">
                <Play className="ml-1 h-6 w-6 fill-gold text-gold" />
              </span>
              <span className="absolute inset-x-3 bottom-3">
                <span className="block font-display text-xl font-bold leading-tight text-[#FFF4D6] [text-shadow:0_2px_8px_#000]">{name}</span>
                <span className="mt-1 line-clamp-2 block text-[12px] leading-snug text-foreground/85">{lang === "tr" ? u.hook.tr : u.hook.en}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* 3) Yayın takvimi: her ay bir dizi */}
      <section className="mt-8 px-5">
        <h2 className="flex items-center gap-2 text-sm font-bold">
          <CalendarDays className="h-4 w-4 text-gold" /> {t("calendar")}
        </h2>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {UPCOMING.map((u) => {
            const name = lang === "tr" ? u.title : u.titleEn;
            return (
              <button key={u.key} onClick={() => openUpcoming(u)} className="relative aspect-[3/4] overflow-hidden rounded-xl border border-primary/20 text-start">
                {u.poster && <img src={trailerUrl(u.poster)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />}
                <span className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
                <span className="absolute left-1.5 top-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-bold uppercase text-gold">{monthName(u.month, lang)}</span>
                <span className="absolute inset-x-1.5 bottom-1.5 line-clamp-2 text-[11px] font-bold leading-tight text-[#FFF4D6]">{name}</span>
              </button>
            );
          })}
        </div>
      </section>

      <div className="px-5">
        <Link to="/kapsul" className="mt-8 flex items-center gap-4 rounded-2xl border border-primary/40 bg-card/80 p-4 shadow-neon">
          <Orbit className="h-9 w-9 shrink-0 text-primary" />
          <div>
            <p className="text-sm font-bold">{t("capsule_cta")}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{t("capsule_cta_sub")}</p>
          </div>
        </Link>

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
        <div className="h-8" />
      </div>
      {play && <TrailerModal src={play.src} poster={play.poster} title={play.title} subsKey={play.subsKey} defaultLang={lang} onClose={() => setPlay(null)} />}
    </AppShell>
  );
}
