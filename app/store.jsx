// asya.space — içerik deposu (localStorage)
// Tüm site içeriği burada. Admin paneli bu store'u günceller.

const STORE_KEY = 'asya_space_v1';

const DEFAULT_CONTENT = {
  profile: {
    name: 'Asya',
    title: 'Resim çiziyor, hikâye yazıyor, atölyede bir şeyler kuruyor.',
    grade: '11. Sınıf',
    email: 'merhaba@asya.space',
    bio: '11. sınıfa gidiyorum. Hem dijital hem kâğıt üzerine resim yapmaya bayılıyorum. Teknoloji derslerinde atölye çalışmaları yürütüyor, Teknofest gibi yarışmalara takım arkadaşlarımla katılıyorum.',
  },
  stats: {
    works: 47,
    awards: 5,
    competitions: 8,
  },
  works: [
    { id: 'w1', title: 'Sessiz Pencere', category: 'Dijital Resim', year: '2026', desc: 'iPad üzerinde Procreate ile çalışılmış portre serisi.', color: '#7c6df0' },
    { id: 'w2', title: 'Defter Sayfaları', category: 'Karakalem', year: '2025', desc: 'Okul defterimden sayılı sayfalar — gözlem çizimleri.', color: '#9ee5d5' },
    { id: 'w3', title: 'Mavi Saat', category: 'Fotoğraf', year: '2025', desc: 'İstanbul üzerinde gün batımı serisi, 35mm film.', color: '#ffc56b' },
    { id: 'w4', title: 'Karakter Kartları', category: 'Dijital Resim', year: '2025', desc: 'Hikâyem için tasarladığım karakter setleri.', color: '#b8a9ff' },
    { id: 'w5', title: 'Pazar Sabahı', category: 'Sulu Boya', year: '2024', desc: 'Pazar yerinden gözlem ve renk denemeleri.', color: '#ff8aa8' },
    { id: 'w6', title: 'Robot Eskizleri', category: 'Karakalem', year: '2024', desc: 'Teknofest projemiz için tasarım fikirleri.', color: '#1f1d2e' },
  ],
  achievements: [
    { id: 'a1', title: 'Teknofest Çevre ve Enerji Teknolojileri', place: 'Finalist', year: '2025', detail: 'Takım arkadaşlarımla geliştirdiğimiz proje finalde temsil edildi.' },
    { id: 'a2', title: 'Teknofest İnsanlık Yararına Teknoloji', place: '3.lük', year: '2024', detail: 'Engelli bireyler için tasarladığımız çözüm derece aldı.' },
    { id: 'a3', title: 'Okul Resim Yarışması', place: '1.lik', year: '2024', detail: 'İl genelinde düzenlenen yarışmada birincilik.' },
    { id: 'a4', title: 'Genç Yazarlar Atölyesi', place: 'Katılım Sertifikası', year: '2025', detail: 'Yaz boyunca süren yazarlık atölyesini tamamladım.' },
    { id: 'a5', title: 'Dijital Sanat Sergisi', place: 'Sergileme', year: '2025', detail: 'Çalışmalarımdan ikisi şehir sergisinde yer aldı.' },
  ],
  posts: [
    {
      id: 'p1',
      title: 'Bir resim ne zaman biter?',
      excerpt: 'Procreate üzerinde bir portreyi tamamlama anına dair düşüncelerim. "Bitti" demek bazen en zor kısım.',
      date: '2026-04-22',
      tag: 'Günlük',
      cover: '#7c6df0',
      body: 'Bir resmin bittiğini nasıl anlarım? Dürüst cevap: anlamıyorum. Procreate\'te sürekli bir katmana daha dokunmak, bir tonu daha yumuşatmak istiyorum. Ama bir noktada elimi geri çekmek gerekiyor.\n\nBu hafta üzerinde çalıştığım portre serisinde fark ettim: bir resim "biter" diye bir şey yok aslında. Ben onu bırakıyorum. Bir çocukluk arkadaşına el sallar gibi, "tamam, şimdilik buraya kadar" diyorum.\n\nBırakmayı öğrenmek de bir beceri sanırım.',
    },
    {
      id: 'p2',
      title: 'Teknofest günlüğü — ilk gün',
      excerpt: 'Yarışmaya geldik, projemizi kurduk, etrafa bakındık. İçim hem heyecan hem korku dolu.',
      date: '2026-03-14',
      tag: 'Atölye',
      cover: '#9ee5d5',
      body: 'Sabah erken kalktık. Standımızı kurarken eller titriyordu — ama iyi anlamda. Diğer takımların projelerini görmek inanılmaz ilham verici. Yarın sunum var. Şimdi notlarımı bir daha okuyacağım.',
    },
    {
      id: 'p3',
      title: 'Kâğıt mı, ekran mı?',
      excerpt: 'Karakalemden tablete geçişim üzerine. İkisinin de bende açtığı farklı kapılar var.',
      date: '2026-02-08',
      tag: 'Düşünce',
      cover: '#ffc56b',
      body: 'Kâğıt üzerinde çizmek bambaşka bir şey. Kalemin sürtünmesi, silginin kâğıdı yıpratması, hata payının olmaması. Tablette ise her şey geri alınabilir — bu özgürlük bazen felç edici oluyor.\n\nSon zamanlarda iki ortamı birlikte kullanıyorum: eskizi kâğıtta yapıp tablete taşıyorum. Galiba en iyisi seçmek değil, ikisinden de en sevdiğim yanları almak.',
    },
  ],
};

function loadStore() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return structuredClone(DEFAULT_CONTENT);
    const parsed = JSON.parse(raw);
    // basit migrasyon: eksik alanları default'tan tamamla
    return { ...structuredClone(DEFAULT_CONTENT), ...parsed };
  } catch (e) {
    return structuredClone(DEFAULT_CONTENT);
  }
}

function saveStore(data) {
  localStorage.setItem(STORE_KEY, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent('asya:store-changed'));
}

function resetStore() {
  localStorage.removeItem(STORE_KEY);
  window.dispatchEvent(new CustomEvent('asya:store-changed'));
}

function useStore() {
  const [data, setData] = React.useState(() => loadStore());
  React.useEffect(() => {
    const handler = () => setData(loadStore());
    window.addEventListener('asya:store-changed', handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener('asya:store-changed', handler);
      window.removeEventListener('storage', handler);
    };
  }, []);
  return [data, (next) => saveStore(typeof next === 'function' ? next(data) : next)];
}

// id oluşturucu
function uid(prefix = 'x') {
  const arr = new Uint32Array(2);
  crypto.getRandomValues(arr);
  return prefix + '_' + arr[0].toString(36) + arr[1].toString(36).slice(0, 3);
}

// Tarihi Türkçe formatla
function fmtDate(iso) {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    const aylar = ['Oca','Şub','Mar','Nis','May','Haz','Tem','Ağu','Eyl','Eki','Kas','Ara'];
    return `${d.getDate()} ${aylar[d.getMonth()]} ${d.getFullYear()}`;
  } catch (e) { return iso; }
}

Object.assign(window, { useStore, loadStore, saveStore, resetStore, uid, fmtDate, DEFAULT_CONTENT });
