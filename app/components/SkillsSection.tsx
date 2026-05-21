import SectionWrapper from './ui/SectionWrapper'
import GlassCard from './ui/GlassCard'
import { skills, categories } from '@/app/data/skills'

export default function SkillsSection() {
  return (
    <SectionWrapper id="skills">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">기술 스택</h2>
        <p className="text-white/50 text-lg">사용하는 도구와 기술들</p>
      </div>

      <div className="space-y-8">
        {categories.map((category) => {
          const categorySkills = skills.filter((s) => s.category === category)
          return (
            <div key={category}>
              <h3 className="text-white/60 text-sm font-medium tracking-widest uppercase mb-4">
                {category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {categorySkills.map((skill) => (
                  <GlassCard
                    key={skill.name}
                    as="li"
                    className="list-none px-5 py-3 flex items-center gap-2 cursor-default"
                  >
                    <span className="text-xl">{skill.icon}</span>
                    <span className="text-white/90 font-medium text-sm">{skill.name}</span>
                  </GlassCard>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
