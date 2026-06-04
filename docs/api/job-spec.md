# Job Search API 연동 명세

RapidAPI의 **JSearch** 서비스를 통해 채용 공고 데이터를 조회하는 API 연동 명세입니다.

---

## 개요

| 항목 | 내용 |
|------|------|
| Provider | RapidAPI — JSearch |
| Base URL | `https://jsearch.p.rapidapi.com` |
| 인증 방식 | `x-rapidapi-key` 헤더 |
| 환경변수 키 | `RAPIDAPI_KEY` |

---

## 엔드포인트

### `GET /search-v2` — 채용 공고 검색

#### Request

```
GET https://jsearch.p.rapidapi.com/search-v2
```

**Headers**

| 헤더 | 필수 | 값 |
|------|------|----|
| `x-rapidapi-host` | ✅ | `jsearch.p.rapidapi.com` |
| `x-rapidapi-key` | ✅ | `process.env.RAPIDAPI_KEY` |
| `Content-Type` | ✅ | `application/json` |

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 | 예시 |
|----------|------|------|------|------|
| `query` | string | ✅ | 검색 키워드 (직무 + 지역) | `developer jobs in chicago` |
| `num_pages` | number | ✅ | 응답받을 페이지 수 | `1` |
| `country` | string | 선택 | 국가 코드 (ISO 2자리) | `us`, `kr` |
| `date_posted` | string | 선택 | 게시 기간 필터 | `all`, `today`, `3days`, `week`, `month` |
| `cursor` | string | 선택 | 다음 페이지 커서 (페이지네이션) | — |

**요청 예시**

```bash
curl --request GET \
  --url 'https://jsearch.p.rapidapi.com/search-v2?query=developer%20jobs%20in%20chicago&num_pages=1&country=us&date_posted=all' \
  --header 'Content-Type: application/json' \
  --header 'x-rapidapi-host: jsearch.p.rapidapi.com' \
  --header 'x-rapidapi-key: YOUR_API_KEY'
```

---

#### Response

**`200 OK`**

```typescript
interface JobSearchResponse {
  status: string          // "OK"
  request_id: string      // 요청 고유 ID
  parameters: {
    query: string
    date_posted: string
    country: string
    language: string
  }
  data: {
    jobs: Job[]
    cursor: string        // 다음 페이지 커서 (페이지네이션용)
  }
}

interface Job {
  job_id: string
  employer_name: string
  employer_logo: string | null
  employer_website: string | null
  job_publisher: string
  job_employment_type: string   // "FULLTIME" | "PARTTIME" | "CONTRACTOR" | "INTERN"
  job_title: string
  job_apply_link: string
  job_description: string
  job_is_remote: boolean
  job_posted_at_datetime_utc: string  // ISO 8601
  job_city: string | null
  job_state: string | null
  job_country: string
  job_min_salary: number | null
  job_max_salary: number | null
  job_salary_currency: string | null
  job_salary_period: string | null    // "YEAR" | "MONTH" | "HOUR"
  job_highlights: {
    Qualifications?: string[]
    Responsibilities?: string[]
    Benefits?: string[]
  }
}
```

**응답 예시**

```json
{
  "status": "OK",
  "request_id": "abc123",
  "parameters": {
    "query": "developer jobs in chicago",
    "date_posted": "all",
    "country": "us",
    "language": "en"
  },
  "data": {
    "jobs": [
      {
        "job_id": "xyz789",
        "employer_name": "Tech Corp",
        "job_title": "Senior Frontend Developer",
        "job_employment_type": "FULLTIME",
        "job_is_remote": true,
        "job_posted_at_datetime_utc": "2026-06-01T12:00:00.000Z",
        "job_city": "Chicago",
        "job_state": "IL",
        "job_country": "US",
        "job_min_salary": 100000,
        "job_max_salary": 150000,
        "job_salary_currency": "USD",
        "job_salary_period": "YEAR"
      }
    ],
    "cursor": "eyJwYWdlIjoyfQ=="
  }
}
```

---

## 에러 응답

| HTTP 상태 코드 | 의미 | 대응 |
|---------------|------|------|
| `400` | 잘못된 쿼리 파라미터 | query 파라미터 확인 |
| `401` | 인증 실패 | `RAPIDAPI_KEY` 환경변수 확인 |
| `429` | 요청 한도 초과 | Rate limit 초과 — 요청 빈도 줄이기 |
| `500` | 서버 오류 | 재시도 또는 fallback 처리 |

---

## 구현 가이드

### 1. 환경변수 설정

`.env.local`에 추가:
```
RAPIDAPI_KEY=your_api_key_here
```

> `NEXT_PUBLIC_` 접두사를 붙이지 마세요. API 키는 서버 사이드에서만 사용해야 합니다.

### 2. 권장 구현 위치

| 구분 | 경로 | 역할 |
|------|------|------|
| API 클라이언트 | `lib/jobs.ts` | fetch 함수, 타입 정의 |
| Route Handler | `app/api/jobs/route.ts` | 클라이언트 → 서버 프록시 |
| UI 컴포넌트 | `app/components/JobsSection.tsx` | 목록 렌더링 |

### 3. 서버 사이드 fetch 예시

```typescript
// lib/jobs.ts
export async function searchJobs(query: string, options?: {
  numPages?: number
  country?: string
  datePosted?: 'all' | 'today' | '3days' | 'week' | 'month'
  cursor?: string
}) {
  const params = new URLSearchParams({
    query,
    num_pages: String(options?.numPages ?? 1),
    country: options?.country ?? 'kr',
    date_posted: options?.datePosted ?? 'all',
    ...(options?.cursor ? { cursor: options.cursor } : {}),
  })

  const res = await fetch(
    `https://jsearch.p.rapidapi.com/search-v2?${params}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-host': 'jsearch.p.rapidapi.com',
        'x-rapidapi-key': process.env.RAPIDAPI_KEY!,
      },
      next: { revalidate: 3600 }, // 1시간 캐시
    }
  )

  if (!res.ok) throw new Error(`Job API error: ${res.status}`)
  return res.json() as Promise<JobSearchResponse>
}
```

### 4. Rate Limit 유의사항

- RapidAPI 무료 플랜 기준 월 200회 요청
- Next.js `fetch` 캐싱(`next: { revalidate }`)을 활용해 불필요한 요청 최소화
- 검색 결과를 Supabase에 캐싱하는 방식도 고려 가능

---

## 관련 문서

- [docs/db/erd.md](../db/erd.md) — DB 스키마 (채용 공고 캐싱 테이블 추가 시 참조)
- [JSearch RapidAPI 공식 문서](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch)
