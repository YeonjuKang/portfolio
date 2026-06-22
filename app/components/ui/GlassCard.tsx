import { ReactNode } from 'react'
import DevLabel from './DevLabel'

interface GlassCardProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'article' | 'li' | 'section'
}

export default function GlassCard({ children, className = '', as: Tag = 'div' }: GlassCardProps) {
  return (
    <Tag className={`relative glass glass-hover shadow-lg ${className}`}>
      <DevLabel file="components/ui/GlassCard.tsx" name="GlassCard" depth={2} />
      {children}
    </Tag>
  )
}
