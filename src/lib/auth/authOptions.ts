import { SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { JWT } from "next-auth/jwt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email/Phone", type: "text" },
        otp: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(
            `${process.env.NEXTAUTH_URL}/${process.env.NEXT_PUBLIC_API_URL}/auth/finalize-login`,
            { email: credentials?.email, otp: credentials?.otp }
          );
          const data = res.data;
          if (data.success && data.user) {
            return {
              id: String(data.user.id),
              name: data.user.name,
              email: data.user.email,
              role: data.user.role,
              language: data.user.language,
              timezone: data.user.timezone,
              image: data.user.profilePicture || null,
            };
          }
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }: { token: JWT; user?: any; trigger?: any; session?: any }): Promise<JWT> {
      if (user) {
        token.id = user.id || "";
        token.name = user.name || null;
        token.role = user.role ?? -1;
        token.language = user.language || null;
        token.timezone = user.timezone || null;
        token.image = user.image || null;
      }
      if (trigger === "update" && session) {
        token.id = session.id ?? token.id;
        token.name = session.name ?? token.name;
        token.role = session.role ?? token.role;
        token.language = session.language ?? token.language;
        token.timezone = session.timezone ?? token.timezone;
        token.image = session.image ?? token.image;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          name: token.name,
          role: token.role,
          language: token.language,
          timezone: token.timezone,
          image: token.image,
        },
      };
    },
  },
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
};