'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import DevLabel from './DevLabel'

interface DeleteButtonProps {
  deleteAction: () => Promise<void>
  label?: string
}

export default function DeleteButton({ deleteAction, label = '삭제' }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleClick = () => {
    if (!confirm('정말 삭제하시겠습니까?')) return
    startTransition(async () => {
      await deleteAction()
      router.refresh()
    })
  }

  return (
    <span className="relative inline-block">
      <DevLabel file="components/ui/DeleteButton.tsx" name="DeleteButton" depth={2} />
      <button
        onClick={handleClick}
        disabled={isPending}
        className="px-3 py-1.5 text-xs font-medium rounded-lg border border-red-500/40 text-red-400 hover:bg-red-500/10 hover:border-red-500/70 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? '삭제 중...' : label}
      </button>
    </span>
  )
}
