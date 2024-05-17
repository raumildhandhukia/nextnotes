"use client";

import { Button } from "../ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { Notes_Context } from "@/context/Context";

interface Props {
  className?: string;
}

const AddButton: React.FC<Props> = ({ className }) => {
  const { notes, setNotes, setSelectedNote } = useContext(Notes_Context);
  const router = useRouter();
  const handleAddNote = async () => {
    const res = await fetch("http://localhost:3000/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      console.error("Failed to add note");
      return;
    }
    const { newNote } = await res.json();
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
  };

  return (
    <Button variant="outline" className={className} onClick={handleAddNote}>
      <PlusIcon className="mr-2 h-4 w-4" />
      add a note
    </Button>
  );
};

export default AddButton;
