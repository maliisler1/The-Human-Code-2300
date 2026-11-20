import { n as SOLO_SLUG } from "./data-9TLpVgmV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-SEeWJnDt.js
/**
* Tek dizi modunun dizisi. Bölümleri ve afişi uygulamayla birlikte geldiği için
* veritabanında kaydı olması yeterlidir; taslak olsa da ana ekranı o alır.
*/
function pickSolo(all) {
	return all.find((s) => s.slug === SOLO_SLUG);
}
function pickFeatured(all) {
	return pickSolo(all) ?? all.find((s) => s.slug === "the-human-code-2300") ?? all.find((s) => s.status === "published") ?? all[0];
}
//#endregion
export { pickFeatured as t };
