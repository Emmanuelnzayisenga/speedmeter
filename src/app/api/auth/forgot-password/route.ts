import { NextRequest, NextResponse } from "next/server";
import { randomBytes, createHash } from "crypto";
import { prisma } from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/mail";

const TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Always respond with the same generic message whether or not the email
    // exists, so this endpoint can't be used to enumerate registered accounts.
    const genericResponse = NextResponse.json({
      message: "If an account with that email exists, a reset link has been sent.",
    });

    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) return genericResponse;

    // Invalidate any previous outstanding reset links for this user.
    await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } });

    const rawToken = randomBytes(32).toString("hex");
    const tokenHash = createHash("sha256").update(rawToken).digest("hex");

    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt: new Date(Date.now() + TOKEN_TTL_MS),
      },
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL;
    const resetUrl = `${appUrl}/reset-password?token=${rawToken}`;
    const result = await sendPasswordResetEmail(user.email, resetUrl);
    if (!result.success) {
      console.error("[forgot-password] Failed to send email:", result.error);
    }

    return genericResponse;
  } catch (error) {
    console.error("[forgot-password] error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
