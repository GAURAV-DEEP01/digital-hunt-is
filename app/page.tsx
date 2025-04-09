import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Gamepad2 } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-[#0F0524] to-[#1A0745]">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-pixel text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 glow-text mb-4">
          PUZZLE QUEST
        </h1>
        <p className="text-purple-300 max-w-md mx-auto">A retro arcade adventure of mind-bending challenges</p>
      </div>

      <Card className="w-full max-w-md border-2 border-purple-600 bg-[#2A0E61] text-cyan-300 shadow-[0_0_30px_rgba(110,64,201,0.5)]">
        <CardHeader className="border-b border-purple-700">
          <div className="flex justify-center mb-4">
            <Gamepad2 className="h-16 w-16 text-cyan-400" />
          </div>
          <CardTitle className="text-2xl text-center font-pixel text-cyan-300">PRESS START</CardTitle>
          <CardDescription className="text-center text-purple-300">
            A series of challenging puzzles await you...
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center pt-6">
          <p className="mb-6 text-purple-200">
            Welcome to Puzzle Quest! Each level contains a unique challenge that will test your problem-solving skills.
          </p>
          <p className="mb-6 text-purple-200">Solve each puzzle to unlock the next level. Good luck!</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/shapecountpuzz">
            <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white font-pixel px-8 py-6">
              BEGIN QUEST
            </Button>
          </Link>
        </CardFooter>
      </Card>

      <div className="mt-8 text-purple-400 text-xs font-pixel animate-pulse">INSERT COIN TO CONTINUE</div>
    </div>
  )
}
