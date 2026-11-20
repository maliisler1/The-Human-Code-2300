import { supabase } from "@/integrations/supabase/client";

/**
 * Animasyon videoları uygulamanın içinde değil, "animations" deposunda durur.
 * Depo özeldir; uygulama dosyalar için süreli (imzalı) bağlantı alır.
 * Yeni bölüm eklemek için depoya dosya yüklemek ve katalog.json'ı güncellemek yeterlidir;
 * uygulamanın yeni sürümünü yayınlamak gerekmez.
 */
export const MEDIA_BUCKET = "animations";

/** İmzalı bağlantıların geçerlilik süresi: 7 gün. */
const TTL_SECONDS = 7 * 24 * 60 * 60;

/** Dosya yolları için süreli bağlantılar. Depoda olmayan dosyalar sonuçta yer almaz. */
export async function signMedia(paths: string[]): Promise<Record<string, string>> {
  if (paths.length === 0) return {};
  const { data, error } = await supabase.storage.from(MEDIA_BUCKET).createSignedUrls(paths, TTL_SECONDS);
  if (error) throw error;
  const out: Record<string, string> = {};
  for (const row of data ?? []) if (row.path && row.signedUrl && !row.error) out[row.path] = row.signedUrl;
  return out;
}

/** Depodaki katalog.json; yoksa ya da okunamazsa null. */
export async function downloadCatalog(): Promise<unknown | null> {
  const { data, error } = await supabase.storage.from(MEDIA_BUCKET).download("katalog.json");
  if (error || !data) return null;
  try {
    return JSON.parse(await data.text());
  } catch {
    return null;
  }
}

/** Snooze with Tik bölümlerinin depodaki yolları: snooze/ep<n>.mp4 */
export const snoozeEpisodePath = (n: number) => `snooze/ep${n}.mp4`;
