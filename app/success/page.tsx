"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Trophy } from "lucide-react"
import { useEffect } from "react"
import confetti from "canvas-confetti"

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-[#0F0524] to-[#1A0745]">
      <SuccessContent />
    </div>
  )
}

function SuccessContent() {
  useEffect(() => {
    const duration = 5 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now()
      if (timeLeft <= 0) return clearInterval(interval)

      const particleCount = 50 * (timeLeft / duration)
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } })
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } })
    }, 250)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="w-full max-w-md border-2 border-purple-600 bg-[#2A0E61] text-cyan-300 shadow-[0_0_30px_rgba(110,64,201,0.7)]">
      <CardHeader className="border-b border-purple-700">
        <div className="flex justify-center mb-4">
          <Trophy className="h-16 w-16 text-yellow-400" />
        </div>
        <CardTitle className="text-2xl text-center font-pixel text-yellow-300 glow-text">GAME COMPLETE!</CardTitle>
        <CardDescription className="text-center text-purple-300">You've mastered all the puzzles!</CardDescription>
      </CardHeader>
      <CardContent className="text-center pt-6">
        <div className="text-4xl font-pixel bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text mb-6">
          FINAL SCORE: 1000
        </div>
        <p className="mb-6 text-purple-200">
          You've successfully solved all the puzzles in the Digital Puzzle Hunt. Your problem-solving skills are
          legendary!
        </p>
        <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto mb-6">
          <div className="bg-[#1A0745] p-3 rounded-md border border-purple-700">
            <div className="text-xs text-purple-300">PUZZLES</div>
            <div className="text-xl text-cyan-300 font-pixel">4/4</div>
          </div>
          <div className="bg-[#1A0745] p-3 rounded-md border border-purple-700">
            <div className="text-xs text-purple-300">RANK</div>
            <div className="text-xl text-cyan-300 font-pixel">S+</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link href="/">
          <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white font-pixel">
            PLAY AGAIN
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
