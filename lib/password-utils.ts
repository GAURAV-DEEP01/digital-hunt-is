// Store of last attempt timestamps by IP to implement rate limiting
const attemptTimestamps: Record<string, number> = {}

// Minimum time between attempts in milliseconds (3 seconds)
const COOLDOWN_PERIOD = 3000

export async function validatePassword(
  ip: string,
  submittedPassword: string,
  correctPassword: string,
): Promise<boolean> {
  // Check if user is in cooldown period
  const now = Date.now()
  const lastAttempt = attemptTimestamps[ip] || 0

  if (now - lastAttempt < COOLDOWN_PERIOD) {
    // User is attempting too quickly, enforce cooldown
    await new Promise((resolve) => setTimeout(resolve, COOLDOWN_PERIOD))
  }

  // Record this attempt
  attemptTimestamps[ip] = Date.now()

  // Normalize and compare passwords (case insensitive)
  return submittedPassword.trim().toLowerCase() === correctPassword.toLowerCase()
}
