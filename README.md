# Parla Gayrimenkul — Web Sitesi

Edremit / Balıkesir merkezli Parla Gayrimenkul için kurumsal web sitesi ve ilan giriş platformu.

## Dosyalar

| Dosya | Açıklama |
|---|---|
| `index.html` | Ana site — arama, il/ilçe/mahalle + daire özellikleri filtresi, ilan listesi (sabit örnek ilanlar + panelden eklenenler), bölge rehberi, iletişim formu, AI asistan |
| `ilan-giris.html` | Danışman paneli — admin girişi (kullanıcı adı `admin`, şifre `123`) arkasında, 14 bölümlük portföy giriş formu + JSON toplu içe aktarma |
| `storage.js` | Tarayıcı `localStorage` tabanlı ortak depolama katmanı (`index.html` ve `ilan-giris.html` tarafından kullanılır) |
| `data/parla_ilanlar_37.json` | Sahibinden'den dışa aktarılan 37 ilanın toplu içe aktarma şablonu (panelden yeni ilan yüklerken örnek/başlangıç noktası) |
| `data/listings.json` | Sitede herkese görünen 37 ilanın gerçek verisi: başlık, açıklama, fiyat, konum, özellikler ve fotoğraf yolları. `index.html` sayfa açılışında bunu fetch ile okuyup listeye basar |
| `images/<portföyNo>/NN.jpg` | Her ilanın Sahibinden'den alınan gerçek fotoğrafları, web için sıkıştırılmış (max 1600px genişlik, JPEG kalite 80) hâlde |

## Yeni Eklenen Özellikler

