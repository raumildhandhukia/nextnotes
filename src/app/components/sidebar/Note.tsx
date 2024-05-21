"use client";
import React, { useContext } from "react";
import NoteType from "../../types/Note";
import { useRouter } from "next/navigation";
import { deleteNote } from "@/actions/notes/delete";

import "./note.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShareButton } from "./share-button";
import { DeleteButton } from "./delete-button";
import { Notes_Context } from "@/context/Context";

interface Props {
  isSelected: boolean;
  note: NoteType;
}

export const Note: React.FC<Props> = ({ isSelected, note }) => {
  const { notes, setNotes, setSelectedNote, isExpanded } =
    useContext(Notes_Context);
  let className = `note-base overflow-hidden transition-all ${
    isExpanded ? "w-[16vw]" : "invisible w-0"
  }`;
  if (isSelected) {
    className += " box-shadow selected-note";
  } else {
    className += " note";
  }

  const router = useRouter();
  const convertHTMLtoTextWithLineBreaks = (html: string, def: string) => {
    const str = html.replace(/<[^>]*>?/gm, "\n");
    if (!str) return <div className="text-gray-500 italic">{def}</div>;
    return str;
  };

  const toggleSelectNote = async (note: NoteType) => {
    let deleteNoteId: string = "";
    setSelectedNote((prevNote) => {
      if (
        prevNote &&
        notes.find((n) => n._id === prevNote._id) &&
        prevNote.title === "" &&
        prevNote.content === "" &&
        prevNote._id !== note._id
      ) {
        deleteNoteId = prevNote._id;
      }
      return note;
    });
    if (deleteNoteId.length > 0) {
      setNotes(notes.filter((n) => n._id !== deleteNoteId));
      await deleteNote(deleteNoteId);
    }
  };

  return (
    <Card
      className={className}
      key={note._id}
      onClick={() => {
        toggleSelectNote(note);
        router.push(`/notes/${note._id}`);
      }}
    >
      <CardHeader>
        <CardTitle className="line-clamp-1">
          {convertHTMLtoTextWithLineBreaks(note.title, "title")}
        </CardTitle>
        <CardDescription>
          <p className="line-clamp-2">
            {convertHTMLtoTextWithLineBreaks(
              note.content,
              "Write some content !!!"
            )}
          </p>
          <p className="my-2 font-semibold">
            {new Date(note.updatedAt).toLocaleString()}
          </p>
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-end items-end -my-4 gap-x-2">
        <ShareButton />
        <DeleteButton _id={note._id} />
      </CardFooter>
    </Card>
  );
};
