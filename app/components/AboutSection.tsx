import SectionWrapper from './ui/SectionWrapper'
import FadeInSection from './ui/FadeInSection'
import GlassCard from './ui/GlassCard'
import DevLabel from './ui/DevLabel'
import { User } from 'lucide-react'
import { eastSeaDokdo } from '@/app/fonts'

const keywords = [
  { icon: '🚀', title: '빠른 실행', desc: '아이디어가 생기면 바로 만들어봅니다' },
  { icon: '💡', title: '아이디어 중심', desc: '기술보다 해결하고 싶은 문제에 집중합니다' },
  { icon: '🤝', title: '함께 성장', desc: '배운 것을 나누며 같이 성장하고 싶습니다' },
]

export default function AboutSection() {
  return (
    <SectionWrapper id="about">
      <DevLabel file="components/AboutSection.tsx" name="AboutSection" depth={1} />
      <FadeInSection>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
              <User size={36} className="text-white/80 shrink-0" />
              <h2 className="text-4xl md:text-5xl font-bold gradient-text">저는 이런 사람이에요</h2>
            </div>
          <p className="text-white/50 text-lg">비개발자지만 만드는 걸 좋아합니다</p>
        </div>
      </FadeInSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* 왼쪽: 소개 텍스트 */}
        <FadeInSection delay={100}>
          <div className={`space-y-5 text-white/70 text-xl leading-relaxed ${eastSeaDokdo.className}`}>
            <p>
              안녕하세요, 저는 <span className="text-white font-semibold">엠마비</span>입니다.
              개발을 전공하지 않았지만, 머릿속의 아이디어를 직접 만들어보고 싶어서
              바이브코딩을 시작하게 됐습니다.
            </p>
            <p>
              AI 도구들을 활용해 코드를 작성하고, 작은 프로젝트들을 하나씩 완성해나가는 중입니다.
              완벽하지 않아도 일단 만들어보는 것이 제 방식입니다.
            </p>
            <p>
              앞으로 더 많은 것을 배우고, 실제로 쓸 수 있는 것들을 만들어나가는 것이 목표입니다.
            </p>
          </div>
        </FadeInSection>

        {/* 오른쪽: 키워드 카드 */}
        <div className="flex flex-col gap-4">
          {keywords.map((kw, i) => (
            <FadeInSection key={kw.title} delay={150 + i * 100}>
              <GlassCard className="p-5 flex items-start gap-4">
                <span className="text-2xl">{kw.icon}</span>
                <div>
                  <p className="text-white font-semibold mb-1">{kw.title}</p>
                  <p className="text-white/50 text-sm">{kw.desc}</p>
                </div>
              </GlassCard>
            </FadeInSection>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
