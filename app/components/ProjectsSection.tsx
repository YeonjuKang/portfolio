import SectionWrapper from './ui/SectionWrapper'
import GlassCard from './ui/GlassCard'
import FadeInSection from './ui/FadeInSection'
import DevLabel from './ui/DevLabel'
import { FolderOpen } from 'lucide-react'
import { projects } from '@/app/data/projects'

function BrowserSvg() {
  return (
    <svg viewBox="0 0 120 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* 브라우저 프레임 */}
      <rect x="4" y="4" width="112" height="88" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
      {/* 상단 바 */}
      <rect x="4" y="4" width="112" height="22" rx="8" fill="rgba(255,255,255,0.08)" />
      <rect x="4" y="18" width="112" height="8" fill="rgba(255,255,255,0.08)" />
      {/* 신호등 점 */}
      <circle cx="18" cy="15" r="3.5" fill="#ff5f57" />
      <circle cx="29" cy="15" r="3.5" fill="#ffbd2e" />
      <circle cx="40" cy="15" r="3.5" fill="#28ca41" />
      {/* 주소창 */}
      <rect x="52" y="10" width="56" height="10" rx="5" fill="rgba(255,255,255,0.08)" />

      {/* 히어로 텍스트 블록 */}
      <rect x="28" y="36" width="64" height="10" rx="3" fill="rgba(139,92,246,0.5)">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2.5s" repeatCount="indefinite" />
      </rect>
      {/* 서브텍스트 */}
      <rect x="36" y="52" width="48" height="6" rx="3" fill="rgba(255,255,255,0.2)">
        <animate attributeName="width" values="20;48;20" dur="3s" begin="0.5s" repeatCount="indefinite" />
      </rect>
      {/* 버튼 */}
      <rect x="38" y="65" width="20" height="8" rx="4" fill="rgba(139,92,246,0.6)">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" begin="1s" repeatCount="indefinite" />
      </rect>
      <rect x="62" y="65" width="20" height="8" rx="4" fill="rgba(255,255,255,0.1)" />
    </svg>
  )
}

function CodeSvg() {
  return (
    <svg viewBox="0 0 120 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* 에디터 프레임 */}
      <rect x="4" y="4" width="112" height="88" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
      {/* 상단 탭바 */}
      <rect x="4" y="4" width="112" height="18" rx="8" fill="rgba(255,255,255,0.07)" />
      <rect x="4" y="15" width="112" height="7" fill="rgba(255,255,255,0.07)" />
      <rect x="10" y="7" width="28" height="11" rx="4" fill="rgba(139,92,246,0.3)" />
      <rect x="42" y="9" width="22" height="7" rx="3" fill="rgba(255,255,255,0.07)" />

      {/* 줄번호 */}
      <rect x="10" y="30" width="6" height="4" rx="1" fill="rgba(255,255,255,0.15)" />
      <rect x="10" y="40" width="6" height="4" rx="1" fill="rgba(255,255,255,0.15)" />
      <rect x="10" y="50" width="6" height="4" rx="1" fill="rgba(255,255,255,0.15)" />
      <rect x="10" y="60" width="6" height="4" rx="1" fill="rgba(255,255,255,0.15)" />
      <rect x="10" y="70" width="6" height="4" rx="1" fill="rgba(255,255,255,0.15)" />

      {/* 코드 라인 1 - 보라 키워드 */}
      <rect x="22" y="30" width="18" height="4" rx="1" fill="rgba(167,139,250,0.8)" />
      <rect x="44" y="30" width="30" height="4" rx="1" fill="rgba(96,165,250,0.6)" />
      <rect x="78" y="30" width="10" height="4" rx="1" fill="rgba(255,255,255,0.3)" />

      {/* 코드 라인 2 */}
      <rect x="22" y="40" width="12" height="4" rx="1" fill="rgba(255,255,255,0.25)" />
      <rect x="38" y="40" width="40" height="4" rx="1" fill="rgba(52,211,153,0.6)">
        <animate attributeName="width" values="0;40;40" dur="1.8s" repeatCount="indefinite" />
      </rect>

      {/* 코드 라인 3 */}
      <rect x="22" y="50" width="20" height="4" rx="1" fill="rgba(167,139,250,0.6)" />
      <rect x="46" y="50" width="28" height="4" rx="1" fill="rgba(255,255,255,0.2)">
        <animate attributeName="width" values="0;28;28" dur="1.8s" begin="0.3s" repeatCount="indefinite" />
      </rect>

      {/* 코드 라인 4 */}
      <rect x="22" y="60" width="50" height="4" rx="1" fill="rgba(255,255,255,0.15)">
        <animate attributeName="width" values="0;50;50" dur="1.8s" begin="0.6s" repeatCount="indefinite" />
      </rect>

      {/* 커서 */}
      <rect x="22" y="70" width="2" height="10" rx="1" fill="rgba(139,92,246,0.9)">
        <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
      </rect>
    </svg>
  )
}

