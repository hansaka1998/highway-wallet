export type AuthResult = {
  ok: boolean;
  message?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function loginWithEmail(
  email: string,
  password: string,
): Promise<AuthResult> {
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedPassword = password.trim();

  if (!normalizedEmail || !normalizedPassword) {
    return { ok: false, message: "Email and password are required." };
  }

  if (!EMAIL_REGEX.test(normalizedEmail)) {
    return { ok: false, message: "Please enter a valid email address." };
  }

  await new Promise((resolve) => setTimeout(resolve, 250));
  return { ok: true };
}
