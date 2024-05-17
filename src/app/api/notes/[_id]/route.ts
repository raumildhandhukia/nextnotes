import connect from "@/lib/mongodb";
import NoteModel from "../../../../../models/note";

export async function DELETE(
  req: Request,
  { params }: { params: { _id: string } }
) {
  try {
    const slug = params._id;
    await connect();
    const res = await NoteModel.deleteMany({ _id: slug });
    if (res.deletedCount > 0) {
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
    await connect();
    const note = await NoteModel.findOneAndUpdate(
      { _id: slug },
      { ...body, updatedAt: new Date() },
      {
        new: true,
      }
    );
    if (note) {
      return new Response(
        JSON.stringify({
          message: "Note Updated",
          updatedNote: note,
        }),
        { status: 200 }
      );
    }
    return new Response("Note not Updated", { status: 501 });
  } catch (e) {
    return new Response("Note not Updated", { status: 500 });
  }
}
