import { NextRequest, NextResponse } from 'next/server'
import { searchJobs } from '@/lib/jobs'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const query = searchParams.get('query')

  if (!query) {
    return NextResponse.json({ error: 'query 파라미터가 필요합니다.' }, { status: 400 })
  }

  try {
    const data = await searchJobs(query, {
      numPages: Number(searchParams.get('num_pages') ?? 1),
      country: searchParams.get('country') ?? 'us',
      datePosted: (searchParams.get('date_posted') as 'all' | 'today' | '3days' | 'week' | 'month') ?? 'all',
      cursor: searchParams.get('cursor') ?? undefined,
    })
    return NextResponse.json(data)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'API 요청 실패'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
