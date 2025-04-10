export async function validatePassword(
  submittedPassword: string,
  correctPassword: string,
): Promise<boolean> {
  return submittedPassword.trim().toLowerCase() === correctPassword.toLowerCase()
}

export async function checkPassword(password: string, puzzleId: string): Promise<string> {
  const res = await fetch(`/api/validate-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      puzzleId,
      password,
    }),
    cache: "no-store",
  })

  const data = await res.json()
  return data.link;
}
