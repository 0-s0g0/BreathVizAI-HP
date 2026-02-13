"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Globe } from "lucide-react"

interface NavItem {
  href: string
  label: string
}

interface HeaderProps {
  language: "ja" | "en"
  setLanguage: (lang: "ja" | "en") => void
  isDarkSection: boolean
  navItems: NavItem[]
  launchText: string
}

export function Header({ language, setLanguage, isDarkSection, navItems, launchText }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-500 ${
      isDarkSection ? "bg-transparent" : "bg-white/80 backdrop-blur-md border-b border-black/5"
    }`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3" data-hover>
          <div className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-500 bg-white" "
          }`}>
            <Image
              src="/breathvizai.svg"
              alt="BreathViz AI Logo"
              width={20}
              height={20}
              className="transition-colors duration-500"
              sizes="20px"
            />
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
            href="https://breathviz-ai.vercel.app/"
            data-hover
            className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-500 ${
              isDarkSection
                ? "bg-white text-[#0a1a1f] hover:bg-white/90"
                : "bg-[#0a1a1f] text-white hover:bg-[#0a1a1f]/90"
            }`}
          >
            {launchText}
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
  )
}
