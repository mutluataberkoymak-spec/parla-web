# Canlı Siteye Yayınlama Rehberi (parla-web)

Bu klasördeki dosyalar, `mutluataberkoymak-spec/parla-web` reposuna **doğrudan kopyalanmaya hazır** statik sayfalardır — React yok, sitenizin mevcut kod stiliyle (aynı renkler, aynı sınıflar, vanilla JS) yazıldı.

## 1. Dosyaları kopyalayın

Repo kökünüze (index.html'in yanına):

- `ilan-detay.html` — İlan detay sayfası. `data/listings.json`'ı okur; `ilan-detay.html?no=<portfoyNo>` ile açılır (örn. `ilan-detay.html?no=b6f31341`). Galeri, özellik tablosu, WhatsApp/ara butonları, benzer ilanlar otomatik dolar. **Not:** Bu dosya repo dışında tek başına açılırsa veri bulamaz — mutlaka repo kökünde, `data/` ve `images/` klasörlerinin yanında çalışır.
- `danismanlar.html` — Danışmanlar sayfası. İçindeki kartlar örnektir; dosyadaki yorum satırında anlatıldığı gibi gerçek isim/fotoğraf/telefonla güncelleyin.

```bash
git add ilan-detay.html danismanlar.html
git commit -m "İlan detay ve danışmanlar sayfaları eklendi"
git push
```

## 2. index.html'e eklenecek küçük parçalar

### a) Menüye "Danışmanlarımız" bağlantısı
`.navlinks` içine (örn. "Kurumsal"dan önce):
```html
<a href="danismanlar.html">Danışmanlarımız</a>
```

### b) İlan modalına "İlan Detayı →" butonu
`.modal-cta` içine üçüncü buton olarak:
```html
<a href="#" class="btn-outline" id="modalDetailBtn">İlan Detayı →</a>
```
Modalı açan JS'te, ilan gösterilirken:
```js
document.getElementById('modalDetailBtn').href = 'ilan-detay.html?no=' + ilan.portfoyNo;
```
(İsterseniz modalı tamamen kaldırıp kart tıklamasını doğrudan `ilan-detay.html?no=...`'a yönlendirebilirsiniz.)

### c) Footer'a WhatsApp + yasal bağlantılar
Footer'daki "Merkez Ofis" kolonunun altına:
```html
<a href="https://wa.me/905317366400?text=Merhaba%2C%20ilanlar%C4%B1n%C4%B1z%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
   style="display:inline-block;margin-top:10px;background:var(--green);color:#fff;font-weight:600;font-size:0.82rem;padding:9px 16px;border-radius:999px;">
  7/24 WhatsApp İletişim
</a>
```
Alt satıra (foot-row içine) yasal bağlantılar:
```html
<a href="#">KVKK Aydınlatma Metni</a>
<a href="#">Gizlilik ve Çerez Politikası</a>
<a href="#">Kullanım Koşulları</a>
```
**Önemli:** KVKK/Gizlilik/Kullanım Koşulları sayfa metinleri hukuki içeriktir — avukatınızdan/hazır KVKK şablonundan alıp ayrı HTML sayfalar olarak ekleyin; ben metin uydurmadım.

### d) (İsteğe bağlı) Çerez bildirimi
`</body>`'den önce:
```html
<div id="cookieBar" style="position:fixed;bottom:0;left:0;right:0;z-index:250;background:#141F2D;color:#9FB0C2;display:flex;align-items:center;justify-content:center;gap:18px;padding:12px 24px;font-size:0.8rem;flex-wrap:wrap;">
  <span>Bu site deneyiminizi iyileştirmek için çerezleri kullanır.</span>
  <button onclick="localStorage.setItem('cookieOk','1');document.getElementById('cookieBar').remove()" style="background:var(--yellow);color:var(--navy);border:none;font-weight:700;font-size:0.8rem;padding:8px 20px;border-radius:999px;cursor:pointer;">Tamam</button>
</div>
<script>if(localStorage.getItem('cookieOk'))document.getElementById('cookieBar')?.remove();</script>
```

## 3. Yayın

Push sonrası GitHub Pages birkaç dakika içinde güncellenir:
https://mutluataberkoymak-spec.github.io/parla-web/

Detay sayfası örneği:
https://mutluataberkoymak-spec.github.io/parla-web/ilan-detay.html?no=b6f31341
