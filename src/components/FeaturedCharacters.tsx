import { Lock, Play, Search, Tv, X, Zap } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { AnimationSubscribeButton, useAnimationAccess, useSubscriptionOffer } from "@/components/AnimationSubscribe";
import { ads } from "@/lib/ads";
import { FREE_CHARACTER_EPISODES, characterEpisodeId, getAnimationAccess, hasCharacterAccess, setAnimationAccess, type AnimationAccess } from "@/lib/animations";
import { characterEpisode, useCharacters, useShelves, type UpcomingCharacter } from "@/lib/characters";
import { markWatched, recentKeys, useProgress } from "@/lib/progress";
import { useAppState } from "@/lib/store";

type Playing = { src: string; title: string; poster?: string | undefined; vertical?: boolean; next?: (() => void) | undefined };

/**
 * Ana ekran: dönen vitrin, "kaldığın yerden devam et", temalı raflar ve bütün karakterlerin üçlü ızgarası.
 * Bölümleri yayında olan karta dokununca bölüm listesi açılır; yalnızca fragmanı olan kartta fragman oynar.
 * Bölüm bitince sıradaki bölüm otomatik açılır.
 * İlk 2 bölüm ücretsiz; sonrakiler reklam izleyerek ya da aylık abonelikle açılır.
 */
type Lead = { title: string; sub: string; poster: string; onOpen: () => void };

