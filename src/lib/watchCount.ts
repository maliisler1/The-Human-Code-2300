import { supabase } from "@/integrations/supabase/client";

/**
 * İzlenme sayacı: bir bölüm açıldığında sunucudaki sayıyı bir artırır.
 * Kişisel bilgi gönderilmez; yalnızca karakter anahtarı ve bölüm numarası.
 * n = 0 fragman demektir. Hata olursa sessizce geçilir, izlemeyi asla engellemez.
 */
export function validWatch(key: string, n: number): boolean {
  return /^[a-z0-9-]{1,40}$/.test(key) && Number.isInteger(n) && n >= 0 && n <= 200;
}

export function countWatch(key: string, n: number): void {
  if (!validWatch(key, n)) return;
  try {
    void Promise.resolve(
      supabase.rpc("count_watch" as never, { p_key: key, p_n: n } as never),
    ).catch(() => undefined);
  } catch {
    // sayaç çalışmazsa izleme devam eder
  }
}
