'use client';

import { useEffect, useRef } from 'react'
import katex from 'katex'
import { cn } from '@/lib/utils'

interface MathRendererProps {
  math: string
  display?: boolean
  className?: string
}

export function MathRenderer({ math, display = false, className }: MathRendererProps) {
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(math, containerRef.current, {
          displayMode: display,
          throwOnError: false,
          trust: true,
        })
      } catch {
        if (containerRef.current) {
          containerRef.current.textContent = math
        }
      }
    }
  }, [math, display])

  return (
    <span
      ref={containerRef}
      className={cn(
        display ? 'block text-center my-4' : 'inline',
        className
      )}
    />
  )
}

// Utility to render mixed text and math content
interface MixedContentProps {
  content: string
  className?: string
}

export function MixedContent({ content, className }: MixedContentProps) {
  // Split content by $...$ for inline math and $$...$$ for display math
  const parts = content.split(/(\$\$[\s\S]+?\$\$|\$[^$]+?\$)/g)

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.startsWith('$$') && part.endsWith('$$')) {
          // Display math
          return (
            <MathRenderer
              key={index}
              math={part.slice(2, -2)}
              display
            />
          )
        } else if (part.startsWith('$') && part.endsWith('$')) {
          // Inline math
          return (
            <MathRenderer
              key={index}
              math={part.slice(1, -1)}
            />
          )
        }
        // Regular text
        return <span key={index}>{part}</span>
      })}
    </span>
  )
}
