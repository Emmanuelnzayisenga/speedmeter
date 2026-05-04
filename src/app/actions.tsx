"use server";

import { signIn } from "@/lib/auth";

export async function loginAction(
  _prev: { error: string } | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if ((error as { digest?: string })?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }

    const message = (error as Error)?.message ?? "";

    if (message.includes("CredentialsSignin")) {
      return { error: "Invalid email or password." };
    }

    if (message.includes("Account is not activated")) {
      return { error: "Your account is not activated." };
    }

    return { error: "Something went wrong. Please try again." };
  }
}