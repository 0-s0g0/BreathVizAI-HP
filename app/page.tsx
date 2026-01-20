"use client"

import React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { AudioWaveform as Waveform, Mail, Globe, ArrowRight, Play, ChevronDown, Mic, ImageIcon, Brain, GraduationCap, Linkedin as LinkedinIcon, Twitter as XIcon } from "lucide-react"
import {en} from "../i18n/locales/en"
import {ja} from "../i18n/locales/ja"
import { Header } from "./components/Header/Header"
import { LoadingScreen } from "./components/Loading/Loading"
import { CustomCursor } from "./components/cursor/cursol"
import { AnimatedSection } from "./Animation/AnimationSection"
import { MainSection } from "./Section/Main/main"
import { FeaturesSection } from "./Section/Main/FeaturesSection"
import { NewsSection } from "./Section/Main/NewsSection"
import "@/i18n/config"
import i18n from "@/i18n/config"



// Loading Screen Component


// Custom Cursor Component

// Scroll Animation Hook
function useScrollAnimation() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return scrollY
}



export default function HomePage() {
  const [language, setLanguage] = useState<"ja" | "en">("ja")
  const [activeSection, setActiveSection] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollY = useScrollAnimation()

  // i18nextの言語を同期
  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language])

  useEffect(() => {
    const sections = document.querySelectorAll("[data-section]")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionIndex = Number(entry.target.getAttribute("data-section"))
            setActiveSection(sectionIndex)
          }
        })
      },
      { threshold: 0.3 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [isLoading])

  const t = {
    en,
    ja,
  }

  const content = t[language]

  const navItems = [
    { href: "#features", label: content.nav.features },
    { href: "#howto", label: content.nav.howto },
    { href: "#team", label: content.nav.team },
    { href: "#news", label: content.nav.news },
    { href: "#faq", label: content.nav.faq },
    { href: "#contact", label: content.nav.contact },
  ]

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />
  }

  const isDarkSection = activeSection === 1 || activeSection === 4

  return (
    <div ref={containerRef} className="relative cursor-none lg:cursor-none">
      <CustomCursor />

      {/* Dynamic Background */}
      <div 
        className="fixed inset-0 -z-10 transition-colors duration-1000" 
        style={{
          backgroundColor: activeSection === 1 ? "#0a1a1f" : activeSection === 4 ? "#1a1a1a" : "#fafafa"
        }} 
      />

      {/* Header */}
      <Header
        language={language}
        setLanguage={setLanguage}
        isDarkSection={isDarkSection}
        navItems={navItems}
        launchText={content.nav.launch}
      />

      {/* Hero Section */}
      <MainSection />




      {/* Mission Section - Dark */}
      <section data-section="1" className="relative min-h-screen overflow-hidden">
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
              d={`M 0 ${80 + i * 60} Q 200 ${50 + i * 60 + Math.sin(i) * 30} 400 ${80 + i * 60} T 800 ${80 + i * 60} T 1200 ${80 + i * 60} T 1600 ${80 + i * 60} T 2000 ${80 + i * 60}`}
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
              {content.mission.label}
            </p>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <h2 className="mb-12 max-w-4xl text-4xl font-light leading-[1.15] text-white md:text-5xl lg:text-6xl">
              <span className="block">{content.mission.title}</span>
              <span className="block text-teal-400">{content.mission.title2}</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <p className="max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl">
              {content.mission.description}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection/>


      {/* How to Use Section */}
      <section id="howto" data-section="3" className="relative bg-white">
        <div className="mx-auto max-w-7xl px-6 py-32">
          <AnimatedSection>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[#0a1a1f]/40">
              {content.howto.label}
            </p>
            <h2 className="mb-20 text-4xl font-light text-[#0a1a1f] lg:text-5xl">
              {content.howto.title}
            </h2>
          </AnimatedSection>

          <div className="relative">
            {/* Connection line */}
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-teal-500/0 via-teal-500/50 to-teal-500/0 lg:block" />
            
            <div className="grid gap-12 lg:grid-cols-3 lg:gap-8">
              {content.howto.steps.map((step, index) => (
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

      {/* News Section - Dark */}
      <NewsSection />

      {/* Team Section */}
      <section id="team" data-section="5" className="relative bg-[#f5f5f0]">
        <div className="mx-auto max-w-7xl px-6 py-32">
          <AnimatedSection>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[#0a1a1f]/40">
              {content.team.label}
            </p>
            <h2 className="mb-20 text-4xl font-light text-[#0a1a1f] lg:text-5xl">
              {content.team.title}
            </h2>
          </AnimatedSection>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {content.team.members.map((member, index) => (
              <AnimatedSection key={member.name} delay={index * 100}>
                <div 
                  data-hover
                  className="group text-center"
                >
                  <div className="relative mx-auto mb-6 h-40 w-40 overflow-hidden rounded-3xl bg-gradient-to-br from-teal-400 to-teal-600 transition-transform duration-500 group-hover:scale-105">
                    <div className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-white/90">
                      {member.image}
                    </div>
                  </div>
                  <h3 className="mb-1 text-lg font-semibold text-[#0a1a1f]">{member.name}</h3>
                  <p className="mb-4 text-sm text-[#0a1a1f]/60">{member.role}</p>
                  <div className="flex justify-center gap-3">
                    <a href="#" data-hover className="text-[#0a1a1f]/30 transition-colors hover:text-teal-600">
                      <XIcon className="h-5 w-5" />
                    </a>
                    <a href="#" data-hover className="text-[#0a1a1f]/30 transition-colors hover:text-teal-600">
                      <LinkedinIcon className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" data-section="6" className="relative bg-white">
        <div className="mx-auto max-w-3xl px-6 py-32">
          <AnimatedSection>
            <p className="mb-4 text-center text-sm font-medium uppercase tracking-[0.3em] text-[#0a1a1f]/40">
              {content.faq.label}
            </p>
            <h2 className="mb-16 text-center text-4xl font-light text-[#0a1a1f] lg:text-5xl">
              {content.faq.title}
            </h2>
          </AnimatedSection>

          <div className="space-y-4">
            {content.faq.items.map((item, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div 
                  className="overflow-hidden rounded-2xl border border-[#0a1a1f]/10 transition-all duration-300 hover:border-teal-500/30"
                >
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
                      <p className="px-6 pb-6 text-[#0a1a1f]/60 leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" data-section="7" className="relative bg-[#fafafa]">
        <div className="mx-auto max-w-7xl px-6 py-32">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <AnimatedSection>
              <p className="mb-8 text-sm font-medium uppercase tracking-[0.3em] text-[#0a1a1f]/40">
                {content.contact.label}
              </p>
              <h2 className="mb-8 text-4xl font-light leading-tight text-[#0a1a1f] lg:text-5xl">
                {content.contact.title}
              </h2>
              <p className="max-w-md text-lg leading-relaxed text-[#0a1a1f]/60">
                {content.contact.description}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <form className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-[#0a1a1f]/70">
                      {content.contact.form.name}
                    </Label>
                    <Input
                      id="name"
                      className="h-14 rounded-xl border-[#0a1a1f]/10 bg-white px-5 text-[#0a1a1f] placeholder:text-[#0a1a1f]/30 focus:border-teal-500 focus:ring-teal-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-[#0a1a1f]/70">
                      {content.contact.form.email}
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
                    {content.contact.form.organization}
                  </Label>
                  <Input
                    id="organization"
                    className="h-14 rounded-xl border-[#0a1a1f]/10 bg-white px-5 text-[#0a1a1f] placeholder:text-[#0a1a1f]/30 focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium text-[#0a1a1f]/70">
                    {content.contact.form.message}
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
                  {content.contact.form.submit}
                  <Mail className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#0a1a1f]/5 bg-[#fafafa] py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0a1a1f]">
              <Waveform className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-[#0a1a1f]">BreathViz AI</span>
          </div>
          <p className="text-sm text-[#0a1a1f]/40">{content.footer.copyright}</p>
          <button
            onClick={() => setLanguage(language === "ja" ? "en" : "ja")}
            data-hover
            className="flex items-center gap-1.5 text-sm font-medium text-[#0a1a1f]/60 transition-colors hover:text-[#0a1a1f]"
          >
            <Globe className="h-4 w-4" />
            {language === "ja" ? "English" : "日本語"}
          </button>
        </div>
      </footer>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes waveMove {
          0% { transform: translateX(0); }
          100% { transform: translateX(-200px); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.05); opacity: 0.4; }
        }
        
        html {
          scroll-behavior: smooth;
        }

        /* Hide default cursor on desktop */
        @media (min-width: 1024px) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </div>
  )
}
