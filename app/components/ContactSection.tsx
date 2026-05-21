import SectionWrapper from './ui/SectionWrapper'
import FadeInSection from './ui/FadeInSection'

export default function ContactSection() {
  return (
    <SectionWrapper id="contact">
      <FadeInSection>
        <div className="text-center space-y-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">함께 이야기해요</h2>
            <p className="text-white/50 text-lg">궁금한 점이 있으시면 언제든지 연락해주세요</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://linkedin.com/in/username"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-full glass glass-hover text-white font-medium text-center transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              <span>💼</span>
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/YeonjuKang"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-full border border-white/30 text-white/80 font-medium text-center hover:bg-white/10 hover:text-white hover:border-white/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              <span>🐙</span>
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </FadeInSection>

      {/* 카피라이트 */}
      <p className="text-center text-white/20 text-sm mt-16">
        © 2026 엠마비. Built with Next.js & ✨ 바이브코딩
      </p>
    </SectionWrapper>
  )
}
