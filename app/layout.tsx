// RootLayout.tsx
import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"
import { Press_Start_2P } from "next/font/google"
import { cn } from "@/lib/utils"

const pixelFont = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
})

export const metadata: Metadata = {
  title: "Digital Puzzle Hunt",
  description: "A multi-level puzzle game with challenging puzzles",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn(pixelFont.variable)} suppressHydrationWarning>
      <body className="min-h-screen bg-gradient-to-b from-[#0F0524] to-[#1A0745] text-cyan-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
