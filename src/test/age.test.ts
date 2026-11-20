import { describe, expect, it, vi } from "vitest";
import type { AdMob } from "@capacitor-community/admob";
import { createAdsController } from "@/lib/ads";
import { ageGroupFromYear } from "@/lib/age";

describe("yaş ekranı", () => {
  it("13 yaş ve altı çocuk, üstü yetişkin sayılır", () => {
    expect(ageGroupFromYear(2020, 2026)).toBe("child");
    expect(ageGroupFromYear(2013, 2026)).toBe("child");
    expect(ageGroupFromYear(2012, 2026)).toBe("adult");
    expect(ageGroupFromYear(1980, 2026)).toBe("adult");
  });
  it("geçersiz yıl kabul edilmez", () => {
    expect(ageGroupFromYear(2030, 2026)).toBe("unknown");
    expect(ageGroupFromYear(1800, 2026)).toBe("unknown");
    expect(ageGroupFromYear(Number.NaN, 2026)).toBe("unknown");
  });
});

function sdk() {
  return {
    requestConsentInfo: vi.fn().mockResolvedValue({ status: "NOT_REQUIRED", canRequestAds: true, privacyOptionsRequirementStatus: "NOT_REQUIRED" }),
    showConsentForm: vi.fn(),
    initialize: vi.fn().mockResolvedValue(undefined),
    addListener: vi.fn().mockResolvedValue({ remove: vi.fn() }),
    showBanner: vi.fn().mockResolvedValue(undefined),
    removeBanner: vi.fn().mockResolvedValue(undefined),
    prepareInterstitial: vi.fn().mockResolvedValue(undefined),
  };
}

describe("yaşa göre reklam", () => {
  it("yaş sorulmadan reklam başlatılmaz", async () => {
    const m = sdk();
    await createAdsController(m as unknown as typeof AdMob, () => true, () => 0, false, () => "unknown").start();
    expect(m.requestConsentInfo).not.toHaveBeenCalled();
    expect(m.initialize).not.toHaveBeenCalled();
  });
  it("çocukta yalnızca çocuklara uygun, kişiselleştirilmemiş reklam istenir", async () => {
    const m = sdk();
    await createAdsController(m as unknown as typeof AdMob, () => true, () => 0, false, () => "child").start();
    expect(m.requestConsentInfo).toHaveBeenCalledWith({ tagForUnderAgeOfConsent: true });
    expect(m.initialize).toHaveBeenCalledWith({ tagForChildDirectedTreatment: true, tagForUnderAgeOfConsent: true, maxAdContentRating: "General" });
    expect(m.showBanner).toHaveBeenCalledWith(expect.objectContaining({ npa: true }));
  });
  it("yetişkinde çocuk etiketi gönderilmez", async () => {
    const m = sdk();
    await createAdsController(m as unknown as typeof AdMob, () => true, () => 0, false, () => "adult").start();
    expect(m.initialize).toHaveBeenCalledWith({});
    expect(m.showBanner).toHaveBeenCalledWith(expect.objectContaining({ npa: false }));
  });
});
