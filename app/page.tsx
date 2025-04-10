'use client'
import Link from "next/link"
// Example for _app.tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Gamepad2, Star, Sparkles, Puzzle, Brain, Zap, Trophy } from "lucide-react"

export default function Home() {
  // Static floating icons array - predefined positions instead of random
  const floatingIcons = [
    { id: 1, icon: Star, left: "10%", top: "15%", size: "1.2rem", duration: "15s", opacity: 0.3, delay: "0s" },
    { id: 2, icon: Puzzle, left: "85%", top: "25%", size: "1.5rem", duration: "18s", opacity: 0.2, delay: "1s" },
    { id: 3, icon: Brain, left: "20%", top: "75%", size: "1.8rem", duration: "20s", opacity: 0.3, delay: "2s" },
    { id: 4, icon: Zap, left: "75%", top: "80%", size: "1rem", duration: "12s", opacity: 0.2, delay: "3s" },
    { id: 5, icon: Trophy, left: "30%", top: "10%", size: "1.4rem", duration: "17s", opacity: 0.25, delay: "1.5s" },
    { id: 6, icon: Star, left: "60%", top: "65%", size: "1.3rem", duration: "19s", opacity: 0.15, delay: "2.5s" },
    { id: 7, icon: Puzzle, left: "15%", top: "45%", size: "1.6rem", duration: "16s", opacity: 0.2, delay: "0.5s" },
    { id: 8, icon: Brain, left: "80%", top: "40%", size: "1.1rem", duration: "14s", opacity: 0.3, delay: "3.5s" },
    { id: 9, icon: Zap, left: "40%", top: "85%", size: "1.7rem", duration: "21s", opacity: 0.25, delay: "1.2s" },
    { id: 10, icon: Trophy, left: "65%", top: "15%", size: "1.5rem", duration: "13s", opacity: 0.2, delay: "2.8s" },
    { id: 11, icon: Star, left: "25%", top: "30%", size: "1.2rem", duration: "18s", opacity: 0.15, delay: "0.8s" },
    { id: 12, icon: Puzzle, left: "70%", top: "60%", size: "1.4rem", duration: "15s", opacity: 0.25, delay: "3.2s" },
    { id: 13, icon: Brain, left: "50%", top: "20%", size: "1.3rem", duration: "17s", opacity: 0.2, delay: "1.7s" },
    { id: 14, icon: Zap, left: "35%", top: "70%", size: "1.6rem", duration: "19s", opacity: 0.3, delay: "2.2s" },
    { id: 15, icon: Trophy, left: "90%", top: "55%", size: "1.1rem", duration: "16s", opacity: 0.25, delay: "0.3s" }
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-[#0F0524] to-[#1A0745] overflow-hidden relative">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIHN0cm9rZT0iIzMxMTI2RiIgc3Ryb2tlLXdpZHRoPSIxIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10 animate-pulse"></div>

      {/* Floating icons background - statically rendered */}
      {floatingIcons.map((item) => {
        const IconComponent = item.icon;
        return (
          <div
            key={item.id}
            className="absolute animate-float pointer-events-none"
            style={{
              left: item.left,
              top: item.top,
              opacity: item.opacity,
              animationDuration: item.duration,
              animationDelay: item.delay
            }}
          >
            <IconComponent
              size={item.size}
              className="text-purple-500"
            />
          </div>
        );
      })}

      {/* Random purple glowing orbs in the background */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-purple-800/20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-indigo-700/20 blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }}></div>
      <div className="absolute top-2/3 right-1/3 w-24 h-24 rounded-full bg-fuchsia-700/20 blur-3xl animate-pulse" style={{ animationDelay: "0.8s" }}></div>

      {/* Main content */}
      <div className="relative z-10">
        <div className="text-center mb-8">
          <div className="relative">
            <h1 className="text-5xl md:text-7xl font-pixel text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-cyan-400 glow-text mb-4 animate-pulse">
              Digital hunt
            </h1>
            <Sparkles className="absolute -top-6 -right-6 text-yellow-300 animate-spin" style={{ animationDuration: '8s' }} />
            <Sparkles className="absolute -top-6 -left-6 text-cyan-300 animate-spin" style={{ animationDuration: '8s', animationDirection: 'reverse' }} />
          </div>
          <p className="text-purple-300 max-w-md mx-auto text-lg tracking-wide font-light">
            A retro arcade adventure of mind-bending challenges
          </p>

          {/* Scanning line effect */}
          <div className="w-full h-px bg-cyan-400 opacity-70 mt-4 animate-scanning"></div>
        </div>

        <Card className="border-2 border-purple-600 bg-[#2A0E61]/80 text-cyan-300 shadow-[0_0_50px_rgba(110,64,201,0.6)] backdrop-blur-sm relative overflow-hidden">
          {/* Animated border effect */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-border-flow"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-border-flow"></div>
            <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-border-flow-vertical"></div>
            <div className="absolute top-0 bottom-0 right-0 w-1 bg-gradient-to-b from-transparent via-purple-500 to-transparent animate-border-flow-vertical"></div>
          </div>

          <div className="relative z-10">
            <CardHeader className="border-b border-purple-700/50">
              <div className="flex justify-center mb-4 relative">
                <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full"></div>
                <Gamepad2 className="h-16 w-16 text-cyan-400 animate-pulse relative z-10" />
              </div>
              <CardTitle className="text-3xl text-center font-pixel text-cyan-300 glow-text">PRESS START</CardTitle>
              <CardDescription className="text-center text-purple-300 text-lg">
                A series of challenging puzzles await you...
              </CardDescription>
            </CardHeader>

            <CardContent className="text-center pt-6 relative">
              {/* Decorative circuit lines */}
              <div className="absolute left-0 top-0 w-16 h-16 border-l-2 border-t-2 border-cyan-500/30"></div>
              <div className="absolute right-0 bottom-0 w-16 h-16 border-r-2 border-b-2 border-cyan-500/30"></div>

              <p className="mb-6 text-purple-200">
                Welcome to Puzzle Quest! Each level contains a unique challenge that will test your problem-solving skills.
              </p>
              <p className="mb-6 text-purple-200">Solve each puzzle to unlock the next level. Good luck!</p>

              {/* Level indicator */}
              <div className="flex justify-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div key={level} className={`w-2 h-2 rounded-full ${level === 1 ? 'bg-cyan-400' : 'bg-purple-700'}`}></div>
                ))}
              </div>

              {/* Decorative radar/scanner effect */}
              <div className="w-32 h-32 mx-auto relative opacity-20 mt-2 mb-2">
                <div className="absolute inset-0 rounded-full border border-cyan-400"></div>
                <div className="absolute inset-2 rounded-full border border-cyan-400"></div>
                <div className="absolute inset-4 rounded-full border border-cyan-400"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-transparent opacity-50 animate-radar-spin"></div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-center pb-8">
              <Link href="/shapecountpuzz">
                <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white font-pixel px-8 py-6 relative group overflow-hidden">
                  <span className="relative z-10">BEGIN QUEST</span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  <div className="absolute -inset-px scale-x-0 group-hover:scale-x-100 bg-gradient-to-r from-yellow-400 to-pink-500 opacity-30 transition-transform origin-left"></div>
                </Button>
              </Link>
            </CardFooter>
          </div>
        </Card>

        <div className="mt-8 text-purple-400 text-sm font-pixel animate-bounce flex items-center justify-center gap-2">
          <Gamepad2 className="h-4 w-4" />
          <span>INSERT COIN TO CONTINUE</span>
          <Gamepad2 className="h-4 w-4" />
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-4 right-4 text-purple-500 opacity-50">
        <Trophy size={30} className="animate-pulse" />
      </div>
      <div className="absolute bottom-4 left-4 text-purple-500 opacity-50">
        <Brain size={30} className="animate-pulse" />
      </div>

      {/* Add custom animation keyframes */}
      <style jsx global>{`
  @keyframes float {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0);
    }
  }

  @keyframes border-flow {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  @keyframes border-flow-vertical {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(100%);
    }
  }

  @keyframes radar-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes scanning {
    0% {
      transform: scaleX(0);
      opacity: 0.2;
    }
    50% {
      transform: scaleX(1);
      opacity: 0.7;
    }
    100% {
      transform: scaleX(0);
      opacity: 0.2;
    }
  }

  .animate-float {
    animation: float infinite ease-in-out;
  }

  .animate-border-flow {
    animation: border-flow 3s linear infinite;
  }

  .animate-border-flow-vertical {
    animation: border-flow-vertical 3s linear infinite;
  }

  .animate-radar-spin {
    animation: radar-spin 6s linear infinite;
  }

  .animate-scanning {
    animation: scanning 3s ease-in-out infinite;
  }
`}</style>


    </div>
  );
}
