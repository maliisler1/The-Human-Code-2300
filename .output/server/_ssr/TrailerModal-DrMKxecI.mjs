import { r as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { N as Captions, n as X } from "../_libs/lucide-react.mjs";
import { a as SUB_LANGS, o as SUB_NAMES } from "./AppShell-Bq0qr1oZ.mjs";
import { a as neon_hearts_default, i as elyra_poster_default, r as cyber_glitch_default } from "./data-9TLpVgmV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/TrailerModal-DrMKxecI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Hazır afişi olan diziler; diğerleri yönetici afiş yükleyene dek desenli alan gösterir. */
var BUNDLED_POSTERS = {
	"the-human-code-2300": elyra_poster_default,
	"neo-genesis-2099": elyra_poster_default,
	"cyber-glitch-ro-buster": cyber_glitch_default,
	"neon-hearts-virtual-pulse": neon_hearts_default,
	"snooze-with-tik": "/snooze/poster.webp"
};
/** Fragmanlar: video dosyaları web sitesinde (holo-heart-streams.lovable.app/trailers) barındırılır. */
var BASE = "https://holo-heart-streams.lovable.app/trailers/";
/** Yayındaki dizilerin fragmanları (slug → video). */
var SERIES_TRAILERS = {
	"the-human-code-2300": {
		video: "https://holo-heart-streams.lovable.app/trailers/thc2300_720.mp4",
		poster: "https://holo-heart-streams.lovable.app/trailers/thc2300_poster.jpg"
	},
	"snooze-with-tik": {
		video: "/snooze/ep1.mp4",
		poster: "/snooze/poster.webp"
	}
};
/** Aralık 2026 – Aralık 2027: her ay yeni bir gizemli dizi. */
var UPCOMING = [
	{
		key: "ruya-arsivi",
		titleEn: "The Dream Archive",
		video: "ruya-arsivi_720.mp4",
		poster: "ruya-arsivi_poster.jpg",
		title: "Rüya Arşivi",
		month: new Date(2026, 11, 1),
		bg: "from-indigo-950 via-violet-900 to-fuchsia-900",
		hook: {
			tr: "Rüyaların saklandığı arşivden bir rüya kaçtı.",
			en: "A dream escaped from the archive where dreams are kept."
		}
	},
	{
		key: "gezegen-hatasi",
		titleEn: "Planet Glitch",
		video: "gezegen-hatasi_720.mp4",
		poster: "gezegen-hatasi_poster.jpg",
		title: "Gezegen Hatası",
		month: new Date(2027, 0, 1),
		bg: "from-emerald-950 via-teal-900 to-cyan-900",
		hook: {
			tr: "Gökyüzünde bir çatlak açıldı. Gezegen kendini yeniden başlatıyor.",
			en: "A crack opened in the sky. The planet is rebooting."
		}
	},
	{
		key: "son-kutuphaneci",
		titleEn: "The Last Librarian",
		video: "son-kutuphaneci_720.mp4",
		poster: "son-kutuphaneci_poster.jpg",
		title: "Son Kütüphaneci",
		month: new Date(2027, 1, 1),
		bg: "from-amber-950 via-orange-900 to-stone-900",
		hook: {
			tr: "Kelimelerin yasaklandığı dünyada son kitabı koruyan kız.",
			en: "In a world where words are banned, one girl guards the last book."
		}
	},
	{
		key: "sessiz-sehir",
		titleEn: "Silent City",
		video: "sessiz-sehir_720.mp4",
		poster: "sessiz-sehir_poster.jpg",
		title: "Sessiz Şehir",
		month: new Date(2027, 2, 1),
		bg: "from-slate-950 via-slate-800 to-sky-950",
		hook: {
			tr: "Gece yarısı bütün sesler kayboldu. Geriye tek bir fısıltı kaldı.",
			en: "At midnight every sound vanished. Only one whisper remained."
		}
	},
	{
		key: "saatcinin-kizi",
		titleEn: "The Clockmaker's Daughter",
		video: "saatcinin-kizi_720.mp4",
		poster: "saatcinin-kizi_poster.jpg",
		title: "Saatçinin Kızı",
		month: new Date(2027, 3, 1),
		bg: "from-yellow-950 via-amber-800 to-rose-950",
		hook: {
			tr: "Zamanı tam 7 saniye durdurabilen bir kız.",
			en: "A girl who can stop time for exactly 7 seconds."
		}
	},
	{
		key: "derin-mavi",
		titleEn: "Deep Blue",
		video: "derin-mavi_720.mp4",
		poster: "derin-mavi_poster.jpg",
		title: "Derin Mavi",
		month: new Date(2027, 4, 1),
		bg: "from-blue-950 via-cyan-900 to-indigo-950",
		hook: {
			tr: "Okyanusun dibinden yalnız bir şarkı yükseliyor.",
			en: "A lonely song rises from the bottom of the ocean."
		}
	},
	{
		key: "aynalar-koyu",
		titleEn: "Village of Mirrors",
		video: "aynalar-koyu_720.mp4",
		poster: "aynalar-koyu_poster.jpg",
		title: "Aynalar Köyü",
		month: new Date(2027, 5, 1),
		bg: "from-zinc-900 via-purple-900 to-zinc-950",
		hook: {
			tr: "Bu köyde yansımalar yalan söyler. Bir gece biri aynadan çıktı.",
			en: "In this village reflections lie. One night, someone stepped out."
		}
	},
	{
		key: "kayip-tren",
		titleEn: "The Lost Train",
		video: "kayip-tren_720.mp4",
		poster: "kayip-tren_poster.jpg",
		title: "Kayıp Tren",
		month: new Date(2027, 6, 1),
		bg: "from-red-950 via-stone-800 to-amber-950",
		hook: {
			tr: "100 yıl önce kaybolan tren bu gece istasyona döndü.",
			en: "The train lost 100 years ago returned tonight."
		}
	},
	{
		key: "yildiz-haritasi",
		titleEn: "The Star Map",
		video: "yildiz-haritasi_720.mp4",
		poster: "yildiz-haritasi_poster.jpg",
		title: "Yıldız Haritası",
		month: new Date(2027, 7, 1),
		bg: "from-violet-950 via-indigo-900 to-blue-950",
		hook: {
			tr: "Kolundaki yıldızlar her gece yer değiştiriyor.",
			en: "The stars on her arm move every night."
		}
	},
	{
		key: "hafiza-pazari",
		titleEn: "The Memory Bazaar",
		video: "hafiza-pazari_720.mp4",
		poster: "hafiza-pazari_poster.jpg",
		title: "Hafıza Pazarı",
		month: new Date(2027, 8, 1),
		bg: "from-orange-950 via-rose-900 to-amber-900",
		hook: {
			tr: "Anıların satıldığı pazarda biri senin anını satıyor.",
			en: "At the market of memories, someone is selling yours."
		}
	},
	{
		key: "fener-bekcisi",
		titleEn: "The Lighthouse Keeper",
		video: "fener-bekcisi_720.mp4",
		poster: "fener-bekcisi_poster.jpg",
		title: "Fener Bekçisi",
		month: new Date(2027, 9, 1),
		bg: "from-sky-950 via-slate-800 to-teal-950",
		hook: {
			tr: "Yaşlı bekçi her gece başka bir yüzyıldan gemiler görüyor.",
			en: "Each night the old keeper sees ships from another century."
		}
	},
	{
		key: "kum-saati-adasi",
		titleEn: "Hourglass Island",
		video: "kum-saati-adasi_720.mp4",
		poster: "kum-saati-adasi_poster.jpg",
		title: "Kum Saati Adası",
		month: new Date(2027, 10, 1),
		bg: "from-amber-900 via-orange-800 to-cyan-950",
		hook: {
			tr: "Zamanın geriye aktığı ada. Orada kimse büyümüyor.",
			en: "An island where time flows backwards. No one grows up there."
		}
	},
	{
		key: "the-human-code-2099",
		titleEn: "The Human Code: 2099",
		video: "the-human-code-2099_720.mp4",
		poster: "the-human-code-2099_poster.jpg",
		title: "The Human Code: 2099",
		month: new Date(2027, 11, 1),
		bg: "from-fuchsia-950 via-violet-900 to-amber-900",
		hook: {
			tr: "2300'den önce… 2099 vardı. Her şeyin başladığı yıl.",
			en: "Before 2300… there was 2099. The year it all began."
		}
	}
];
var trailerUrl = (file) => BASE + file;
/** Fragman altyazıları (20 dil). Otomatik üretildi: fragman/teaser/lines.py */
var TRAILER_SUBS = {
	"ruya-arsivi": {
		"cues": [[1, 4.62], [9.9, 12.32]],
		"text": {
			"ar": ["كل حلم رأيته… تم الاحتفاظ به.", "الليلة، هرب أحدها."],
			"bn": ["তুমি যত স্বপ্ন দেখেছ… সব রাখা হয়েছিল।", "আজ রাতে, তার একটি পালিয়ে গেছে।"],
			"de": ["Jeder Traum, den du je hattest … wurde aufbewahrt.", "Heute Nacht ist einer entkommen."],
			"en": ["Every dream you have ever had… was kept.", "Tonight, one of them escaped."],
			"es": ["Cada sueño que has tenido… fue guardado.", "Esta noche, uno escapó."],
			"fr": ["Chaque rêve que tu as fait… a été conservé.", "Cette nuit, l'un d'eux s'est échappé."],
			"hi": ["तुमने जो भी सपना देखा… वह सहेजा गया।", "आज रात, उनमें से एक भाग निकला।"],
			"id": ["Setiap mimpi yang pernah kau alami… disimpan.", "Malam ini, salah satunya kabur."],
			"it": ["Ogni sogno che hai fatto… è stato custodito.", "Stanotte, uno è fuggito."],
			"ja": ["あなたが見た夢はすべて…保管されていた。", "今夜、そのひとつが逃げ出した。"],
			"ko": ["당신이 꾼 모든 꿈은… 보관되어 있었다.", "오늘 밤, 그중 하나가 달아났다."],
			"mr": ["तू पाहिलेलं प्रत्येक स्वप्न… जपून ठेवलं गेलं.", "आज रात्री, त्यातलं एक पळून गेलं."],
			"pt": ["Cada sonho que você já teve… foi guardado.", "Esta noite, um deles escapou."],
			"ru": ["Каждый твой сон… был сохранён.", "Этой ночью один из них сбежал."],
			"ta": ["நீ கண்ட ஒவ்வொரு கனவும்… பாதுகாக்கப்பட்டது.", "இன்றிரவு, அவற்றில் ஒன்று தப்பியது."],
			"te": ["నువ్వు కన్న ప్రతి కల… దాచబడింది.", "ఈ రాత్రి, వాటిలో ఒకటి తప్పించుకుంది."],
			"tr": ["Gördüğün her rüya… saklandı.", "Bu gece, biri kaçtı."],
			"ur": ["تم نے جو بھی خواب دیکھا… وہ محفوظ کیا گیا۔", "آج رات، ان میں سے ایک فرار ہو گیا۔"],
			"vi": ["Mọi giấc mơ bạn từng có… đều được cất giữ.", "Đêm nay, một giấc mơ đã trốn thoát."],
			"zh": ["你做过的每一个梦……都被保存了下来。", "今晚，其中一个逃走了。"]
		}
	},
	"gezegen-hatasi": {
		"cues": [[1, 3.26], [9.9, 12.89]],
		"text": {
			"ar": ["السماء تتشقق.", "والعالم بدأ ينسى نفسه."],
			"bn": ["আকাশে ফাটল ধরছে।", "আর পৃথিবী নিজেকে ভুলে যেতে শুরু করেছে।"],
			"de": ["Der Himmel bekommt Risse.", "Und die Welt beginnt, sich selbst zu vergessen."],
			"en": ["The sky is cracking.", "And the world is starting to forget itself."],
			"es": ["El cielo se está agrietando.", "Y el mundo empieza a olvidarse de sí mismo."],
			"fr": ["Le ciel se fissure.", "Et le monde commence à s'oublier."],
			"hi": ["आसमान में दरारें पड़ रही हैं।", "और दुनिया खुद को भूलने लगी है।"],
			"id": ["Langit mulai retak.", "Dan dunia mulai melupakan dirinya sendiri."],
			"it": ["Il cielo si sta incrinando.", "E il mondo comincia a dimenticare se stesso."],
			"ja": ["空がひび割れていく。", "そして世界は自分を忘れ始める。"],
			"ko": ["하늘이 갈라지고 있다.", "그리고 세상은 스스로를 잊기 시작한다."],
			"mr": ["आकाशाला तडे जात आहेत.", "आणि जग स्वतःलाच विसरू लागलं आहे."],
			"pt": ["O céu está rachando.", "E o mundo começa a esquecer de si mesmo."],
			"ru": ["Небо трескается.", "И мир начинает забывать сам себя."],
			"ta": ["வானம் விரிசல் விடுகிறது.", "உலகம் தன்னையே மறக்கத் தொடங்குகிறது."],
			"te": ["ఆకాశం పగుళ్లు చీలుతోంది.", "ప్రపంచం తనను తానే మర్చిపోవడం మొదలుపెట్టింది."],
			"tr": ["Gökyüzü çatlıyor.", "Ve dünya kendini unutmaya başlıyor."],
			"ur": ["آسمان میں دراڑیں پڑ رہی ہیں۔", "اور دنیا خود کو بھولنے لگی ہے۔"],
			"vi": ["Bầu trời đang nứt vỡ.", "Và thế giới bắt đầu quên chính mình."],
			"zh": ["天空正在破裂。", "世界开始遗忘自己。"]
		}
	},
	"son-kutuphaneci": {
		"cues": [[1, 4.07], [9.9, 11.77]],
		"text": {
			"ar": ["لقد محوا كل كلمة من العالم.", "إلا كتابًا واحدًا."],
			"bn": ["তারা পৃথিবী থেকে সব শব্দ মুছে দিয়েছে।", "শুধু একটি বই ছাড়া।"],
			"de": ["Sie haben jedes Wort aus der Welt gelöscht.", "Bis auf ein Buch."],
			"en": ["They erased every word from the world.", "Except one book."],
			"es": ["Borraron todas las palabras del mundo.", "Excepto un libro."],
			"fr": ["Ils ont effacé tous les mots du monde.", "Sauf un livre."],
			"hi": ["उन्होंने दुनिया से हर शब्द मिटा दिया।", "एक किताब को छोड़कर।"],
			"id": ["Mereka menghapus setiap kata dari dunia.", "Kecuali satu buku."],
			"it": ["Hanno cancellato ogni parola dal mondo.", "Tranne un libro."],
			"ja": ["世界から言葉がすべて消された。", "一冊の本を除いて。"],
			"ko": ["그들은 세상에서 모든 단어를 지웠다.", "단 한 권의 책만 빼고."],
			"mr": ["त्यांनी जगातून प्रत्येक शब्द पुसून टाकला.", "एका पुस्तकाशिवाय."],
			"pt": ["Apagaram todas as palavras do mundo.", "Exceto um livro."],
			"ru": ["Они стёрли из мира все слова.", "Кроме одной книги."],
			"ta": ["உலகிலிருந்து எல்லா வார்த்தைகளையும் அழித்தார்கள்.", "ஒரு புத்தகத்தைத் தவிர."],
			"te": ["వారు ప్రపంచం నుండి ప్రతి పదాన్నీ చెరిపేశారు.", "ఒక్క పుస్తకం తప్ప."],
			"tr": ["Dünyadaki bütün kelimeleri sildiler.", "Bir kitap hariç."],
			"ur": ["انہوں نے دنیا سے ہر لفظ مٹا دیا۔", "سوائے ایک کتاب کے۔"],
			"vi": ["Họ đã xóa mọi con chữ khỏi thế giới.", "Trừ một cuốn sách."],
			"zh": ["他们抹去了世上所有的文字。", "只剩下一本书。"]
		}
	},
	"sessiz-sehir": {
		"cues": [[1, 4.23], [9.9, 12.32]],
		"text": {
			"ar": ["عند منتصف الليل، تتوقف المدينة كلها.", "وحده يستطيع سماع ما تبقى."],
			"bn": ["মাঝরাতে পুরো শহর থেমে যায়।", "যা বাকি থাকে, শুধু সে-ই শুনতে পায়।"],
			"de": ["Um Mitternacht steht die ganze Stadt still.", "Nur er hört, was übrig bleibt."],
			"en": ["At midnight, the whole city stops.", "Only he can hear what's left."],
			"es": ["A medianoche, toda la ciudad se detiene.", "Solo él puede oír lo que queda."],
			"fr": ["À minuit, toute la ville s'arrête.", "Lui seul entend ce qui reste."],
			"hi": ["आधी रात को पूरा शहर थम जाता है।", "जो बचा है, उसे सिर्फ़ वही सुन सकता है।"],
			"id": ["Tengah malam, seluruh kota berhenti.", "Hanya dia yang bisa mendengar sisanya."],
			"it": ["A mezzanotte, l'intera città si ferma.", "Solo lui sente ciò che resta."],
			"ja": ["真夜中、街のすべてが止まる。", "残された音を聞けるのは彼だけ。"],
			"ko": ["자정이 되면, 도시 전체가 멈춘다.", "남은 소리를 들을 수 있는 건 그뿐이다."],
			"mr": ["मध्यरात्री संपूर्ण शहर थांबतं.", "जे उरलंय, ते फक्त त्यालाच ऐकू येतं."],
			"pt": ["À meia-noite, a cidade inteira para.", "Só ele consegue ouvir o que resta."],
			"ru": ["В полночь весь город замирает.", "Только он слышит то, что осталось."],
			"ta": ["நள்ளிரவில் முழு நகரமும் நின்றுவிடுகிறது.", "மீதமிருப்பதை அவன் மட்டுமே கேட்க முடியும்."],
			"te": ["అర్ధరాత్రి నగరమంతా ఆగిపోతుంది.", "మిగిలినది అతను మాత్రమే వినగలడు."],
			"tr": ["Gece yarısı bütün şehir durur.", "Geriye kalanı sadece o duyabilir."],
			"ur": ["آدھی رات کو پورا شہر رک جاتا ہے۔", "جو باقی ہے، اسے صرف وہی سن سکتا ہے۔"],
			"vi": ["Lúc nửa đêm, cả thành phố ngừng lại.", "Chỉ cậu ấy nghe được những gì còn sót lại."],
			"zh": ["午夜时分，整座城市静止了。", "只有他能听见剩下的声音。"]
		}
	},
	"saatcinin-kizi": {
		"cues": [[1, 4.15], [9.9, 12.32]],
		"text": {
			"ar": ["تستطيع إيقاف الزمن بإصبع واحد.", "لكن هناك من يريد إيقافها."],
			"bn": ["সে এক আঙুলে সময় থামিয়ে দিতে পারে।", "কিন্তু কেউ তাকে থামাতে চায়।"],
			"de": ["Sie kann die Zeit mit einem Finger anhalten.", "Doch jemand will sie aufhalten."],
			"en": ["She can stop time with a single finger.", "But someone wants to stop her."],
			"es": ["Puede detener el tiempo con un solo dedo.", "Pero alguien quiere detenerla a ella."],
			"fr": ["Elle peut arrêter le temps d'un seul doigt.", "Mais quelqu'un veut l'arrêter."],
			"hi": ["वह एक उंगली से समय रोक सकती है।", "लेकिन कोई उसे रोकना चाहता है।"],
			"id": ["Dia bisa menghentikan waktu dengan satu jari.", "Tapi seseorang ingin menghentikannya."],
			"it": ["Può fermare il tempo con un solo dito.", "Ma qualcuno vuole fermare lei."],
			"ja": ["彼女は指一本で時間を止められる。", "だが、誰かが彼女を止めようとしている。"],
			"ko": ["그녀는 손가락 하나로 시간을 멈출 수 있다.", "하지만 누군가 그녀를 막으려 한다."],
			"mr": ["ती एका बोटाने वेळ थांबवू शकते.", "पण कोणीतरी तिला थांबवू पाहतंय."],
			"pt": ["Ela pode parar o tempo com um único dedo.", "Mas alguém quer pará-la."],
			"ru": ["Она может остановить время одним пальцем.", "Но кто-то хочет остановить её."],
			"ta": ["ஒரு விரலால் அவள் நேரத்தை நிறுத்த முடியும்.", "ஆனால் யாரோ அவளை நிறுத்த நினைக்கிறார்கள்."],
			"te": ["ఆమె ఒక్క వేలితో కాలాన్ని ఆపగలదు.", "కానీ ఎవరో ఆమెను ఆపాలనుకుంటున్నారు."],
			"tr": ["Zamanı tek parmağıyla durdurabiliyor.", "Ama biri onu durdurmak istiyor."],
			"ur": ["وہ ایک انگلی سے وقت روک سکتی ہے۔", "لیکن کوئی اسے روکنا چاہتا ہے۔"],
			"vi": ["Cô bé có thể dừng thời gian bằng một ngón tay.", "Nhưng có kẻ muốn ngăn cô lại."],
			"zh": ["她只用一根手指就能让时间停止。", "但有人想阻止她。"]
		}
	},
	"derin-mavi": {
		"cues": [[1, 3.18], [9.9, 12.16]],
		"text": {
			"ar": ["هناك حيث ينتهي الضوء…", "…شيء ما يغني."],
			"bn": ["যেখানে আলো শেষ হয়…", "…কিছু একটা গান গাইছে।"],
			"de": ["Dort, wo das Licht endet …", "… singt etwas."],
			"en": ["Down where the light ends…", "…something is singing."],
			"es": ["Allí donde termina la luz…", "…algo está cantando."],
			"fr": ["Là où la lumière s'éteint…", "…quelque chose chante."],
			"hi": ["वहाँ, जहाँ रोशनी ख़त्म होती है…", "…कुछ गा रहा है।"],
			"id": ["Di tempat cahaya berakhir…", "…sesuatu sedang bernyanyi."],
			"it": ["Laggiù, dove finisce la luce…", "…qualcosa sta cantando."],
			"ja": ["光の届かない深みで…", "…何かが歌っている。"],
			"ko": ["빛이 끝나는 깊은 곳에서…", "…무언가가 노래하고 있다."],
			"mr": ["तिथे, जिथे प्रकाश संपतो…", "…काहीतरी गात आहे."],
			"pt": ["Lá onde a luz termina…", "…algo está cantando."],
			"ru": ["Там, где кончается свет…", "…что-то поёт."],
			"ta": ["ஒளி முடியும் ஆழத்தில்…", "…ஏதோ பாடுகிறது."],
			"te": ["వెలుగు ముగిసే చోట…", "…ఏదో పాడుతోంది."],
			"tr": ["Işığın bittiği yerde…", "…bir şey şarkı söylüyor."],
			"ur": ["وہاں، جہاں روشنی ختم ہوتی ہے…", "…کچھ گا رہا ہے۔"],
			"vi": ["Nơi ánh sáng tắt dần…", "…có thứ gì đó đang hát."],
			"zh": ["在光芒消失的深处……", "……有什么在歌唱。"]
		}
	},
	"aynalar-koyu": {
		"cues": [[1, 4.62], [9.9, 12.55]],
		"text": {
			"ar": ["في هذه القرية، لكل مرآة سر.", "الليلة، ابتسمت لها مرآتها."],
			"bn": ["এই গ্রামে প্রতিটি আয়নার একটি রহস্য আছে।", "আজ রাতে, তার আয়না তার দিকে হাসল।"],
			"de": ["In diesem Dorf hat jeder Spiegel ein Geheimnis.", "Heute Nacht lächelte ihrer zurück."],
			"en": ["In this village, every mirror has a secret.", "Tonight, hers smiled back."],
			"es": ["En este pueblo, cada espejo guarda un secreto.", "Esta noche, el suyo le sonrió."],
			"fr": ["Dans ce village, chaque miroir cache un secret.", "Cette nuit, le sien lui a souri."],
			"hi": ["इस गाँव में हर आईने का एक राज़ है।", "आज रात, उसका आईना उसे देखकर मुस्कुराया।"],
			"id": ["Di desa ini, setiap cermin menyimpan rahasia.", "Malam ini, cerminnya tersenyum padanya."],
			"it": ["In questo villaggio, ogni specchio ha un segreto.", "Stanotte, il suo le ha sorriso."],
			"ja": ["この村では、どの鏡にも秘密がある。", "今夜、彼女の鏡が微笑み返した。"],
			"ko": ["이 마을의 모든 거울에는 비밀이 있다.", "오늘 밤, 그녀의 거울이 미소 지었다."],
			"mr": ["या गावात प्रत्येक आरशाचं एक रहस्य आहे.", "आज रात्री, तिचा आरसा तिच्याकडे पाहून हसला."],
			"pt": ["Nesta vila, cada espelho guarda um segredo.", "Esta noite, o dela sorriu de volta."],
			"ru": ["В этой деревне у каждого зеркала есть тайна.", "Этой ночью её отражение улыбнулось ей."],
			"ta": ["இந்த கிராமத்தில் ஒவ்வொரு கண்ணாடிக்கும் ஒரு ரகசியம் உண்டு.", "இன்றிரவு, அவளின் கண்ணாடி அவளைப் பார்த்துச் சிரித்தது."],
			"te": ["ఈ గ్రామంలో ప్రతి అద్దానికీ ఒక రహస్యం ఉంది.", "ఈ రాత్రి, ఆమె అద్దం ఆమెను చూసి నవ్వింది."],
			"tr": ["Bu köyde her aynanın bir sırrı var.", "Bu gece, onunki ona gülümsedi."],
			"ur": ["اس گاؤں میں ہر آئینے کا ایک راز ہے۔", "آج رات، اس کا آئینہ اسے دیکھ کر مسکرایا۔"],
			"vi": ["Ở ngôi làng này, mỗi tấm gương đều có bí mật.", "Đêm nay, tấm gương mỉm cười với cô."],
			"zh": ["在这个村子里，每面镜子都藏着秘密。", "今晚，她的镜子对她笑了。"]
		}
	},
	"kayip-tren": {
		"cues": [[1, 4.15], [9.9, 12.16]],
		"text": {
			"ar": ["اختفى قطار قبل مئة عام.", "الليلة، عاد."],
			"bn": ["একশো বছর আগে একটি ট্রেন হারিয়ে গিয়েছিল।", "আজ রাতে, সেটি ফিরে এসেছে।"],
			"de": ["Vor hundert Jahren verschwand ein Zug.", "Heute Nacht ist er zurückgekehrt."],
			"en": ["A train vanished one hundred years ago.", "Tonight, it came back."],
			"es": ["Un tren desapareció hace cien años.", "Esta noche, ha vuelto."],
			"fr": ["Un train a disparu il y a cent ans.", "Cette nuit, il est revenu."],
			"hi": ["सौ साल पहले एक ट्रेन गायब हो गई थी।", "आज रात, वह लौट आई।"],
			"id": ["Seratus tahun lalu, sebuah kereta menghilang.", "Malam ini, kereta itu kembali."],
			"it": ["Un treno è scomparso cento anni fa.", "Stanotte è tornato."],
			"ja": ["百年前、一本の列車が消えた。", "今夜、それが帰ってきた。"],
			"ko": ["백 년 전, 기차 한 대가 사라졌다.", "오늘 밤, 그 기차가 돌아왔다."],
			"mr": ["शंभर वर्षांपूर्वी एक ट्रेन गायब झाली.", "आज रात्री, ती परत आली."],
			"pt": ["Um trem desapareceu há cem anos.", "Esta noite, ele voltou."],
			"ru": ["Сто лет назад исчез поезд.", "Этой ночью он вернулся."],
			"ta": ["நூறு ஆண்டுகளுக்கு முன் ஒரு ரயில் மறைந்தது.", "இன்றிரவு, அது திரும்பி வந்தது."],
			"te": ["వంద సంవత్సరాల క్రితం ఒక రైలు మాయమైంది.", "ఈ రాత్రి, అది తిరిగి వచ్చింది."],
			"tr": ["Yüz yıl önce bir tren kayboldu.", "Bu gece geri döndü."],
			"ur": ["سو سال پہلے ایک ٹرین غائب ہو گئی تھی۔", "آج رات، وہ واپس آ گئی۔"],
			"vi": ["Một trăm năm trước, một đoàn tàu biến mất.", "Đêm nay, nó đã trở lại."],
			"zh": ["一百年前，一列火车消失了。", "今晚，它回来了。"]
		}
	},
	"yildiz-haritasi": {
		"cues": [[1, 4.07], [9.9, 12.63]],
		"text": {
			"ar": ["وُلدت بخريطة للنجوم.", "والآن النجوم تناديها إلى الديار."],
			"bn": ["সে তারার মানচিত্র নিয়ে জন্মেছিল।", "এখন তারারা তাকে ঘরে ডাকছে।"],
			"de": ["Sie wurde mit einer Sternenkarte geboren.", "Jetzt rufen die Sterne sie nach Hause."],
			"en": ["She was born with a map of the stars.", "Now the stars are calling her home."],
			"es": ["Nació con un mapa de las estrellas.", "Ahora las estrellas la llaman a casa."],
			"fr": ["Elle est née avec une carte des étoiles.", "Maintenant, les étoiles l'appellent."],
			"hi": ["वह तारों का नक्शा लेकर पैदा हुई थी।", "अब तारे उसे घर बुला रहे हैं।"],
			"id": ["Dia lahir dengan peta bintang.", "Kini bintang-bintang memanggilnya pulang."],
			"it": ["È nata con una mappa delle stelle.", "Ora le stelle la chiamano a casa."],
			"ja": ["彼女は星の地図を持って生まれた。", "今、星たちが彼女を呼んでいる。"],
			"ko": ["그녀는 별의 지도를 지닌 채 태어났다.", "이제 별들이 그녀를 집으로 부른다."],
			"mr": ["ती ताऱ्यांचा नकाशा घेऊन जन्मली.", "आता तारे तिला घरी बोलावत आहेत."],
			"pt": ["Ela nasceu com um mapa das estrelas.", "Agora as estrelas a chamam para casa."],
			"ru": ["Она родилась с картой звёзд.", "Теперь звёзды зовут её домой."],
			"ta": ["அவள் நட்சத்திர வரைபடத்துடன் பிறந்தாள்.", "இப்போது நட்சத்திரங்கள் அவளை வீட்டுக்கு அழைக்கின்றன."],
			"te": ["ఆమె నక్షత్రాల పటంతో పుట్టింది.", "ఇప్పుడు నక్షత్రాలు ఆమెను ఇంటికి పిలుస్తున్నాయి."],
			"tr": ["Yıldızların haritasıyla doğdu.", "Şimdi yıldızlar onu eve çağırıyor."],
			"ur": ["وہ ستاروں کا نقشہ لے کر پیدا ہوئی تھی۔", "اب ستارے اسے گھر بلا رہے ہیں۔"],
			"vi": ["Cô bé sinh ra với tấm bản đồ sao.", "Giờ đây các vì sao gọi cô về nhà."],
			"zh": ["她生来就带着一张星图。", "如今，星星在召唤她回家。"]
		}
	},
	"hafiza-pazari": {
		"cues": [[1, 4.38], [9.9, 12.08]],
		"text": {
			"ar": ["في هذا السوق، تُباع الذكريات.", "وإحداها ذكراه هو."],
			"bn": ["এই বাজারে স্মৃতি বিক্রি হয়।", "আর তার একটি তার নিজের।"],
			"de": ["Auf diesem Markt werden Erinnerungen verkauft.", "Und eine davon ist seine."],
			"en": ["In this market, memories are for sale.", "And one of them is his."],
			"es": ["En este mercado se venden recuerdos.", "Y uno de ellos es suyo."],
			"fr": ["Sur ce marché, on vend des souvenirs.", "Et l'un d'eux est le sien."],
			"hi": ["इस बाज़ार में यादें बिकती हैं।", "और उनमें से एक उसकी है।"],
			"id": ["Di pasar ini, kenangan dijual.", "Dan salah satunya miliknya."],
			"it": ["In questo mercato si vendono ricordi.", "E uno di questi è suo."],
			"ja": ["この市場では、記憶が売られている。", "そのひとつは、彼のものだった。"],
			"ko": ["이 시장에서는 기억을 판다.", "그리고 그중 하나는 그의 것이다."],
			"mr": ["या बाजारात आठवणी विकल्या जातात.", "आणि त्यातली एक त्याची आहे."],
			"pt": ["Neste mercado, memórias estão à venda.", "E uma delas é dele."],
			"ru": ["На этом рынке продают воспоминания.", "И одно из них — его."],
			"ta": ["இந்த சந்தையில் நினைவுகள் விற்கப்படுகின்றன.", "அவற்றில் ஒன்று அவனுடையது."],
			"te": ["ఈ బజారులో జ్ఞాపకాలు అమ్ముతారు.", "వాటిలో ఒకటి అతనిది."],
			"tr": ["Bu pazarda anılar satılık.", "Ve biri onun."],
			"ur": ["اس بازار میں یادیں بکتی ہیں۔", "اور ان میں سے ایک اس کی ہے۔"],
			"vi": ["Ở khu chợ này, ký ức được rao bán.", "Và một trong số đó là của cậu ấy."],
			"zh": ["在这个集市上，记忆可以买卖。", "其中一段是他的。"]
		}
	},
	"fener-bekcisi": {
		"cues": [[1, 4.85], [9.9, 13.2]],
		"text": {
			"ar": ["لمئة عام، أرشد هذا الضوء السفن إلى الديار.", "الليلة، نادى سفنًا من أزمنة أخرى."],
			"bn": ["একশো বছর ধরে এই আলো জাহাজদের ঘরে ফিরিয়েছে।", "আজ রাতে, এটি অন্য সময়ের জাহাজ ডেকে আনল।"],
			"de": ["Hundert Jahre lang führte dieses Licht Schiffe heim.", "Heute Nacht rief es Schiffe aus anderen Zeiten."],
			"en": ["For a hundred years, this light guided ships home.", "Tonight, it called ships from other times."],
			"es": ["Durante cien años, esta luz guió a los barcos a casa.", "Esta noche llamó a barcos de otros tiempos."],
			"fr": ["Pendant cent ans, cette lumière a guidé les navires.", "Cette nuit, elle a appelé des navires d'autres temps."],
			"hi": ["सौ साल तक इस रोशनी ने जहाज़ों को घर पहुँचाया।", "आज रात, इसने दूसरे समय के जहाज़ों को बुलाया।"],
			"id": ["Seratus tahun cahaya ini menuntun kapal pulang.", "Malam ini, ia memanggil kapal dari masa lain."],
			"it": ["Per cento anni questa luce ha guidato le navi a casa.", "Stanotte ha chiamato navi da altri tempi."],
			"ja": ["百年間、この光は船を故郷へ導いてきた。", "今夜、別の時代の船を呼び寄せた。"],
			"ko": ["백 년 동안 이 빛은 배들을 집으로 이끌었다.", "오늘 밤, 다른 시대의 배들을 불러냈다."],
			"mr": ["शंभर वर्षं या प्रकाशाने जहाजांना घरी आणलं.", "आज रात्री, त्याने दुसऱ्या काळातील जहाजं बोलावली."],
			"pt": ["Por cem anos, esta luz guiou navios para casa.", "Esta noite, chamou navios de outros tempos."],
			"ru": ["Сто лет этот свет вёл корабли домой.", "Этой ночью он позвал корабли из других времён."],
			"ta": ["நூறு ஆண்டுகள் இந்த ஒளி கப்பல்களை வீடு சேர்த்தது.", "இன்றிரவு, அது வேறு காலத்துக் கப்பல்களை அழைத்தது."],
			"te": ["వంద ఏళ్లుగా ఈ వెలుగు ఓడలను ఇంటికి చేర్చింది.", "ఈ రాత్రి, అది వేరే కాలాల ఓడలను పిలిచింది."],
			"tr": ["Yüz yıl boyunca bu ışık gemileri eve getirdi.", "Bu gece başka zamanlardan gemiler çağırdı."],
			"ur": ["سو سال تک اس روشنی نے جہازوں کو گھر پہنچایا۔", "آج رات، اس نے دوسرے زمانوں کے جہاز بلائے۔"],
			"vi": ["Suốt trăm năm, ngọn đèn này dẫn tàu về nhà.", "Đêm nay, nó gọi những con tàu từ thời đại khác."],
			"zh": ["一百年来，这道光指引船只回家。", "今晚，它召唤来了其他时代的船。"]
		}
	},
	"kum-saati-adasi": {
		"cues": [[1, 4.38], [9.9, 12.47]],
		"text": {
			"ar": ["في هذه الجزيرة، يجري الزمن إلى الوراء.", "والساعة الرملية تتحطم."],
			"bn": ["এই দ্বীপে সময় উল্টো দিকে বয়।", "আর বালিঘড়িটি ভেঙে যাচ্ছে।"],
			"de": ["Auf dieser Insel fließt die Zeit rückwärts.", "Und die Sanduhr zerbricht."],
			"en": ["On this island, time flows backwards.", "And the hourglass is breaking."],
			"es": ["En esta isla, el tiempo fluye hacia atrás.", "Y el reloj de arena se está rompiendo."],
			"fr": ["Sur cette île, le temps s'écoule à l'envers.", "Et le sablier se brise."],
			"hi": ["इस द्वीप पर समय उल्टा बहता है।", "और रेतघड़ी टूट रही है।"],
			"id": ["Di pulau ini, waktu mengalir mundur.", "Dan jam pasirnya mulai pecah."],
			"it": ["Su quest'isola il tempo scorre all'indietro.", "E la clessidra si sta rompendo."],
			"ja": ["この島では、時間が逆に流れる。", "そして砂時計が壊れかけている。"],
			"ko": ["이 섬에서는 시간이 거꾸로 흐른다.", "그리고 모래시계가 부서지고 있다."],
			"mr": ["या बेटावर वेळ उलटी वाहते.", "आणि वाळूचं घड्याळ तुटत आहे."],
			"pt": ["Nesta ilha, o tempo corre para trás.", "E a ampulheta está se quebrando."],
			"ru": ["На этом острове время течёт вспять.", "И песочные часы ломаются."],
			"ta": ["இந்தத் தீவில் காலம் பின்னோக்கி ஓடுகிறது.", "மணற்கடிகாரம் உடைந்து கொண்டிருக்கிறது."],
			"te": ["ఈ దీవిలో కాలం వెనక్కి ప్రవహిస్తుంది.", "ఇసుక గడియారం విరిగిపోతోంది."],
			"tr": ["Bu adada zaman geriye akıyor.", "Ve kum saati kırılıyor."],
			"ur": ["اس جزیرے پر وقت الٹا بہتا ہے۔", "اور ریت گھڑی ٹوٹ رہی ہے۔"],
			"vi": ["Trên hòn đảo này, thời gian chảy ngược.", "Và chiếc đồng hồ cát đang vỡ."],
			"zh": ["在这座岛上，时间倒流。", "而沙漏正在碎裂。"]
		}
	},
	"the-human-code-2099": {
		"cues": [[1, 4.46], [9.9, 14.17]],
		"text": {
			"ar": ["ثلاثة وعشرون نائمًا. فرصة أخيرة.", "قبل 2300… كان هناك 2099."],
			"bn": ["তেইশজন ঘুমন্ত মানুষ। শেষ সুযোগ।", "2300-এর আগে… ছিল 2099।"],
			"de": ["Dreiundzwanzig Schläfer. Eine letzte Chance.", "Vor 2300 … gab es 2099."],
			"en": ["Twenty-three sleepers. One last chance.", "Before 2300… there was 2099."],
			"es": ["Veintitrés durmientes. Una última oportunidad.", "Antes de 2300… existió 2099."],
			"fr": ["Vingt-trois dormeurs. Une dernière chance.", "Avant 2300… il y avait 2099."],
			"hi": ["तेईस सोए हुए लोग। आख़िरी मौका।", "2300 से पहले… 2099 था।"],
			"id": ["Dua puluh tiga orang tertidur. Satu kesempatan terakhir.", "Sebelum 2300… ada 2099."],
			"it": ["Ventitré dormienti. Un'ultima possibilità.", "Prima del 2300… c'era il 2099."],
			"ja": ["二十三人の眠る者。最後のチャンス。", "2300年の前に…2099年があった。"],
			"ko": ["스물세 명의 잠든 자들. 마지막 기회.", "2300년 이전에… 2099년이 있었다."],
			"mr": ["तेवीस झोपलेले लोक. शेवटची संधी.", "2300 च्या आधी… 2099 होतं."],
			"pt": ["Vinte e três adormecidos. Uma última chance.", "Antes de 2300… existiu 2099."],
			"ru": ["Двадцать три спящих. Последний шанс.", "До 2300-го… был 2099-й."],
			"ta": ["இருபத்து மூன்று உறங்குபவர்கள். கடைசி வாய்ப்பு.", "2300-க்கு முன்… 2099 இருந்தது."],
			"te": ["ఇరవై మూడు మంది నిద్రిస్తున్నవారు. చివరి అవకాశం.", "2300 కి ముందు… 2099 ఉంది."],
			"tr": ["Yirmi üç uyuyan. Son bir şans.", "2300'den önce… 2099 vardı."],
			"ur": ["تئیس سوئے ہوئے لوگ۔ آخری موقع۔", "2300 سے پہلے… 2099 تھا۔"],
			"vi": ["Hai mươi ba người say ngủ. Cơ hội cuối cùng.", "Trước năm 2300… đã có năm 2099."],
			"zh": ["二十三名沉睡者。最后一次机会。", "在2300年之前……是2099年。"]
		}
	}
};
/** Tam ekran fragman oynatıcı (sesli). subsKey verilirse 20 dilde altyazı gösterir. */
function TrailerModal({ src, poster, title, subsKey, defaultLang = "tr", vertical, onEnded, onClose }) {
	const subs = subsKey ? TRAILER_SUBS[subsKey] : void 0;
	const [lang, setLang] = (0, import_react.useState)(SUB_LANGS.includes(defaultLang) ? defaultLang : "en");
	const [menu, setMenu] = (0, import_react.useState)(false);
	const [time, setTime] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const k = (e) => e.key === "Escape" && onClose();
		window.addEventListener("keydown", k);
		return () => window.removeEventListener("keydown", k);
	}, [onClose]);
	let line = "";
	if (subs && lang !== "off") {
		const i = subs.cues.findIndex(([a, b]) => time >= a && time <= b);
		if (i >= 0) line = (subs.text[lang] ?? subs.text["en"] ?? [])[i] ?? "";
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/95 p-3",
		role: "dialog",
		"aria-label": title,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: onClose,
				className: "absolute right-4 top-[max(1rem,env(safe-area-inset-top))] rounded-full glass p-2",
				"aria-label": "close",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-6 w-6" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-center font-display text-lg text-gold",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: vertical ? "relative h-[78vh] max-w-full aspect-[9/16]" : "relative w-full max-w-3xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					src,
					poster,
					controls: true,
					autoPlay: true,
					playsInline: true,
					className: vertical ? "h-full w-full rounded-xl bg-black object-contain" : "aspect-video w-full rounded-xl bg-black",
					onTimeUpdate: (e) => setTime(e.currentTarget.currentTime),
					onEnded: onEnded ?? onClose
				}, src), line && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					dir: lang === "ar" || lang === "ur" ? "rtl" : "ltr",
					className: "pointer-events-none absolute inset-x-4 bottom-14 text-center text-sm font-semibold leading-snug text-white [text-shadow:0_1px_3px_#000,0_0_8px_#000] sm:text-lg",
					children: line
				})]
			}),
			subs && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setMenu((m) => !m),
					className: "flex items-center gap-2 rounded-full glass px-4 py-2 text-sm",
					"aria-label": "subtitles",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Captions, { className: "h-4 w-4 text-gold" }),
						" ",
						lang === "off" ? "—" : SUB_NAMES[lang]
					]
				}), menu && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute bottom-12 left-1/2 max-h-72 w-52 -translate-x-1/2 overflow-y-auto rounded-xl border border-primary/30 bg-card p-1 shadow-xl",
					children: ["off", ...SUB_LANGS].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							setLang(l);
							setMenu(false);
						},
						className: `block w-full rounded-lg px-3 py-1.5 text-start text-sm ${l === lang ? "bg-primary/20 text-gold" : "hover:bg-white/5"}`,
						children: l === "off" ? "Off / Kapalı" : SUB_NAMES[l]
					}, l))
				})]
			})
		]
	});
}
//#endregion
export { trailerUrl as a, UPCOMING as i, SERIES_TRAILERS as n, TrailerModal as r, BUNDLED_POSTERS as t };
