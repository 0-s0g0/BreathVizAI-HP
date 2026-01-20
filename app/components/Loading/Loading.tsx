import React, { useEffect, useState } from "react"
import { AudioWaveform as Waveform } from "lucide-react"

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + 2
      })
    }, 30)
    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a1a1f]">
      {/* Animated waveform */}
      <div className="mb-12 flex items-center gap-1">
        {[...Array(20)].map((_, i) => {
          const height = 20 + Math.sin((progress / 10) + i * 0.5) * 30
          const opacity = progress > i * 5 ? 1 : 0.2
          return (
            <div
              key={i}
              className="w-1 rounded-full bg-teal-400 transition-all duration-300 ease-out"
              style={{
                height: `${Math.round(height * 100) / 100}px`,
                opacity,
              }}
            />
          )
        })}
      </div>
      
      <div className="flex items-center gap-3 mb-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-400">
          <Waveform className="h-7 w-7 text-[#0a1a1f]" />
        </div>
        <span className="text-2xl font-semibold text-white tracking-tight">BreathViz AI</span>
      </div>

      {/* Progress bar */}
      <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-teal-400 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="mt-4 font-mono text-sm text-white/40">{progress}%</span>
    </div>
  )
}