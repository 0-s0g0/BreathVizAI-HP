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
      className="group relative w-full overflow-hidden rounded-3xl bg-white shadow-sm hover:shadow-2xl dark:bg-white/5 dark:hover:bg-white/10 text-left transition-all hover:scale-[1.02] h-full flex flex-col"
    >
      {/* サムネイル画像エリア */}
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/5" />
      </div>

      {/* 【右側配置】境界線に左右の頂点が重なる菱形 */}
      <div className="absolute top-[calc(100%/2.3)] md:top-[calc(100%/2)] right-8 z-30 -translate-y-1/2">
        {/* top の計算: aspect-video (16:9) の場合、画像の高さは 100% / 1.777 です。
          これでちょうど画像の下端に菱形の中心（左右の頂点）が重なります。
        */}
        <div className="relative flex items-center justify-center">
          {/* 菱形本体 */}
          <div 
            className={`h-12 w-12 md:h-14 md:w-14 rotate-45 transform transition-all duration-500 group-hover:rotate-[225deg] ${getTagBgColor(item.tag)} ring-[3px] ring-white dark:ring-[#2f4f4f]`}
          />
          {/* テキスト：菱形に合わせて小さめに、かつ水平に */}
          <span className="absolute inset-0 flex items-center justify-center text-[9px] font-black text-white uppercase tracking-tighter pointer-events-none">
            {item.tag}
          </span>
        </div>
      </div>

      {/* コンテンツエリア */}
      <div className="relative z-10 p-6 pt-10 flex flex-col flex-1">
        <span className="mb-2 block font-mono text-xs font-medium text-[#0a1a1f]/40 dark:text-white/40">
          {item.date}
        </span>
        
        <h3 className=" font-bold text-[#0a1a1f] dark:text-white transition-colors group-hover:text-teal-500. text-sm lg:text-lg line-clamp-2 flex-1 leading-snug">
          {item.title}
        </h3>
        
        <div className="mt-4 flex items-center gap-2 text-sm font-bold text-teal-500">
          <span className="relative">{t(tKeys.news.more)}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </button>
  )
}