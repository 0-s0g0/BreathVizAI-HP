"use client"

import { AnimatedSection } from "@/app/Animation/AnimationSection"
import { useTranslation } from "react-i18next"
import { tKeys } from "@/i18n/keys"
import Image from "next/image"

export function MissionSection() {
  const { t } = useTranslation()

  return (
    <section data-section="1" className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/mission-bg.jpg"
          alt="Mission Background"
          fill
          className="object-cover"
          sizes="100vw"
          quality={70}
        />
      </div>

      {/* Semi-transparent color overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1a1f]/80 via-teal-900/70 to-[#0a1a1f]/80" />

      {/* Animated breathing circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-teal-400/20"
            style={{
              width: `${300 + i * 150}px`,
              height: `${300 + i * 150}px`,
              animation: `pulse ${4 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Waveform lines */}
      <svg className="absolute inset-0 h-full w-full opacity-10">
        <defs>
          <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0" />
            <stop offset="50%" stopColor="#2dd4bf" stopOpacity="1" />
            <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[...Array(12)].map((_, i) => (
          <path
            key={i}
            d={`M 0 ${80 + i * 60} Q 200 ${50 + i * 60 + Math.sin(i) * 30} 400 ${80 + i * 60} T 800 ${
              80 + i * 60
            } T 1200 ${80 + i * 60} T 1600 ${80 + i * 60} T 2000 ${80 + i * 60}`}
            fill="none"
            stroke="url(#waveGrad2)"
            strokeWidth="1"
            style={{
              animation: `waveMove ${6 + i * 0.3}s linear infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </svg>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-32">
        <AnimatedSection>
          <p className="mb-8 text-sm font-medium uppercase tracking-[0.3em] text-teal-400">
            {t(tKeys.mission.label)}
          </p>
        </AnimatedSection>
        <AnimatedSection delay={100}>
          <h2 className="mb-12 max-w-4xl text-4xl font-light leading-[1.15] text-white md:text-5xl lg:text-6xl">
            <span className="block">{t(tKeys.mission.title)}</span>
            <span className="block text-teal-400">{t(tKeys.mission.title2)}</span>
          </h2>
        </AnimatedSection>
        <AnimatedSection delay={200}>
          <p className="max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl">
            {t(tKeys.mission.description)}
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
