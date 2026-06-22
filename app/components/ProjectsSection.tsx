import SectionWrapper from './ui/SectionWrapper'
import GlassCard from './ui/GlassCard'
import FadeInSection from './ui/FadeInSection'
import DevLabel from './ui/DevLabel'
import { projects } from '@/app/data/projects'

export default function ProjectsSection() {
  return (
    <SectionWrapper id="projects">
      <DevLabel file="components/ProjectsSection.tsx" name="ProjectsSection" depth={1} />
      <FadeInSection>
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">프로젝트</h2>
          <p className="text-white/50 text-lg">만들고 있는 것들</p>
        </div>
      </FadeInSection>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <FadeInSection key={index} delay={index * 100}>
          <GlassCard as="article" className="p-6 flex flex-col gap-4 h-full">
            {/* 상태 배지 */}
            <div className="flex items-center justify-between">
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${
                  project.status === 'live'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : project.status === 'wip'
                    ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                    : 'bg-white/10 text-white/50 border border-white/20'
                }`}
              >
                {project.status === 'live' ? '✦ Live' : project.status === 'wip' ? '⚙ WIP' : '◌ Coming Soon'}
              </span>
            </div>

            {/* 제목 & 설명 */}
            <div className="flex-1">
              <h3 className="text-white font-semibold text-lg mb-2">{project.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{project.description}</p>
            </div>

            {/* 기술 태그 */}
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2 py-1 rounded-md bg-white/5 border border-white/10 text-white/60"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* 링크 */}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/60 hover:text-white flex items-center gap-1 transition-colors w-fit"
              >
                <span>GitHub에서 보기</span>
                <span>↗</span>
              </a>
            )}
          </GlassCard>
          </FadeInSection>
        ))}
      </div>
    </SectionWrapper>
  )
}
