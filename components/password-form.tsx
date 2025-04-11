"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle, Clock } from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import confetti from "canvas-confetti"

interface PasswordFormProps {
  checkPasswordAction: (password: string, puzzleId: string) => Promise<string>
  puzzleId: string
}

const PENALTY_TIME = 10;

export function PasswordForm({ checkPasswordAction, puzzleId }: PasswordFormProps) {
  const [password, setPassword] = useState("")
  const [nextLink, setNextLink] = useState("/404")
  const [isCorrect, setIsCorrect] = useState(false)
  const [isIncorrect, setIsIncorrect] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [cooldownTime, setCooldownTime] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)

  // Load cooldown state from localStorage on initial render
  useEffect(() => {
    // Function to get the remaining cooldown time
    const getRemainingCooldown = () => {
      try {
        const cooldownData = localStorage.getItem(`puzzle-cooldown-${puzzleId}`)
        if (cooldownData) {
          const { endTime } = JSON.parse(cooldownData)
          const now = Date.now()
          const remainingTime = Math.max(0, Math.ceil((endTime - now) / 1000))
          return remainingTime
        }
      } catch (error) {
        console.error("Error reading cooldown from localStorage:", error)
      }
      return 0
    }

    // Set initial cooldown state
    const initialCooldown = getRemainingCooldown()
    if (initialCooldown > 0) {
      setCooldownTime(initialCooldown)
    }
  }, [puzzleId])

  // Update timer and localStorage
  useEffect(() => {
    let timer: NodeJS.Timeout

    if (cooldownTime > 0) {
      // Update localStorage with end time
      if (cooldownTime === PENALTY_TIME) {
        const endTime = Date.now() + cooldownTime * 1000
        localStorage.setItem(`puzzle-cooldown-${puzzleId}`, JSON.stringify({
          endTime
        }))
      }

      // Countdown timer
      timer = setTimeout(() => {
        setCooldownTime(cooldownTime - 1)

        // Clear localStorage when timer reaches zero
        if (cooldownTime === 1) {
          localStorage.removeItem(`puzzle-cooldown-${puzzleId}`)
        }
      }, 1000)
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [cooldownTime, puzzleId])

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Double-check cooldown time from localStorage before submitting
    try {
      const cooldownData = localStorage.getItem(`puzzle-cooldown-${puzzleId}`)
      if (cooldownData) {
        const { endTime } = JSON.parse(cooldownData)
        const now = Date.now()
        const remainingTime = Math.max(0, Math.ceil((endTime - now) / 1000))

        if (remainingTime > 0) {
          setCooldownTime(remainingTime)
          return
        }
      }
    } catch (error) {
      console.error("Error checking cooldown before submission:", error)
    }

    if (isSubmitting) return

    setIsSubmitting(true)
    setIsIncorrect(false)

    try {
      const link: string = await checkPasswordAction(password, puzzleId);

      if (link) {
        setNextLink(link)
        setIsCorrect(true)
        setShowSuccess(true)
        triggerConfetti()
        // Clear any cooldown when correct answer is submitted
        localStorage.removeItem(`puzzle-cooldown-${puzzleId}`)
      } else {
        setIsIncorrect(true)
        setCooldownTime(PENALTY_TIME)
      }
    } catch (error) {
      setIsIncorrect(true)
      setCooldownTime(PENALTY_TIME)
    }

    setTimeout(() => {
      setIsSubmitting(false)
    }, 500)
  }

  return (
    <div className="space-y-4">
      {!isCorrect ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Enter your answer"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting || cooldownTime > 0}
              className="flex-1 border-purple-500 bg-[#1A0745] text-cyan-300 placeholder:text-purple-300 focus-visible:ring-cyan-500"
            />
            <Button
              type="submit"
              disabled={isSubmitting || cooldownTime > 0 || !password.trim()}
              className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white font-pixel"
            >
              {cooldownTime > 0 ? `Wait ${cooldownTime}s` : isSubmitting ? "Checking..." : "Submit"}
            </Button>
          </div>

          {cooldownTime > 0 && (
            <div className="flex items-center space-x-2 text-purple-300">
              <Clock className="h-4 w-4" />
              <div className="w-full">
                <Progress
                  value={((PENALTY_TIME - cooldownTime) / PENALTY_TIME) * 100}
                  className="h-2 bg-[#1A0745]"
                  indicatorClassName="bg-gradient-to-r from-purple-600 to-cyan-500"
                />
              </div>
              <span className="text-xs">Cooldown: {cooldownTime}s</span>
            </div>
          )}

          {isIncorrect && (
            <Alert variant="destructive" className="bg-[#3A0A45] border-red-500 text-red-300">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>That's not correct. Try again after the cooldown.</AlertDescription>
            </Alert>
          )}
        </form>
      ) : (
        <div className="space-y-4">
          <Alert className="bg-[#0A3A2A] border-green-500 text-green-300">
            <CheckCircle2 className="h-4 w-4 text-green-400" />
            <AlertDescription className="text-green-300">🎉 Congratulations! You solved the puzzle!</AlertDescription>
          </Alert>

          <div className="flex justify-center">
            <Link href={nextLink}>
              <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white font-pixel">
                Continue to Next Puzzle
              </Button>
            </Link>
          </div>
        </div>
      )}

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="bg-[#2A0E61] border-2 border-purple-500 text-cyan-300 shadow-[0_0_30px_rgba(110,64,201,0.7)]">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center font-pixel text-cyan-300">🕵️    LEVEL COMPLETE!🔎 </DialogTitle>
            <DialogDescription className="text-center text-purple-300">
              You've unlocked the next challenge!
            </DialogDescription>
          </DialogHeader>
          <div className="py-6 text-center space-y-4">
            <div className="text-4xl font-pixel bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
              You Did It!
            </div>
            <p className="text-purple-200">Your puzzle-solving skills are impressive!</p>
          </div>
          <div className="flex justify-center">
            <Link href={nextLink}>
              <Button
                onClick={() => setShowSuccess(false)}
                className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white font-pixel px-8 py-6"
              >
                CONTINUE →
              </Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
