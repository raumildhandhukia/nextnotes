"use client";
import { Notes_Context } from "../../../context/Context";
import React, { useEffect, useContext } from "react";
import NoteType from "../../types/Note";
import { Note } from "@/app/components/sidebar/note-card";
import { AnimatePresence } from "framer-motion";
import { AnimatedListItem } from "./animated-list-item";
import { getNotesSharedWithUser } from "@/actions/notes/share-note";
import { useCurrentUser } from "@/hooks/use-current-user";

interface NoteExt extends NoteType {
  owner: {
    name: string | null;
    email: string | null;
    image: string | null;
  } | null;
}

interface Props {}

export const SharedNoteList: React.FC<Props> = ({}) => {
  const { sharedNotes, setSharedNotes, selectedNote } =
    useContext(Notes_Context);

  const user = useCurrentUser();
  const userId = user?.id;

  useEffect(() => {
    async function getNotes() {
      const res = await getNotesSharedWithUser(userId);
      if (!res) {
        return;
      }
      const notes = res as NoteExt[];
      setSharedNotes(notes);
    }
    getNotes();
  }, [setSharedNotes, userId]);

  return (
    <div className="flex max-h-[67vh] flex-col items-center flex-grow p-2 overflow-y-scroll ">
      <AnimatePresence initial={false}>
        {sharedNotes.map(({ owner, ...note }: NoteExt) => {
          return (
            <AnimatedListItem key={note._id}>
              <Note
                key={note._id}
                isSelected={note._id === selectedNote?._id}
                note={note}
                ownerInfo={owner}
              />
            </AnimatedListItem>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
