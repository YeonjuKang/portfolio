export interface Job {
  job_id: string
  employer_name: string
  employer_logo: string | null
  employer_website: string | null
  job_publisher: string
  job_employment_type: string
  job_title: string
  job_apply_link: string
  job_description: string
  job_is_remote: boolean
  job_posted_at_datetime_utc: string
  job_city: string | null
  job_state: string | null
  job_country: string
  job_min_salary: number | null
  job_max_salary: number | null
  job_salary_currency: string | null
  job_salary_period: string | null
  job_highlights: {
    Qualifications?: string[]
    Responsibilities?: string[]
    Benefits?: string[]
  }
}

export interface JobSearchResponse {
  status: string
  request_id: string
  parameters: {
    query: string
    date_posted: string
    country: string
    language: string
  }
  data: {
    jobs: Job[]
    cursor: string
  }
}

export interface SearchJobsOptions {
  numPages?: number
  country?: string
  datePosted?: 'all' | 'today' | '3days' | 'week' | 'month'
  cursor?: string
}

export async function searchJobs(
  query: string,
  options: SearchJobsOptions = {}
): Promise<JobSearchResponse> {
  const params = new URLSearchParams({
    query,
    num_pages: String(options.numPages ?? 1),
    country: options.country ?? 'us',
    date_posted: options.datePosted ?? 'all',
    ...(options.cursor ? { cursor: options.cursor } : {}),
  })

  const res = await fetch(
    `https://jsearch.p.rapidapi.com/search-v2?${params}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-host': 'jsearch.p.rapidapi.com',
        'x-rapidapi-key': process.env.RAPIDAPI_KEY!,
      },
      next: { revalidate: 3600 },
    }
  )

  if (!res.ok) throw new Error(`Job API error: ${res.status}`)
  return res.json()
}

// 고용 형태 한글 변환
export function formatEmploymentType(type: string): string {
  const map: Record<string, string> = {
    FULLTIME: '정규직',
    PARTTIME: '파트타임',
    CONTRACTOR: '계약직',
    INTERN: '인턴',
  }
  return map[type] ?? type
}

// 급여 포맷팅
export function formatSalary(job: Job): string | null {
  if (!job.job_min_salary && !job.job_max_salary) return null
  const currency = job.job_salary_currency ?? ''
  const period = job.job_salary_period === 'YEAR' ? '/년'
    : job.job_salary_period === 'MONTH' ? '/월'
    : job.job_salary_period === 'HOUR' ? '/시간' : ''
  const min = job.job_min_salary ? job.job_min_salary.toLocaleString() : null
  const max = job.job_max_salary ? job.job_max_salary.toLocaleString() : null
  const range = min && max ? `${min} ~ ${max}` : min ?? max
  return `${currency} ${range}${period}`.trim()
}

// 게시일 상대 시간
export function formatPostedDate(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days === 0) return '오늘'
  if (days === 1) return '1일 전'
  if (days < 30) return `${days}일 전`
  if (days < 60) return '1개월 전'
  return `${Math.floor(days / 30)}개월 전`
}
