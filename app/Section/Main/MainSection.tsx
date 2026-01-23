"use client"

import { AnimatedSection } from "@/app/Animation/AnimationSection"
import { Play, ChevronDown } from "lucide-react"
import Image from "next/image"
import { useTranslation } from "react-i18next"
import { tKeys } from "@/i18n/keys"

export function MainSection() {
  const { t } = useTranslation()

  return (
    <section data-section="0" className="relative min-h-screen pt-20 overflow-hidden bg-white">
        {/* Parallax background elements */}
        <div
          className="absolute inset-0 opacity-30"
        >
          <div className="absolute right-1/4 top-1/4 h-96 w-96 rounded-full bg-teal-200/50 blur-3xl" />
          <div className="absolute left-1/4 bottom-1/4 h-64 w-64 rounded-full bg-teal-300/30 blur-3xl" />
        </div>

        <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col justify-center px-6 py-20 relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Text */}
            <AnimatedSection className="flex flex-col justify-center">
              <p className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-[#0a1a1f]/50">
                {t(tKeys.hero.subtitle)}
              </p>
              <div className="mb-8  font-light leading-[1.1] tracking-tight text-[#0a1a1f] ">
                <div className="block text-6xl md:text-6xl lg:text-7xl mb-5 text-teal-600">{t(tKeys.hero.catchphrase)}</div>
                <div className="block md:text-xl lg:text-4xl mb-5">{t(tKeys.hero.catchphrase2)}</div>
                <div className="block md:text-xl lg:text-xl mb-5">{t(tKeys.hero.catchphrase3)}</div>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://breathviz-ai.vercel.app/"
                  data-hover
                  className="inline-flex items-center gap-2 rounded-full bg-[#0a1a1f] px-8 py-4 text-sm font-medium text-white transition-transform hover:scale-105"
                >
                  <Play className="h-4 w-4" />
                  {t(tKeys.nav.launch)}
                </a>
              </div>
            </AnimatedSection>

            {/* Right: Interactive Demo */}
            <AnimatedSection delay={200} className="flex flex-col gap-6">
              <div className="relative overflow-hidden">
                <Image
                  src="/MainDevice.svg"
                  alt="BreathViz AI Application"
                  width={800}
                  height={600}
                  className="w-full object-cover"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#0a1a1f]/40">Scroll</span>
            <ChevronDown className="h-5 w-5 text-[#0a1a1f]/40" />
          </div>
        </div>
      </section>
  )
}
