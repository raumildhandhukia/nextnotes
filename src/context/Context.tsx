import { createContext, useState } from "react";
import Note, { UserData } from "../app/types/Note";
interface NoteExt extends Note {
  owner: UserData | null;
}

interface ContextType {
  reloadNotes: boolean;
  setReloadNotes: React.Dispatch<React.SetStateAction<boolean>>;
  selectedNote: Note | null;
  setSelectedNote: React.Dispatch<React.SetStateAction<Note | null>>;
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  userInfo: {
    name?: string;
    email?: string;
    image?: string;
  };
  setUserInfo: React.Dispatch<React.SetStateAction<ContextType["userInfo"]>>;
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}
const defaultContext: ContextType = {
  reloadNotes: false,
  setReloadNotes: () => {},
  selectedNote: null,
  setSelectedNote: () => {},
  notes: [],
  setNotes: () => {},
  userInfo: {},
  setUserInfo: () => {},
  isExpanded: true,
  setIsExpanded: () => {},
};

export const Notes_Context = createContext(defaultContext);

type NotesProviderProps = {
  children: React.ReactNode;
};

const NotesProvider: React.FC<NotesProviderProps> = ({ children }) => {
  const [reloadNotes, setReloadNotes] = useState<boolean>(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [userInfo, setUserInfo] = useState<ContextType["userInfo"]>({});
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  return (
    <Notes_Context.Provider
      value={{
        reloadNotes,
        setReloadNotes,
        selectedNote,
        setSelectedNote,
        notes,
        setNotes,
        userInfo,
        setUserInfo,
        setIsExpanded,
        isExpanded,
      }}
    >
      {children}
    </Notes_Context.Provider>
  );
};
export default NotesProvider;
