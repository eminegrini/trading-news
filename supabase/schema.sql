
create table if not exists bot_state (
  id int primary key default 1,
  symbol text not null default 'BTC/USDT',
  timeframe text not null default '1m',
  equity numeric not null default 1000,
  position_side text,
  position_entry numeric,
  position_qty numeric,
  last_close numeric,
  updated_at timestamptz not null default now()
);
insert into bot_state (id) values (1) on conflict (id) do nothing;

create table if not exists trades (
  id uuid primary key default gen_random_uuid(),
  time timestamptz not null default now(),
  side text not null check (side in ('BUY','SELL')),
  price numeric not null,
  qty numeric not null,
  pnl numeric,
  reason text,
  live boolean not null default false,
  order_id text,
  created_at timestamptz not null default now()
);

create table if not exists bot_config (
  id int primary key default 1,
  fast_ema int not null default 12,
  slow_ema int not null default 26,
  rsi_period int not null default 14,
  rsi_min int not null default 52,
  tp_pct numeric not null default 0.03,
  sl_pct numeric not null default 0.02,
  risk_usd numeric not null default 10,
  paused boolean not null default false,
  report_email text,
  updated_at timestamptz not null default now()
);
insert into bot_config (id) values (1) on conflict (id) do nothing;

create table if not exists equity (
  time timestamptz not null default now(),
  equity numeric not null,
  price numeric,
  primary key (time)
);

alter table bot_state enable row level security;
alter table trades enable row level security;
alter table bot_config enable row level security;
alter table equity enable row level security;

drop policy if exists "read bot_state" on bot_state;
drop policy if exists "read trades" on trades;
drop policy if exists "read bot_config" on bot_config;
drop policy if exists "read equity" on equity;

create policy "read bot_state" on bot_state for select using (true);
create policy "read trades" on trades for select using (true);
create policy "read bot_config" on bot_config for select using (true);
create policy "read equity" on equity for select using (true);
