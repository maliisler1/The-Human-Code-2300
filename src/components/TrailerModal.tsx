import { Captions, X } from "lucide-react";
import { useEffect, useState } from "react";
import { SUB_LANGS, SUB_NAMES, type SubLang } from "@/lib/i18n";
import { TRAILER_SUBS } from "@/lib/trailerSubs";

/** Tam ekran fragman oynatıcı (sesli). subsKey verilirse 20 dilde altyazı gösterir. */
export function TrailerModal({
  src,
  poster,
  title,
  subsKey,
  defaultLang = "tr",
  vertical,
  onEnded,
  onClose,
}: {
  src: string;
  poster?: string | undefined;
  title: string;
  subsKey?: string | undefined;
  defaultLang?: string;
  /** Dikey (9:16) video: ekranı dolduracak şekilde gösterilir. */
  vertical?: boolean | undefined;
  /** Video bitince çağrılır (ör. sonraki bölüme geç). Verilmezse pencere kapanır. */
  onEnded?: (() => void) | undefined;
  onClose: () => void;
}) {
  const subs = subsKey ? TRAILER_SUBS[subsKey] : undefined;
  const start = (SUB_LANGS as readonly string[]).includes(defaultLang) ? (defaultLang as SubLang) : "en";
  const [lang, setLang] = useState<SubLang | "off">(start);
  const [menu, setMenu] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);

  let line = "";
  if (subs && lang !== "off") {
    const i = subs.cues.findIndex(([a, b]) => time >= a && time <= b);
    if (i >= 0) line = (subs.text[lang] ?? subs.text["en"] ?? [])[i] ?? "";
  }

  return (
    <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/95 p-3" role="dialog" aria-label={title}>
      <button onClick={onClose} className="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] rounded-full glass p-2" aria-label="close">
        <X className="h-6 w-6" />
      </button>
      <p className="mb-3 text-center font-display text-lg text-gold">{title}</p>
      <div className={vertical ? "relative h-[78vh] max-w-full aspect-[9/16]" : "relative w-full max-w-3xl"}>
        <video
          key={src}
          src={src}
          poster={poster}
          controls
          autoPlay
          playsInline
          className={vertical ? "h-full w-full rounded-xl bg-black object-contain" : "aspect-video w-full rounded-xl bg-black"}
          onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
          onEnded={onEnded ?? onClose}
        />
        {line && (
          <p
            dir={lang === "ar" || lang === "ur" ? "rtl" : "ltr"}
            className="pointer-events-none absolute inset-x-4 bottom-14 text-center text-sm font-semibold leading-snug text-white [text-shadow:0_1px_3px_#000,0_0_8px_#000] sm:text-lg"
          >
            {line}
          </p>
        )}
      </div>
      {subs && (
        <div className="relative mt-3">
          <button onClick={() => setMenu((m) => !m)} className="flex items-center gap-2 rounded-full glass px-4 py-2 text-sm" aria-label="subtitles">
            <Captions className="h-4 w-4 text-gold" /> {lang === "off" ? "—" : SUB_NAMES[lang]}
          </button>
          {menu && (
            <div className="absolute bottom-12 left-1/2 max-h-72 w-52 -translate-x-1/2 overflow-y-auto rounded-xl border border-primary/30 bg-card p-1 shadow-xl">
              {(["off", ...SUB_LANGS] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    setLang(l);
                    setMenu(false);
                  }}
                  className={`block w-full rounded-lg px-3 py-1.5 text-start text-sm ${l === lang ? "bg-primary/20 text-gold" : "hover:bg-white/5"}`}
                >
                  {l === "off" ? "Off / Kapalı" : SUB_NAMES[l]}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
