/**
 * Yakında gelecek karakterler: her biri Snooze with Tik ile aynı mantıkta,
 * konuşmasız 15 saniyelik bölümlerden oluşan ayrı bir dizi olacak.
 * Afiş ve fragman dosyaları uygulamayla birlikte gelir (public/karakterler).
 */
export type UpcomingCharacter = {
  key: string;
  name: string;
  hook: { tr: string; en: string };
  poster: string;
  video: string;
  /** Yayında olan bölüm sayısı. Tanımlıysa karakter öne alınır ve bölümleri izlenebilir. */
  episodes?: number;
};

/** Karakterin n. bölümünün dosyası (public/karakterler/<key>-ep<n>.mp4). */
export const characterEpisode = (ch: UpcomingCharacter, n: number) => `/karakterler/${ch.key}-ep${n}.mp4`;

const c = (key: string, name: string, tr: string, en: string, episodes?: number): UpcomingCharacter => ({
  key,
  name,
  hook: { tr, en },
  poster: `/karakterler/${key}.webp`,
  video: `/karakterler/${key}.mp4`,
  ...(episodes ? { episodes } : {}),
});

export const UPCOMING_CHARACTERS: UpcomingCharacter[] = [
  c("bip", "Bip", "Şarjı %1. Şarj aleti çok uzakta.", "Battery at 1%. The charger is far away.", 5),
  c("dusty", "Dusty", "Robot süpürge geliyor. Kaç Dusty.", "The robot vacuum is coming. Run, Dusty.", 5),
  c("pizzo", "Pizzo", "Son dilim. Sabaha kadar dayanmalı.", "The last slice. It must survive the night.", 5),
  c("zizi", "Zizi", "Gece üç. Tek bir ısırık yeter.", "3 AM. One bite is all it wants.", 5),
  c("sok", "Sok", "Tek kalmış bir çorap, eşini arıyor.", "A lonely sock looking for its pair.", 5),
  c("lumo", "Lumo", "Söylenmemiş sözleri taşıyan bekçi.", "The keeper who carries unsaid words."),
  c("wiff", "Wiff", "Son sinyal çubuğu. Dayan Wiff.", "The last signal bar. Hold on, Wiff."),
  c("pop", "Pop", "Bu sefer yanmayacak. Yine yandı.", "Not burnt this time. Burnt again."),
  c("drip", "Drip", "Düşmemeye çalışan bir damla.", "A drop trying not to fall."),
  c("remo", "Remo", "Koltuğun dibinde saklanan kumanda.", "The remote hiding deep in the sofa."),
  c("fizz", "Fizz", "Yukarı çıkmak isteyen bir baloncuk.", "A bubble racing to the top."),
  c("glim", "Glim", "Karanlığı uzak tutan gece lambası.", "The night light that keeps the dark away."),
  c("mel", "Mel", "Erimeden önce yenmek istiyor.", "It wants to be eaten before it melts."),
  c("kiko", "Kiko", "Her sabah kaybolan anahtar.", "The key that gets lost every morning."),
  c("nudl", "Nudl", "Çözülmek isterken düğüm olan kablo.", "The cable that tangles while untangling."),
  c("pix", "Pix", "Ekrandaki tek piksel. Fark edilsin.", "One pixel on the screen. Notice it."),
  c("boon", "Boon", "Patlamamaya çalışan bir balon.", "A balloon trying not to pop."),
  c("sprout", "Sprout", "Sulanmayı bekleyen küçük filiz.", "A little sprout waiting for water."),
  c("ding", "Ding", "Yanlış kata basan asansör düğmesi.", "The elevator button that picks the wrong floor."),
  c("mag", "Mag", "Notu düşürmemeye çalışan mıknatıs.", "The magnet trying not to drop the note."),
];

/** Öne alınan, bölümleri yayında olan karakterler. */
export const FEATURED_CHARACTERS = UPCOMING_CHARACTERS.filter((ch) => ch.episodes);
/** Henüz yalnızca fragmanı olan karakterler. */
export const SOON_CHARACTERS = UPCOMING_CHARACTERS.filter((ch) => !ch.episodes);
