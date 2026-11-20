import { describe, expect, it } from "vitest";
import { parseProgress, recentKeys } from "@/lib/progress";
import { BUNDLED_CATALOG, BUNDLED_SHELVES, parseShelves } from "@/lib/characters";

describe("izleme ilerlemesi", () => {
  it("bozuk kayıtları atar, geçerli olanları okur", () => {
    expect(parseProgress(null)).toEqual({});
    expect(parseProgress("x")).toEqual({});
    expect(parseProgress(JSON.stringify({ dusty: { n: 2, at: 5 }, "../x": { n: 1, at: 1 }, bip: { n: 0, at: 1 } }))).toEqual({ dusty: { n: 2, at: 5 } });
  });
  it("en son izleneni başa alır", () => {
    expect(recentKeys({ a: { n: 1, at: 1 }, b: { n: 1, at: 9 }, c: { n: 1, at: 4 } })).toEqual(["b", "c", "a"]);
  });
});

describe("raflar", () => {
  it("uygulamayla gelen raflar bütün karakterleri kapsar", () => {
    const members = BUNDLED_SHELVES.flatMap((s) => s.members).sort();
    expect(members).toEqual(BUNDLED_CATALOG.map((c) => c.key).sort());
  });
  it("biçimi bozuk rafları reddeder", () => {
    expect(parseShelves({})).toBeNull();
    expect(parseShelves({ shelves: [{ key: "a", tr: "A", members: ["bip", 3, "../x"] }] })).toEqual([{ key: "a", tr: "A", en: "A", members: ["bip"] }]);
    expect(parseShelves({ shelves: [{ key: "A B", tr: "A", members: [] }] })).toBeNull();
  });
});
