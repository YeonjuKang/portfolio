import SectionWrapper from './ui/SectionWrapper'
import FadeInSection from './ui/FadeInSection'
import GlassCard from './ui/GlassCard'
import { experiences, educations } from '../data/experience'

export default function ExperienceSection() {
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
        {/* 왼쪽: 경력 (Work Experience) */}
        <div className="space-y-8">
          <FadeInSection delay={100}>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">💼</span>
              <h3 className="text-2xl font-bold text-white">경력 (Experience)</h3>
            </div>
          </FadeInSection>

          <div className="relative border-l border-white/10 pl-6 ml-4 space-y-8">
            {experiences.map((exp, i) => (
              <FadeInSection key={exp.title} delay={150 + i * 100}>
                <div className="relative group">
                  {/* 타임라인 노드 아이콘 */}
                  <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-white/30 bg-slate-950 text-[8px] transition-all duration-300 group-hover:border-violet-500 group-hover:bg-violet-500/30 group-hover:scale-125">
                    <span className="h-1.5 w-1.5 rounded-full bg-white transition-all duration-300 group-hover:bg-violet-400" />
                  </span>

                  <GlassCard className="p-6">
                    <span className="text-xs font-semibold text-violet-400 tracking-wider">
                      {exp.period}
                    </span>
                    <h4 className="text-lg font-bold text-white mt-1 group-hover:text-violet-300 transition-colors duration-300">
                      {exp.title}
                    </h4>
                    <p className="text-sm text-white/60 mb-4">{exp.role}</p>
                    
                    <ul className="space-y-2 text-white/50 text-sm">
                      {exp.description.map((desc, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-violet-400 mt-1.5">•</span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>

        {/* 오른쪽: 학력 (Education) */}
        <div className="space-y-8">
          <FadeInSection delay={200}>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🎓</span>
              <h3 className="text-2xl font-bold text-white">학력 (Education)</h3>
            </div>
          </FadeInSection>

          <div className="relative border-l border-white/10 pl-6 ml-4 space-y-8">
            {educations.map((edu, i) => (
              <FadeInSection key={edu.institution} delay={250 + i * 100}>
                <div className="relative group">
                  {/* 타임라인 노드 아이콘 */}
                  <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-white/30 bg-slate-950 text-[8px] transition-all duration-300 group-hover:border-pink-500 group-hover:bg-pink-500/30 group-hover:scale-125">
                    <span className="h-1.5 w-1.5 rounded-full bg-white transition-all duration-300 group-hover:bg-pink-400" />
                  </span>

                  <GlassCard className="p-6">
                    <span className="text-xs font-semibold text-pink-400 tracking-wider">
                      {edu.period}
                    </span>
                    <h4 className="text-lg font-bold text-white mt-1 group-hover:text-pink-300 transition-colors duration-300">
                      {edu.institution}
                    </h4>
                    <p className="text-sm text-white/60 mb-2">{edu.major}</p>
                    
                    {edu.description && (
                      <p className="text-white/50 text-sm leading-relaxed border-t border-white/5 pt-2 mt-2">
                        {edu.description}
                      </p>
                    )}
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
