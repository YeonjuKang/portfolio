'use client'

import { useState, useEffect, useCallback } from 'react'
import SectionWrapper from './ui/SectionWrapper'
import type { Job, JobSearchResponse } from '@/lib/jobs'

const DEFAULT_QUERY = 'product manager service planner jobs'

const DATE_FILTERS = [
  { value: 'all',    label: '전체' },
  { value: 'today',  label: '오늘' },
  { value: '3days',  label: '3일' },
  { value: 'week',   label: '1주' },
  { value: 'month',  label: '1개월' },
]

export default function JobsSection() {
  const [inputValue, setInputValue]   = useState(DEFAULT_QUERY)
  const [query, setQuery]             = useState(DEFAULT_QUERY)
  const [datePosted, setDatePosted]   = useState('all')
  const [jobs, setJobs]               = useState<Job[]>([])
  const [cursor, setCursor]           = useState<string | null>(null)
  const [loading, setLoading]         = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError]             = useState<string | null>(null)

  const fetchJobs = useCallback(async (q: string, date: string, append = false, cur?: string) => {
    append ? setLoadingMore(true) : setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams({ query: q, date_posted: date, ...(cur ? { cursor: cur } : {}) })
      const res = await fetch(`/api/jobs?${params}`)
      if (!res.ok) throw new Error(`요청 실패 (${res.status})`)
      const data: JobSearchResponse = await res.json()
      setJobs(prev => append ? [...prev, ...data.data.jobs] : data.data.jobs)
      setCursor(data.data.cursor ?? null)
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다.')
    } finally {
      append ? setLoadingMore(false) : setLoading(false)
    }
  }, [])

  useEffect(() => { fetchJobs(query, datePosted) }, [query, datePosted, fetchJobs])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = inputValue.trim()
    if (!trimmed) return
    setJobs([])
    setCursor(null)
    setQuery(trimmed)
  }

  const handleDateChange = (value: string) => {
    setJobs([])
    setCursor(null)
    setDatePosted(value)
  }

  return (
    <SectionWrapper id="jobs">
      {/* 섹션 헤더 */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">채용 공고</h2>
        <p className="text-white/50 text-lg">관심 직무의 최신 채용 정보를 확인하세요</p>
      </div>

      {/* 검색 바 */}
      <form onSubmit={handleSearch} className="flex gap-3 mb-4">
        <input
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="직무 키워드를 입력하세요 (예: product manager, UX designer)"
          className="flex-1 bg-white/5 border border-white/20 rounded-xl px-5 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-violet-500/60 transition"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-xl bg-violet-600/80 hover:bg-violet-600 text-white text-sm font-semibold transition disabled:opacity-50 shrink-0"
        >
          검색
        </button>
      </form>

      {/* 기간 필터 */}
      <div className="flex gap-2 mb-8">
        {DATE_FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => handleDateChange(f.value)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium border transition ${
              datePosted === f.value
                ? 'bg-violet-500/20 border-violet-500/50 text-violet-300'
                : 'bg-white/5 border-white/15 text-white/50 hover:border-white/30 hover:text-white/70'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* 스켈레톤 */}
      {loading && (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="glass rounded-2xl p-5 animate-pulse flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-white/10 rounded w-2/3" />
                <div className="h-3 bg-white/10 rounded w-1/3" />
                <div className="h-3 bg-white/10 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 에러 */}
      {error && !loading && (
        <div className="glass rounded-2xl p-8 text-center">
          <p className="text-red-400 text-sm mb-3">{error}</p>
          <button
            onClick={() => fetchJobs(query, datePosted)}
            className="px-4 py-2 text-xs rounded-lg border border-white/20 text-white/60 hover:text-white transition"
          >
            다시 시도
          </button>
        </div>
      )}

      {/* 결과 없음 */}
      {!loading && !error && jobs.length === 0 && (
        <div className="glass rounded-2xl p-12 text-center">
          <p className="text-white/30 text-sm">검색 결과가 없습니다.</p>
        </div>
      )}

      {/* 공고 목록 */}
      {!loading && jobs.length > 0 && (
        <>
          <p className="text-xs text-white/30 mb-4">{jobs.length}개 공고</p>
          <div className="space-y-3">
            {jobs.map(job => <JobCard key={job.job_id} job={job} />)}
          </div>

          {cursor && (
            <div className="mt-8 text-center">
              <button
                onClick={() => fetchJobs(query, datePosted, true, cursor)}
                disabled={loadingMore}
                className="px-8 py-3 rounded-xl border border-white/20 text-white/50 hover:text-white hover:border-white/40 text-sm font-medium transition disabled:opacity-50"
              >
                {loadingMore ? '불러오는 중...' : '더보기'}
              </button>
            </div>
          )}
        </>
      )}
    </SectionWrapper>
  )
}

function JobCard({ job }: { job: Job }) {
  return (
    <a
      href={job.job_apply_link}
      target="_blank"
      rel="noopener noreferrer"
      className="glass glass-hover rounded-2xl p-5 flex gap-4 items-start group block transition-all duration-200"
    >
      {/* 회사 로고 */}
      <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
        {job.employer_logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={job.employer_logo} alt={job.employer_name} className="w-10 h-10 object-contain" />
        ) : (
          <span className="text-xl">🏢</span>
        )}
      </div>

      {/* 본문 */}
      <div className="flex-1 min-w-0">
        {/* 직무명 */}
        <h3 className="text-white font-semibold text-sm leading-snug group-hover:text-violet-300 transition-colors line-clamp-1">
          {job.job_title}
        </h3>

        {/* 회사명 · 위치 · 게시일 */}
        <p className="text-white/50 text-xs mt-1 truncate">
          {job.employer_name}
          {job.job_location && <> · <span>{job.job_location}</span></>}
          {job.job_posted_at && <> · <span className="text-white/30">{job.job_posted_at}</span></>}
        </p>

        {/* 배지 */}
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {job.job_is_remote && (
            <Badge color="cyan">원격</Badge>
          )}
          {job.job_employment_type && (
            <Badge color="violet">{job.job_employment_type}</Badge>
          )}
          {job.job_benefits_strings?.slice(0, 2).map(b => (
            <Badge key={b} color="gray">{b}</Badge>
          ))}
        </div>
      </div>

      {/* 급여 + 출처 */}
      <div className="text-right shrink-0 flex flex-col items-end gap-1.5">
        {job.job_salary_string ? (
          <span className="text-xs font-semibold text-violet-300 whitespace-nowrap">
            {job.job_salary_string}
          </span>
        ) : (
          <span className="text-xs text-white/20">급여 미기재</span>
        )}
        <span className="text-[10px] text-white/25 whitespace-nowrap">{job.job_publisher}</span>
        <span className="mt-1 text-[11px] text-violet-400 group-hover:text-violet-300 transition-colors font-medium">
          지원하기 →
        </span>
      </div>
    </a>
  )
}

function Badge({ children, color }: { children: React.ReactNode; color: 'cyan' | 'violet' | 'gray' }) {
  const styles = {
    cyan:   'bg-cyan-500/10 border-cyan-500/25 text-cyan-400',
    violet: 'bg-violet-500/10 border-violet-500/25 text-violet-400',
    gray:   'bg-white/5 border-white/15 text-white/40',
  }
  return (
    <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full border ${styles[color]}`}>
      {children}
    </span>
  )
}
