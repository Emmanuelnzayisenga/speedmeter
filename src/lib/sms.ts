
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
    return { success: false, error: "Missing HTTPSMS_API_KEY or HTTPSMS_FROM_NUMBER env variables" };
  }
  console.log(`Sending SMS to ${to}: ${message}`);

  try {
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

    let data: any = null;
    try {
      data = await res.json();
    } catch {
      // non-JSON response body (e.g. gateway timeout/error page) - fall through with data = null
    }
    console.log("SMS API response:", data);

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
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "SMS request failed" };
  }
}