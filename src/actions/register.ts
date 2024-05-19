"use server";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
// import UserModel from "@/models/user";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { redirect } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    console.error(validatedFields.error);
    return { error: "Invalid Fields!" };
  }
  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "User Already Exists!" };
  }

  const newUser = await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  // TODO: SEND EMAIL VERIFICATION

  return { success: "Registration Successful" };
};
