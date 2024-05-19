"use client";

import { Button } from "../../../components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import React, { useContext } from "react";
import { Notes_Context } from "@/context/Context";

interface Props {
  className?: string;
  userInfo: any;
}

const AddButton: React.FC<Props> = ({ className, userInfo }) => {
  const { notes, setNotes, setSelectedNote } = useContext(Notes_Context);
  const userId = userInfo.id;
  const handleAddNote = async () => {
    const res = await fetch("http://localhost:3000/api/notes", {
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
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
  };

  return (
    <Button variant="outline" className={className} onClick={handleAddNote}>
      <PlusIcon className="mr-2 h-4 w-4" />
      note
    </Button>
  );
};

export default AddButton;
