"use server";

import { db } from "@/lib/db";

export const deleteNote = async (id: string) => {
  try {
    await db.note.delete({
      where: {
        id,
      },
    });
    return { success: "Note Deleted!" };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};
