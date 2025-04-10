import { type NextRequest, NextResponse } from "next/server"
import { validatePassword } from "@/lib/password-utils"

const PUZZLE_PASSWORDS: Record<string, { password: string, link: string }> = {
  shapecountpuzz: { password: "46", link: "https://github.com/nischal-shetty2/find-me/" },
  theciphergame: { password: "puzzle", link: "/debugthecode" },
  debugthecode: { password: "hello world", link: "/figureitout" },
  figureitout: { password: "secretcode", link: "/success" },
}

export async function POST(request: NextRequest) {
  try {
    const { puzzleId, password } = await request.json()

    if (!PUZZLE_PASSWORDS[puzzleId]) {
      return NextResponse.json({ success: false }, { status: 404 })
    }

    const correctPassword = PUZZLE_PASSWORDS[puzzleId].password;
    console.log(`Checking password for puzzle ${puzzleId}: ${password} against ${correctPassword}`)
    const isValid = await validatePassword(password, correctPassword)
    if (!isValid) {
      return NextResponse.json({ success: false }, { status: 403 })
    }
    return NextResponse.json({ success: isValid, link: PUZZLE_PASSWORDS[puzzleId].link }, { status: isValid ? 200 : 403 })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
