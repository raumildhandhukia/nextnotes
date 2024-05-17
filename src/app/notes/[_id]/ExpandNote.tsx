"use client";
import NoteType from "@/app/types/Note";
import Editor from "../../../components/Editor/Editor";

import React from "react";
import { set } from "lodash";

interface ExpandNoteProps {
  note?: NoteType;
}

const ExpandNote: React.FC<ExpandNoteProps> = ({}) => {
  const getContentAttributes = (c: string) => {
    const splitContent = c.split("</h1>");
    const title = splitContent[0] + "</h1>";
    const content = splitContent[1];
    return { title, content };
  };

  const updateNote = async (c: string, _id: string) => {
    const { title, content } = getContentAttributes(c);
    const res = await fetch(`/api/notes/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("Failed to update note");
      return;
    }
    const { updatedNote } = await res.json();
    return updatedNote;
  };

  let shouldWait = false;
  let waitingArgs: any[] | null = null;

  function throttle(callback: Function, delay: number) {
    const timeoutFuction = () => {
      if (waitingArgs === null) {
        shouldWait = false;
      } else {
        callback(...waitingArgs);
        waitingArgs = null;
        setTimeout(timeoutFuction, delay);
      }
    };
    if (shouldWait) {
      waitingArgs = callback.arguments;
      return null;
    }

    const data = callback();
    shouldWait = true;

    setTimeout(timeoutFuction, delay);

    return data;
  }

  const throttledUpdate = async (c: string, _id: string) => {
    const updatedNote = await throttle(async () => {
      return await updateNote(c, _id);
    }, 3000);

    return updatedNote;
  };

  return (
    <>
      <div className="h-screen w-[80vw] flex flex-col">
        <div className="flex my-1 mx-2 h-[99vh]">
          <Editor throttledUpdate={throttledUpdate} />
        </div>
      </div>
    </>
  );
};

export default ExpandNote;
