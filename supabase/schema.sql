-- Extensiones
create extension if not exists "pgcrypto";

-- Perfil de usuario (rol admin)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'editor' check (role in ('admin', 'editor')),
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Secciones de sitio (home, textos de apoyo, etc.)
create table if not exists public.site_sections (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  subtitle text,
  description text,
  content text,
  image_path text,
  cta_label text,
  cta_href text,
  is_published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Galerías
create table if not exists public.galleries (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  cover_image_path text,
  is_published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Imágenes de galería
create table if not exists public.gallery_images (
  id uuid primary key default gen_random_uuid(),
  gallery_id uuid not null references public.galleries(id) on delete cascade,
  image_path text not null,
  alt_text text,
  sort_order int not null default 0,
  is_cover boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_gallery_images_gallery_id on public.gallery_images(gallery_id);

-- Radio
create table if not exists public.radio_programs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  schedule text,
  hosts text,
  stream_url text,
  external_link text,
  image_path text,
  is_published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Trigger updated_at
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists tr_profiles_updated_at on public.profiles;
create trigger tr_profiles_updated_at before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists tr_site_sections_updated_at on public.site_sections;
create trigger tr_site_sections_updated_at before update on public.site_sections
for each row execute function public.set_updated_at();

drop trigger if exists tr_galleries_updated_at on public.galleries;
create trigger tr_galleries_updated_at before update on public.galleries
for each row execute function public.set_updated_at();

drop trigger if exists tr_gallery_images_updated_at on public.gallery_images;
create trigger tr_gallery_images_updated_at before update on public.gallery_images
for each row execute function public.set_updated_at();

drop trigger if exists tr_radio_programs_updated_at on public.radio_programs;
create trigger tr_radio_programs_updated_at before update on public.radio_programs
for each row execute function public.set_updated_at();

-- Helper para RLS
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  );
$$;

-- RLS
alter table public.profiles enable row level security;
alter table public.site_sections enable row level security;
alter table public.galleries enable row level security;
alter table public.gallery_images enable row level security;
alter table public.radio_programs enable row level security;

-- Profiles
create policy "Profiles own read" on public.profiles
for select using (auth.uid() = id);

create policy "Admins manage profiles" on public.profiles
for all using (public.is_admin()) with check (public.is_admin());

-- Lectura pública de contenido publicado
create policy "Public read published site_sections" on public.site_sections
for select using (is_published = true);

create policy "Public read published galleries" on public.galleries
for select using (is_published = true);

create policy "Public read gallery_images" on public.gallery_images
for select using (
  exists (
    select 1 from public.galleries g
    where g.id = gallery_id and g.is_published = true
  )
);

create policy "Public read published radio" on public.radio_programs
for select using (is_published = true);

-- Escritura solo admin
create policy "Admin manage site_sections" on public.site_sections
for all using (public.is_admin()) with check (public.is_admin());

create policy "Admin manage galleries" on public.galleries
for all using (public.is_admin()) with check (public.is_admin());

create policy "Admin manage gallery_images" on public.gallery_images
for all using (public.is_admin()) with check (public.is_admin());

create policy "Admin manage radio_programs" on public.radio_programs
for all using (public.is_admin()) with check (public.is_admin());

-- Storage buckets (ejecutar en SQL editor)
insert into storage.buckets (id, name, public)
values
  ('site-assets', 'site-assets', true),
  ('gallery-images', 'gallery-images', true),
  ('radio-assets', 'radio-assets', true)
on conflict (id) do nothing;

-- Storage policies
create policy "Public read site-assets"
on storage.objects for select
using (bucket_id = 'site-assets');

create policy "Public read gallery-images"
on storage.objects for select
using (bucket_id = 'gallery-images');

create policy "Public read radio-assets"
on storage.objects for select
using (bucket_id = 'radio-assets');

create policy "Admin write site-assets"
on storage.objects for all
using (bucket_id = 'site-assets' and public.is_admin())
with check (bucket_id = 'site-assets' and public.is_admin());

create policy "Admin write gallery-images"
on storage.objects for all
using (bucket_id = 'gallery-images' and public.is_admin())
with check (bucket_id = 'gallery-images' and public.is_admin());

create policy "Admin write radio-assets"
on storage.objects for all
using (bucket_id = 'radio-assets' and public.is_admin())
with check (bucket_id = 'radio-assets' and public.is_admin());

-- Seed inicial mínimo
insert into public.site_sections (slug, title, subtitle, description, content, image_path, cta_label, cta_href, is_published, sort_order)
values
('home_hero', 'COMPAÑÍA DE TEATRO ENTREPARÉNTESIS', 'Organizadores del Festival de Teatro de Buin', null, null, '/images/hero-foto.webp', 'Conócenos', '/nosotros', true, 0),
('home_mission', 'Misión', null, 'Descentralizar el teatro y hacerlo accesible para todos.', null, null, null, null, true, 1),
('home_vision', 'Visión', null, 'Visibilizar nuestro trabajo y a nuestros integrantes.', null, null, null, null, true, 2),
('home_current_play', 'Obra Actual', null, null, 'ange-pangue', null, null, null, true, 3),
('radio_page_intro', 'Radio Entreparéntesis', 'Escucha nuestra programación musical y cultural en vivo', 'Radio Entreparéntesis Comunitaria, Actúa contigo.', 'https://sp.totalstreaming.net/cp/widgets/player/single/?p=8044', '/images/logoradio.webp', null, null, true, 0)
on conflict (slug) do nothing;

-- =====================================
-- EXTENSIÓN CMS POR MÓDULOS
-- =====================================

create table if not exists public.members (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  role text not null,
  description text,
  image_path text,
  is_published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.plays (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  year text not null,
  director text not null,
  description text,
  full_description text,
  cover_image_path text,
  is_featured boolean not null default false,
  is_current boolean not null default false,
  cast text,
  show_dates text,
  location text,
  is_published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.play_images (
  id uuid primary key default gen_random_uuid(),
  play_id uuid not null references public.plays(id) on delete cascade,
  image_path text not null,
  alt_text text,
  sort_order int not null default 0,
  is_cover boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_play_images_play_id on public.play_images(play_id);

create table if not exists public.home_featured_plays (
  id uuid primary key default gen_random_uuid(),
  play_id uuid not null references public.plays(id) on delete cascade,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  unique (play_id)
);

create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text not null,
  content text not null,
  author text not null,
  published_at date not null default current_date,
  image_path text,
  is_published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.festival_settings (
  id uuid primary key default gen_random_uuid(),
  hero_title text not null,
  hero_subtitle text,
  hero_image_path text,
  current_title text not null,
  current_subtitle text,
  current_description text,
  current_date text,
  current_location text,
  about_title text not null,
  about_content text,
  organizer_title text,
  organizer_content text,
  where_title text,
  where_content text,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

do $$
begin
  if not exists (select 1 from pg_type where typname = 'festival_item_section') then
    create type public.festival_item_section as enum ('current_vertical', 'current_horizontal', 'previous_editions');
  end if;
end $$;

create table if not exists public.festival_items (
  id uuid primary key default gen_random_uuid(),
  section public.festival_item_section not null,
  title text not null,
  description text,
  year_label text,
  image_path text not null,
  is_published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists tr_members_updated_at on public.members;
create trigger tr_members_updated_at before update on public.members
for each row execute function public.set_updated_at();

drop trigger if exists tr_plays_updated_at on public.plays;
create trigger tr_plays_updated_at before update on public.plays
for each row execute function public.set_updated_at();

drop trigger if exists tr_play_images_updated_at on public.play_images;
create trigger tr_play_images_updated_at before update on public.play_images
for each row execute function public.set_updated_at();

drop trigger if exists tr_news_updated_at on public.news;
create trigger tr_news_updated_at before update on public.news
for each row execute function public.set_updated_at();

drop trigger if exists tr_festival_settings_updated_at on public.festival_settings;
create trigger tr_festival_settings_updated_at before update on public.festival_settings
for each row execute function public.set_updated_at();

drop trigger if exists tr_festival_items_updated_at on public.festival_items;
create trigger tr_festival_items_updated_at before update on public.festival_items
for each row execute function public.set_updated_at();

alter table public.members enable row level security;
alter table public.plays enable row level security;
alter table public.play_images enable row level security;
alter table public.home_featured_plays enable row level security;
alter table public.news enable row level security;
alter table public.festival_settings enable row level security;
alter table public.festival_items enable row level security;

create policy "Public read published members" on public.members
for select using (is_published = true);

create policy "Public read published plays" on public.plays
for select using (is_published = true);

create policy "Public read play_images" on public.play_images
for select using (
  exists (
    select 1 from public.plays p
    where p.id = play_id and p.is_published = true
  )
);

create policy "Public read home_featured_plays" on public.home_featured_plays
for select using (true);

create policy "Public read published news" on public.news
for select using (is_published = true);

create policy "Public read published festival settings" on public.festival_settings
for select using (is_published = true);

create policy "Public read published festival items" on public.festival_items
for select using (is_published = true);

create policy "Admin manage members" on public.members
for all using (public.is_admin()) with check (public.is_admin());

create policy "Admin manage plays" on public.plays
for all using (public.is_admin()) with check (public.is_admin());

create policy "Admin manage play_images" on public.play_images
for all using (public.is_admin()) with check (public.is_admin());

create policy "Admin manage home_featured_plays" on public.home_featured_plays
for all using (public.is_admin()) with check (public.is_admin());

create policy "Admin manage news" on public.news
for all using (public.is_admin()) with check (public.is_admin());

create policy "Admin manage festival_settings" on public.festival_settings
for all using (public.is_admin()) with check (public.is_admin());

create policy "Admin manage festival_items" on public.festival_items
for all using (public.is_admin()) with check (public.is_admin());

insert into public.plays (slug, title, year, director, description, full_description, cover_image_path, is_featured, is_current, cast, show_dates, location, is_published, sort_order)
values (
  'ange-pangue',
  'Angë Pangue',
  '2022',
  'Rolando Collinao',
  'Montaje teatral inspirado en la cosmovisión mapuche.',
  'Obra teatral mapuche que incorpora corporalidad, música y una experiencia escénica inmersiva.',
  '/images/obras/angue.webp',
  true,
  true,
  'María José, Exequiel, Franco, Karla, Fran',
  'Por definir',
  'Por definir',
  true,
  0
)
on conflict (slug) do nothing;

insert into public.home_featured_plays (play_id, sort_order)
select p.id, 0
from public.plays p
where p.slug = 'ange-pangue'
on conflict (play_id) do nothing;

insert into public.news (slug, title, summary, content, author, published_at, image_path, is_published, sort_order)
values (
  'itinerancia-festival-de-teatro-de-buin',
  'Itinerancia del Festival de Teatro de Buin',
  'La itinerancia vuelve con talleres y presentaciones gratuitas para distintas localidades de la comuna.',
  'La penúltima semana antes del Festival se realizará la itinerancia por distintas localidades de Buin, con talleres y funciones abiertas a la comunidad.',
  'Lía D''acosta',
  '2025-08-09',
  '/images_noticias/1.webp',
  true,
  0
)
on conflict (slug) do nothing;

insert into public.festival_settings (
  hero_title,
  hero_subtitle,
  hero_image_path,
  current_title,
  current_subtitle,
  current_description,
  current_date,
  current_location,
  about_title,
  about_content,
  organizer_title,
  organizer_content,
  where_title,
  where_content,
  is_published
)
values (
  'Festival de Teatro de Buin',
  'Un espacio para la creación y el encuentro teatral',
  '/images/festivaldeteatro.webp',
  'XVII Festival de Teatro de Buin - 2025',
  'Desde el 14 al 18 de octubre',
  'Información editable del festival anual.',
  '14 al 18 de octubre de 2025',
  'Centro Cultural de Buin',
  '¿QUÉ ES EL FESTIVAL DE TEATRO DE BUIN?',
  'La gran fiesta cultural y artística de Buin.',
  '¿Quién organiza el festival?',
  'La Compañía de Teatro Entreparéntesis.',
  '¿Dónde se realiza?',
  'En el Centro Cultural de Buin y localidades de la comuna.',
  true
)
on conflict do nothing;
