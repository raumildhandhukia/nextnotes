import NoteModel from "../../../../models/note";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { _id: string } }
) {
  try {
    const slug = params._id;
    const res = await db.note.delete({
      where: {
        id: slug,
      },
    });

    if (res) {
      return new Response("Note Deleted", { status: 200 });
    }
    return new Response("Note not Deleted", { status: 501 });
  } catch (e) {
    return new Response("Notes not Deleted", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { _id: string } }
) {
  try {
    const body = await req.json();
    const slug = params._id;
    const note = await db.note.update({
      where: {
        id: slug,
      },
      data: {
        ...body,
        updatedAt: new Date(),
      },
    });
    if (note) {
      const newNote = {
        ...note,
        _id: note.id,
      };
      return new Response(
        JSON.stringify({
          message: "Note Updated",
          updatedNote: newNote,
        }),
        { status: 200 }
      );
    }
    return new Response("Note not Updated", { status: 501 });
  } catch (e) {
    return new Response("Note not Updated", { status: 500 });
  }
}
