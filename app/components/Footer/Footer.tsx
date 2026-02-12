"use client"

import Image from "next/image"
import { Globe } from "lucide-react"
import { useTranslation } from "react-i18next"
import { tKeys } from "@/i18n/keys"

type FooterProps = {
  language: "ja" | "en"
  setLanguage: (language: "ja" | "en") => void
}

export function Footer({ language, setLanguage }: FooterProps) {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-[#0a1a1f]/5 bg-[#fafafa] py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg ">
            <Image
              src="/breathvizai.svg"
              alt="BreathViz AI Logo"
              width={20}
              height={20}
              sizes="20px"
            />
          </div>
          <span className="text-lg font-semibold text-[#0a1a1f]">BreathViz AI</span>
        </div>
        <p className="text-sm text-[#0a1a1f]/40">{t(tKeys.footer.copyright)}</p>
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
  )
}
