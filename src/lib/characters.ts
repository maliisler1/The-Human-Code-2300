import { queryOptions, useQuery } from "@tanstack/react-query";
import bundledCatalog from "./katalog.json";
import { downloadCatalog, signMedia } from "./media";

/**
 * Animasyon karakterleri: her biri Snooze with Tik ile aynı mantıkta, konuşmasız
 * 15 saniyelik bölümlerden oluşan ayrı bir dizidir.
 *
 * Liste depodaki katalog.json'dan okunur; böylece yeni karakter ve bölümler uygulama
 * güncellenmeden görünür. Depoya ulaşılamazsa uygulamayla gelen katalog kullanılır
 * (afişler görünür, videolar bağlantı gelene kadar oynamaz).
 */
export type UpcomingCharacter = {
  key: string;
  name: string;
  hook: { tr: string; en: string };
  poster: string;
  /** Fragmanın süreli bağlantısı; depoya ulaşılamadıysa boş. */
  video: string;
  /** Yayında olan bölüm sayısı. Tanımlıysa karakter öne alınır ve bölümleri izlenebilir. */
  episodes?: number;
  /** Bölümlerin süreli bağlantıları (1. bölüm 0. sırada). */
  episodeUrls: string[];
};

export type CatalogCharacter = { key: string; name: string; tr: string; en: string; episodes?: number };

/** Afişi uygulamayla birlikte gelen karakterler (public/karakterler/<key>.webp). */
const BUNDLED_POSTERS = new Set(bundledCatalog.characters.map((c) => c.key));

export const trailerPath = (key: string) => `karakterler/${key}.mp4`;
export const posterPath = (key: string) => `karakterler/${key}.webp`;
export const episodePath = (key: string, n: number) => `karakterler/${key}-ep${n}.mp4`;

/** Bir kataloğun depoda bulunması gereken bütün dosya yolları. */
export function catalogPaths(list: CatalogCharacter[], includeBundledPosters = false): string[] {
  const paths: string[] = [];
  for (const c of list) {
    paths.push(trailerPath(c.key));
    if (includeBundledPosters || !BUNDLED_POSTERS.has(c.key)) paths.push(posterPath(c.key));
    for (let n = 1; n <= (c.episodes ?? 0); n++) paths.push(episodePath(c.key, n));
  }
  return paths;
}

function toCharacter(c: CatalogCharacter, urls: Record<string, string>): UpcomingCharacter {
  return {
    key: c.key,
    name: c.name,
    hook: { tr: c.tr, en: c.en },
    poster: BUNDLED_POSTERS.has(c.key) ? `/karakterler/${c.key}.webp` : (urls[posterPath(c.key)] ?? ""),
    video: urls[trailerPath(c.key)] ?? "",
    ...(c.episodes ? { episodes: c.episodes } : {}),
    episodeUrls: Array.from({ length: c.episodes ?? 0 }, (_, i) => urls[episodePath(c.key, i + 1)] ?? ""),
  };
}

/** Karakterin n. bölümünün süreli bağlantısı; yoksa boş. */
export const characterEpisode = (ch: UpcomingCharacter, n: number) => ch.episodeUrls[n - 1] ?? "";

/**
 * Depodan gelen kataloğu doğrular. Biçim bozuksa null döner ve uygulamayla gelen liste kullanılır.
 * Anahtarlar yalnızca küçük harf, rakam ve tire içerebilir (dosya yolunda kullanılır).
 */
export function parseCatalog(json: unknown): CatalogCharacter[] | null {
  const list = (json as { characters?: unknown } | null)?.characters;
  if (!Array.isArray(list) || list.length === 0) return null;
  const out: CatalogCharacter[] = [];
  for (const raw of list) {
    const c = raw as Partial<CatalogCharacter>;
    if (typeof c.key !== "string" || !/^[a-z0-9-]{1,40}$/.test(c.key)) return null;
    if (typeof c.name !== "string" || typeof c.tr !== "string" || typeof c.en !== "string") return null;
    const n = c.episodes;
    const episodes = typeof n === "number" && Number.isInteger(n) && n > 0 && n <= 500 ? n : undefined;
    out.push({ key: c.key, name: c.name, tr: c.tr, en: c.en, ...(episodes ? { episodes } : {}) });
  }
  return out;
}

export const BUNDLED_CATALOG: CatalogCharacter[] = bundledCatalog.characters;

/** Uygulamayla gelen liste: depoya ulaşılamadığında kullanılır (video bağlantıları boştur). */
export const UPCOMING_CHARACTERS: UpcomingCharacter[] = BUNDLED_CATALOG.map((c) => toCharacter(c, {}));

export function splitCharacters(list: UpcomingCharacter[]) {
  return {
    /** Öne alınan, bölümleri yayında olan karakterler. */
    featured: list.filter((ch) => ch.episodes),
    /** Henüz yalnızca fragmanı olan karakterler. */
    soon: list.filter((ch) => !ch.episodes),
  };
}

export const animationCatalogQuery = queryOptions({
  queryKey: ["animations", "catalog"],
  queryFn: async (): Promise<UpcomingCharacter[]> => {
    const catalog = parseCatalog(await downloadCatalog()) ?? BUNDLED_CATALOG;
    const urls = await signMedia(catalogPaths(catalog));
    return catalog.map((c) => toCharacter(c, urls));
  },
  // Bağlantılar 7 gün geçerli; liste yarım saatte bir tazelenir.
  staleTime: 30 * 60_000,
  retry: 1,
});

/** Güncel karakter listesi: depodaki katalog, yoksa uygulamayla gelen liste. */
export function useCharacters() {
  const { data } = useQuery(animationCatalogQuery);
  return splitCharacters(data ?? UPCOMING_CHARACTERS);
}
