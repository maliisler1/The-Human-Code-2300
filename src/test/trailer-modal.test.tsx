import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TrailerModal } from "@/components/TrailerModal";

afterEach(cleanup);
beforeEach(() => {
  vi.spyOn(HTMLMediaElement.prototype, "load").mockImplementation(() => {});
  vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
});
const subs = { cues: [[0, 5]] as [number, number][], text: { tr: ["Merhaba"], en: ["Hello"] } };

describe("dikey bölüm oynatıcısı", () => {
  it("bölüm değişince aynı video öğesini kullanır ve boyutu değişmez", () => {
    const { container, rerender } = render(<TrailerModal src="a.mp4" title="Dusty · 1" vertical subs={subs} defaultLang="tr" onClose={() => {}} />);
    const first = container.querySelector("video");
    expect(first?.getAttribute("controlslist")).toContain("nofullscreen");
    expect(first?.parentElement?.className).toContain("h-[100dvh]");
    expect(first?.parentElement?.className).toContain("shrink-0");
    rerender(<TrailerModal src="b.mp4" title="Dusty · 2" vertical defaultLang="tr" onClose={() => {}} />);
    const second = container.querySelector("video");
    expect(second).toBe(first);
    expect(second?.parentElement?.className).toContain("h-[100dvh]");
  });
});
