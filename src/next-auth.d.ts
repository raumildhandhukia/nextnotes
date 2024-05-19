import NextAuth, { type DefaultSession } from "next-auth";
import { UserRoles } from "@prisma/client";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRoles;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
