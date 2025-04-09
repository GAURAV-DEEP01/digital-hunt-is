import type { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface PuzzleLayoutProps {
  title: string
  clue: string
  children: ReactNode
}

export function PuzzleLayout({ title, clue, children }: PuzzleLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-[#0F0524] to-[#1A0745]">
      <Card className="w-full max-w-2xl border-2 border-purple-600 bg-[#2A0E61] text-cyan-300 shadow-[0_0_30px_rgba(110,64,201,0.5)]">
        <CardHeader className="border-b border-purple-700">
          <CardTitle className="text-2xl text-center font-pixel text-cyan-300 glow-text">{title}</CardTitle>
          <CardDescription className="text-center italic text-purple-300">"{clue}"</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">{children}</CardContent>
      </Card>
    </div>
  )
}
