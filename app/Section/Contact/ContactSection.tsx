"use client"

import { AnimatedSection } from "@/app/Animation/AnimationSection"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail } from "lucide-react"
import { useTranslation } from "react-i18next"
import { tKeys } from "@/i18n/keys"
import { useState, FormEvent } from "react"

export function ContactSection() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', organization: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }

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
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-[#0a1a1f]/70">
                    {t(tKeys.contact.form.name)}
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
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
                    value={formData.email}
                    onChange={handleChange}
                    required
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
                  value={formData.organization}
                  onChange={handleChange}
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
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="resize-none rounded-xl border-[#0a1a1f]/10 bg-white px-5 py-4 text-[#0a1a1f] placeholder:text-[#0a1a1f]/30 focus:border-teal-500 focus:ring-teal-500"
                />
              </div>

              {submitStatus === 'success' && (
                <div className="rounded-xl bg-teal-50 p-4 text-sm text-teal-700">
                  送信が完了しました。ありがとうございます。
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
                  送信に失敗しました。もう一度お試しください。
                </div>
              )}

              <Button
                type="submit"
                data-hover
                disabled={isSubmitting}
                className="h-14 w-full rounded-xl bg-[#0a1a1f] text-base font-medium text-white transition-transform hover:scale-[1.02] hover:bg-[#0a1a1f]/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? '送信中...' : t(tKeys.contact.form.submit)}
                <Mail className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
