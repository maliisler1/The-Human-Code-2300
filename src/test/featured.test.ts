import { describe, expect, it } from "vitest";
import { otherPublished, pickFeatured } from "@/routes/index";
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
