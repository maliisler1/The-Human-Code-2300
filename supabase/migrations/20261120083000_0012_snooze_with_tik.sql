-- Snooze with Tik: konuşmasız, 15 saniyelik bölümlerden oluşan komedi dizisi.
-- Dizi ve bölümler TASLAK olarak eklenir; yayımlanana kadar uygulamada hiçbir şey değişmez.
-- Dizi yönetim panelinden "yayımlandı" yapıldığında ana ekranda yalnızca bu dizi görünür (tek dizi modu).
-- Mevcut dizilere ve bölümlere dokunulmaz.

insert into public.series (slug, title, category, status, sort)
values ('snooze-with-tik', 'Snooze with Tik', 'comedy', 'draft', 20)
on conflict (slug) do nothing;

insert into public.series_text (series_id, lang, tagline, description)
select s.id, v.lang, v.tagline, v.description
from public.series s
cross join (values
  ('tr', 'Tik''in tek bir işi var: herkesi uyandırmak.', 'Çalar saatin içinde yaşayan minik Tik, her sabah evdekileri uyandırmaya çalışır. Kimse uyanmaz.'),
  ('en', 'Tik has one job: wake everyone up.', 'Tiny Tik lives inside the alarm clock and tries to wake the family every morning. Nobody wakes up.'),
  ('de', 'Tik hat nur eine Aufgabe: alle aufwecken.', 'Der winzige Tik wohnt im Wecker und versucht jeden Morgen, die Familie zu wecken. Niemand wacht auf.'),
  ('fr', 'Tik n''a qu''une mission : réveiller tout le monde.', 'Le minuscule Tik vit dans le réveil et tente chaque matin de réveiller la famille. Personne ne se réveille.'),
  ('es', 'Tik tiene un solo trabajo: despertar a todos.', 'El diminuto Tik vive dentro del despertador e intenta despertar a la familia cada mañana. Nadie se despierta.'),
  ('pt', 'Tik tem um único trabalho: acordar todo mundo.', 'O pequenino Tik mora dentro do despertador e tenta acordar a família todas as manhãs. Ninguém acorda.'),
  ('ar', 'لدى تيك مهمة واحدة: إيقاظ الجميع.', 'يعيش تيك الصغير داخل المنبّه ويحاول إيقاظ العائلة كل صباح. لا أحد يستيقظ.'),
  ('hi', 'टिक का बस एक ही काम है: सबको जगाना।', 'नन्हा टिक अलार्म घड़ी के अंदर रहता है और हर सुबह परिवार को जगाने की कोशिश करता है। कोई नहीं जागता।')
) as v(lang, tagline, description)
where s.slug = 'snooze-with-tik'
on conflict (series_id, lang) do nothing;

-- 5 bölüm: her biri 15 saniye, video yüklenene kadar taslak.
insert into public.episodes (series_id, n, minutes, duration_sec, status)
select s.id, g.n, 1, 15, 'draft'
from public.series s
cross join generate_series(1, 5) as g(n)
where s.slug = 'snooze-with-tik'
on conflict (series_id, n) do nothing;

insert into public.episode_titles (episode_id, lang, title)
select e.id, v.lang, v.title
from (values
  (1, 'tr', 'Tencere Kapakları'),
  (1, 'en', 'Pot Lids'),
  (2, 'tr', 'Yorgan'),
  (2, 'en', 'The Blanket'),
  (3, 'tr', 'Kahve'),
  (3, 'en', 'Coffee'),
  (4, 'tr', 'Telefon'),
  (4, 'en', 'The Phone'),
  (5, 'tr', 'Büyükanne'),
  (5, 'en', 'Grandma')
) as v(n, lang, title)
join public.series s on s.slug = 'snooze-with-tik'
join public.episodes e on e.series_id = s.id and e.n = v.n
on conflict (episode_id, lang) do nothing;
