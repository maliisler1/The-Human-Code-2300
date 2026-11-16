# The Human Code: 2300 — Sabit karakter kartları

Her bölümde, her sahnede bu görünüm ve sesler değişmez. Konuşma (dudak) sahneleri
her zaman aşağıdaki referans görselle üretilir; aksiyon sahnelerinde karakter
tarifi İngilizce olarak AYNEN yazılır.

| Karakter | Görünüm (sabit) | Referans | Ses |
|---|---|---|---|
| AyShe (23) | Genç kadın, uzun hafif dalgalı siyah saç, ortadan ayrık, kâkül yok, göğsünde küçük mavi "23" rozetli beyaz uzay giysisi | assets/b04/ayshe.jpg | Gözde Arıkan |
| Aslı | Genç kadın, uzun dalgalı kahverengi saç, göğsünde turkuaz halka olan gümüş-beyaz giysi | assets/b04/asli.jpg | Gamze – Young |
| Mira (7) | Genç kadın, kısa platin gümüş saç, göğsünde parlayan "7" olan gri zırhlı giysi | assets/b04/mira.jpg | Nil |
| Eray | **12 yaşında çocuk** (asla yetişkin değil), dağınık kıvırcık siyah saç, çilli, omuzlarında parlayan mavi kristaller olan lacivert ceket | assets/b04/eray.jpg | Polat Gündüz |
| Gölge | Kapüşonlu, maskeli, kırmızı gözlü kötü karakter | assets/b04/golge.jpg | Celil (efektli) |
| Pusula | Mavi parlayan yapay zekâ küresi | — | Dilara |
| Leon | Kapsül 22'deki genç adam | — | Fatih |
| Anlatıcı | — | — | Hasan Yasin |

## Aksiyon sahnesi tarifleri (prompta aynen eklenir)

- **Grup:** four young rebels: a young woman with long straight black hair in a white spacesuit with a small blue 23 badge on the chest, a young woman with long wavy brown hair in a white suit, a young woman with short platinum silver hair in a grey armored suit with a glowing number 7 on the chest, and a 12-year-old boy with messy curly black hair in a navy jacket with glowing blue crystals on the shoulders
- **Eray:** a 12-year-old boy (a child, not an adult) with messy curly black hair, freckles and a slim small body, wearing a dark navy jacket with small glowing blue crystals on the shoulders
- **AyShe:** a young woman with long straight black hair in a white spacesuit with a small blue 23 badge on the chest
- **Aslı:** a young woman with long wavy brown hair in a white suit
- **Mira:** a young woman with short platinum silver hair in a grey armored suit with a glowing number 7 on the chest

Kural: "young man", "soldiers", "rebels in tactical suits" gibi belirsiz tarifler kullanılmaz;
üretilen her aksiyon karesi bölüme girmeden önce bu karta göre kontrol edilir.

## Görüntü sabitleme yöntemi (zorunlu)
Karakter görünen her aksiyon sahnesi, yazılı tarifle değil **referans fotoğrafla** üretilir
(MagicLight Text to Video + "Add references"):
- Dördü birlikte: `assets/b04/ref_grup.jpg`
- AyShe + Aslı: `ref_ayshe_asli.jpg` · AyShe + Eray: `ref_ayshe_eray.jpg` · Eray + Aslı: `ref_eray_asli.jpg`
- Tek kişi: `ayshe.jpg`, `asli.jpg`, `mira.jpg`, `eray.jpg`
Not: üretilen videonun ilk ~3,5 saniyesi referans paftayı gösterir; montajda **4,0. saniyeden** itibaren kullanılır.
Saç: AyShe ve Aslı'nın saçı ara sıra toplu (at kuyruğu) olabilir; yüz, saç rengi ve kıyafet asla değişmez.

## Yeni karakterler (5. bölümden sonra)
Her yeni karakter ilk göründüğü bölümde bir kez tasarlanır; o görüntüden referans fotoğraf
(`assets/karakterler/<ad>.jpg`) ve sabit ses seçilir, buraya eklenir. Dizinin sonuna kadar
aynı yüz, saç, kıyafet ve ses kullanılır. Kadın karakterlerde saç ara sıra toplu olabilir.

## 5.–6. bölümde eklenen sabit karakterler
| Karakter | Görünüm (sabit) | Referans | Ses |
|---|---|---|---|
| Leon (22) | Kısa koyu saçlı genç adam, göğsünde parlayan "22" olan gri-beyaz uzay giysisi | assets/karakterler/leon.jpg | Fatih Yıldırım |
| Mony (11) | 20'li yaşlar, **ateş kırmızısı** bele kadar doğal dalgalı saç, sağ yanağında ben, kiraz dudak, ~50 kg, göğsünde "11" olan beyaz giysi | assets/karakterler/mony.jpg | Zehra |
| Anka (12) | 20'li yaşlar, uzun kıvırcık siyah saç, iri çekik gözler, 1,65 m / ~60 kg, göğsünde "12" olan beyaz giysi | assets/karakterler/anka.jpg | Hale |
| Sila (kötü) | 35 yaşında, açık sarı (platin) saç topuz, kırmızı şeritli siyah yüksek yakalı palto | assets/karakterler/sila.jpg | İrem |
| Kael | Yaşlı, kel, koyu tenli, kısa beyaz sakallı; bronz omuzluklu kahverengi deri palto, turkuaz kristal kolye | assets/karakterler/kael.jpg | Mahmut Hoca |
| Sarcınt (Sergeant) | Aslı'nın erkek kedisi: tekir-beyaz, kamuflaj askeri üniforma ve kask | assets/karakterler/kedi.jpg | — |

Notlar: Mony'nin saçı 5. bölümden itibaren ateş kırmızısıdır (5. bölüm çekimleri renk düzeltmesiyle güncellendi).
Kedinin adı metinde "Sarcınt" yazılır ki seslendirmede İngilizce "Sergeant" gibi okunsun.
