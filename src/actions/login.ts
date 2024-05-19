"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  let toRedirect = false;
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    console.error(validatedFields.error);
    return { error: "Invalid Fields!" };
  }
  const { email, password } = validatedFields.data;
  try {
    await signIn("credentials", {
      email,
      password,
    });
    return { success: "Login Successful" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials!" };
        default:
          return { error: "Login Failed, something went wrong!" };
      }
    }
    if (isRedirectError(error)) {
      toRedirect = true;
      throw error;
    }
    throw error;
  } finally {
    if (toRedirect) {
      redirect(DEFAULT_LOGIN_REDIRECT);
    }
  }
};
