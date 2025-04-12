"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Trophy,
  Stars,
  Sparkles,
  Coins,
  Rocket,
  CheckCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/api/placeholder/400/320')] opacity-5 bg-repeat"></div>
      </div>
      <SuccessContent />
    </div>
  );
}

function SuccessContent() {
  const [counter, setCounter] = useState(0);
  const [showCheckmark, setShowCheckmark] = useState(false);

  useEffect(() => {
    // Initial confetti burst
    const firstBurst = () => {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
      });
    };

    // Ongoing confetti animation
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 25, spread: 300, ticks: 50, zIndex: 0 };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 40 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: 0.2, y: Math.random() - 0.2 },
        colors: ["#FFD700", "#3B82F6", "#06B6D4", "#6366F1"],
      });

      confetti({
        ...defaults,
        particleCount,
        origin: { x: 0.8, y: Math.random() - 0.2 },
        colors: ["#FFD700", "#3B82F6", "#06B6D4", "#6366F1"],
      });
    }, 300);

    firstBurst();

    // Progress counter animation
    const counterInterval = setInterval(() => {
      setCounter((prev) => {
        const newCount = prev + 1;
        if (newCount >= 99) {
          clearInterval(counterInterval);
          setShowCheckmark(true);
        }
        return newCount > 99 ? 99 : newCount;
      });
    }, 30);

    return () => {
      clearInterval(interval);
      clearInterval(counterInterval);
    };
  }, []);

  return (
    <div className="relative z-10 w-full max-w-md">
      <div className="absolute -top-24 left-0 right-0 flex justify-center">
        <div className="relative">
          <div className="absolute -left-16 -top-6">
            <Stars className="h-10 w-10 text-indigo-300 animate-pulse" />
          </div>
          <div className="absolute -right-16 top-4">
            <Sparkles className="h-8 w-8 text-blue-300 animate-pulse" />
          </div>
          <div className="absolute left-8 -bottom-6">
            <Coins className="h-8 w-8 text-yellow-400 animate-bounce" />
          </div>
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center shadow-xl">
            <Trophy className="h-16 w-16 text-yellow-300 drop-shadow-lg" />
          </div>
        </div>
      </div>

      <Card className="mt-12 border-0 bg-slate-900/90 text-slate-100 shadow-2xl overflow-hidden">
        <CardHeader className="border-b border-indigo-700/30 pb-6 pt-6">
          <CardTitle className="text-3xl text-center font-bold mt-2 bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">
            TO WIN SHOUT: BANANA
          </CardTitle>
          <CardDescription className="text-center text-lg text-indigo-200 font-medium mt-2">
            Digital Hunt Final Round
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center pt-6 pb-6">
          <div className="mb-6 relative">
            <div className="h-4 w-full bg-indigo-900/40 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${counter}%` }}
              />
            </div>
            <span className="text-sm font-mono mt-2 text-indigo-300 block">
              {counter}% COMPLETE
            </span>
          </div>

          <div className="flex items-center justify-center mb-4">
            {showCheckmark ? (
              <div className="flex items-center text-green-400 font-semibold">
                <CheckCircle className="w-6 h-6 mr-2" />
                <span>Almost Complete!</span>
              </div>
            ) : (
              <div className="flex items-center text-indigo-200 font-semibold">
                <Rocket className="w-5 h-5 mr-2 animate-pulse" />
                <span>Loading...</span>
              </div>
            )}
          </div>

          <p className="text-xl text-slate-200 font-medium leading-relaxed">
            You're almost there!
          </p>
        </CardContent>
      </Card>

      <div className="absolute -bottom-8 left-0 right-0 flex justify-center opacity-30">
        <div className="h-16 w-48 rounded-full bg-indigo-500 blur-xl"></div>
      </div>
    </div>
  );
}
