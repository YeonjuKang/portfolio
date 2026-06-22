import LottieBackground from './ui/LottieBackground'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* 배경 장식 블러 blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-float pointer-events-none" />
      <div
        className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"
        style={{ animationDelay: '2s' }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-float pointer-events-none"
        style={{ animationDelay: '4s' }}
      />

      {/* Lottie 배경 애니메이션 */}
      <LottieBackground />

      {/* 콘텐츠 */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <p className="text-white/50 text-sm font-medium tracking-widest uppercase mb-4">
          Welcome to my portfolio
        </p>

        <h1 className="text-6xl md:text-8xl font-bold mb-4 gradient-text">
          엠마비
        </h1>

        <p className="text-white/70 text-xl md:text-2xl font-medium mb-6">
          바이브코딩 공부중인 비개발자
        </p>

        <p className="text-white/50 text-lg md:text-xl mb-12 leading-relaxed">
          코드로 아이디어를 현실로 만듭니다
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="px-8 py-3 rounded-full glass glass-hover text-white font-medium text-center transition-all duration-300 hover:scale-105"
          >
            프로젝트 보기
          </a>
          <a
            href="https://github.com/YeonjuKang"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full border border-white/30 text-white/80 font-medium text-center hover:bg-white/10 hover:text-white hover:border-white/50 transition-all duration-300 hover:scale-105"
          >
            GitHub ↗
          </a>
        </div>
      </div>

      {/* 스크롤 인디케이터 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  )
}
