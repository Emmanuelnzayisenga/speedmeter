import { Resend } from "resend";

export interface SendMailResult {
  success: boolean;
  error?: string;
}

export async function sendPasswordResetEmail(
  to: string,
  resetUrl: string
): Promise<SendMailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !from) {
    return { success: false, error: "Missing RESEND_API_KEY or RESEND_FROM_EMAIL env variables" };
  }

  try {
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: `SpeedWatch <${from}>`,
      to,
      subject: "Reset your SpeedWatch password",
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
          <h2 style="color: #0ea5e9;">SpeedWatch</h2>
          <p>We received a request to reset your password. This link expires in 1 hour.</p>
          <p style="margin: 24px 0;">
            <a href="${resetUrl}" style="background:#0ea5e9;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;">
              Reset Password
            </a>
          </p>
          <p style="color:#888;font-size:12px;">
            If you didn't request this, you can safely ignore this email.
          </p>
        </div>
      `,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Failed to send email" };
  }
}
