-- İzlenme sayacı: her karakterin her bölümü kaç kez açıldı.
-- Kişisel bilgi tutulmaz (kullanıcı, cihaz, konum yok); yalnızca karakter anahtarı, bölüm numarası, gün ve sayı.
-- Uygulama sayıyı yalnızca count_watch() üzerinden artırabilir; tabloyu yalnızca yöneticiler okuyabilir.

create table if not exists public.watch_counts (
  character_key text not null check (character_key ~ '^[a-z0-9-]{1,40}$'),
  n integer not null check (n between 0 and 200),
  day date not null default (now() at time zone 'utc')::date,
  plays bigint not null default 0,
  primary key (character_key, n, day)
);

alter table public.watch_counts enable row level security;

drop policy if exists "admin reads watch counts" on public.watch_counts;
create policy "admin reads watch counts" on public.watch_counts
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));

create or replace function public.count_watch(p_key text, p_n integer)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_key is null or p_key !~ '^[a-z0-9-]{1,40}$' or p_n is null or p_n < 0 or p_n > 200 then
    return;
  end if;
  insert into public.watch_counts (character_key, n, day, plays)
  values (p_key, p_n, (now() at time zone 'utc')::date, 1)
  on conflict (character_key, n, day) do update set plays = public.watch_counts.plays + 1;
end;
$$;

revoke all on function public.count_watch(text, integer) from public;
grant execute on function public.count_watch(text, integer) to anon, authenticated;

-- Yönetim sayfası için: karakter başına toplam, son 7 gün ve bugün.
create or replace function public.watch_count_summary()
returns table (character_key text, total bigint, last7 bigint, today bigint, top_episode integer)
language sql
stable
security definer
set search_path = public
as $$
  select w.character_key,
         sum(w.plays)::bigint as total,
         coalesce(sum(w.plays) filter (where w.day >= (now() at time zone 'utc')::date - 6), 0)::bigint as last7,
         coalesce(sum(w.plays) filter (where w.day = (now() at time zone 'utc')::date), 0)::bigint as today,
         (select x.n from public.watch_counts x where x.character_key = w.character_key and x.n > 0
            group by x.n order by sum(x.plays) desc, x.n limit 1) as top_episode
  from public.watch_counts w
  where public.has_role(auth.uid(), 'admin')
  group by w.character_key
  order by total desc;
$$;

revoke all on function public.watch_count_summary() from public;
grant execute on function public.watch_count_summary() to authenticated;
