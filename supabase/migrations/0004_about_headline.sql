-- A short positioning line for the hero.
--
-- The hero was printing the whole of `bio` — four CV sentences at display size,
-- which read as a paste rather than a statement, and repeated what the About
-- section's `focus` list already said. `headline` carries the one- or two-line
-- claim; `bio` keeps the long form and moves down into the About block.
--
-- Additive with a default, like every migration after 0001, and the hero falls
-- back to `bio` while this is empty — so nothing breaks between running this
-- and filling the field in. Run it by hand in the Supabase SQL editor.
alter table about_info
  add column headline text not null default '';
