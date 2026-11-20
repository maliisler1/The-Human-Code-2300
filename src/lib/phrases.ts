import table from "./phrases.json";

/**
 * Bileşenlerdeki sabit metinler için çeviri: Türkçe ve İngilizce metin kodda durur,
 * diğer diller phrases.json'dan (İngilizce metin anahtardır) gelir. Bulunamazsa İngilizce gösterilir.
 * Etkin dil, useT() her çağrıldığında güncellenir.
 */
const TABLE = table as Record<string, Record<string, string>>;
let current = "tr";

export function setPhraseLang(lang: string) {
  current = lang;
}

function fill(text: string, vars?: Record<string, string | number>) {
  if (!vars) return text;
  let out = text;
  for (const [k, v] of Object.entries(vars)) out = out.split(`{${k}}`).join(String(v));
  return out;
}

/** Türkçe ve İngilizce metinden etkin dile uygun olanı döndürür. */
export function s(trText: string, enText: string, vars?: Record<string, string | number>) {
  const base = current === "tr" ? trText : current === "en" ? enText : (TABLE[enText]?.[current] ?? enText);
  return fill(base, vars);
}

export type Localized = { tr: string; en: string; loc?: Record<string, string> | undefined };

/** Katalogdaki çok dilli metin: önce kendi çevirisi, sonra ortak tablo, en son İngilizce. */
export function loc(o: Localized) {
  if (current === "tr") return o.tr;
  if (current === "en") return o.en;
  return o.loc?.[current] ?? TABLE[o.en]?.[current] ?? o.en;
}

/** Depodan gelen "loc" alanını doğrular: yalnızca dil kodu → metin çiftleri kalır. */
export function parseLoc(raw: unknown): Record<string, string> | undefined {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return undefined;
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
    if (/^[a-z]{2,3}$/.test(k) && typeof v === "string" && v.length > 0 && v.length <= 300) out[k] = v;
  }
  return Object.keys(out).length ? out : undefined;
}
