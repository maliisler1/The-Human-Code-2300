import { describe, expect, it } from "vitest";
import { ANIMATION_PRODUCT_ID, FREE_CHARACTER_EPISODES, createAnimationStore, hasCharacterAccess, ownsAnimations } from "@/lib/animations";

const none = { unlocked: [], owned: false };

describe("animasyon bölümlerine erişim", () => {
  it("ilk 2 bölüm ücretsiz, 3. bölümden itibaren kilitli", () => {
    expect(FREE_CHARACTER_EPISODES).toBe(2);
    expect(hasCharacterAccess("bip", 1, none)).toBe(true);
    expect(hasCharacterAccess("bip", 2, none)).toBe(true);
    expect(hasCharacterAccess("bip", 3, none)).toBe(false);
    expect(hasCharacterAccess("bip", 5, none)).toBe(false);
  });
  it("reklamla açılan bölüm yalnızca o bölümü açar", () => {
    const a = { unlocked: ["bip-3"], owned: false };
    expect(hasCharacterAccess("bip", 3, a)).toBe(true);
    expect(hasCharacterAccess("bip", 4, a)).toBe(false);
    expect(hasCharacterAccess("sok", 3, a)).toBe(false);
  });
  it("paket ya da sezon sahibi her bölümü izler", () => {
    expect(hasCharacterAccess("zizi", 5, { unlocked: [], owned: true })).toBe(true);
    expect(hasCharacterAccess("zizi", 5, none, true)).toBe(true);
  });
  it("yalnızca geçerli animasyon paketi satın alması sayılır", () => {
    expect(ownsAnimations([{ productIdentifier: ANIMATION_PRODUCT_ID, purchaseState: "1" }])).toBe(true);
    expect(ownsAnimations([{ productIdentifier: ANIMATION_PRODUCT_ID, purchaseState: "2" }])).toBe(false);
    expect(ownsAnimations([{ productIdentifier: "sezon_1", purchaseState: "1" }])).toBe(false);
  });
  it("Android dışında satın alma kapalıdır", async () => {
    const store = createAnimationStore(undefined, () => false);
    expect(await store.price()).toBeNull();
    expect(await store.check()).toBeNull();
  });
});
