"use client"

import { useState } from "react"
import { AnimatedSection } from "@/app/Animation/AnimationSection"
import { ArrowRight } from "lucide-react"
import { useTranslation } from "react-i18next"
import { tKeys } from "@/i18n/keys"
import Image from "next/image"
import Link from "next/link"
import { NewsCard } from "@/app/components/NewsCard/NewsCard"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

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
      return "border-teal-400/30 text-teal-400"
    case "Award":
      return "border-amber-400/30 text-amber-400"
    case "Event":
      return "border-purple-400/30 text-purple-400"
    default:
      return "border-teal-400/30 text-teal-400"
  }
}

export function NewsSection() {
  const { t } = useTranslation()
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)

  const newsData = t(tKeys.news.items, { returnObjects: true }) as readonly NewsItem[]
  const displayNews = newsData.slice(0, 4) // 最初の4件のみ表示

  return (
    <>
      <section id="news" data-section="4" className="relative min-h-screen bg-[#1a1a1a] dark">
        <div className="mx-auto max-w-7xl px-6 py-32">
          <AnimatedSection>
            <p className="mb-20 text-sm font-medium uppercase tracking-[0.3em] text-white/40">
              {t(tKeys.news.label)}
            </p>
          </AnimatedSection>

          <div className="grid gap-8 md:grid-cols-4">
            {displayNews.map((item, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <NewsCard
                  item={item}
                  onClick={() => setSelectedNews(item)}
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
