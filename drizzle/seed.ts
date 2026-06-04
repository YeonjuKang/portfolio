import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { experiences, educations } from './schema';
import * as dotenv from 'dotenv';

// .env 및 .env.local 로드
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is missing.');
}

const client = postgres(connectionString, { prepare: false });
const db = drizzle(client);

async function main() {
  console.log('🌱 데이터베이스 시딩(Seeding) 시작...');

  // 1. 기존 데이터 삭제 (중복 방지)
  await db.delete(experiences);
  await db.delete(educations);
  console.log('🗑️ 기존 경력 및 학력 데이터를 삭제했습니다.');

  // 2. 경력 데이터 시드 삽입
  await db.insert(experiences).values([
    {
      company: '테크 스타트업 플래너',
      role: '서비스 기획 및 PM',
      startedAt: '2024-03-01',
      endedAt: null, // 현재 재직 중
      description: [
        '비즈니스 요구 사항을 분석하여 신규 서비스 화면 설계 및 기능 스펙 정의',
        'AI 도구(Claude, ChatGPT 등)를 활용한 업무 프로세스 자동화 환경 구축',
        '다양한 협업 부서(개발, 디자인, 마케팅)와의 조율 및 프로젝트 일정 관리'
      ]
    },
    {
      company: '디지털 마케팅 에이전시',
      role: '콘텐츠 마케팅 매니저',
      startedAt: '2022-03-01',
      endedAt: '2024-02-29',
      description: [
        '브랜드 블로그 및 소셜 미디어 플랫폼 마케팅 콘텐츠 기획 및 제작',
        '웹 분석 도구를 사용한 캠페인 데이터 분석 및 광고 효율 극대화',
        '신규 잠재 고객(Lead) 유치를 위한 디지털 이벤트 기획'
      ]
    }
  ]);
  console.log('💼 경력 데이터를 삽입했습니다.');

  // 3. 학력 데이터 시드 삽입
  await db.insert(educations).values([
    {
      institution: '한국대학교',
      major: '경영학과 (학사 졸업)',
      startedAt: '2018-03-01',
      endedAt: '2022-02-28',
      description: '마케팅 및 비즈니스 데이터 분석 관련 교과 우수 이수'
    },
    {
      institution: '제로베이스 코드아카데미',
      major: 'Next.js & Supabase 풀스택 과정 수료',
      startedAt: '2025-10-01',
      endedAt: '2026-02-28',
      description: '바이브코딩 및 AI 툴을 활용한 모던 웹 애플리케이션 개발 방법론 습득'
    }
  ]);
  console.log('🎓 학력 데이터를 삽입했습니다.');

  console.log('✨ 시딩이 성공적으로 완료되었습니다!');
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ 시딩 중 오류 발생:', err);
  process.exit(1);
});
