-- ============================================================================
-- BhukkadSMP Supabase Schema & Row Level Security (RLS)
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
-- ============================================================================

-- Drop existing objects first (safe to run multiple times)
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user;
drop trigger if exists on_profile_updated on public.profiles;
drop function if exists public.handle_updated_at;
drop policy if exists "Users can read own profile" on public.profiles;
drop policy if exists "Users can update own profile (limited)" on public.profiles;
drop policy if exists "Admins can read all profiles" on public.profiles;
drop policy if exists "Admins can update any profile" on public.profiles;
drop function if exists public.is_minecraft_username_taken;
drop table if exists public.profiles;

-- ============================================================================
-- 1. Profiles table (links to auth.users)
-- ============================================================================

create table public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  email         text,
  minecraft_username text unique,
  display_name  text,
  avatar_url    text,
  provider      text default 'email',
  role          text default 'user' check (role in ('user', 'moderator', 'admin')),
  rank          text default 'Player',
  balance       integer default 0,
  created_at    timestamp with time zone default now(),
  updated_at    timestamp with time zone default now()
);

-- ============================================================================
-- 2. Auto-create profile on signup
-- ============================================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, avatar_url, provider, display_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'avatar_url', new.raw_user_meta_data ->> 'picture'),
    coalesce(new.raw_user_meta_data ->> 'provider', 'email'),
    coalesce(
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'name',
      split_part(new.email, '@', 1)
    )
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================================
-- 3. Auto-update updated_at
-- ============================================================================

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger on_profile_updated
  before update on public.profiles
  for each row execute function public.handle_updated_at();

-- ============================================================================
-- 4. Protect role, rank, balance from user updates (trigger-based)
-- ============================================================================
-- This trigger ensures non-admin users cannot change protected columns.
-- Even if the frontend sends role/rank/balance in an update request,
-- this trigger resets them to their current values.

create or replace function public.protect_profile_columns()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
declare
  current_user_role text;
begin
  -- Get the role of the user making the update
  select role into current_user_role
  from public.profiles
  where id = auth.uid();

  -- If the user is not an admin, revert protected columns
  if current_user_role is null or current_user_role != 'admin' then
    new.role = old.role;
    new.rank = old.rank;
    new.balance = old.balance;
  end if;

  return new;
end;
$$;

create trigger on_profile_protect_columns
  before update on public.profiles
  for each row execute function public.protect_profile_columns();

-- ============================================================================
-- 5. Row Level Security Policies
-- ============================================================================

alter table public.profiles enable row level security;

-- Users can read their own profile
create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Users can update their own profile
-- Column protection is handled by the trigger above, not by NEW/OLD in RLS
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Admins can read all profiles
create policy "Admins can read all profiles"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Admins can update any profile (full access, trigger allows it)
create policy "Admins can update any profile"
  on public.profiles for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ============================================================================
-- 6. Minecraft username availability check (friendlier error than unique)
-- ============================================================================

create or replace function public.is_minecraft_username_taken(p_username text)
returns boolean
language sql
stable
as $$
  select exists (select 1 from public.profiles where minecraft_username = p_username);
$$;

-- ============================================================================
-- 7. Indexes
-- ============================================================================

create index if not exists idx_profiles_minecraft_username on public.profiles (minecraft_username);
create index if not exists idx_profiles_role on public.profiles (role);

-- ============================================================================
-- Important notes for developers
-- ============================================================================

-- From the frontend (React app), only these fields should ever be sent in update requests:
--   ✅ minecraft_username  — set once during /setup-username
--   ✅ display_name        — can be changed in profile settings
--   ✅ avatar_url          — can be changed in profile settings
--
-- These fields are protected by the on_profile_protect_columns trigger and will
-- be reverted if a non-admin user attempts to modify them:
--   ❌ role    — only changeable via Supabase dashboard or admin API
--   ❌ rank    — only changeable via Supabase dashboard or admin API
--   ❌ balance — only changeable via Supabase dashboard or admin API
--
-- Admin users bypass the protection trigger and can update any field.

-- ============================================================================
-- Supabase Dashboard setup (do these manually)
-- ============================================================================

-- 1. Authentication → Providers
--    - Email: enabled by default
--    - Google: enable, enter Client ID + Secret from Google Cloud Console
--    - Discord: enable, enter Client ID + Secret from Discord Developer Portal
--
-- 2. Authentication → URL Configuration
--    - Site URL: https://bhukkadsmp.fun (or http://localhost:5173 for dev)
--    - Redirect URLs:
--      https://bhukkadsmp.fun/auth/callback
--      http://localhost:5173/auth/callback
--    NOTE: The frontend already sends dynamic redirectTo using
--    window.location.origin, so it works in both local and production.
--    The Site URL is used as fallback for flows without explicit redirectTo.
--
-- 3. Authentication → Settings
--    - Make sure "Confirm email" is ON for email signups (recommended)
