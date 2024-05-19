import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId } = body;
    if (!userId) {
      return new Response("Invalid Request. No UserId provided.", {
        status: 400,
      });
    }
    const res = await db.note.create({
      data: {
        title: "",
        content: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId,
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
