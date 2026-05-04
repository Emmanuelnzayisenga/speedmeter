// types/next-auth.d.ts
import type { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string | null;
      phoneNumber: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    username?: string | null;
    phoneNumber?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username?: string | null;
    phoneNumber?: string;
  }
}