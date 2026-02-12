"use client"
import { useState, useEffect, useRef, useCallback } from "react"
import {en} from "../i18n/locales/en"
import {ja} from "../i18n/locales/ja"
import { Header } from "./components/Header/Header"
import { LoadingScreen } from "./components/Loading/Loading"
import { CustomCursor } from "./components/cursor/cursol"
import { MainSection,MissionSection,FeaturesSection, HowToSection, NewsSection, TeamSection, FaqSection, ContactSection } from "./Section/index"
import { Footer } from "./components/Footer/Footer"
import "@/i18n/config"
import i18n from "@/i18n/config"

export default function HomePage() {
  const [language, setLanguage] = useState<"ja" | "en">("ja")
  const [activeSection, setActiveSection] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

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

/*
  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />
  }*/

  const isDarkSection = activeSection === 1 || activeSection === 4

  return (
    <div ref={containerRef} className="relative cursor-none lg:cursor-none">
      <CustomCursor />

      {/* Dynamic Background */}
      <div 
        className="fixed inset-0 -z-10 transition-colors duration-1000" 
        style={{
          backgroundColor: activeSection === 1 ? "#2f4f4f" : activeSection === 4 ? "#1a1a1a" : "#2f4f4f"
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
      <MissionSection />

      {/* Features Section */}
      <FeaturesSection/>


      {/* How to Use Section <HowToSection />*/}
      

      {/* News Section - Dark */}
      <NewsSection />

      {/* Team Section */}
      <TeamSection />

      {/* FAQ Section */}
      <FaqSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer language={language} setLanguage={setLanguage} />

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
