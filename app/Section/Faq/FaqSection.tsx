"use client"

import { useState } from "react"
import { AnimatedSection } from "@/app/Animation/AnimationSection"
import { ChevronDown } from "lucide-react"
import { useTranslation } from "react-i18next"
import { tKeys } from "@/i18n/keys"

type FaqItem = {
  readonly q: string
  readonly a: string
}

export function FaqSection() {
  const { t } = useTranslation()
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqData = t(tKeys.faq.items, { returnObjects: true }) as readonly FaqItem[]

  return (
    <section id="faq" data-section="6" className="relative bg-white">
      <div className="mx-auto max-w-3xl px-6 py-32">
        <AnimatedSection>
          <p className="mb-4 text-center text-sm font-medium uppercase tracking-[0.3em] text-[#0a1a1f]/40">
            {t(tKeys.faq.label)}
          </p>
          <h2 className="mb-16 text-center text-4xl font-light text-[#0a1a1f] lg:text-5xl">
            {t(tKeys.faq.title)}
          </h2>
        </AnimatedSection>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <AnimatedSection key={index} delay={index * 100}>
              <div className="overflow-hidden rounded-2xl border border-[#0a1a1f]/10 transition-all duration-300 hover:border-teal-500/30">
                <button
                  data-hover
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <span className="pr-4 text-lg font-medium text-[#0a1a1f]">{item.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-[#0a1a1f]/40 transition-transform duration-300 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    openFaq === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-[#0a1a1f]/60 leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
