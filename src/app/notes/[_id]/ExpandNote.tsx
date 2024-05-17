"use client";
import { useContext, useEffect, useState } from "react";
import NoteType from "@/app/types/Note";
import Editor from "../../../components/Editor/Editor";
import { useRouter } from "next/navigation";
import { Notes_Context } from "@/context/Context";

import React from "react";

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
  function throttle(callback: any, delay: number) {
    if (shouldWait) {
      return null;
    }
    const data = callback();
    shouldWait = true;
    setTimeout(() => {
      shouldWait = false;
    }, delay);
    return data;
  }

  const throttledUpdate = (c: string, _id: string) => {
    const updatedNote = throttle(() => {
      return updateNote(c, _id);
    }, 1000);
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
