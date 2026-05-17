"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { useTranslation } from "react-i18next"
import i18n from "@/i18n/config"
import "@/i18n/config"
import { tKeys } from "@/i18n/keys"
import { Header } from "@/app/components/Header/Header"
import { en } from "@/i18n/locales/en"
import { ja } from "@/i18n/locales/ja"

export const runtime = "edge"

type NewsItem = {
  readonly date: string
  readonly tag: string
  readonly title: string
  readonly detail: string
  readonly image: string
  readonly link?: string
}

const getNewsId = (item: NewsItem) => item.date.replaceAll(".", "-")

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

export default function NewsDetailPage() {
  const { t } = useTranslation()
  const params = useParams<{ id: string }>()
  const [language, setLanguage] = useState<"ja" | "en">("ja")

  useEffect(() => {
    const langParam = new URLSearchParams(window.location.search).get("lang")
    if (langParam === "en") {
      setLanguage("en")
    }
  }, [])

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language])

  const translations = { en, ja }
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
  const newsId = params.id
  const newsItem = useMemo(() => newsData.find((item) => getNewsId(item) === newsId), [newsData, newsId])

  const handleShareToX = () => {
    if (!newsItem || typeof window === "undefined") return

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? window.location.origin
    const detailUrl = new URL(`/news/${newsId}`, siteUrl).toString()
    const imageUrl = new URL(newsItem.image, siteUrl).toString()
    const text = `${newsItem.title}\n${detailUrl}\n${imageUrl}`
    const shareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`

    window.open(shareUrl, "_blank", "noopener,noreferrer")
  }

  if (!newsItem) {
    return (
      <>
        <Header
          language={language}
          setLanguage={setLanguage}
          isDarkSection={false}
          navItems={navItems}
          launchText={content.nav.launch}
        />
        <main className="min-h-screen bg-[#fafafa] pt-28">
          <div className="mx-auto max-w-4xl px-6 py-16">
            <p className="text-[#0a1a1f]/60">ニュースが見つかりませんでした。</p>
            <Link href={`/news?lang=${language}`} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#0a1a1f]">
              <ArrowLeft className="h-4 w-4" />
              ニュース一覧へ戻る
            </Link>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Header
        language={language}
        setLanguage={setLanguage}
        isDarkSection={false}
        navItems={navItems}
        launchText={content.nav.launch}
      />
      <main className="min-h-screen bg-[#fafafa] pt-28">
        <article className="mx-auto max-w-4xl px-6 py-10">
          <Link
            href={`/news?lang=${language}`}
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#0a1a1f]/70 hover:text-[#0a1a1f]"
          >
            <ArrowLeft className="h-4 w-4" />
            ニュース一覧へ戻る
          </Link>

          <div className="mb-4 flex items-center gap-4">
            <span className="font-mono text-sm text-gray-500">{newsItem.date}</span>
            <span className={`rounded-full border px-3 py-1 text-xs font-medium ${getTagColor(newsItem.tag)}`}>
              {newsItem.tag}
            </span>
          </div>

          <h1 className="text-3xl font-semibold leading-tight text-[#0a1a1f] lg:text-4xl">{newsItem.title}</h1>

          <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-xl">
            <Image
              src={newsItem.image}
              alt={newsItem.title}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 70vw, 100vw"
              quality={85}
            />
          </div>

          <p className="mt-8 whitespace-pre-line text-base leading-relaxed text-[#0a1a1f]/75">{newsItem.detail}</p>
          {newsItem.link && (
            <p className="mt-4 text-sm">
              <a
                href={newsItem.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-700 underline underline-offset-4 hover:opacity-80"
              >
                関連リンク: {newsItem.link}
              </a>
            </p>
          )}

          <div className="mt-8">
            <button
              type="button"
              onClick={handleShareToX}
              className="inline-flex items-center rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-80"
            >
              Xに共有
            </button>
          </div>
        </article>
      </main>
    </>
  )
}
