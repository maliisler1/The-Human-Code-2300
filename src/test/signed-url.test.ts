import { describe, expect, it } from "vitest";
import { signedUrl } from "@/lib/catalog";

describe("signedUrl", () => {
  it("uygulamayla gelen dosya yolunu olduğu gibi döndürür", async () => {
    expect(await signedUrl("videos", "/sample.mp4")).toBe("/sample.mp4");
  });
  it("hazır süreli bağlantıyı yeniden imzalamaya çalışmaz", async () => {
    const url = "https://example.supabase.co/storage/v1/object/sign/animations/snooze/ep1.mp4?token=abc";
    expect(await signedUrl("videos", url)).toBe(url);
  });
  it("yol yoksa null döner", async () => {
    expect(await signedUrl("videos", null)).toBeNull();
  });
});
