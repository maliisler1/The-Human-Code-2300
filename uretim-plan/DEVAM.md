# Üretime yeni bir oturumda devam etme rehberi

Bu dosya, üretim başka bir Claude oturumunda (ör. iş bilgisayarı) devam ettirilirse diye hazırlandı.

## Kurallar (kullanıcının sabit istekleri)
- Türkçe yanıt; "HATA OLMASIN, KREDİ BİTMESİN".
- Anlatıcı (Hasan) sürekli anlatır, sessiz video yok. Heyecanlı yerlerde bizim sentez müziğimiz (aksiyon), her bölüm sonunda kullanıcının müziği (arac/kapanis.flac, son 21 sn).
- Dudak senkronu birebir; konuşan karakter ekranda konuşuyorsa dudak çekimi (Wan 3.0) olmalı. Anlatıcı konuşurken hiçbir karakterin ağzı oynamamalı.
- Karakter görünümü ve sesleri sabit: karakterler.md. Mony ateş kırmızısı saç. Uzak yüzlerde göz bozulması riskine dikkat (özellikle Mira 7): yüzler yakın/net olsun.
- Kapsül sayıları: karakterler.md "Kapsül durumu" bölümü. Asla 22 uyuyan deme.
- Şifre/kart/API anahtarı girme; satın alma/şart kabulü öncesi sor; force-push/rebase yok.

## Araçlar
- ElevenLabs (TTS): seslendirmeler; ses haritası karakterler.md'de (Kael = Mahmut Hoca). Geçmişten (History) indirme ücretsiz.
- MagicLight toolbox: Minimax H3 Fast (0 kredi, aynı anda 1 iş, 16:9 referans kompoziti ile; referans ilk ~4.5 sn görünür → klip 4.5 sn'den kullanılır), Wan 3.0 (dudak senkronu, görsel+ses referansı, 5 sn=630, 6 sn=770, 7 sn=910 kredi).
- Dudak sesi: replik sesinin başına 0.4 sn, sonuna 0.35 sn sessizlik eklenip assets/bXX/ altına konur, raw.githubusercontent üzerinden yüklenir.
- arac/: verify.py (replik kayma ölçümü), match.py (dudak klibi ↔ replik eşleme), gaps.py, fire.py/firevid.py (Mony saç rengi), seri.py (müzik yerleşimi), synth2.py (müzik sentezi), *.flac müzikler.
- Montaj betikleri: build5.py, build6.py, b07/build7.py (aynı yapı).

## Durum (17 Kasım 2026)
- Bölüm 1–6 yayında (assets/out). Bölüm 6'da anlatıcının "yirmi iki kapsül hâlâ uyuyordu" cümlesi (R11) "on sekiz kapsül" olarak yeniden seslendirilecek.
- Bölüm 7 "On Sekiz Kapsül": b07/lines.json (40 replik, 14 dudak), b07/broll.json (19 çekim), b07/build7.py hazır. Seslendirme ve çekim yapılmadı.

## Platform ve dizi düzeni (17 Kasım 2026 kararı)
- Uygulamanın (platformun) adı: **AI Multiverse Cinema**. "The Human Code: 2300" yalnızca dizinin adıdır; başka diziler de eklenecek.
- Play mağaza girişi bu adla incelemeye gönderildi; main'de uygulama adı değişti; 1.3.1 (versionCode 6) paketi kapalı teste yüklenecek (yükleme sertifikası 17 Kas 17:04 UTC'de geçerli oldu).
- Bölüm 7 bittikten sonra GitHub düzenlemesi: depo adı **AI-Multiverse-Cinema** olacak; dizi dosyaları `diziler/the-human-code-2300/` altına taşınacak (Lovable aktarımı, build betikleri ve yollar birlikte güncellenecek; ad değişince bölüm aktarımı test edilecek).
- **Kural:** Her yeni dizi kendi adıyla ayrı klasörde üretilir: `diziler/<dizi-adı>/` (senaryo, karakterler.md, ses/klip/montaj ve çıktılar o klasörde). Diziler birbirinin dosyalarını kullanmaz.
- Ham üretim dosyaları `uretim-ham` dalında (Actions ile ElevenLabs/MagicLight'tan alınır: uretim-plan/istek/*.json → gelen/). ElevenLabs için GitHub gizli anahtarı ELEVENLABS_API_KEY gerekir.
