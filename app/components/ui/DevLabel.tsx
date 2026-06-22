'use client'

interface DevLabelProps {
  file: string
  name: string
  depth: 1 | 2 | 3
}

const CONFIG = {
  1: {
    position: 'top-0 left-0',
    color: 'bg-blue-500/90 text-white',
  },
  2: {
    position: 'top-0 right-0',
    color: 'bg-violet-500/90 text-white',
  },
  3: {
    position: 'bottom-0 left-0',
    color: 'bg-orange-500/90 text-white',
  },
} as const

export default function DevLabel({ file, name, depth }: DevLabelProps) {
  if (process.env.NODE_ENV !== 'development') return null

  const { position, color } = CONFIG[depth]

  const handleClick = () => {
    navigator.clipboard.writeText(`${file} - ${name}`)
  }

  return (
    <span
      onClick={handleClick}
      title={`클릭하여 복사: ${file} - ${name}`}
      className={`absolute ${position} z-50 px-1.5 py-0.5 text-[10px] font-mono font-semibold rounded-sm cursor-pointer select-none opacity-70 hover:opacity-100 transition-opacity ${color}`}
    >
      {name}
    </span>
  )
}
