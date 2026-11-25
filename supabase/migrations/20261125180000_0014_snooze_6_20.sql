-- Snooze with Tik: 6–20. bölümler (15'er saniye). Videolar "animations" deposunda snooze/ep<n>.mp4.
insert into public.episodes (series_id, n, minutes, duration_sec, status)
select s.id, g.n, 1, 15, 'ready'
from public.series s
cross join generate_series(6, 20) as g(n)
where s.slug = 'snooze-with-tik'
on conflict (series_id, n) do nothing;

insert into public.episode_titles (episode_id, lang, title)
select e.id, v.lang, v.title
from (values
  (6, 'tr', 'Davul'), (6, 'en', 'The Drum'),
  (7, 'tr', 'Tüy'), (7, 'en', 'The Feather'),
  (8, 'tr', 'Perde'), (8, 'en', 'The Curtains'),
  (9, 'tr', 'Horoz'), (9, 'en', 'The Rooster'),
  (10, 'tr', 'Trompet'), (10, 'en', 'The Trumpet'),
  (11, 'tr', 'Çay'), (11, 'en', 'Tea'),
  (12, 'tr', 'Çekiştirme'), (12, 'en', 'Tug of War'),
  (13, 'tr', 'Uykucu Tik'), (13, 'en', 'Sleepy Tik'),
  (14, 'tr', 'Zincirleme'), (14, 'en', 'Chain Reaction'),
  (15, 'tr', 'Baş Dönmesi'), (15, 'en', 'Dizzy'),
  (16, 'tr', 'Ayna'), (16, 'en', 'The Mirror'),
  (17, 'tr', 'Trambolin'), (17, 'en', 'Trampoline'),
  (18, 'tr', 'Geçit Töreni'), (18, 'en', 'The Parade'),
  (19, 'tr', 'Kurabiye'), (19, 'en', 'The Cookie'),
  (20, 'tr', 'Günaydın'), (20, 'en', 'Good Morning')
) as v(n, lang, title)
join public.series s on s.slug = 'snooze-with-tik'
join public.episodes e on e.series_id = s.id and e.n = v.n
on conflict (episode_id, lang) do nothing;
