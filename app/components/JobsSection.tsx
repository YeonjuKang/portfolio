'use client'

import { useState, useEffect, useCallback } from 'react'
import SectionWrapper from './ui/SectionWrapper'
import GlassCard from './ui/GlassCard'
import type { Job, JobSearchResponse } from '@/lib/jobs'
import { formatEmploymentType, formatSalary, formatPostedDate } from '@/lib/jobs'

const DEFAULT_QUERY = 'product manager service planner jobs'
const DATE_OPTIONS = [
  { value: 'all', label: '전체' },
  { value: 'today', label: '오늘' },
  { value: '3days', label: '3일 이내' },
  { value: 'week', label: '1주 이내' },
  { value: 'month', label: '1개월 이내' },
]

export default function JobsSection() {
  const [query, setQuery] = useState(DEFAULT_QUERY)
  const [inputValue, setInputValue] = useState(DEFAULT_QUERY)
  const [datePosted, setDatePosted] = useState('all')
  const [jobs, setJobs] = useState<Job[]>([])
  const [cursor, setCursor] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchJobs = useCallback(async (q: string, date: string, append = false, cur?: string) => {
    append ? setLoadingMore(true) : setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams({
        query: q,
        date_posted: date,
        ...(cur ? { cursor: cur } : {}),
      })
      const res = await fetch(`/api/jobs?${params}`)
      if (!res.ok) throw new Error(`요청 실패 (${res.status})`)
      const data: JobSearchResponse = await res.json()
      setJobs(prev => append ? [...prev, ...data.data.jobs] : data.data.jobs)
      setCursor(data.data.cursor ?? null)
    } catch (err) {
      setError(err instanceof Error ? err.message : '채용 공고를 불러오는 중 오류가 발생했습니다.')
    } finally {
      append ? setLoadingMore(false) : setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchJobs(query, datePosted)
  }, [query, datePosted, fetchJobs])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return
    setJobs([])
    setCursor(null)
    setQuery(inputValue.trim())
  }

  const handleDateChange = (value: string) => {
    setJobs([])
    setCursor(null)
    setDatePosted(value)
  }

  const handleLoadMore = () => {
    if (cursor) fetchJobs(query, datePosted, true, cursor)
  }

  return (
    <SectionWrapper id="jobs">
      {/* 섹션 제목 */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">채용 공고</h2>
        <p className="text-white/50 text-lg">관심 직무의 최신 채용 정보를 확인하세요</p>
      </div>

      {/* 검색 + 필터 */}
      <div className="mb-8 space-y-4">
        <form onSubmit={handleSearch} className="flex gap-3">
          <input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="검색어를 입력하세요 (예: product manager, UX designer)"
            className="flex-1 bg-white/5 border border-white/20 rounded-xl px-5 py-3 text-white placeholder-white/30 focus:outline-none focus:border-violet-500/70 focus:bg-white/8 transition text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-violet-600/80 hover:bg-violet-600 text-white font-semibold text-sm transition-all duration-200 disabled:opacity-50 whitespace-nowrap"
          >
            검색
          </button>
        </form>

        {/* 기간 필터 */}
        <div className="flex gap-2 flex-wrap">
          {DATE_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => handleDateChange(opt.value)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
                datePosted === opt.value
                  ? 'bg-violet-500/20 border-violet-500/60 text-violet-300'
                  : 'bg-white/5 border-white/15 text-white/50 hover:border-white/30 hover:text-white/70'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* 로딩 상태 */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass rounded-2xl p-6 animate-pulse space-y-3">
              <div className="h-4 bg-white/10 rounded w-3/4" />
              <div className="h-3 bg-white/10 rounded w-1/2" />
              <div className="h-3 bg-white/10 rounded w-2/3" />
            </div>
          ))}
        </div>
      )}

      {/* 에러 */}
      {error && !loading && (
        <GlassCard className="p-6 text-center">
          <p className="text-red-400 text-sm">{error}</p>
          <button
            onClick={() => fetchJobs(query, datePosted)}
            className="mt-3 px-4 py-2 text-xs rounded-lg border border-white/20 text-white/60 hover:text-white transition"
          >
            다시 시도
          </button>
        </GlassCard>
      )}

      {/* 결과 없음 */}
      {!loading && !error && jobs.length === 0 && (
        <GlassCard className="p-10 text-center">
          <p className="text-white/40 text-sm">검색 결과가 없습니다.</p>
        </GlassCard>
      )}

      {/* 채용 공고 목록 */}
      {!loading && jobs.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobs.map(job => (
              <JobCard key={job.job_id} job={job} />
            ))}
          </div>

          {/* 더보기 버튼 */}
          {cursor && (
            <div className="mt-8 text-center">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="px-8 py-3 rounded-xl border border-white/20 text-white/60 hover:text-white hover:border-white/40 font-medium text-sm transition-all duration-200 disabled:opacity-50"
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
  const salary = formatSalary(job)
  const location = [job.job_city, job.job_state, job.job_country].filter(Boolean).join(', ')

  return (
    <GlassCard as="article" className="p-5 flex flex-col gap-3">
      {/* 회사명 + 로고 */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-sm leading-snug line-clamp-2 group-hover:text-violet-300 transition-colors">
            {job.job_title}
          </h3>
          <p className="text-white/50 text-xs mt-1 truncate">{job.employer_name}</p>
        </div>
        {job.employer_logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={job.employer_logo}
            alt={job.employer_name}
            className="w-10 h-10 rounded-lg object-contain bg-white/10 p-1 shrink-0"
          />
        )}
      </div>

      {/* 배지 */}
      <div className="flex flex-wrap gap-1.5">
        {job.job_is_remote && (
          <span className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
            원격 근무
          </span>
        )}
        <span className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-400">
          {formatEmploymentType(job.job_employment_type)}
        </span>
        {location && (
          <span className="px-2 py-0.5 text-[11px] rounded-full bg-white/5 border border-white/15 text-white/40">
            {location}
          </span>
        )}
      </div>

      {/* 급여 + 날짜 */}
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/10">
        <span className="text-xs text-white/40">
          {salary ?? job.job_publisher}
        </span>
        <span className="text-xs text-white/30">
          {formatPostedDate(job.job_posted_at_datetime_utc)}
        </span>
      </div>

      {/* 지원 버튼 */}
      <a
        href={job.job_apply_link}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center py-2 rounded-lg border border-violet-500/30 text-violet-400 hover:bg-violet-500/10 hover:border-violet-500/60 text-xs font-medium transition-all duration-200"
      >
        지원하기 →
      </a>
    </GlassCard>
  )
}
