"use client"

import { AnimatedSection } from "@/app/Animation/AnimationSection"
import { useTranslation } from "react-i18next"
import { tKeys } from "@/i18n/keys"

type HowToStep = {
  readonly step: string
  readonly title: string
  readonly description: string
}

export function HowToSection() {
  const { t } = useTranslation()

  const stepsData = t(tKeys.howto.steps, { returnObjects: true }) as readonly HowToStep[]

  return (
    <section id="howto" data-section="3" className="relative bg-white">
      <div className="mx-auto max-w-7xl px-6 py-32">
        <AnimatedSection>
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[#0a1a1f]/40">
            {t(tKeys.howto.label)}
          </p>
          <h2 className="mb-20 text-4xl font-light text-[#0a1a1f] lg:text-5xl">
            {t(tKeys.howto.title)}
          </h2>
        </AnimatedSection>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-teal-500/0 via-teal-500/50 to-teal-500/0 lg:block" />

          <div className="grid gap-12 lg:grid-cols-3 lg:gap-8">
            {stepsData.map((step, index) => (
              <AnimatedSection key={step.step} delay={index * 200}>
                <div className="relative flex flex-col items-center text-center">
                  {/* Step circle */}
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-teal-500 text-2xl font-bold text-white shadow-lg shadow-teal-500/30">
                    {step.step}
                  </div>
                  <h3 className="mb-3 text-2xl font-semibold text-[#0a1a1f]">{step.title}</h3>
                  <p className="text-[#0a1a1f]/60 max-w-xs">{step.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
