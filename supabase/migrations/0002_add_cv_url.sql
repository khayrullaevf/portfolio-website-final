-- CV is admin-editable like every other content field. The default backfills
-- the existing singleton row with today's static path so the site keeps
-- working before anyone touches the new admin field.
alter table personal_info
  add column cv_url text not null default '/cv/Fazliddin_Khayrullaev_CV.pdf';
