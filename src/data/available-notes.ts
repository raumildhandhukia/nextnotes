import { db } from "@/lib/db";

export const getAvailableNotesForUser = async (userId: string | undefined) => {
  if (!userId) {
    return [];
  }
  const noteIDArray = await db.note.findMany({
    where: {
      OR: [
        {
          userId,
        },
        {
          userIDs: {
            has: userId,
          },
        },
      ],
    },
    select: {
      id: true,
    },
  });
  const noteIds = noteIDArray.map((note) => note.id);
  return noteIds;
};
