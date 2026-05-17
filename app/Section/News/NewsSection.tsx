"use client"

import { AnimatedSection } from "@/app/Animation/AnimationSection"
import { ArrowRight } from "lucide-react"
import { useTranslation } from "react-i18next"
import { tKeys } from "@/i18n/keys"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { NewsCard } from "@/app/components/NewsCard/NewsCard"

type NewsItem = {
  readonly date: string
  readonly tag: string
  readonly title: string
  readonly detail: string
  readonly image: string
}

const getNewsId = (item: NewsItem) => item.date.replaceAll(".", "-")

export function NewsSection() {
  const { t, i18n } = useTranslation()
  const router = useRouter()

  const newsData = t(tKeys.news.items, { returnObjects: true }) as readonly NewsItem[]
  const displayNews = newsData.slice(0, 4) // 最初の8件のみ表示

  return (
    <>
      <section id="news" data-section="4" className="relative min-h-screen bg-[#2f4f4f] dark">
        <div className="mx-auto max-w-7xl px-6 py-32">
          <AnimatedSection>
            <p className="mb-20 text-sm font-medium uppercase tracking-[0.3em] text-white/40">
              {t(tKeys.news.label)}
            </p>
          </AnimatedSection>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {displayNews.map((item, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <NewsCard
                  item={item}
                  onClick={() =>
                    router.push(`/news/${getNewsId(item)}?lang=${i18n.language === "en" ? "en" : "ja"}`)
                  }
                />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={400}>
            <div className="mt-16 text-center">
              <Link
                href="/news"
                data-hover
                className="inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-teal-400"
              >
                {t(tKeys.news.moreall)}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
