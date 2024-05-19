import { db } from "@/lib/db";

export const getUserByEmail = async (email: string | undefined) => {
  if (!email) {
    return null;
  }
  try {
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });
    return existingUser;
  } catch (e) {
    console.log(e);
  }
};

export const getUserById = async (id: string | undefined) => {
  if (!id) {
    return null;
  }
  try {
    const existingUser = await db.user.findUnique({
      where: {
        id,
      },
    });
    return existingUser;
  } catch (e) {
    console.log(e);
  }
};
