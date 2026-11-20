# Depo: animasyon dosyalarının ana kopyası

Bu klasördeki dosyalar uygulamanın içine **girmez**. Uygulama ve web sitesi videoları
"animations" adlı depolama alanından oynatır; bu klasör o alanın GitHub'daki ana kopyasıdır.

## Dosya düzeni

- `snooze/poster.webp`, `snooze/ep1.mp4` … : Snooze with Tik
- `karakterler/<anahtar>.webp` : karakter afişi
- `karakterler/<anahtar>.mp4` : karakter fragmanı
- `karakterler/<anahtar>-ep<n>.mp4` : karakterin n. bölümü

Karakter listesi ve bölüm sayıları `src/lib/katalog.json` dosyasındadır.

## Yeni animasyon eklemek

1. Dosyanın bağlantısını `scripts/varliklar.json` içine ekle (`hedef`: `karakterler/bip-ep6` gibi).
2. GitHub → Actions → "Varlıkları indir" → Run workflow. Dosya küçültülüp bu klasöre işlenir.
3. `src/lib/katalog.json` içinde karakterin `episodes` sayısını artır (ya da yeni karakter ekle).
4. Web sitesinde Yönetim → "Animasyon deposu" → "GitHub'dan eşitle" düğmesine bas.
   Eksik dosyalar depolama alanına yüklenir ve katalog güncellenir.

Bu adımlardan sonra yeni bölüm, uygulamanın yeni sürümü yayınlanmadan uygulamada ve sitede görünür.
