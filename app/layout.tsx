import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BreathVizAI-AI呼吸音解析プラットフォーム",
  description: "呼吸音を可視化し分類する。",
  keywords: ["BreathVizAI", "呼吸音", "バイタルチェック", "AI", "医療", "ヘルスケア"],
  authors: [{ name: "0-s0g0" }],
  creator: "0-s0g0",
  publisher: "0-s0g0",
  metadataBase: new URL("https://hp.breathvizai.com"),
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://hp.breathvizai.com",
    siteName: "BreathVizAI",
    title: "BreathVizAI-AI呼吸音解析プラットフォーム",
    description: "呼吸音を可視化し分類する。",
    images: [
      {
        url: "/opengraph-image.png",
        width: 2560,
        height: 1626,
        alt: "BreathVizAI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BreathVizAI-AI呼吸音解析プラットフォーム",
    description: "呼吸音を可視化し分類する。",
    images: ["/opengraph-image.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
