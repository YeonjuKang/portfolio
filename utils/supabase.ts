import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // 개발 중에 환경 변수가 누락된 경우 안내 메시지를 제공합니다.
  console.warn(
    'Supabase 환경 변수가 설정되지 않았습니다. .env.local 파일을 확인해 주세요.'
  );
}

// 싱글톤 패턴으로 Supabase 클라이언트를 초기화하여 내보냅니다.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
);