function DatabaseSvg() {
  return (
    <svg viewBox="0 0 120 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* 배경 원 */}
      <circle cx="60" cy="48" r="40" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

      {/* DB 실린더 상단 타원 */}
      <ellipse cx="60" cy="30" rx="22" ry="7" fill="rgba(99,102,241,0.3)" stroke="rgba(99,102,241,0.6)" strokeWidth="1.5" />
      {/* DB 실린더 몸통 */}
      <rect x="38" y="30" width="44" height="26" fill="rgba(99,102,241,0.15)" />
      <line x1="38" y1="30" x2="38" y2="56" stroke="rgba(99,102,241,0.6)" strokeWidth="1.5" />
      <line x1="82" y1="30" x2="82" y2="56" stroke="rgba(99,102,241,0.6)" strokeWidth="1.5" />
      {/* DB 실린더 하단 타원 */}
      <ellipse cx="60" cy="56" rx="22" ry="7" fill="rgba(99,102,241,0.25)" stroke="rgba(99,102,241,0.6)" strokeWidth="1.5" />
      {/* DB 중간 구분선 */}
      <ellipse cx="60" cy="42" rx="22" ry="7" fill="none" stroke="rgba(99,102,241,0.3)" strokeWidth="1" strokeDasharray="3 2" />

      {/* 궤도 도는 데이터 점 1 */}
      <circle cx="60" cy="48" r="32" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      <circle r="4" fill="rgba(52,211,153,0.9)">
        <animateMotion dur="3s" repeatCount="indefinite">
          <mpath href="#orbit1" />
        </animateMotion>
      </circle>
      <path id="orbit1" d="M 92,48 A 32,32 0 1,1 91.9,48" fill="none" />

      {/* 궤도 도는 데이터 점 2 */}
      <circle r="3" fill="rgba(167,139,250,0.9)">
        <animateMotion dur="3s" begin="-1.5s" repeatCount="indefinite">
          <mpath href="#orbit2" />
        </animateMotion>
      </circle>
      <path id="orbit2" d="M 92,48 A 32,32 0 1,1 91.9,48" fill="none" />
    </svg>
  )
}

const PROJECT_SVGS = [BrowserSvg, CodeSvg, DatabaseSvg]

export default function ProjectsSection() {
  return (
    <SectionWrapper id="projects">
      <DevLabel file="components/ProjectsSection.tsx" name="ProjectsSection" depth={1} />
      <FadeInSection>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <FolderOpen size={36} className="text-white/80 shrink-0" />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">프로젝트</h2>
          </div>
          <p className="text-white/50 text-lg">만들고 있는 것들</p>
        </div>
      </FadeInSection>

      <div className="flex flex-col gap-6">
        {projects.map((project, index) => {
          const SvgIllustration = PROJECT_SVGS[index] ?? PROJECT_SVGS[PROJECT_SVGS.length - 1]
          return (
            <FadeInSection key={index} delay={index * 100}>
              <GlassCard as="article" className="p-6 flex flex-row items-center gap-6">
                {/* 왼쪽: 텍스트 콘텐츠 */}
                <div className="flex-1 flex flex-col gap-4">
                  {/* 상태 배지 */}
                  <div>
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
                  <div>
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
                </div>

                {/* 오른쪽: SVG 애니메이션 */}
                <div className="w-28 h-28 md:w-36 md:h-36 shrink-0 opacity-80">
                  <SvgIllustration />
                </div>
              </GlassCard>
            </FadeInSection>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
