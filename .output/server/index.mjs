globalThis.__nitro_main__ = import.meta.url;
import { n as defineLazyEventHandler, r as HTTPError, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { t as FastResponse } from "./_libs/srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-11-20T11:30:35.569Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-11-20T11:30:35.570Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/sample-2.mp4": {
		"type": "video/mp4",
		"etag": "\"24b16-olx72nkNW9aTCqIV6DOio3NopIo\"",
		"mtime": "2026-11-20T11:30:35.572Z",
		"size": 150294,
		"path": "../public/sample-2.mp4"
	},
	"/sample.mp4": {
		"type": "video/mp4",
		"etag": "\"24aff-Q+DztEX+I/bDuOtsICNk2tATObw\"",
		"mtime": "2026-11-20T11:30:35.572Z",
		"size": 150271,
		"path": "../public/sample.mp4"
	},
	"/sample-3.mp4": {
		"type": "video/mp4",
		"etag": "\"24aee-t2s9k/rJ3zq2kGCqXL8uAWcw40Y\"",
		"mtime": "2026-11-20T11:30:35.570Z",
		"size": 150254,
		"path": "../public/sample-3.mp4"
	},
	"/assets/AppShell-BznUefEz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"48458-t6x1ujy5V02MWttxeGmGdrID7q8\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 296024,
		"path": "../public/assets/AppShell-BznUefEz.js"
	},
	"/assets/ParentGate-CZ5eOc3G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6a8-SGhVC60Wtlhr2jfW9i0DfGvIVnY\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 1704,
		"path": "../public/assets/ParentGate-CZ5eOc3G.js"
	},
	"/assets/TrailerModal-BmgxT24V.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"94e4-NA3jzSajopmj+OL4KWgB9mrKeQ8\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 38116,
		"path": "../public/assets/TrailerModal-BmgxT24V.js"
	},
	"/assets/arrow-left-BoJfKTBo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"134-+nSHgPRvlN0zaueYh+MITxm4Xrk\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 308,
		"path": "../public/assets/arrow-left-BoJfKTBo.js"
	},
	"/assets/ayarlar-CFtm3bWn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"597-C7yM2OoRjeldVvWUcHhi7H2xess\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 1431,
		"path": "../public/assets/ayarlar-CFtm3bWn.js"
	},
	"/assets/check-CwQdv2mH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"74-fNH5KVwiLPDMOtR2rXUgAf5nQz8\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 116,
		"path": "../public/assets/check-CwQdv2mH.js"
	},
	"/assets/catalog-HqwvlR3j.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6143-7OdxuxIFOFoUPi4QdyYTgON4etM\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 24899,
		"path": "../public/assets/catalog-HqwvlR3j.js"
	},
	"/assets/consent-status.enum-CdMsqkrY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a-f7mNDLrn7fU4RSxdOIgH02URjzQ\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 138,
		"path": "../public/assets/consent-status.enum-CdMsqkrY.js"
	},
	"/assets/cyber-glitch-4kcr8HGD.jpg": {
		"type": "image/jpeg",
		"etag": "\"34a46-ns2qNbw1wJYOqXsXqm4zEQ9TFRA\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 215622,
		"path": "../public/assets/cyber-glitch-4kcr8HGD.jpg"
	},
	"/assets/definitions-DlpntO5o.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"160-gk2Jgrzju8JYD6bZzmdG3StLjzM\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 352,
		"path": "../public/assets/definitions-DlpntO5o.js"
	},
	"/assets/dist-B4QiFnYP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e54-ULvBovtlC9yGo6Bi5MsfT0A3Tys\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 7764,
		"path": "../public/assets/dist-B4QiFnYP.js"
	},
	"/assets/dizi._slug-CnrMHVrV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2f9d-C8/pnZmo1VTsKOVZ/v8UUXhMnTU\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 12189,
		"path": "../public/assets/dizi._slug-CnrMHVrV.js"
	},
	"/assets/e1-BWni0p5M.jpg": {
		"type": "image/jpeg",
		"etag": "\"503b-5ZAs9eUxcAodcjWII2ESHN07YkI\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 20539,
		"path": "../public/assets/e1-BWni0p5M.jpg"
	},
	"/assets/e10-BF1KhIG1.jpg": {
		"type": "image/jpeg",
		"etag": "\"3e24-TeZFrQj1akLE1akxlMEpy5kz63k\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 15908,
		"path": "../public/assets/e10-BF1KhIG1.jpg"
	},
	"/assets/e11-CpWSbtbs.jpg": {
		"type": "image/jpeg",
		"etag": "\"33da-kVnxMcMtiZHAEZx+JIJr3nyzW+4\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 13274,
		"path": "../public/assets/e11-CpWSbtbs.jpg"
	},
	"/assets/e12-DgRBmxf6.jpg": {
		"type": "image/jpeg",
		"etag": "\"3729-IgH3fCTUSUcGB5Yar3G+krGlCJI\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 14121,
		"path": "../public/assets/e12-DgRBmxf6.jpg"
	},
	"/assets/e13-5eYa-9Aq.jpg": {
		"type": "image/jpeg",
		"etag": "\"4671-NjCYwU84pyNx2P3kYUdqhao2vPc\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 18033,
		"path": "../public/assets/e13-5eYa-9Aq.jpg"
	},
	"/assets/e14-D-jxKpTq.jpg": {
		"type": "image/jpeg",
		"etag": "\"6bc6-8qABqUpBb8Utkzmfm5GL4ee9syc\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 27590,
		"path": "../public/assets/e14-D-jxKpTq.jpg"
	},
	"/assets/e15-7Yn_rKmU.jpg": {
		"type": "image/jpeg",
		"etag": "\"3954-rN7ho7WfApnyM7q4UZuCRrHjDdQ\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 14676,
		"path": "../public/assets/e15-7Yn_rKmU.jpg"
	},
	"/assets/e16-mOTYc3wW.jpg": {
		"type": "image/jpeg",
		"etag": "\"5cda-s/Ur1finbQcgYhTd2DZq1OVDsCY\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 23770,
		"path": "../public/assets/e16-mOTYc3wW.jpg"
	},
	"/assets/e17-CpEN6A3t.jpg": {
		"type": "image/jpeg",
		"etag": "\"5410-UMAvpIrXeOBorHqnkEgwoBS6TUE\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 21520,
		"path": "../public/assets/e17-CpEN6A3t.jpg"
	},
	"/assets/e18-D_bG7yre.jpg": {
		"type": "image/jpeg",
		"etag": "\"46a0-a+sijtUOax5x+Hk2J1WakmUvs14\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 18080,
		"path": "../public/assets/e18-D_bG7yre.jpg"
	},
	"/assets/e19-rQXCrGsP.jpg": {
		"type": "image/jpeg",
		"etag": "\"2c69-YE/fsbYOeKvWFrFcyCfTVDsyhR4\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 11369,
		"path": "../public/assets/e19-rQXCrGsP.jpg"
	},
	"/assets/e2-BWBDnoKF.jpg": {
		"type": "image/jpeg",
		"etag": "\"4c69-NIPMAXaOQR1pXGyUVx+Yi2R5+ys\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 19561,
		"path": "../public/assets/e2-BWBDnoKF.jpg"
	},
	"/assets/e20-BPLGhd-0.jpg": {
		"type": "image/jpeg",
		"etag": "\"2f4b-b9VcWtMf+QgyI2GfEOin6Oe93cQ\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 12107,
		"path": "../public/assets/e20-BPLGhd-0.jpg"
	},
	"/assets/e3-139bsV_P.jpg": {
		"type": "image/jpeg",
		"etag": "\"6fa1-x9/uD5aDrQoAI4OAl9g0K00kxAg\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 28577,
		"path": "../public/assets/e3-139bsV_P.jpg"
	},
	"/assets/e4-C5Auc3mz.jpg": {
		"type": "image/jpeg",
		"etag": "\"2fe2-okdBufxiTXDpZXbVgBViTVc5uzo\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 12258,
		"path": "../public/assets/e4-C5Auc3mz.jpg"
	},
	"/assets/e5-CQQJCHaY.jpg": {
		"type": "image/jpeg",
		"etag": "\"3e6e-MbhJHacwBIpwSM3WP+IlZM9bogA\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 15982,
		"path": "../public/assets/e5-CQQJCHaY.jpg"
	},
	"/assets/e6-D9TfxCxU.jpg": {
		"type": "image/jpeg",
		"etag": "\"6cff-dWwIOUVU3TNnlzoBRLMHAg3fIx4\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 27903,
		"path": "../public/assets/e6-D9TfxCxU.jpg"
	},
	"/assets/e7-QDxc1b66.jpg": {
		"type": "image/jpeg",
		"etag": "\"5a69-Iy1EONIqjZQ+EHXTQsiwKPLzpZA\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 23145,
		"path": "../public/assets/e7-QDxc1b66.jpg"
	},
	"/assets/e8-DU6SSSKs.jpg": {
		"type": "image/jpeg",
		"etag": "\"2e70-icfoosPwE0uLAmfbbfntCYEo6sQ\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 11888,
		"path": "../public/assets/e8-DU6SSSKs.jpg"
	},
	"/assets/e9-yhD6rIos.jpg": {
		"type": "image/jpeg",
		"etag": "\"3c35-cuoJKMrXuvaPF/l1mr3RSPaXs7w\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 15413,
		"path": "../public/assets/e9-yhD6rIos.jpg"
	},
	"/assets/elyra-poster-CSChpYfW.jpg": {
		"type": "image/jpeg",
		"etag": "\"25948-6k/cq5jw6poYnZ52eAN+8ra35Ac\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 153928,
		"path": "../public/assets/elyra-poster-CSChpYfW.jpg"
	},
	"/assets/film-BEteNazG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18f-fjednjdmOzxuM6QYbjtaRk3hWEE\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 399,
		"path": "../public/assets/film-BEteNazG.js"
	},
	"/assets/giris-CA4ql98p.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"119d-Sf09Znxo7l04w2MqKdzaNL1WKIo\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 4509,
		"path": "../public/assets/giris-CA4ql98p.js"
	},
	"/assets/index-CPeek6ex.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5bedf-LVPE6iMtuhMBvJEi/It5F9fQeKc\"",
		"mtime": "2026-11-20T11:30:33.442Z",
		"size": 376543,
		"path": "../public/assets/index-CPeek6ex.js"
	},
	"/assets/jeton-QO5eEEUw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a53-PQq45rFzz12Pv5Xxzze089OqKzc\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 2643,
		"path": "../public/assets/jeton-QO5eEEUw.js"
	},
	"/assets/kapsul-NZADvOGv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b6f-45WIL/QNn61S2f5xYSfjTUcBfSY\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 7023,
		"path": "../public/assets/kapsul-NZADvOGv.js"
	},
	"/assets/lock-Ddpo0pc9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c6-0DvjV+PDbjr6DmDR5SL4m8Y7HF4\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 198,
		"path": "../public/assets/lock-Ddpo0pc9.js"
	},
	"/assets/neon-hearts-BQnfDn9D.jpg": {
		"type": "image/jpeg",
		"etag": "\"2a709-gzPZfapoYdblobU3KVP7DlRQEdU\"",
		"mtime": "2026-11-20T11:30:33.448Z",
		"size": 173833,
		"path": "../public/assets/neon-hearts-BQnfDn9D.jpg"
	},
	"/assets/offline-pT7bOcyX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d1c-BgXz1g3SZBeb2DOuGEVvw33Np44\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 7452,
		"path": "../public/assets/offline-pT7bOcyX.js"
	},
	"/assets/play-BbO4eJpF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b6-j/B3QKqTaZB/lAuYNjyKa4j+h9I\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 182,
		"path": "../public/assets/play-BbO4eJpF.js"
	},
	"/assets/profil-DxRRqg7f.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12bd3-m7ZbEhabtQBVaVkq3xebsuqEi3c\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 76755,
		"path": "../public/assets/profil-DxRRqg7f.js"
	},
	"/assets/routes-Cu-qko9m.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"55d8-8CLp0JFqf7K5e4hY8i6g2Lkz878\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 21976,
		"path": "../public/assets/routes-Cu-qko9m.js"
	},
	"/assets/rotate-ccw-BFgLJHSS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c0-fhslDkxoQfqtxZUpwaFhfoa7PQE\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 192,
		"path": "../public/assets/rotate-ccw-BFgLJHSS.js"
	},
	"/assets/sparkles-BYy0nupG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e6-EMJAl01AhF2/6WOTIAPzxmSz7ic\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 486,
		"path": "../public/assets/sparkles-BYy0nupG.js"
	},
	"/assets/styles-gVZ2UD_8.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"18ef4-hxQEhEDDRvKpoNMK4vXmdMnQMfU\"",
		"mtime": "2026-11-20T11:30:33.448Z",
		"size": 102132,
		"path": "../public/assets/styles-gVZ2UD_8.css"
	},
	"/assets/web-B-btVXBu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"740-cblSYaIe3SspQaSVj3gHuFY+9kM\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 1856,
		"path": "../public/assets/web-B-btVXBu.js"
	},
	"/assets/web-D9r0k8fk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7d3-OvnYjDqB2hA1Cepm51ExcJhwkIk\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 2003,
		"path": "../public/assets/web-D9r0k8fk.js"
	},
	"/assets/web-FgFFxa6A.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2128-vymlNGfEYboGkUHgfTHCS7wW+pU\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 8488,
		"path": "../public/assets/web-FgFFxa6A.js"
	},
	"/assets/web-kP70mRRB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16c-fnKZDr1U3fqOi/ZE+fyF5wyucmY\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 364,
		"path": "../public/assets/web-kP70mRRB.js"
	},
	"/assets/x-BINPj-VK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"583-a46RsZrbQeC9HX0ab9oZmN7Xf10\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 1411,
		"path": "../public/assets/x-BINPj-VK.js"
	},
	"/assets/yonetim-Bo6TxKZb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"83fa-TGvJJYu0dY9rnh04TzblwuFrQ5g\"",
		"mtime": "2026-11-20T11:30:33.447Z",
		"size": 33786,
		"path": "../public/assets/yonetim-Bo6TxKZb.js"
	},
	"/karakterler/bip.webp": {
		"type": "image/webp",
		"etag": "\"5656-PbllMqSL3psgSigdU8qBKwpeKEQ\"",
		"mtime": "2026-11-20T11:30:34.858Z",
		"size": 22102,
		"path": "../public/karakterler/bip.webp"
	},
	"/karakterler/boon.webp": {
		"type": "image/webp",
		"etag": "\"6e88-/FSAmj6JtmR6eI6sERyXcX5DIZU\"",
		"mtime": "2026-11-20T11:30:34.865Z",
		"size": 28296,
		"path": "../public/karakterler/boon.webp"
	},
	"/karakterler/ding.webp": {
		"type": "image/webp",
		"etag": "\"6814-v99Eo5+VEGG3w81/f/zWd8eV540\"",
		"mtime": "2026-11-20T11:30:34.865Z",
		"size": 26644,
		"path": "../public/karakterler/ding.webp"
	},
	"/karakterler/drip.webp": {
		"type": "image/webp",
		"etag": "\"6a02-glZOFAGH7scQUsWkFttkHNHqjrU\"",
		"mtime": "2026-11-20T11:30:34.867Z",
		"size": 27138,
		"path": "../public/karakterler/drip.webp"
	},
	"/karakterler/bip-ep1.mp4": {
		"type": "video/mp4",
		"etag": "\"c7ee3-GX5M5/ZeC3ElIsvVS0tBf09oF70\"",
		"mtime": "2026-11-20T11:30:34.778Z",
		"size": 818915,
		"path": "../public/karakterler/bip-ep1.mp4"
	},
	"/karakterler/bip-ep2.mp4": {
		"type": "video/mp4",
		"etag": "\"eea57-whQw9BlgKv2ezPCtaCR2CYEfT1E\"",
		"mtime": "2026-11-20T11:30:34.842Z",
		"size": 977495,
		"path": "../public/karakterler/bip-ep2.mp4"
	},
	"/karakterler/bip-ep3.mp4": {
		"type": "video/mp4",
		"etag": "\"fecf1-JZmqtwD4naxaWy5TqOWAX6DJHao\"",
		"mtime": "2026-11-20T11:30:34.834Z",
		"size": 1043697,
		"path": "../public/karakterler/bip-ep3.mp4"
	},
	"/karakterler/bip-ep5.mp4": {
		"type": "video/mp4",
		"etag": "\"e3bc8-kBlb2D8yYaAMWMA52RYEi4Ab6jk\"",
		"mtime": "2026-11-20T11:30:34.863Z",
		"size": 932808,
		"path": "../public/karakterler/bip-ep5.mp4"
	},
	"/karakterler/bip.mp4": {
		"type": "video/mp4",
		"etag": "\"d21de-xVwB4+FjZ1T5eF0iHtfbKkO70Go\"",
		"mtime": "2026-11-20T11:30:34.866Z",
		"size": 860638,
		"path": "../public/karakterler/bip.mp4"
	},
	"/karakterler/boon.mp4": {
		"type": "video/mp4",
		"etag": "\"e98b6-TuAlJZrQtxJ4UBgsTf0CSD002Q4\"",
		"mtime": "2026-11-20T11:30:34.868Z",
		"size": 956598,
		"path": "../public/karakterler/boon.mp4"
	},
	"/karakterler/ding.mp4": {
		"type": "video/mp4",
		"etag": "\"f4cdd-Kv2dNWymIh1BXN78JhgHY09i1N4\"",
		"mtime": "2026-11-20T11:30:34.868Z",
		"size": 1002717,
		"path": "../public/karakterler/ding.mp4"
	},
	"/karakterler/bip-ep4.mp4": {
		"type": "video/mp4",
		"etag": "\"117e6e-AZpZGx8gfA+9WQVlf27YBst2suM\"",
		"mtime": "2026-11-20T11:30:34.863Z",
		"size": 1146478,
		"path": "../public/karakterler/bip-ep4.mp4"
	},
	"/karakterler/dusty-ep2.mp4": {
		"type": "video/mp4",
		"etag": "\"11450b-rpG3JTvO557FBDMUlkOo8nbVix8\"",
		"mtime": "2026-11-20T11:30:34.898Z",
		"size": 1131787,
		"path": "../public/karakterler/dusty-ep2.mp4"
	},
	"/karakterler/dusty-ep3.mp4": {
		"type": "video/mp4",
		"etag": "\"15534a-GxMR3Nvey+AEYsMcJVOfkL48CKg\"",
		"mtime": "2026-11-20T11:30:34.906Z",
		"size": 1397578,
		"path": "../public/karakterler/dusty-ep3.mp4"
	},
	"/karakterler/drip.mp4": {
		"type": "video/mp4",
		"etag": "\"cee29-0ZOY37IVTjLk3NksvJ7nIMsyN4Q\"",
		"mtime": "2026-11-20T11:30:34.874Z",
		"size": 847401,
		"path": "../public/karakterler/drip.mp4"
	},
	"/karakterler/dusty-ep4.mp4": {
		"type": "video/mp4",
		"etag": "\"131ecb-h3OGc4bq+iECHUIl1GYcgLYOmFU\"",
		"mtime": "2026-11-20T11:30:34.902Z",
		"size": 1253067,
		"path": "../public/karakterler/dusty-ep4.mp4"
	},
	"/karakterler/dusty.webp": {
		"type": "image/webp",
		"etag": "\"7cb0-Np8qRsSkrJPB/KQ4TthunmaqXH8\"",
		"mtime": "2026-11-20T11:30:34.962Z",
		"size": 31920,
		"path": "../public/karakterler/dusty.webp"
	},
	"/karakterler/fizz.webp": {
		"type": "image/webp",
		"etag": "\"10b4a-+3h5VXKMXjPPz8nIZKVX0G4L7oY\"",
		"mtime": "2026-11-20T11:30:34.967Z",
		"size": 68426,
		"path": "../public/karakterler/fizz.webp"
	},
	"/karakterler/glim.webp": {
		"type": "image/webp",
		"etag": "\"51d6-bboZ+ylRxkF/10zlaaNwbXY4Jbo\"",
		"mtime": "2026-11-20T11:30:34.971Z",
		"size": 20950,
		"path": "../public/karakterler/glim.webp"
	},
	"/karakterler/dusty-ep1.mp4": {
		"type": "video/mp4",
		"etag": "\"10afa5-YwZ0U67gLnKbn3I8t91faSfJ64w\"",
		"mtime": "2026-11-20T11:30:34.886Z",
		"size": 1093541,
		"path": "../public/karakterler/dusty-ep1.mp4"
	},
	"/karakterler/kiko.webp": {
		"type": "image/webp",
		"etag": "\"cf82-i9vPK09MtsvRM13XAwYedjvzeWE\"",
		"mtime": "2026-11-20T11:30:34.975Z",
		"size": 53122,
		"path": "../public/karakterler/kiko.webp"
	},
	"/karakterler/lumo.webp": {
		"type": "image/webp",
		"etag": "\"957a-g+tCAVliOKeZ5Z2cXoVrOXHP0Tk\"",
		"mtime": "2026-11-20T11:30:34.978Z",
		"size": 38266,
		"path": "../public/karakterler/lumo.webp"
	},
	"/karakterler/dusty-ep5.mp4": {
		"type": "video/mp4",
		"etag": "\"d9577-F8exPHAl3ivxvliEdTxZ6iTEtKo\"",
		"mtime": "2026-11-20T11:30:34.967Z",
		"size": 890231,
		"path": "../public/karakterler/dusty-ep5.mp4"
	},
	"/karakterler/dusty.mp4": {
		"type": "video/mp4",
		"etag": "\"eed10-TXM5ZBCYF9JUToA2BKaWFUePgbk\"",
		"mtime": "2026-11-20T11:30:34.973Z",
		"size": 978192,
		"path": "../public/karakterler/dusty.mp4"
	},
	"/karakterler/glim.mp4": {
		"type": "video/mp4",
		"etag": "\"f72db-KoKWt+wLqGKDdnreItqC3H/VKts\"",
		"mtime": "2026-11-20T11:30:34.973Z",
		"size": 1012443,
		"path": "../public/karakterler/glim.mp4"
	},
	"/karakterler/mel.webp": {
		"type": "image/webp",
		"etag": "\"a8dc-fgT5uM0izKfANvjj9MpvfJGEVL4\"",
		"mtime": "2026-11-20T11:30:34.993Z",
		"size": 43228,
		"path": "../public/karakterler/mel.webp"
	},
	"/karakterler/mag.webp": {
		"type": "image/webp",
		"etag": "\"52e4-1t7U61U5psUqEJb1JVWLtHe72v8\"",
		"mtime": "2026-11-20T11:30:34.982Z",
		"size": 21220,
		"path": "../public/karakterler/mag.webp"
	},
	"/karakterler/nudl.webp": {
		"type": "image/webp",
		"etag": "\"8120-zjrsElEYFL4qvUDJTrnf8ynk5w8\"",
		"mtime": "2026-11-20T11:30:34.990Z",
		"size": 33056,
		"path": "../public/karakterler/nudl.webp"
	},
	"/karakterler/mag.mp4": {
		"type": "video/mp4",
		"etag": "\"b0edf-CuIz60s8ec1rjJ9DNEmXB9OOi7I\"",
		"mtime": "2026-11-20T11:30:34.988Z",
		"size": 724703,
		"path": "../public/karakterler/mag.mp4"
	},
	"/karakterler/pix.webp": {
		"type": "image/webp",
		"etag": "\"37c4-51oxqcSogTZkSII1hREmquux/8k\"",
		"mtime": "2026-11-20T11:30:34.994Z",
		"size": 14276,
		"path": "../public/karakterler/pix.webp"
	},
	"/karakterler/kiko.mp4": {
		"type": "video/mp4",
		"etag": "\"167c9f-E3i6BerINGRrFu8Rb4Y3yFjmFIM\"",
		"mtime": "2026-11-20T11:30:34.984Z",
		"size": 1473695,
		"path": "../public/karakterler/kiko.mp4"
	},
	"/karakterler/pix.mp4": {
		"type": "video/mp4",
		"etag": "\"d0bcd-4vJYGXxGBHSiJOu+BNTzAKxkmHA\"",
		"mtime": "2026-11-20T11:30:34.999Z",
		"size": 854989,
		"path": "../public/karakterler/pix.mp4"
	},
	"/karakterler/lumo.mp4": {
		"type": "video/mp4",
		"etag": "\"125d92-mmtATIBnRlbiqbuTusNukE5DLeU\"",
		"mtime": "2026-11-20T11:30:34.988Z",
		"size": 1203602,
		"path": "../public/karakterler/lumo.mp4"
	},
	"/karakterler/mel.mp4": {
		"type": "video/mp4",
		"etag": "\"f38c9-fDYhFVIsMzHSEAcoUq5+SduCJUg\"",
		"mtime": "2026-11-20T11:30:34.997Z",
		"size": 997577,
		"path": "../public/karakterler/mel.mp4"
	},
	"/karakterler/fizz.mp4": {
		"type": "video/mp4",
		"etag": "\"19d180-58SRK+X6u/SVc45yPkMJpXzHPt0\"",
		"mtime": "2026-11-20T11:30:34.981Z",
		"size": 1692032,
		"path": "../public/karakterler/fizz.mp4"
	},
	"/karakterler/pizzo-ep1.mp4": {
		"type": "video/mp4",
		"etag": "\"fbf3c-EOphiEGl4MUOqkSnOl2aYLv7gzQ\"",
		"mtime": "2026-11-20T11:30:35.290Z",
		"size": 1031996,
		"path": "../public/karakterler/pizzo-ep1.mp4"
	},
	"/karakterler/nudl.mp4": {
		"type": "video/mp4",
		"etag": "\"145949-f9nUGFP9m5/OHycs0cj/WNbqXZ8\"",
		"mtime": "2026-11-20T11:30:35.206Z",
		"size": 1333577,
		"path": "../public/karakterler/nudl.mp4"
	},
	"/karakterler/pizzo.webp": {
		"type": "image/webp",
		"etag": "\"9332-b0O0rauvKGTZA1QUUSThruRdL4c\"",
		"mtime": "2026-11-20T11:30:35.451Z",
		"size": 37682,
		"path": "../public/karakterler/pizzo.webp"
	},
	"/karakterler/pop.webp": {
		"type": "image/webp",
		"etag": "\"bfb4-y7MOtPANqMMJCVIZm0D9sKzhBJc\"",
		"mtime": "2026-11-20T11:30:35.453Z",
		"size": 49076,
		"path": "../public/karakterler/pop.webp"
	},
	"/karakterler/remo.webp": {
		"type": "image/webp",
		"etag": "\"cdde-5vTp8YCmt7ZIlMB0nRHTTMsN/x0\"",
		"mtime": "2026-11-20T11:30:35.454Z",
		"size": 52702,
		"path": "../public/karakterler/remo.webp"
	},
	"/karakterler/pizzo-ep2.mp4": {
		"type": "video/mp4",
		"etag": "\"142fb7-aOJ8wzg9AQTCqBH0tJjgKU+5nvw\"",
		"mtime": "2026-11-20T11:30:35.394Z",
		"size": 1322935,
		"path": "../public/karakterler/pizzo-ep2.mp4"
	},
	"/karakterler/pizzo-ep3.mp4": {
		"type": "video/mp4",
		"etag": "\"1735fd-cEACCWVN/L7IS+tJelBAfX2jv9s\"",
		"mtime": "2026-11-20T11:30:35.446Z",
		"size": 1521149,
		"path": "../public/karakterler/pizzo-ep3.mp4"
	},
	"/karakterler/pizzo-ep4.mp4": {
		"type": "video/mp4",
		"etag": "\"10f96a-s+U25yMWMEMZIhnW/mXrMaiWhIo\"",
		"mtime": "2026-11-20T11:30:35.446Z",
		"size": 1112426,
		"path": "../public/karakterler/pizzo-ep4.mp4"
	},
	"/karakterler/pizzo.mp4": {
		"type": "video/mp4",
		"etag": "\"ea51f-SlbQlKmMpK39Ks+dy9/OpKYjiyI\"",
		"mtime": "2026-11-20T11:30:35.451Z",
		"size": 959775,
		"path": "../public/karakterler/pizzo.mp4"
	},
	"/karakterler/sok.webp": {
		"type": "image/webp",
		"etag": "\"9b38-UP7L3BY5/bdhsu2zucHjCv4u+GY\"",
		"mtime": "2026-11-20T11:30:35.494Z",
		"size": 39736,
		"path": "../public/karakterler/sok.webp"
	},
	"/karakterler/pizzo-ep5.mp4": {
		"type": "video/mp4",
		"etag": "\"13096b-tjwKNfDdPFc4wRgu+6lZnEskqc4\"",
		"mtime": "2026-11-20T11:30:35.449Z",
		"size": 1247595,
		"path": "../public/karakterler/pizzo-ep5.mp4"
	},
	"/karakterler/pop.mp4": {
		"type": "video/mp4",
		"etag": "\"12b998-pCTL1G6kpafh8pjtsjzB7HP+QL0\"",
		"mtime": "2026-11-20T11:30:35.466Z",
		"size": 1227160,
		"path": "../public/karakterler/pop.mp4"
	},
	"/karakterler/sok-ep4.mp4": {
		"type": "video/mp4",
		"etag": "\"ff4f7-UUsDfQJQ5TVp0ZhdI8DOJi/GDDY\"",
		"mtime": "2026-11-20T11:30:35.494Z",
		"size": 1045751,
		"path": "../public/karakterler/sok-ep4.mp4"
	},
	"/karakterler/sprout.webp": {
		"type": "image/webp",
		"etag": "\"9160-R+IXg/o0wS5M2CGF5fZFtNHJ9Ak\"",
		"mtime": "2026-11-20T11:30:35.498Z",
		"size": 37216,
		"path": "../public/karakterler/sprout.webp"
	},
	"/karakterler/wiff.webp": {
		"type": "image/webp",
		"etag": "\"5b20-Jh5sMxfij+HiqGSJ/voMrv5gqg8\"",
		"mtime": "2026-11-20T11:30:35.508Z",
		"size": 23328,
		"path": "../public/karakterler/wiff.webp"
	},
	"/karakterler/remo.mp4": {
		"type": "video/mp4",
		"etag": "\"150355-gBDzmbfLCzbaGHHBPrP1l23xtSQ\"",
		"mtime": "2026-11-20T11:30:35.474Z",
		"size": 1377109,
		"path": "../public/karakterler/remo.mp4"
	},
	"/karakterler/sok-ep1.mp4": {
		"type": "video/mp4",
		"etag": "\"1117ee-Lk4tTEyEanCTP0J0qqlnMfHrvqY\"",
		"mtime": "2026-11-20T11:30:35.479Z",
		"size": 1120238,
		"path": "../public/karakterler/sok-ep1.mp4"
	},
	"/karakterler/sok-ep2.mp4": {
		"type": "video/mp4",
		"etag": "\"122907-N1ppsQAhq1Iwkm9VzcXKRADtsAc\"",
		"mtime": "2026-11-20T11:30:35.486Z",
		"size": 1190151,
		"path": "../public/karakterler/sok-ep2.mp4"
	},
	"/karakterler/sok-ep3.mp4": {
		"type": "video/mp4",
		"etag": "\"108b40-BEOA0cVy07GI+75x0cocCxakGqo\"",
		"mtime": "2026-11-20T11:30:35.492Z",
		"size": 1084224,
		"path": "../public/karakterler/sok-ep3.mp4"
	},
	"/karakterler/sok.mp4": {
		"type": "video/mp4",
		"etag": "\"127707-/QTthmeHCcy5hXaIJkv2nr0WMBY\"",
		"mtime": "2026-11-20T11:30:35.510Z",
		"size": 1210119,
		"path": "../public/karakterler/sok.mp4"
	},
	"/karakterler/sok-ep5.mp4": {
		"type": "video/mp4",
		"etag": "\"105722-yZti9ojHbKnlgwgz4eugEi+D4XU\"",
		"mtime": "2026-11-20T11:30:35.506Z",
		"size": 1070882,
		"path": "../public/karakterler/sok-ep5.mp4"
	},
	"/karakterler/wiff.mp4": {
		"type": "video/mp4",
		"etag": "\"ed0b9-F6eDB+4vCsk++TQMuMEy6JDFfmg\"",
		"mtime": "2026-11-20T11:30:35.526Z",
		"size": 970937,
		"path": "../public/karakterler/wiff.mp4"
	},
	"/karakterler/sprout.mp4": {
		"type": "video/mp4",
		"etag": "\"14ffcc-q5nF6YnOwYd+LxYi4lIdw0ltK0E\"",
		"mtime": "2026-11-20T11:30:35.522Z",
		"size": 1376204,
		"path": "../public/karakterler/sprout.mp4"
	},
	"/karakterler/zizi.webp": {
		"type": "image/webp",
		"etag": "\"82e6-r0I8AxCnLh3aTMDc2E2enqhMH14\"",
		"mtime": "2026-11-20T11:30:35.558Z",
		"size": 33510,
		"path": "../public/karakterler/zizi.webp"
	},
	"/karakterler/zizi-ep1.mp4": {
		"type": "video/mp4",
		"etag": "\"12df51-nDtBZFP9l4rbpGY6WcY2d5cC7+I\"",
		"mtime": "2026-11-20T11:30:35.542Z",
		"size": 1236817,
		"path": "../public/karakterler/zizi-ep1.mp4"
	},
	"/karakterler/zizi-ep2.mp4": {
		"type": "video/mp4",
		"etag": "\"150031-iKbygUyg9xVK3KM8mAGfwbZFdkk\"",
		"mtime": "2026-11-20T11:30:35.542Z",
		"size": 1376305,
		"path": "../public/karakterler/zizi-ep2.mp4"
	},
	"/karakterler/zizi-ep4.mp4": {
		"type": "video/mp4",
		"etag": "\"1694da-JS/wsRumNNPXthuw1zbavgniv4A\"",
		"mtime": "2026-11-20T11:30:35.561Z",
		"size": 1479898,
		"path": "../public/karakterler/zizi-ep4.mp4"
	},
	"/karakterler/zizi-ep3.mp4": {
		"type": "video/mp4",
		"etag": "\"106eb9-yIdqAEz51EVPDJSgz0lhOD3pwK8\"",
		"mtime": "2026-11-20T11:30:35.550Z",
		"size": 1076921,
		"path": "../public/karakterler/zizi-ep3.mp4"
	},
	"/snooze/poster.webp": {
		"type": "image/webp",
		"etag": "\"7c2a-k2gvX2QTa1ngp1s/liIgFfMa+LA\"",
		"mtime": "2026-11-20T11:30:35.567Z",
		"size": 31786,
		"path": "../public/snooze/poster.webp"
	},
	"/snooze/ep2.mp4": {
		"type": "video/mp4",
		"etag": "\"c3408-P+86i388YRi9yKUp9ZJ2ysBNKOY\"",
		"mtime": "2026-11-20T11:30:35.566Z",
		"size": 799752,
		"path": "../public/snooze/ep2.mp4"
	},
	"/karakterler/zizi-ep5.mp4": {
		"type": "video/mp4",
		"etag": "\"149045-IhOS05OXhsCUnabySPzGjpnQkLA\"",
		"mtime": "2026-11-20T11:30:35.566Z",
		"size": 1347653,
		"path": "../public/karakterler/zizi-ep5.mp4"
	},
	"/snooze/ep4.mp4": {
		"type": "video/mp4",
		"etag": "\"fcd1a-qJjQKtsBIq3gmOnOL0e8U4e8+MU\"",
		"mtime": "2026-11-20T11:30:35.572Z",
		"size": 1035546,
		"path": "../public/snooze/ep4.mp4"
	},
	"/karakterler/zizi.mp4": {
		"type": "video/mp4",
		"etag": "\"12837e-veHvlFO1+xXpUeJ/DVhjnzE78f0\"",
		"mtime": "2026-11-20T11:30:35.562Z",
		"size": 1213310,
		"path": "../public/karakterler/zizi.mp4"
	},
	"/snooze/ep1.mp4": {
		"type": "video/mp4",
		"etag": "\"139585-sz4mXRhfwCM/49s22HypT/0YD0Y\"",
		"mtime": "2026-11-20T11:30:34.850Z",
		"size": 1283461,
		"path": "../public/snooze/ep1.mp4"
	},
	"/snooze/ep3.mp4": {
		"type": "video/mp4",
		"etag": "\"11fe5f-JO33i8LG+ZPbr+/vh22ulVPcGgM\"",
		"mtime": "2026-11-20T11:30:35.570Z",
		"size": 1179231,
		"path": "../public/snooze/ep3.mp4"
	},
	"/snooze/ep5.mp4": {
		"type": "video/mp4",
		"etag": "\"1563e5-OR5CRUfxEkbJosFosT0cjmtbjIg\"",
		"mtime": "2026-11-20T11:30:35.572Z",
		"size": 1401829,
		"path": "../public/snooze/ep5.mp4"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/.pnpm/nitro@3.0.260603-beta_drizzle-orm@0.45.4_postgres@3.4.9__jiti@2.7.0_vite@8.1.5_@types+n_9b7cb23e6c314be60587609f460b891b/node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_3YAHD5 = defineLazyEventHandler(() => import("./_chunks/renderer-template.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_3YAHD5
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/.pnpm/nitro@3.0.260603-beta_drizzle-orm@0.45.4_postgres@3.4.9__jiti@2.7.0_vite@8.1.5_@types+n_9b7cb23e6c314be60587609f460b891b/node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/.pnpm/nitro@3.0.260603-beta_drizzle-orm@0.45.4_postgres@3.4.9__jiti@2.7.0_vite@8.1.5_@types+n_9b7cb23e6c314be60587609f460b891b/node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/.pnpm/nitro@3.0.260603-beta_drizzle-orm@0.45.4_postgres@3.4.9__jiti@2.7.0_vite@8.1.5_@types+n_9b7cb23e6c314be60587609f460b891b/node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/.pnpm/nitro@3.0.260603-beta_drizzle-orm@0.45.4_postgres@3.4.9__jiti@2.7.0_vite@8.1.5_@types+n_9b7cb23e6c314be60587609f460b891b/node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
