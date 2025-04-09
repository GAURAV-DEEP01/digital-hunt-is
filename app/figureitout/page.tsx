"use client"

import { useState, useRef, useEffect } from "react"
import { PuzzleLayout } from "@/components/puzzle-layout"
import { PasswordForm } from "@/components/password-form"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw } from "lucide-react"

// Client-side password check function that calls the server action
async function checkPassword(password: string) {
  // In a real app, this would call a server action
  // For demo purposes, we're checking client-side
  // The correct answer is "secretcode" - in a real app this would be validated server-side
  return password.trim().toLowerCase() === "secretcode"
}

export default function MorseCodePuzzle() {
  const [isPlaying, setIsPlaying] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const pausedTimeRef = useRef<number | null>(null)
  const elapsedTimeRef = useRef<number>(0)

  // Morse code pattern for "secretcode" (... . -.-. .-. . - -.-. --- -.. .)
  const morsePattern = [
    1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1,
    0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0,
    1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1,
  ]

  const togglePlay = () => {
    if (isPlaying) {
      // Pause animation
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      // Store the current elapsed time
      pausedTimeRef.current = performance.now()
      setIsPlaying(false)
    } else {
      // Resume animation
      if (pausedTimeRef.current !== null && startTimeRef.current !== null) {
        // Calculate how long we were paused
        const pauseDuration = performance.now() - pausedTimeRef.current
        // Adjust the start time to account for the pause
        startTimeRef.current += pauseDuration
      } else {
        // First time starting
        startTimeRef.current = performance.now() - elapsedTimeRef.current * 1000
      }

      animate()
      setIsPlaying(true)
    }
  }

  const resetAnimation = () => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
    setIsPlaying(false)
    startTimeRef.current = null
    pausedTimeRef.current = null
    elapsedTimeRef.current = 0

    // Clear canvas
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.fillStyle = "#2A0E61"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw initial state
        drawSignal(ctx, canvas.width, canvas.height, false)
        drawProgressBar(ctx, canvas.width, canvas.height, 0)
      }
    }
  }

  const drawSignal = (ctx: CanvasRenderingContext2D, width: number, height: number, isOn: boolean) => {
    if (isOn) {
      // Glow effect
      const gradient = ctx.createRadialGradient(width / 2, height / 2, 10, width / 2, height / 2, 60)
      gradient.addColorStop(0, "#00FFFF")
      gradient.addColorStop(1, "#2A0E61")

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(width / 2, height / 2, 50, 0, Math.PI * 2)
      ctx.fill()

      // Inner bright circle
      ctx.fillStyle = "#00FFFF"
      ctx.beginPath()
      ctx.arc(width / 2, height / 2, 30, 0, Math.PI * 2)
      ctx.fill()
    } else {
      // Off state - just a dim circle
      ctx.fillStyle = "#4A2B8C"
      ctx.beginPath()
      ctx.arc(width / 2, height / 2, 40, 0, Math.PI * 2)
      ctx.fill()

      // Border
      ctx.strokeStyle = "#6E40C9"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(width / 2, height / 2, 40, 0, Math.PI * 2)
      ctx.stroke()
    }
  }

  const drawProgressBar = (ctx: CanvasRenderingContext2D, width: number, height: number, progress: number) => {
    // Background
    ctx.fillStyle = "#1A0745"
    ctx.fillRect(0, height - 20, width, 20)

    // Progress
    const progressWidth = progress * width
    const gradient = ctx.createLinearGradient(0, 0, width, 0)
    gradient.addColorStop(0, "#00FFFF")
    gradient.addColorStop(1, "#FF00FF")

    ctx.fillStyle = gradient
    ctx.fillRect(0, height - 20, progressWidth, 20)

    // Border
    ctx.strokeStyle = "#6E40C9"
    ctx.lineWidth = 2
    ctx.strokeRect(0, height - 20, width, 20)
  }

  const animate = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const currentTime = performance.now()
    const elapsedTime = startTimeRef.current ? (currentTime - startTimeRef.current) / 1000 : 0
    elapsedTimeRef.current = elapsedTime

    // 30 second animation
    if (elapsedTime > 30) {
      resetAnimation()
      return
    }

    // Clear canvas
    ctx.fillStyle = "#2A0E61"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw signal based on time
    const signalIndex = Math.floor(elapsedTime * 3) % morsePattern.length
    const isOn = morsePattern[signalIndex] === 1

    drawSignal(ctx, canvas.width, canvas.height, isOn)
    drawProgressBar(ctx, canvas.width, canvas.height, elapsedTime / 30)

    animationRef.current = requestAnimationFrame(animate)
  }

  // Initialize canvas on mount
  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.fillStyle = "#2A0E61"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw initial state
        drawSignal(ctx, canvas.width, canvas.height, false)
        drawProgressBar(ctx, canvas.width, canvas.height, 0)
      }
    }

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <PuzzleLayout title="Hidden Signal Challenge" clue="Some signals don't speak in sound, but they still speak.">
      <div className="space-y-6">
        <div className="text-center mb-4">
          <p>Watch the signal carefully and decode the hidden message.</p>
        </div>

        <div className="relative">
          <canvas
            ref={canvasRef}
            width={400}
            height={300}
            className="w-full border-2 border-purple-600 rounded-md bg-[#2A0E61] shadow-[0_0_15px_rgba(110,64,201,0.7)]"
          />

          <div className="flex justify-center mt-4 space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={togglePlay}
              className="border-purple-500 bg-[#2A0E61] text-cyan-400 hover:bg-purple-900 hover:text-cyan-300"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={resetAnimation}
              className="border-purple-500 bg-[#2A0E61] text-cyan-400 hover:bg-purple-900 hover:text-cyan-300"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="text-center text-sm text-purple-300">
          <p>Hint: This is a common code used for communication...</p>
        </div>

        <PasswordForm checkPassword={checkPassword} nextLink="/success" />
      </div>
    </PuzzleLayout>
  )
}
