import { describe, expect, it } from "vitest";
import { BUNDLED_CATALOG, UPCOMING_CHARACTERS, catalogPaths, characterEpisode, parseCatalog, splitCharacters } from "@/lib/characters";

describe("animasyon kataloğu", () => {
  it("uygulamayla gelen katalogda 5 öne alınan, 15 yakında karakter var", () => {
    const { featured, soon } = splitCharacters(UPCOMING_CHARACTERS);
    expect(featured.map((c) => c.key)).toEqual(["bip", "dusty", "pizzo", "zizi", "sok"]);
    expect(soon).toHaveLength(15);
  });
  it("depoya ulaşılamadığında afiş uygulamadan gelir, video bağlantısı boştur", () => {
    const bip = UPCOMING_CHARACTERS[0]!;
    expect(bip.poster).toBe("/karakterler/bip.webp");
    expect(bip.video).toBe("");
    expect(characterEpisode(bip, 1)).toBe("");
  });
  it("depoda olması gereken dosyaları sayar", () => {
    // 20 fragman + 5 karakter x 5 bölüm; afişler uygulamayla geldiği için sayılmaz.
    expect(catalogPaths(BUNDLED_CATALOG)).toHaveLength(45);
    expect(catalogPaths(BUNDLED_CATALOG, true)).toHaveLength(65);
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
