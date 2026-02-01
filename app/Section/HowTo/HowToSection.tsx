"use client"

import { AnimatedSection } from "@/app/Animation/AnimationSection"
import { useTranslation } from "react-i18next"
import { tKeys } from "@/i18n/keys"
import Image from "next/image"

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
          <div className="absolute left-1/2 top-0 hidden" />

          <div className="grid gap-12 lg:grid-cols-3 lg:gap-8">
            {stepsData.map((step, index) => {
              const imagePath = `/How/How${parseInt(step.step, 10)}.svg`
              return (
                <AnimatedSection key={step.step} delay={index * 200}>
                  <div className="relative flex flex-col items-center text-center">
                    {/* Image */}
                    <div className={`relative mb-6 aspect-square w-full max-w-sm overflow-hidden rounded-2xl ${
                      step.step === "2" ? "bg-white" : ""
                    }`}>
                      <Image
                        src={imagePath}
                        alt={step.title}
                        fill
                        className="object-contain p-4"
                      />
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-teal-500 text-lg font-bold text-white shadow-lg shadow-teal-500/30 flex-shrink-0">
                        {step.step}
                      </div>
                      <h3 className="text-2xl font-semibold text-[#0a1a1f]">{step.title}</h3>
                    </div>
                    <p className="text-[#0a1a1f]/60 max-w-xs">{step.description}</p>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
