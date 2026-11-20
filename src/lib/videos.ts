/**
 * Bundled video assets that ship with the app.
 * Maps a series slug + episode number to a video URL served from /public.
 * These are used as a fallback when Supabase storage doesn't have the video yet.
 */
export const BUNDLED_VIDEOS: Record<string, Record<number, string>> = {
  // Snooze with Tik: 15 saniyelik bölümler uygulamayla birlikte gelir (public/snooze).
  "snooze-with-tik": {
    1: "/snooze/ep1.mp4",
    2: "/snooze/ep2.mp4",
    3: "/snooze/ep3.mp4",
    4: "/snooze/ep4.mp4",
    5: "/snooze/ep5.mp4",
  },
  "the-human-code-2300": {
    1: "/sample.mp4",
    2: "/sample-2.mp4",
  },
  "neo-genesis-2099": {
    1: "/sample.mp4",
    2: "/sample-2.mp4",
  },
  "cyber-glitch-ro-buster": {
    1: "/sample-2.mp4",
    2: "/sample-3.mp4",
  },
  "neon-hearts-virtual-pulse": {
    1: "/sample-3.mp4",
    2: "/sample.mp4",
  },
};

/** Returns the bundled video URL for a series slug + episode number, if any. */
export function getBundledVideo(slug: string, n: number): string | null {
  return BUNDLED_VIDEOS[slug]?.[n] ?? null;
}
