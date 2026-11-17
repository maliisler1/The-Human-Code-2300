-- Bölüm 7 başlığı: uyanmış kapsüller 7, 11, 12, 22, 23 olduğundan uyuyan kapsül sayısı 18'dir.
update public.episode_titles t set title = v.title
from (values ('tr','On Sekiz Kapsül'),('en','Eighteen Capsules')) as v(lang,title),
     public.episodes e join public.series s on s.id = e.series_id
where t.episode_id = e.id and e.n = 7 and s.slug = 'neo-genesis-2099' and t.lang = v.lang;
