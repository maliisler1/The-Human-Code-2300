import { Crown } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { toast } from "sonner";
import { ParentGate } from "@/components/ParentGate";
import { isChild } from "@/lib/age";
import { animations, getAnimationAccess, setAnimationAccess, subscribeAnimationAccess, type SubscriptionOffer } from "@/lib/animations";

/** Cihazdaki animasyon erişimi (abonelik ve reklamla açılan bölümler). */
export function useAnimationAccess() {
  return useSyncExternalStore(subscribeAnimationAccess, getAnimationAccess, getAnimationAccess);
}

/** Mağazadaki abonelik teklifinin durumu: yükleniyor mu, teklif ne, yeniden deneme. */
export function useSubscriptionOfferState() {
  const [offer, setOffer] = useState<SubscriptionOffer | null>(null);
  const [loading, setLoading] = useState(true);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let live = true;
    setLoading(true);
    void animations.offer().then((o) => {
      if (!live) return;
      setOffer(o);
      setLoading(false);
    });
    return () => {
      live = false;
    };
  }, [attempt]);
  return { offer, loading, reload: () => setAttempt((n) => n + 1) };
}

/** Mağazadaki abonelik teklifi; ürün yoksa ya da Android değilse null. */
export function useSubscriptionOffer() {
  return useSubscriptionOfferState().offer;
}

/**
 * "Abone ol" düğmesi: fiyatı, yenilenme koşulunu ve varsa ücretsiz denemeyi açıkça yazar.
 * 13 yaş ve altında önce ebeveyn kontrolü ister. Teklif yoksa hiçbir şey göstermez.
 */
export function AnimationSubscribeButton({ tr, offer, onSubscribed }: { tr: boolean; offer: SubscriptionOffer | null; onSubscribed?: () => void }) {
  const [busy, setBusy] = useState(false);
  const [gate, setGate] = useState(false);
  if (!offer) return null;

  const subscribe = async () => {
    if (busy) return;
    setBusy(true);
    try {
      if (await animations.subscribe(offer)) {
        setAnimationAccess({ ...getAnimationAccess(), owned: true });
        toast.success(tr ? "Teşekkürler! Tüm animasyon bölümleri açıldı, reklamlar kapandı." : "Thank you! All animation episodes are unlocked and ads are off.");
        onSubscribed?.();
      }
    } catch {
      toast.error(tr ? "Abonelik başlatılamadı. Biraz sonra tekrar dene." : "The subscription could not be started. Try again shortly.");
    } finally {
      setBusy(false);
    }
  };

  const label = offer.trial
    ? tr ? `7 gün ücretsiz dene, sonra ${offer.price}/ay` : `Try 7 days free, then ${offer.price}/month`
    : tr ? `Abone ol · ${offer.price}/ay` : `Subscribe · ${offer.price}/month`;

  return (
    <>
      {gate && (
        <ParentGate
          tr={tr}
          onCancel={() => setGate(false)}
          onPass={() => {
            setGate(false);
            void subscribe();
          }}
        />
      )}
      <button
        onClick={() => (isChild() ? setGate(true) : void subscribe())}
        disabled={busy}
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-neon py-3.5 text-sm font-extrabold text-primary-foreground shadow-neon disabled:opacity-60"
      >
        <Crown className="h-4 w-4" /> {busy ? "…" : label}
      </button>
      <p className="mt-2 text-center text-[11px] leading-snug text-muted-foreground">
        {tr
          ? "Tüm animasyon bölümleri açılır, reklam gösterilmez. Abonelik her ay kendiliğinden yenilenir; Google Play'den istediğin zaman iptal edebilirsin."
          : "Unlocks every animation episode and removes ads. Renews automatically each month; cancel anytime in Google Play."}
      </p>
    </>
  );
}

/** Satın alma sayfasındaki abonelik kartı: durum, abone olma ve aboneliği yönetme. Her zaman görünür. */
export function AnimationSubscriptionCard({ tr }: { tr: boolean }) {
  const access = useAnimationAccess();
  const { offer, loading, reload } = useSubscriptionOfferState();
  return (
    <div className="mx-5 mt-6 rounded-3xl border-2 border-gold/60 bg-card p-5">
      <p className="flex items-center gap-2 text-sm font-bold">
        <Crown className="h-4 w-4 text-gold" /> {tr ? "Animasyon Aboneliği" : "Animation Subscription"}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        {tr ? "Snooze with Tik ve tüm animasyon dizileri: bütün bölümler açık, reklamsız." : "Snooze with Tik and every animated series: all episodes unlocked, no ads."}
      </p>
      {access.owned ? (
        <>
          <p className="mt-3 font-display text-2xl font-bold text-gold">{tr ? "Abonesin ✓" : "Subscribed ✓"}</p>
          <button onClick={() => void animations.manage().catch(() => {})} className="mt-3 w-full rounded-full border py-3 text-sm font-semibold">
            {tr ? "Aboneliği yönet ya da iptal et" : "Manage or cancel subscription"}
          </button>
        </>
      ) : offer ? (
        <AnimationSubscribeButton tr={tr} offer={offer} />
      ) : loading ? (
        <p className="mt-3 text-sm text-muted-foreground">{tr ? "Fiyat yükleniyor…" : "Loading price…"}</p>
      ) : (
        <>
          <p className="mt-3 text-sm text-muted-foreground">
            {tr
              ? "Abonelik bilgisi şu an Google Play'den alınamadı. İnternet bağlantını kontrol edip tekrar dene."
              : "The subscription could not be loaded from Google Play right now. Check your connection and try again."}
          </p>
          <button onClick={reload} className="mt-3 w-full rounded-full border py-3 text-sm font-semibold">
            {tr ? "Tekrar dene" : "Try again"}
          </button>
        </>
      )}
    </div>
  );
}
