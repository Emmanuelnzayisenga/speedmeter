
export interface SendSmsOptions {
  to: string;       // recipient phone number e.g. "+18005550100"
  message: string;  // SMS content
}

export interface SendSmsResult {
  success: boolean;
  messageId?: string;
  status?: string;
  error?: string;
}

export async function sendSms({ to, message }: SendSmsOptions): Promise<SendSmsResult> {
  const apiKey = process.env.HTTPSMS_API_KEY;
  const from = process.env.HTTPSMS_FROM_NUMBER;  

  if (!apiKey || !from) {
    throw new Error("Missing HTTPSMS_API_KEY or HTTPSMS_FROM_NUMBER env variables");
  }

  const res = await fetch(process.env.HTTPSMS_API_URL || "https://api.httpsms.com/v1/messages/send", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      content: message,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    return {
      success: false,
      error: data?.message ?? `HTTP ${res.status}`,
    };
  }

  return {
    success: true,
    messageId: data?.data?.id,
    status: data?.data?.status,
  };
}