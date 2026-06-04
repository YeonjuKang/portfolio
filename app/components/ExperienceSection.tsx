import Link from 'next/link'
import SectionWrapper from './ui/SectionWrapper'
import FadeInSection from './ui/FadeInSection'
import GlassCard from './ui/GlassCard'
import DeleteButton from './ui/DeleteButton'
import { db } from '@/index'
import { experiences as experiencesTable, educations as educationsTable } from '@/drizzle/schema'
import { desc } from 'drizzle-orm'
import { deleteExperience } from '@/app/admin/experiences/actions'
import { deleteEducation } from '@/app/admin/educations/actions'

const formatDate = (dateStr: string) => {
  const parts = dateStr.split('-')
  return parts.length >= 2 ? `${parts[0]}.${parts[1]}` : dateStr
}

const formatPeriod = (startedAt: string, endedAt: string | null) =>
  `${formatDate(startedAt)} - ${endedAt ? formatDate(endedAt) : '현재'}`

export default async function ExperienceSection() {
  const experiences = await db.select().from(experiencesTable).orderBy(desc(experiencesTable.startedAt))
  const educations = await db.select().from(educationsTable).orderBy(desc(educationsTable.startedAt))

  return (
    <SectionWrapper id="experience">
      {/* 섹션 제목 */}
      <FadeInSection>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">경력 & 학력</h2>
          <p className="text-white/50 text-lg">제가 걸어온 발자취들을 모았습니다</p>
        </div>
      </FadeInSection>

      {/* 경력 / 학력 두 컬럼 레이아웃 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* 왼쪽: 경력 */}
        <div className="space-y-8">
          <FadeInSection delay={100}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl">💼</span>
                <h3 className="text-2xl font-bold text-white">경력 (Experience)</h3>
              </div>
              <Link
                href="/admin/experiences/new"
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-violet-500/40 text-violet-400 hover:bg-violet-500/10 hover:border-violet-500/70 transition-all duration-200"
              >
                + 추가
              </Link>
            </div>
          </FadeInSection>

          <div className="relative border-l border-white/10 pl-6 ml-4 space-y-8">
            {experiences.map((exp, i) => (
              <FadeInSection key={exp.id} delay={150 + i * 100}>
                <div className="relative group">
                  <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-white/30 bg-slate-950 text-[8px] transition-all duration-300 group-hover:border-violet-500 group-hover:bg-violet-500/30 group-hover:scale-125">
                    <span className="h-1.5 w-1.5 rounded-full bg-white transition-all duration-300 group-hover:bg-violet-400" />
                  </span>

                  <GlassCard className="p-6">
                    <span className="text-xs font-semibold text-violet-400 tracking-wider">
                      {formatPeriod(exp.startedAt, exp.endedAt)}
                    </span>
                    <h4 className="text-lg font-bold text-white mt-1 group-hover:text-violet-300 transition-colors duration-300">
                      {exp.company}
                    </h4>
                    <p className="text-sm text-white/60 mb-4">{exp.role}</p>

                    <ul className="space-y-2 text-white/50 text-sm mb-4">
                      {exp.description.map((descItem, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-violet-400 mt-1.5">•</span>
                          <span>{descItem}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex gap-2 pt-3 border-t border-white/10">
                      <Link
                        href={`/admin/experiences/${exp.id}/edit`}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg border border-white/20 text-white/50 hover:text-white hover:border-white/40 transition-all duration-200"
                      >
                        수정
                      </Link>
                      <DeleteButton deleteAction={deleteExperience.bind(null, exp.id)} />
                    </div>
                  </GlassCard>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>

        {/* 오른쪽: 학력 */}
        <div className="space-y-8">
          <FadeInSection delay={200}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🎓</span>
                <h3 className="text-2xl font-bold text-white">학력 (Education)</h3>
              </div>
              <Link
                href="/admin/educations/new"
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-pink-500/40 text-pink-400 hover:bg-pink-500/10 hover:border-pink-500/70 transition-all duration-200"
              >
                + 추가
              </Link>
            </div>
          </FadeInSection>

          <div className="relative border-l border-white/10 pl-6 ml-4 space-y-8">
            {educations.map((edu, i) => (
              <FadeInSection key={edu.id} delay={250 + i * 100}>
                <div className="relative group">
                  <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-white/30 bg-slate-950 text-[8px] transition-all duration-300 group-hover:border-pink-500 group-hover:bg-pink-500/30 group-hover:scale-125">
                    <span className="h-1.5 w-1.5 rounded-full bg-white transition-all duration-300 group-hover:bg-pink-400" />
                  </span>

                  <GlassCard className="p-6">
                    <span className="text-xs font-semibold text-pink-400 tracking-wider">
                      {formatPeriod(edu.startedAt, edu.endedAt)}
                    </span>
                    <h4 className="text-lg font-bold text-white mt-1 group-hover:text-pink-300 transition-colors duration-300">
                      {edu.institution}
                    </h4>
                    <p className="text-sm text-white/60 mb-2">{edu.major}</p>

                    {edu.description && (
                      <p className="text-white/50 text-sm leading-relaxed border-t border-white/5 pt-2 mt-2 mb-4">
                        {edu.description}
                      </p>
                    )}

                    <div className="flex gap-2 pt-3 border-t border-white/10">
                      <Link
                        href={`/admin/educations/${edu.id}/edit`}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg border border-white/20 text-white/50 hover:text-white hover:border-white/40 transition-all duration-200"
                      >
                        수정
                      </Link>
                      <DeleteButton deleteAction={deleteEducation.bind(null, edu.id)} />
                    </div>
                  </GlassCard>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>

      </div>
    </SectionWrapper>
  )
}
