import { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'article' | 'li' | 'section'
}

export default function GlassCard({ children, className = '', as: Tag = 'div' }: GlassCardProps) {
  return (
    <Tag className={`glass glass-hover shadow-lg ${className}`}>
      {children}
    </Tag>
  )
}
