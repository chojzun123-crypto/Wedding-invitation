-- ────────────────────────────────────────────────
--  축하 메시지(방명록) 테이블
--  Supabase 대시보드 → SQL Editor 에 붙여넣고 실행하세요.
-- ────────────────────────────────────────────────

create table if not exists public.comments (
  id            uuid default gen_random_uuid() primary key,
  name          varchar(50)  not null,
  message       text         not null,
  password_hash varchar(255) not null,
  visible       boolean      default true,
  created_at    timestamptz  default now()
);

-- 최신순 조회 최적화
create index if not exists comments_created_at_idx
  on public.comments (created_at desc);

-- RLS 활성화 (서버 Service Role Key 로만 접근 → 클라이언트 직접 접근 차단)
alter table public.comments enable row level security;
-- 별도 policy 를 만들지 않으므로 anon/authenticated 는 접근 불가.
-- 우리 앱은 서버 API(Service Role)만 사용하므로 안전합니다.
