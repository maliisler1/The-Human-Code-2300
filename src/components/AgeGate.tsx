import { useState, useSyncExternalStore } from "react";
import { ads } from "@/lib/ads";
import { ageGroupFromYear, getAgeGroup, setAgeGroup, subscribeAgeGroup } from "@/lib/age";
import { s } from "@/lib/phrases";

/**
 * Tarafsız yaş ekranı: ilk açılışta doğum yılını sorar. Hangi cevabın ne anlama
 * geldiğini belli etmez. Sonuca göre reklamlar çocuklara uygun hale getirilir.
 */
export function AgeGate({ tr }: { tr: boolean }) {
  const group = useSyncExternalStore(subscribeAgeGroup, getAgeGroup, () => "adult" as const);
  const [year, setYear] = useState("");
  if (group !== "unknown") return null;

  const now = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => now - i);
  const confirm = () => {
    const next = ageGroupFromYear(Number(year), now);
    if (next === "unknown") return;
    setAgeGroup(next);
    void ads.start();
  };

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-background/95 p-6" role="dialog" aria-label={s("Doğum yılı", "Year of birth")}>
      <div className="w-full max-w-sm rounded-3xl border bg-card p-6 text-center">
        <h2 className="font-display text-2xl font-bold text-gold">{s("Hoş geldin!", "Welcome!")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{s("Başlamadan önce doğum yılını seç.", "Before you start, choose your year of birth.")}</p>
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          aria-label={s("Doğum yılı", "Year of birth")}
          className="mt-5 w-full rounded-2xl border bg-background px-4 py-3 text-center text-lg"
        >
          <option value="">{s("Yıl seç", "Select year")}</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <button
          onClick={confirm}
          disabled={!year}
          className="mt-4 w-full rounded-full bg-neon py-3.5 text-sm font-bold text-primary-foreground shadow-neon disabled:opacity-50"
        >
          {s("Devam", "Continue")}
        </button>
      </div>
    </div>
  );
}
