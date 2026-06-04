# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

엠마비의 개인 포트폴리오 웹사이트. Next.js 15 App Router + Tailwind CSS + 글라스모피즘 디자인.

- GitHub: `YeonjuKang/portfolio`
- 기본 브랜치: `main`

## 개발 명령어

```bash
npm run dev      # 개발 서버 실행 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run lint     # ESLint 실행
```

## 아키텍처

**App Router** 구조 (`app/` 디렉토리):

- `app/layout.tsx` — 루트 레이아웃. Inter + Noto Sans KR 폰트 로드, `<html lang="ko">`, 전체 배경 설정
- `app/page.tsx` — 메인 페이지. HeroSection → AboutSection → SkillsSection → ExperienceSection → ProjectsSection → ContactSection 순서로 조합
- `app/globals.css` — Tailwind 지시어 + `.gradient-text`, `.glass`, `.glass-hover` 유틸리티 클래스 정의

**컴포넌트 구조:**

- `app/components/ui/GlassCard.tsx` — 글라스모피즘 카드 기본 컴포넌트. Skills, Projects 양쪽에서 재사용
- `app/components/ui/SectionWrapper.tsx` — 섹션 공통 padding/max-width 래퍼
- `app/components/HeroSection.tsx` — 이름, 직함, CTA 버튼, 배경 blob 애니메이션
- `app/components/SkillsSection.tsx` — 카테고리별 스킬 배지
- `app/components/ExperienceSection.tsx` — 경력 및 학력 타임라인 컴포넌트 (DB 연동)
- `app/components/ProjectsSection.tsx` — 프로젝트 카드 그리드

**콘텐츠 수정:**

- 스킬 추가/수정 → `app/data/skills.ts`
- 프로젝트 추가/수정 → `app/data/projects.ts`
- 경력 & 학력 수정 → 데이터베이스(`experiences`, `educations` 테이블) 수정 또는 `drizzle/seed.ts` 파일 수정을 통해 변경 가능

**외부 API 연동:**

> **⚠️ API 작업 필수 규칙**: 새 외부 API를 연동하거나 기존 API를 수정할 때는 **작업 시작 전에** 반드시 [`docs/api/`](docs/api/) 폴더를 먼저 확인하십시오.
> - 각 API별 스펙 파일(예: [`docs/api/job-spec.md`](docs/api/job-spec.md))에 엔드포인트, 요청/응답 스키마, 환경변수 키, 에러 코드, 구현 가이드가 정리되어 있습니다.
> - 새 API를 추가하면 `docs/api/` 폴더에 스펙 파일을 함께 작성하십시오.
> - API 키는 반드시 서버 사이드 환경변수로만 사용하고, `NEXT_PUBLIC_` 접두사를 붙이지 마십시오.

**데이터베이스 (Supabase + Drizzle ORM):**

> **⚠️ DB 작업 필수 규칙**: 테이블 추가, 컬럼 변경, 인덱스 설계 등 **모든 DB 관련 작업을 시작하기 전에** 반드시 [`docs/db/`](docs/db/) 폴더를 먼저 확인하십시오.
> - [`docs/db/erd.md`](docs/db/erd.md) — 전체 ERD (Mermaid) 및 테이블 상세 명세
> - 새 테이블/컬럼을 추가하거나 기존 스키마를 변경하면 `docs/db/erd.md`도 함께 업데이트하십시오.

- **스키마 정의**: [`drizzle/schema.ts`](drizzle/schema.ts)에 정의되어 있습니다.
- **설정 파일**: [`drizzle.config.ts`](file:///Users/EMMA_B/dev/portfolio/drizzle.config.ts)를 사용해 마이그레이션 등을 관리합니다.
- **주요 명령어**:
  - `npx drizzle-kit push` — 로컬 스키마 정의를 실시간으로 Supabase DB에 배포 및 동기화합니다.
  - `npx tsx drizzle/seed.ts` — DB 기초 데이터 시딩 스크립트를 실행합니다.

**디자인 시스템:**

- 배경: `#0a0a14` (near-black) + radial gradient blobs (보라/파랑/청록)
- 글라스 카드: `bg-white/10 backdrop-blur-md border border-white/20` (`.glass` 클래스)
- 그라디언트 텍스트: `from-purple-400 via-cyan-400 to-blue-400` (`.gradient-text` 클래스)
- 커스텀 애니메이션: `animate-gradient-shift`, `animate-float`, `animate-fade-in-up` (`tailwind.config.ts`에 정의)

