"use client"

import { AnimatedSection } from "@/app/Animation/AnimationSection"
import { useTranslation } from "react-i18next"
import { tKeys } from "@/i18n/keys"
import Image from "next/image"

export function FeaturesSection() {
  const { t } = useTranslation()

  // 翻訳データから features.items を取得
  const featuresData = t(tKeys.features.items, { returnObjects: true }) as readonly {
    readonly number: string
    readonly title: string
    readonly subtitle: string
    readonly description: string
    readonly icon: string
  }[]

  return (
    <section id="features" data-section="2" className="relative min-h-screen bg-[#f5f5f0]">
      <div className="mx-auto max-w-7xl px-6 py-32">
        <AnimatedSection>
          <p className="mb-20 text-sm font-medium uppercase tracking-[0.3em] text-[#0a1a1f]/40">
            {t(tKeys.features.label)}
          </p>
        </AnimatedSection>

        <div className="space-y-32">
          {featuresData.map((feature, index) => {
            const imagePath = `/Features/Features${feature.number}.svg`
            return (
              <AnimatedSection key={feature.number} delay={index * 150}>
                <div
                  className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
                    index % 2 === 1 ? "lg:grid-flow-dense" : ""
                  }`}
                >
                  <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                    <span className="mb-6 block font-mono text-8xl font-bold text-[#0a1a1f]/5 lg:text-9xl">
                      {feature.number}
                    </span>
                    <h3 className="mb-3 text-4xl font-semibold text-[#0a1a1f] lg:text-5xl">
                      {feature.title}
                    </h3>
                    <p className="mb-6 text-lg font-medium text-teal-600">
                      {feature.subtitle}
                    </p>
                    <p className="max-w-lg text-lg leading-relaxed text-[#0a1a1f]/60">
                      {feature.description}
                    </p>
                  </div>
                  <div
                    className={`relative aspect-[4/3] overflow-hidden rounded-3xl  ${
                      index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                    }`}
                  >
                    <Image
                      src={imagePath}
                      alt={feature.title}
                      fill
                      className="object-contain p-8"
                    />
                  </div>
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
