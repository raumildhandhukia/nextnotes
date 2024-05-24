"use client";
import NoteType from "@/app/types/Note";
import EditorPage from "@/app/components/editor/editor-page";

import React from "react";

interface ExpandNoteProps {
  note?: NoteType;
}

export const ExpandNote: React.FC<ExpandNoteProps> = ({}) => {
  const getContentAttributes = (c: string) => {
    const splitContent = c.split("</h1>");
    let title = splitContent[0] + "</h1>";
    let content = splitContent[1];

    if (title === "<h1></h1>") {
      title = "";
    }
    if (content === "<p></p>") {
      content = "";
    }
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
  let resolveWaitingPromise: ((value: any) => void) | null = null;

  function throttle(callback: (...args: any[]) => Promise<any>, delay: number) {
    const timeoutFunction = () => {
      if (waitingArgs === null) {
        shouldWait = false;
      } else {
        callback(...waitingArgs).then((result) => {
          if (resolveWaitingPromise) {
            resolveWaitingPromise(result);
            resolveWaitingPromise = null;
          }
          waitingArgs = null;
          setTimeout(timeoutFunction, delay);
        });
      }
    };

    return (...args: any[]) => {
      if (shouldWait) {
        waitingArgs = args;
        return new Promise((resolve) => {
          resolveWaitingPromise = resolve;
        });
      }

      shouldWait = true;

      return new Promise((resolve) => {
        callback(...args).then((result) => {
          resolve(result);
          setTimeout(timeoutFunction, delay);
        });
      });
    };
  }

  const throttledUpdate = throttle(async (c: string, _id: string) => {
    return await updateNote(c, _id);
  }, 2000);

  return (
    <>
      <EditorPage throttledUpdate={throttledUpdate} />
    </>
  );
};
