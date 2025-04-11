"use client"
import { PuzzleLayout } from "@/components/puzzle-layout"
import { PasswordForm } from "@/components/password-form"
import Image from "next/image"
import { checkPassword } from "@/lib/password-utils"

export default function ShapeCountPuzzle() {
  return (
    <PuzzleLayout title="Shape Count Puzzle" clue="How many do you see when you *really* look?">
      <div className="space-y-6">
        <div className="flex justify-center">
          <div className="relative w-full max-w-md aspect-square bg-white border rounded-md overflow-hidden flex items-center justify-center">
            <Image
              src="/shape.png"
              alt="Geometric shapes puzzle"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="text-center text-xl mb-4">
          <p>Count the total number of triangles and squares in the image above.</p>
          <p className="text-sm text-slate-500 mt-2">
            Look carefully - some shapes may overlap or be part of other shapes!
          </p>
        </div>

        <PasswordForm checkPasswordAction={checkPassword} puzzleId="shapecountpuzz" />
      </div >
    </PuzzleLayout >
  )
}
