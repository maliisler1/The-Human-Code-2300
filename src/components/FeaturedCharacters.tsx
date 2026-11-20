import { Play, Zap } from "lucide-react";
import { FEATURED_CHARACTERS, characterEpisode, type UpcomingCharacter } from "@/lib/characters";

type Playing = { src: string; title: string; poster?: string | undefined };

/**
 * Öne alınan karakterler: bölümleri yayında olan yeni diziler.
 * Karta dokununca 1. bölüm, altındaki numaralara dokununca o bölüm oynar.
 */
export function FeaturedCharacters({ tr, onPlay }: { tr: boolean; onPlay: (p: Playing) => void }) {
  if (FEATURED_CHARACTERS.length === 0) return null;
  const play = (ch: UpcomingCharacter, n: number) =>
    onPlay({ src: characterEpisode(ch, n), title: `${ch.name} · ${n}`, poster: ch.poster });

  return (
    <section className="mt-8">
      <h2 className="flex items-center gap-2 px-5 font-display text-xl font-bold text-gold">
        <Zap className="h-5 w-5 fill-gold" />{" "}
        {tr ? `Erken izle: ${FEATURED_CHARACTERS.length} yeni dizi` : `Early access: ${FEATURED_CHARACTERS.length} new series`}
      </h2>
      <p className="mt-1 px-5 text-xs text-muted-foreground">
        {tr ? "Her dizinin ilk 5 bölümü şimdi burada. Her bölüm 15 saniye." : "The first 5 episodes of each series are here now. 15 seconds each."}
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
              {Array.from({ length: ch.episodes ?? 0 }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => play(ch, n)}
                  aria-label={tr ? `${ch.name} ${n}. bölüm` : `${ch.name} episode ${n}`}
                  className="grid h-7 w-7 place-items-center rounded-full border border-gold/50 text-xs font-bold text-gold"
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
