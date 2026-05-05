-- Başlangıç verisi (tek seferlik çalıştır)

INSERT INTO profile (id, name, title, grade, email, bio) VALUES (
  1,
  'Asya',
  'Resim çiziyor, hikâye yazıyor, atölyede bir şeyler kuruyor.',
  '11. Sınıf',
  'merhaba@asya.space',
  '11. sınıfa gidiyorum. Hem dijital hem kâğıt üzerine resim yapmaya bayılıyorum. Teknoloji derslerinde atölye çalışmaları yürütüyor, Teknofest gibi yarışmalara takım arkadaşlarımla katılıyorum.'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO stats (id, works_count, awards_count, competitions_count) VALUES (
  1, 47, 5, 8
) ON CONFLICT (id) DO NOTHING;

INSERT INTO works (id, title, category, year, description, color, sort_order) VALUES
  ('w1', 'Sessiz Pencere',   'Dijital Resim', '2026', 'iPad üzerinde Procreate ile çalışılmış portre serisi.',                    '#7c6df0', 0),
  ('w2', 'Defter Sayfaları', 'Karakalem',     '2025', 'Okul defterimden sayılı sayfalar — gözlem çizimleri.',                    '#9ee5d5', 1),
  ('w3', 'Mavi Saat',        'Fotoğraf',      '2025', 'İstanbul üzerinde gün batımı serisi, 35mm film.',                         '#ffc56b', 2),
  ('w4', 'Karakter Kartları','Dijital Resim', '2025', 'Hikâyem için tasarladığım karakter setleri.',                             '#b8a9ff', 3),
  ('w5', 'Pazar Sabahı',     'Sulu Boya',     '2024', 'Pazar yerinden gözlem ve renk denemeleri.',                               '#ff8aa8', 4),
  ('w6', 'Robot Eskizleri',  'Karakalem',     '2024', 'Teknofest projemiz için tasarım fikirleri.',                              '#1f1d2e', 5)
ON CONFLICT (id) DO NOTHING;

INSERT INTO achievements (id, title, place, year, detail, sort_order) VALUES
  ('a1', 'Teknofest Çevre ve Enerji Teknolojileri', 'Finalist',              '2025', 'Takım arkadaşlarımla geliştirdiğimiz proje finalde temsil edildi.', 0),
  ('a2', 'Teknofest İnsanlık Yararına Teknoloji',   '3.lük',                 '2024', 'Engelli bireyler için tasarladığımız çözüm derece aldı.',            1),
  ('a3', 'Okul Resim Yarışması',                    '1.lik',                 '2024', 'İl genelinde düzenlenen yarışmada birincilik.',                      2),
  ('a4', 'Genç Yazarlar Atölyesi',                  'Katılım Sertifikası',   '2025', 'Yaz boyunca süren yazarlık atölyesini tamamladım.',                  3),
  ('a5', 'Dijital Sanat Sergisi',                   'Sergileme',             '2025', 'Çalışmalarımdan ikisi şehir sergisinde yer aldı.',                   4)
ON CONFLICT (id) DO NOTHING;

INSERT INTO posts (id, title, excerpt, date, tag, cover, body, sort_order) VALUES
  ('p1',
   'Bir resim ne zaman biter?',
   'Procreate üzerinde bir portreyi tamamlama anına dair düşüncelerim. "Bitti" demek bazen en zor kısım.',
   '2026-04-22', 'Günlük', '#7c6df0',
   E'Bir resmin bittiğini nasıl anlarım? Dürüst cevap: anlamıyorum. Procreate''te sürekli bir katmana daha dokunmak, bir tonu daha yumuşatmak istiyorum. Ama bir noktada elimi geri çekmek gerekiyor.\n\nBu hafta üzerinde çalıştığım portre serisinde fark ettim: bir resim "biter" diye bir şey yok aslında. Ben onu bırakıyorum. Bir çocukluk arkadaşına el sallar gibi, "tamam, şimdilik buraya kadar" diyorum.\n\nBırakmayı öğrenmek de bir beceri sanırım.',
   0),
  ('p2',
   'Teknofest günlüğü — ilk gün',
   'Yarışmaya geldik, projemizi kurduk, etrafa bakındık. İçim hem heyecan hem korku dolu.',
   '2026-03-14', 'Atölye', '#9ee5d5',
   E'Sabah erken kalktık. Standımızı kurarken eller titriyordu — ama iyi anlamda. Diğer takımların projelerini görmek inanılmaz ilham verici. Yarın sunum var. Şimdi notlarımı bir daha okuyacağım.',
   1),
  ('p3',
   'Kâğıt mı, ekran mı?',
   'Karakalemden tablete geçişim üzerine. İkisinin de bende açtığı farklı kapılar var.',
   '2026-02-08', 'Düşünce', '#ffc56b',
   E'Kâğıt üzerinde çizmek bambaşka bir şey. Kalemin sürtünmesi, silginin kâğıdı yıpratması, hata payının olmaması. Tablette ise her şey geri alınabilir — bu özgürlük bazen felç edici oluyor.\n\nSon zamanlarda iki ortamı birlikte kullanıyorum: eskizi kâğıtta yapıp tablete taşıyorum. Galiba en iyisi seçmek değil, ikisinden de en sevdiğim yanları almak.',
   2)
ON CONFLICT (id) DO NOTHING;
