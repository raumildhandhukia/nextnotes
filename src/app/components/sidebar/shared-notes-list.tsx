"use client";
import { Notes_Context } from "@/context/Context";
import { ShareNoteContext } from "@/context/ShareNotesContext";
import React, { useEffect, useContext } from "react";
import NoteType, { UserData } from "@/app/types/Note";
import { Note } from "@/app/components/sidebar/note-card";
import { AnimatePresence } from "framer-motion";
import { AnimatedListItem } from "./animated-list-item";
import { getNotesSharedWithUser } from "@/actions/notes/share-note";
import { useCurrentUser } from "@/hooks/use-current-user";

interface NoteExt extends NoteType {
  owner: UserData | null;
}

export const SharedNoteList: React.FC = () => {
  const { selectedNote } = useContext(Notes_Context);
  const { sharedNotes, setSharedNotes } = useContext(ShareNoteContext);

  const user = useCurrentUser();
  const userId = user?.id;

  useEffect(() => {
    const getNotes = async () => {
      debugger;
      const res = await getNotesSharedWithUser(userId);
      if (!res) {
        return;
      }
      const notes = res as NoteExt[];
      setSharedNotes(notes);
    };
    getNotes();
  }, [setSharedNotes, userId]);

  return (
    <div className="flex max-h-[67vh] flex-col items-center flex-grow p-2 overflow-y-scroll ">
      <AnimatePresence initial={false}>
        {sharedNotes.map(({ owner, ...note }: NoteExt) => {
          return (
            <AnimatedListItem key={note.id}>
              <Note
                key={note.id}
                isSelected={note.id === selectedNote?._id}
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
