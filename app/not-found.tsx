import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-[#0F0524] to-[#1A0745]">
      <Card className="w-full max-w-md border-2 border-purple-600 bg-[#2A0E61] text-cyan-300 shadow-[0_0_30px_rgba(110,64,201,0.5)]">
        <CardHeader>
          <CardTitle className="text-center font-pixel">
            <div className="text-6xl mb-4 text-red-400">404</div>
            <div className="text-xl text-cyan-300">GAME OVER</div>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="font-pixel text-purple-300 text-sm">
            <div className="mb-2">ERROR: LEVEL NOT FOUND</div>
            <div className="text-xs">CONTINUE? 9...8...7...</div>
          </div>

          <div className="pixel-art mx-auto w-32 h-32 mb-4">
            <div className="text-6xl">👾</div>
          </div>

          <p className="text-purple-200">
            Oops! You've wandered into an uncharted level. The puzzle you're looking for has been eaten by a hungry
            arcade ghost.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/">
            <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white font-pixel">
              INSERT COIN TO CONTINUE
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
