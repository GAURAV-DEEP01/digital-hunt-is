import { PuzzleLayout } from "@/components/puzzle-layout"
import { PasswordForm } from "@/components/password-form"
import { validatePassword } from "@/lib/password-utils"

// Server action for password validation
async function checkPassword(password: string) {
  "use server"

  // Get client IP for rate limiting
  const clientIp = "127.0.0.1"

  // The correct answer is "hello world" - this would be securely stored server-side
  return validatePassword(clientIp, password, "hello world")
}

export default function DebugCodePuzzle() {
  return (
    <PuzzleLayout title="Debug the Code" clue="What would C say if you helped it fix its bugs?">
      <div className="space-y-6">
        <div className="text-center mb-4">
          <p>This C program has a bug. Fix it and determine what the correct output should be.</p>
        </div>

        <div className="bg-slate-900 text-slate-100 p-4 rounded-md font-mono text-sm overflow-x-auto">
          <pre>{`#include <stdio.h>
#include <string.h>

int main() {
    char message[20] = "hello world";
    
    // Bug: Off-by-one error in the loop condition
    for (int i = 0; i <= strlen(message); i++) {
        // Bug: Incorrect character manipulation
        message[i] = message[i] - 1;
    }
    
    printf("%s\\n", message);
    return 0;
}`}</pre>
        </div>

        <div className="text-center text-sm text-slate-500">
          <p>What would be the correct output if the bugs were fixed?</p>
        </div>

        <PasswordForm checkPassword={checkPassword} nextLink="/figureitout" />
      </div>
    </PuzzleLayout>
  )
}
