"use client";
import NoteType from "@/app/types/Note";
import Editor from "../../components/editor/Editor";

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
  }, 1000);

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
