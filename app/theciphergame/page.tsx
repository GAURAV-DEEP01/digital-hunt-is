"use client"
import { useState, useEffect } from "react"
import { PuzzleLayout } from "@/components/puzzle-layout"
import { PasswordForm } from "@/components/password-form"
import { Card } from "@/components/ui/card"
import { checkPassword } from "@/lib/password-utils"
import { ArrowRight, Lock, Unlock, RefreshCw } from "lucide-react"

export default function CipherPuzzle() {
  const [animating, setAnimating] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const cipher = "SXCCOH LV WKH SDVVZRUG";

  const animateCipher = () => {
    setAnimating(true);
    setTimeout(() => setAnimating(false), 1500);
  };

  useEffect(() => {
    animateCipher();
  }, []);

  return (
    <PuzzleLayout
      title="Decode"
      clue="Crack the code to reveal the hidden password."
    >
      <div className="space-y-8 max-w-xl mx-auto">
        <Card className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-indigo-500 shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5 opacity-20"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Lock className="text-yellow-400" size={20} />
                <span className="text-yellow-400 font-semibold">ENCRYPTED</span>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-slate-700">
              <p className={`text-center font-mono text-xl tracking-widest text-green-400 ${animating ? 'animate-pulse' : ''}`}>
                {cipher.split('').map((char, index) => (
                  <span
                    key={index}
                    className={`inline-block ${animating ? 'animate-bounce' : ''}`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </Card>

        <div className="flex flex-col items-center">
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 mb-2"
          >
            {showHint ? "Hide Hint" : "Need a Hint?"}
          </button>

          {showHint && (
            <Card className="p-4 bg-amber-50 border-amber-200 w-full max-w-md">
              <div className="flex justify-center gap-3">
                <p className="text-amber-800 font-medium">I lied no hint</p>
              </div>
            </Card>
          )}
        </div>

        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Unlock className="text-indigo-600" size={20} />
            <h3 className="font-semibold text-indigo-600">DECODER STATION</h3>
          </div>
          <PasswordForm
            checkPasswordAction={checkPassword}
            puzzleId="theciphergame"
          />
        </div>
      </div>
    </PuzzleLayout>
  )
}
