"use client"

import { AnimatedSection } from "@/app/Animation/AnimationSection"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail } from "lucide-react"
import { useTranslation } from "react-i18next"
import { tKeys } from "@/i18n/keys"

export function ContactSection() {
  const { t } = useTranslation()

  return (
    <section id="contact" data-section="7" className="relative bg-[#fafafa]">
      <div className="mx-auto max-w-7xl px-6 py-32">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <AnimatedSection>
            <p className="mb-8 text-sm font-medium uppercase tracking-[0.3em] text-[#0a1a1f]/40">
              {t(tKeys.contact.label)}
            </p>
            <h2 className="mb-8 text-4xl font-light leading-tight text-[#0a1a1f] lg:text-5xl">
              {t(tKeys.contact.title)}
            </h2>
            <p className="max-w-md text-lg leading-relaxed text-[#0a1a1f]/60">
              {t(tKeys.contact.description)}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <form className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-[#0a1a1f]/70">
                    {t(tKeys.contact.form.name)}
                  </Label>
                  <Input
                    id="name"
                    className="h-14 rounded-xl border-[#0a1a1f]/10 bg-white px-5 text-[#0a1a1f] placeholder:text-[#0a1a1f]/30 focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-[#0a1a1f]/70">
                    {t(tKeys.contact.form.email)}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    className="h-14 rounded-xl border-[#0a1a1f]/10 bg-white px-5 text-[#0a1a1f] placeholder:text-[#0a1a1f]/30 focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="organization" className="text-sm font-medium text-[#0a1a1f]/70">
                  {t(tKeys.contact.form.organization)}
                </Label>
                <Input
                  id="organization"
                  className="h-14 rounded-xl border-[#0a1a1f]/10 bg-white px-5 text-[#0a1a1f] placeholder:text-[#0a1a1f]/30 focus:border-teal-500 focus:ring-teal-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium text-[#0a1a1f]/70">
                  {t(tKeys.contact.form.message)}
                </Label>
                <Textarea
                  id="message"
                  rows={6}
                  className="resize-none rounded-xl border-[#0a1a1f]/10 bg-white px-5 py-4 text-[#0a1a1f] placeholder:text-[#0a1a1f]/30 focus:border-teal-500 focus:ring-teal-500"
                />
              </div>

              <Button
                type="submit"
                data-hover
                className="h-14 w-full rounded-xl bg-[#0a1a1f] text-base font-medium text-white transition-transform hover:scale-[1.02] hover:bg-[#0a1a1f]/90"
              >
                {t(tKeys.contact.form.submit)}
                <Mail className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
