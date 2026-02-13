"use client"

import { AnimatedSection } from "@/app/Animation/AnimationSection"
import Image from "next/image"
import { useTranslation } from "react-i18next"
import { tKeys } from "@/i18n/keys"

type TeamMember = {
  readonly name: string
  readonly role: string
  readonly image: string
  readonly xUrl: string
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

        <div className="grid gap-8 grid-cols-2 ">
          {teamData.map((member, index) => (
            <AnimatedSection key={member.name} delay={index * 100}>
              <div data-hover className="group text-center">
                <div className="relative mx-auto mb-6 h-40 w-40 overflow-hidden rounded-3xl transition-transform duration-500 group-hover:scale-105">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="160px"
                    quality={70}
                  />
                </div>
                <h3 className="mb-1 text-lg font-semibold text-[#0a1a1f]">{member.name}</h3>
                
                <p className="mb-4 text-sm text-[#0a1a1f]/60">{member.role}</p>
                <div className="flex justify-center gap-3">
                  <a
                    href={member.xUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-hover
                    className="text-[#0a1a1f]/30 transition-colors hover:text-teal-600"
                    aria-label="X (Twitter)"
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
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
