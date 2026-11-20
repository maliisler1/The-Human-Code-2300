//#region node_modules/.nitro/vite/services/ssr/assets/data-9TLpVgmV.js
var elyra_poster_default = "/assets/elyra-poster-CSChpYfW.jpg";
var cyber_glitch_default = "/assets/cyber-glitch-4kcr8HGD.jpg";
var neon_hearts_default = "/assets/neon-hearts-BQnfDn9D.jpg";
var eps = (tr, en) => tr.map((t, i) => ({
	n: i + 1,
	title: {
		tr: t,
		en: en[i] ?? t
	},
	minutes: 2 + i % 3
}));
eps([
	"Uyanış",
	"Kayıp Sinyal",
	"Gölgenin Adı",
	"Kale",
	"Leon",
	"Kael",
	"On Sekiz Kapsül",
	"İhanet",
	"Kızıl Savaşçı",
	"Eray'ın Sırrı",
	"Leon'un Gözleri",
	"On İki",
	"Kırılan Köprüler",
	"Dr. Ekin Var",
	"Kopya ve Asıl",
	"Nyra'nın Seçimi",
	"Yirmi Üç Işık",
	"Kalenin Düşüşü",
	"Gölge ile Yüz Yüze",
	"Yeni Dünya"
], [
	"Awakening",
	"Lost Signal",
	"The Shadow's Name",
	"The Fortress",
	"Leon",
	"Kael",
	"Eighteen Capsules",
	"Betrayal",
	"The Crimson Warrior",
	"Eray's Secret",
	"Leon's Eyes",
	"Twelve",
	"Broken Bridges",
	"Dr. Ekin Var",
	"Copy and Original",
	"Nyra's Choice",
	"Twenty-Three Lights",
	"Fall of the Fortress",
	"Face to Face with the Shadow",
	"A New World"
]), eps([
	"Sistem Hatası",
	"Kahraman Modu",
	"Yanlış Alarm",
	"Robot Dansı",
	"Büyük Çöküş"
], [
	"System Error",
	"Hero Mode",
	"False Alarm",
	"Robot Dance",
	"The Big Crash"
]), eps([
	"İlk Bağlantı",
	"Sanal Yağmur",
	"Kopan Sinyal",
	"Gerçeğe Adım",
	"Tek Kalp Atışı"
], [
	"First Connection",
	"Virtual Rain",
	"Broken Signal",
	"Step Into Reality",
	"One Heartbeat"
]);
/** Uygulamanın ana dizisi (The Chosen modeli: tek dizi, sonradan yeni diziler eklenebilir). */
var FEATURED_SLUG = "the-human-code-2300";
/**
* Tek dizi modu: bu dizi yayımlandığında ana ekranda yalnızca o görünür.
* Diğer diziler, fragmanlar, takvim ve kapsül ana ekrandan gizlenir; kodları ve verileri arşivde kalır.
* Dizi taslakken (ya da hiç yokken) ana ekran eskisi gibi çalışır.
*/
var SOLO_SLUG = "snooze-with-tik";
//#endregion
export { neon_hearts_default as a, elyra_poster_default as i, SOLO_SLUG as n, cyber_glitch_default as r, FEATURED_SLUG as t };
