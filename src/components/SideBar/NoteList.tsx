"use client";
import { Notes_Context } from "../../context/Context";
import React, { useEffect, useContext } from "react";
import NoteType from "../../app/types/Note";
import Note from "./Note";
import { useRouter } from "next/navigation";

interface Props {}

const NoteList: React.FC<Props> = () => {
  const { notes, setNotes, selectedNote, setSelectedNote } =
    useContext(Notes_Context);

  console.log(notes);

  const router = useRouter();

  useEffect(() => {
    router.push(selectedNote ? `/notes/${selectedNote?._id}` : "/");
  }, [router, selectedNote]);

  useEffect(() => {
    async function getNotes() {
      const res = await fetch("http://localhost:3000/api/notes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const notes: NoteType[] = await res.json();
      notes.sort((a, b) => {
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      });
      setNotes(notes);
      setSelectedNote(notes.length > 0 ? notes[0] : null);
    }
    getNotes();
  }, [setNotes, setSelectedNote]);

  return (
    <div className="w-full h-[92vh] flex flex-col items-center flex-grow p-2 overflow-y-scroll scrollbar-hidden">
      {notes.map((note) => (
        <Note
          key={note._id}
          note={note}
          isSelected={selectedNote?._id === note._id}
          toggleSelectNote={setSelectedNote}
        />
      ))}
    </div>
  );
};

export default NoteList;
