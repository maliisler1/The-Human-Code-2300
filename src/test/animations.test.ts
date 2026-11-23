import { describe, expect, it } from "vitest";
import {
  ANIMATION_BASE_PLAN_ID,
  ANIMATION_SUBSCRIPTION_ID,
  FREE_CHARACTER_EPISODES,
  createAnimationStore,
  hasActiveSubscription,
  hasCharacterAccess,
  ownsSeries,
  pickOffer,
} from "@/lib/animations";

const none = { unlocked: [], owned: false };
const subscribed = { unlocked: [], owned: true };

describe("animasyon bölümlerine erişim", () => {
  it("ilk 2 bölüm ücretsiz, 3. bölümden itibaren kilitli", () => {
    expect(FREE_CHARACTER_EPISODES).toBe(10);
    expect(hasCharacterAccess("bip", 1, none)).toBe(true);
    expect(hasCharacterAccess("bip", 10, none)).toBe(true);
    expect(hasCharacterAccess("bip", 11, none)).toBe(false);
    expect(hasCharacterAccess("bip", 15, none)).toBe(false);
    // Konuşmalı uzun dizide (Abram) yalnızca ilk 2 bölüm ücretsiz.
    expect(hasCharacterAccess("abram-hikayesi", 2, none)).toBe(true);
    expect(hasCharacterAccess("abram-hikayesi", 3, none)).toBe(false);
  });
  it("reklamla açılan bölüm yalnızca o bölümü açar", () => {
    const a = { unlocked: ["bip-11"], owned: false };
    expect(hasCharacterAccess("bip", 11, a)).toBe(true);
    expect(hasCharacterAccess("bip", 12, a)).toBe(false);
    expect(hasCharacterAccess("sok", 11, a)).toBe(false);
  });
  it("abone ya da sezon sahibi her bölümü izler", () => {
    expect(hasCharacterAccess("zizi", 15, subscribed)).toBe(true);
    expect(hasCharacterAccess("zizi", 15, none, true)).toBe(true);
  });
  it("abonelik Snooze with Tik'i açar ama diğer dizileri açmaz", () => {
    expect(ownsSeries("snooze-with-tik", false, subscribed)).toBe(true);
    expect(ownsSeries("snooze-with-tik", false, none)).toBe(false);
    expect(ownsSeries("the-human-code-2300", false, subscribed)).toBe(false);
    expect(ownsSeries("the-human-code-2300", true, none)).toBe(true);
  });
});

describe("animasyon aboneliği", () => {
  it("yalnızca geçerli abonelik sayılır", () => {
    expect(hasActiveSubscription([{ productIdentifier: ANIMATION_SUBSCRIPTION_ID, purchaseState: "1" }])).toBe(true);
    expect(hasActiveSubscription([{ productIdentifier: ANIMATION_SUBSCRIPTION_ID, purchaseState: "2" }])).toBe(false);
    expect(hasActiveSubscription([{ productIdentifier: "sezon_1", purchaseState: "1" }])).toBe(false);
    expect(hasActiveSubscription([])).toBe(false);
  });
  it("ücretsiz denemeli teklifi öne alır", () => {
    const base = { identifier: ANIMATION_BASE_PLAN_ID, priceString: "$4.99", introductoryPrice: null };
    const trial = { identifier: ANIMATION_BASE_PLAN_ID, priceString: "$4.99", introductoryPrice: { price: 0 } as never, offerToken: "tok" };
    expect(pickOffer([base, trial])).toEqual({ price: "$4.99", trial: true, offerToken: "tok" });
    expect(pickOffer([base])).toEqual({ price: "$4.99", trial: false });
    expect(pickOffer([{ ...base, identifier: "yillik" }])).toBeNull();
    expect(pickOffer([])).toBeNull();
  });
  it("Android dışında abonelik kapalıdır", async () => {
    const store = createAnimationStore(undefined, () => false);
    expect(await store.offer()).toBeNull();
    expect(await store.check()).toBeNull();
  });
  it("abone olurken temel planı ve seçilen teklifi gönderir", async () => {
    const calls: unknown[] = [];
    const sdk = {
      isBillingSupported: async () => ({ isBillingSupported: true }),
      getProducts: async () => ({ products: [] }),
      getPurchases: async () => ({ purchases: [] }),
      manageSubscriptions: async () => {},
      purchaseProduct: async (o: unknown) => {
        calls.push(o);
        return { productIdentifier: ANIMATION_SUBSCRIPTION_ID, purchaseState: "1" };
      },
    };
    const store = createAnimationStore(sdk as never, () => true);
    expect(await store.subscribe({ price: "$4.99", trial: true, offerToken: "tok" })).toBe(true);
    expect(calls[0]).toEqual({ productIdentifier: ANIMATION_SUBSCRIPTION_ID, planIdentifier: ANIMATION_BASE_PLAN_ID, productType: "subs", offerToken: "tok" });
  });
  it("kullanıcı vazgeçerse hata değil, abonelik yok", async () => {
    const sdk = {
      isBillingSupported: async () => ({ isBillingSupported: true }),
      purchaseProduct: async () => {
        throw new Error("User cancelled");
      },
    };
    expect(await createAnimationStore(sdk as never, () => true).subscribe(null)).toBe(false);
  });
});
