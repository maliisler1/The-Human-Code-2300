// The Human Code: 2300 — bölüm kartları için küçük resimler ve kanca cümleleri (B · Sinema Altını tasarımı).
const thumbs = import.meta.glob("@/assets/hc/e*.jpg", { eager: true, import: "default" }) as Record<string, string>;

const HC_THUMBS: Record<number, string> = {};
for (const [path, url] of Object.entries(thumbs)) {
  const m = /\/e(\d+)\.jpg$/.exec(path);
  if (m) HC_THUMBS[Number(m[1])] = url;
}

const HC_HOOKS_TR: Record<number, string> = {
  1: "Kapsül 23 açılıyor",
  2: "Elyra'dan gelen çağrı",
  3: "Kızıl gözler karanlıkta",
  4: "Bulutların üstündeki kale",
  5: "Hafızası çalınan savaşçı",
  6: "Bilgenin son sırrı",
  7: "Uyuyan umutlar",
  8: "Hain aramızda",
  9: "Kızıl savaşçı sahnede",
  10: "Kristal yaratıklar uyanıyor",
  11: "Kırmızı kod",
  12: "Kamp ateşinde itiraf",
  13: "Adalar düşüyor",
  14: "Kristal kalbin sahibi",
  15: "Aynı DNA, iki kader",
  16: "Kılıç doğru tarafı seçer",
  17: "Bütün kalpler uyanıyor",
  18: "Pusula'nın fedakârlığı",
  19: "Maske kırılıyor",
  20: "Sezon finali",
};

const HC_SLUGS = new Set(["the-human-code-2300", "neo-genesis-2099"]);

export function episodeThumb(slug: string, n: number): string | undefined {
  return HC_SLUGS.has(slug) ? HC_THUMBS[n] : undefined;
}

export function episodeHook(slug: string, n: number, lang: string): string | undefined {
  return HC_SLUGS.has(slug) && lang === "tr" ? HC_HOOKS_TR[n] : undefined;
}
