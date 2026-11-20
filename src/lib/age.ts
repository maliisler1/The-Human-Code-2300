/**
 * Tarafsız yaş ekranının sonucu. Doğum yılı saklanmaz; yalnızca kullanıcının
 * 13 yaşından küçük olup olmadığı cihazda tutulur.
 */
export type AgeGroup = "unknown" | "child" | "adult";

export const CHILD_AGE_LIMIT = 13;
const KEY = "amc.age.v1";
let cached: AgeGroup | undefined;
const listeners = new Set<() => void>();

/** Doğum yılına göre grup. Yıl içinde doğum günü bilinmediği için sınırda çocuk sayılır. */
export function ageGroupFromYear(birthYear: number, currentYear = new Date().getFullYear()): AgeGroup {
  if (!Number.isInteger(birthYear) || birthYear > currentYear || birthYear < currentYear - 120) return "unknown";
  return currentYear - birthYear <= CHILD_AGE_LIMIT ? "child" : "adult";
}

export function getAgeGroup(): AgeGroup {
  if (cached) return cached;
  try {
    const raw = localStorage.getItem(KEY);
    cached = raw === "child" || raw === "adult" ? raw : "unknown";
  } catch {
    cached = "unknown";
  }
  return cached;
}

export function setAgeGroup(group: AgeGroup) {
  cached = group;
  try {
    if (group === "unknown") localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, group);
  } catch {
    // Depolama kapalıysa seçim yalnızca bu oturumda geçerli kalır.
  }
  listeners.forEach((fn) => fn());
}

export function subscribeAgeGroup(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export const isChild = () => getAgeGroup() === "child";
