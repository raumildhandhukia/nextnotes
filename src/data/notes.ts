import { db } from "@/lib/db";
import { TiptapCollabProvider } from "@hocuspocus/provider";
import * as Y from "yjs";

export const generateDummyData = async (userId: string) => {
  try {
    const admin = await db.user.findFirst({
      where: {
        role: "ADMIN",
      },
    });
    if (!admin) {
      return;
    }
    const note = await db.note.create({
      data: {
        title: "Hi!! I am Raumil",
        content:
          "This note is shared just with you and me! 🎉 Let's collaborate !!!",
        userId: admin.id,
        userIDs: [userId],
      },
    });
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        notesSharedWithUserIDs: {
          set: [note.id],
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};
