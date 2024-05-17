import connect from "@/lib/mongodb";
import NoteModel from "../../../../models/note";

export async function POST() {
  try {
    await connect();
    const note = await NoteModel.create({
      title: "",
      content: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    note.save();
    return new Response(
      JSON.stringify({ message: "Note Created", _id: note._id, newNote: note }),
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
    await connect();
    const notes = await NoteModel.find({});
    notes.sort((a, b) => {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
    return new Response(JSON.stringify(notes), { status: 200 });
  } catch (e) {
    return new Response("Error Fetching Notes", { status: 500 });
  }
}
