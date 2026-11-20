import { Capacitor } from "@capacitor/core";
import { NativePurchases, PURCHASE_TYPE, type Transaction } from "@capgo/native-purchases";

/**
 * Animasyon dizileri (öne alınan karakterler) için erişim kuralları.
 * İlk FREE_CHARACTER_EPISODES bölüm ücretsiz; sonrakiler reklam izleyerek tek tek
 * ya da "Animasyon Paketi" satın alınarak toplu açılır.
 */
export const FREE_CHARACTER_EPISODES = 2;

/**
 * Google Play'de tek seferlik (inapp) ürün. Play Console > Para kazanma >
 * Uygulama içi ürünler altında bu kimlikle açılmalı; fiyat orada belirlenir.
 */
export const ANIMATION_PRODUCT_ID = "animasyon_paketi";

const KEY = "amc.animations.v1";
type Saved = { unlocked: string[]; owned: boolean };

export function loadAnimationAccess(): Saved {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "{}") as Partial<Saved>;
    return { unlocked: Array.isArray(raw.unlocked) ? raw.unlocked : [], owned: raw.owned === true };
  } catch {
    return { unlocked: [], owned: false };
  }
}

export function saveAnimationAccess(next: Saved) {
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Depolama kapalıysa erişim yalnızca bu oturumda geçerli kalır.
  }
}

/** Bölüm kimliği, ör. "bip-3". */
export const characterEpisodeId = (key: string, n: number) => `${key}-${n}`;

export function hasCharacterAccess(key: string, n: number, access: Saved, seasonOwned = false) {
  return n <= FREE_CHARACTER_EPISODES || seasonOwned || access.owned || access.unlocked.includes(characterEpisodeId(key, n));
}

export function ownsAnimations(purchases: Pick<Transaction, "productIdentifier" | "purchaseState">[]): boolean {
  return purchases.some(
    (p) => p.productIdentifier === ANIMATION_PRODUCT_ID && (p.purchaseState === undefined || p.purchaseState === "1"),
  );
}

type Billing = Pick<typeof NativePurchases, "isBillingSupported" | "getProducts" | "purchaseProduct" | "getPurchases">;

export function createAnimationStore(sdk: Billing = NativePurchases, native = () => Capacitor.getPlatform() === "android") {
  async function available(): Promise<boolean> {
    if (!native()) return false;
    try {
      return (await sdk.isBillingSupported()).isBillingSupported;
    } catch {
      return false;
    }
  }

  /** Mağazadaki yerel fiyat; ürün Play Console'da henüz yoksa null. */
  async function price(): Promise<string | null> {
    if (!(await available())) return null;
    try {
      const { products } = await sdk.getProducts({ productIdentifiers: [ANIMATION_PRODUCT_ID], productType: PURCHASE_TYPE.INAPP });
      return products[0]?.priceString ?? null;
    } catch {
      return null;
    }
  }

  /** true: paket artık açık. Kullanıcı vazgeçerse false. */
  async function buy(): Promise<boolean> {
    if (!(await available())) throw new Error("billing_unavailable");
    try {
      const tx = await sdk.purchaseProduct({ productIdentifier: ANIMATION_PRODUCT_ID, productType: PURCHASE_TYPE.INAPP });
      return ownsAnimations([tx]);
    } catch (e) {
      if (String((e as Error)?.message ?? e).toLowerCase().includes("cancel")) return false;
      throw e;
    }
  }

  /** null: kontrol edilemedi; cihazdaki son bilinen durum korunmalı. */
  async function check(): Promise<boolean | null> {
    if (!(await available())) return null;
    try {
      const { purchases } = await sdk.getPurchases({ productType: PURCHASE_TYPE.INAPP });
      return ownsAnimations(purchases);
    } catch {
      return null;
    }
  }

  return { available, price, buy, check };
}

export const animations = createAnimationStore();
