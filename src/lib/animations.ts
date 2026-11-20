import { Capacitor } from "@capacitor/core";
import { NativePurchases, PURCHASE_TYPE, type Product, type Transaction } from "@capgo/native-purchases";

/**
 * Animasyon dizileri (Snooze with Tik ve karakter dizileri) için erişim kuralları.
 * İlk FREE_CHARACTER_EPISODES bölüm ücretsizdir. Sonraki bölümler ya reklam izleyerek
 * tek tek açılır ya da aylık "Animasyon Aboneliği" ile hepsi açılır ve reklamlar kalkar.
 */
export const FREE_CHARACTER_EPISODES = 2;

/**
 * Google Play'de abonelik ürünü. Play Console > Para kazanma > Abonelikler altında bu
 * kimlikle açılmalı; fiyat ve ücretsiz deneme orada belirlenir.
 */
export const ANIMATION_SUBSCRIPTION_ID = "animasyon_abonelik";
/** Aboneliğin temel planı (aylık, otomatik yenilenen). */
export const ANIMATION_BASE_PLAN_ID = "aylik";

/** Bölümleri animasyon aboneliğiyle açılan dizi. */
export const SNOOZE_SLUG = "snooze-with-tik";

const KEY = "amc.animations.v1";
export type AnimationAccess = { unlocked: string[]; owned: boolean };

let cached: AnimationAccess | undefined;
const listeners = new Set<() => void>();

function read(): AnimationAccess {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "{}") as Partial<AnimationAccess>;
    return { unlocked: Array.isArray(raw.unlocked) ? raw.unlocked : [], owned: raw.owned === true };
  } catch {
    return { unlocked: [], owned: false };
  }
}

/** Cihazdaki erişim durumu: reklamla açılan bölümler ve abonelik. */
export function getAnimationAccess(): AnimationAccess {
  cached ??= read();
  return cached;
}

export function setAnimationAccess(next: AnimationAccess) {
  cached = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Depolama kapalıysa erişim yalnızca bu oturumda geçerli kalır.
  }
  listeners.forEach((fn) => fn());
}

export function subscribeAnimationAccess(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

/** Bölüm kimliği, ör. "bip-3". */
export const characterEpisodeId = (key: string, n: number) => `${key}-${n}`;

export function hasCharacterAccess(key: string, n: number, access: AnimationAccess, seasonOwned = false) {
  return n <= FREE_CHARACTER_EPISODES || seasonOwned || access.owned || access.unlocked.includes(characterEpisodeId(key, n));
}

/** Bir dizinin tüm bölümleri açık mı? Animasyon dizilerinde abonelik de yeterlidir. */
export function ownsSeries(slug: string, seasonOwned: boolean, access: AnimationAccess = getAnimationAccess()) {
  return seasonOwned || (slug === SNOOZE_SLUG && access.owned);
}

/** Android'de abonelik "1" durumundaysa geçerlidir; süresi biten ya da iade edilenler listeden düşer. */
export function hasActiveSubscription(purchases: Pick<Transaction, "productIdentifier" | "purchaseState">[]): boolean {
  return purchases.some(
    (p) => p.productIdentifier === ANIMATION_SUBSCRIPTION_ID && (p.purchaseState === undefined || p.purchaseState === "1"),
  );
}

export type SubscriptionOffer = {
  /** Yenileme fiyatı, ör. "₺169,99". */
  price: string;
  /** Teklifte ücretsiz deneme var mı? */
  trial: boolean;
  offerToken?: string;
};

/** Mağazadan dönen teklifler arasından gösterilecek olan: varsa ücretsiz denemeli teklif. */
export function pickOffer(products: Pick<Product, "identifier" | "priceString" | "introductoryPrice" | "offerToken">[]): SubscriptionOffer | null {
  const plans = products.filter((p) => p.identifier === ANIMATION_BASE_PLAN_ID);
  const chosen = plans.find((p) => p.introductoryPrice) ?? plans[0];
  if (!chosen) return null;
  return { price: chosen.priceString, trial: !!chosen.introductoryPrice, ...(chosen.offerToken ? { offerToken: chosen.offerToken } : {}) };
}

type Billing = Pick<typeof NativePurchases, "isBillingSupported" | "getProducts" | "purchaseProduct" | "getPurchases" | "manageSubscriptions">;

export function createAnimationStore(sdk: Billing = NativePurchases, native = () => Capacitor.getPlatform() === "android") {
  async function available(): Promise<boolean> {
    if (!native()) return false;
    try {
      return (await sdk.isBillingSupported()).isBillingSupported;
    } catch {
      return false;
    }
  }

  /** Mağazadaki abonelik teklifi; ürün Play Console'da henüz yoksa null. */
  async function offer(): Promise<SubscriptionOffer | null> {
    if (!(await available())) return null;
    try {
      const { products } = await sdk.getProducts({ productIdentifiers: [ANIMATION_SUBSCRIPTION_ID], productType: PURCHASE_TYPE.SUBS });
      return pickOffer(products);
    } catch {
      return null;
    }
  }

  /** Abonelik akışını açar. true: abonelik başladı. Kullanıcı vazgeçerse false. */
  async function subscribe(chosen?: SubscriptionOffer | null): Promise<boolean> {
    if (!(await available())) throw new Error("billing_unavailable");
    try {
      const tx = await sdk.purchaseProduct({
        productIdentifier: ANIMATION_SUBSCRIPTION_ID,
        planIdentifier: ANIMATION_BASE_PLAN_ID,
        productType: PURCHASE_TYPE.SUBS,
        ...(chosen?.offerToken ? { offerToken: chosen.offerToken } : {}),
      });
      return hasActiveSubscription([tx]);
    } catch (e) {
      if (String((e as Error)?.message ?? e).toLowerCase().includes("cancel")) return false;
      throw e;
    }
  }

  /** Abonelik sürüyor mu? null: kontrol edilemedi; cihazdaki son bilinen durum korunmalı. */
  async function check(): Promise<boolean | null> {
    if (!(await available())) return null;
    try {
      const { purchases } = await sdk.getPurchases({ productType: PURCHASE_TYPE.SUBS });
      return hasActiveSubscription(purchases);
    } catch {
      return null;
    }
  }

  /** Google Play'in abonelik yönetimi ekranını açar (iptal etme, ödeme yöntemi). */
  async function manage(): Promise<void> {
    await sdk.manageSubscriptions();
  }

  return { available, offer, subscribe, check, manage };
}

export const animations = createAnimationStore();

/** Açılışta bir kez: Google Play'deki abonelik durumunu cihazdaki kayda işler. */
export async function refreshSubscription(store = animations): Promise<void> {
  const owned = await store.check();
  if (owned === null) return;
  const access = getAnimationAccess();
  if (access.owned !== owned) setAnimationAccess({ ...access, owned });
}
