create table if not exists applications (
  id          uuid primary key default gen_random_uuid(),
  company     text not null,
  role        text not null,
  status      text not null default 'Applied'
                check (status in ('Saved','Applied','Interview','Offer','Rejected')),
  priority    text not null default 'Medium'
                check (priority in ('High','Medium','Low')),
  date_applied date,
  salary      text,
  notes       text,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- Auto-update updated_at on every row change
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger applications_updated_at
  before update on applications
  for each row execute procedure update_updated_at();

-- Enable Row Level Security (good practice even for portfolio)
alter table applications enable row level security;

-- Allow all operations for now (tighten this when you add auth)
create policy "Allow all" on applications for all using (true);
