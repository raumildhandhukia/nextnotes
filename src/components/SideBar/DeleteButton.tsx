"use client";

import { Button } from "../ui/button";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { Notes_Context } from "@/context/Context";

interface Props {
  _id: string;
}

const DeleteButton: React.FC<Props> = ({ _id }) => {
  const router = useRouter();
  const { notes, setNotes, selectedNote } = useContext(Notes_Context);
  const handleDeleteNote = async () => {
    const res = await fetch(`http://localhost:3000/api/notes/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      console.error("Failed to add note");
      return;
    }
    const updatedNotes = notes.filter((n) => n._id !== _id);
    updatedNotes.sort((a, b) => {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
    setNotes(updatedNotes);
    if (selectedNote?._id === _id) {
      router.push("/");
    }
  };

  return (
    <Button
      variant="outline"
      onClick={(e) => {
        e.stopPropagation();
        handleDeleteNote();
      }}
    >
      Delete
    </Button>
  );
};

export default DeleteButton;
