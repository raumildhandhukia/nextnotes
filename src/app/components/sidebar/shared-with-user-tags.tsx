import React, { useContext } from "react";
import { MdClose } from "react-icons/md";
import { unshareNote } from "@/actions/notes/share-note";
import { ShareNoteContext } from "@/context/ShareNotesContext";

interface Props {
  user: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
  };
}

export const SharedWithUserTags: React.FC<Props> = ({ user }) => {
  const { noteId, setSharedWith } = useContext(ShareNoteContext);

  const handleUnShareNote = () => {
    unshareNote(noteId, user.id);
    setSharedWith((prev) => prev.filter((u) => u.id !== user.id));
  };
  return (
    <div className="flex flex-wrap gap-2">
      <div className="flex items-center gap-1 bg-yellow-400 rounded-md px-[8px] dark:bg-indigo-600">
        <span>{user.name}</span>
        <button onClick={handleUnShareNote}>
          <MdClose className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
