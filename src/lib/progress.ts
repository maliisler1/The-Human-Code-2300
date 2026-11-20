import { useSyncExternalStore } from "react";

/**
 * İzleme ilerlemesi: her karakter için en son açılan bölüm. Yalnızca cihazda saklanır
 * ve ana ekrandaki "Kaldığın yerden devam et" rafını besler.
 */
const KEY = "amc.progress.v1";
export type Progress = Record<string, { n: number; at: number }>;

const listeners = new Set<() => void>();
let cache: Progress | null = null;

export function parseProgress(raw: string | null): Progress {
  if (!raw) return {};
  try {
    const json: unknown = JSON.parse(raw);
    if (!json || typeof json !== "object" || Array.isArray(json)) return {};
    const out: Progress = {};
    for (const [k, v] of Object.entries(json as Record<string, unknown>)) {
      const e = v as { n?: unknown; at?: unknown } | null;
      if (/^[a-z0-9-]{1,40}$/.test(k) && e && Number.isInteger(e.n) && (e.n as number) > 0 && typeof e.at === "number") out[k] = { n: e.n as number, at: e.at };
    }
    return out;
  } catch {
    return {};
  }
}

export function getProgress(): Progress {
  if (cache) return cache;
  try {
    cache = parseProgress(localStorage.getItem(KEY));
  } catch {
    cache = {};
  }
  return cache;
}

export function markWatched(key: string, n: number, now = Date.now()) {
  cache = { ...getProgress(), [key]: { n, at: now } };
  try {
    localStorage.setItem(KEY, JSON.stringify(cache));
  } catch {
    // Depolama kapalıysa ilerleme yalnızca bu oturumda tutulur.
  }
  listeners.forEach((fn) => fn());
}

/** En son izlenen en başta olacak şekilde karakter anahtarları. */
export const recentKeys = (p: Progress) => Object.keys(p).sort((a, b) => p[b]!.at - p[a]!.at);

const EMPTY: Progress = {};
export function useProgress(): Progress {
  return useSyncExternalStore(
    (fn) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    getProgress,
    () => EMPTY,
  );
}
