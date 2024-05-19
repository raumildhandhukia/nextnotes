"use client";
import React from "react";
import NoteType from "../../types/Note";
import { useRouter } from "next/navigation";

import "./Note.css";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  const RenderPopup = () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button>Share</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Feature Coming Soon</DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    );
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
          {convertHTMLtoTextWithLineBreaks(note.title, "Enter Title")}
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
      <CardFooter className="flex justify-between -my-4">
        <RenderPopup />
        <DeleteButton _id={note._id} />
      </CardFooter>
    </Card>
  );
};

export default Note;
