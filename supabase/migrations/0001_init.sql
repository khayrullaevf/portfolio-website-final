-- Portfolio content schema
-- Public (anon) read access on everything; write access restricted to authenticated users
-- (only one Supabase Auth user will ever exist for this project's admin).

create extension if not exists "pgcrypto";

-- ---------- Singleton settings tables ----------

create table personal_info (
  id smallint primary key default 1 check (id = 1),
  name text not null default '',
  title text not null default '',
  location text not null default '',
  avatar_url text not null default '',
  email text not null default '',
  phone text not null default '',
  working_hours text not null default '',
  available_for_work boolean not null default true,
  badges text[] not null default '{}',
  updated_at timestamptz not null default now()
);
insert into personal_info (id) values (1);

create table about_info (
  id smallint primary key default 1 check (id = 1),
  bio text not null default '',
  focus text[] not null default '{}',
  interests text[] not null default '{}',
  updated_at timestamptz not null default now()
);
insert into about_info (id) values (1);

create table meta_info (
  id smallint primary key default 1 check (id = 1),
  title text not null default '',
  description text not null default '',
  updated_at timestamptz not null default now()
);
insert into meta_info (id) values (1);

-- ---------- List tables ----------

create table social_links (
  id uuid primary key default gen_random_uuid(),
  platform text not null,
  url text not null,
  icon text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table languages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  proficiency text not null,
  level int not null default 0,
  flag text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table experience (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  company text not null,
  location text not null default '',
  period text not null default '',
  description text not null default '',
  technologies text[] not null default '{}',
  is_active boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  level int not null default 0,
  category text not null default '',
  color text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table certifications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  issuer text not null default '',
  date text not null default '',
  logo_url text not null default '',
  pdf_url text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table education (
  id uuid primary key default gen_random_uuid(),
  degree text not null,
  institution text not null default '',
  year text not null default '',
  logo_url text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null default '',
  short_description text not null default '',
  description text[] not null default '{}',
  features text[] not null default '{}',
  technologies text[] not null default '{}',
  cover_image_url text not null default '',
  thumbnail_image_url text not null default '',
  client text,
  timeline text not null default '',
  role text not null default '',
  live_url text,
  github_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table project_gallery (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  url text not null,
  caption text,
  sort_order int not null default 0
);

-- ---------- Row Level Security ----------

alter table personal_info enable row level security;
alter table about_info enable row level security;
alter table meta_info enable row level security;
alter table social_links enable row level security;
alter table languages enable row level security;
alter table experience enable row level security;
alter table skills enable row level security;
alter table certifications enable row level security;
alter table education enable row level security;
alter table projects enable row level security;
alter table project_gallery enable row level security;

do $$
declare
  t text;
begin
  for t in select unnest(array[
    'personal_info','about_info','meta_info','social_links','languages',
    'experience','skills','certifications','education','projects','project_gallery'
  ])
  loop
    execute format('create policy "%s_public_read" on %I for select using (true)', t, t);
    execute format('create policy "%s_auth_insert" on %I for insert to authenticated with check (true)', t, t);
    execute format('create policy "%s_auth_update" on %I for update to authenticated using (true) with check (true)', t, t);
    execute format('create policy "%s_auth_delete" on %I for delete to authenticated using (true)', t, t);
  end loop;
end $$;

-- ---------- Storage ----------

insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;

create policy "portfolio_public_read"
  on storage.objects for select
  using (bucket_id = 'portfolio');

create policy "portfolio_auth_insert"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'portfolio');

create policy "portfolio_auth_update"
  on storage.objects for update to authenticated
  using (bucket_id = 'portfolio');

create policy "portfolio_auth_delete"
  on storage.objects for delete to authenticated
  using (bucket_id = 'portfolio');
