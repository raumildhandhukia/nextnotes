"use client";
import React from "react";
import NoteType from "../../app/types/Note";
import { useRouter } from "next/navigation";

import "./Note.css";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DeleteButton from "./DeleteButton";

interface Props {
  note: NoteType;
  isSelected: boolean;
  toggleSelectNote: React.Dispatch<React.SetStateAction<NoteType | null>>;
}

const Note: React.FC<Props> = ({ note, isSelected, toggleSelectNote }) => {
  let className = "note-base";
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
        <CardTitle>
          {convertHTMLtoTextWithLineBreaks(note.title, "Enter Title")}
        </CardTitle>
        <CardDescription className="line-clamp-3">
          {convertHTMLtoTextWithLineBreaks(
            note.content,
            "Write some content !!!"
          )}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Share</Button>
        <DeleteButton _id={note._id} />
      </CardFooter>
    </Card>
  );
};

export default Note;