import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"

import { ThemeProvider } from "@/components/theme-provider"
import { ReduxProvider } from "@/lib/redux/provider"

import "./globals.css"

const _inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Huzlr - AI Project Manager | Deliver Projects 10X Faster",
  description:
    "Autonomous AI project management that predicts risks, prevents delays, and accelerates delivery. Smart planning, real-time monitoring, and team optimization. Start free trial.",
  keywords: [
    "AI project manager",
    "project management software",
    "agile project management",
    "risk forecasting",
    "team collaboration",
    "project planning AI",
    "AI scrum master",
    "resource optimization",
    "project tracking AI",
    "automated project updates",
    "project analytics AI",
    "software development management",
    "AI-driven project insights",
    "project delivery acceleration",
    "intelligent project scheduling",
    "project performance monitoring",
    "AI project coordinator",
    "project risk management AI",
    "team productivity AI",
    "project milestone tracking",
    "AI-powered project dashboards",
  ],
  openGraph: {
    title: "Huzlr - AI Project Manager That Delivers 10X Faster",
    description:
      "Autonomous project intelligence for engineering teams. Predict risks, prevent delays, optimize resources.",
    images: ["/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Huzlr - AI Project Manager",
    description:
      "Deliver projects 10X faster with AI-powered project management",
    images: ["/twitter-image.png"],
  },
  icons: {
    icon: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`font-sans antialiased`}>
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ReduxProvider>
        <Analytics />
      </body>
    </html>
  )
}
