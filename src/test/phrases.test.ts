import { describe, expect, it } from "vitest";
import { loc, parseLoc, s, setPhraseLang } from "@/lib/phrases";
import { LANGS, translate } from "@/lib/i18n";
import { BUNDLED_CATALOG, BUNDLED_SHELVES, parseCatalog } from "@/lib/characters";

describe("20 dil", () => {
  it("arayüz 20 dili destekler ve her dilde menü çevrilidir", () => {
    expect(LANGS).toHaveLength(20);
    for (const l of LANGS) expect(translate(l, "nav_home")).not.toBe("nav_home");
    expect(translate("ja", "nav_home")).toBe("ホーム");
    expect(translate("ta", "episodes_count", { n: 5 })).toBe("5 எபிசோடுகள்");
  });
  it("sabit metinler dile göre değişir, bilinmeyen metin İngilizce kalır", () => {
    setPhraseLang("tr");
    expect(s("Ara", "Search")).toBe("Ara");
    setPhraseLang("de");
    expect(s("Ara", "Search")).toBe("Suchen");
    expect(s("{n}. bölüm", "Episode {n}", { n: 3 })).toBe("Folge 3");
    expect(s("Yok", "Not in table")).toBe("Not in table");
    setPhraseLang("tr");
  });
  it("katalog metinleri her dilde çevrilidir", () => {
    const bip = BUNDLED_CATALOG.find((c) => c.key === "bip")!;
    setPhraseLang("ko");
    expect(loc({ tr: bip.tr, en: bip.en, loc: bip.loc })).toBe("배터리 1%. 충전기는 멀리 있다.");
    expect(loc(BUNDLED_SHELVES[0]!)).toBe("주방 히어로");
    setPhraseLang("xx");
    expect(loc({ tr: "a", en: "b" })).toBe("b");
    setPhraseLang("tr");
  });
  it("depodan gelen çeviri alanı doğrulanır", () => {
    expect(parseLoc({ de: "Hallo", "../x": "y", fr: 3 })).toEqual({ de: "Hallo" });
    expect(parseLoc(null)).toBeUndefined();
    expect(parseCatalog({ characters: [{ key: "a", name: "A", tr: "t", en: "e", loc: { ja: "j" } }] })).toEqual([{ key: "a", name: "A", tr: "t", en: "e", loc: { ja: "j" } }]);
  });
});
