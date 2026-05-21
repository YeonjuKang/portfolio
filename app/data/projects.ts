export interface Project {
  title: string
  description: string
  tech: string[]
  githubUrl?: string
  liveUrl?: string
  status: 'live' | 'coming-soon' | 'wip'
}

export const projects: Project[] = [
  {
    title: '포트폴리오 웹사이트',
    description: 'Next.js와 Tailwind CSS로 제작한 개인 포트폴리오 웹사이트. 글라스모피즘 디자인과 반응형 레이아웃을 적용했습니다.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    githubUrl: 'https://github.com/YeonjuKang/portfolio_260514',
    status: 'live',
  },
  {
    title: '프로젝트 준비 중',
    description: '현재 바이브코딩으로 새로운 아이디어를 개발 중입니다. 곧 공개될 예정이에요!',
    tech: ['React', 'Node.js'],
    status: 'coming-soon',
  },
  {
    title: '프로젝트 준비 중',
    description: '또 다른 흥미로운 프로젝트를 기획하고 있습니다. 기대해 주세요.',
    tech: ['Next.js', 'Supabase'],
    status: 'coming-soon',
  },
]
