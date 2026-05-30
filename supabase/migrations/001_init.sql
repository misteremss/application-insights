-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── USERS ──
create table users (
  id           text primary key,
  email        text unique not null,
  name         text,
  image        text,
  stripe_customer_id text unique,
  plan         text not null default 'free' check (plan in ('free','starter','growth','agency')),
  replies_used_this_month integer not null default 0,
  created_at   timestamptz not null default now()
);
alter table users enable row level security;
create policy "Users can read own data" on users for select using (auth.uid()::text = id);
create policy "Users can update own data" on users for update using (auth.uid()::text = id);

-- ── USER TOKENS ──
create table user_tokens (
  id            uuid primary key default uuid_generate_v4(),
  user_id       text references users(id) on delete cascade,
  access_token  text,
  refresh_token text,
  expires_at    bigint,
  updated_at    timestamptz default now()
);
alter table user_tokens enable row level security;
create policy "Users can manage own tokens" on user_tokens for all using (auth.uid()::text = user_id);

-- ── SUBSCRIPTIONS ──
create table subscriptions (
  id                     uuid primary key default uuid_generate_v4(),
  user_id                text references users(id) on delete cascade,
  stripe_subscription_id text unique,
  stripe_price_id        text,
  plan                   text,
  status                 text,
  current_period_end     timestamptz,
  created_at             timestamptz default now()
);
alter table subscriptions enable row level security;
create policy "Users can read own subscriptions" on subscriptions for select using (auth.uid()::text = user_id);

-- ── LOCATIONS ──
create table locations (
  id               uuid primary key default uuid_generate_v4(),
  user_id          text references users(id) on delete cascade,
  name             text not null,
  address          text,
  gmb_location_id  text not null,
  avg_rating       float,
  total_reviews    integer default 0,
  pending_replies  integer default 0,
  created_at       timestamptz default now()
);
create index locations_user_id_idx on locations(user_id);
alter table locations enable row level security;
create policy "Users can manage own locations" on locations for all using (auth.uid()::text = user_id);

-- ── REVIEWS ──
create table reviews (
  id              uuid primary key default uuid_generate_v4(),
  location_id     uuid references locations(id) on delete cascade,
  gmb_review_id   text unique not null,
  reviewer_name   text not null,
  reviewer_avatar text,
  rating          smallint not null check (rating between 1 and 5),
  review_text     text,
  reply_text      text,
  replied_at      timestamptz,
  status          text not null default 'pending' check (status in ('pending','replied','skipped')),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create index reviews_location_id_idx on reviews(location_id);
create index reviews_status_idx on reviews(status);
alter table reviews enable row level security;
create policy "Users can manage reviews for their locations" on reviews
  for all using (
    location_id in (
      select id from locations where user_id = auth.uid()::text
    )
  );

-- ── REPLY DRAFTS ──
create table reply_drafts (
  id          uuid primary key default uuid_generate_v4(),
  review_id   uuid references reviews(id) on delete cascade,
  draft_text  text not null,
  tone        text not null check (tone in ('professional','friendly','apologetic','grateful')),
  created_at  timestamptz default now()
);
alter table reply_drafts enable row level security;
create policy "Users can manage drafts for their reviews" on reply_drafts
  for all using (
    review_id in (
      select r.id from reviews r
      join locations l on r.location_id = l.id
      where l.user_id = auth.uid()::text
    )
  );

-- ── FUNCTION: increment replies used ──
create or replace function increment_replies_used(user_id text)
returns void language sql security definer as $$
  update users set replies_used_this_month = replies_used_this_month + 1
  where id = user_id;
$$;
