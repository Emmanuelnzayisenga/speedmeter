import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import type { Session } from "next-auth";

export async function requireAdmin(): Promise<
  { session: Session } | { error: NextResponse }
> {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    return {
      error: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }

  return { session };
}