export function FeaturedCharacters({
  tr,
  onPlay,
  lead,
  afterHero,
  middle,
}: {
  tr: boolean;
  onPlay: (p: Playing | null) => void;
  /** Vitrinin ilk karesi: ana dizi. */
  lead?: Lead | undefined;
  /** Vitrinin hemen altında gösterilecek bölüm (ana dizinin bölümleri). */
  afterHero?: ReactNode;
  /** İlk temalı raftan sonra gösterilecek bölüm ("Önümüzdeki ay"). */
  middle?: ReactNode;
}) {
  const { state } = useAppState();
  const { featured: FEATURED_CHARACTERS, soon: SOON_CHARACTERS } = useCharacters();
  const access = useAnimationAccess();
  const offer = useSubscriptionOffer();
  const [locked, setLocked] = useState<{ ch: UpcomingCharacter; n: number } | null>(null);
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState<UpcomingCharacter | null>(null);
  const [slideAt, setSlideAt] = useState(0);
  const [filter, setFilter] = useState("all");
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState("");
  const shelves = useShelves();
  const progress = useProgress();

  // Vitrin 4 saniyede bir sıradaki diziye geçer.
  useEffect(() => {
    const id = setInterval(() => setSlideAt((i) => i + 1), 4000);
    return () => clearInterval(id);
  }, []);

  const allowed = (ch: UpcomingCharacter, n: number, a = access) => hasCharacterAccess(ch.key, n, a, state.seasonOwned);

  // Bölüm bitince sıradaki bölüm kendiliğinden başlar; kilitliyse kilit penceresi açılır.
  const play = (ch: UpcomingCharacter, n: number, a = access): void => {
    if (!allowed(ch, n, a)) {
      onPlay(null);
      setLocked({ ch, n });
      return;
    }
    const src = characterEpisode(ch, n);
    if (!src) {
      onPlay(null);
      toast.info(tr ? "Video şu an yüklenemedi. İnternet bağlantını kontrol edip tekrar dene." : "The video could not be loaded. Check your connection and try again.");
      return;
    }
    markWatched(ch.key, n);
    onPlay({
      src,
      title: `${ch.name} · ${n}`,
      poster: ch.poster,
      vertical: true,
      next: n < (ch.episodes ?? 0) ? () => play(ch, n + 1, a) : undefined,
    });
  };

  const openAfter = (next: AnimationAccess) => {
    setAnimationAccess(next);
    if (!locked) return;
    const { ch, n } = locked;
    setLocked(null);
    play(ch, n, next);
  };

  const unlockWithAd = async () => {
    if (!locked || busy) return;
    setBusy(true);
    const result = await ads.showRewarded();
    setBusy(false);
    if (result === "dismissed") {
      toast.info(tr ? "Bölümü açmak için reklamı sonuna kadar izlemelisin." : "Watch the ad to the end to unlock the episode.");
      return;
    }
    // Reklam bulunamadıysa kullanıcı takılmasın: bölüm bir kereliğine hediye.
    toast.success(
      result === "unavailable"
        ? tr ? `Şu an reklam yok. ${locked.n}. bölüm sana hediye!` : `No ad right now. Episode ${locked.n} is on us!`
        : tr ? `${locked.n}. bölüm açıldı!` : `Episode ${locked.n} unlocked!`,
    );
    openAfter({ ...access, unlocked: [...access.unlocked, characterEpisodeId(locked.ch.key, locked.n)] });
  };

  const all = [...FEATURED_CHARACTERS, ...SOON_CHARACTERS];
  const byKey = new Map(all.map((ch) => [ch.key, ch]));
  const trailer = (ch: UpcomingCharacter) =>
    ch.video
      ? onPlay({ src: ch.video, title: ch.name, poster: ch.poster, vertical: true })
      : toast.info(tr ? "Video şu an yüklenemedi. İnternet bağlantını kontrol edip tekrar dene." : "The video could not be loaded. Check your connection and try again.");
  const openCard = (ch: UpcomingCharacter) => (ch.episodes ? setOpen(ch) : trailer(ch));

  // Vitrin: önce ana dizi, sonra bölümleri yayında olan ilk karakterler sırayla döner.
  const slides = [
    ...(lead ? [{ key: "lead", title: lead.title, sub: lead.sub, poster: lead.poster, go: lead.onOpen }] : []),
    ...FEATURED_CHARACTERS.slice(0, 4).map((ch) => ({ key: ch.key, title: ch.name, sub: tr ? ch.hook.tr : ch.hook.en, poster: ch.poster, go: () => play(ch, 1) })),
  ];
  const slide = slides.length ? slides[slideAt % slides.length]! : null;

  const recent = recentKeys(progress)
    .map((k) => byKey.get(k))
    .filter((ch): ch is UpcomingCharacter => !!ch?.episodes)
    .slice(0, 8);
  const shelfRows = shelves
    .map((sh) => ({ ...sh, items: sh.members.map((k) => byKey.get(k)).filter((ch): ch is UpcomingCharacter => !!ch) }))
    .filter((sh) => sh.items.length > 0);
  const grid = filter === "all" ? all : (shelfRows.find((sh) => sh.key === filter)?.items ?? all);

  const card = (ch: UpcomingCharacter, wide = false, note?: string) => (
    <button
      key={ch.key}
      onClick={() => (note && ch.episodes ? play(ch, Math.min(progress[ch.key]?.n ?? 1, ch.episodes)) : openCard(ch))}
      aria-label={tr ? `${ch.name} dizisini aç` : `Open ${ch.name}`}
      className={`${wide ? "w-[29vw] max-w-[132px] shrink-0 snap-start" : "w-full"} text-start`}
    >
      <span className="relative block aspect-[3/4] w-full overflow-hidden rounded-xl border border-primary/30 bg-gradient-to-br from-primary/30 via-card to-accent/20">
        <img src={ch.poster} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        {ch.episodes ? (
          !note && <span className="absolute left-1.5 top-1.5 rounded-full bg-gold px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-black">{tr ? "Yeni" : "New"}</span>
        ) : (
          <span className="absolute left-1.5 top-1.5 rounded-full bg-black/65 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-gold">{tr ? "Yakında" : "Soon"}</span>
        )}
        <span className="absolute bottom-1.5 right-1.5 grid h-6 w-6 place-items-center rounded-full bg-black/55 ring-1 ring-gold/70">
          <Play className="ml-px h-3 w-3 fill-gold text-gold" />
        </span>
      </span>
      <span className="mt-1.5 block truncate text-[13px] font-bold leading-tight text-[#FFF4D6]">{ch.name}</span>
      <span className="block truncate text-[10px] text-muted-foreground">
        {note ?? (ch.episodes ? (tr ? `${ch.episodes} bölüm` : `${ch.episodes} episodes`) : tr ? "Fragmanı izle" : "Watch trailer")}
      </span>
    </button>
  );

  const shelf = (key: string, title: string, items: UpcomingCharacter[], note?: (ch: UpcomingCharacter) => string) => (
    <section key={key} className="mt-6">
      <h2 className="px-4 font-display text-lg font-bold text-gold">{title}</h2>
      <div className="mt-2.5 flex snap-x gap-2.5 overflow-x-auto px-4 pb-1">{items.map((ch) => card(ch, true, note?.(ch)))}</div>
    </section>
  );

  // Arama: karakter adı ve açıklamasında (iki dilde) geçenleri bulur.
  const q = query.trim().toLocaleLowerCase(tr ? "tr" : "en");
  const found = q ? all.filter((ch) => `${ch.name} ${ch.hook.tr} ${ch.hook.en}`.toLocaleLowerCase(tr ? "tr" : "en").includes(q)) : all;
  const searchBar = (
    <div className="flex items-center gap-2 px-4 pb-2 pt-1">
      {searching ? (
        <label className="flex flex-1 items-center gap-2 rounded-full border border-gold/40 bg-card px-3 py-2">
          <Search className="h-4 w-4 shrink-0 text-gold" />
          <input
            autoFocus
            value={query}
            onChange={(ev) => setQuery(ev.target.value)}
            placeholder={tr ? "Karakter ara" : "Search characters"}
            aria-label={tr ? "Karakter ara" : "Search characters"}
            className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </label>
      ) : (
        <>
          <span className="h-10 w-10 shrink-0" aria-hidden="true" />
          <p className="flex-1 text-center leading-none" aria-label="AI Multiverse Cinema">
            <span className="block text-[10px] font-extrabold tracking-[0.45em] text-[#C9B8FF]">AI MULTIVERSE</span>
            <span className="mt-0.5 block text-[22px] font-black tracking-[0.14em] text-gold" style={{ fontFamily: '"Cinzel Decorative", serif' }}>CINEMA</span>
          </p>
        </>
      )}
      <button
        onClick={() => { setSearching((v) => !v); setQuery(""); }}
        aria-label={searching ? (tr ? "Aramayı kapat" : "Close search") : tr ? "Ara" : "Search"}
        className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 bg-card text-gold"
      >
        {searching ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
      </button>
    </div>
  );

  return (
    <>
      {searchBar}
      {searching && (
        <section className="px-4 pb-6">
          <p className="text-[11px] text-muted-foreground">
            {found.length > 0
              ? tr ? `${found.length} sonuç` : `${found.length} results`
              : tr ? "Sonuç bulunamadı. Başka bir ad dene." : "No results. Try another name."}
          </p>
          <div className="mt-3 grid grid-cols-3 gap-x-2.5 gap-y-4">{found.map((ch) => card(ch))}</div>
        </section>
      )}
      {!searching && (<>
      {slide && (
        <section className="px-4 pt-1">
          <button onClick={slide.go} className="relative block h-[30vh] min-h-[200px] w-full overflow-hidden rounded-2xl border border-gold/30 text-start" aria-label={slide.title}>
            <img key={slide.key} src={slide.poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-transparent" />
            <span className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
              <span className="min-w-0">
                <span className="block truncate font-display text-2xl font-bold leading-tight text-[#FFF4D6] [text-shadow:0_2px_10px_#000]">{slide.title}</span>
                <span className="mt-0.5 line-clamp-1 block text-xs text-foreground/85">{slide.sub}</span>
              </span>
              <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-gold px-4 py-2 text-xs font-bold text-black">
                <Play className="h-3.5 w-3.5 fill-black" /> {tr ? "İzle" : "Watch"}
              </span>
            </span>
          </button>
          <div className="mt-2 flex justify-center gap-1.5">
            {slides.map((sl, i) => (
              <button key={sl.key} onClick={() => setSlideAt(i)} aria-label={`${i + 1}`} className={`h-1.5 rounded-full ${i === slideAt % slides.length ? "w-5 bg-gold" : "w-1.5 bg-white/25"}`} />
            ))}
          </div>
        </section>
      )}

      {recent.length > 0 &&
        shelf("recent", tr ? "Kaldığın yerden devam et" : "Continue watching", recent, (ch) => {
          const n = Math.min(progress[ch.key]?.n ?? 1, ch.episodes ?? 1);
          return tr ? `${n}. bölüm` : `Episode ${n}`;
        })}

      {afterHero}

      {shelfRows.slice(0, 1).map((sh) => shelf(sh.key, tr ? sh.tr : sh.en, sh.items))}

      {middle}

      {shelfRows.slice(1).map((sh) => shelf(sh.key, tr ? sh.tr : sh.en, sh.items))}

      <section className="mt-7">
        <h2 className="flex items-center gap-2 px-4 font-display text-lg font-bold text-gold">
          <Zap className="h-4 w-4 fill-gold" /> {tr ? `Tüm animasyonlar · ${all.length}` : `All animations · ${all.length}`}
        </h2>
        <p className="mt-0.5 px-4 text-[11px] text-muted-foreground">
          {tr
            ? `Her dizinin ilk ${FREE_CHARACTER_EPISODES} bölümü ücretsiz. Her bölüm 15 saniye.`
            : `The first ${FREE_CHARACTER_EPISODES} episodes of each series are free. 15 seconds each.`}
        </p>
        <div className="mt-2.5 flex gap-2 overflow-x-auto px-4 pb-1">
          {[{ key: "all", tr: "Tümü", en: "All" }, ...shelfRows].map((c) => (
            <button
              key={c.key}
              onClick={() => setFilter(c.key)}
              className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-bold ${filter === c.key ? "border-gold bg-gold text-black" : "border-white/20 text-foreground/85"}`}
            >
              {tr ? c.tr : c.en}
            </button>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-3 gap-x-2.5 gap-y-4 px-4">{grid.map((ch) => card(ch))}</div>
      </section>

      </>)}

      {open && !locked && (
        <div className="fixed inset-0 z-[55] grid place-items-end bg-background/70 backdrop-blur-sm" onClick={() => setOpen(null)}>
          <div className="mx-auto w-full max-w-md rounded-t-3xl border bg-card p-5 pb-8" onClick={(ev) => ev.stopPropagation()} role="dialog" aria-label={open.name}>
            <div className="flex gap-4">
              <img src={open.poster} alt="" className="aspect-[9/16] w-24 shrink-0 rounded-xl object-cover" />
              <div className="min-w-0 flex-1">
                <h2 className="font-display text-2xl font-bold text-[#FFF4D6]">{open.name}</h2>
                <p className="mt-1 text-sm text-foreground/85">{tr ? open.hook.tr : open.hook.en}</p>
                <button onClick={() => { const ch = open; setOpen(null); play(ch, 1); }} className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-gold py-2.5 text-sm font-bold text-black">
                  <Play className="h-4 w-4 fill-black" /> {tr ? "Baştan izle" : "Play from start"}
                </button>
              </div>
            </div>
            <p className="mt-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">{tr ? "Bölümler" : "Episodes"}</p>
            <div className="mt-2 grid grid-cols-5 gap-2">
              {Array.from({ length: open.episodes ?? 0 }, (_, i) => i + 1).map((n) => {
                const free = allowed(open, n);
                return (
                  <button
                    key={n}
                    onClick={() => { const ch = open; setOpen(null); play(ch, n); }}
                    aria-label={tr ? `${open.name} ${n}. bölüm${free ? "" : " (kilitli)"}` : `${open.name} episode ${n}${free ? "" : " (locked)"}`}
                    className={`grid aspect-square place-items-center rounded-xl border text-lg font-bold ${free ? "border-gold/60 text-gold" : "border-white/20 text-muted-foreground"}`}
                  >
                    {free ? n : <Lock className="h-4 w-4" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {locked && (
        <div className="fixed inset-0 z-[60] grid place-items-end bg-background/70 p-4 backdrop-blur-sm" onClick={() => setLocked(null)}>
          <div className="mx-auto w-full max-w-md rounded-3xl border bg-card p-6" onClick={(ev) => ev.stopPropagation()} role="dialog" aria-label={tr ? "Kilitli bölüm" : "Locked episode"}>
            <Lock className="h-6 w-6 text-gold" />
            <h2 className="mt-3 text-lg font-bold">{tr ? "Bu bölüm kilitli" : "This episode is locked"}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {locked.ch.name} · {tr ? `${locked.n}. bölüm` : `Episode ${locked.n}`}
            </p>
            {ads.canReward() && (
              <button
                onClick={() => void unlockWithAd()}
                disabled={busy}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-secondary py-3 text-sm font-semibold disabled:opacity-60"
              >
                <Tv className="h-4 w-4" /> {busy ? "…" : tr ? "Reklam izle, bu bölümü aç" : "Watch an ad to unlock this episode"}
              </button>
            )}
            <AnimationSubscribeButton tr={tr} offer={offer} onSubscribed={() => openAfter({ ...getAnimationAccess(), owned: true })} />
          </div>
        </div>
      )}
    </>
  );
}
