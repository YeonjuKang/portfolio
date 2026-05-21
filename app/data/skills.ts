export interface Skill {
  name: string
  category: string
  icon: string
}

export const skills: Skill[] = [
  // 바이브코딩 / AI 도구
  { name: 'Claude', category: 'AI 도구', icon: '🤖' },
  { name: 'ChatGPT', category: 'AI 도구', icon: '💬' },
  { name: 'Gemini', category: 'AI 도구', icon: '💎' },
  { name: 'v0', category: 'AI 도구', icon: '✨' },

  // 프론트엔드
  { name: 'Next.js', category: '프론트엔드', icon: '▲' },
  { name: 'React', category: '프론트엔드', icon: '⚛️' },
  { name: 'Tailwind CSS', category: '프론트엔드', icon: '🎨' },
  { name: 'HTML/CSS', category: '프론트엔드', icon: '🌐' },

  // 도구
  { name: 'Git', category: '도구', icon: '🔧' },
  { name: 'GitHub', category: '도구', icon: '🐙' },
  { name: 'Figma', category: '도구', icon: '🎭' },
  { name: 'Notion', category: '도구', icon: '📝' },
]

export const categories = ['AI 도구', '프론트엔드', '도구']
