"use client"

import React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Menu, X, AudioWaveform as Waveform, Mail, Globe, ArrowRight, Play, ChevronDown, Mic, ImageIcon, Brain, GraduationCap, Linkedin as LinkedinIcon, Twitter as XIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Loading Screen Component
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + 2
      })
    }, 30)
    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a1a1f]">
      {/* Animated waveform */}
      <div className="mb-12 flex items-center gap-1">
        {[...Array(20)].map((_, i) => {
          const height = 20 + Math.sin((progress / 10) + i * 0.5) * 30
          const opacity = progress > i * 5 ? 1 : 0.2
          return (
            <div
              key={i}
              className="w-1 rounded-full bg-teal-400 transition-all duration-300 ease-out"
              style={{
                height: `${Math.round(height * 100) / 100}px`,
                opacity,
              }}
            />
          )
        })}
      </div>
      
      <div className="flex items-center gap-3 mb-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-400">
          <Waveform className="h-7 w-7 text-[#0a1a1f]" />
        </div>
        <span className="text-2xl font-semibold text-white tracking-tight">BreathViz AI</span>
      </div>

      {/* Progress bar */}
      <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-teal-400 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="mt-4 font-mono text-sm text-white/40">{progress}%</span>
    </div>
  )
}

// Custom Cursor Component
function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest("a, button, [data-hover]")) {
        setIsHovering(true)
      }
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
    }

    window.addEventListener("mousemove", updatePosition)
    document.addEventListener("mouseover", handleMouseEnter)
    document.addEventListener("mouseout", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      document.removeEventListener("mouseover", handleMouseEnter)
      document.removeEventListener("mouseout", handleMouseLeave)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Main cursor */}
      <div
        className="pointer-events-none fixed z-[999] hidden lg:block"
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className={`rounded-full border-2 border-teal-400 transition-all duration-200 ease-out ${
            isHovering ? "h-16 w-16 bg-teal-400/20" : "h-4 w-4 bg-teal-400"
          }`}
        />
      </div>
      {/* Trail */}
      <div
        className="pointer-events-none fixed z-[998] hidden lg:block"
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
          transition: "all 0.15s ease-out",
        }}
      >
        <div className="h-8 w-8 rounded-full border border-teal-400/30" />
      </div>
    </>
  )
}

// Interactive Wave Demo Component
function InteractiveWaveDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isRecording, setIsRecording] = useState(false)
  const animationRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2
      canvas.height = canvas.offsetHeight * 2
      ctx.scale(2, 2)
    }
    resize()
    window.addEventListener("resize", resize)

    let phase = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
      
      const centerY = canvas.offsetHeight / 2
      const amplitude = isRecording ? 40 : 20
      
      // Draw multiple waves
      for (let w = 0; w < 3; w++) {
        ctx.beginPath()
        ctx.strokeStyle = `rgba(45, 212, 191, ${0.6 - w * 0.2})`
        ctx.lineWidth = 2 - w * 0.5

        for (let x = 0; x < canvas.offsetWidth; x++) {
          const frequency = 0.02 + w * 0.01
          const y = centerY + Math.sin(x * frequency + phase + w) * amplitude * (1 - w * 0.3)
          
          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.stroke()
      }

      phase += isRecording ? 0.1 : 0.03
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isRecording])

  return (
    <div className="relative rounded-2xl bg-[#0a1a1f] p-6 shadow-2xl">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-medium text-white/60">Live Waveform</span>
        <div className={`h-2 w-2 rounded-full ${isRecording ? "bg-red-500 animate-pulse" : "bg-white/20"}`} />
      </div>
      <canvas 
        ref={canvasRef} 
        className="h-32 w-full rounded-lg bg-[#0a1a1f]/50"
      />
      <button
        onClick={() => setIsRecording(!isRecording)}
        className={`mt-4 w-full rounded-xl py-3 text-sm font-medium transition-all ${
          isRecording 
            ? "bg-red-500/20 text-red-400 hover:bg-red-500/30" 
            : "bg-teal-400/20 text-teal-400 hover:bg-teal-400/30"
        }`}
      >
        <span className="flex items-center justify-center gap-2">
          <Mic className="h-4 w-4" />
          {isRecording ? "Stop Recording" : "Start Demo"}
        </span>
      </button>
    </div>
  )
}

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

