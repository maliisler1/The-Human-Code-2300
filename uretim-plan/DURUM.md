# The Human Code: 2300 — Üretim durumu (14 Kasım 2026)

## Araçlar ve hesaplar (Ayşe'nin hesapları)
- **MagicLight** Plus yıllık (168 $, 13 ay). Toolbox → Video → Minimax H3 Fast, 10 sn, 720p, 210 kredi/çekim. Kalan ≈ 23.365 kredi (13 Kasım akşamı).
- **AyShe referans portresi:** MagicLight Image (GPT Image 2) üretimi —
  https://skillsrc.octask.ai/gpt-image-2/7527054217364963328/87dd30dd-9dc6-39ba-8bd1-bb823852a798_0.png
  Her AyShe çekimine "Add references" ile eklenir (yüz tutarlılığı iyi).
- **ElevenLabs** Starter (5 $/ay, 40.000 kredi). Türkçe seslendirme buradan yapılacak.
- **Suno** (ays23): Pieces of the Sky (jenerik), Gökyüzünün Parçaları (TR), Broken Stars (gerilim), When You Come Home (final). Telif kullanıcıda (ücretli üyelikte üretilmiş).

## Bölüm 1 "Uyanış"
- 18 çekim × 10 sn hazır; sahne listesi: `bolum-01-magiclight.md`, komutlar: `b01_prompts.json`.
- MagicLight video kimlikleri (cdn.brmgo.cn/image-to-video-files-prod-intl/<id>/<id>_<hash>.mp4):
  01 7527058683745071104_06b39e · 02 7527058706469826560_f00f01 · 03 7527056793955282944_2d75ab ·
  04 7527056956773965824_1bb7ae · 05 7527057066404671488_61a9d6 · 06 7527057674754932736_d5ce68 ·
  07 7527059972059111424_ff6abf · 08 7527057911657611264_22d7a1 · 09 7527058039084761088_7f34d5 ·
  10 7527058096697720832_e18bfd · 11 7527058154340036608_bb3efa · 12 7527058217787273216_fa5cfc ·
  13 7527058280836030464_35feef · 14 7527058361106644992_225d79 · 15 7527058411442479104_dd3c67 ·
  16 7527058494154137600_ac070c · 17 7527058531730923520_d0d871 · 18 7527058571316752384_55950d
- İlk kurgu (177 sn, 1080p, müzik kısık + konuşmada otomatik kısılma) yapıldı.
- **Sorun:** Minimax'ın Türkçesi bazı çekimlerde anlaşılmıyor (ör. 18; 01'de "2300" → "iki üç yüz").
- **Karar:** Görüntü kalsın; tüm Türkçe replikler ElevenLabs ile seslendirilip videodaki konuşmanın yerine konacak. Sayılar yazıyla ("iki bin üç yüz").
- Yeniden çekilebilecekler: 06 (küre ağızda), 15 (Taran kıyafeti farklı).

## Kurallar
- Bölüm 2'ye kullanıcının onayıyla geçilir.
- Müzik konuşma altında kısık; konuşmalar net.
- Uygulama: cihaz diline göre ses; altyazı varsayılan kapalı, oynatıcıdan seçilir.

## Durum (15.11.2026 gece)
- Bölüm 1 "Uyanış" — ONAYLANDI. GitHub: assets/out/Bolum1_Uyanis.mp4 (720p, 2:58).
- Bölüm 2 "Kayıp Sinyal" — son hali GitHub: assets/out/Bolum2_Kayip_Sinyal.mp4 (720p, 3:01), sonda "Bölüm 3 — Gölgenin Adı" kartı. Onay bekliyor.
- Bölüm 3 "Gölgenin Adı" — senaryo hazır (b03/script.md). Seslerin bir kısmı üretildi; ElevenLabs indirmeleri ev bilgisayarındaki tarayıcı panelinde takılıyor (gecikmeli/kayıp). Gölge sesleri Celil ile yeniden üretildi (Jason olanlar KULLANILMAYACAK).
- 20 bölüm planı: uretim-plan/HIKAYE-20-BOLUM.md (yeni karakterler: Kael B6, Nyra B9, Dr. Ekin Var B14).
- Kontrol listesi (her bölüm): (1) her ses dosyası indirildikten sonra süre/benzerlik kontrolü, (2) dudak çekimi xcorr ofseti, (3) zaman çizelgesinde üst üste binme yok, (4) konuşmayan yüz ağız oynatmıyor, (5) video ve ses süresi eşit, (6) son kartta sonraki bölüm adı.
