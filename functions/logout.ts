export type AuthResult = {
  ok: boolean;
  message?: string;
};

export async function logoutUser(): Promise<AuthResult> {
  await new Promise((resolve) => setTimeout(resolve, 120));
  return { ok: true };
}
