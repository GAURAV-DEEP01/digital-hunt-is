import { type NextRequest, NextResponse } from "next/server"
import { validatePassword } from "@/lib/password-utils"

// This is a more secure way to validate passwords server-side
// Each puzzle would call this endpoint with its specific puzzle ID

// Map of puzzle IDs to their correct answers
const PUZZLE_PASSWORDS: Record<string, string> = {
  shapecountpuzz: "12",
  theciphergame: "puzzle",
  debugthecode: "hello world",
  figureitout: "secretcode",
}

export async function POST(request: NextRequest) {
  try {
    const { puzzleId, password } = await request.json()

    // Get client IP for rate limiting
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1"

    // Check if puzzle exists
    if (!PUZZLE_PASSWORDS[puzzleId]) {
      return NextResponse.json({ success: false }, { status: 404 })
    }

    // Validate password
    const correctPassword = PUZZLE_PASSWORDS[puzzleId]
    const isValid = await validatePassword(ip, password, correctPassword)

    return NextResponse.json({ success: isValid })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
