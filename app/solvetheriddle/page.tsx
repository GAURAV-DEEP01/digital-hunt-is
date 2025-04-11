"use client";
import { PuzzleLayout } from "@/components/puzzle-layout";
import { PasswordForm } from "@/components/password-form";
import { checkPassword } from "@/lib/password-utils";

export default function DebugCodePuzzle() {
  return (
    <PuzzleLayout title="Solve the riddle" clue="Where are you?">
      <div className="space-y-6">
        <div className="text-center mb-4">
          <p>Solve the hint and type the number to go to your next clue</p>
        </div>

        <div className="bg-slate-900 text-slate-100 p-4 rounded-md font-mono text-sm overflow-x-auto">
          <pre>{`I’m a number with three parts,
The first is a floor that’s not too far,
The second is half as much as the first,
The third is just a little more,
Find me and your hunt is done—
What room am I?`}</pre>
        </div>

        <div className="text-center text-sm text-slate-500">
          <p>Enter the correct answer for your next clue!</p>
        </div>

        <PasswordForm
          checkPasswordAction={checkPassword}
          puzzleId="solvetheriddle"
        />
      </div>
    </PuzzleLayout>
  );
}
