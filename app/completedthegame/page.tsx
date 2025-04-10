"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Trophy, Stars, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"
import confetti from "canvas-confetti"

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-[#0F0524] via-[#180A3A] to-[#1A0745] animate-fade-in">
      <SuccessContent />
    </div>
  )
}

function SuccessContent() {
  const [showStats, _setShowStats] = useState(false)
  const [counter, setCounter] = useState(0)


  useEffect(() => {

    const firstBurst = () => {
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 }
      });
    }

    const duration = 6 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()
      if (timeLeft <= 0) return clearInterval(interval)

      const particleCount = 50 * (timeLeft / duration)

      confetti({
        ...defaults,
        particleCount,
        origin: { x: 0.1, y: Math.random() - 0.2 },
        colors: ['#9333EA', '#06B6D4', '#FFD700', '#FF4500']
      })

      confetti({
        ...defaults,
        particleCount,
        origin: { x: 0.9, y: Math.random() - 0.2 },
        colors: ['#9333EA', '#06B6D4', '#FFD700', '#FF4500']
      })
    }, 250)

    firstBurst()

    const counterInterval = setInterval(() => {
      setCounter(prev => {
        const newCount = prev + 1
        if (newCount >= 100) {
          clearInterval(counterInterval)
        }
        return newCount > 100 ? 100 : newCount
      })
    }, 30)

    return () => {
      clearInterval(interval)
      clearInterval(counterInterval)
    }
  }, [])

  return (
    <Card className="w-full max-w-md border-4 border-purple-700 bg-[#2A0E61]/90 text-cyan-300 shadow-[0_0_60px_rgba(168,85,247,0.8)] animate-pulse">
      <CardHeader className="border-b border-purple-800 pb-4">
        <div className="flex justify-center relative">
          <div className="absolute -top-16 left-0 right-0 flex justify-center pointer-events-none">
            <Stars className="h-12 w-12 text-yellow-300 absolute -left-6 -top-4 animate-spin" style={{ animationDuration: '7s' }} />
            <Sparkles className="h-10 w-10 text-cyan-300 absolute -right-8 top-2 animate-pulse" />
          </div>
          <Trophy className="h-24 w-24 text-yellow-400 drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]" />
        </div>
        <CardTitle className="text-3xl md:text-4xl text-center font-bold mt-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 animate-pulse">
          VICTORY ACHIEVED!
        </CardTitle>
        <CardDescription className="text-center text-lg text-purple-200 font-medium mt-2">
          100% Completion Master!
        </CardDescription>
      </CardHeader>

      <CardContent className="text-center pt-4">
        <div className="mb-4 relative">
          <div className="h-4 w-full bg-purple-900/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-600 via-cyan-400 to-pink-500 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${counter}%` }}
            />
          </div>
          <span className="text-xs font-mono mt-1 text-purple-300">{counter}% AWESOME</span>
        </div>

        <p className="mb-4 text-lg text-purple-100 font-medium">
          You've conquered the Digital Puzzle Hunt!
        </p>

        <div className="flex flex-wrap gap-2 justify-center mb-4">
          <span className="bg-purple-800/70 px-3 py-1 rounded-full text-sm font-medium text-purple-100">🧠 Mind Master</span>
          <span className="bg-cyan-800/70 px-3 py-1 rounded-full text-sm font-medium text-cyan-100">✨ Puzzle Pro</span>
          <span className="bg-pink-800/70 px-3 py-1 rounded-full text-sm font-medium text-pink-100">🔥 Code Breaker</span>
        </div>

        {showStats ? (
          <div className="bg-purple-900/30 p-3 rounded-lg text-left text-sm mb-4 animate-fade-in">
            <div className="flex justify-between mb-1">
              <span>Time</span>
              <span className="font-mono">14:32</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Puzzles Solved</span>
              <span className="font-mono">12/12</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Hints Used</span>
              <span className="font-mono">2</span>
            </div>
            <div className="flex justify-between">
              <span>Final Score</span>
              <span className="font-mono text-yellow-300">4,850</span>
            </div>
          </div>
        ) : null}

      </CardContent>
    </Card>
  )
}
