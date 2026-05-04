"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";

export default function LogoutPage() {
  useEffect(() => {
    signOut({ redirect: true, callbackUrl: "/login" });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="text-muted-foreground">Signing out...</p>
    </div>
  );
}