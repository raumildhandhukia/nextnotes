import React from "react";
import NoteType from "../app/types/Note";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  note: NoteType;
}

const Note: React.FC<Props> = ({ note }) => {
  return (
    <Card className="w-full my-1 scale-95 opacity-75 transition-all duration-300 hover:scale-100 hover:opacity-100">
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
        <CardDescription className="line-clamp-3">
          {note.content}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Share</Button>
        <Button>Delete</Button>
      </CardFooter>
    </Card>
  );
};

export default Note;
