 

async function sendSms({ to, message }: { to: string; message: string }) {
  const apiKey = ""
  const from = "";

  if (!apiKey || !from) {
    throw new Error("Missing HTTPSMS_API_KEY or HTTPSMS_FROM_NUMBER env variables");
  }

  const res = await fetch("https://api.httpsms.com/v1/messages/send", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, content: message }),
  });

  const data = await res.json();
  console.log("SMS API response:", data);

  if (!res.ok) {
    return { success: false, error: data?.message ?? `HTTP ${res.status}` };
  }

  return { success: true, messageId: data?.data?.id, status: data?.data?.status };
}

 sendSms({ to: "", message: "Hello from test!" });
