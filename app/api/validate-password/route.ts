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

    const puzzle = PUZZLE_PASSWORDS[puzzleId];
    if (!puzzle) {
      return NextResponse.json({ success: false }, { status: 404 });
    }

    let isValid: boolean;

    if (puzzleId === "figureitout") {
      const normalize = (str: string) => str.trim().toLowerCase().replace(/\s+/g, "");
      isValid = normalize(password) === normalize(puzzle.password);
    } else {
      isValid = await validatePassword(password, puzzle.password);
    }

    if (!isValid) {
      return NextResponse.json({ success: false }, { status: 403 });
    }

    return NextResponse.json(
      { success: true, link: puzzle.link },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
