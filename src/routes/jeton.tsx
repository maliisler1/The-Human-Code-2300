import { createFileRoute } from "@tanstack/react-router";
import { RotateCcw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AnimationSubscriptionCard } from "@/components/AnimationSubscribe";
import { AppShell, TokenBadge } from "@/components/AppShell";
import { getAnimationAccess, refreshSubscription } from "@/lib/animations";
import { useT } from "@/lib/i18n";
import { season } from "@/lib/season";
import { useAppState } from "@/lib/store";

// Adres /jeton olarak kaldı (eski bağlantılar bozulmasın); sayfa artık yalnızca Animasyon Aboneliği.
// The Human Code: 2300 sezon satın alması bu sayfadan kaldırıldı; daha önce satın alanların hakkı
// "Satın almalarımı geri yükle" ile korunur.
export const Route = createFileRoute("/jeton")({
  head: () => ({
    meta: [
      { title: "Abonelik — AI Multiverse Cinema" },
      { name: "description", content: "Tüm animasyon bölümleri açık ve reklamsız." },
      { property: "og:title", content: "Abonelik — AI Multiverse Cinema" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SubscriptionPage,
});

function SubscriptionPage() {
  const { update } = useAppState();
  const { lang } = useT();
  const tr = lang === "tr";
  const [busy, setBusy] = useState(false);

  // Sırayla sorulur: Google Play faturalandırması aynı anda gelen sorguları karıştırabiliyor.
  const restore = async () => {
    setBusy(true);
    try {
      await refreshSubscription();
      const owned = await season.check();
      if (owned !== null) update((s) => (s.seasonOwned === owned ? s : { ...s, seasonOwned: owned }));
      if (getAnimationAccess().owned || owned) toast.success(tr ? "Satın almaların geri yüklendi." : "Your purchases were restored.");
      else toast.info(tr ? "Bu hesapta etkin bir satın alma bulunamadı." : "No active purchase was found on this account.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AppShell>
      <header className="flex items-center justify-between px-5 pt-6">
        <h1 className="text-xl font-bold">{tr ? "Abonelik" : "Subscription"}</h1>
        <TokenBadge />
      </header>

      <AnimationSubscriptionCard tr={tr} />

      <div className="px-5 pt-6">
        <button
          onClick={() => void restore()}
          disabled={busy}
          className="mx-auto flex items-center gap-2 text-xs font-semibold text-muted-foreground disabled:opacity-60"
        >
          <RotateCcw className="h-3.5 w-3.5" /> {busy ? "…" : tr ? "Satın almalarımı geri yükle" : "Restore my purchases"}
        </button>
      </div>
    </AppShell>
  );
}
