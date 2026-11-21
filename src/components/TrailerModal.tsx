import { Captions, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SUB_LANGS, SUB_NAMES, type SubLang } from "@/lib/i18n";
import { TRAILER_SUBS } from "@/lib/trailerSubs";
import type { SubTrack } from "@/lib/characters";

/** Tam ekran fragman oynatıcı (sesli). subsKey ya da subs verilirse 20 dilde altyazı gösterir. */
export function TrailerModal({
  src,
  poster,
  title,
  subsKey,
  subs: subsTrack,
  defaultLang = "tr",
  vertical,
  onEnded,
  onClose,
}: {
  src: string;
  poster?: string | undefined;
  title: string;
  subsKey?: string | undefined;
  /** Konuşmalı karakter bölümlerinin altyazısı (katalogdan gelir). */
  subs?: SubTrack | undefined;
  defaultLang?: string;
  /** Dikey (9:16) video: ekranı dolduracak şekilde gösterilir. */
  vertical?: boolean | undefined;
  /** Video bitince çağrılır (ör. sonraki bölüme geç). Verilmezse pencere kapanır. */
  onEnded?: (() => void) | undefined;
  onClose: () => void;
}) {
  const subs = subsTrack ?? (subsKey ? TRAILER_SUBS[subsKey] : undefined);
  const start = (SUB_LANGS as readonly string[]).includes(defaultLang) ? (defaultLang as SubLang) : "en";
  const [lang, setLang] = useState<SubLang | "off">(start);
  const [menu, setMenu] = useState(false);
  const [time, setTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const firstSrc = useRef(src);

  // Sıradaki bölüme geçerken aynı video öğesi kullanılır: tam ekran ve ses ayarı bozulmaz.
  useEffect(() => {
    if (firstSrc.current === src) return;
    firstSrc.current = src;
    const v = videoRef.current;
    if (!v) return;
    setTime(0);
    v.load();
    void v.play().catch(() => undefined);
  }, [src]);

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
    <div className={`fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black ${vertical ? "p-0" : "bg-black/95 p-3"}`} role="dialog" aria-label={title}>
      <button onClick={onClose} className="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] z-10 rounded-full glass p-2" aria-label="close">
        <X className="h-6 w-6" />
      </button>
      <p className={vertical ? "pointer-events-none absolute inset-x-14 top-[max(1.25rem,env(safe-area-inset-top))] z-10 truncate text-center font-display text-base text-gold [text-shadow:0_1px_4px_#000]" : "mb-3 text-center font-display text-lg text-gold"}>{title}</p>
      <div className={vertical ? "relative h-[100dvh] w-full shrink-0" : "relative w-full max-w-3xl"}>
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          controls
          autoPlay
          playsInline
          // Dikey bölümler zaten tüm ekranı kaplar. Telefonun kendi tam ekranı bölüm değişirken kapanıp
          // videoyu küçülttüğü için o düğme gizlenir; böylece bölümler arasında boyut hiç değişmez.
          {...(vertical ? { controlsList: "nofullscreen noremoteplayback", disablePictureInPicture: true } : {})}
          className={vertical ? "h-full w-full bg-black object-contain" : "aspect-video w-full rounded-xl bg-black"}
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
        <div className={vertical ? "absolute left-4 top-[max(1rem,env(safe-area-inset-top))] z-10" : "relative mt-3"}>
          <button onClick={() => setMenu((m) => !m)} className={`flex items-center gap-1.5 rounded-full glass text-sm ${vertical ? "p-2" : "px-4 py-2"}`} aria-label="subtitles">
            <Captions className={vertical ? "h-6 w-6 text-gold" : "h-4 w-4 text-gold"} /> {vertical ? null : lang === "off" ? "—" : SUB_NAMES[lang]}
          </button>
          {menu && (
            <div className={`absolute max-h-72 w-52 overflow-y-auto rounded-xl border border-primary/30 bg-card p-1 shadow-xl ${vertical ? "left-0 top-12" : "bottom-12 left-1/2 -translate-x-1/2"}`}>
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
