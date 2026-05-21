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
- `app/page.tsx` — 메인 페이지. HeroSection → SkillsSection → ProjectsSection 순서로 조합
- `app/globals.css` — Tailwind 지시어 + `.gradient-text`, `.glass`, `.glass-hover` 유틸리티 클래스 정의

**컴포넌트 구조:**

- `app/components/ui/GlassCard.tsx` — 글라스모피즘 카드 기본 컴포넌트. Skills, Projects 양쪽에서 재사용
- `app/components/ui/SectionWrapper.tsx` — 섹션 공통 padding/max-width 래퍼
- `app/components/HeroSection.tsx` — 이름, 직함, CTA 버튼, 배경 blob 애니메이션
- `app/components/SkillsSection.tsx` — 카테고리별 스킬 배지
- `app/components/ProjectsSection.tsx` — 프로젝트 카드 그리드

**콘텐츠 수정:**

- 스킬 추가/수정 → `app/data/skills.ts`
- 프로젝트 추가/수정 → `app/data/projects.ts`

**디자인 시스템:**

- 배경: `#0a0a14` (near-black) + radial gradient blobs (보라/파랑/청록)
- 글라스 카드: `bg-white/10 backdrop-blur-md border border-white/20` (`.glass` 클래스)
- 그라디언트 텍스트: `from-purple-400 via-cyan-400 to-blue-400` (`.gradient-text` 클래스)
- 커스텀 애니메이션: `animate-gradient-shift`, `animate-float`, `animate-fade-in-up` (`tailwind.config.ts`에 정의)
