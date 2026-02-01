"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useTranslation } from "react-i18next"
import { tKeys } from "@/i18n/keys"

type NewsItem = {
  readonly date: string
  readonly tag: string
  readonly title: string
  readonly detail: string
  readonly image: string
}

type NewsCardProps = {
  item: NewsItem
  onClick: () => void
}

const getTagBgColor = (tag: string) => {
  switch (tag) {
    case "Release":
      return "bg-teal-500"
    case "Award":
      return "bg-orange-400"
    case "Event":
      return "bg-purple-500"
    case "Adoption":
      return "bg-amber-500"
    default:
      return "bg-slate-600"
  }
}

export function NewsCard({ item, onClick }: NewsCardProps) {
  const { t } = useTranslation()
  return (
    <button
      onClick={onClick}
      className="group relative w-full overflow-hidden rounded-3xl bg-white shadow-sm hover:shadow-2xl dark:bg-white/5 dark:hover:bg-white/10 text-left transition-all hover:scale-[1.02] h-full flex flex-row md:flex-col"
    >
      {/* サムネイル画像エリア */}
      <div className="relative w-1/3 md:w-full md:aspect-video overflow-hidden shrink-0">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/5" />
      </div>

      {/* 【右側配置】境界線に左右の頂点が重なる菱形 - md以上のみ表示 */}
      <div className="hidden md:block absolute top-[calc(100%/2.3)] md:top-[calc(100%/2)] right-8 z-30 -translate-y-1/2">
        <div className="relative flex items-center justify-center">
          <div
            className={`h-12 w-12 md:h-14 md:w-14 rotate-45 transform transition-all duration-500 group-hover:rotate-[225deg] ${getTagBgColor(item.tag)} ring-[3px] ring-white dark:ring-[#2f4f4f]`}
          />
          <span className="absolute inset-0 flex items-center justify-center text-[9px] font-black text-white uppercase tracking-tighter pointer-events-none">
            {item.tag}
          </span>
        </div>
      </div>

      {/* コンテンツエリア */}
      <div className="relative z-10 p-4 md:p-6 md:pt-10 flex flex-col flex-1 justify-center md:justify-start">
        {/* md未満: 日付とタグを横並び */}
        <div className="flex md:hidden items-center gap-3 mb-2">
          <span className="font-mono text-xs font-medium text-[#0a1a1f]/40 dark:text-white/40">
            {item.date}
          </span>
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold text-white uppercase ${getTagBgColor(item.tag)}`}>
            {item.tag}
          </span>
        </div>

        {/* md以上: 日付のみ */}
        <span className="hidden md:block mb-2 font-mono text-xs font-medium text-[#0a1a1f]/40 dark:text-white/40">
          {item.date}
        </span>

        <h3 className="font-bold text-[#0a1a1f] dark:text-white transition-colors group-hover:text-teal-500 text-sm lg:text-lg line-clamp-2 md:flex-1 leading-snug mb-2 md:mb-0">
          {item.title}
        </h3>

        <div className="mt-2 md:mt-4 flex items-center gap-2 text-xs md:text-sm font-bold text-teal-500">
          <span className="relative">{t(tKeys.news.more)}</span>
          <ArrowRight className="h-3 w-3 md:h-4 md:w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </button>
  )
}