import { X } from "lucide-react";
import { useEffect } from "react";

/** Tam ekran fragman oynatıcı (sesli). */
export function TrailerModal({ src, poster, title, onClose }: { src: string; poster?: string; title: string; onClose: () => void }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/95 p-3" role="dialog" aria-label={title}>
      <button onClick={onClose} className="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] rounded-full glass p-2" aria-label="close">
        <X className="h-6 w-6" />
      </button>
      <p className="mb-3 text-center font-display text-lg text-gold">{title}</p>
      <video src={src} poster={poster} controls autoPlay playsInline className="aspect-video w-full max-w-3xl rounded-xl bg-black" onEnded={onClose} />
    </div>
  );
}
