import { r as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { l as Capacitor } from "../_libs/@capacitor-community/admob+[...].mjs";
import { d as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as Crown, P as CalendarDays, d as Play, f as Orbit, g as Lock, i as Tv, o as Sparkles, t as Zap, w as Film } from "../_libs/lucide-react.mjs";
import { n as PURCHASE_TYPE, t as NativePurchases } from "../_libs/capgo__native-purchases.mjs";
import { c as ads, d as useAppState, f as useT, l as isChild, t as AppShell } from "./AppShell-Bq0qr1oZ.mjs";
import { n as SOLO_SLUG, t as FEATURED_SLUG } from "./data-9TLpVgmV.mjs";
import { n as useSuspenseQuery, r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { i as seriesTextOf, n as episodeTitle, r as seriesListQuery, t as episodeListQuery } from "./catalog-B587fq8g.mjs";
import { a as trailerUrl, i as UPCOMING, n as SERIES_TRAILERS, r as TrailerModal, t as BUNDLED_POSTERS } from "./TrailerModal-DrMKxecI.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as ParentGate } from "./ParentGate-Tlgf8oSd.mjs";
import { t as pickFeatured } from "./routes-SEeWJnDt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DBTpj6Jk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Karakterin n. bölümünün dosyası (public/karakterler/<key>-ep<n>.mp4). */
var characterEpisode = (ch, n) => `/karakterler/${ch.key}-ep${n}.mp4`;
var c = (key, name, tr, en, episodes) => ({
	key,
	name,
	hook: {
		tr,
		en
	},
	poster: `/karakterler/${key}.webp`,
	video: `/karakterler/${key}.mp4`,
	...episodes ? { episodes } : {}
});
var UPCOMING_CHARACTERS = [
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
	c("mag", "Mag", "Notu düşürmemeye çalışan mıknatıs.", "The magnet trying not to drop the note.")
];
/** Öne alınan, bölümleri yayında olan karakterler. */
var FEATURED_CHARACTERS = UPCOMING_CHARACTERS.filter((ch) => ch.episodes);
/** Henüz yalnızca fragmanı olan karakterler. */
var SOON_CHARACTERS = UPCOMING_CHARACTERS.filter((ch) => !ch.episodes);
/**
* Google Play'de tek seferlik (inapp) ürün. Play Console > Para kazanma >
* Uygulama içi ürünler altında bu kimlikle açılmalı; fiyat orada belirlenir.
*/
var ANIMATION_PRODUCT_ID = "animasyon_paketi";
var KEY = "amc.animations.v1";
function loadAnimationAccess() {
	try {
		const raw = JSON.parse(localStorage.getItem(KEY) ?? "{}");
		return {
			unlocked: Array.isArray(raw.unlocked) ? raw.unlocked : [],
			owned: raw.owned === true
		};
	} catch {
		return {
			unlocked: [],
			owned: false
		};
	}
}
function saveAnimationAccess(next) {
	try {
		localStorage.setItem(KEY, JSON.stringify(next));
	} catch {}
}
/** Bölüm kimliği, ör. "bip-3". */
var characterEpisodeId = (key, n) => `${key}-${n}`;
function hasCharacterAccess(key, n, access, seasonOwned = false) {
	return n <= 2 || seasonOwned || access.owned || access.unlocked.includes(characterEpisodeId(key, n));
}
function ownsAnimations(purchases) {
	return purchases.some((p) => p.productIdentifier === "animasyon_paketi" && (p.purchaseState === void 0 || p.purchaseState === "1"));
}
function createAnimationStore(sdk = NativePurchases, native = () => Capacitor.getPlatform() === "android") {
	async function available() {
		if (!native()) return false;
		try {
			return (await sdk.isBillingSupported()).isBillingSupported;
		} catch {
			return false;
		}
	}
	/** Mağazadaki yerel fiyat; ürün Play Console'da henüz yoksa null. */
	async function price() {
		if (!await available()) return null;
		try {
			const { products } = await sdk.getProducts({
				productIdentifiers: [ANIMATION_PRODUCT_ID],
				productType: PURCHASE_TYPE.INAPP
			});
			return products[0]?.priceString ?? null;
		} catch {
			return null;
		}
	}
	/** true: paket artık açık. Kullanıcı vazgeçerse false. */
	async function buy() {
		if (!await available()) throw new Error("billing_unavailable");
		try {
			return ownsAnimations([await sdk.purchaseProduct({
				productIdentifier: ANIMATION_PRODUCT_ID,
				productType: PURCHASE_TYPE.INAPP
			})]);
		} catch (e) {
			if (String(e?.message ?? e).toLowerCase().includes("cancel")) return false;
			throw e;
		}
	}
	/** null: kontrol edilemedi; cihazdaki son bilinen durum korunmalı. */
	async function check() {
		if (!await available()) return null;
		try {
			const { purchases } = await sdk.getPurchases({ productType: PURCHASE_TYPE.INAPP });
			return ownsAnimations(purchases);
		} catch {
			return null;
		}
	}
	return {
		available,
		price,
		buy,
		check
	};
}
var animations = createAnimationStore();
/**
* Öne alınan karakterler: bölümleri yayında olan yeni diziler.
* Karta dokununca 1. bölüm, altındaki numaralara dokununca o bölüm oynar.
* Bölüm bitince sıradaki bölüm otomatik açılır.
* İlk 2 bölüm ücretsiz; sonrakiler reklam izleyerek ya da satın alarak açılır.
*/
function FeaturedCharacters({ tr, onPlay }) {
	const { state } = useAppState();
	const [access, setAccess] = (0, import_react.useState)(loadAnimationAccess);
	const [locked, setLocked] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [price, setPrice] = (0, import_react.useState)(null);
	const [parentGate, setParentGate] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		animations.price().then(setPrice);
		animations.check().then((owned) => {
			if (owned === null) return;
			setAccess((a) => {
				if (a.owned === owned) return a;
				const next = {
					...a,
					owned
				};
				saveAnimationAccess(next);
				return next;
			});
		});
	}, []);
	if (FEATURED_CHARACTERS.length === 0) return null;
	const allowed = (ch, n, a = access) => hasCharacterAccess(ch.key, n, a, state.seasonOwned);
	const play = (ch, n, a = access) => {
		if (!allowed(ch, n, a)) {
			onPlay(null);
			setLocked({
				ch,
				n
			});
			return;
		}
		onPlay({
			src: characterEpisode(ch, n),
			title: `${ch.name} · ${n}`,
			poster: ch.poster,
			vertical: true,
			next: n < (ch.episodes ?? 0) ? () => play(ch, n + 1, a) : void 0
		});
	};
	const openAfter = (next) => {
		saveAnimationAccess(next);
		setAccess(next);
		if (!locked) return;
		const { ch, n } = locked;
		setLocked(null);
		play(ch, n, next);
	};
	const unlockWithAd = async () => {
		if (!locked || busy) return;
		setBusy(true);
		const result = await ads.showRewarded();
		setBusy(false);
		if (result === "dismissed") {
			toast.info(tr ? "Bölümü açmak için reklamı sonuna kadar izlemelisin." : "Watch the ad to the end to unlock the episode.");
			return;
		}
		toast.success(result === "unavailable" ? tr ? `Şu an reklam yok. ${locked.n}. bölüm sana hediye!` : `No ad right now. Episode ${locked.n} is on us!` : tr ? `${locked.n}. bölüm açıldı!` : `Episode ${locked.n} unlocked!`);
		openAfter({
			...access,
			unlocked: [...access.unlocked, characterEpisodeId(locked.ch.key, locked.n)]
		});
	};
	const buy = async () => {
		if (busy) return;
		setBusy(true);
		try {
			if (await animations.buy()) {
				toast.success(tr ? "Teşekkürler! Tüm animasyon bölümleri açıldı." : "Thank you! All animation episodes are unlocked.");
				openAfter({
					...access,
					owned: true
				});
			}
		} catch {
			toast.error(tr ? "Satın alma tamamlanamadı. Biraz sonra tekrar dene." : "The purchase could not be completed. Try again shortly.");
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "flex items-center gap-2 px-5 font-display text-xl font-bold text-gold",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-5 w-5 fill-gold" }),
					" ",
					tr ? `Erken izle: ${FEATURED_CHARACTERS.length} yeni dizi` : `Early access: ${FEATURED_CHARACTERS.length} new series`
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 px-5 text-xs text-muted-foreground",
				children: tr ? `Her dizinin ilk 2 bölümü ücretsiz. Her bölüm 15 saniye.` : `The first 2 episodes of each series are free. 15 seconds each.`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex snap-x gap-3 overflow-x-auto px-5 pb-2",
				children: FEATURED_CHARACTERS.map((ch) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-44 shrink-0 snap-start overflow-hidden rounded-2xl border border-gold/40 bg-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => play(ch, 1),
						className: "relative block aspect-[9/16] w-full overflow-hidden bg-gradient-to-br from-primary/30 via-card to-accent/20 text-start",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: ch.poster,
								alt: "",
								loading: "lazy",
								className: "absolute inset-0 h-full w-full object-cover"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute left-2.5 top-2.5 rounded-full bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-black",
								children: tr ? "Yeni" : "New"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute inset-0 m-auto grid h-12 w-12 place-items-center rounded-full bg-black/50 ring-2 ring-gold/70",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "ml-0.5 h-5 w-5 fill-gold text-gold" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "absolute inset-x-2.5 bottom-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block font-display text-xl font-bold leading-tight text-[#FFF4D6] [text-shadow:0_2px_8px_#000]",
									children: ch.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-0.5 line-clamp-2 block text-[11px] leading-snug text-foreground/85",
									children: tr ? ch.hook.tr : ch.hook.en
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center justify-between gap-1 border-t border-primary/20 px-2 py-2",
						children: Array.from({ length: ch.episodes ?? 0 }, (_, i) => i + 1).map((n) => {
							const open = allowed(ch, n);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => play(ch, n),
								"aria-label": tr ? `${ch.name} ${n}. bölüm${open ? "" : " (kilitli)"}` : `${ch.name} episode ${n}${open ? "" : " (locked)"}`,
								className: `grid h-7 w-7 place-items-center rounded-full border text-xs font-bold ${open ? "border-gold/50 text-gold" : "border-white/20 text-muted-foreground"}`,
								children: open ? n : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-3 w-3" })
							}, n);
						})
					})]
				}, ch.key))
			}),
			parentGate && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParentGate, {
				tr,
				onCancel: () => setParentGate(false),
				onPass: () => {
					setParentGate(false);
					buy();
				}
			}),
			locked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-[60] grid place-items-end bg-background/70 p-4 backdrop-blur-sm",
				onClick: () => setLocked(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto w-full max-w-md rounded-3xl border bg-card p-6",
					onClick: (ev) => ev.stopPropagation(),
					role: "dialog",
					"aria-label": tr ? "Kilitli bölüm" : "Locked episode",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-6 w-6 text-gold" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 text-lg font-bold",
							children: tr ? "Bu bölüm kilitli" : "This episode is locked"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: [
								locked.ch.name,
								" · ",
								tr ? `${locked.n}. bölüm` : `Episode ${locked.n}`
							]
						}),
						ads.canReward() && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => void unlockWithAd(),
							disabled: busy,
							className: "mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-secondary py-3 text-sm font-semibold disabled:opacity-60",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tv, { className: "h-4 w-4" }),
								" ",
								busy ? "…" : tr ? "Reklam izle, bu bölümü aç" : "Watch an ad to unlock this episode"
							]
						}),
						price ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => isChild() ? setParentGate(true) : void buy(),
							disabled: busy,
							className: "mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-neon py-3.5 text-sm font-extrabold text-primary-foreground shadow-neon disabled:opacity-60",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "h-4 w-4" }),
								" ",
								tr ? `Tüm animasyonları aç · ${price}` : `Unlock all animations · ${price}`
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/jeton",
							className: "mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-neon py-3.5 text-sm font-extrabold text-primary-foreground shadow-neon",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "h-4 w-4" }),
								" ",
								tr ? "Satın al, hepsini aç" : "Buy and unlock everything"
							]
						})
					]
				})
			})
		]
	});
}
/**
* Tek dizi modunun dizisi. Bölümleri ve afişi uygulamayla birlikte geldiği için
* veritabanında kaydı olması yeterlidir; taslak olsa da ana ekranı o alır.
*/
/** Ana dizi dışında yalnızca yayımlanmış diziler gösterilir; yeni dizi yayımlanınca kendiliğinden belirir. */
function otherPublished(all, featured) {
	return all.filter((s) => s.id !== featured?.id && s.status === "published");
}
function monthName(d, lang) {
	try {
		return d.toLocaleDateString(lang, {
			month: "long",
			year: "numeric"
		});
	} catch {
		return d.toISOString().slice(0, 7);
	}
}
function Index() {
	const { data: all } = useSuspenseQuery(seriesListQuery);
	const { t, lang } = useT();
	const featured = pickFeatured(all);
	const [play, setPlay] = (0, import_react.useState)(null);
	const eps = useQuery({
		...episodeListQuery(featured?.id ?? "", featured?.slug ?? ""),
		enabled: !!featured
	}).data ?? [];
	const epCount = eps.length;
	if (!featured) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "px-5 pt-10 text-sm text-muted-foreground",
		children: t("loading")
	}) });
	const solo = featured.slug === SOLO_SLUG;
	const tr = lang === "tr";
	const legacy = solo ? all.find((s) => s.slug === FEATURED_SLUG) : void 0;
	const dream = solo ? UPCOMING.find((u) => u.key === "ruya-arsivi") : void 0;
	const openCharacter = (ch) => setPlay({
		src: ch.video,
		title: ch.name,
		poster: ch.poster,
		vertical: true
	});
	const earlyAccess = (ch) => toast.info(tr ? `${ch.name} yakında geliyor. Erken izleme açıldığında burada görünecek.` : `${ch.name} is coming soon. Early access will appear here when it opens.`);
	const others = otherPublished(all, featured);
	const tx = seriesTextOf(featured, lang);
	const poster = BUNDLED_POSTERS[featured.slug];
	const ft = SERIES_TRAILERS[featured.slug];
	const openUpcoming = (u) => {
		const name = lang === "tr" ? u.title : u.titleEn;
		if (u.video) setPlay({
			src: trailerUrl(u.video),
			title: name,
			poster: u.poster && trailerUrl(u.poster),
			subsKey: u.key
		});
		else toast.info(t("trailer_soon"));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative -mt-2 h-[68vh] min-h-[440px] w-full overflow-hidden",
			children: [
				ft ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					src: ft.video,
					poster: poster ?? ft.poster,
					autoPlay: true,
					muted: true,
					loop: true,
					playsInline: true,
					className: "absolute inset-0 h-full w-full object-cover"
				}) : poster ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: poster,
					alt: "",
					className: "absolute inset-0 h-full w-full object-cover"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/30 via-card to-accent/20" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/40 to-black/30" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-x-0 bottom-0 px-5 pb-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 rounded-full bg-red-600/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 animate-pulse rounded-full bg-white" }),
								" ",
								t("now_streaming")
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 font-display text-4xl font-bold leading-none text-[#FFF4D6] [text-shadow:0_2px_12px_#000]",
							children: featured.title
						}),
						tx.tagline && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 line-clamp-2 text-sm text-foreground/85",
							children: tx.tagline
						}),
						epCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: t("episodes_count", { n: epCount })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/dizi/$slug",
								params: { slug: featured.slug },
								className: "flex flex-1 items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-bold text-black",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-4 w-4 fill-black" }),
									" ",
									t("see_episodes")
								]
							}), ft && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setPlay({
									src: ft.video,
									title: featured.title,
									poster: ft.poster
								}),
								className: "flex items-center justify-center gap-2 rounded-full border border-gold/60 px-5 py-3 text-sm font-bold text-gold",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Film, { className: "h-4 w-4" }),
									" ",
									t("play_trailer")
								]
							})]
						})
					]
				})
			]
		}),
		solo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			eps.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "flex items-center gap-2 px-5 font-display text-xl font-bold text-gold",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-5 w-5 fill-gold" }),
						" ",
						t("episodes")
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex snap-x gap-3 overflow-x-auto px-5 pb-2",
					children: eps.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/izle/$slug/$n",
						params: {
							slug: featured.slug,
							n: String(e.n)
						},
						className: "relative aspect-[9/16] w-36 shrink-0 snap-start overflow-hidden rounded-2xl border border-primary/30 bg-card",
						children: [
							poster && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: poster,
								alt: "",
								loading: "lazy",
								className: "absolute inset-0 h-full w-full object-cover"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/40" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute left-2.5 top-2 font-display text-4xl font-bold text-[#FFF4D6] [text-shadow:0_2px_8px_#000]",
								children: e.n
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute inset-0 m-auto grid h-11 w-11 place-items-center rounded-full bg-black/50 ring-2 ring-gold/70",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "ml-0.5 h-5 w-5 fill-gold text-gold" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute inset-x-2.5 bottom-2.5 line-clamp-2 text-xs font-bold leading-tight text-[#FFF4D6]",
								children: episodeTitle(e, lang) ?? `${t("episode")} ${e.n}`
							})
						]
					}, e.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeaturedCharacters, {
				tr,
				onPlay: setPlay
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 px-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "flex items-center gap-2 font-display text-xl font-bold text-gold",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5" }),
							" ",
							tr ? `Yakında: ${SOON_CHARACTERS.length} yeni karakter` : `Coming soon: ${SOON_CHARACTERS.length} new characters`
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: tr ? "Her biri 15 saniyelik yeni bir dünya. Fragmanları izle." : "Each one a new 15-second world. Watch the trailers."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 grid grid-cols-2 gap-3",
						children: SOON_CHARACTERS.map((ch) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "overflow-hidden rounded-2xl border border-primary/30 bg-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => openCharacter(ch),
								className: "relative block aspect-[9/16] w-full overflow-hidden bg-gradient-to-br from-primary/30 via-card to-accent/20 text-start",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: ch.poster,
										alt: "",
										loading: "lazy",
										className: "absolute inset-0 h-full w-full object-cover"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute left-2.5 top-2.5 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-gold",
										children: tr ? "Yakında" : "Soon"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute inset-0 m-auto grid h-12 w-12 place-items-center rounded-full bg-black/50 ring-2 ring-gold/70",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "ml-0.5 h-5 w-5 fill-gold text-gold" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "absolute inset-x-2.5 bottom-2.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block font-display text-xl font-bold leading-tight text-[#FFF4D6] [text-shadow:0_2px_8px_#000]",
											children: ch.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-0.5 line-clamp-2 block text-[11px] leading-snug text-foreground/85",
											children: tr ? ch.hook.tr : ch.hook.en
										})]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => earlyAccess(ch),
								className: "w-full border-t border-primary/20 px-3 py-2 text-xs font-bold text-gold",
								children: tr ? "Erken izle" : "Early access"
							})]
						}, ch.key))
					})
				]
			}),
			(legacy || dream) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 px-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-bold",
					children: t("more_series")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex gap-3 overflow-x-auto pb-2",
					children: [legacy && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/dizi/$slug",
						params: { slug: legacy.slug },
						className: "w-28 shrink-0",
						children: [BUNDLED_POSTERS[legacy.slug] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: BUNDLED_POSTERS[legacy.slug],
							alt: legacy.title,
							loading: "lazy",
							className: "aspect-[2/3] w-full rounded-2xl object-cover"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-[2/3] w-full rounded-2xl bg-gradient-to-br from-primary/30 via-card to-accent/20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 line-clamp-2 text-xs font-semibold",
							children: legacy.title
						})]
					}), dream && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => openUpcoming(dream),
						className: "w-28 shrink-0 text-start",
						children: [dream.poster ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: trailerUrl(dream.poster),
							alt: "",
							loading: "lazy",
							className: "aspect-[2/3] w-full rounded-2xl object-cover"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-[2/3] w-full rounded-2xl bg-gradient-to-br from-primary/30 via-card to-accent/20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 line-clamp-2 text-xs font-semibold",
							children: tr ? dream.title : dream.titleEn
						})]
					})]
				})]
			})
		] }),
		!solo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6 px-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "flex items-center gap-2 font-display text-xl font-bold text-gold",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5" }),
						" ",
						t("upcoming_title")
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: t("upcoming_sub")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2",
				children: UPCOMING.map((u) => {
					const name = lang === "tr" ? u.title : u.titleEn;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => openUpcoming(u),
						className: `relative aspect-video w-[82vw] max-w-md shrink-0 snap-center overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br text-start ${u.bg}`,
						children: [
							u.poster && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: trailerUrl(u.poster),
								alt: "",
								loading: "lazy",
								className: "absolute inset-0 h-full w-full object-cover"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-gold",
								children: monthName(u.month, lang)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute inset-0 m-auto grid h-14 w-14 place-items-center rounded-full bg-black/50 ring-2 ring-gold/70",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "ml-1 h-6 w-6 fill-gold text-gold" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "absolute inset-x-3 bottom-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block font-display text-xl font-bold leading-tight text-[#FFF4D6] [text-shadow:0_2px_8px_#000]",
									children: name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 line-clamp-2 block text-[12px] leading-snug text-foreground/85",
									children: lang === "tr" ? u.hook.tr : u.hook.en
								})]
							})
						]
					}, u.key);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 px-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "flex items-center gap-2 text-sm font-bold",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "h-4 w-4 text-gold" }),
						" ",
						t("calendar")
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid grid-cols-3 gap-2",
					children: UPCOMING.map((u) => {
						const name = lang === "tr" ? u.title : u.titleEn;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => openUpcoming(u),
							className: "relative aspect-[3/4] overflow-hidden rounded-xl border border-primary/20 text-start",
							children: [
								u.poster && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: trailerUrl(u.poster),
									alt: "",
									loading: "lazy",
									className: "absolute inset-0 h-full w-full object-cover"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute left-1.5 top-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-bold uppercase text-gold",
									children: monthName(u.month, lang)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute inset-x-1.5 bottom-1.5 line-clamp-2 text-[11px] font-bold leading-tight text-[#FFF4D6]",
									children: name
								})
							]
						}, u.key);
					})
				})]
			})
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-5",
			children: [
				!solo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/kapsul",
					className: "mt-8 flex items-center gap-4 rounded-2xl border border-primary/40 bg-card/80 p-4 shadow-neon",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Orbit, { className: "h-9 w-9 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-bold",
						children: t("capsule_cta")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-xs text-muted-foreground",
						children: t("capsule_cta_sub")
					})] })]
				}),
				!solo && others.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-bold",
						children: t("more_series")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex gap-3 overflow-x-auto pb-2",
						children: others.map((s) => {
							const src = BUNDLED_POSTERS[s.slug];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/dizi/$slug",
								params: { slug: s.slug },
								className: "w-32 shrink-0",
								children: [src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src,
									alt: s.title,
									width: 768,
									height: 1152,
									loading: "lazy",
									className: "aspect-[2/3] w-full rounded-2xl object-cover"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid aspect-[2/3] w-full place-items-center rounded-2xl bg-gradient-to-br from-primary/30 via-card to-accent/20",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "px-3 text-center text-xs font-bold uppercase tracking-widest text-muted-foreground",
										children: s.title
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 line-clamp-2 text-xs font-semibold",
									children: s.title
								})]
							}, s.id);
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8" })
			]
		}),
		play && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrailerModal, {
			src: play.src,
			poster: play.poster,
			title: play.title,
			subsKey: play.subsKey,
			defaultLang: lang,
			vertical: play.vertical,
			onEnded: play.next,
			onClose: () => setPlay(null)
		})
	] });
}
//#endregion
export { Index as component, otherPublished };
