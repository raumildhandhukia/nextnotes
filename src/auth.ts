import authConfig from "@/auth.config";
import NextAuth, { type DefaultSession } from "next-auth";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRoles } from "@prisma/client";
import { getAvailableNotesForUser } from "@/data/available-notes";

declare module "@auth/core" {
  interface Session {
    user: {
      role: "ADMIN" | "USER";
    } & DefaultSession["user"];
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;
      const existingUser = await getUserById(user.id);
      if (!existingUser?.emailVerified) return false;
      // ADD 2FA HERE
      return true;
    },
    async session({ token, session }) {
      if (session.user) {
        if (token.role) {
          session.user.role = token.role as UserRoles;
        }
        if (token.sub) {
          session.user.id = token.sub;
        }
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }
      const existingUser = await getUserById(token.sub);
      token.role = existingUser?.role;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
