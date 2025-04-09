import { PuzzleLayout } from "@/components/puzzle-layout"
import { PasswordForm } from "@/components/password-form"
import { Card } from "@/components/ui/card"
import { validatePassword } from "@/lib/password-utils"

// Server action for password validation
async function checkPassword(password: string) {
  "use server"

  // Get client IP for rate limiting
  const clientIp = "127.0.0.1"

  // The correct answer is "puzzle" - this would be securely stored server-side
  return validatePassword(clientIp, password, "puzzle")
}

export default function CipherPuzzle() {
  return (
    <PuzzleLayout title="Caesar Cipher Challenge" clue="What if the letters just wanted to take 3 steps forward?">
      <div className="space-y-6">
        <div className="text-center mb-4">
          <p>Decode the message below to find the password.</p>
        </div>

        <Card className="p-6 bg-slate-100 border-slate-200">
          <p className="text-center font-mono text-lg tracking-wide">SXCCOH LV WKH SDVVZRUG</p>
        </Card>

        <div className="text-center text-sm text-slate-500">
          <p>Hint: Caesar shifted his letters by a certain number...</p>
        </div>

        <PasswordForm checkPassword={checkPassword} nextLink="/debugthecode" />
      </div>
    </PuzzleLayout>
  )
}
