"use client";
import { Notes_Context } from "../../../context/Context";
import React, { useEffect, useContext } from "react";
import NoteType from "../../types/Note";
import { Note } from "@/app/components/sidebar/note-card";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { AnimatedListItem } from "./animated-list-item";
import { useCurrentUser } from "@/hooks/use-current-user";
import Provider from "@/context/SharedNotesContextProvider";

interface Props {}

const DOMAIN = process.env.NEXT_PUBLIC_APP_URL;

export const NoteList: React.FC<Props> = ({}) => {
  const { notes, setNotes, selectedNote, setSelectedNote } =
    useContext(Notes_Context);
  const user = useCurrentUser();

  const router = useRouter();
  const userId = user?.id;

  useEffect(() => {
    router.push(selectedNote ? `/notes/${selectedNote?._id}` : "/notes");
  }, [router, selectedNote]);

  useEffect(() => {
    async function getNotes() {
      const res = await fetch(`${DOMAIN}/api/notes/for/${userId}`, {
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
      setNotes(notes);
      setSelectedNote(notes.length > 0 ? notes[0] : null);
    }
    getNotes();
  }, [setNotes, setSelectedNote, userId]);

  return (
    <Provider>
      <div className="flex max-h-[67vh] flex-col items-center flex-grow p-2 overflow-y-scroll ">
        <AnimatePresence initial={false}>
          {notes.map((note) => (
            <AnimatedListItem key={note._id}>
              <Note
                key={note._id}
                isSelected={note._id === selectedNote?._id}
                note={note}
                userOwns
              />
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    </Provider>
  );
};
