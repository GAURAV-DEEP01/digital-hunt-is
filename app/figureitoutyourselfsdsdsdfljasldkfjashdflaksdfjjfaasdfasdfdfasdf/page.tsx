"use client";
import { useState, useRef, useEffect } from "react";
import { PuzzleLayout } from "@/components/puzzle-layout";
import { PasswordForm } from "@/components/password-form";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";
import { checkPassword } from "@/lib/password-utils";

const UNIT_DURATION_MS = 200;
const DIT_DURATION = 1 * UNIT_DURATION_MS;
const DAH_DURATION = 3 * UNIT_DURATION_MS;
const INTRA_SYMBOL_GAP_DURATION = 1 * UNIT_DURATION_MS;
const INTER_LETTER_GAP_DURATION = 2000;

type MorseSegment = {
  duration: number;
  isOn: boolean;
  symbol: string | null;
  isLetterGap: boolean;
};

function generateMorseSequence(text: string): MorseSegment[] {
  const sequence: MorseSegment[] = [];
  const morseMap: { [key: string]: string } = {
    A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.", H: "....", I: "..", J: ".---",
    K: "-.-", L: ".-..", M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.", S: "...", T: "-",
    U: "..-", V: "...-", W: ".--", X: "-..-", Y: "-.--", Z: "--..",
    '1': ".----", '2': "..---", '3': "...--", '4': "....-", '5': ".....",
    '6': "-....", '7': "--...", '8': "---..", '9': "----.", '0': "-----"
  };

  const letters = text.toUpperCase().split('');

  letters.forEach((letter, letterIndex) => {
    const pattern = morseMap[letter];
    if (!pattern) return;

    const symbols = pattern.split('');

    symbols.forEach((symbol, symbolIndex) => {
      const isDit = symbol === '.';
      const duration = isDit ? DIT_DURATION : DAH_DURATION;

      sequence.push({
        duration: duration,
        isOn: true,
        symbol: isDit ? '•' : '–',
        isLetterGap: false
      });

      const isLastSymbolInLetter = symbolIndex === symbols.length - 1;
      if (!isLastSymbolInLetter) {
        sequence.push({
          duration: INTRA_SYMBOL_GAP_DURATION,
          isOn: false,
          symbol: null,
          isLetterGap: false
        });
      }
    });

    const isLastLetter = letterIndex === letters.length - 1;
    if (!isLastLetter) {
      sequence.push({
        duration: INTER_LETTER_GAP_DURATION,
        isOn: false,
        symbol: null,
        isLetterGap: true
      });
    }
  });

  return sequence;
}

