# asya.space

Asya'nın kişisel portfolio sitesi.

## Yerel olarak çalıştırma

Bu klasörü tarayıcıda açabilmek için basit bir sunucu gerek (CORS yüzünden):

```bash
# Python varsa
python3 -m http.server 8000

# veya Node varsa
npx serve .
```

Sonra http://localhost:8000 adresini aç.

## GitHub Pages'e deploy

1. github.com'da yeni bir public repo aç (örn. `asya-space`)
2. Bu klasördeki **tüm dosyaları** repoya yükle (sürükle-bırak veya `git push`)
3. Repo Settings → Pages → Source: **Deploy from a branch** → Branch: **main** / **/(root)** → Save
4. 1-2 dk bekle → `https://kullanıcıadın.github.io/asya-space/` çalışır

## Custom domain (asya.space) bağlama

1. asya.space alan adını al (Namecheap, Porkbun vb.)
2. Repo'da yeni bir dosya oluştur: `CNAME` (uzantısız), içine **sadece** şunu yaz:
   ```
   asya.space
   ```
3. GitHub Settings → Pages → Custom domain: `asya.space` → Save
4. Domain sağlayıcının DNS panelinde:
   - **A kayıtları** ekle, host `@`, değerler:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - **CNAME** kaydı ekle, host `www`, değer: `kullanıcıadın.github.io`
5. 10-30 dk sonra https://asya.space çalışır. GitHub otomatik HTTPS sertifikası verir.

## İçerik yönetimi

Site içeriği şu an **tarayıcıda** (localStorage) saklanıyor:

- `asya.space/#/admin` → şifre: `asya2026`
- Buradan profil, çalışmalar, başarılar ve blog yazıları düzenlenebilir
- "Veri" sekmesinden JSON yedek alıp/geri yükleyebilirsin

**Önemli:** Bu yöntemle yapılan değişiklikler sadece o tarayıcıda görünür. Ziyaretçiler `app/store.jsx` içindeki **DEFAULT_CONTENT**'i görür.

### Kalıcı içerik güncelleme (önerilen akış)

1. Asya admin panelinden yazılarını ekler/düzenler
2. "Veri" sekmesinden JSON olarak indirir
3. Bu JSON içeriğini `app/store.jsx` dosyasındaki `DEFAULT_CONTENT` ile değiştirir
4. GitHub'a push'lar → site otomatik güncellenir

## Şifreyi değiştirme

`app/admin.jsx` dosyasının başında:
```js
const ADMIN_PASS = 'asya2026';  // burayı değiştir
```

## Tasarım ayarları

Sağ alttaki **Tweaks** paneli ile renk, font, karanlık mod gibi ayarlar değiştirilebilir.
Beğenilen ayarlar için `app/main.jsx` içindeki `TWEAK_DEFAULTS` blokunu güncelle.
