import NoteModel from "../../../models/note";
import { db } from "@/lib/db";

export async function POST() {
  try {
    const res = await db.note.create({
      data: {
        title: "",
        content: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    const returnNote = {
      ...res,
      _id: res.id,
    };

    return new Response(
      JSON.stringify({
        message: "Note Created",
        _id: returnNote.id,
        newNote: returnNote,
      }),
      {
        status: 200,
      }
    );
  } catch (e) {
    return new Response("Note not Created", { status: 500 });
  }
}
export async function GET() {
  try {
    let notes = await db.note.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });
    notes = notes.map((note) => {
      return {
        ...note,
        _id: note.id,
      };
    });

    return new Response(JSON.stringify(notes), { status: 200 });
  } catch (e) {
    return new Response("Error Fetching Notes", { status: 500 });
  }
}
