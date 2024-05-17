import { createContext, useState } from "react";
import Note from "../app/types/Note";

interface ContextType {
  reloadNotes: boolean;
  setReloadNotes: React.Dispatch<React.SetStateAction<boolean>>;
  selectedNote: Note | null;
  setSelectedNote: React.Dispatch<React.SetStateAction<Note | null>>;
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}
const defaultContext: ContextType = {
  reloadNotes: false,
  setReloadNotes: () => {},
  selectedNote: null,
  setSelectedNote: () => {},
  notes: [],
  setNotes: () => {},
};

export const Notes_Context = createContext(defaultContext);

type NotesProviderProps = {
  children: React.ReactNode;
};

const NotesProvider: React.FC<NotesProviderProps> = ({ children }) => {
  const [reloadNotes, setReloadNotes] = useState<boolean>(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);

  return (
    <Notes_Context.Provider
      value={{
        reloadNotes,
        setReloadNotes,
        selectedNote,
        setSelectedNote,
        notes,
        setNotes,
      }}
    >
      {children}
    </Notes_Context.Provider>
  );
};
export default NotesProvider;
