import { PuzzleLayout } from "@/components/puzzle-layout"
import { PasswordForm } from "@/components/password-form"
import Image from "next/image"
import { validatePassword } from "@/lib/password-utils"

// Server action for password validation
async function checkPassword(password: string) {
  "use server"

  // Get client IP for rate limiting
  // In a real app, you'd get this from headers
  const clientIp = "127.0.0.1"

  // The correct answer is "12" - this would be securely stored server-side
  return validatePassword(clientIp, password, "12")
}

export default function ShapeCountPuzzle() {
  return (
    <PuzzleLayout title="Shape Count Puzzle" clue="How many shapes do you see when you *really* look?">
      <div className="space-y-6">
        <div className="flex justify-center">
          <div className="relative w-full max-w-md aspect-square bg-white border rounded-md overflow-hidden">
            <Image
              src="/placeholder.svg?height=400&width=400"
              alt="Geometric shapes puzzle"
              width={400}
              height={400}
              className="object-contain"
            />
            <div className="absolute inset-0 flex items-center justify-center text-slate-400">
              [Shape counting puzzle image would go here]
            </div>
          </div>
        </div>

        <div className="text-center mb-4">
          <p>Count the total number of triangles in the image above.</p>
          <p className="text-sm text-slate-500 mt-2">
            Look carefully - some shapes may overlap or be part of other shapes!
          </p>
        </div>

        <PasswordForm checkPassword={checkPassword} nextLink="/theciphergame" />
      </div>
    </PuzzleLayout>
  )
}
