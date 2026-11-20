import { Link } from "@tanstack/react-router";
import { Crown, Lock, Play, Tv, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ParentGate } from "@/components/ParentGate";
import { ads } from "@/lib/ads";
import { isChild } from "@/lib/age";
import {
  FREE_CHARACTER_EPISODES,
  animations,
  characterEpisodeId,
  hasCharacterAccess,
  loadAnimationAccess,
  saveAnimationAccess,
} from "@/lib/animations";
import { characterEpisode, useCharacters, type UpcomingCharacter } from "@/lib/characters";
import { useAppState } from "@/lib/store";

type Playing = { src: string; title: string; poster?: string | undefined; vertical?: boolean; next?: (() => void) | undefined };

/**
 * Öne alınan karakterler: bölümleri yayında olan yeni diziler.
 * Karta dokununca 1. bölüm, altındaki numaralara dokununca o bölüm oynar.
 * Bölüm bitince sıradaki bölüm otomatik açılır.
 * İlk 2 bölüm ücretsiz; sonrakiler reklam izleyerek ya da satın alarak açılır.
 */
export function FeaturedCharacters({ tr, onPlay }: { tr: boolean; onPlay: (p: Playing | null) => void }) {
  const { state } = useAppState();
  const { featured: FEATURED_CHARACTERS } = useCharacters();
  const [access, setAccess] = useState(loadAnimationAccess);
  const [locked, setLocked] = useState<{ ch: UpcomingCharacter; n: number } | null>(null);
  const [busy, setBusy] = useState(false);
  const [price, setPrice] = useState<string | null>(null);
  const [parentGate, setParentGate] = useState(false);

  useEffect(() => {
    // Google Play'deki animasyon paketi satın almasını ve fiyatını bir kez sorgula.
    void animations.price().then(setPrice);
    void animations.check().then((owned) => {
      if (owned === null) return;
      setAccess((a) => {
        if (a.owned === owned) return a;
        const next = { ...a, owned };
        saveAnimationAccess(next);
        return next;
      });
    });
  }, []);

  if (FEATURED_CHARACTERS.length === 0) return null;

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
    onPlay({
      src,
      title: `${ch.name} · ${n}`,
      poster: ch.poster,
      vertical: true,
      next: n < (ch.episodes ?? 0) ? () => play(ch, n + 1, a) : undefined,
    });
  };

  const openAfter = (next: typeof access) => {
    saveAnimationAccess(next);
    setAccess(next);
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

  const buy = async () => {
    if (busy) return;
    setBusy(true);
    try {
      if (await animations.buy()) {
        toast.success(tr ? "Teşekkürler! Tüm animasyon bölümleri açıldı." : "Thank you! All animation episodes are unlocked.");
        openAfter({ ...access, owned: true });
      }
    } catch {
      toast.error(tr ? "Satın alma tamamlanamadı. Biraz sonra tekrar dene." : "The purchase could not be completed. Try again shortly.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="mt-8">
      <h2 className="flex items-center gap-2 px-5 font-display text-xl font-bold text-gold">
        <Zap className="h-5 w-5 fill-gold" />{" "}
        {tr ? `Erken izle: ${FEATURED_CHARACTERS.length} yeni dizi` : `Early access: ${FEATURED_CHARACTERS.length} new series`}
      </h2>
      <p className="mt-1 px-5 text-xs text-muted-foreground">
        {tr
          ? `Her dizinin ilk ${FREE_CHARACTER_EPISODES} bölümü ücretsiz. Her bölüm 15 saniye.`
          : `The first ${FREE_CHARACTER_EPISODES} episodes of each series are free. 15 seconds each.`}
      </p>
      <div className="mt-3 flex snap-x gap-3 overflow-x-auto px-5 pb-2">
        {FEATURED_CHARACTERS.map((ch) => (
          <div key={ch.key} className="w-44 shrink-0 snap-start overflow-hidden rounded-2xl border border-gold/40 bg-card">
            <button onClick={() => play(ch, 1)} className="relative block aspect-[9/16] w-full overflow-hidden bg-gradient-to-br from-primary/30 via-card to-accent/20 text-start">
              <img src={ch.poster} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              <span className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
              <span className="absolute left-2.5 top-2.5 rounded-full bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-black">{tr ? "Yeni" : "New"}</span>
              <span className="absolute inset-0 m-auto grid h-12 w-12 place-items-center rounded-full bg-black/50 ring-2 ring-gold/70">
                <Play className="ml-0.5 h-5 w-5 fill-gold text-gold" />
              </span>
              <span className="absolute inset-x-2.5 bottom-2.5">
                <span className="block font-display text-xl font-bold leading-tight text-[#FFF4D6] [text-shadow:0_2px_8px_#000]">{ch.name}</span>
                <span className="mt-0.5 line-clamp-2 block text-[11px] leading-snug text-foreground/85">{tr ? ch.hook.tr : ch.hook.en}</span>
              </span>
            </button>
            <div className="flex items-center justify-between gap-1 border-t border-primary/20 px-2 py-2">
              {Array.from({ length: ch.episodes ?? 0 }, (_, i) => i + 1).map((n) => {
                const open = allowed(ch, n);
                return (
                  <button
                    key={n}
                    onClick={() => play(ch, n)}
                    aria-label={tr ? `${ch.name} ${n}. bölüm${open ? "" : " (kilitli)"}` : `${ch.name} episode ${n}${open ? "" : " (locked)"}`}
                    className={`grid h-7 w-7 place-items-center rounded-full border text-xs font-bold ${open ? "border-gold/50 text-gold" : "border-white/20 text-muted-foreground"}`}
                  >
                    {open ? n : <Lock className="h-3 w-3" />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {parentGate && (
        <ParentGate
          tr={tr}
          onCancel={() => setParentGate(false)}
          onPass={() => {
            setParentGate(false);
            void buy();
          }}
        />
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
            {price ? (
              <button
                onClick={() => (isChild() ? setParentGate(true) : void buy())}
                disabled={busy}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-neon py-3.5 text-sm font-extrabold text-primary-foreground shadow-neon disabled:opacity-60"
              >
                <Crown className="h-4 w-4" /> {tr ? `Tüm animasyonları aç · ${price}` : `Unlock all animations · ${price}`}
              </button>
            ) : (
              <Link
                to="/jeton"
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-neon py-3.5 text-sm font-extrabold text-primary-foreground shadow-neon"
              >
                <Crown className="h-4 w-4" /> {tr ? "Satın al, hepsini aç" : "Buy and unlock everything"}
              </Link>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
