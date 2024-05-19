import { db } from "@/lib/db";
export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    let notes = await db.note.findMany({
      where: {
        userId: params.userId,
      },
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
