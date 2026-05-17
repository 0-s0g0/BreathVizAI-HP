"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { tKeys } from "@/i18n/keys"
import { NewsCard } from "@/app/components/NewsCard/NewsCard"
import { AnimatedSection } from "@/app/Animation/AnimationSection"
import "@/i18n/config"
import i18n from "@/i18n/config"
import { Header } from "../components/Header/Header"
import { en } from "@/i18n/locales/en"
import { ja } from "@/i18n/locales/ja"
import { useRouter, useSearchParams } from "next/navigation"

type NewsItem = {
  readonly date: string
  readonly tag: string
  readonly title: string
  readonly detail: string
  readonly image: string
}

const getNewsId = (item: NewsItem) => item.date.replaceAll(".", "-")

export default function NewsPage() {
  const { t } = useTranslation()
  const searchParams = useSearchParams()
  const lang = searchParams.get("lang")
  const [selectedTag, setSelectedTag] = useState<string>("All")
  const [language, setLanguage] = useState<"ja" | "en">(lang === "en" ? "en" : "ja")
  const router = useRouter()

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

  const tags = ["All", "Release", "Award", "Event","Adoption"] as const

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
          <div className="grid gap-8 grid-cols-1  md:grid-cols-3 lg:grid-cols-4">
            {filteredNews.map((item, viewIndex) => (
              <AnimatedSection key={getNewsId(item)} delay={viewIndex * 50}>
                <div className="h-full">
                  <NewsCard
                    item={item}
                    onClick={() => router.push(`/news/${getNewsId(item)}?lang=${language}`)}
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

    </>
  )
}
