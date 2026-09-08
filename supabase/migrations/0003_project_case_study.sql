-- Case-study depth for projects.
--
-- A hiring reader wants problem → approach → tradeoffs → impact, which the
-- original schema had nowhere to put: `description` and `features` are a blurb
-- and a bullet list, not an argument.
--
-- Every column is additive with a default, so existing rows backfill and
-- lib/projects.ts maps the same shape before and after this runs. As with
-- 0002_add_cv_url.sql there is no migration runner in this repo — run it by
-- hand in the Supabase SQL editor (0002 is still unapplied; run both).
alter table projects
  add column featured  boolean not null default false,
  add column year      text    not null default '',
  add column problem   text    not null default '',
  add column approach  text[]  not null default '{}',
  add column tradeoffs text[]  not null default '{}',
  add column impact    text[]  not null default '{}';