export default function MorseCodePuzzle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [morseSequence] = useState(() => generateMorseSequence("SECRETCODE"));

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const sequenceIndexRef = useRef<number>(0);
  const timeInSegmentRef = useRef<number>(0);
  const absoluteStartTimeRef = useRef<number | null>(null);
  const totalElapsedTimeRef = useRef<number>(0);


  const TOTAL_DURATION_MS = morseSequence.reduce((sum, seg) => sum + seg.duration, 0);

  const drawSignal = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    segment: MorseSegment | null
  ) => {

    ctx.fillStyle = "#2A0E61";
    ctx.fillRect(0, 0, width, height - 20);

    const centerX = width / 2;
    const centerY = (height - 20) / 2;

    if (segment && segment.isOn) {
      const gradient = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 60);
      gradient.addColorStop(0, "#00FFFF");
      gradient.addColorStop(1, "rgba(42, 14, 97, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 60, 0, Math.PI * 2);
      ctx.fill();


      ctx.fillStyle = "#00FFFF";
      ctx.beginPath();
      ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
      ctx.fill();


      if (segment.symbol) {
        ctx.fillStyle = "#1A0745";
        ctx.font = "bold 32px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(segment.symbol, centerX, centerY);
      }
    } else {
      ctx.fillStyle = "#4A2B8C";
      ctx.beginPath();
      ctx.arc(centerX, centerY, 40, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "#6E40C9";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 40, 0, Math.PI * 2);
      ctx.stroke();
    }
  };

  const drawProgressBar = (ctx: CanvasRenderingContext2D, width: number, height: number, progress: number) => {
    const barY = height - 20;
    const barHeight = 20;


    ctx.fillStyle = "#1A0745";
    ctx.fillRect(0, barY, width, barHeight);


    const progressWidth = progress * width;
    if (progressWidth > 0) {
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, "#00FFFF");
      gradient.addColorStop(1, "#FF00FF");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, barY, progressWidth, barHeight);
    }


    ctx.strokeStyle = "#6E40C9";
    ctx.lineWidth = 2;
    ctx.strokeRect(0, barY, width, barHeight);
  };

  const animate = (timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !absoluteStartTimeRef.current) {
      setIsPlaying(false);
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;


    const delta = timestamp - absoluteStartTimeRef.current - totalElapsedTimeRef.current;
    totalElapsedTimeRef.current += delta;
    timeInSegmentRef.current += delta;

    let currentSegmentIndex = sequenceIndexRef.current;
    let currentSegment = morseSequence[currentSegmentIndex];

    while (currentSegment && timeInSegmentRef.current >= currentSegment.duration) {
      timeInSegmentRef.current -= currentSegment.duration;
      currentSegmentIndex++;
      sequenceIndexRef.current = currentSegmentIndex;
      currentSegment = morseSequence[currentSegmentIndex];

      if (!currentSegment) break;
    }

    if (!currentSegment) {
      resetAnimation();

      if (canvas && ctx) {
        drawSignal(ctx, canvas.width, canvas.height, null);
        drawProgressBar(ctx, canvas.width, canvas.height, 1);
      }
      return;
    }


    drawSignal(ctx, canvas.width, canvas.height, currentSegment);
    const progress = Math.min(totalElapsedTimeRef.current / TOTAL_DURATION_MS, 1);
    drawProgressBar(ctx, canvas.width, canvas.height, progress);


    animationRef.current = requestAnimationFrame(animate);
  };

  const togglePlay = () => {
    if (isPlaying) {

      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      absoluteStartTimeRef.current = null;
      setIsPlaying(false);
    } else {

      absoluteStartTimeRef.current = performance.now();
      if (sequenceIndexRef.current >= morseSequence.length) {

        resetAnimationInternal();
      }
      animationRef.current = requestAnimationFrame(animate);
      setIsPlaying(true);
    }
  };

  const resetAnimationInternal = () => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    setIsPlaying(false);
    sequenceIndexRef.current = 0;
    timeInSegmentRef.current = 0;
    absoluteStartTimeRef.current = null;
    totalElapsedTimeRef.current = 0;
  }

  const resetAnimation = () => {
    resetAnimationInternal();


    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#2A0E61";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#00FFFF";
        ctx.font = "bold 28px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("TRYING AGAIN?", canvas.width / 2, (canvas.height - 20) / 2);


        setTimeout(() => {
          if (canvasRef.current) {
            const currentCtx = canvasRef.current.getContext("2d");
            if (currentCtx) {
              currentCtx.fillStyle = "#2A0E61";
              currentCtx.fillRect(0, 0, canvas.width, canvas.height);
              drawSignal(currentCtx, canvas.width, canvas.height, null);
              drawProgressBar(currentCtx, canvas.width, canvas.height, 0);
            }
          }
        }, 500);
      }
    }
  };



  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {

        ctx.fillStyle = "#2A0E61";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawSignal(ctx, canvas.width, canvas.height, null);
        drawProgressBar(ctx, canvas.width, canvas.height, 0);
      }
    }

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, []);

  return (
    <PuzzleLayout title="Figure it out" clue="Some signals don't speak in sound, but they still speak.">
      <div className="space-y-6">
        <div className="text-center mb-4">
          <p>Watch the signal carefully </p>
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
              aria-label={isPlaying ? "Pause signal" : "Play signal"}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={resetAnimation}
              className="border-purple-500 bg-[#2A0E61] text-cyan-400 hover:bg-purple-900 hover:text-cyan-300"
              aria-label="Reset signal"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <PasswordForm checkPasswordAction={checkPassword} puzzleId="figureitout" />
      </div>
    </PuzzleLayout>
  );
}
