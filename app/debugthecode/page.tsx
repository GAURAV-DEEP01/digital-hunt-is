"use client"
import { PuzzleLayout } from "@/components/puzzle-layout"
import { PasswordForm } from "@/components/password-form"
import { checkPassword } from "@/lib/password-utils"

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
    
    
    for (int i = 0; i <= strlen(message); i++) {
        
        message[i] = message[i] - 1;
    }
    
    printf("%s\\n", message);
    return r;
}`}</pre>
        </div>

        <div className="text-center text-sm text-slate-500">
          <p>What would be the correct output if the bugs were fixed?</p>
        </div>

        <PasswordForm checkPasswordAction={checkPassword} puzzleId="debugthecode" />
      </div>
    </PuzzleLayout>
  )
}
