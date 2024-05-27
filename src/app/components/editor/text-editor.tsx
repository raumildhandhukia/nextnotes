"use client";
import "./styles.scss";
import "./dark.scss";
import React, {
  useCallback,
  useEffect,
  useState,
  useContext,
  useMemo,
} from "react";
import { Notes_Context } from "@/context/Context";
import { MenuBar } from "./menu-bar";
import Document from "@tiptap/extension-document";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import CharacterCount from "@tiptap/extension-character-count";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TiptapCollabProvider } from "@hocuspocus/provider";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import * as Y from "yjs";
import { SyncLoader } from "react-spinners";

interface EditorProps {
  throttledUpdate: Function;
  getInitialUser: Function;
}

const CustomDocument = Document.extend({
  content: "heading block*",
});

const APP_ID = process.env.NEXT_PUBLIC_APP_ID;
const JWT = process.env.NEXT_PUBLIC_JWT || "notoken";

export const Editor: React.FC<EditorProps> = ({
  throttledUpdate,
  getInitialUser,
}) => {
  const [status, setStatus] = useState("connecting");
  const [currentUser, setCurrentUser] = useState(getInitialUser());
  const { notes, setNotes, selectedNote, setSelectedNote, isExpanded } =
    useContext(Notes_Context);
  const [doc, provider] = useMemo(() => {
    const doc = new Y.Doc();
    doc.getText().insert(0, "some initial content");
    const provider = new TiptapCollabProvider({
      name: selectedNote!._id, // any identifier - all connections sharing the same identifier will be synced
      appId: `${APP_ID}`, // replace with YOUR_APP_ID
      token: `${JWT}`, // replace with your JWT
      document: doc,
    });
    return [doc, provider];
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
      CollaborationCursor.configure({
        provider: provider,
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
  useEffect(() => {
    // Update status changes
    provider.on("status", (event: any) => {
      setStatus(event.status);
    });
  }, []);

  // Save current user to localStorage and emit to editor
  useEffect(() => {
    if (editor && currentUser) {
      editor.chain().focus().updateUser(currentUser).run();
    }
  }, [editor, currentUser]);

  const renderLoader = () => {
    return (
      <div className="flex justify-center items-center w-[72.5vw]">
        <SyncLoader color={"#958DF1"} />
      </div>
    );
  };

  const renderEditor = () => {
    return (
      <div
        className={`editor transition-all md:w-[72.5vw] ${
          isExpanded ? "md:mx-3" : "md:mx-[11vw]"
        }`}
        key={selectedNote?._id}
      >
        {editor && <MenuBar editor={editor} />}
        <EditorContent
          className="editor__content dark:bg-black"
          editor={editor}
        />
        {/* <div className="editor__footer">
          <div className={`editor__status editor__status--${status}`}>
            {status === "connected"
              ? `${editor?.storage.collaborationCursor.users.length} user${
                  editor?.storage.collaborationCursor.users.length === 1
                    ? ""
                    : "s"
                } online in ${selectedNote?.id || "Untitled"}`
              : "offline"}
          </div>
          <div className="editor__name">
            <button onClick={setName}>{currentUser.name}</button>
          </div>
        </div> */}
      </div>
    );
  };

  return (
    <>{status === "connected" && editor ? renderEditor() : renderLoader()}</>
  );
};
