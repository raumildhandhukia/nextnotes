"use client";
import ShareNoteProvider from "./ShareNotesContext";

export default function Provider({ children }: { children: React.ReactNode }) {
  return <ShareNoteProvider>{children}</ShareNoteProvider>;
}
