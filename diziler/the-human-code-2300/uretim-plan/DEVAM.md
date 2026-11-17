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
- Dudak sesi: replik sesinin başına 0.4 sn, sonuna 0.35 sn sessizlik eklenip diziler/the-human-code-2300/assets/bXX/ altına konur, raw.githubusercontent üzerinden yüklenir.
- arac/: verify.py (replik kayma ölçümü), match.py (dudak klibi ↔ replik eşleme), gaps.py, fire.py/firevid.py (Mony saç rengi), seri.py (müzik yerleşimi), synth2.py (müzik sentezi), *.flac müzikler.
- Montaj betikleri: build5.py, build6.py, b07/build7.py (aynı yapı).

## Durum (17 Kasım 2026)
- Bölüm 1–6 yayında (diziler/the-human-code-2300/assets/out). Bölüm 6 R11 "on sekiz kapsül" olarak düzeltildi (17 Kas; Whisper ile doğrulandı).
- Bölüm 7 "On Sekiz Kapsül" YAYINDA (17 Kas): diziler/the-human-code-2300/assets/out/Bolum7_On_Sekiz_Kapsul.mp4 (3:17, 1080p). 40 replik Whisper ile doğrulandı, verify.py kayma 0. Ek ara çekimler: B20b (Eray), B21 (uyananlar), B22 (Mira elleri), B23b (Pusula); B15 yeniden çekildi. Ham klipler uretim-ham dalında gelen/b07/c7/. Wan bazı kliplerde sesi uzatabiliyor (K2, K4): klibin kendi sesi kullanıldı. L_M1, L_L2, L_SI1 sinemaskop geldi → build7.py CROP.
- Sıradaki: Bölüm 8 "İhanet". Ardından GitHub düzenlemesi (depo adı AI-Multiverse-Cinema, diziler/the-human-code-2300/).

## Platform ve dizi düzeni (17 Kasım 2026 kararı)
- Uygulamanın (platformun) adı: **AI Multiverse Cinema**. "The Human Code: 2300" yalnızca dizinin adıdır; başka diziler de eklenecek.
- Play mağaza girişi bu adla incelemeye gönderildi; main'de uygulama adı değişti; 1.3.1 (versionCode 6) paketi kapalı teste yüklenecek (yükleme sertifikası 17 Kas 17:04 UTC'de geçerli oldu).
- DİKKAT: Canlı uygulama (holo-heart-streams.lovable.app, Lovable projesi "Evrensel Sinema") AYRI depodan çalışır: maliisler1/ai-multiverse-cinema. Bu depo (The-Human-Code-2300) bölüm üretimi + Android paketi içindir; bölümler lovable-episodes iş akışıyla uygulamaya gider. Uygulama arayüzü/başlık değişiklikleri Lovable'da (veya ai-multiverse-cinema'da) yapılır ve Lovable'da Publish gerekir. 17 Kas: izleme sayfasındaki slug satırı kaldırıldı, B7 başlığı 'On Sekiz Kapsül', uygulama adı 'AI Multiverse Cinema' — yayında.
- GitHub düzenlemesi (yeniden planlanacak): 'AI-Multiverse-Cinema' adı zaten uygulama deposunda kullanılıyor; bu depo o adla yeniden adlandırılamaz. Önceki plan: dizi dosyaları `diziler/the-human-code-2300/` altına taşınacak (Lovable aktarımı, build betikleri ve yollar birlikte güncellenecek; ad değişince bölüm aktarımı test edilecek).
- **Kural:** Her yeni dizi kendi adıyla ayrı klasörde üretilir: `diziler/<dizi-adı>/` (senaryo, karakterler.md, ses/klip/montaj ve çıktılar o klasörde). Diziler birbirinin dosyalarını kullanmaz.
- Ham üretim dosyaları `uretim-ham` dalında (Actions ile ElevenLabs/MagicLight'tan alınır: diziler/the-human-code-2300/uretim-plan/istek/*.json → gelen/). ElevenLabs için GitHub gizli anahtarı ELEVENLABS_API_KEY gerekir.

## 17 Kasım akşamı
- Dizinin slug'ı **the-human-code-2300** oldu (eski neo-genesis-2099 adresleri yeni adrese yönlenir). Adres: https://holo-heart-streams.lovable.app/dizi/the-human-code-2300
- DÜZELTME: Lovable ↔ GitHub senkronu sağlam. Lovable projesi 'Evrensel Sinema' = depo **maliisler1/holo-heart-streams** (main). Canlı web sitesi bu koddan; telefon uygulaması (Capacitor, AdMob, indirme, paylaşma) ise The-Human-Code-2300 main'den derlenir — iki ayrı kod kopyası. Android main'den derlenir. Main'de slug/afiş/öne çıkan dizi yeni slug'a uyarlandı (7e87823) ve 1.3.1 (versionCode 6) yeniden derlendi.

## Karar (17 Kas 17:24) — iki kodu birleştirme planı
1. 17 Kas 20:10: 1.3.1 (versionCode 6, The-Human-Code-2300 main'den) kapalı teste yüklenir.
2. Ertesi gün: telefon özellikleri (android/, capacitor.config.ts, vite.mobile.config.ts, @capacitor paketleri, AdMob/indirme/paylaşma) holo-heart-streams'e ayrı dalda taşınır; web bozulmadığı test edilir; Android derlemesi holo-heart-streams kodundan yapılır. İmza anahtarları yalnız The-Human-Code-2300 secrets'ta: ya okuma anahtarı (holo-heart-streams'i okuyan) eklenir ya da anahtarlar holo-heart-streams'e de eklenir (kullanıcı yapar).

## Çok dilli altyazı (karar 17 Kas 2026)
- Diller (20, en çok konuşulana göre): en, zh, hi, es, ar, fr, bn, pt, ru, id, ur, de, ja, mr, te, tr, ta, vi, it, ko.
- Yöntem: final videoda Whisper zaman damgası → senaryo metniyle düzelt → çeviri → VTT. Kredi harcamaz.
- Uygulama: cihaz diline göre altyazı otomatik (Türkçe cihazda kapalı); oynatıcıda dil seçimi. Kod birleştirmede (holo-heart-streams) eklenecek.
- Ses şimdilik yalnız Türkçe; dizi tutarsa tam İngilizce seslendirme + yeniden dudak senkronu.

- Bölüm 8 "İhanet" YAYINDA (17 Kas): assets/out/Bolum8_Ihanet.mp4 (3:13). 38 replik, verify.py kayma 0. Wan 14 dudak (9.240 kredi). Ek ara çekimler X1–X5. Pusula küresi önceki bölümlerdeki gibi dünya görünümlü kalsın (tutarlılık). Ham klipler uretim-ham gelen/b08/c8/.
- Altyazılar (17 Kas): Bölüm 1–8 × 20 dil hazır → assets/altyazi/bolum-NN/<dil>.vtt (+ sozluk.md: karakter adlarının dillerdeki yazımı). B1–B7 zamanları Whisper'dan (uretim-ham gelen/altyazi/bNN.json, iş akışı altyazi-zaman.yml), B8 edl8.json'dan. Önizleme: claude.ai artifact "Altyazı Önizleme" (360p videolar + subs.json). Uygulamaya altyazı menüsü kod birleştirmede eklenecek. Yeni bölümde: final video → altyazi-zaman → tr düzelt → 19 dile çevir → vtt.py.
