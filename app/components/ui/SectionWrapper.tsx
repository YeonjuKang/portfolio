import { ReactNode } from 'react'

interface SectionWrapperProps {
  children: ReactNode
  id?: string
  className?: string
}

export default function SectionWrapper({ children, id, className = '' }: SectionWrapperProps) {
  return (
    <section id={id} className={`relative py-20 px-4 ${className}`}>
      <div className="max-w-5xl mx-auto">
        {children}
      </div>
    </section>
  )
}
