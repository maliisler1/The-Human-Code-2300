import { queryOptions, useQuery } from "@tanstack/react-query";
import bundledCatalog from "./katalog.json";
import { downloadCatalog, signMedia } from "./media";
import { parseLoc } from "./phrases";

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
  hook: { tr: string; en: string; loc?: Record<string, string> | undefined };
  poster: string;
  /** Fragmanın süreli bağlantısı; depoya ulaşılamadıysa boş. */
  video: string;
  /** Yayında olan bölüm sayısı. Tanımlıysa karakter öne alınır ve bölümleri izlenebilir. */
  episodes?: number;
  /** Bölümlerin süreli bağlantıları (1. bölüm 0. sırada). */
  episodeUrls: string[];
  /** Konuşmalı bölümlerin altyazıları (anahtar: bölüm numarası). */
  subs?: Record<string, SubTrack> | undefined;
};

/** Altyazı: her satırın başlangıç/bitiş saniyesi ve dillere göre metinleri (satır sırasıyla). */
export type SubTrack = { cues: [number, number][]; text: Record<string, string[]> };

export type CatalogCharacter = { key: string; name: string; tr: string; en: string; episodes?: number; loc?: Record<string, string> | undefined; subs?: Record<string, SubTrack> | undefined };

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
    hook: { tr: c.tr, en: c.en, loc: c.loc },
    poster: BUNDLED_POSTERS.has(c.key) ? `/karakterler/${c.key}.webp` : (urls[posterPath(c.key)] ?? ""),
    video: urls[trailerPath(c.key)] ?? "",
    ...(c.episodes ? { episodes: c.episodes } : {}),
    episodeUrls: Array.from({ length: c.episodes ?? 0 }, (_, i) => urls[episodePath(c.key, i + 1)] ?? ""),
    ...(c.subs ? { subs: c.subs } : {}),
  };
}

/** Karakterin n. bölümünün süreli bağlantısı; yoksa boş. */
export const characterEpisode = (ch: UpcomingCharacter, n: number) => ch.episodeUrls[n - 1] ?? "";

/** Katalogdaki altyazıları doğrular; bozuk bölüm altyazısı atlanır (bölüm yine oynar). */
export function parseSubs(json: unknown): Record<string, SubTrack> | undefined {
  if (!json || typeof json !== "object" || Array.isArray(json)) return undefined;
  const out: Record<string, SubTrack> = {};
  for (const [n, raw] of Object.entries(json as Record<string, unknown>)) {
    if (!/^\d{1,3}$/.test(n)) continue;
    const t = raw as { cues?: unknown; text?: unknown } | null;
    if (!t || !Array.isArray(t.cues) || !t.text || typeof t.text !== "object") continue;
    const cues = t.cues.filter((c): c is [number, number] => Array.isArray(c) && c.length === 2 && typeof c[0] === "number" && typeof c[1] === "number" && c[0] <= c[1]);
    if (cues.length !== t.cues.length || cues.length === 0 || cues.length > 200) continue;
    const text: Record<string, string[]> = {};
    for (const [lang, lines] of Object.entries(t.text as Record<string, unknown>)) {
      if (/^[a-z]{2}$/.test(lang) && Array.isArray(lines) && lines.length === cues.length && lines.every((l) => typeof l === "string" && l.length <= 300)) text[lang] = lines as string[];
    }
    if (Object.keys(text).length > 0) out[n] = { cues, text };
  }
  return Object.keys(out).length > 0 ? out : undefined;
}

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
    const loc = parseLoc((raw as { loc?: unknown }).loc);
    const subs = parseSubs((raw as { subs?: unknown }).subs);
    out.push({ key: c.key, name: c.name, tr: c.tr, en: c.en, ...(episodes ? { episodes } : {}), ...(loc ? { loc } : {}), ...(subs ? { subs } : {}) });
  }
  return out;
}

export const BUNDLED_CATALOG: CatalogCharacter[] = bundledCatalog.characters as unknown as CatalogCharacter[];

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

/**
 * "Önümüzdeki ay" köşesi: yalnızca fragmanı gösterilen diziler. Liste depodaki katalogdan
 * okunur; fragman ve afiş dosyaları web sitesinde durur (trailers/<key>_720.mp4, <key>_poster.jpg).
 * Böylece yeni fragman eklemek için uygulamayı güncellemek gerekmez.
 */
export type NextMonthSeries = { key: string; title: string; titleEn: string; loc?: Record<string, string> | undefined };

export function parseNextMonth(json: unknown): NextMonthSeries[] | null {
  const list = (json as { nextMonth?: unknown } | null)?.nextMonth;
  if (!Array.isArray(list)) return null;
  const out: NextMonthSeries[] = [];
  for (const raw of list) {
    const s = raw as Partial<NextMonthSeries>;
    if (typeof s.key !== "string" || !/^[a-z0-9-]{1,40}$/.test(s.key)) return null;
    if (typeof s.title !== "string" || !s.title) return null;
    const loc = parseLoc((raw as { loc?: unknown }).loc);
    out.push({ key: s.key, title: s.title, titleEn: typeof s.titleEn === "string" && s.titleEn ? s.titleEn : s.title, ...(loc ? { loc } : {}) });
  }
  return out;
}

export const BUNDLED_NEXT_MONTH: NextMonthSeries[] = parseNextMonth(bundledCatalog) ?? [];

export const nextMonthQuery = queryOptions({
  queryKey: ["animations", "next-month"],
  queryFn: async (): Promise<NextMonthSeries[]> => parseNextMonth(await downloadCatalog()) ?? BUNDLED_NEXT_MONTH,
  staleTime: 30 * 60_000,
  retry: 1,
});

/** Köşede gösterilecek diziler: depodaki liste, yoksa uygulamayla gelen liste. */
export function useNextMonth(): NextMonthSeries[] {
  return useQuery(nextMonthQuery).data ?? BUNDLED_NEXT_MONTH;
}

/**
 * Ana ekran rafları: karakterleri temaya göre gruplar. Depodaki katalogdan okunur;
 * yeni karakter bir rafa uygulama güncellemesi olmadan eklenebilir.
 */
export type Shelf = { key: string; tr: string; en: string; members: string[]; loc?: Record<string, string> | undefined };

export function parseShelves(json: unknown): Shelf[] | null {
  const list = (json as { shelves?: unknown } | null)?.shelves;
  if (!Array.isArray(list)) return null;
  const out: Shelf[] = [];
  for (const raw of list) {
    const s = raw as Partial<Shelf>;
    if (typeof s.key !== "string" || !/^[a-z0-9-]{1,40}$/.test(s.key)) return null;
    if (typeof s.tr !== "string" || !s.tr || !Array.isArray(s.members)) return null;
    const members = s.members.filter((m): m is string => typeof m === "string" && /^[a-z0-9-]{1,40}$/.test(m));
    const loc = parseLoc((raw as { loc?: unknown }).loc);
    out.push({ key: s.key, tr: s.tr, en: typeof s.en === "string" && s.en ? s.en : s.tr, members, ...(loc ? { loc } : {}) });
  }
  return out;
}

export const BUNDLED_SHELVES: Shelf[] = parseShelves(bundledCatalog) ?? [];

export const shelvesQuery = queryOptions({
  queryKey: ["animations", "shelves"],
  queryFn: async (): Promise<Shelf[]> => parseShelves(await downloadCatalog()) ?? BUNDLED_SHELVES,
  staleTime: 30 * 60_000,
  retry: 1,
});

export function useShelves(): Shelf[] {
  return useQuery(shelvesQuery).data ?? BUNDLED_SHELVES;
}
