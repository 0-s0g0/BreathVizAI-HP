"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { tKeys } from "@/i18n/keys"
import { NewsCard } from "@/app/components/NewsCard/NewsCard"
import { AnimatedSection } from "@/app/Animation/AnimationSection"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import "@/i18n/config"
import i18n from "@/i18n/config"
import { Header } from "../components/Header/Header"
import { en } from "@/i18n/locales/en"
import { ja } from "@/i18n/locales/ja"

type NewsItem = {
  readonly date: string
  readonly tag: string
  readonly title: string
  readonly detail: string
  readonly image: string
}

const getTagColor = (tag: string) => {
  switch (tag) {
    case "Release":
      return "border-teal-400/30 text-teal-400 bg-teal-400/10"
    case "Award":
      return "border-orange-400/30 text-orange-400 bg-orange-400/10"
    case "Event":
      return "border-purple-400/30 text-purple-400 bg-purple-400/10"
    case "Adoption":
      return "border-amber-400/30 text-amber-400 bg-amber-400/10"
    default:
      return "border-teal-400/30 text-teal-400 bg-teal-400/10"
  }
}

export default function NewsPage() {
  const { t } = useTranslation()
  const [selectedTag, setSelectedTag] = useState<string>("All")
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)
  const [language, setLanguage] = useState<"ja" | "en">("ja")

  // i18nextの言語を同期
  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language])

  const translations = {
    en,
    ja,
  }

  const content = translations[language]

  const navItems = [
    { href: "/#features", label: content.nav.features },
    { href: "/#howto", label: content.nav.howto },
    { href: "/#team", label: content.nav.team },
    { href: "/#news", label: content.nav.news },
    { href: "/#faq", label: content.nav.faq },
    { href: "/#contact", label: content.nav.contact },
  ]

  const newsData = t(tKeys.news.items, { returnObjects: true }) as readonly NewsItem[]

  const tags = ["All", "Release", "Award", "Event"]

  const filteredNews =
    selectedTag === "All"
      ? newsData
      : newsData.filter((item) => item.tag === selectedTag)

  return (
    <>
      <Header
        language={language}
        setLanguage={setLanguage}
        isDarkSection={false}
        navItems={navItems}
        launchText={content.nav.launch}
      />
      <div className="min-h-screen bg-[#fafafa] pt-20">

        <div className="mx-auto max-w-7xl px-6 py-16">
          {/* ページタイトル */}
          <AnimatedSection>
            <h1 className="mb-12 text-4xl font-light text-[#0a1a1f] lg:text-5xl">
              {t(tKeys.news.label)}
            </h1>
          </AnimatedSection>

          {/* タグフィルター */}
          <AnimatedSection delay={100}>
            <div className="mb-12 flex flex-wrap gap-3">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`rounded-full border px-6 py-2 text-sm font-medium transition-all ${
                    selectedTag === tag
                      ? "border-teal-500 bg-teal-500 text-white"
                      : "border-[#0a1a1f]/20 bg-transparent text-[#0a1a1f]/60 hover:border-[#0a1a1f]/40"
                  }`}
                >
                  {tag === "All" ? "すべて" : tag}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* ニュースグリッド */}
          <div className="grid gap-8 grid-cols-2  md:grid-cols-3 lg:grid-cols-4">
            {filteredNews.map((item, index) => (
              <AnimatedSection key={index} delay={index * 50}>
                <div className="h-full">
                  <NewsCard
                    item={item}
                    onClick={() => setSelectedNews(item)}
                  />
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* 結果がない場合 */}
          {filteredNews.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-[#0a1a1f]/40">該当するニュースがありません</p>
            </div>
          )}
        </div>
      </div>

      {/* モーダル */}
      <Dialog open={selectedNews !== null} onOpenChange={() => setSelectedNews(null)}>
        <DialogContent className="max-w-4xl bg-white max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="mb-4 flex items-center gap-4">
              <span className="font-mono text-sm text-gray-500">{selectedNews?.date}</span>
              <span
                className={`rounded-full border px-3 py-1 text-xs font-medium ${
                  selectedNews ? getTagColor(selectedNews.tag) : ""
                }`}
              >
                {selectedNews?.tag}
              </span>
            </div>
            <DialogTitle className="text-2xl font-semibold text-[#0a1a1f] lg:text-3xl">
              {selectedNews?.title}
            </DialogTitle>
          </DialogHeader>

          {selectedNews?.image && (
            <div className="relative aspect-video w-full overflow-hidden rounded-xl">
              <Image
                src={selectedNews.image}
                alt={selectedNews.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <DialogDescription className="mt-4 text-base leading-relaxed text-[#0a1a1f]/70">
            {selectedNews?.detail}
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  )
}
