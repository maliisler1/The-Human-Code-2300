import { Link, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import {
  ArrowLeft,
  Lock,
  Play,
  Info,
  Film,
  ListVideo,
  Crown,
  Tv,
  Download,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { AppShell, TokenBadge } from "@/components/AppShell";
import {
  episodeListQuery,
  seriesListQuery,
  seriesTextOf,
  trackStatus,
  episodeTitle,
  signedUrl,
  type EpisodeRow,
  type SeriesRow,
} from "@/lib/catalog";
import { FREE_EPISODES } from "@/lib/data";
import { ads } from "@/lib/ads";
import { offline, useOffline } from "@/lib/offline";
import { BUNDLED_POSTERS } from "@/lib/posters";
import { episodeHook, episodeThumb } from "@/lib/episodeArt";
import { SERIES_TRAILERS } from "@/lib/trailers";
import { TrailerModal } from "@/components/TrailerModal";
import { useAppState } from "@/lib/store";
import { useT, LANG_NAMES, SUB_NAMES } from "@/lib/i18n";

/** Bir dizinin afişi, açıklaması, dil durumu ve bölüm listesi. Ana sayfa ve dizi sayfası paylaşır. */
export function SeriesView({
  id,
  slug,
  home = false,
  children,
}: {
  id: string;
  slug: string;
  home?: boolean;
  children?: ReactNode;
}) {
  const { data: all } = useSuspenseQuery(seriesListQuery);
  const { data: eps } = useSuspenseQuery(episodeListQuery(id, slug));
  const { state, unlockEpisode } = useAppState();
  const saved = useOffline();
  const [locked, setLocked] = useState<{ n: number; id: string } | null>(null);
  const [adBusy, setAdBusy] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const { t, lang } = useT();
  const nav = useNavigate();
  const s = all.find((x) => x.id === id) as SeriesRow;
  const tx = seriesTextOf(s, lang);
  const poster = BUNDLED_POSTERS[s.slug];
  const trailer = SERIES_TRAILERS[s.slug];
  const st = (v: string) =>
    t(v === "ready" ? "st_ready" : v === "planned" ? "st_planned" : "st_none");
  const audioSt = trackStatus(
    eps[0] ?? ({ tracks: [], titles: [] } as never),
    "audio",
    state.audioLang,
  );
  const subSt = trackStatus(eps[0] ?? ({ tracks: [], titles: [] } as never), "subs", state.subLang);
  const first = eps[0];
  const anyReady = eps.some((e) => e.status === "ready" && e.video_url);

  const owned = state.seasonOwned;
  const hasAccess = (n: number, episodeId: string) =>
    owned || n <= FREE_EPISODES || state.unlocked.includes(episodeId);

  const open = async (n: number, episodeId: string, ready: boolean) => {
    if (!ready) {
      toast.info(t("draft_ep_note"));
      return;
    }
    if (!hasAccess(n, episodeId)) {
      // Kilitli bölüm: reklam izleyerek aç ya da sezonu satın al.
      setLocked({ n, id: episodeId });
      return;
    }
    nav({ to: "/izle/$slug/$n", params: { slug: s.slug, n: String(n) } });
  };

  const unlockWithAd = async () => {
    if (!locked || adBusy) return;
    setAdBusy(true);
    const result = await ads.showRewarded();
    setAdBusy(false);
    if (result === "unavailable") {
      // Reklam bulunamadı: kullanıcı takılmasın, bölüm bir kereliğine hediye.
      const err = await unlockEpisode(locked.id, 0);
      if (err) return void toast.error(err);
      toast.success(t("ad_gift", { n: locked.n }));
      const n = locked.n;
      setLocked(null);
      nav({ to: "/izle/$slug/$n", params: { slug: s.slug, n: String(n) } });
      return;
    }
    if (result === "dismissed") return void toast.info(t("ad_not_done"));
    const err = await unlockEpisode(locked.id, 0);
    if (err) return void toast.error(err);
    toast.success(t("ad_unlocked", { n: locked.n }));
    const n = locked.n;
    setLocked(null);
    nav({ to: "/izle/$slug/$n", params: { slug: s.slug, n: String(n) } });
  };

  const download = async (e: EpisodeRow) => {
    if (downloading) return;
    setDownloading(e.id);
    try {
      const url = await signedUrl("videos", e.video_url);
      if (!url) throw new Error("no video");
      const pick = (l: string) =>
        e.tracks.find((x) => x.kind === "audio" && x.lang === l && x.status === "ready" && x.url);
      const dub = pick(state.audioLang) ?? pick("tr");
      const audioUrl = dub ? await signedUrl("videos", dub.url) : null;
      await offline.download(
        e.id,
        url,
        audioUrl && dub ? { url: audioUrl, lang: dub.lang } : undefined,
      );
      toast.success(t("download_done", { n: e.n }));
    } catch {
      toast.error(t("download_err"));
    } finally {
      setDownloading(null);
    }
  };

  return (
    <AppShell>
      <div className="relative">
        {trailer ? (
          <video
            src={trailer.video}
            poster={poster ?? trailer.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="aspect-[4/5] w-full object-cover"
          />
        ) : poster ? (
          <img
            src={poster}
            alt={s.title}
            width={768}
            height={1152}
            className="aspect-[4/5] w-full object-cover"
          />
        ) : (
          <div className="grid aspect-[4/5] w-full place-items-center bg-gradient-to-br from-primary/30 via-card to-accent/20" />
        )}
        <div className="absolute inset-0 bg-fade" />
        <div className="absolute inset-x-0 top-0 flex justify-between p-5">
          {home ? (
            <span className="rounded-full glass px-3 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-gold">
              AI Multiverse Cinema
            </span>
          ) : (
            <Link to="/" className="rounded-full glass p-2" aria-label={t("back")}>
              <ArrowLeft className="h-5 w-5 rtl:rotate-180" />
            </Link>
          )}
          <TokenBadge />
        </div>
      </div>

      <div className="relative -mt-20 px-5">
        <span className="rounded-full bg-neon px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary-foreground">
          {t(`cat_${s.category}`)}
        </span>
        <h1 className="mt-3 text-[2rem] leading-[1.05] text-epic">{s.title}</h1>
        <p className="mt-3 text-sm leading-relaxed text-foreground/85">{tx.description}</p>
        {first && (
          <button
            onClick={() => open(first.n, first.id, first.status === "ready" && !!first.video_url)}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-neon py-3.5 text-sm font-extrabold text-primary-foreground shadow-neon"
          >
            <Play className="h-4 w-4 fill-current" /> {t("watch_ep1")}
          </button>
        )}
        {trailer && (
          <button
            onClick={() => setShowTrailer(true)}
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold/60 py-3 text-sm font-semibold text-gold"
          >
            <Film className="h-4 w-4" /> {t("trailer")}
          </button>
        )}
        {trailer && showTrailer && (
          <TrailerModal src={trailer.video} poster={trailer.poster} title={s.title} onClose={() => setShowTrailer(false)} />
        )}
        {first && eps.length > 1 && (
          <button
            onClick={() => {
              // Tüm sezon: otomatik geçişi açar, bölümler art arda oynar (kilitli bölümde durur).
              try {
                localStorage.setItem("amc-autoplay", "true");
              } catch {
                /* depolama kapalı olabilir */
              }
              void open(first.n, first.id, first.status === "ready" && !!first.video_url);
            }}
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-secondary py-3 text-sm font-semibold"
          >
            <ListVideo className="h-4 w-4" /> {t("watch_season")}
          </button>
        )}

        <section className="mt-6 rounded-2xl bg-card p-4 text-sm">
          <h2 className="font-bold">{t("lang_box")}</h2>
          <p className="mt-2 flex justify-between">
            <span>
              {t("audio")}: {LANG_NAMES[state.audioLang]}
            </span>
            <span className="text-muted-foreground">{st(audioSt)}</span>
          </p>
          {state.subLang !== "off" && (
            <p className="mt-1 flex justify-between">
              <span>
                {t("subtitles")}: {SUB_NAMES[state.subLang]}
              </span>
              <span className="text-muted-foreground">{st(subSt)}</span>
            </p>
          )}
          {!anyReady && (
            <p className="mt-3 flex gap-2 text-xs text-muted-foreground">
              <Info className="h-4 w-4 shrink-0" />
              {t("no_video")}
            </p>
          )}
          {anyReady && audioSt !== "ready" && (
            <p className="mt-3 text-xs text-muted-foreground">
              {t("dub_missing", { lang: LANG_NAMES[state.audioLang] })}
            </p>
          )}
          {anyReady && subSt !== "ready" && state.subLang !== "off" && (
            <p className="mt-1 text-xs text-muted-foreground">
              {t("sub_missing", { lang: SUB_NAMES[state.subLang] })}
            </p>
          )}
        </section>

        <h2 className="mt-7 text-sm font-bold">{t("episodes")}</h2>
        <p className="mt-1 text-xs text-muted-foreground">{t("free_ep", { n: FREE_EPISODES })}</p>
        <ul className="mt-4 space-y-5">
          {eps.map((e) => {
            const ready = e.status === "ready" && !!e.video_url;
            const unlocked = hasAccess(e.n, e.id);
            const isSaved = !!saved[e.id];
            const title = episodeTitle(e, lang);
            const thumb = episodeThumb(s.slug, e.n);
            const hook = episodeHook(s.slug, e.n, lang);
            return (
              <li key={e.id}>
                <button
                  onClick={() => open(e.n, e.id, ready)}
                  className="relative block aspect-video w-full overflow-hidden rounded-2xl border border-primary/35 bg-card text-start shadow-[0_14px_34px_rgba(0,0,0,0.55)]"
                >
                  {thumb ? (
                    <img src={thumb} alt="" width={480} height={270} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                  ) : (
                    <span className="absolute inset-0 bg-gradient-to-br from-secondary via-card to-accent/20" />
                  )}
                  <span className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/95" />
                  <span className="absolute left-3 top-1 text-5xl text-epic">{String(e.n).padStart(2, "0")}</span>
                  {ready && !unlocked && (
                    <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-background/70 px-2.5 py-1 text-[11px] font-semibold text-gold">
                      <Lock className="h-3.5 w-3.5" /> {t("watch_ad")}
                    </span>
                  )}
                  {ready && unlocked && (
                    <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-neon text-primary-foreground shadow-neon">
                      <Play className="h-4 w-4 fill-current" />
                    </span>
                  )}
                  {!ready && (
                    <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/70 text-muted-foreground">
                      <Film className="h-4 w-4" />
                    </span>
                  )}
                  <span className="absolute inset-x-4 bottom-3">
                    <span className="block font-display text-xl font-bold leading-tight text-[#FFF4D6] [text-shadow:0_2px_12px_rgba(0,0,0,0.8),0_0_20px_rgba(245,184,65,0.45)]">
                      {title || `${t("episode")} ${e.n}`}
                    </span>
                    <span className="mt-0.5 block text-xs text-foreground/80">
                      {hook ? `${hook} · ` : ""}{e.minutes} {t("min")}
                    </span>
                  </span>
                </button>
                {owned && ready && offline.supported() && (
                  <button
                    onClick={() => (isSaved ? void offline.remove(e.id) : void download(e))}
                    disabled={downloading !== null && downloading !== e.id}
                    className="mt-1 flex w-full items-center justify-end gap-1.5 px-4 text-xs font-semibold text-muted-foreground disabled:opacity-50"
                  >
                    {isSaved ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                    ) : (
                      <Download className="h-3.5 w-3.5" />
                    )}
                    {downloading === e.id
                      ? t("downloading")
                      : isSaved
                        ? `${t("downloaded")} · ${t("remove_download")}`
                        : t("download")}
                  </button>
                )}
              </li>
            );
          })}
        </ul>

        {!owned && (
          <Link
            to="/jeton"
            className="mt-5 flex items-center justify-center gap-2 rounded-2xl border border-dashed p-4 text-center text-sm"
          >
            <Crown className="h-4 w-4 text-gold" />
            <span className="font-bold text-primary">{t("season_title")}</span>
            <span className="text-muted-foreground">
              · {t("season_perk2")}, {t("season_perk3").toLowerCase()}
            </span>
          </Link>
        )}
        {children}
      </div>
      {locked && (
        <div
          className="fixed inset-0 z-[60] grid place-items-end bg-background/70 p-4 backdrop-blur-sm"
          onClick={() => setLocked(null)}
        >
          <div
            className="mx-auto w-full max-w-md rounded-3xl border bg-card p-6"
            onClick={(ev) => ev.stopPropagation()}
          >
            <Lock className="h-6 w-6 text-gold" />
            <h2 className="mt-3 text-lg font-bold">{t("locked_title")}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("episode")} {locked.n}
            </p>
            {ads.canReward() && (
              <button
                onClick={() => void unlockWithAd()}
                disabled={adBusy}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-secondary py-3 text-sm font-semibold disabled:opacity-60"
              >
                <Tv className="h-4 w-4" /> {adBusy ? "…" : t("watch_ad")}
              </button>
            )}
            <Link
              to="/jeton"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-neon py-3.5 text-sm font-extrabold text-primary-foreground shadow-neon"
            >
              <Crown className="h-4 w-4" /> {t("season_title")}
            </Link>
          </div>
        </div>
      )}
    </AppShell>
  );
}
