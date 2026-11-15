-- The Human Code: 2300 — 20 bölümlük plan: bölüm kayıtları ve TR/EN başlıklar.
-- Mevcut videolar/durumlar korunur; yalnızca eksik bölümler eklenir ve başlıklar güncellenir.
insert into public.episodes (series_id, n, minutes)
select s.id, g.n, 3 from public.series s cross join generate_series(1,20) as g(n)
where s.slug='neo-genesis-2099'
on conflict (series_id, n) do nothing;

insert into public.episode_titles (episode_id, lang, title)
select e.id, v.lang, v.title from (values
  (1,'tr','Uyanış'),
  (1,'en','Awakening'),
  (2,'tr','Kayıp Sinyal'),
  (2,'en','Lost Signal'),
  (3,'tr','Gölgenin Adı'),
  (3,'en','The Shadow''s Name'),
  (4,'tr','Kale'),
  (4,'en','The Fortress'),
  (5,'tr','Leon'),
  (5,'en','Leon'),
  (6,'tr','Kael'),
  (6,'en','Kael'),
  (7,'tr','Yirmi İki Kapsül'),
  (7,'en','Twenty-Two Capsules'),
  (8,'tr','İhanet'),
  (8,'en','Betrayal'),
  (9,'tr','Kızıl Savaşçı'),
  (9,'en','The Crimson Warrior'),
  (10,'tr','Eray''ın Sırrı'),
  (10,'en','Eray''s Secret'),
  (11,'tr','Leon''un Gözleri'),
  (11,'en','Leon''s Eyes'),
  (12,'tr','On İki'),
  (12,'en','Twelve'),
  (13,'tr','Kırılan Köprüler'),
  (13,'en','Broken Bridges'),
  (14,'tr','Dr. Ekin Var'),
  (14,'en','Dr. Ekin Var'),
  (15,'tr','Kopya ve Asıl'),
  (15,'en','Copy and Original'),
  (16,'tr','Nyra''nın Seçimi'),
  (16,'en','Nyra''s Choice'),
  (17,'tr','Yirmi Üç Işık'),
  (17,'en','Twenty-Three Lights'),
  (18,'tr','Kalenin Düşüşü'),
  (18,'en','Fall of the Fortress'),
  (19,'tr','Gölge ile Yüz Yüze'),
  (19,'en','Face to Face with the Shadow'),
  (20,'tr','Yeni Dünya'),
  (20,'en','A New World')
) as v(n, lang, title)
join public.series s on s.slug='neo-genesis-2099'
join public.episodes e on e.series_id=s.id and e.n=v.n
on conflict (episode_id, lang) do update set title=excluded.title;
