import { r as __toESM } from "../_runtime.mjs";
import { p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { l as Capacitor } from "../_libs/@capacitor-community/admob+[...].mjs";
import { c as lazyRouteComponent, l as createFileRoute, m as notFound } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as seriesListQuery, t as episodeListQuery } from "./catalog-B587fq8g.mjs";
import { n as Directory, t as Filesystem } from "../_libs/@capacitor/filesystem+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/offline-4vVozybF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var $$splitComponentImporter = () => import("./dizi._slug-Df6UMkwJ.mjs");
var Route = createFileRoute("/dizi/$slug")({
	loader: async ({ context, params }) => {
		const s = (await context.queryClient.ensureQueryData(seriesListQuery)).find((x) => x.slug === params.slug);
		if (!s) throw notFound();
		await context.queryClient.ensureQueryData(episodeListQuery(s.id, s.slug));
		return {
			id: s.id,
			slug: s.slug
		};
	},
	head: ({ loaderData }) => ({ meta: loaderData ? [
		{ title: `${loaderData.slug} — AI Multiverse Cinema` },
		{
			property: "og:title",
			content: loaderData.slug
		},
		{
			property: "og:type",
			content: "video.tv_show"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] : [{ title: "Dizi bulunamadı" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var KEY = "amc-offline-v1";
var subs = /* @__PURE__ */ new Set();
var cache = null;
function read() {
	if (cache) return cache;
	try {
		cache = JSON.parse(localStorage.getItem(KEY) ?? "{}");
	} catch {
		cache = {};
	}
	return cache;
}
function write(next) {
	cache = next;
	try {
		localStorage.setItem(KEY, JSON.stringify(next));
	} catch {}
	subs.forEach((fn) => fn());
}
async function fetchTo(url, path) {
	await Filesystem.downloadFile({
		url,
		path,
		directory: Directory.Data,
		recursive: true
	});
	return (await Filesystem.getUri({
		path,
		directory: Directory.Data
	})).uri;
}
var offline = {
	supported: () => Capacitor.isNativePlatform(),
	get: (episodeId) => read()[episodeId],
	/** Cihazdaki dosyayı oynatıcının açabileceği adrese çevirir. */
	src: (fileUri) => Capacitor.convertFileSrc(fileUri),
	async download(episodeId, videoUrl, audio) {
		const entry = { video: await fetchTo(videoUrl, `episodes/${episodeId}.mp4`) };
		if (audio) {
			entry.audio = await fetchTo(audio.url, `episodes/${episodeId}.${audio.lang}.audio`);
			entry.audioLang = audio.lang;
		}
		write({
			...read(),
			[episodeId]: entry
		});
	},
	async remove(episodeId) {
		const entry = read()[episodeId];
		if (!entry) return;
		for (const uri of [entry.video, entry.audio]) if (uri) await Filesystem.deleteFile({ path: uri }).catch(() => {});
		const { [episodeId]: _drop, ...rest } = read();
		write(rest);
	},
	subscribe(fn) {
		subs.add(fn);
		return () => {
			subs.delete(fn);
		};
	}
};
/** İndirilmiş bölümler değiştikçe bileşeni yeniler. */
function useOffline() {
	return (0, import_react.useSyncExternalStore)(offline.subscribe, read, () => ({}));
}
//#endregion
export { offline as n, useOffline as r, Route as t };
