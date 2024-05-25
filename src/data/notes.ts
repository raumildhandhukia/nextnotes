import { db } from "@/lib/db";
import { TiptapCollabProvider } from "@hocuspocus/provider";
import * as Y from "yjs";

export const generateDummyData = async (userId: string) => {
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
      title: "Welcome to the App",
      content: "This is a dummy note",
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
  const doc = new Y.Doc();
  const provider = new TiptapCollabProvider({
    name: note.id,
    appId: "7j9y6m10",
    token: "notoken",
    document: doc,
  });
};
