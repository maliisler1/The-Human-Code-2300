import { describe, expect, it } from "vitest";
import { otherPublished, pickFeatured, pickSolo } from "@/routes/index";
import type { SeriesRow } from "@/lib/catalog";

const row = (slug: string, status: "draft" | "published", sort = 0): SeriesRow => ({
  id: slug,
  slug,
  title: slug,
  category: "scifi",
  poster_url: null,
  status,
  sort,
  text: {},
});

describe("tek dizi ana sayfa", () => {
  it("sabit ana diziyi seçer", () => {
    const all = [row("a", "published"), row("the-human-code-2300", "draft"), row("b", "published")];
    expect(pickFeatured(all)?.slug).toBe("the-human-code-2300");
  });
  it("ana dizi yoksa ilk yayımlanmış diziye düşer", () => {
    expect(pickFeatured([row("a", "draft"), row("b", "published")])?.slug).toBe("b");
  });
  it("diğer dizilerden yalnızca yayımlanmışları gösterir", () => {
    const all = [row("the-human-code-2300", "published"), row("a", "draft"), row("b", "published")];
    expect(otherPublished(all, pickFeatured(all)).map((s) => s.slug)).toEqual(["b"]);
  });
});

describe("tek dizi modu (Snooze with Tik)", () => {
  it("yayımlanan tek dizi ana dizinin önüne geçer", () => {
    const all = [row("the-human-code-2300", "published"), row("snooze-with-tik", "published")];
    expect(pickFeatured(all)?.slug).toBe("snooze-with-tik");
  });
  it("tek dizi taslakken ana ekran eskisi gibi kalır", () => {
    const all = [row("the-human-code-2300", "published"), row("snooze-with-tik", "draft")];
    expect(pickSolo(all)).toBeUndefined();
    expect(pickFeatured(all)?.slug).toBe("the-human-code-2300");
  });
  it("tek dizi yokken ana ekran eskisi gibi kalır", () => {
    const all = [row("the-human-code-2300", "published"), row("b", "published")];
    expect(pickSolo(all)).toBeUndefined();
    expect(pickFeatured(all)?.slug).toBe("the-human-code-2300");
  });
});
