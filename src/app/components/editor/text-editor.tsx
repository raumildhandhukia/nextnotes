"use client";
import "./styles.scss";
import "./dark.scss";
import CharacterCount from "@tiptap/extension-character-count";
import React, { useCallback, useEffect, useState, useContext } from "react";
import Document from "@tiptap/extension-document";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Notes_Context } from "@/context/Context";
import { MenuBar } from "./menu-bar";
import { useTheme } from "@/hooks/use-theme";
import { server } from "@/lib/hocuspocus";

import { TiptapCollabProvider } from "@hocuspocus/provider";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import * as Y from "yjs";
interface EditorProps {
  throttledUpdate: Function;
}
const CustomDocument = Document.extend({
  content: "heading block*",
});

export const Editor: React.FC<EditorProps> = ({ throttledUpdate }) => {
  const { notes, setNotes, selectedNote, setSelectedNote, isExpanded } =
    useContext(Notes_Context);
  const { theme } = useTheme();
  const doc = new Y.Doc();

  useEffect(() => {
    const provider = new TiptapCollabProvider({
      name: selectedNote!._id, // any identifier - all connections sharing the same identifier will be synced
      appId: "7j9y6m10", // replace with YOUR_APP_ID
      token: "notoken", // replace with your JWT
      document: doc,
    });

    return () => {
      provider.destroy();
    };
  }, [selectedNote?._id]);

  const getContent = () => {
    return "" + selectedNote?.title + selectedNote?.content;
  };

  const handleUpdate = async (c: string) => {
    const updatedNote = await throttledUpdate(c, selectedNote?._id || "");
    if (!updatedNote) {
      return;
    }
    const updatedNotes = notes.map((n) =>
      n._id === updatedNote._id ? { ...updatedNote } : { ...n }
    );
    setNotes(updatedNotes);
    setSelectedNote(updatedNote);
  };

  const editor = useEditor({
    onUpdate: (e) => {
      handleUpdate(e.editor.getHTML());
    },
    // content: getContent(),
    extensions: [
      Collaboration.configure({
        document: doc,
      }),
      CustomDocument,
      StarterKit.configure({
        document: false,
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "What’s the title?";
          }
          return "Can you add some further context?";
        },
      }),
      Highlight,
      TaskList,
      TaskItem,
      CharacterCount.configure({
        limit: 10000,
      }),
    ],
    editorProps: {
      attributes: {
        class: "prose max-w-none focus:outline-none",
      },
    },
  });

  return (
    <div
      className={`editor transition-all w-[72.5vw] ${
        isExpanded ? "mx-3" : "mx-[11vw]"
      }`}
      key={selectedNote?._id}
    >
      {editor && <MenuBar editor={editor} />}
      <EditorContent
        className="editor__content dark:bg-black"
        editor={editor}
      />
    </div>
  );
};
