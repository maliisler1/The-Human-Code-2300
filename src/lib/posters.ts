import neo from "@/assets/neo-genesis.jpg";
import cyber from "@/assets/cyber-glitch.jpg";
import hearts from "@/assets/neon-hearts.jpg";

/** Hazır afişi olan diziler; diğerleri yönetici afiş yükleyene dek desenli alan gösterir. */
export const BUNDLED_POSTERS: Record<string, string> = {
  "the-human-code-2300": neo,
  "neo-genesis-2099": neo, // eski adres (yönlendirme)
  "cyber-glitch-ro-buster": cyber,
  "neon-hearts-virtual-pulse": hearts,
};
