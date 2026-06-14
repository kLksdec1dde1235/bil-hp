/* ════════════════════════════════════════════════════════════
   프론트(정적 사이트)용 Supabase 공개 설정
   - 여기에는 anon(public) 키만 넣습니다. (읽기 전용 RLS 적용됨)
   - service_role 키는 절대 여기에 넣지 마세요.
   ════════════════════════════════════════════════════════════ */
window.BNL_SUPABASE = {
  url: 'https://cpqzixakiiegxiagqiai.supabase.co',          // ← 본인 프로젝트 URL
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwcXppeGFraWllZ3hpYWdxaWFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNzIzNzIsImV4cCI6MjA5Njk0ODM3Mn0.RE3ormjs823E6b7XeOnH8skJ3qF4HjYAh1sEISiZXR0',         // ← anon public key
};
