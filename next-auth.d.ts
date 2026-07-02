// types/next-auth.d.ts
import type { DefaultSession, DefaultUser } from "next-auth";
import type { Role } from "@/app/generated/prisma";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string | null;
      phoneNumber: string;
      role: Role;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    username?: string | null;
    phoneNumber?: string;
    role?: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username?: string | null;
    phoneNumber?: string;
    role?: Role;
  }
}