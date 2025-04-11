"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sparkles, Puzzle, Zap, Trophy } from "lucide-react";
import { floatingIcons } from "@/lib/utils";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-[#0F0524] to-[#1A0745] overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,...')] opacity-10 animate-pulse"></div>

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
              animationDelay: item.delay,
            }}>
            <IconComponent size={item.size} className="text-purple-500" />
          </div>
        );
      })}

      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-purple-800/20 blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-indigo-700/20 blur-3xl animate-pulse"
        style={{ animationDelay: "1.5s" }}></div>
      <div
        className="absolute top-2/3 right-1/3 w-24 h-24 rounded-full bg-fuchsia-700/20 blur-3xl animate-pulse"
        style={{ animationDelay: "0.8s" }}></div>

      <div className="relative z-10 py-10">
        <div className="text-center mb-8">
          <div className="relative">
            <h1 className="text-5xl md:text-7xl font-pixel text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-cyan-400 glow-text mb-4 animate-pulse">
              Digital Hunt
            </h1>
            <Sparkles
              className="absolute -top-6 -right-6 text-yellow-300 animate-spin"
              style={{ animationDuration: "8s" }}
            />
            <Sparkles
              className="absolute -top-6 -left-6 text-cyan-300 animate-spin"
              style={{ animationDuration: "8s", animationDirection: "reverse" }}
            />
          </div>
          <p className="text-purple-200 mx-auto text-lg tracking-wide">
            solve puzzles, uncover secrets, and reach the treasure.
          </p>
          {/* <div className="w-full h-px bg-cyan-400 opacity-70 mt-4 animate-scanning"></div> */}
        </div>

        <Card className="border-2 border-purple-600 bg-[#2A0E61]/80 text-cyan-300 shadow-[0_0_50px_rgba(110,64,201,0.6)] backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-border-flow"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-border-flow"></div>
            <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-border-flow-vertical"></div>
            <div className="absolute top-0 bottom-0 right-0 w-1 bg-gradient-to-b from-transparent via-purple-500 to-transparent animate-border-flow-vertical"></div>
          </div>

          <div className="relative z-10">
            <CardHeader className="border-b border-purple-700/50">
              <CardTitle className="text-3xl text-center font-pixel text-cyan-300 glow-text">
                Start the Hunt
              </CardTitle>
            </CardHeader>

            <CardContent className="text-center pt-6 relative">
              <p className="mb-2 text-purple-200">
                This digital hunt is packed with brain-teasers, patterns, and
                logic-based tasks.
              </p>
              <p className="mb-6 text-purple-200">
                Stay sharp, solve fast, and claim your victory!
              </p>

              <div className="flex flex-col items-center justify-center">
                <div className="flex justify-center mb-4 relative">
                  <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full"></div>
                  <Puzzle className="h-16 w-16 text-cyan-400 animate-pulse relative z-10" />
                </div>
                <p className="text-purple-200 text-sm text-center max-w-xs">
                  "Only the curious will crack the code. Let the mystery guide
                  you."
                </p>
              </div>
            </CardContent>
            <div className="my-2 text-purple-400 text-sm font-pixel animate-bounce flex items-center justify-center gap-2">
              <Zap className="h-4 w-4" />
              <span>Ready to solve the first puzzle?</span>
              <Zap className="h-4 w-4" />
            </div>
            <CardFooter className="flex justify-center pb-8">
              <Link href="https://v0-circle-drawing-project.vercel.app/">
                <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white font-pixel px-8 py-6 relative group overflow-hidden">
                  <span className="relative z-10">Begin Challenge</span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  <div className="absolute -inset-px scale-x-0 group-hover:scale-x-100 bg-gradient-to-r from-yellow-400 to-pink-500 opacity-30 transition-transform origin-left"></div>
                </Button>
              </Link>
            </CardFooter>
          </div>
        </Card>
      </div>

      <div className="absolute top-4 right-4 text-purple-500 opacity-50">
        <Trophy size={30} className="animate-pulse" />
      </div>
    </div>
  );
}
