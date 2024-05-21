"use client";

import { Button } from "../../../components/ui/button";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Notes_Context } from "@/context/Context";
import { deleteNote } from "@/actions/notes/delete";
import { MdDelete } from "react-icons/md";

interface Props {
  _id: string;
}

export const DeleteButton: React.FC<Props> = ({ _id }) => {
  const router = useRouter();
  const { notes, setNotes, selectedNote } = useContext(Notes_Context);

  const handleDeleteNote = async () => {
    const res = await deleteNote(_id);
    if (res.error) {
      console.error("Failed to add note");
      return;
    }
    setNotes(notes.filter((n) => n._id !== _id));
    if (selectedNote?._id === _id) {
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
