# Parla Gayrimenkul — Web Sitesi

Edremit / Balıkesir merkezli Parla Gayrimenkul için kurumsal web sitesi ve ilan giriş platformu.

## Dosyalar

| Dosya | Açıklama |
|---|---|
| `index.html` | Ana site — arama, detaylı filtre (il/ilçe/mahalle), ilan listesi, bölge rehberi, iletişim formu, AI asistan |
| `ilan-giris.html` | Danışman paneli — 13 bölümlük portföy giriş formu + JSON toplu içe aktarma |
| `data/parla_ilanlar_37.json` | Sahibinden'den dışa aktarılan 37 ilanın içe aktarma şablonuna dönüştürülmüş hali |

## Yayına Alma (GitHub Pages)

```bash
# 1. GitHub'da boş bir repo oluştur (örn. parla-web)
# 2. Bu klasörde:
git remote add origin https://github.com/KULLANICI_ADI/parla-web.git
git push -u origin main
# 3. GitHub repo ayarları > Pages > Source: main branch > Save
# Site birkaç dakika içinde şu adreste yayında olur:
# https://KULLANICI_ADI.github.io/parla-web/
```

## Yayın Öncesi Yapılacaklar

- [ ] İletişim formunu gerçek bir servise bağla (Formspree, Web3Forms veya kendi backend)
- [ ] AI asistan: `claude.ai` artifact ortamı dışında çalışması için API anahtarını gizleyen bir backend proxy gerekir (Vercel/Netlify Function önerilir) — anahtar asla ön yüz koduna gömülmemeli
- [ ] İlan fotoğraflarını ekle (şu an plan-çizgisi placeholder)
- [ ] İstatistik ve müşteri yorumlarını gerçek verilerle değiştir veya kaldır
- [ ] `ilan-giris.html` herkese açık olmamalı — yayında ya sil ya da kimlik doğrulama arkasına al
- [ ] Alan adı bağla (repo ayarları > Pages > Custom domain)

## Notlar

- İlan giriş platformundaki kayıtlar tarayıcı bazlı demo depolamadır; çok kullanıcılı gerçek kullanım için veritabanı gerekir.
- Toplu içe aktarma: `ilan-giris.html` üst kısmındaki panelden `data/parla_ilanlar_37.json` dosyasını yükleyebilirsiniz.
