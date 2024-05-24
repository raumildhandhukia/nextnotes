"use client";

import { Button } from "../../../components/ui/button";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Notes_Context } from "@/context/Context";
import { deleteNote } from "@/actions/notes/delete-note";
import { MdDelete } from "react-icons/md";

interface Props {
  noteId: string;
}

export const DeleteButton: React.FC<Props> = ({ noteId }) => {
  const router = useRouter();
  const { notes, setNotes, selectedNote } = useContext(Notes_Context);

  const handleDeleteNote = async () => {
    const res = await deleteNote(noteId);
    if (res.error) {
      console.error("Failed to add note");
      return;
    }
    setNotes(notes.filter((n) => n._id !== noteId));
    if (selectedNote?._id === noteId) {
      router.push("/notes");
    }
  };

  return (
    <Button
      variant="destructive"
      onClick={(e) => {
        e.stopPropagation();
        handleDeleteNote();
      }}
    >
      <MdDelete />
    </Button>
  );
};
