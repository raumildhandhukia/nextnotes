// import { Note } from "@prisma/client";
import { createContext, useState } from "react";
import Note, { UserData } from "@/app/types/Note";

interface NoteExt extends Note {
  owner: UserData | null;
}
type SharedNotesData = {
  [noteId: string]: UserData[];
};

interface ShareNoteContextType {
  sharedNotes: NoteExt[];
  setSharedNotes: React.Dispatch<React.SetStateAction<NoteExt[]>>;
  noteId: string | undefined;
  setNoteId: React.Dispatch<React.SetStateAction<string | undefined>>;
  sharedNotesData: SharedNotesData;
  setSharedNotesData: React.Dispatch<React.SetStateAction<SharedNotesData>>;
}

const defaultContext: ShareNoteContextType = {
  setSharedNotes: () => {},
  sharedNotes: [],
  noteId: "",
  setNoteId: () => {},
  sharedNotesData: {},
  setSharedNotesData: () => {},
};

export const ShareNoteContext = createContext(defaultContext);

interface SharedNoteProviderProps {
  children: React.ReactNode;
}

const ShareNote: React.FC<SharedNoteProviderProps> = ({ children }) => {
  const [sharedNotes, setSharedNotes] = useState<NoteExt[]>([]);
  const [noteId, setNoteId] = useState<string | undefined>("");
  const [sharedNotesData, setSharedNotesData] = useState<SharedNotesData>({});

  return (
    <ShareNoteContext.Provider
      value={{
        noteId,
        setNoteId,
        sharedNotesData,
        setSharedNotesData,
        sharedNotes,
        setSharedNotes,
      }}
    >
      {children}
    </ShareNoteContext.Provider>
  );
};

export default ShareNote;
