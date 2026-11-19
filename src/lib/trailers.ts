/** Fragmanlar: video dosyaları web sitesinde (holo-heart-streams.lovable.app/trailers) barındırılır. */
const BASE = "https://holo-heart-streams.lovable.app/trailers/";

/** Yayındaki dizilerin fragmanları (slug → video). */
export const SERIES_TRAILERS: Record<string, { video: string; poster: string }> = {
  "the-human-code-2300": { video: BASE + "thc2300_720.mp4", poster: BASE + "thc2300_poster.jpg" },
};

export type Upcoming = {
  key: string;
  title: string;
  month: Date;
  hook: { tr: string; en: string };
  bg: string;
  /** İngilizce ad (yeni diziler İngilizce çekiliyor). */
  titleEn: string;
  /** Fragman hazır olunca dosya adı eklenir. */
  video?: string;
  poster?: string;
};

/** Aralık 2026 – Aralık 2027: her ay yeni bir gizemli dizi. */
export const UPCOMING: Upcoming[] = [
  { key: "ruya-arsivi", titleEn: "The Dream Archive", video: "ruya-arsivi_720.mp4", poster: "ruya-arsivi_poster.jpg", title: "Rüya Arşivi", month: new Date(2026, 11, 1), bg: "from-indigo-950 via-violet-900 to-fuchsia-900",
    hook: { tr: "Rüyaların saklandığı arşivden bir rüya kaçtı.", en: "A dream escaped from the archive where dreams are kept." } },
  { key: "gezegen-hatasi", titleEn: "Planet Glitch", video: "gezegen-hatasi_720.mp4", poster: "gezegen-hatasi_poster.jpg", title: "Gezegen Hatası", month: new Date(2027, 0, 1), bg: "from-emerald-950 via-teal-900 to-cyan-900",
    hook: { tr: "Gökyüzünde bir çatlak açıldı. Gezegen kendini yeniden başlatıyor.", en: "A crack opened in the sky. The planet is rebooting." } },
  { key: "son-kutuphaneci", titleEn: "The Last Librarian", video: "son-kutuphaneci_720.mp4", poster: "son-kutuphaneci_poster.jpg", title: "Son Kütüphaneci", month: new Date(2027, 1, 1), bg: "from-amber-950 via-orange-900 to-stone-900",
    hook: { tr: "Kelimelerin yasaklandığı dünyada son kitabı koruyan kız.", en: "In a world where words are banned, one girl guards the last book." } },
  { key: "sessiz-sehir", titleEn: "Silent City", video: "sessiz-sehir_720.mp4", poster: "sessiz-sehir_poster.jpg", title: "Sessiz Şehir", month: new Date(2027, 2, 1), bg: "from-slate-950 via-slate-800 to-sky-950",
    hook: { tr: "Gece yarısı bütün sesler kayboldu. Geriye tek bir fısıltı kaldı.", en: "At midnight every sound vanished. Only one whisper remained." } },
  { key: "saatcinin-kizi", titleEn: "The Clockmaker\'s Daughter", video: "saatcinin-kizi_720.mp4", poster: "saatcinin-kizi_poster.jpg", title: "Saatçinin Kızı", month: new Date(2027, 3, 1), bg: "from-yellow-950 via-amber-800 to-rose-950",
    hook: { tr: "Zamanı tam 7 saniye durdurabilen bir kız.", en: "A girl who can stop time for exactly 7 seconds." } },
  { key: "derin-mavi", titleEn: "Deep Blue", video: "derin-mavi_720.mp4", poster: "derin-mavi_poster.jpg", title: "Derin Mavi", month: new Date(2027, 4, 1), bg: "from-blue-950 via-cyan-900 to-indigo-950",
    hook: { tr: "Okyanusun dibinden yalnız bir şarkı yükseliyor.", en: "A lonely song rises from the bottom of the ocean." } },
  { key: "aynalar-koyu", titleEn: "Village of Mirrors", video: "aynalar-koyu_720.mp4", poster: "aynalar-koyu_poster.jpg", title: "Aynalar Köyü", month: new Date(2027, 5, 1), bg: "from-zinc-900 via-purple-900 to-zinc-950",
    hook: { tr: "Bu köyde yansımalar yalan söyler. Bir gece biri aynadan çıktı.", en: "In this village reflections lie. One night, someone stepped out." } },
  { key: "kayip-tren", titleEn: "The Lost Train", video: "kayip-tren_720.mp4", poster: "kayip-tren_poster.jpg", title: "Kayıp Tren", month: new Date(2027, 6, 1), bg: "from-red-950 via-stone-800 to-amber-950",
    hook: { tr: "100 yıl önce kaybolan tren bu gece istasyona döndü.", en: "The train lost 100 years ago returned tonight." } },
  { key: "yildiz-haritasi", titleEn: "The Star Map", video: "yildiz-haritasi_720.mp4", poster: "yildiz-haritasi_poster.jpg", title: "Yıldız Haritası", month: new Date(2027, 7, 1), bg: "from-violet-950 via-indigo-900 to-blue-950",
    hook: { tr: "Kolundaki yıldızlar her gece yer değiştiriyor.", en: "The stars on her arm move every night." } },
  { key: "hafiza-pazari", titleEn: "The Memory Bazaar", video: "hafiza-pazari_720.mp4", poster: "hafiza-pazari_poster.jpg", title: "Hafıza Pazarı", month: new Date(2027, 8, 1), bg: "from-orange-950 via-rose-900 to-amber-900",
    hook: { tr: "Anıların satıldığı pazarda biri senin anını satıyor.", en: "At the market of memories, someone is selling yours." } },
  { key: "fener-bekcisi", titleEn: "The Lighthouse Keeper", video: "fener-bekcisi_720.mp4", poster: "fener-bekcisi_poster.jpg", title: "Fener Bekçisi", month: new Date(2027, 9, 1), bg: "from-sky-950 via-slate-800 to-teal-950",
    hook: { tr: "Yaşlı bekçi her gece başka bir yüzyıldan gemiler görüyor.", en: "Each night the old keeper sees ships from another century." } },
  { key: "kum-saati-adasi", titleEn: "Hourglass Island", video: "kum-saati-adasi_720.mp4", poster: "kum-saati-adasi_poster.jpg", title: "Kum Saati Adası", month: new Date(2027, 10, 1), bg: "from-amber-900 via-orange-800 to-cyan-950",
    hook: { tr: "Zamanın geriye aktığı ada. Orada kimse büyümüyor.", en: "An island where time flows backwards. No one grows up there." } },
  { key: "the-human-code-2099", titleEn: "The Human Code: 2099", video: "the-human-code-2099_720.mp4", poster: "the-human-code-2099_poster.jpg", title: "The Human Code: 2099", month: new Date(2027, 11, 1), bg: "from-fuchsia-950 via-violet-900 to-amber-900",
    hook: { tr: "Her şeyin başladığı yıl: Doktor Ekin'in hikâyesi.", en: "The year it all began: Doctor Ekin's story." } },
];

export const trailerUrl = (file: string) => BASE + file;
