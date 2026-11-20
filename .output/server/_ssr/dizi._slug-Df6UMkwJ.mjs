import { r as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { d as Link, f as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as Crown, F as ArrowLeft, T as Download, d as Play, g as Lock, i as Tv, k as CircleCheck, w as Film, x as Info, y as ListVideo } from "../_libs/lucide-react.mjs";
import { c as ads, d as useAppState, f as useT, i as LANG_NAMES, o as SUB_NAMES, s as TokenBadge, t as AppShell } from "./AppShell-Bq0qr1oZ.mjs";
import { i as elyra_poster_default } from "./data-9TLpVgmV.mjs";
import { n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { a as signedUrl, i as seriesTextOf, n as episodeTitle, o as trackStatus, r as seriesListQuery, t as episodeListQuery } from "./catalog-B587fq8g.mjs";
import { n as offline, r as useOffline, t as Route } from "./offline-4vVozybF.mjs";
import { n as SERIES_TRAILERS, r as TrailerModal, t as BUNDLED_POSTERS } from "./TrailerModal-DrMKxecI.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dizi._slug-Df6UMkwJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var thumbs = /* #__PURE__ */ Object.assign({
	"/src/assets/hc/e1.jpg": "/assets/e1-BWni0p5M.jpg",
	"/src/assets/hc/e10.jpg": "/assets/e10-BF1KhIG1.jpg",
	"/src/assets/hc/e11.jpg": "/assets/e11-CpWSbtbs.jpg",
	"/src/assets/hc/e12.jpg": "/assets/e12-DgRBmxf6.jpg",
	"/src/assets/hc/e13.jpg": "/assets/e13-5eYa-9Aq.jpg",
	"/src/assets/hc/e14.jpg": "/assets/e14-D-jxKpTq.jpg",
	"/src/assets/hc/e15.jpg": "/assets/e15-7Yn_rKmU.jpg",
	"/src/assets/hc/e16.jpg": "/assets/e16-mOTYc3wW.jpg",
	"/src/assets/hc/e17.jpg": "/assets/e17-CpEN6A3t.jpg",
	"/src/assets/hc/e18.jpg": "/assets/e18-D_bG7yre.jpg",
	"/src/assets/hc/e19.jpg": "/assets/e19-rQXCrGsP.jpg",
	"/src/assets/hc/e2.jpg": "/assets/e2-BWBDnoKF.jpg",
	"/src/assets/hc/e20.jpg": "/assets/e20-BPLGhd-0.jpg",
	"/src/assets/hc/e3.jpg": "/assets/e3-139bsV_P.jpg",
	"/src/assets/hc/e4.jpg": "/assets/e4-C5Auc3mz.jpg",
	"/src/assets/hc/e5.jpg": "/assets/e5-CQQJCHaY.jpg",
	"/src/assets/hc/e6.jpg": "/assets/e6-D9TfxCxU.jpg",
	"/src/assets/hc/e7.jpg": "/assets/e7-QDxc1b66.jpg",
	"/src/assets/hc/e8.jpg": "/assets/e8-DU6SSSKs.jpg",
	"/src/assets/hc/e9.jpg": "/assets/e9-yhD6rIos.jpg",
	"/src/assets/hc/elyra-poster.jpg": elyra_poster_default
});
var HC_THUMBS = {};
for (const [path, url] of Object.entries(thumbs)) {
	const m = /\/e(\d+)\.jpg$/.exec(path);
	if (m) HC_THUMBS[Number(m[1])] = url;
}
var HC_HOOKS_TR = {
	1: "Kapsül 23 açılıyor",
	2: "Elyra'dan gelen çağrı",
	3: "Kızıl gözler karanlıkta",
	4: "Bulutların üstündeki kale",
	5: "Hafızası çalınan savaşçı",
	6: "Bilgenin son sırrı",
	7: "Uyuyan umutlar",
	8: "Hain aramızda",
	9: "Kızıl savaşçı sahnede",
	10: "Kristal yaratıklar uyanıyor",
	11: "Kırmızı kod",
	12: "Kamp ateşinde itiraf",
	13: "Adalar düşüyor",
	14: "Kristal kalbin sahibi",
	15: "Aynı DNA, iki kader",
	16: "Kılıç doğru tarafı seçer",
	17: "Bütün kalpler uyanıyor",
	18: "Pusula'nın fedakârlığı",
	19: "Maske kırılıyor",
	20: "Sezon finali"
};
var HC_SLUGS = /* @__PURE__ */ new Set(["the-human-code-2300", "neo-genesis-2099"]);
function episodeThumb(slug, n) {
	return HC_SLUGS.has(slug) ? HC_THUMBS[n] : void 0;
}
function episodeHook(slug, n, lang) {
	return HC_SLUGS.has(slug) && lang === "tr" ? HC_HOOKS_TR[n] : void 0;
}
/** Bir dizinin afişi, açıklaması, dil durumu ve bölüm listesi. Ana sayfa ve dizi sayfası paylaşır. */
function SeriesView({ id, slug, home = false, children }) {
	const { data: all } = useSuspenseQuery(seriesListQuery);
	const { data: eps } = useSuspenseQuery(episodeListQuery(id, slug));
	const { state, unlockEpisode } = useAppState();
	const saved = useOffline();
	const [locked, setLocked] = (0, import_react.useState)(null);
	const [adBusy, setAdBusy] = (0, import_react.useState)(false);
	const [downloading, setDownloading] = (0, import_react.useState)(null);
	const [showTrailer, setShowTrailer] = (0, import_react.useState)(false);
	const { t, lang } = useT();
	const nav = useNavigate();
	const s = all.find((x) => x.id === id);
	const tx = seriesTextOf(s, lang);
	const poster = BUNDLED_POSTERS[s.slug];
	const trailer = SERIES_TRAILERS[s.slug];
	const st = (v) => t(v === "ready" ? "st_ready" : v === "planned" ? "st_planned" : "st_none");
	const audioSt = trackStatus(eps[0] ?? {
		tracks: [],
		titles: []
	}, "audio", state.audioLang);
	const subSt = trackStatus(eps[0] ?? {
		tracks: [],
		titles: []
	}, "subs", state.subLang);
	const first = eps[0];
	const anyReady = eps.some((e) => e.status === "ready" && e.video_url);
	const owned = state.seasonOwned;
	const hasAccess = (n, episodeId) => owned || n <= 2 || state.unlocked.includes(episodeId);
	const open = async (n, episodeId, ready) => {
		if (!ready) {
			toast.info(t("draft_ep_note"));
			return;
		}
		if (!hasAccess(n, episodeId)) {
			setLocked({
				n,
				id: episodeId
			});
			return;
		}
		nav({
			to: "/izle/$slug/$n",
			params: {
				slug: s.slug,
				n: String(n)
			}
		});
	};
	const unlockWithAd = async () => {
		if (!locked || adBusy) return;
		setAdBusy(true);
		const result = await ads.showRewarded();
		setAdBusy(false);
		if (result === "unavailable") {
			const err = await unlockEpisode(locked.id, 0);
			if (err) return void toast.error(err);
			toast.success(t("ad_gift", { n: locked.n }));
			const n = locked.n;
			setLocked(null);
			nav({
				to: "/izle/$slug/$n",
				params: {
					slug: s.slug,
					n: String(n)
				}
			});
			return;
		}
		if (result === "dismissed") return void toast.info(t("ad_not_done"));
		const err = await unlockEpisode(locked.id, 0);
		if (err) return void toast.error(err);
		toast.success(t("ad_unlocked", { n: locked.n }));
		const n = locked.n;
		setLocked(null);
		nav({
			to: "/izle/$slug/$n",
			params: {
				slug: s.slug,
				n: String(n)
			}
		});
	};
	const download = async (e) => {
		if (downloading) return;
		setDownloading(e.id);
		try {
			const url = await signedUrl("videos", e.video_url);
			if (!url) throw new Error("no video");
			const pick = (l) => e.tracks.find((x) => x.kind === "audio" && x.lang === l && x.status === "ready" && x.url);
			const dub = pick(state.audioLang) ?? pick("tr");
			const audioUrl = dub ? await signedUrl("videos", dub.url) : null;
			await offline.download(e.id, url, audioUrl && dub ? {
				url: audioUrl,
				lang: dub.lang
			} : void 0);
			toast.success(t("download_done", { n: e.n }));
		} catch {
			toast.error(t("download_err"));
		} finally {
			setDownloading(null);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [
				trailer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					src: trailer.video,
					poster: poster ?? trailer.poster,
					autoPlay: true,
					muted: true,
					loop: true,
					playsInline: true,
					preload: "auto",
					className: "aspect-[4/5] w-full object-cover"
				}) : poster ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: poster,
					alt: s.title,
					width: 768,
					height: 1152,
					className: "aspect-[4/5] w-full object-cover"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid aspect-[4/5] w-full place-items-center bg-gradient-to-br from-primary/30 via-card to-accent/20" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-fade" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-x-0 top-0 flex justify-between p-5",
					children: [home ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full glass px-3 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-gold",
						children: "AI Multiverse Cinema"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "rounded-full glass p-2",
						"aria-label": t("back"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5 rtl:rotate-180" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TokenBadge, {})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative -mt-20 px-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-neon px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary-foreground",
					children: t(`cat_${s.category}`)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 text-[2rem] leading-[1.05] text-epic",
					children: s.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-foreground/85",
					children: tx.description
				}),
				first && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => open(first.n, first.id, first.status === "ready" && !!first.video_url),
					className: "mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-neon py-3.5 text-sm font-extrabold text-primary-foreground shadow-neon",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-4 w-4 fill-current" }),
						" ",
						t("watch_ep1")
					]
				}),
				trailer && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setShowTrailer(true),
					className: "mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold/60 py-3 text-sm font-semibold text-gold",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Film, { className: "h-4 w-4" }),
						" ",
						t("trailer")
					]
				}),
				trailer && showTrailer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrailerModal, {
					src: trailer.video,
					poster: trailer.poster,
					title: s.title,
					onClose: () => setShowTrailer(false)
				}),
				first && eps.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => {
						try {
							localStorage.setItem("amc-autoplay", "true");
						} catch {}
						open(first.n, first.id, first.status === "ready" && !!first.video_url);
					},
					className: "mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-secondary py-3 text-sm font-semibold",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListVideo, { className: "h-4 w-4" }),
						" ",
						t("watch_season")
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-6 rounded-2xl bg-card p-4 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-bold",
							children: t("lang_box")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								t("audio"),
								": ",
								LANG_NAMES[state.audioLang]
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: st(audioSt)
							})]
						}),
						state.subLang !== "off" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								t("subtitles"),
								": ",
								SUB_NAMES[state.subLang]
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: st(subSt)
							})]
						}),
						!anyReady && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 flex gap-2 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-4 w-4 shrink-0" }), t("no_video")]
						}),
						anyReady && audioSt !== "ready" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs text-muted-foreground",
							children: t("dub_missing", { lang: LANG_NAMES[state.audioLang] })
						}),
						anyReady && subSt !== "ready" && state.subLang !== "off" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: t("sub_missing", { lang: SUB_NAMES[state.subLang] })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-7 text-sm font-bold",
					children: t("episodes")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: t("free_ep", { n: 2 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-5",
					children: eps.map((e) => {
						const ready = e.status === "ready" && !!e.video_url;
						const unlocked = hasAccess(e.n, e.id);
						const isSaved = !!saved[e.id];
						const title = episodeTitle(e, lang);
						const thumb = episodeThumb(s.slug, e.n);
						const hook = episodeHook(s.slug, e.n, lang);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => open(e.n, e.id, ready),
							className: "relative block aspect-video w-full overflow-hidden rounded-2xl border border-primary/35 bg-card text-start shadow-[0_14px_34px_rgba(0,0,0,0.55)]",
							children: [
								thumb ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: thumb,
									alt: "",
									width: 480,
									height: 270,
									loading: "lazy",
									className: "absolute inset-0 h-full w-full object-cover"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 bg-gradient-to-br from-secondary via-card to-accent/20" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/95" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute left-3 top-1 text-5xl text-epic",
									children: String(e.n).padStart(2, "0")
								}),
								ready && !unlocked && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-background/70 px-2.5 py-1 text-[11px] font-semibold text-gold",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-3.5 w-3.5" }),
										" ",
										t("watch_ad")
									]
								}),
								ready && unlocked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-neon text-primary-foreground shadow-neon",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-4 w-4 fill-current" })
								}),
								!ready && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/70 text-muted-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Film, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "absolute inset-x-4 bottom-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block font-display text-xl font-bold leading-tight text-[#FFF4D6] [text-shadow:0_2px_12px_rgba(0,0,0,0.8),0_0_20px_rgba(245,184,65,0.45)]",
										children: title || `${t("episode")} ${e.n}`
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "mt-0.5 block text-xs text-foreground/80",
										children: [
											hook ? `${hook} · ` : "",
											e.minutes,
											" ",
											t("min")
										]
									})]
								})
							]
						}), owned && ready && offline.supported() && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => isSaved ? void offline.remove(e.id) : void download(e),
							disabled: downloading !== null && downloading !== e.id,
							className: "mt-1 flex w-full items-center justify-end gap-1.5 px-4 text-xs font-semibold text-muted-foreground disabled:opacity-50",
							children: [isSaved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5 text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5" }), downloading === e.id ? t("downloading") : isSaved ? `${t("downloaded")} · ${t("remove_download")}` : t("download")]
						})] }, e.id);
					})
				}),
				!owned && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/jeton",
					className: "mt-5 flex items-center justify-center gap-2 rounded-2xl border border-dashed p-4 text-center text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "h-4 w-4 text-gold" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold text-primary",
							children: t("season_title")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted-foreground",
							children: [
								"· ",
								t("season_perk2"),
								", ",
								t("season_perk3").toLowerCase()
							]
						})
					]
				}),
				children
			]
		}),
		locked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-[60] grid place-items-end bg-background/70 p-4 backdrop-blur-sm",
			onClick: () => setLocked(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto w-full max-w-md rounded-3xl border bg-card p-6",
				onClick: (ev) => ev.stopPropagation(),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-6 w-6 text-gold" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 text-lg font-bold",
						children: t("locked_title")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: [
							t("episode"),
							" ",
							locked.n
						]
					}),
					ads.canReward() && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => void unlockWithAd(),
						disabled: adBusy,
						className: "mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-secondary py-3 text-sm font-semibold disabled:opacity-60",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tv, { className: "h-4 w-4" }),
							" ",
							adBusy ? "…" : t("watch_ad")
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/jeton",
						className: "mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-neon py-3.5 text-sm font-extrabold text-primary-foreground shadow-neon",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "h-4 w-4" }),
							" ",
							t("season_title")
						]
					})
				]
			})
		})
	] });
}
function Detail() {
	const { id, slug } = Route.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeriesView, {
		id,
		slug
	});
}
//#endregion
export { Detail as component };
