export interface Job {
  job_id: string
  job_title: string
  employer_name: string
  employer_logo: string | null
  employer_website: string | null
  job_publisher: string
  job_employment_type: string
  job_employment_types: string[]
  job_apply_link: string
  job_description: string
  job_is_remote: boolean
  job_posted_at: string                  // "5 days ago" 형태 문자열
  job_posted_at_datetime_utc: string
  job_location: string                   // "Washington, DC" 형태
  job_city: string | null
  job_state: string | null
  job_country: string
  job_salary_string: string | null       // "195K–315K a year" 형태
  job_min_salary: number | null
  job_max_salary: number | null
  job_salary_currency: string | null
  job_salary_period: string | null
  job_benefits_strings: string[] | null
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