- **İl / İlçe / Daire Özellikleri filtresi**: Ana sitedeki "Detaylı Filtre" panelinde il, ilçe, mahalle, ilan türü, emlak tipi, oda sayısı, fiyat/m² aralığı yanında artık Asansör, Otopark, Eşyalı, Site İçinde, Krediye Uygun ve Balkon özellik filtreleri de var.
- **37 ilan, gerçek fotoğraflarıyla birlikte statik olarak sitede**: `data/listings.json` + `images/` üzerinden tüm 37 ilan (toplam ~900 fotoğraf) her ziyaretçiye görünecek şekilde siteye gömüldü. Artık panelden JSON yüklemeye gerek kalmadan gerçek portföy herkes tarafından görülüyor.
- **İlan detay modalı ve fotoğraf galerisi**: Bir ilana tıklandığında başlık, açıklama, özellikler ve tüm fotoğrafların ileri/geri (klavye ok tuşlarıyla da) gezilebildiği bir detay penceresi açılır. Kapak fotoğrafı, ilanın fotoğraf listesindeki ilk sıradaki fotoğraftır (Sahibinden'in kendi sıralaması); belirli bir ilanın kapak fotoğrafını değiştirmek isterseniz portföy no'sunu ve istediğiniz fotoğrafı belirtmeniz yeterli.
- **JSON toplu portföy yükleme (yeni ilanlar için)**: `ilan-giris.html` üst kısmındaki panelden çoklu ilan içeren bir `.json` dosyası yüklenebilir. Bu yol ileride eklenecek yeni ilanlar için hâlâ geçerli, ama unutmayın: panelden eklenen kayıtlar tarayıcı bazlı `localStorage`'da tutulur (bkz. Notlar), 37 ilan gibi herkese görünmez.
- **Admin girişi**: `ilan-giris.html` artık herkese açık değil. Kullanıcı adı `admin`, şifre `Parla2026!Edremit` ile giriş yapılmadan form görüntülenemez.
  - ⚠️ Bu, **istemci taraflı (client-side)** basit bir kilittir — sayfanın kaynağını (view-source) görebilen biri şifreyi görebilir. Statik bir site (GitHub Pages vb.) olduğu için gerçek/güvenli bir giriş sistemi değildir. Gerçek güvenlik için sunucu taraflı kimlik doğrulama (örn. Netlify/Vercel Functions + oturum yönetimi, ya da Cloudflare Access gibi bir erişim katmanı) gerekir.
- **Portföy formu genişletildi**: Resmi Parla Portföy Formu şablonına göre Açık Alan m², ayrı İntercom/Görüntülü Diyafon, Yüz Tanıma & Parmak İzi, ayrı Açık/Kapalı Otopark, genişletilmiş Muhit/Ulaşım listeleri, yeni "Manzara Özellikleri" bölümü, "Residence" konut tipi ve "Müşteri Görüşme Takip" (14. bölüm) tablosu eklendi. Ayrıca web sitesinde yayınlanacak "İlan Başlığı" ve "İlan Açıklaması" alanları eklendi.
- **İletişim formu Web3Forms'a bağlandı**: Form artık gerçek bir e-posta servisi olan [Web3Forms](https://web3forms.com)'a `fetch` ile istek atıyor. Çalışması için `index.html` içindeki `access_key` gizli alanına kendi ücretsiz Web3Forms anahtarınızı girmeniz gerekir (bkz. aşağıdaki "Yayın Öncesi Yapılacaklar").
- **AI asistan artık her zaman çalışıyor**: Önceki sürüm tarayıcıdan doğrudan `api.anthropic.com`'a istek atıyordu; bu, API anahtarı olmadan ve CORS nedeniyle her zaman "Bağlantı hatası" veriyordu. Artık harici bir servise bağlı olmayan, anahtar kelime tabanlı basit bir yerel asistana dönüştürüldü (bölge, kredi, bütçe, randevu gibi konularda yanıt verir, gerçek sorular için İletişim formuna/telefona yönlendirir).

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

- [ ] **Web3Forms access key'i gir**: [web3forms.com](https://web3forms.com) adresine e-posta adresinizi (ör. info@parlagayrimenkul.com) girin, anında gelen ücretsiz erişim anahtarını `index.html` içinde `name="access_key"` olan gizli input'un `value`'suna yapıştırın. Bu adım yapılmadan form gönderim yapamaz (kullanıcıya uyarı gösterilir).
- [ ] İlan fotoğraflarını ekle (şu an plan-çizgisi placeholder)
- [ ] İstatistik ve müşteri yorumlarını gerçek verilerle değiştir veya kaldır
- [ ] Admin şifresini (`admin` / `Parla2026!Edremit`) gerçek yayında kendi belirleyeceğiniz bir şifreyle değiştirmeyi ve/veya `ilan-giris.html`'i tamamen gizli bir URL'de tutmayı düşünün — client-side kilit tek başına yeterli güvenlik değildir
- [ ] Alan adı bağla (repo ayarları > Pages > Custom domain)

## Notlar

- İlk 37 ilan `data/listings.json` + `images/` olarak sitede statik/gömülü durumda — bunlar tüm ziyaretçilere görünür. Bunun **dışında**, `ilan-giris.html` panelinden eklenen yeni kayıtlar hâlâ tarayıcı bazlı `localStorage` depolamasıdır; **sadece kaydı oluşturan tarayıcıda görünür**. Çok kullanıcılı, gerçek zamanlı ve herkesin göreceği bir sistem için bir backend + veritabanı (örn. Firebase, Supabase, kendi API'niz) gerekir.
- Yeni bir ilanı kalıcı olarak (herkese görünecek şekilde) siteye eklemek için: `data/listings.json`'a elle bir kayıt eklemek ve fotoğraflarını `images/<portföyNo>/` altına koymak gerekir; ya da panelden JSON toplu içe aktarma özelliğini kullanabilirsiniz (yalnızca kendi tarayıcınızda görünür).
- "Müşteri Görüşme Takip" (bölüm 14) verileri yalnızca kaydedilen portföy kaydının içinde tutulur, web sitesinde gösterilmez.
