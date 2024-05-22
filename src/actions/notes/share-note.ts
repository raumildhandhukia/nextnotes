"use server";

import { db } from "@/lib/db";
import NoteType from "@/app/types/Note";

interface NoteExt extends NoteType {
  owner: {
    name: string | null;
    email: string | null;
    image: string | null;
  } | null;
}

export const getNotesSharedWithUser = async (userId: string | undefined) => {
  try {
    if (!userId) {
      return null;
    }
    const notes = await db.note.findMany({
      where: {
        userIDs: {
          has: userId,
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    const updatedNotes: NoteExt[] = await Promise.all(
      // Await the Promise returned by Promise.all()
      notes.map(async (note) => {
        // Make the callback function async
        const ownerId = note.userId;
        const owner = await db.user.findUnique({
          // Await the Promise returned by db.user.findUnique()
          where: {
            id: ownerId,
          },
          select: {
            name: true,
            email: true,
            image: true,
          },
        });
        return {
          ...note,
          _id: note.id,
          owner,
        };
      })
    );

    return updatedNotes;
  } catch (error) {
    return null;
  }
};

export const getUsersSharedWithNote = async (noteId: string | undefined) => {
  try {
    if (!noteId) {
      return null;
    }
    const usersIDs = await db.note.findMany({
      where: {
        id: noteId,
      },
      select: {
        userIDs: true,
      },
    });
    const users = await db.user.findMany({
      where: {
        id: {
          in: usersIDs[0].userIDs,
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    });
    return users;
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};

export const shareNote = async (noteId: string | undefined, userId: string) => {
  try {
    if (!noteId) {
      console.log("NO NOTE PASSED!");
      return { error: "No note passed" };
    }
    await db.note.update({
      where: {
        id: noteId,
      },
      data: {
        userIDs: {
          push: userId,
        },
      },
    });
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        notesSharedWithUserIDs: {
          push: noteId,
        },
      },
    });
    console.log("Note shared!");
    return { success: "Note shared!" };
  } catch (error) {
    console.log("ererererererererer");
    return { error: "Something went wrong!" };
  }
};

export const unshareNote = async (
  noteId: string | undefined,
  userId: string
) => {
  try {
    if (!noteId) {
      return { error: "No note passed" };
    }
    const userIDs = await db.note.findMany({
      where: {
        id: noteId,
      },
      select: {
        userIDs: true,
      },
    });
    const updatedUserIDs = userIDs[0].userIDs.filter(
      (id: string) => id !== userId
    );
    await db.note.update({
      where: {
        id: noteId,
      },
      data: {
        userIDs: {
          set: updatedUserIDs,
        },
      },
    });
    const noteIDs = await db.user.findMany({
      where: {
        id: userId,
      },
      select: {
        notesSharedWithUserIDs: true,
      },
    });
    const updatedNoteIDs = noteIDs[0].notesSharedWithUserIDs.filter(
      (id: string) => id !== noteId
    );
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        notesSharedWithUserIDs: {
          set: updatedNoteIDs,
        },
      },
    });
    return { success: "Note unshared!" };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};
