# Parla Gayrimenkul — Web Sitesi

Edremit / Balıkesir merkezli Parla Gayrimenkul için kurumsal web sitesi ve ilan giriş platformu.

## Dosyalar

| Dosya | Açıklama |
|---|---|
| `index.html` | Ana site — arama, il/ilçe/mahalle + daire özellikleri filtresi, ilan listesi (sabit örnek ilanlar + panelden eklenenler), bölge rehberi, iletişim formu, AI asistan |
| `ilan-giris.html` | Danışman paneli — admin girişi (kullanıcı adı `admin`, şifre `123`) arkasında, 14 bölümlük portföy giriş formu + JSON toplu içe aktarma |
| `storage.js` | Tarayıcı `localStorage` tabanlı ortak depolama katmanı (`index.html` ve `ilan-giris.html` tarafından kullanılır) |
| `data/parla_ilanlar_37.json` | Sahibinden'den dışa aktarılan 37 ilanın içe aktarma şablonuna dönüştürülmüş hali |

## Yeni Eklenen Özellikler

- **İl / İlçe / Daire Özellikleri filtresi**: Ana sitedeki "Detaylı Filtre" panelinde il, ilçe, mahalle, ilan türü, emlak tipi, oda sayısı, fiyat/m² aralığı yanında artık Asansör, Otopark, Eşyalı, Site İçinde, Krediye Uygun ve Balkon özellik filtreleri de var.
- **JSON toplu portföy yükleme**: `ilan-giris.html` üst kısmındaki panelden çoklu ilan içeren bir `.json` dosyası yüklenebilir. Şablon örneği sayfada "Şablonu göster" ile görülebilir.
- **Panelden eklenen ilanlar ana sitede görünür**: Formdan tek tek veya JSON ile toplu eklenen ilanlar, aynı tarayıcıda `index.html` açıldığında otomatik olarak listeye eklenir ve aynı filtrelerden geçer. İlanın açıklaması ve işaretlenen özellikleri "Detayı Göster" bağlantısıyla açılır.
- **Admin girişi**: `ilan-giris.html` artık herkese açık değil. Kullanıcı adı `admin`, şifre `123` ile giriş yapılmadan form görüntülenemez.
  - ⚠️ Bu, **istemci taraflı (client-side)** basit bir kilittir — sayfanın kaynağını (view-source) görebilen biri şifreyi görebilir. Statik bir site (GitHub Pages vb.) olduğu için gerçek/güvenli bir giriş sistemi değildir. Gerçek güvenlik için sunucu taraflı kimlik doğrulama (örn. Netlify/Vercel Functions + oturum yönetimi, ya da Cloudflare Access gibi bir erişim katmanı) gerekir.
- **Portföy formu genişletildi**: Resmi Parla Portföy Formu şablonına göre Açık Alan m², ayrı İntercom/Görüntülü Diyafon, Yüz Tanıma & Parmak İzi, ayrı Açık/Kapalı Otopark, genişletilmiş Muhit/Ulaşım listeleri, yeni "Manzara Özellikleri" bölümü, "Residence" konut tipi ve "Müşteri Görüşme Takip" (14. bölüm) tablosu eklendi. Ayrıca web sitesinde yayınlanacak "İlan Başlığı" ve "İlan Açıklaması" alanları eklendi.

## Yayına Alma (GitHub Pages)

```bash
# 1. GitHub'da boş bir repo oluştur (örn. parla-web)
# 2. Bu klasörde (parla-web/ içindeyken):
git remote add origin https://github.com/KULLANICI_ADI/parla-web.git
git branch -M main
git push -u origin main
# 3. GitHub repo ayarları > Pages > Source: main branch (/ root) > Save
# Site birkaç dakika içinde şu adreste yayında olur:
# https://KULLANICI_ADI.github.io/parla-web/
```

Değişiklik yaptıktan sonra yayını güncellemek için:

```bash
git add -A
git commit -m "Açıklama"
git push
```

## Yayın Öncesi Yapılacaklar

- [ ] İletişim formunu gerçek bir servise bağla (Formspree, Web3Forms veya kendi backend)
- [ ] AI asistan: `claude.ai` artifact ortamı dışında çalışması için API anahtarını gizleyen bir backend proxy gerekir (Vercel/Netlify Function önerilir) — anahtar asla ön yüz koduna gömülmemeli
- [ ] İlan fotoğraflarını ekle (şu an plan-çizgisi placeholder)
- [ ] İstatistik ve müşteri yorumlarını gerçek verilerle değiştir veya kaldır
- [ ] Admin şifresini (`admin` / `123`) gerçek yayında değiştirmeyi ve/veya `ilan-giris.html`'i tamamen gizli bir URL'de tutmayı düşün — client-side kilit tek başına yeterli güvenlik değildir
- [ ] Alan adı bağla (repo ayarları > Pages > Custom domain)

## Notlar

- İlan giriş platformundaki kayıtlar tarayıcı bazlı `localStorage` depolamasıdır; **sadece kaydı oluşturan tarayıcıda görünür**. Çok kullanıcılı, gerçek zamanlı ve herkesin göreceği bir sistem için bir backend + veritabanı (örn. Firebase, Supabase, kendi API'niz) gerekir.
- Toplu içe aktarma: `ilan-giris.html` üst kısmındaki panelden `data/parla_ilanlar_37.json` dosyasını veya kendi hazırladığınız şablona uygun bir `.json` dosyasını yükleyebilirsiniz.
- "Müşteri Görüşme Takip" (bölüm 14) verileri yalnızca kaydedilen portföy kaydının içinde tutulur, web sitesinde gösterilmez.
