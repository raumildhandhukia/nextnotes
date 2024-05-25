"use client";

import { Button } from "../../../components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import React, { useContext, useState } from "react";
import { Notes_Context } from "@/context/Context";
import { useCurrentUser } from "@/hooks/use-current-user";
import { deleteNote } from "@/actions/notes/delete-note";

interface Props {
  className?: string;
}

const DOMAIN = process.env.NEXT_PUBLIC_APP_URL;

export const AddButton: React.FC<Props> = ({ className }) => {
  const {
    isExpanded,
    setIsExpanded,
    notes,
    setNotes,
    selectedNote,
    setSelectedNote,
  } = useContext(Notes_Context);
  let enableAddNote = true;
  const user = useCurrentUser();
  const userId = user?.id;
  const handleAddNote = async () => {
    if (!enableAddNote) return;
    enableAddNote = false;
    const res = await fetch(`/api/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });
    if (!res.ok) {
      console.error("Failed to add note");
      return;
    }
    const { newNote } = await res.json();
    debugger;
    if (
      selectedNote &&
      notes.find((n) => n._id === selectedNote._id) &&
      selectedNote.title === "" &&
      selectedNote.content === ""
    ) {
      debugger;
      setNotes([newNote, ...notes.filter((n) => n._id !== selectedNote._id)]);
      await deleteNote(selectedNote._id);
    } else {
      setNotes([newNote, ...notes]);
    }
    setSelectedNote(newNote);
    if (isExpanded && window.innerWidth < 1024) {
      setIsExpanded(false);
    }

    enableAddNote = true;
  };

  return (
    <Button className={className} onClick={handleAddNote}>
      <PlusIcon className="mr-2 h-4 w-4" />
      note
    </Button>
  );
};
