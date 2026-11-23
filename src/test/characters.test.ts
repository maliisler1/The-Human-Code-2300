import { describe, expect, it } from "vitest";
import { BUNDLED_CATALOG, UPCOMING_CHARACTERS, catalogPaths, characterEpisode, parseCatalog, splitCharacters } from "@/lib/characters";

describe("animasyon kataloğu", () => {
  it("uygulamayla gelen katalogda 24 karakterin hepsi bölümlü", () => {
    const { featured, soon } = splitCharacters(UPCOMING_CHARACTERS);
    expect(featured.map((c) => c.key).slice(0, 5)).toEqual(["abram-hikayesi", "leon", "nova", "bip", "dusty"]);
    expect(featured).toHaveLength(24);
    expect(soon).toHaveLength(0);
  });
  it("depoya ulaşılamadığında afiş uygulamadan gelir, video bağlantısı boştur", () => {
    const bip = UPCOMING_CHARACTERS.find((c) => c.key === "bip")!;
    expect(bip.poster).toBe("/karakterler/bip.webp");
    expect(bip.video).toBe("");
    expect(characterEpisode(bip, 1)).toBe("");
  });
  it("depoda olması gereken dosyaları sayar", () => {
    // 24 fragman + 21 karakter x 10 bölüm + Dusty'nin 5 ek bölümü + Abram, Leon ve Nova'nın 1'er bölümü; afişler uygulamayla gelir.
    expect(catalogPaths(BUNDLED_CATALOG)).toHaveLength(24 + 252 + 5 + 3);
    expect(catalogPaths(BUNDLED_CATALOG, true)).toHaveLength(24 + 252 + 5 + 3 + 24);
    expect(catalogPaths([{ key: "yeni", name: "Yeni", tr: "a", en: "b", episodes: 2 }])).toEqual([
      "karakterler/yeni.mp4",
      "karakterler/yeni.webp",
      "karakterler/yeni-ep1.mp4",
      "karakterler/yeni-ep2.mp4",
    ]);
  });
  it("geçerli kataloğu kabul eder, bozuk olanı reddeder", () => {
    expect(parseCatalog({ characters: [{ key: "yeni", name: "Yeni", tr: "a", en: "b", episodes: 3 }] })).toEqual([
      { key: "yeni", name: "Yeni", tr: "a", en: "b", episodes: 3 },
    ]);
    expect(parseCatalog({ characters: [{ key: "../kotu", name: "X", tr: "a", en: "b" }] })).toBeNull();
    expect(parseCatalog({ characters: [{ key: "x", name: 5, tr: "a", en: "b" }] })).toBeNull();
    expect(parseCatalog({ characters: [] })).toBeNull();
    expect(parseCatalog(null)).toBeNull();
  });
  it("geçersiz bölüm sayısını yok sayar", () => {
    expect(parseCatalog({ characters: [{ key: "x", name: "X", tr: "a", en: "b", episodes: -2 }] })).toEqual([{ key: "x", name: "X", tr: "a", en: "b" }]);
  });
});

describe("parseNextMonth", () => {
  it("reads the corner list and falls back to the Turkish title", async () => {
    const { parseNextMonth, BUNDLED_NEXT_MONTH } = await import("@/lib/characters");
    expect(parseNextMonth({ nextMonth: [{ key: "kayip-tren", title: "Kayıp Tren" }] })).toEqual([{ key: "kayip-tren", title: "Kayıp Tren", titleEn: "Kayıp Tren" }]);
    expect(parseNextMonth({ nextMonth: [] })).toEqual([]);
    expect(parseNextMonth({})).toBeNull();
    expect(parseNextMonth({ nextMonth: [{ key: "../x", title: "a" }] })).toBeNull();
    expect(BUNDLED_NEXT_MONTH.map((s) => s.key)).toEqual(["ruya-arsivi", "kayip-tren"]);
  });
});

import { parseSubs } from "@/lib/characters";

describe("bölüm altyazıları", () => {
  it("geçerli altyazıyı kabul eder, bozuk dili atlar", () => {
    const s = parseSubs({ "1": { cues: [[1, 2], [3, 4]], text: { en: ["Hi", "Bye"], tr: ["Selam"] } } });
    expect(s?.["1"]?.cues).toHaveLength(2);
    expect(s?.["1"]?.text["en"]).toEqual(["Hi", "Bye"]);
    expect(s?.["1"]?.text["tr"]).toBeUndefined();
  });
  it("bozuk altyazıda bölümü altyazısız bırakır", () => {
    expect(parseSubs({ "1": { cues: [[2, 1]], text: { en: ["x"] } } })).toBeUndefined();
    expect(parseSubs("x")).toBeUndefined();
  });
});
