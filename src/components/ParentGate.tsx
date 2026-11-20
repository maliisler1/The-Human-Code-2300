import { useMemo, useState } from "react";
import { s } from "@/lib/phrases";

/**
 * Ebeveyn kontrolü: 13 yaş altı kullanıcıda satın alma ekranı açılmadan önce
 * bir yetişkinin çözebileceği basit bir çarpma sorusu sorar.
 */
export function ParentGate({ tr, onPass, onCancel }: { tr: boolean; onPass: () => void; onCancel: () => void }) {
  const [a, b] = useMemo(() => [12 + Math.floor(Math.random() * 8), 6 + Math.floor(Math.random() * 4)] as const, []);
  const [answer, setAnswer] = useState("");
  const [wrong, setWrong] = useState(false);
  const check = () => {
    if (Number(answer) === a * b) onPass();
    else setWrong(true);
  };
  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-background/90 p-6" role="dialog" aria-label={s("Ebeveyn kontrolü", "Parent check")}>
      <div className="w-full max-w-sm rounded-3xl border bg-card p-6 text-center">
        <h2 className="text-lg font-bold">{s("Bir yetişkine sor", "Ask a grown-up")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {s("Satın alma için bir yetişkinin bu soruyu cevaplaması gerekir.", "A grown-up needs to answer this question to make a purchase.")}
        </p>
        <p className="mt-4 font-display text-3xl font-bold text-gold">
          {a} × {b} = ?
        </p>
        <input
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value.replace(/\D/g, ""));
            setWrong(false);
          }}
          inputMode="numeric"
          aria-label={s("Cevap", "Answer")}
          className="mt-4 w-full rounded-2xl border bg-background px-4 py-3 text-center text-lg"
        />
        {wrong && <p className="mt-2 text-xs text-destructive">{s("Cevap doğru değil.", "That is not correct.")}</p>}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button onClick={onCancel} className="rounded-full border py-3 text-sm font-semibold">
            {s("Vazgeç", "Cancel")}
          </button>
          <button onClick={check} disabled={!answer} className="rounded-full bg-neon py-3 text-sm font-bold text-primary-foreground disabled:opacity-50">
            {s("Devam", "Continue")}
          </button>
        </div>
      </div>
    </div>
  );
}
