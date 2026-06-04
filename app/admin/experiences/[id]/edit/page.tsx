import Link from 'next/link'
import { notFound } from 'next/navigation'
import { db } from '@/index'
import { experiences } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'
import { updateExperience } from '../../actions'

export const dynamic = 'force-dynamic'

export default async function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [exp] = await db.select().from(experiences).where(eq(experiences.id, Number(id)))

  if (!exp) notFound()

  const updateAction = updateExperience.bind(null, exp.id)

  return (
    <div className="min-h-screen bg-[#0a0a14] px-4 py-16">
      <div className="max-w-2xl mx-auto">

        <Link href="/#experience" className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 text-sm mb-8 transition-colors">
          ← 포트폴리오로 돌아가기
        </Link>

        <div className="glass rounded-2xl p-8">
          <h1 className="text-2xl font-bold gradient-text mb-8">경력 수정</h1>

          <form action={updateAction} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm text-white/60 font-medium">회사명 *</label>
              <input
                name="company"
                required
                defaultValue={exp.company}
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-violet-500/70 focus:bg-white/8 transition"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-white/60 font-medium">직무/역할 *</label>
              <input
                name="role"
                required
                defaultValue={exp.role}
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-violet-500/70 focus:bg-white/8 transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-white/60 font-medium">입사일 *</label>
                <input
                  name="started_at"
                  type="date"
                  required
                  defaultValue={exp.startedAt}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500/70 focus:bg-white/8 transition [color-scheme:dark]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/60 font-medium">퇴사일 (재직 중이면 비워두세요)</label>
                <input
                  name="ended_at"
                  type="date"
                  defaultValue={exp.endedAt ?? ''}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500/70 focus:bg-white/8 transition [color-scheme:dark]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-white/60 font-medium">주요 업무 및 성과 *</label>
              <p className="text-xs text-white/30">한 줄에 하나씩 입력하세요. 각 줄이 별도의 항목으로 표시됩니다.</p>
              <textarea
                name="description"
                required
                rows={5}
                defaultValue={exp.description.join('\n')}
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-violet-500/70 focus:bg-white/8 transition resize-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 py-3 rounded-lg bg-violet-600/80 hover:bg-violet-600 text-white font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/20"
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
