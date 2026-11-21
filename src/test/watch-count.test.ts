import { describe, expect, it } from "vitest";
import { validWatch } from "@/lib/watchCount";

describe("izlenme sayacı", () => {
  it("geçerli anahtar ve bölüm numarasını kabul eder", () => {
    expect(validWatch("abram-hikayesi", 1)).toBe(true);
    expect(validWatch("snooze-with-tik", 0)).toBe(true);
  });
  it("bozuk değerleri göndermez", () => {
    expect(validWatch("Abram Hikayesi", 1)).toBe(false);
    expect(validWatch("bip", -1)).toBe(false);
    expect(validWatch("bip", 1.5)).toBe(false);
    expect(validWatch("bip", 999)).toBe(false);
  });
});