// Animated Section Component
function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  )
}

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [language, setLanguage] = useState<"ja" | "en">("ja")
  const [activeSection, setActiveSection] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollY = useScrollAnimation()

  useEffect(() => {
    setIsMounted(true)
  }, [])

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
    ja: {
      nav: {
        features: "機能",
        howto: "使い方",
        team: "チーム",
        news: "ニュース",
        faq: "FAQ",
        contact: "お問い合わせ",
        launch: "アプリを開く",
      },
      hero: {
        title: "BreathViz AI",
        subtitle: "呼吸音診断支援アプリケーション",
        catchphrase: "AIの目で、",
        catchphrase2: "耳に見えない音を",
        catchphrase3: "可視化する。",
        tryDemo: "デモを試す",
      },
      mission: {
        label: "Our Mission",
        title: "呼吸音診断の未来を、",
        title2: "AIで切り拓く。",
        description:
          "医療現場の聴診から遠隔診療まで、AIが実現する次世代の呼吸音分析プラットフォーム。音を可視化し、誰もが高精度な診断支援を受けられる世界を目指します。",
      },
      features: {
        label: "Features",
        items: [
          {
            number: "01",
            title: "音を画像へ",
            subtitle: "スペクトログラム可視化",
            description:
              "呼吸音をリアルタイムでスペクトログラム画像に変換。従来は「耳と経験」に頼ってきた聴診を、視覚的な分析へと進化させます。",
            icon: ImageIcon,
          },
          {
            number: "02",
            title: "音を分類",
            subtitle: "AIによる高精度診断支援",
            description:
              "深層学習により、呼吸音のパターンを自動識別。正常音と異常音を95%以上の精度で分類し、医療従事者の診断をサポートします。",
            icon: Brain,
          },
          {
            number: "03",
            title: "音と画像で学ぶ",
            subtitle: "インタラクティブ学習",
            description:
              "音声データと視覚データを組み合わせた革新的な学習環境。医療従事者のスキル向上を支援し、遠隔医療にも対応。",
            icon: GraduationCap,
          },
        ],
      },
      howto: {
        label: "How to Use",
        title: "3ステップで簡単操作",
        steps: [
          { step: "01", title: "録音", description: "スマートフォンやデバイスで呼吸音を録音" },
          { step: "02", title: "分析", description: "AIが自動でスペクトログラムを生成し分類" },
          { step: "03", title: "結果確認", description: "視覚的なレポートと詳細な分析結果を取得" },
        ],
      },
      team: {
        label: "Team",
        title: "開発チーム",
        members: [
          { name: "田中 健太", role: "CEO / AI Researcher", image: "T" },
          { name: "山田 美咲", role: "CTO / Engineer", image: "Y" },
          { name: "佐藤 翔太", role: "Medical Advisor", image: "S" },
          { name: "鈴木 愛", role: "UX Designer", image: "S" },
        ],
      },
      news: {
        label: "News",
        items: [
          { date: "2025.12.20", tag: "Release", title: "BreathViz AI v2.0リリース - 新AIモデルで精度15%向上" },
          { date: "2025.11.15", tag: "Case", title: "国内主要5病院でBreathViz AI運用開始" },
          { date: "2025.10.30", tag: "Update", title: "API連携機能追加 - 電子カルテシステムとの統合を実現" },
          { date: "2025.09.10", tag: "Event", title: "日本呼吸器学会にて研究成果を発表" },
        ],
        more: "すべてのニュース",
      },
      faq: {
        label: "FAQ",
        title: "よくある質問",
        items: [
          { q: "対応デバイスは何ですか？", a: "iOS、Android、Webブラウザに対応しています。専用のデジタル聴診器との連携も可能です。" },
          { q: "精度はどのくらいですか？", a: "最新のAIモデルにより、正常音と異常音の分類精度は95%以上を達成しています。" },
          { q: "API連携は可能ですか？", a: "はい、RESTful APIを提供しており、電子カルテシステムや他の医療システムとの連携が可能です。" },
          { q: "導入コストはどのくらいですか？", a: "施設の規模や要件により異なります。詳細はお問い合わせください。" },
        ],
      },
      contact: {
        label: "Contact",
        title: "API連携・導入のご相談",
        description: "BreathViz AIのAPI連携、導入に関するご相談、その他ご質問がございましたら、お気軽にお問い合わせください。",
        form: {
          name: "お名前",
          email: "メールアドレス",
          organization: "組織名",
          message: "お問い合わせ内容",
          submit: "送信する",
        },
      },
      footer: {
        copyright: "© 2025 BreathViz AI. All rights reserved.",
      },
    },
    en: {
      nav: {
        features: "Features",
        howto: "How to Use",
        team: "Team",
        news: "News",
        faq: "FAQ",
        contact: "Contact",
        launch: "Launch App",
      },
      hero: {
        title: "BreathViz AI",
        subtitle: "Respiratory Sound Diagnosis Support",
        catchphrase: "Give your ears",
        catchphrase2: "the eyes",
        catchphrase3: "of AI.",
        tryDemo: "Try Demo",
      },
      mission: {
        label: "Our Mission",
        title: "Pioneering the future",
        title2: "of respiratory diagnosis.",
        description:
          "From clinical auscultation to telemedicine, a next-generation respiratory sound analysis platform powered by AI. Visualizing sound to create accessible, high-precision diagnostic support for everyone.",
      },
      features: {
        label: "Features",
        items: [
          {
            number: "01",
            title: "Sound to Image",
            subtitle: "Spectrogram Visualization",
            description:
              "Convert respiratory sounds into spectrogram images in real-time. Evolving auscultation from ears and experience to visual analysis.",
            icon: ImageIcon,
          },
          {
            number: "02",
            title: "Sound Classification",
            subtitle: "AI-Powered Diagnosis Support",
            description:
              "Automatic pattern recognition using deep learning. Classifies normal and abnormal sounds with over 95% accuracy.",
            icon: Brain,
          },
          {
            number: "03",
            title: "Learn with Sound & Image",
            subtitle: "Interactive Learning",
            description:
              "Innovative learning environment combining audio and visual data. Supports skill improvement and telemedicine compatibility.",
            icon: GraduationCap,
          },
        ],
      },
      howto: {
        label: "How to Use",
        title: "Simple 3-Step Process",
        steps: [
          { step: "01", title: "Record", description: "Record respiratory sounds with your smartphone or device" },
          { step: "02", title: "Analyze", description: "AI automatically generates spectrograms and classifies" },
          { step: "03", title: "Review", description: "Get visual reports and detailed analysis results" },
        ],
      },
      team: {
        label: "Team",
        title: "Development Team",
        members: [
          { name: "Kenta Tanaka", role: "CEO / AI Researcher", image: "K" },
          { name: "Misaki Yamada", role: "CTO / Engineer", image: "M" },
          { name: "Shota Sato", role: "Medical Advisor", image: "S" },
          { name: "Ai Suzuki", role: "UX Designer", image: "A" },
        ],
      },
      news: {
        label: "News",
        items: [
          { date: "2025.12.20", tag: "Release", title: "BreathViz AI v2.0 Released - 15% Accuracy Improvement" },
          { date: "2025.11.15", tag: "Case", title: "Operations Begin at 5 Major Hospitals Nationwide" },
          { date: "2025.10.30", tag: "Update", title: "API Integration Feature Added - EMR System Compatibility" },
          { date: "2025.09.10", tag: "Event", title: "Research Results Presented at Japanese Respiratory Society" },
        ],
        more: "View All News",
      },
      faq: {
        label: "FAQ",
        title: "Frequently Asked Questions",
        items: [
          { q: "What devices are supported?", a: "We support iOS, Android, and web browsers. Integration with dedicated digital stethoscopes is also available." },
          { q: "How accurate is it?", a: "Our latest AI model achieves over 95% accuracy in classifying normal and abnormal sounds." },
          { q: "Is API integration available?", a: "Yes, we provide a RESTful API that enables integration with EMR systems and other medical platforms." },
          { q: "What are the implementation costs?", a: "Costs vary based on facility size and requirements. Please contact us for details." },
        ],
      },
      contact: {
        label: "Contact",
        title: "API Integration & Inquiries",
        description: "If you have any questions about BreathViz AI API integration, implementation, or other inquiries, please feel free to contact us.",
        form: {
          name: "Name",
          email: "Email",
          organization: "Organization",
          message: "Message",
          submit: "Send Message",
        },
      },
      footer: {
        copyright: "© 2025 BreathViz AI. All rights reserved.",
      },
    },
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

  if (!isMounted || isLoading) {
    return isMounted ? <LoadingScreen onComplete={handleLoadingComplete} /> : null
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
      <header className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isDarkSection ? "bg-transparent" : "bg-white/80 backdrop-blur-md border-b border-black/5"
      }`}>
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3" data-hover>
            <div className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-500 ${
              isDarkSection ? "bg-white" : "bg-[#0a1a1f]"
            }`}>
              <Waveform className={`h-5 w-5 transition-colors duration-500 ${
                isDarkSection ? "text-[#0a1a1f]" : "text-white"
              }`} />
            </div>
            <span className={`text-lg font-semibold tracking-tight transition-colors duration-500 ${
              isDarkSection ? "text-white" : "text-[#0a1a1f]"
            }`}>
              BreathViz AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                data-hover
                className={`text-sm font-medium transition-colors duration-500 hover:opacity-60 ${
                  isDarkSection ? "text-white/80" : "text-[#0a1a1f]/70"
                }`}
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => setLanguage(language === "ja" ? "en" : "ja")}
              data-hover
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-500 hover:opacity-60 ${
                isDarkSection ? "text-white/80" : "text-[#0a1a1f]/70"
              }`}
            >
              <Globe className="h-4 w-4" />
              {language === "ja" ? "EN" : "JP"}
            </button>
            <a
              href="#"
              data-hover
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-500 ${
                isDarkSection
                  ? "bg-white text-[#0a1a1f] hover:bg-white/90"
                  : "bg-[#0a1a1f] text-white hover:bg-[#0a1a1f]/90"
              }`}
            >
              {content.nav.launch}
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden" 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className={`h-6 w-6 ${isDarkSection ? "text-white" : "text-[#0a1a1f]"}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isDarkSection ? "text-white" : "text-[#0a1a1f]"}`} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="border-t border-black/5 bg-white lg:hidden">
            <nav className="flex flex-col gap-4 p-6">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-[#0a1a1f]/70"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={() => setLanguage(language === "ja" ? "en" : "ja")}
                className="flex w-fit items-center gap-1.5 text-sm font-medium text-[#0a1a1f]/70"
              >
                <Globe className="h-4 w-4" />
                {language === "ja" ? "EN" : "JP"}
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section data-section="0" className="relative min-h-screen pt-20 overflow-hidden">
        {/* Parallax background elements */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <div className="absolute right-1/4 top-1/4 h-96 w-96 rounded-full bg-teal-200/50 blur-3xl" />
          <div className="absolute left-1/4 bottom-1/4 h-64 w-64 rounded-full bg-teal-300/30 blur-3xl" />
        </div>

        <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col justify-center px-6 py-20 relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Text */}
            <AnimatedSection className="flex flex-col justify-center">
              <p className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-[#0a1a1f]/50">
                {content.hero.subtitle}
              </p>
              <h1 className="mb-8 text-5xl font-light leading-[1.1] tracking-tight text-[#0a1a1f] md:text-6xl lg:text-7xl">
                <span className="block">{content.hero.catchphrase}</span>
                <span className="block">{content.hero.catchphrase2}</span>
                <span className="block text-teal-600">{content.hero.catchphrase3}</span>
              </h1>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#"
                  data-hover
                  className="inline-flex items-center gap-2 rounded-full bg-[#0a1a1f] px-8 py-4 text-sm font-medium text-white transition-transform hover:scale-105"
                >
                  <Play className="h-4 w-4" />
                  {content.nav.launch}
                </a>
                <a
                  href="#features"
                  data-hover
                  className="inline-flex items-center gap-2 rounded-full border-2 border-[#0a1a1f]/20 bg-transparent px-8 py-4 text-sm font-medium text-[#0a1a1f] transition-all hover:border-[#0a1a1f]/40"
                >
                  {content.hero.tryDemo}
                </a>
              </div>
            </AnimatedSection>

            {/* Right: Interactive Demo */}
            <AnimatedSection delay={200} className="flex flex-col gap-6">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <Image
                  src="/images/e3-82-b9-e3-82-af-e3-83-aa-e3-83-bc-e3-83-b3-e3-82-b7-e3-83-a7-e3-83-83-e3-83-88-202025-11-19-2023.png"
                  alt="BreathViz AI Application"
                  width={800}
                  height={600}
                  className="w-full object-cover"
                />
              </div>
              <InteractiveWaveDemo />
            </AnimatedSection>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#0a1a1f]/40">Scroll</span>
            <ChevronDown className="h-5 w-5 text-[#0a1a1f]/40" />
          </div>
        </div>
      </section>

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
      <section id="features" data-section="2" className="relative min-h-screen bg-[#f5f5f0]">
        <div className="mx-auto max-w-7xl px-6 py-32">
          <AnimatedSection>
            <p className="mb-20 text-sm font-medium uppercase tracking-[0.3em] text-[#0a1a1f]/40">
              {content.features.label}
            </p>
          </AnimatedSection>

          <div className="grid gap-8 lg:grid-cols-3">
            {content.features.items.map((feature, index) => (
              <AnimatedSection key={feature.number} delay={index * 150}>
                <div 
                  data-hover
                  className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
                >
                  {/* Background number */}
                  <span className="absolute -right-4 -top-8 font-mono text-[180px] font-bold text-[#0a1a1f]/[0.03] transition-all duration-500 group-hover:text-teal-500/10">
                    {feature.number}
                  </span>
                  
                  <div className="relative z-10">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-500/10 transition-colors duration-500 group-hover:bg-teal-500">
                      <feature.icon className="h-8 w-8 text-teal-600 transition-colors duration-500 group-hover:text-white" />
                    </div>
                    
                    <h3 className="mb-2 text-2xl font-semibold text-[#0a1a1f]">
                      {feature.title}
                    </h3>
                    <p className="mb-4 text-sm font-medium text-teal-600">
                      {feature.subtitle}
                    </p>
                    <p className="text-[#0a1a1f]/60 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

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
      <section id="news" data-section="4" className="relative min-h-screen bg-[#1a1a1a]">
        <div className="mx-auto max-w-7xl px-6 py-32">
          <AnimatedSection>
            <p className="mb-20 text-sm font-medium uppercase tracking-[0.3em] text-white/40">
              {content.news.label}
            </p>
          </AnimatedSection>

          <div className="space-y-0">
            {content.news.items.map((item, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <a
                  href="#"
                  data-hover
                  className="group flex flex-col gap-4 border-t border-white/10 py-8 transition-all first:border-t-0 hover:bg-white/5 lg:flex-row lg:items-center lg:gap-12 lg:px-6 lg:py-10 rounded-xl"
                >
                  <span className="shrink-0 font-mono text-sm text-white/30">
                    {item.date}
                  </span>
                  <span className="shrink-0 rounded-full border border-teal-400/30 px-4 py-1 text-xs font-medium text-teal-400">
                    {item.tag}
                  </span>
                  <span className="flex-1 text-xl font-medium text-white transition-colors group-hover:text-teal-400 lg:text-2xl">
                    {item.title}
                  </span>
                  <ArrowRight className="h-5 w-5 text-white/30 transition-all group-hover:translate-x-2 group-hover:text-teal-400" />
                </a>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={400}>
            <div className="mt-16">
              <a
                href="#"
                data-hover
                className="inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-teal-400"
              >
                {content.news.more}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

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
