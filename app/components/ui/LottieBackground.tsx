'use client'

import { useEffect, useRef } from 'react'

export default function LottieBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/@lottiefiles/dotlottie-wc@0.9.14/dist/dotlottie-wc.js'
    script.type = 'module'
    document.head.appendChild(script)

    const el = document.createElement('dotlottie-wc')
    el.setAttribute('src', 'https://lottie.host/c90ed745-a1b2-49c2-9bd7-9e447779ebad/aRJ5J4zpdA.lottie')
    el.setAttribute('autoplay', '')
    el.setAttribute('loop', '')
    el.style.width = '100%'
    el.style.height = '100%'
    el.style.display = 'block'

    containerRef.current?.appendChild(el)

    return () => {
      el.remove()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
    />
  )
}
