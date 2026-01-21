"use client"

import { AnimatedSection } from "@/app/Animation/AnimationSection"
import { Linkedin as LinkedinIcon, Twitter as XIcon } from "lucide-react"
import { useTranslation } from "react-i18next"
import { tKeys } from "@/i18n/keys"

type TeamMember = {
  readonly name: string
  readonly role: string
  readonly image: string
}

export function TeamSection() {
  const { t } = useTranslation()

  const teamData = t(tKeys.team.members, { returnObjects: true }) as readonly TeamMember[]

  return (
    <section id="team" data-section="5" className="relative bg-[#f5f5f0]">
      <div className="mx-auto max-w-7xl px-6 py-32">
        <AnimatedSection>
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[#0a1a1f]/40">
            {t(tKeys.team.label)}
          </p>
          <h2 className="mb-20 text-4xl font-light text-[#0a1a1f] lg:text-5xl">
            {t(tKeys.team.title)}
          </h2>
        </AnimatedSection>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {teamData.map((member, index) => (
            <AnimatedSection key={member.name} delay={index * 100}>
              <div data-hover className="group text-center">
                <div className="relative mx-auto mb-6 h-40 w-40 overflow-hidden rounded-3xl bg-gradient-to-br from-teal-400 to-teal-600 transition-transform duration-500 group-hover:scale-105">
                  <div className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-white/90">
                    {member.image}
                  </div>
                </div>
                <h3 className="mb-1 text-lg font-semibold text-[#0a1a1f]">{member.name}</h3>
                <p className="mb-4 text-sm text-[#0a1a1f]/60">{member.role}</p>
                <div className="flex justify-center gap-3">
                  <a
                    href="#"
                    data-hover
                    className="text-[#0a1a1f]/30 transition-colors hover:text-teal-600"
                  >
                    <XIcon className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    data-hover
                    className="text-[#0a1a1f]/30 transition-colors hover:text-teal-600"
                  >
                    <LinkedinIcon className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
