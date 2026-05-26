export interface ExperienceItem {
  title: string;        // 회사명 또는 기관명
  role: string;         // 직무 또는 역할
  period: string;       // 재직 기간
  description: string[]; // 주요 성과 및 담당 업무
}

export interface EducationItem {
  institution: string;  // 학교명 또는 교육기관명
  major: string;        // 전공 또는 과정명
  period: string;       // 재학 및 수강 기간
  description?: string; // 추가 설명 (선택 사항)
}

export const experiences: ExperienceItem[] = [
  {
    title: '테크 스타트업 플래너',
    role: '서비스 기획 및 PM',
    period: '2024.03 - 현재',
    description: [
      '비즈니스 요구 사항을 분석하여 신규 서비스 화면 설계 및 기능 스펙 정의',
      'AI 도구(Claude, ChatGPT 등)를 활용한 업무 프로세스 자동화 환경 구축',
      '다양한 협업 부서(개발, 디자인, 마케팅)와의 조율 및 프로젝트 일정 관리'
    ]
  },
  {
    title: '디지털 마케팅 에이전시',
    role: '콘텐츠 마케팅 매니저',
    period: '2022.03 - 2024.02',
    description: [
      '브랜드 블로그 및 소셜 미디어 플랫폼 마케팅 콘텐츠 기획 및 제작',
      '웹 분석 도구를 사용한 캠페인 데이터 분석 및 광고 효율 극대화',
      '신규 잠재 고객(Lead) 유치를 위한 디지털 이벤트 기획'
    ]
  }
];

export const educations: EducationItem[] = [
  {
    institution: '한국대학교',
    major: '경영학과 (학사 졸업)',
    period: '2018.03 - 2022.02',
    description: '마케팅 및 비즈니스 데이터 분석 관련 교과 우수 이수'
  },
  {
    institution: '제로베이스 코드아카데미',
    major: 'Next.js & Supabase 풀스택 과정 수료',
    period: '2025.10 - 2026.02',
    description: '바이브코딩 및 AI 툴을 활용한 모던 웹 애플리케이션 개발 방법론 습득'
  }
];
