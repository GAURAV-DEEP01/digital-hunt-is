import { type NextRequest, NextResponse } from "next/server";
import { validatePassword } from "@/lib/password-utils";

const PUZZLE_PASSWORDS: Record<string, { password: string; link: string }> = {
  shapecountpuzz: {
    password: "46",
    link: "/figureitoutyourselfsdsdsdfljasldkfjashdflaksdfjjfaasdfasdfdfasdf",
  },
  theciphergame: { password: "puzzle", link: "/solvetheriddle012dfqepdznmxcmnvzlajdfwoeiurqweoruqerqpuoerpouerq" },
  solvetheriddle: { password: "423", link: "https://woxorxdl1l-eme-hun31t6ings3.vercel.app/" },
  figureitout: { password: "secretcode", link: "https://drive.google.com/drive/folders/1acVqy_iu9wNw8tFZ8_7fzkSTNaro9eQL?usp=sharing" },
};

export async function POST(request: NextRequest) {
  try {
    const { puzzleId, password } = await request.json();

    if (!PUZZLE_PASSWORDS[puzzleId]) {
      return NextResponse.json({ success: false }, { status: 404 });
    }

    const correctPassword = PUZZLE_PASSWORDS[puzzleId].password;
    const isValid = await validatePassword(password, correctPassword);
    if (!isValid) {
      return NextResponse.json({ success: false }, { status: 403 });
    }
    return NextResponse.json(
      { success: isValid, link: PUZZLE_PASSWORDS[puzzleId].link },
      { status: isValid ? 200 : 403 }
    );
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
