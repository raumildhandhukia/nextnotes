"use client";
import NoteProvider from "./Context";

export default function Provider({ children }: { children: React.ReactNode }) {
  return <NoteProvider>{children}</NoteProvider>;
}
