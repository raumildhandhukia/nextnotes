"use client";
import "./styles.scss";
import "./dark.scss";
import CharacterCount from "@tiptap/extension-character-count";
import Document from "@tiptap/extension-document";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useContext } from "react";
import { Notes_Context } from "@/context/Context";
import { MenuBar } from "./menu-bar";
import { useTheme } from "@/hooks/use-theme";

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
    content: getContent(),
    extensions: [
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
