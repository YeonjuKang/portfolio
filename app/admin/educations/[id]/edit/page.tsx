import Link from 'next/link'
import { notFound } from 'next/navigation'
import { db } from '@/index'
import { educations } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'
import { updateEducation } from '../../actions'

export const dynamic = 'force-dynamic'

export default async function EditEducationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [edu] = await db.select().from(educations).where(eq(educations.id, Number(id)))

  if (!edu) notFound()

  const updateAction = updateEducation.bind(null, edu.id)

  return (
    <div className="min-h-screen bg-[#0a0a14] px-4 py-16">
      <div className="max-w-2xl mx-auto">

        <Link href="/#experience" className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 text-sm mb-8 transition-colors">
          ← 포트폴리오로 돌아가기
        </Link>

        <div className="glass rounded-2xl p-8">
          <h1 className="text-2xl font-bold gradient-text mb-8">학력 수정</h1>

          <form action={updateAction} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm text-white/60 font-medium">학교/교육기관명 *</label>
              <input
                name="institution"
                required
                defaultValue={edu.institution}
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-pink-500/70 focus:bg-white/8 transition"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-white/60 font-medium">전공/과정명 *</label>
              <input
                name="major"
                required
                defaultValue={edu.major}
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-pink-500/70 focus:bg-white/8 transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-white/60 font-medium">입학일 *</label>
                <input
                  name="started_at"
                  type="date"
                  required
                  defaultValue={edu.startedAt}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500/70 focus:bg-white/8 transition [color-scheme:dark]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/60 font-medium">졸업/수료일 (재학 중이면 비워두세요)</label>
                <input
                  name="ended_at"
                  type="date"
                  defaultValue={edu.endedAt ?? ''}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500/70 focus:bg-white/8 transition [color-scheme:dark]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-white/60 font-medium">상세 설명 (선택)</label>
              <textarea
                name="description"
                rows={3}
                defaultValue={edu.description ?? ''}
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-pink-500/70 focus:bg-white/8 transition resize-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 py-3 rounded-lg bg-pink-600/80 hover:bg-pink-600 text-white font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-pink-500/20"
              >
                저장
              </button>
              <Link
                href="/"
                className="flex-1 py-3 rounded-lg border border-white/20 text-white/60 hover:text-white hover:border-white/40 font-medium transition-all duration-200 text-center"
              >
                취소
              </Link>
            </div>
          </form>
        </div>

      </div>
    </div>
  )
}
